// Some code was referenced from tut08.

const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");

const db = {
  Op: Sequelize.Op,
};

// Create Sequelize.
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT,
});

// Include models.
db.user = require("./models/user.js")(db.sequelize, DataTypes);
db.post = require("./models/post.js")(db.sequelize, DataTypes);
db.userFollows = require("./models/userFollows.js")(db.sequelize, DataTypes);
db.postReaction = require("./models/postReaction.js")(db.sequelize, DataTypes);

// Relate post and user.
db.post.belongsTo(db.user, {
  foreignKey: { name: "username", allowNull: false },
  onDelete: "cascade",
  onUpdate: "cascade",
});

// Relate postReactions with user and post.
db.postReaction.belongsTo(db.user, {
  foreignKey: { name: "username", allowNull: false },
  as: "userAss",
  onDelete: "cascade",
  onUpdate: "cascade",
});
db.postReaction.belongsTo(db.post, {
  foreignKey: { name: "post_id", allowNull: false },
  as: "postAss",
  onDelete: "cascade",
  onUpdate: "cascade",
});

// Relate parent post with comment(child post)
db.post.hasMany(db.post, {
  foreignKey: { name: "parent_post_id", allowNull: true },
  onDelete: "cascade",
});

// Relate userFollows with user
db.userFollows.belongsTo(db.user, {
  foreignKey: { name: "user_requester", allowNull: false },
  as: "requester",
  onDelete: "cascade",
  onUpdate: "cascade",
});

db.userFollows.belongsTo(db.user, {
  foreignKey: { name: "user_recepient", allowNull: false },
  as: "recepient",
  onDelete: "cascade",
  onUpdate: "cascade",
});

db.user.hasMany(db.userFollows, {
  foreignKey: "user_requester",
  onDelete: "cascade",
});
db.user.hasMany(db.post, {
  foreignKey: "username",
  onDelete: "cascade",
  onUpdate: "cascade",
});

// Include a sync option with seed data logic included.
db.sync = async () => {
  // // Sync schema.
  //await db.sequelize.sync();

  //Can sync with force if the schema has become out of date - note that syncing with force is a destructive operation.
  await db.sequelize.sync({ force: true });

  await seedData();
};

async function seedData() {
  const count = await db.user.count();

  // Only seed data if necessary.
  if (count > 0) return;

  const argon2 = require("argon2");

  let hash = await argon2.hash("abc123", { type: argon2.argon2id });
  await db.user.create({
    username: "mbolger",
    password_hash: hash,
    first_name: "Matthew",
    last_name: "Bolger",
    email: "mbolger@gmail.com",
  });

  hash = await argon2.hash("def456", { type: argon2.argon2id });
  await db.user.create({
    username: "shekhar",
    password_hash: hash,
    first_name: "Shekhar",
    last_name: "Kalra",
    email: "shekhar@gmail.com",
  });
}

module.exports = db;
