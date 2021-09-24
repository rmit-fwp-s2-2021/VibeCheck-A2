import React from "react";

export default function PostContainer(props) {
  const getNameFromUrl = (str) => {
    const pieces = str.split("\\");
    const last = pieces[pieces.length - 1];
    return last;
  };
  
  return (
    <div className="border my-3 p-3" style={{ whiteSpace: "pre-wrap" }}>
      <h3 className="text-primary">{props.post.username}</h3>
      <div className="row">
        {props.post.img_url != null && (
          <div className="col-sm-6">
            <img
              src={
                "http://127.0.0.1:8887/" + getNameFromUrl(props.post.img_url)
              }
            />
          </div>
        )}
        <div className="col-sm-6">{props.post.text}</div>
      </div>
      <div className="row">
      <i class="far fa-thumbs-up"></i>
      <i class="far fa-thumbs-down"></i>
      </div>
      <div className="row">
        <a
          href="#"
          className="btn btn-primary"
          onClick={() => props.handleReply(props.post.post_id)}
        >
          Reply
        </a>
        <div>&nbsp;</div>

        {props.post.username === props.user.username && (
          <>
            <a
              href="#"
              className="btn btn-success"
              data-toggle="modal"
              data-target="#exampleModal"
              onClick={() => props.handleEdit(props.post.post_id)}
            >
              Edit
            </a>
            <div>&nbsp;</div>
            <a
              href="#"
              className="btn btn-danger"
              onClick={(event) => props.handleDelete(event, props.post.post_id)}
            >
              Delete
            </a>
          </>
        )}
      </div>
    </div>
  );
}
