// Some code was referenced from Week09.
import { useState, useEffect, useContext } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import MessageContext from "../contexts/MessageContext";
import { getUser } from "../data/repository";

export default function EditUser() {
  const [profile, setProfile] = useState(null);
  const [fields, setFields] = useState(null);
  const [img, setImg] = useState(null);
  const [img_preview, setImgPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const { setMessage } = useContext(MessageContext);
  const history = useHistory();
  const { username } = useParams();

  useEffect(() => {
    async function loadProfile() {
      const currentProfile = await getUser(username);
      setProfile(currentProfile);
      setFieldsNullToEmpty(currentProfile);
    }
    loadProfile();
  }, [username]);

  // Ensure null is not used when setting fields.
  const setFieldsNullToEmpty = (currentFields) => {
    // Make a copy of currentFields so the original parameter is not modified.
    currentFields = { ...currentFields };

    for (const [key, value] of Object.entries(currentFields)) {
      currentFields[key] = value !== null ? value : "";
    }

    setFields(currentFields);
  };

  // Generic change handler.
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

    // Validate form and if invalid do not contact API.
    const fields = trimFields();

    const form_data = new FormData();
    form_data.set("firstname", fields.first_name);
    form_data.set("lastname", fields.last_name);
    if (img != null) {
      form_data.set("img", img);
    }
    // TODO Update profile.

    // Show success message.
    //setMessage(<><strong>{profile.first_name} {profile.last_name}</strong> profile has been updated successfully.</>);

    // Navigate to the profiles page.
    history.push("/");
  };

  const handleValidation = () => {
    // TODO ?
  };

  const trimFields = () => {
    const trimmedFields = {};
    Object.keys(fields).map((key) => (trimmedFields[key] = fields[key].trim()));
    setFields(trimmedFields);

    return trimmedFields;
  };

  const trimFieldsEmptyToNull = () => {
    const trimmedFields = {};

    for (const [key, value] of Object.entries(fields)) {
      let field = value;

      // If value is not null trim the field.
      if (field !== null) {
        field = field.trim();

        // If the trimmed field is empty make it null.
        if (field.length === 0) field = null;
      }

      trimmedFields[key] = field;
    }

    setFieldsNullToEmpty(trimmedFields);

    return trimmedFields;
  };

  if (profile === null || fields === null) return null;

  return (
    <>
      <h2>Update User {fields.username}</h2>

      <div className="row">
        <div className="col-md-6">
          <br />
          <form onSubmit={handleSubmit}>
            {/* <div className="form-group">
            <label htmlFor="username" className="control-label">
              Username
            </label>
            <input
              name="username"
              id="username"
              className="form-control"
              value={fields.username}
              onChange={handleInputChange}
            />
            {errors.username && (
              <div className="text-danger">{errors.username}</div>
            )}
          </div> */}
            <div className="form-group">
              <label htmlFor="firstname" className="control-label">
                First name
              </label>
              <input
                name="firstname"
                id="firstname"
                className="form-control"
                value={fields.first_name}
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
                value={fields.last_name}
                onChange={handleInputChange}
              />
              {errors.lastname && (
                <div className="text-danger">{errors.lastname}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password" className="control-label">
                Password{" "}
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
                Confirm password
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
              <input
                type="submit"
                className="btn btn-primary mr-5"
                value="Edit"
              />
              <Link className="btn btn-outline-dark" to="/">
                Cancel
              </Link>
            </div>
          </form>
        </div>
        <div className="col-md-6">
          <br />
          <div className="form-group">
            <label htmlFor="img" className="control-label">
              Update User Avatar
            </label>
            <br />
            <input
              type="file"
              accept="image/*"
              id="img"
              onChange={handleFileChange}
            />
            {img_preview && <img src={img_preview} />}
          </div>
        </div>
      </div>
    </>
  );
}
