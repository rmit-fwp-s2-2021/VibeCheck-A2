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

  return (
    <>
      {
        // Render all posts and not replies to post.
        props.posts.map((x) => (
          <div key={x.post_id}>
            {x.parent_post_id === null && (
              <PostContainer
                key={"post-" + x.post_id}
                user={props.user}
                post={x}
                handleEdit={props.handleEdit}
                handleDelete={props.handleDelete}
                handleReply={props.handleReply}
                handleReaction={props.handleReaction}
              />
            )}

            <div className="col-md-10 offset-md-2">
              {getReplies(x.post_id).map((reply, i) => (
                <PostContainer
                  key={"reply-" + x.post_id + i}
                  user={props.user}
                  post={reply}
                  handleEdit={props.handleEdit}
                  handleDelete={props.handleDelete}
                  handleReply={props.handleReply}
                  handleReaction={props.handleReaction}
                />
              ))}
            </div>
          </div>
        ))
      }
    </>
  );
}

