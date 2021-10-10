import React, { useEffect, useReducer, useState } from "react";
import { getPostReaction, getPostReactionCount } from "../data/repository";

export default function PostContainer(props) {
  const [like_count, setLikeCount] = useState(0);
  const [dislike_count, setDislikeCount] = useState(0);
  const [is_liked, setIsLiked] = useState(null);

  useEffect(() => {
    loadReactionCounts();
    loadReaction();
  }, []);

  const loadReaction = async () => {
    const reaction = await getPostReaction(
      props.user.username,
      props.post.post_id
    );
    setIsLiked(reaction != null ? reaction.is_liked : null);
  };

  const loadReactionCounts = async () => {
    const like_count = await getPostReactionCount(props.post.post_id, true);
    setLikeCount(like_count);
    const dislike_count = await getPostReactionCount(props.post.post_id, false);
    setDislikeCount(dislike_count);
  };

  const getNameFromUrl = (str) => {
    const pieces = str.split("\\");
    const last = pieces[pieces.length - 1];
    return last;
  };

  /**
   *
   * @param {string} name Name of btn (like or dislike)
   */
  const toggleActiveBtns = (name) => {
    const post_id = props.post.post_id;

    const like_btn = document.querySelector("#like-btn-" + post_id);
    const dislike_btn = document.querySelector("#dislike-btn-" + post_id);

    if (name === "like") {
      // Before highlighting, check and remove highlight of the other button.
      if (dislike_btn.classList.contains("dislike-active-btn")) {
        dislike_btn.classList.remove("dislike-active-btn");
      }
      like_btn.classList.toggle("like-active-btn");
    } else if (name === "dislike") {
      if (like_btn.classList.contains("like-active-btn")) {
        like_btn.classList.remove("like-active-btn");
      }
      dislike_btn.classList.toggle("dislike-active-btn");
    }
  };

  const handleReactionClick = async (event, post_id) => {
    const name = event.currentTarget.name;
    event.preventDefault();

    // Update DB
    await props.handleReaction(event, post_id);

    // Update state
    await loadReactionCounts();
    
    // Update button highlights
    toggleActiveBtns(name);
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
        <a
          href=""
          id={"like-btn-" + props.post.post_id}
          className={
            is_liked != null && is_liked === true
              ? "like-active-btn btn like-btn reaction-btn"
              : "btn like-btn reaction-btn"
          }
          onClick={(event) => handleReactionClick(event, props.post.post_id)}
          name="like"
        >
          <span>
            <i className="fas fa-thumbs-up"></i>
            {" " + like_count}
          </span>
        </a>
        <div>&nbsp;</div>
        <a
          href=""
          id={"dislike-btn-" + props.post.post_id}
          className={
            is_liked != null && is_liked === false
              ? "dislike-active-btn btn like-btn reaction-btn"
              : "btn like-btn reaction-btn"
          }
          onClick={(event) => handleReactionClick(event, props.post.post_id)}
          name="dislike"
        >
          <span>
            <i className="fas fa-thumbs-down"></i>
            {" " + dislike_count}
          </span>
        </a>
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
