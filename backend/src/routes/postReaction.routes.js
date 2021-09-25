module.exports = (express, app) => {
  const controller = require("../controllers/postReaction.controller.js");
  const router = express.Router();

  router.get("/", controller.all);

  router.get("/select/:post_id/:username", controller.one);

  router.post("/", controller.create);

  router.delete("/select/:post_id/:username", controller.remove);

  app.use("/api/postReactions", router);
};
