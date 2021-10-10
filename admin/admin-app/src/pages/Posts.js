import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../data/repository";

export default function Posts() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [Posts, setPosts] = useState([]);

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

  return (
    <div>
      <h1>Posts</h1>
    </div>
  );
}
