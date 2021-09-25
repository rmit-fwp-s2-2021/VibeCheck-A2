const db = require("../database");

exports.all = async (req, res) => {
  const postReactions = await db.postReaction.findAll();

  // Can use eager loading to join tables if needed, for example:
  // const posts = await db.post.findAll({ include: db.user });

  res.json(postReactions);
};

exports.one = async (req, res) => {
  const postReaction = await db.post.findByPk({
    where: {
      post_id: req.params.post_id,
      username: req.params.username,
    },
  });

  res.json(postReaction);
};

exports.create = async (req, res) => {
  const postReaction = await db.postReaction.create({
    post_id: parseInt(req.body.post_id),
    username: req.body.username,
    is_liked: Boolean(Number(req.body.is_liked)),
  });

  res.json(postReaction);
};

//TODO update

exports.remove = async (req, res) => {
  const postReaction = await db.post.findByPk({
    where: {
      post_id: req.params.post_id,
      username: req.params.username,
    },
  });
  let removed = false;
  if (postReaction != null) {
    await postReaction.destroy();
    removed = true;
  }

  return res.json(removed);
};
