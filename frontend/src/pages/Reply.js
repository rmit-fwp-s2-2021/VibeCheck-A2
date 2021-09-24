import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { createPost, getPost } from "../data/repository";

export default function Reply(props) {
  const history = useHistory();
  const { post_id } = useParams();

  const [post, setPost] = useState("");
  const [post_img, setPostImg] = useState(null);
  const [post_img_preview, setPostImgPreview] = useState(null);
  const [parent_post_obj, setParentPostObj] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    getParentPost();
  }, []);

  const getNameFromUrl = (str) => {
    const pieces = str.split("\\");
    const last = pieces[pieces.length - 1];
    return last;
  };

  const getParentPost = async () => {
    const parent_post = await getPost(post_id);
    setParentPostObj(parent_post);
  };
  const handleInputChange = (event) => {
    setPost(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmedPost = post.trim();

    if (trimmedPost === "") {
      setErrorMessage("A reply cannot be empty.");
      return;
    }

    const form_data = new FormData();
    form_data.set("username", props.user.username);
    form_data.set("text", trimmedPost);
    form_data.set("post_img", post_img);
    form_data.set("parent_post_id", props.parent_post_id);

    await createPost(form_data);
    history.push("/forum");
  };

  const handleFileChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    setPostImg(file);
    setPostImgPreview(URL.createObjectURL(file));
  };

  return (
    <div className="reply">
      <div className="row">
        <div className="col-sm-12">
          <div className="border my-3 p-3" style={{ whiteSpace: "pre-wrap" }}>
            <h3 className="text-primary">{parent_post_obj.username}</h3>
            <div className="row">
              {parent_post_obj.img_url != null && (
                <div className="col-sm-6">
                  <img
                    src={
                      "http://127.0.0.1:8887/" +
                      getNameFromUrl(parent_post_obj.img_url)
                    }
                  />
                </div>
              )}
              <div className="col-sm-6">{parent_post_obj.text}</div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>New Reply</legend>
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
    </div>
  );
}
