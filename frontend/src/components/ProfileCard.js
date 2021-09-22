import React from "react";

export default function ProfileCard(props) {
  return (
    <div className="card">
      <img
        class="card-img-top"
        src={props.user.img_url ? props.user.img_url : "user.png"}
        alt="Card image cap"
      ></img>
      <div class="card-body">
        <h5 class="card-title">{props.user.first_name}</h5>
        <p class="card-text">
          {props.user.email} <br />
          <p className="small">Joining date : {props.user.joining_date}</p>
        </p>
        <a href="#" class="btn btn-primary">
          Edit
        </a>
        <a href="#" class="btn btn-primary">
          Delete
        </a>
      </div>
    </div>
  );
}
