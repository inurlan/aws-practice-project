import { S3, GetObjectCommand } from "@aws-sdk/client-s3";
import { CloudFront } from "@aws-sdk/client-cloudfront";
import mimeTypes from "mime-types";
import generators from "../generators/index.js";
// import { BadRequestError } from "../errors";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import dotenv from "dotenv";

dotenv.config();

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const cloudfrontDistId = process.env.CLOUDFRONT_DIST_ID;

const s3Client = new S3({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

const cfClient = new CloudFront({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

export async function saveFile(file) {
  const output = await s3Client.putObject({
    Body: file.content,
    Bucket: bucketName,
    ContentType: file.contentType,
    Key: file.filename,
  });
}

export async function deleteFile(id, fileName) {
  await Promise.all([
    s3Client.deleteObjects({
      Bucket: bucketName,
      Delete: {
        Objects: [{ Key: fileName }],
        Quiet: false,
      },
    }),
    invalidateCachedFiles(id, [fileName]),
  ]);
}

async function invalidateCachedFiles(callerRef, fileKeys) {
  const finalFileKeys = fileKeys.map((key) => `/${key}`);

  await cfClient.createInvalidation({
    DistributionId: cloudfrontDistId,
    InvalidationBatch: {
      CallerReference: callerRef,
      Paths: { Items: finalFileKeys, Quantity: finalFileKeys.length },
    },
  });
}

export function fileToSaveImageInput(file) {
  const fileExt = mimeTypes.extension(file.mimetype);
  // if (!fileExt) {
  //   throw new BadRequestError("file_extension_extraction_failed");
  // }
  const filename = generators.generateUuid();

  return {
    fileExt,
    filename,
    content: file.buffer,
    contentType: file.mimetype,
  };
}

function getCloudFrontDistUrl() {
  return `https://${process.env.CLOUDFRONT_DIST_DOMAIN}`;
}

export async function getObjectSignedUrl(key) {
  // const params = {
  //   Bucket: bucketName,
  //   Key: key,
  // };

  // // https://aws.amazon.com/blogs/developer/generate-presigned-url-modular-aws-sdk-javascript/
  // const command = new GetObjectCommand(params);
  // const seconds = 3600;
  // const url = await getSignedUrl(s3Client, command, { expiresIn: seconds });

  return getCloudFrontDistUrl() + `/${key}`;

  // return url;
}
