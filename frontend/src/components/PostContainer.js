import React, { useEffect, useReducer, useState } from "react";
import { getPostReaction, getPostReactionCount } from "../data/repository";

export default function PostContainer(props) {

  //useReducer for number of likes/dislikes ?
  //const [state, dispatch] = useReducer(reducer, { count: 0 });
  const [like_count, setLikeCount] = useState(0);
  const [dislike_count, setDislikeCount] = useState(0);
  const [is_liked, setIsLiked] = useState(false);

  useEffect(() => {
    loadReactionCounts();
   // toggleReactionBtns(props.post.post_id)
  }, []);

  const loadReactionCounts = async () => {
    console.log("loading..")
    const like_count = await getPostReactionCount(props.post.post_id, true);
    setLikeCount(like_count.count);
    const dislike_count = await getPostReactionCount(props.post.post_id, false);
    setDislikeCount(dislike_count.count);
    console.log("loaded..")
  }

  const getNameFromUrl = (str) => {
    const pieces = str.split("\\");
    const last = pieces[pieces.length - 1];
    return last;
  };

  const toggleReactionBtns = async (post_id) => {
    const curr_user = props.user.username
    // get reactions by user.
    // has user liked post ?
    const reaction = await getPostReaction(curr_user, post_id);
    console.log(curr_user);
    console.log(post_id);

    if(reaction.is_liked === true){
      const ele = document.querySelector("#like-btn-"+post_id)
      if(ele.classList.contains("active-btn")){
        ele.classList.remove("active-btn");
      }else{
        ele.classList.add("active-btn");

      }
      console.log(ele);
    }else if(reaction.is_liked === false){
      const ele = document.querySelector("#dislike-btn-"+post_id)
      ele.classList.add("active-btn");
    }
  }

  const handleReactionClick = async (event, post_id) => {
    // Update DB
    await props.handleReaction(event, post_id);

    // Update state
    await loadReactionCounts();
   //TODO fix request call once await toggleReactionBtns(post_id);
    // TODO Update UI toggle btn
  }

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
          className="btn like-btn reaction-btn"
          onClick={(event) => handleReactionClick(event, props.post.post_id)}
          name="like"
        >
          <span><i className="fas fa-thumbs-up"></i>{" " + like_count}</span>
        </a>
        <div>&nbsp;</div>
        <a
          href=""
          id={"dislike-btn-" + props.post.post_id}
          className="btn dislike-btn reaction-btn"
          onClick={(event) => handleReactionClick(event, props.post.post_id)}
          name="dislike"
        >
          <span><i className="fas fa-thumbs-down"></i>{" " + dislike_count}</span>
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
