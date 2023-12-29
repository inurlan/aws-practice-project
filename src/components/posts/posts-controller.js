import postsService from "./posts-service.js";

async function getAllPosts(req, res, next) {
  try {
    const posts = await postsService.getAllPosts();
    return res.status(200).json(posts);
  } catch (err) {
    return next(err);
  }
}

async function createPost(req, res, next) {
  try {
    const params = { caption: req.body.caption };
    const post = await postsService.createPost(params, req.file);
    return res.status(201).send(post);
  } catch (err) {
    return next(err);
  }
}

async function deletePost(req, res, next) {
  try {
    const id = +req.params.id;
    await postsService.deletePost(id);
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
}

export default {
  getAllPosts,
  createPost,
  deletePost,
};
