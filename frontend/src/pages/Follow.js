import { useState, useEffect } from "react";
import { getAllUsers } from "../data/repository";

export default function Follow(props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    refreshUsers();
  }, []);

  const refreshUsers = async () => {
    setIsLoaded(false);
    setError(null);

    const users = await getAllUsers();
    setUsers(users);
    setIsLoaded(true);
  };

  const handleFollow = () => {
    // TODO create entry in userFollows.
  };

  const handleUnfollow = () => {
    // TODO remove entry.
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
              <th>Avatar</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((x, index) => (
              <tr key={"user-" + index}>
                <td>{x.username}</td>
                <td>{x.username}</td>
                <td>{x.first_name}</td>
                <td>{x.last_name}</td>
                <td>
                  <button className="btn btn-primary">Follow</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
