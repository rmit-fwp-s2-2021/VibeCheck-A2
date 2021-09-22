const USER_KEY = "user";

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

/**
 * Formats MySQL date string to Month/Day/Year.
 * @param {string} date_str
 * @returns {string} Formatted date.
 */
function getHumanReadableDate(date_str) {

  return new Date(date_str).toString().split(" ").splice(1, 3).join(" ");
}

export { getHumanReadableDate };
