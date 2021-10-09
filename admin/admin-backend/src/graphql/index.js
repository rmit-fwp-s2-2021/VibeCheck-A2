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
    img_url: String,
    is_blocked: Boolean
    posts: [Post]
  }

  type Post {
    post_id: Int,
    text: String,
    parent_post_id: Int,
    img_url: String,
    is_deleted: Boolean
  }

  # The input type can be used for incoming data.
  input UserInput {
    username: String,
    password_hash: String,
    first_name: String,
    last_name: String,
    img_url: String,
    is_blocked: Boolean
  }

  # Queries (read-only operations).
  type Query {
    all_users: [User],
    user(username: String): User,
    user_exists(username: String): Boolean
  }

  # Mutations (modify data in the underlying data-source, i.e., the database).
  type Mutation {
    create_user(input: UserInput): User,
    update_user(input: UserInput): User,
    delete_user(username: String): Boolean
  }
`);

// The root provides a resolver function for each API endpoint.
graphql.root = {
  // Queries.
  all_users: async () => {
    return await db.user.findAll({ include: { model: db.post, as: "posts" } });
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

    // Update user fields.
    user.first_name = args.input.first_name;
    user.last_name = args.input.last_name;
    // user.password = args.input.password

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
};

module.exports = graphql;
