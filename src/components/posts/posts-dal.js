import { db } from "../../utils/db/config.js";

export default {
  getAllPosts,
  createPost,
  deletePost,
};

async function getAllPosts() {
  const posts = await db("post")
    .select("id", "imageName", "caption", "created")
    .orderBy("id", "desc");
  return posts;
}

async function createPost(params) {
  await db("post").insert({
    imageName: params.imageName,
    caption: params.caption,
    created: db.fn.now(),
  });
}

async function deletePost(id) {
  const trx = await db.transaction();

  try {
    // get post before delete
    const post = await trx("post")
      .select("id", "imageName")
      .where({ id })
      .first();

    if (!post) {
      throw new Error("post does not exist");
    }

    await trx("post").del().where({ id });
    await trx.commit();

    return {
      id: post.id,
      imageName: post.imageName,
    };
  } catch (err) {
    await trx.rollback();

    throw err;
  }
}
