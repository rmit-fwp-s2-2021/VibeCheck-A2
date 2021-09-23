import React, { useState, useEffect } from "react";

export default function PostList(props) {
  return (
    <>
      {props.posts.map((x) => (
        <div key={x.post_id}>
          <div className="border my-3 p-3" style={{ whiteSpace: "pre-wrap" }}>
            <h3 className="text-primary">{x.username}</h3>
            {x.text}
            <div className="row">
              <a
                href="#"
                className="btn btn-primary"
                onClick={props.handleReply}
              >
                Reply
              </a>

              {x.username === props.user.username && (
                <>
                  <a
                    href="#"
                    className="btn btn-primary"
                    onClick={props.handleEdit}
                  >
                    Edit
                  </a>
                  <div>&nbsp;</div>
                  <a
                    href="#"
                    className="btn btn-danger"
                    onClick={() => props.handleDelete(x.post_id)}
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
