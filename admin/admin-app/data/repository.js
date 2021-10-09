import { request, gql } from "graphql-request";

// --- Constants ----------------------------------------------------------------------------------
const GRAPH_QL_URL = "http://localhost:4001/graphql";

// --- User ---------------------------------------------------------------------------------------
async function getUsers() {
  // Simply query with no parameters.
  const query = gql`
    {
      all_users {
        username,
        first_name,
        last_name,
        img_url,
        is_blocked,
        posts {
          post_id,
          text,
          img_url,
          is_deleted
        }
      }
    }
  `;

  const data = await request(GRAPH_QL_URL, query);

  return data.all_users;
}

async function getUser(username) {
  // Query with parameters (variables).
  const query = gql`
    query ($username: String) {
      user(username: $username) {
        username,
        first_name,
        last_name,
        img_url,
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
      create_user(input: {
        username: $username,
        first_name: $first_name,
        last_name: $last_name
      }) {
        username,
        first_name,
        last_name
      }
    }
  `;

  const variables = user;

  const data = await request(GRAPH_QL_URL, query, variables);

  return data.create_user;
}

async function updateUser(user) {
  const query = gql`
    mutation ($username: String, $first_name: String, $last_name: String) {
      update_user(input: {
        username: $username,
        first_name: $first_name,
        last_name: $last_name
      }) {
        username,
        first_name,
        last_name
      }
    }
  `;

  const variables = user;

  const data = await request(GRAPH_QL_URL, query, variables);

  return data.update_user;
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

export {
  getUsers, getUser, getUserExists, createUser, updateUser, deleteUser
}
