// Some code was referenced from Mathew Bolger's tutorials.
import React, { useState, useEffect } from "react";
import EditPostModal from "../components/EditPostModal";
import PostList from "../components/PostList";
import { getPosts, createPost, deletePost } from "../data/repository";

export default function Forum(props) {
  const [post, setPost] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  // Load posts.
  useEffect(() => {
    async function loadPosts() {
      const currentPosts = await getPosts();

      setPosts(currentPosts);
      setIsLoading(false);
    }

    loadPosts();
  }, []);

  const loadPosts = async () => {
    const currentPosts = await getPosts();

    setPosts(currentPosts);
    setIsLoading(false);
  };
  const handleInputChange = (event) => {
    setPost(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Trim the post text.
    const trimmedPost = post.trim();

    if (trimmedPost === "") {
      setErrorMessage("A post cannot be empty.");
      return;
    }

    // Create post.
    const newPost = { text: trimmedPost, username: props.user.username };
    await createPost(newPost);

    // Add post to locally stored posts.
    setPosts([...posts, newPost]);

    // Reset post content.
    setPost("");
    setErrorMessage("");
  };

  const handleEdit = async (post_id) => {
    if (post_id) {
    }
  };
  const handleDelete = async (post_id) => {
    if (post_id) {
      if (
        !window.confirm(`Are you sure you want to delete post ${post_id} ?`)
      ) {
        return;
      }
      await deletePost(post_id);
      loadPosts();
    } else {
      console.log("Post id cannot be null");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>New Post</legend>
          <div className="form-group">
            <textarea
              name="post"
              id="post"
              className="form-control"
              rows="3"
              value={post}
              onChange={handleInputChange}
            />
          </div>
          {errorMessage !== null && (
            <div className="form-group">
              <span className="text-danger">{errorMessage}</span>
            </div>
          )}
          <div className="form-group">
            <input
              type="button"
              className="btn btn-danger mr-5"
              value="Cancel"
              onClick={() => {
                setPost("");
                setErrorMessage(null);
              }}
            />
            <input type="submit" className="btn btn-primary" value="Post" />
          </div>
        </fieldset>
      </form>

      <hr />
      <h1>Forum</h1>
      <div>
        {isLoading ? (
          <div>Loading posts...</div>
        ) : posts.length === 0 ? (
          <span className="text-muted">No posts have been submitted.</span>
        ) : (
          <PostList
            posts={posts}
            user={props.user}
            handleDelete={handleDelete}
          />
        )}
      </div>
      <EditPostModal />
    </div>
  );
}
