import React from "react";
import { getHumanReadableDate } from "../Util";

export default function ProfileCard(props) {
  return (
    <div className="card">
      <img
        className="card-img-top"
        src={props.user.img_url ? props.user.img_url : "user.png"}
        alt="Card image cap"
      ></img>
      <div className="card-body">
        <h5 className="card-title">{props.user.first_name} {props.user.last_name}</h5>
        <p className="card-text">
          {props.user.email} <br />
          Joining date : {getHumanReadableDate(props.user.createdAt)}
        </p>
        <a href="#" className="btn btn-primary" onClick={props.handleEdit}>
          Edit
        </a>
        <div>&nbsp;</div>
        <a
          href="#"
          className="btn btn-danger"
          onClick={() => props.handleDelete(props.user.username)}
        >
          Delete
        </a>
      </div>
    </div>
  );
}
