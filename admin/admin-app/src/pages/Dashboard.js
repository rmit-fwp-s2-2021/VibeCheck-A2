import React, { useState, useEffect } from "react";
import PopularPostsBar from "../components/graphs/PopularPostsBar";
import UserFollowedBar from "../components/graphs/UserFollowedBar";
import UserFollowingBar from "../components/graphs/UserFollowingBar";
import { getPostReactions, getPosts, getUsers } from "../data/repository";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [post_reactions, setPostReactions] = useState([]);

  useEffect(() => {
    loadUsersAndPosts();
    loadPostReactions();
  }, []);

  const loadUsersAndPosts = async () => {
    const users = await getUsers();
    setUsers(users);
    const posts = await getPosts();
    console.log(posts);
    setPosts(posts);
  };

  const loadPostReactions = async () => {
    const postReactions = await getPostReactions();
    setPostReactions(postReactions);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <UserFollowingBar users={users} />
          </div>
          <div className="col-md-6">
            <UserFollowedBar users={users} />
          </div>
        </div>

        <br />
        <div className="row">
          <div className="col-md-12">
            <PopularPostsBar posts={posts} post_reactions={post_reactions} />
          </div>
        </div>
      </div>
    </div>
  );
}
