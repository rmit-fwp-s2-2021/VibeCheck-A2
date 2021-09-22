import React from "react";
import ProfileCard from "../components/ProfileCard";
import { deleteUser } from "../data/repository";
import { useHistory } from "react-router-dom";

export default function MyProfile(props) {
  const history = useHistory();

  const handleDelete = async (username) => {
    if (!window.confirm(`Are you sure you want to delete User ${username} ?`)) {
      return;
    }

    await deleteUser(username);
    props.logoutUser();
    history.push("/login");
  };

  const handleEdit = async (username) => {
    history.push("/editProfile");
  };

  return (
    <div>
      <h1 className="display-4">My Profile</h1>
      <h4>
        <strong>
          Hello {props.user.first_name} {props.user.last_name}!
        </strong>
      </h4>
      <div className="row">
        <div className="col-md-6 sol-sm-12">
          <ProfileCard
            user={props.user}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        </div>
      </div>
    </div>
  );
}
