import React, { useState, useEffect }  from "react";
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
      <UserFollowingBar users={users}/>
    </div>
  );
}
