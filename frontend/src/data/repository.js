// Some code was referenced from Week08 Tute.

import axios from "axios";

// --- Constants ----------------------------------------------------------------------------------
const API_HOST = "http://localhost:4000";
const USER_KEY = "user";

// --- User ---------------------------------------------------------------------------------------
const USER_ROUTE = "/api/users/";
async function verifyUser(username, password) {
  const response = await axios.get(API_HOST + "/api/users/login", {
    params: { username, password },
  });
  const user = response.data;

  // NOTE: In this example the login is also persistent as it is stored in local storage.
  if (user !== null) setUser(user);

  return user;
}

async function findUser(username) {
  let response = null;
  try {
    response = await axios.get(API_HOST + `/api/users/select/${username}`);
  } catch (e) {
    console.log(`Unable to find user ${username}. ${e}`);
    return;
  }

  return response.data;
}

async function createUser(user) {
  const response = await axios.post(API_HOST + "/api/users", user);

  return response.data;
}

async function updateUser(username, user) {
  let response = null;
  try {
    response = await axios.put(API_HOST + `/api/users/${username}`, user);
  } catch (e) {
    console.log(`Unable to update user ${username}. ${e}`);
    return;
  }

  return response.data;
}

async function deleteUser(username) {
  let response = null;
  try {
    response = await axios.delete(API_HOST + `/api/users/${username}`);
  } catch (e) {
    console.log(`Unable to delete user ${username}. ${e}`);
    return;
  }

  return response.data;
}

// --- Post ---------------------------------------------------------------------------------------
const POST_ROUTE = "/api/posts/";

/**
 * Sends HTTP GET request to api.
 * @param {int} post_id id of post to get.
 * @returns response data from api
 */
async function getPost(post_id) {
  let response = null;
  try {
    response = await axios.get(`${API_HOST}${POST_ROUTE}select/${post_id}`);
  } catch (e) {
    console.log(`Unable to get post ${post_id}. ${e}`);
    return;
  }

  return response.data;
}

async function getPosts() {
  const response = await axios.get(API_HOST + "/api/posts");

  return response.data;
}

async function createPost(post) {
  const response = await axios.post(API_HOST + "/api/posts", post);

  return response.data;
}

/**
 * Sends http PUT request to api to update a post.
 * @param {int} post_id id of post to update.
 * @param {Post} post new post fields.
 * @returns {object} Data object from response
 */
async function updatePost(post_id, post) {
  let response = null;
  try {
    response = await axios.put(API_HOST + POST_ROUTE + post_id, post);
  } catch (e) {
    console.log(`Unable to update post ${post_id}. ${e}`);
    return;
  }

  return response.data;
}

/**
 * Sends http delete request to api to delete a post.
 * @param {int} post_id id of post to delete
 * @returns {object} Data object from response.
 */
async function deletePost(post_id) {
  let response = null;
  try {
    response = await axios.delete(API_HOST + POST_ROUTE + post_id);
  } catch (e) {
    console.log(`Unable to delete post ${post_id}. ${e}`);
    return;
  }

  return response.data;
}
// --- PostReaction ---------------------------------------------------------------------------------------
const POST_REACTION_ROUTE = "/api/postReactions/";

/**
 * Send HTTP GET request to get a post reaction.
 * @param {string} username Username of use who reacted on the post.
 * @param {int} post_id Id of post to get reactions for.
 * @returns {object} response data object from api.
 */
async function getPostReaction(username, post_id) {
  let response = null;
  try {
    response = await axios.get(
      `${API_HOST}${POST_REACTION_ROUTE}/select/${post_id}/${username}`
    );
  } catch (e) {
    console.log(`Unable to get reaction for post ${post_id}. {e}`);
    return;
  }

  return response.data;
}

/**
 * Sends HTTP POST request to create a post reaction.
 * @param {Object} postReaction fields of the reaction.
 * @returns {Object} response data object from api.
 */
async function createPostReaction(postReaction) {
  let response = null;
  try {
    response = await axios.post(
      `${API_HOST}${POST_REACTION_ROUTE}`,
      postReaction
    );
  } catch (e) {
    console.log(`Unable to create post reaction ${postReaction}. ${e}`);
    return;
  }

  return response.data;
}

async function deletePostReaction(username, post_id) {
  let response = null;
  try {
    response = await axios.delete(
      `${API_HOST}${POST_REACTION_ROUTE}/select/${post_id}/${username}`
    );
  } catch (e) {
    console.log(
      `Unable to delete post reaction for post ${post_id} and user ${username}. ${e}`
    );
    return;
  }
}

// --- Helper functions to interact with local storage --------------------------------------------
function setUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function getUser() {
  return JSON.parse(localStorage.getItem(USER_KEY));
}

function removeUser() {
  localStorage.removeItem(USER_KEY);
}

export {
  verifyUser,
  findUser,
  createUser,
  updateUser,
  deleteUser,
  getPost,
  getPosts,
  createPost,
  updatePost,
  deletePost,
  getPostReaction,
  createPostReaction,
  deletePostReaction,
  getUser,
  removeUser,
};
