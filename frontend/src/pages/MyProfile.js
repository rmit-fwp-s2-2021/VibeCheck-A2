import React from "react";
import ProfileCard from "../components/ProfileCard";

export default function MyProfile(props) {
  return (
    <div>
      <h1 className="display-4">My Profile</h1>
      <h4><strong>Hello {props.user.first_name} {props.user.last_name}!</strong></h4>
      <div className="row">
        <div className="col-md-6 sol-sm-12">
          <ProfileCard user={props.user} />
        </div>
      </div>
    </div>
  );
}
