const db = require("../database");

exports.all = async (req, res) => {
  const post_reactions = await db.postReaction.findAll();

  // Can use eager loading to join tables if needed, for example:
  // const posts = await db.post.findAll({ include: db.user });

  res.json(post_reactions);
};

exports.one = async (req, res) => {
  const post_reaction = await db.postReaction.findOne({
    where: {
      post_id: req.params.post_id,
      username: req.params.username,
    },
  });

  res.json(post_reaction);
};

exports.create = async (req, res) => {
  const post_reaction = await db.postReaction.create({
    post_id: parseInt(req.body.post_id),
    username: req.body.username,
    is_liked: Boolean(Number(req.body.is_liked)),
  });

  res.json(post_reaction);
};

exports.update = async (req, res) => {
  const post_reaction = await db.postReaction.findOne({
    where: {
      post_id: req.params.post_id,
      username: req.params.username,
    },
  });

  post_reaction.is_liked = req.body.is_liked;
  post_reaction.save();

  return res.json(post_reaction);
};

exports.remove = async (req, res) => {
  const post_reaction = await db.postReaction.findOne({
    where: {
      post_id: req.params.post_id,
      username: req.params.username,
    },
  });
  let removed = false;
  if (post_reaction != null) {
    await post_reaction.destroy();
    removed = true;
  }

  return res.json(removed);
};
