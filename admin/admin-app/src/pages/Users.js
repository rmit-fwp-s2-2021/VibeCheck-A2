import { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { getUsers } from "../data/repository";

export default function Users() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    refreshUsers();
  }, []);

  const refreshUsers = async () => {
    setIsLoaded(false);
    setError(null);
    const users = await getUsers();
    setUsers(users);
    setIsLoaded(true);
  };

  const deleteUser = async (username) => {
    if (
      !window.confirm(`Are you sure you want to delete User ID ${username} ?`)
    ) {
      return;
    }
    //TODO send del request
    await refreshUsers();
  };

  const blockUser = async (username) => {
    if (
        !window.confirm(`Are you sure you want to block User ID ${username} ?`)
      ) {
        return;
      }

    // TODO sent block req
    await refreshUsers();
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Users</h1>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((x) => (
            <tr key={x.username}>
              <td>{x.username}</td>
              <td>{x.first_name}</td>
              <td>{x.last_name}</td>
              <td>
                <Link to={`/edit/${x.username}`}>
                  Edit
                </Link>
              </td>
              <td>
              <button
                  className="btn btn-secondary"
                  onClick={() => deleteUser(x.username)}
                >
                  {x.is_blocked ? 'Unblock':'Block'}
                </button>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteUser(x.username)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}