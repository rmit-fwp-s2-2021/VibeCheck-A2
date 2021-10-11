import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPosts, updatePostStatus } from "../data/repository";

export default function Posts() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    refreshPosts();
  }, []);

  const refreshPosts = async () => {
    setIsLoaded(false);
    setError(null);
    const posts = await getPosts();
    setPosts(posts);
    setIsLoaded(true);
  };

  const toggleDelete = async (event, post) => {
    event.preventDefault();
    const post_id = post.post_id;
    const is_deleted = post.is_deleted;
    if (
      !window.confirm(`Are you sure you want to delete Post ID ${post_id} ?`)
    ) {
      return;
    }

    // Toggle is_deleted attribute of a post.
    await updatePostStatus(post_id, !is_deleted);

    await refreshPosts();
  };

  return (
    <div>
      <h1>Posts</h1>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Post ID</th>
            <th>Text</th>
            <th>Post Image</th>
            <th>Parent or reply</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {posts.map((x) => (
            <tr key={x.post_id}>
              <td>{x.post_id}</td>
              <td>{x.text}</td>
              <td>{x.img_url ? <img src={x.img_url} /> : "No img"}</td>
              <td>
                {x.parent_post_id
                  ? "Reply to " + x.parent_post_id
                  : "Parent Post"}
              </td>
              <td>
                <button
                  className={
                    x.is_deleted ? "btn btn-success" : "btn btn-danger"
                  }
                  onClick={(event) => toggleDelete(event, x)}
                >
                  {x.is_deleted ? "Restore" : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
