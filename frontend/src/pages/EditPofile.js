import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { updateUser } from "../data/repository";

export default function EditProfile(props) {
  const history = useHistory();
  const [fields, setFields] = useState({
    firstname: props.user.first_name,
    lastname: props.user.last_name,
    password: "",
    confirmPassword: "",
  });
  const [img, setImg] = useState(null);
  const [img_preview, setImgPreview] = useState(null);
  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  };

  const handleFileChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    setImg(file);
    setImgPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const fields = trimFields()
    const form_data = new FormData();
    form_data.set("firstname", fields.firstname);
    form_data.set("lastname", fields.lastname);
    // TODO pwd ??
    form_data.set("img", img);
    await updateUser(props.user.username, form_data);
    history.push("/profile");
  };

  const trimFields = () => {
    const trimmedFields = {};
    Object.keys(fields).map((key) => (trimmedFields[key] = fields[key].trim()));
    setFields(trimmedFields);

    return trimmedFields;
  };

  return (
    <div className="edit-profile">
      <h1>Edit Profile</h1>
      <hr />
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="form-group"></div>
            <div className="form-group">
              <label htmlFor="firstname" className="control-label">
                First name
              </label>
              <input
                name="firstname"
                id="firstname"
                className="form-control"
                value={fields.firstname}
                onChange={handleInputChange}
              />
              {errors.firstname && (
                <div className="text-danger">{errors.firstname}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="lastname" className="control-label">
                Last name
              </label>
              <input
                name="lastname"
                id="firstname"
                className="form-control"
                value={fields.lastname}
                onChange={handleInputChange}
              />
              {errors.lastname && (
                <div className="text-danger">{errors.lastname}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password" className="control-label">
                New Password{" "}
                <small className="text-muted">
                  must be at least 6 characters
                </small>
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                value={fields.password}
                onChange={handleInputChange}
              />
              {errors.password && (
                <div className="text-danger">{errors.password}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword" className="control-label">
                Confirm New password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                className="form-control"
                value={fields.confirmPassword}
                onChange={handleInputChange}
              />
              {errors.confirmPassword && (
                <div className="text-danger">{errors.confirmPassword}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="img" className="control-label">
                Upload user avatar.
              </label>
              <br />
              <input
                type="file"
                id="img"
                accept="image/*"
                onChange={handleFileChange}
              />
              {img_preview && <img src={img_preview} />}
            </div>
            <div className="form-group">
              <input
                type="submit"
                className="btn btn-primary mr-5"
                value="Edit"
              />
              <Link className="btn btn-outline-dark" to="/profile">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
