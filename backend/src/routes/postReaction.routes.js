module.exports = (express, app) => {
  const controller = require("../controllers/postReaction.controller.js");
  const router = express.Router();

  router.get("/", controller.all);

  router.get("/select/:post_id/:username", controller.one);

  router.get("/:post_id/:is_liked", controller.count);

  router.post("/", controller.create);

  router.put("/select/:post_id/:username", controller.update);

  router.delete("/select/:post_id/:username", controller.remove);

  app.use("/api/postReactions", router);
};
