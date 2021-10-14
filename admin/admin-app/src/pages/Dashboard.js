import React, { useState, useEffect } from "react";
import UserFollowedBar from "../components/graphs/UserFollowedBar";
import UserFollowingBar from "../components/graphs/UserFollowingBar";
import { getUsers } from "../data/repository";

export default function Dashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const users = await getUsers();
    setUsers(users);
  };

  return (
    <div>
      <h1>Dash</h1>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <UserFollowingBar users={users} />
          </div>
          <div className="col-md-6">
            <UserFollowedBar users={users} />
          </div>
        </div>
      </div>
    </div>
  );
}
