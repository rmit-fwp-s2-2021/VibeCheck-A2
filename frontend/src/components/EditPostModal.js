import React, { useState, useEffect } from "react";

export default function EditPostModal(props) {
  const [post, setPost] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleInputChange = (event) => {
    setPost(event.target.value);
  };

  const getInitialFormData = () =>{
    const form_data = new FormData();
    form_data.set("")
  }
  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedPost = post.trim();

    if (trimmedPost === "") {
      setErrorMessage("A post cannot be empty.");
      return;
    }
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
                  <input type="file" />
                </div>
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
                    value="Post"
                  />
                </div>
              </fieldset>
            </form>
          </div>
          <div className="modal-footer">
            Update text or image
          </div>
        </div>
      </div>
    </div>
  );
}
