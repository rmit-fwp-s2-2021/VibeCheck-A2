// Some code was referenced from Week10 tute.
const { buildSchema } = require("graphql");
const db = require("../database");

const graphql = {};

// GraphQL.
// Construct a schema, using GraphQL schema language
graphql.schema = buildSchema(`
  # The GraphQL types are declared first.

  # NOTE: The user and post are pseudo-joined; whilst they are related, how they are related is an implementation detail
  # that is NOT exposed in the GraphQL schema. This can be seen with the post type which has no field linking it to
  # an user. That said an user has many posts and this is exposed within the GraphQL schema by association.
  # Behind the scenes the database post table has an additional field called username which is a FK to user.
  type User {
    username: String,
    password_hash: String,
    first_name: String,
    last_name: String,
    email: String,
    img_url: String,
    is_blocked: Boolean
    posts: [Post]
    userFollows: [UserFollows]
  }

  type Post {
    post_id: Int,
    text: String,
    parent_post_id: Int,
    img_url: String,
    is_deleted: Boolean
    postReaction: [PostReaction]
  }

  type PostReaction {
    username: String,
    post_id: Int,
    is_liked: Boolean
  }

  type UserFollows {
    user_requester: String,
    user_recepient: String
  }

  # The input type can be used for incoming data.
  input UserInput {
    username: String,
    password: String,
    first_name: String,
    last_name: String,
    img_url: String,
    email: String,
    is_blocked: Boolean
  }

  input UpdateUserInput {
    username: String,
    first_name: String,
    last_name: String,
    email: String,
  }

  # Queries (read-only operations).
  type Query {
    all_users: [User],
    all_posts: [Post],
    all_user_followings(username: String): [UserFollows]
    all_reactions: [PostReaction]
    user(username: String): User,
    user_exists(username: String): Boolean
  }

  # Mutations (modify data in the underlying data-source, i.e., the database).
  type Mutation {
    create_user(input: UserInput): User,
    update_user(input: UpdateUserInput): User,
    delete_user(username: String): Boolean,
    block_user(username: String, is_blocked: Boolean): Boolean
    update_post_status(post_id: Int, is_deleted: Boolean): Boolean
  }
`);

// The root provides a resolver function for each API endpoint.
graphql.root = {
  // Queries.
  all_users: async () => {
    return await db.user.findAll({
      include: [
        {
          model: db.post,
          as: "posts",
        },
        {
          model: db.userFollows,
          as: "userFollows",
        },
      ],
    });
  },
  all_posts: async () => {
    return await db.post.findAll({ include: db.postReaction });
  },
  all_reactions: async () => {
    return await db.postReaction.findAll();
  },
  all_user_followings: async (args) => {
    return await db.userFollows.findAll({
      where: {
        user_requester: args.username,
      },
    });
  },
  user: async (args) => {
    return await db.user.findByPk(args.username);
  },
  user_exists: async (args) => {
    const count = await db.user.count({ where: { username: args.username } });

    return count === 1;
  },

  // Mutations.
  create_user: async (args) => {
    const user = await db.user.create(args.input);

    return user;
  },
  update_user: async (args) => {
    console.log(args);
    const user = await db.user.findByPk(args.input.username);
    if (user === null) return null;

    // Update user fields.
    user.first_name = args.input.first_name;
    user.last_name = args.input.last_name;
    user.email = args.input.email;
    // if (args.input.password) {
    //   const hash = await argon2.hash(args.input.password, {
    //     type: argon2.argon2id,
    //   });
    //   user.password_hash = hash;
    // }
    // TODO img
    await user.save();

    return user;
  },
  delete_user: async (args) => {
    const user = await db.user.findByPk(args.username);

    if (user === null) return false;

    // First remove all posts owned by the user.
    await db.post.destroy({ where: { username: user.username } });
    await user.destroy();

    return true;
  },
  block_user: async (args) => {
    const user = await db.user.findByPk(args.username);
    if (user === null) return false;

    user.is_blocked = args.is_blocked;

    await user.save();
    return true;
  },
  update_post_status: async (args) => {
    const post = await db.post.findByPk(args.post_id);
    if (post === null) return false;

    post.is_deleted = args.is_deleted;

    await post.save();
    return true;
  },
};

module.exports = graphql;
