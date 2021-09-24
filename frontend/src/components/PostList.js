import React, { useState, useEffect } from "react";
import PostContainer from "./PostContainer";

export default function PostList(props) {
  const getNameFromUrl = (str) => {
    const pieces = str.split("\\");
    const last = pieces[pieces.length - 1];
    return last;
  };

  const getReplies = (post_id) => {
    const all_posts = props.posts;
    const replies = all_posts.filter(
      (post) => post.parent_post_id && post.parent_post_id === post_id
    );
    return replies;
  };

  const renderReplies = (post_id) => {
    const replies = getReplies(post_id);
    let reply_divs = [];
    for (const reply of replies) {
      reply_divs.push(<h2>{reply.text}</h2>);
    }
    return reply_divs;
  };

  return (
    <>
      {props.posts.map((x) => (
        <div key={x.post_id}>
          <PostContainer user={props.user} post={x} />

          <div className="col-md-8 offset-md-4">
          {getReplies(x.post_id).map((reply) => (
            <PostContainer user={props.user} post={reply} />
          ))}
          </div>

        </div>
      ))}
    </>
  );
}

// function ReplyList(props) {
//   return(
//     <>
//     {props.replies.map((x) => {

//     })}
//     </>
//   )
// }
