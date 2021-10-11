// Some code was referenced from Matthew Bolger's Week 10 tute.

import { request, gql } from "graphql-request";

// --- Constants ----------------------------------------------------------------------------------
const GRAPH_QL_URL = "http://localhost:4001/graphql";

// --- User ---------------------------------------------------------------------------------------
/**
 * Gets a list of users with all their posts.
 * @returns User list
 */
async function getUsers() {
  // Simply query with no parameters.
  const query = gql`
    {
      all_users {
        username
        first_name
        last_name
        img_url
        is_blocked
        posts {
          post_id
          text
          img_url
          is_deleted
        }
      }
    }
  `;

  const data = await request(GRAPH_QL_URL, query);

  return data.all_users;
}

/**
 * Get a user object
 * @param {string} username
 * @returns User object.
 */
async function getUser(username) {
  // Query with parameters (variables).
  const query = gql`
    query ($username: String) {
      user(username: $username) {
        username
        first_name
        last_name
        img_url
        is_blocked
      }
    }
  `;

  const variables = { username };

  const data = await request(GRAPH_QL_URL, query, variables);

  return data.user;
}

async function getUserExists(username) {
  const query = gql`
    query ($username: String) {
      user_exists(username: $username)
    }
  `;

  const variables = { username };

  const data = await request(GRAPH_QL_URL, query, variables);

  return data.user_exists;
}

async function createUser(user) {
  const query = gql`
    mutation ($username: String, $first_name: String, $last_name: String) {
      create_user(
        input: {
          username: $username
          first_name: $first_name
          last_name: $last_name
        }
      ) {
        username
        first_name
        last_name
      }
    }
  `;

  const variables = user;

  const data = await request(GRAPH_QL_URL, query, variables);

  return data.create_user;
}

/**
 * Update a user
 * @param {FormData object} user
 * @returns object from api.
 */
async function updateUser(user) {
  const query = gql`
    mutation ($username: String, $first_name: String, $last_name: String) {
      update_user(
        input: {
          username: $username
          first_name: $first_name
          last_name: $last_name
        }
      ) {
        username
        first_name
        last_name
      }
    }
  `;

  const variables = user;

  const data = await request(GRAPH_QL_URL, query, variables);

  return data.update_user;
}

async function blockUser(username, is_blocked) {
  const query = gql`
    mutation ($username: String, $is_blocked: Boolean) {
      block_user(username: $username, is_blocked: $is_blocked)
    }
  `;

  const variables = { username, is_blocked };
  const data = await request(GRAPH_QL_URL, query, variables);

  return data.block_user;
}

async function deleteUser(username) {
  const query = gql`
    mutation ($username: String) {
      delete_user(username: $username)
    }
  `;

  const variables = { username };

  const data = await request(GRAPH_QL_URL, query, variables);

  return data.delete_user;
}

// --- Post ---------------------------------------------------------------------------------------

async function getPosts() {
  const query = gql`
    {
      all_posts {
        post_id
        text
        parent_post_id
        img_url
        is_deleted
      }
    }
  `;
  const data = await request(GRAPH_QL_URL, query);

  return data.all_posts;
}

async function updatePostStatus(post_id, is_deleted) {
  const query = gql`
    mutation ($post_id: Int, $is_deleted: Boolean) {
      update_post_status(post_id: $post_id, is_deleted: $is_deleted)
    }
  `;

  const variables = { post_id, is_deleted };
  const data = await request(GRAPH_QL_URL, query, variables);

  return data.update_post_status;
}
export {
  getUsers,
  getUser,
  getUserExists,
  createUser,
  updateUser,
  blockUser,
  deleteUser,
  getPosts,
  updatePostStatus,
};
