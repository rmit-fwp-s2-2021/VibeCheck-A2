// Some code was referenced from Week09.
import { useState, useEffect, useContext } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import MessageContext from "../contexts/MessageContext";
import { getUser, updateUser } from "../data/repository";

export default function EditUser() {
  const [profile, setProfile] = useState(null);
  const [fields, setFields] = useState(null);
  const [img, setImg] = useState(null);
  const [img_preview, setImgPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [password, setPassword] = useState('');
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


    const user = {
      first_name: fields.first_name,
      last_name: fields.last_name,
      email: fields.email
    }

    const response = await updateUser(fields.username, fields.first_name, fields.last_name, fields.email);
    // Show success message.
    setMessage(<><strong>{profile.first_name} {profile.last_name}</strong> profile has been updated successfully.</>);

    // Navigate to the profiles page.
    history.push("/users");
  };


  if (profile === null || fields === null) return null;

  return (
    <>
      <h2>Update User {fields.username}</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <br />
            <div className="form-group">
              <label htmlFor="firstname" className="control-label">
                First name
              </label>
              <input
                name="first_name"
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
                name="last_name"
                id="lastname"
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
                Email{" "}
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-control"
                value={fields.email}
                onChange={handleInputChange}
              />
              {errors.password && (
                <div className="text-danger">{errors.email}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password" className="control-label">
                Password{" "}
                <small className="text-muted">
                  must be at least 6 characters
                </small>
              </label>
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
      </form>
    </>
  );
}
