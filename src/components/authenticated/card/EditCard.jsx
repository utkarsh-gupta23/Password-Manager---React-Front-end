import React, { useState } from "react";
import CustomInput from "./CustomInput";
import "./EditCard.css";
const EditableCard = ({
  title,
  username,
  password,
  website,
  onSave,
  onCancel,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newUsername, setNewUsername] = useState(username);
  const [newPassword, setNewPassword] = useState(password);
  const [newWebsite, setNewWebsite] = useState(website);
  const [errors, setErrors] = useState({});

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validate = () => {
    let formErrors = {};
    if (!newTitle) formErrors.title = "Title is required";
    if (!newUsername) formErrors.username = "Username is required";
    if (newPassword.length < 6)
      formErrors.password = "Password must be at least 6 characters";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      onSave({
        title: newTitle,
        username: newUsername,
        password: newPassword,
        website: newWebsite,
      });
    }
  };

  return (
    <div className="card">
      <CustomInput
        placeholder="Title"
        onChange={setNewTitle}
        value={newTitle}
      />
      {errors && errors.title && (
        <p key={"title"} className="error-text">
          {errors.title}
        </p>
      )}
      <CustomInput
        placeholder="Username"
        onChange={setNewUsername}
        value={newUsername}
      />
      {errors && errors.username && (
        <p key={"username"} className="error-text">
          {errors.username}
        </p>
      )}

      <CustomInput
        placeholder="Website"
        onChange={setNewWebsite}
        value={newWebsite}
      />

      <label>
        <strong>Password:</strong>
      </label>
      <input
        type={showPassword ? "text" : "password"}
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="Password"
        className="editable-input"
      />
      {errors && errors.password && (
        <p key={"password"} className="error-text">
          {errors.password}
        </p>
      )}

      <button onClick={togglePasswordVisibility}>
        {showPassword ? "Hide" : "Show"}
      </button>
      <div className="buttons">
        <button onClick={handleSave} className="custom-button">
          Save
        </button>
        <button onClick={onCancel} className="custom-button">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditableCard;
