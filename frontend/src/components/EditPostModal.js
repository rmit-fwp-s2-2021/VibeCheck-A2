import React, { useState, useEffect } from "react";
import { getPost } from "../data/repository";

export default function EditPostModal(props) {
  const [post, setPost] = useState("");
  const [post_img, setPostImg] = useState(null);
  const [post_img_preview, setPostImgPreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    loadPost();
  }, [props.post_id_edit]);

  const loadPost = async () => {
      const post = await getPost(props.post_id_edit);
      if (post) {
        setPost(post.text);
      }
  };

  const handleInputChange = (event) => {
    setPost(event.target.value);
  };

  const handleFileChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    setPostImg(file);
    setPostImgPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedPost = post.trim();

    const form_data = new FormData();
    if (trimmedPost === "" && post_img === null) {
      setErrorMessage("Close modal if you do not want to update fields.");
      return;
    }
    form_data.set("text", trimmedPost);
    form_data.set("post_img", post_img);
    props.handleEdit(null, form_data);
  };

  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Edit Post
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <fieldset>
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
                    type="file"
                    id="post_img"
                    onChange={handleFileChange}
                  />
                </div>
                {post_img_preview && <img src={post_img_preview} />}

                <div className="form-group">
                  <input
                    type="button"
                    className="btn btn-danger mr-5"
                    value="Cancel"
                    data-dismiss="modal"
                    onClick={() => {
                      setPost("");
                      setErrorMessage(null);
                    }}
                  />
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value="Update Post"
                  />
                </div>
              </fieldset>
            </form>
          </div>
          <div className="modal-footer">Update text, image or both!</div>
        </div>
      </div>
    </div>
  );
}
