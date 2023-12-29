import sharp from "sharp";

const SERVICE_THUMBNAIL_IMG_MIN_WIDTH = 1080;
const SERVICE_THUMBNAIL_IMG_MIN_HEIGHT = 1920;

async function fileToResizedImage(file) {
  const resizedImageBuffer = await sharp(file.buffer)
    .resize({
      width: SERVICE_THUMBNAIL_IMG_MIN_WIDTH,
      height: SERVICE_THUMBNAIL_IMG_MIN_HEIGHT,
      fit: "contain",
    })
    .toBuffer();

  return { buffer: resizedImageBuffer, mimetype: file.mimetype };
}

export default fileToResizedImage;
