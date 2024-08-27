import React, { useState } from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditableCard from "./EditCard";

import "./Card.css";
import axios from "axios";
import { API_URL } from "../../../constants";
import { useCredentailContext } from "../../../hooks/useCredentialContext";

const Card = ({ title, username, password, website, id }) => {
  const { dispatch } = useCredentailContext();
  const handleClick = async () => {
    const response = await axios.delete(`${API_URL}/credentials/${id}`, {
      withCredentials: true,
    });
    if (response.status == 200) {
      dispatch({ type: "DELETE", payload: response.data.credential });
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async (updatedData) => {
    //handle the backend call here of successfully saving the data. if any error, show as a snack bar.
    try {
      const response = await axios.put(
        `${API_URL}/credentials/${id}`,
        updatedData,
        {
          withCredentials: true,
        }
      );
      if (response.status == 200) {
        dispatch({ type: "UPDATE", payload: { id: id, ...updatedData } });
      }
    } catch (error) {
      alert("error while updating");
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
  };
  if (isEditing) {
    return (
      <EditableCard
        title={title}
        username={username}
        password={password}
        website={website}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    );
  }
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>
        <strong>Username:</strong> {username}
      </p>
      <p>
        <strong>Website:</strong> {website}
      </p>
      <div className="password-field">
        <strong>Password: </strong>{" "}
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          readOnly
        />
        <button onClick={togglePasswordVisibility}>
          {showPassword ? "Hide" : "Show"}
        </button>
        <button onClick={copyToClipboard}>Copy</button>
      </div>
      <br />
      <div className="buttons">
        <Button
          startIcon={<EditIcon />}
          variant="outlined"
          className="custom-button"
          onClick={handleEdit}
        >
          Edit
        </Button>

        <Button
          startIcon={<DeleteIcon />}
          variant="outlined"
          className="custom-button"
          onClick={handleClick}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default Card;
