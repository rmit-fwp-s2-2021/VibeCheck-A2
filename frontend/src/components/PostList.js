import React, { useState, useEffect } from "react";

export default function PostList(props) {
  return (
    <>
      {props.posts.map((x) => (
        <div className="border my-3 p-3" style={{ whiteSpace: "pre-wrap" }}>
          <h3 className="text-primary">{x.username}</h3>
          {x.text}
        </div>
      ))}
    </>
  );
}
