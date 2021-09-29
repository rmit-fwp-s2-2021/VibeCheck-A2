module.exports = (express, app) => {
  const controller = require("../controllers/userFollows.controller.js");
  const router = express.Router();

  router.get("/", controller.all);

  router.post("/", controller.create);

  router.delete("/:user_requester/:user_recepient", controller.remove);

  app.use("/api/userFollows", router);
};
