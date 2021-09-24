import React, { useState, useEffect } from "react";

export default function PostList(props) {

  const getNameFromUrl = (str) => {
    const pieces = str.split("\\");
    const last = pieces[pieces.length - 1];
    return last;
  };
  
  return (
    <>
      {props.posts.map((x) => (
        <div key={x.post_id}>
          <div className="border my-3 p-3" style={{ whiteSpace: "pre-wrap" }}>
            <h3 className="text-primary">{x.username}</h3>
            <div className="row">
              {x.img_url != null && (
                <div className="col-sm-6">
                  <img src={"http://127.0.0.1:8887/" + getNameFromUrl(x.img_url)} />
                </div>
              )}
              <div className="col-sm-6">{x.text}</div>
            </div>
            <div className="row">
              <a
                href="#"
                className="btn btn-primary"
                onClick={() => props.handleReply(x.post_id)}
              >
                Reply
              </a>
              <div>&nbsp;</div>

              {x.username === props.user.username && (
                <>
                  <a
                    href="#"
                    className="btn btn-success"
                    data-toggle="modal"
                    data-target="#exampleModal"
                    onClick={event => props.handleEdit(event, x.post_id)}
                  >
                    Edit
                  </a>
                  <div>&nbsp;</div>
                  <a
                    href="#"
                    className="btn btn-danger"
                    onClick={event => props.handleDelete(event, x.post_id)}
                  >
                    Delete
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
