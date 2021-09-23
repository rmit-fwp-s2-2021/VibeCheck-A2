module.exports = (express, app) => {
  const controller = require("../controllers/post.controller.js");
  const router = express.Router();

  router.get("/", controller.all);

  router.get("/select/:post_id", controller.one);

  router.post("/", controller.create);

  router.put("/:post_id", controller.update);

  router.delete("/:post_id", controller.remove);

  // Add routes to server.
  app.use("/api/posts", router);
};
