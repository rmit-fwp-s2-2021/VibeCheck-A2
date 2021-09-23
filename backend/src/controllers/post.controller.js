// Some code was referenced from Week08 tutorial.

const db = require("../database");

exports.all = async (req, res) => {
  const posts = await db.post.findAll();

  // Can use eager loading to join tables if needed, for example:
  // const posts = await db.post.findAll({ include: db.user });

  res.json(posts);
};

exports.one = async (req, res) => {
  const post = await db.post.findByPk(req.params.post_id);

  res.json(post);
};

exports.create = async (req, res) => {
  const uploaded_file = req.files ? req.files.post_img : null;
  let file_name = '';
  let upload_path = '';
  if(uploaded_file){
    file_name = req.files.post_img.name;
    upload_path = process.cwd() + '\\public\\post\\' + file_name;
    uploaded_file.mv(upload_path);
  }
  const post = await db.post.create({
    text: req.body.text,
    username: req.body.username,
    img_url: uploaded_file ? upload_path : null
  });

  res.json(post);
};

exports.update = async (req, res) => {
  const post = await db.post.findByPk(req.params.post_id);

  post.text = req.body.text;
  if(post.img_url){
    post.img_url = req.body.img_url;
  }

  await post.save();

  return res.json(post);
};

exports.remove = async (req, res) => {
  const post = await db.post.findByPk(req.params.post_id);
  let removed = false;
  if (post != null) {
    await post.destroy();
    removed = true;
  }

  return res.json(removed);
};
