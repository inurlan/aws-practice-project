import indexRoutes from "../routes/index.js";
import postsApi from "../components/posts/index.js";

function init(app) {
  app.use("/", indexRoutes);
  app.use("/api/posts", postsApi);
}

export default init;
