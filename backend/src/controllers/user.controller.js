const db = require("../database");
const argon2 = require("argon2");

// Select all users from the database.
exports.all = async (req, res) => {
  const users = await db.user.findAll();

  res.json(users);
};

// Select one user from the database.
exports.one = async (req, res) => {
  const user = await db.user.findByPk(req.params.username);

  res.json(user);
};

// Select one user from the database if username and password are a match.
exports.login = async (req, res) => {
  const user = await db.user.findByPk(req.query.username);

  if (
    user === null ||
    (await argon2.verify(user.password_hash, req.query.password)) === false
  )
    // Login failed.
    res.json(null);
  else res.json(user);
  //TODO track activity here ?
};

// Create a user in the database.
exports.create = async (req, res) => {
  const hash = await argon2.hash(req.body.password, { type: argon2.argon2id });
  // insert into table.
  const user = await db.user.create({
    username: req.body.username,
    password_hash: hash,
    first_name: req.body.firstname,
    last_name: req.body.lastname,
  });

  res.json(user);
};

// Update a user in the database.
exports.update = async (req, res) => {
  const user = await db.user.findByPk(req.params.username);

  user.first_name = req.body.firstName;
  user.last_name = req.body.lastName;
  //TODO : change password, img
  await user.save();

  return res.json(user);
};

// Remove a user from the database.
exports.remove = async (req, res) => {
  const user = await db.user.findByPk(req.params.username);
  let removed = false;
  if (user !== null) {
    await user.destroy();
    removed = true;
  }

  return res.json(removed);
};
