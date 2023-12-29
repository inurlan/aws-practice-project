import postsDAL from "./posts-dal.js";
// import { InternalServerError } from "../../utils/errors";
import {
  fileToSaveImageInput,
  saveFile,
  getObjectSignedUrl,
  deleteFile,
} from "../../utils/file-storage/index.js";
import fileToResizedImage from "../../utils/image-editor/index.js";

async function getAllPosts() {
  const posts = await postsDAL.getAllPosts();
  for (let post of posts) {
    post.imageUrl = await getObjectSignedUrl(post.imageName);
  }
  return posts;
}

async function createPost(params, file) {
  const resizedFile = await fileToResizedImage(file);
  const imageInput = fileToSaveImageInput(resizedFile);

  // Indicates failure in either image upload or db insertion
  let didPostCreationFail = false;

  try {
    await saveFile(imageInput);
    await postsDAL.createPost({
      imageName: imageInput.filename,
      ...params,
    });
  } catch (err) {
    didPostCreationFail = true;
    // TODO: Add logging
    console.log(err);
  }

  // if (didPostCreationFail) {
  //   try {
  //     await fileStorageService.deleteImages(imageName, {
  //       logo: imageInput,
  //     });
  //   } catch (err) {
  //     // TODO: Add logging
  //     console.log(err);
  //   }

  //   throw new InternalServerError("error_occurred");
  // }
}

async function deletePost(id) {
  const post = await postsDAL.deletePost(id);

  try {
    await deleteFile(id, post.imageName);
  } catch (err) {
    // TODO: Add logging
    console.log(err);
  }
}

export default {
  getAllPosts,
  createPost,
  deletePost,
};
