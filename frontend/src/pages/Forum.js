// Some code was referenced from Mathew Bolger's tutorials.
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import EditPostModal from "../components/EditPostModal";
import PostList from "../components/PostList";
import {
  getPosts,
  createPost,
  deletePost,
  updatePost,
  createPostReaction,
  getPostReaction,
  deletePostReaction,
  updatePostReaction,
} from "../data/repository";

export default function Forum(props) {
  const history = useHistory();

  const [post, setPost] = useState("");
  const [post_img, setPostImg] = useState(null);
  const [post_img_preview, setPostImgPreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [post_id_edit, setPostEditId] = useState(0);

  useEffect(() => {
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

    const trimmedPost = post.trim();

    if (trimmedPost === "") {
      setErrorMessage("A post cannot be empty.");
      return;
    } else if (trimmedPost.length > 600) {
      setErrorMessage("A post cannot be more than 600 characters.");
      return;
    }

    const form_data = new FormData();
    form_data.set("username", props.user.username);
    form_data.set("text", trimmedPost);
    form_data.set("post_img", post_img);
    const newPost = { text: trimmedPost, username: props.user.username };
    await createPost(form_data);

    // Add post to locally stored posts.
    setPosts([...posts, newPost]);
    loadPosts();
    setPost("");
    setErrorMessage("");
  };

  const handleFileChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    setPostImg(file);
    setPostImgPreview(URL.createObjectURL(file));
  };

  const handleEdit = async (post_id, form_data = undefined) => {
    if (form_data === undefined) {
      setPostEditId(post_id); // flag post for editting by modal.
    } else {
      await updatePost(post_id_edit, form_data);
      loadPosts();
    }
  };

  const createReactionObj = (post_id, is_liked) => {
    const postReaction = {
      username: props.user.username,
      post_id: post_id,
      is_liked: is_liked,
    };

    return postReaction;
  };

  const handleReaction = async (event, post_id) => {
    //event.preventDefault();

    const name = event.currentTarget.name;
    const reaction = await getPostReaction(props.user.username, post_id);

    if (name === "like") {
      // Check if post has reactions
      if (reaction && reaction.is_liked != null) {
        if (reaction.is_liked === true) {
          // If like reaction exists, user wants to remove reaction.
          await deletePostReaction(props.user.username, post_id);
          //return;
        } else if (reaction.is_liked === false) {
          // If dislike reaction exists, user wants to update with like.
          const postReactionObj = createReactionObj(post_id, true);
          await updatePostReaction(
            props.user.username,
            post_id,
            postReactionObj
          );
        }
      } else {
        // If no previous reaction, user wants to create one.
        const postReactionObj = createReactionObj(post_id, true);
        await createPostReaction(postReactionObj);
      }
    } else if (name === "dislike") {
      if (reaction && reaction.is_liked != null) {
        if (reaction.is_liked === false) {
          await deletePostReaction(props.user.username, post_id);
        } else if (reaction.is_liked === true) {
          const postReactionObj = createReactionObj(post_id, false);
          await updatePostReaction(
            props.user.username,
            post_id,
            postReactionObj
          );
        }
      } else {
        const postReactionObj = createReactionObj(post_id, false);
        await createPostReaction(postReactionObj);
      }
    } else {
      console.log("Name err! " + name);
    }
  };

  const handleReply = async (parent_post_id) => {
    history.push(`/reply/${parent_post_id}`);
  };

  const handleDelete = async (event, post_id) => {
    event.preventDefault();
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
    <div className="forum">
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
          <div className="form-group">
            <input type="file" id="post_img" onChange={handleFileChange} />
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
                setPostImgPreview(null);
              }}
            />
            <input type="submit" className="btn btn-primary" value="Post" />
          </div>
        </fieldset>
      </form>

      {post_img_preview && <img src={post_img_preview} />}

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
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleReply={handleReply}
            handleReaction={handleReaction}
          />
        )}
      </div>
      <EditPostModal post_id_edit={post_id_edit} handleEdit={handleEdit} />
    </div>
  );
}
