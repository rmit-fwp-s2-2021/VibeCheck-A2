import { useState, useEffect } from "react";
import {
  createFollowing,
  deleteFollowing,
  getAllUsers,
} from "../data/repository";

export default function Follow(props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [user_followings, setUserFollowings] = useState([]);

  useEffect(() => {
    refreshUsers();
  }, []);

  const refreshUsers = async () => {
    setIsLoaded(false);
    setError(null);

    const users = await getAllUsers();

    // Get current user's followings.
    const current_user_followings = [];
    for (const user of users) {
      if (user.username === props.user.username) {
        const user_followings = user.userFollows;
        for (const following of user_followings) {
          current_user_followings.push(following.user_recepient);
        }
      }
    }
    setUserFollowings(current_user_followings);

    // remove current user.
    setUsers(users.filter((user) => user.username != props.user.username));
    setIsLoaded(true);
  };

  const handleFollow = async (event, user_recepient) => {
    event.preventDefault();
    const following = {
      user_requester: props.user.username,
      user_recepient: user_recepient,
    };

    await createFollowing(following);
    await refreshUsers();
  };

  const handleUnfollow = async (event, user_recepient) => {
    event.preventDefault();
    await deleteFollowing(props.user.username, user_recepient);
    await refreshUsers();
  };

  const isUserFollowing = (username) => {
    return user_followings.includes(username);
  };

  return (
    <div className="follow">
      <h3>Follow or Unfollow</h3>
      {!isLoaded ? (
        <div>Loading users...</div>
      ) : users.length === 0 ? (
        <span className="text-muted">No users fetched</span>
      ) : (
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((x, index) => (
              <tr key={"user-" + index}>
                <td>{x.username}</td>
                <td>{x.email}</td>
                <td>{x.first_name}</td>
                <td>{x.last_name}</td>
                <td>
                  {isUserFollowing(x.username) ? (
                    <button
                      className="btn btn-danger"
                      onClick={(event) => handleUnfollow(event, x.username)}
                    >
                      Unfollow
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary"
                      onClick={(event) => handleFollow(event, x.username)}
                    >
                      Follow
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
