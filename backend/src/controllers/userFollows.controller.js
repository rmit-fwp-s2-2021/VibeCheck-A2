const db = require("../database");

exports.all = async (req, res) => {
  const follows = await db.userFollows.findAll();

  res.json(follows);
};

exports.create = async (req, res) => {
  const following = await db.userFollows.create({
    user_requester: req.body.user_requester,
    user_recepient: req.body.user_recepient,
  });

  res.json(following);
};

exports.remove = async (req, res) => {
  const follow_entry = await db.user.findOne({
    where: {
      user_requester: req.params.user_requester,
      user_recepient: req.params.user_recepient,
    },
  });
  let removed = false;
  if (follow_entry != null) {
    await follow_entry.destroy();
    removed = true;
  }

  return res.json(removed);
};
