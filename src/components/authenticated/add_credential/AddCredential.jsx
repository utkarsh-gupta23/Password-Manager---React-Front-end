import React, { useContext, useState } from "react";
import {
  TextField,
  Button,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff, Clear } from "@mui/icons-material";
import { useCredentailContext } from "../../../hooks/useCredentialContext";
import axios from "axios";
import { API_URL } from "../../../constants";
import { ToastContext } from "../../../context/ToastContext";
import { Navigate } from "react-router-dom";

const AddCredentialForm = () => {
  const { dispatch } = useCredentailContext();
  const { dispatch: showSnackbar } = useContext(ToastContext);
  const onSubmit = async (data) => {
    data = {
      credential: {
        title: data.title,
        username: data.username,
        password: data.password,
        website: data.website,
      },
    };
    try {
      const response = await axios.post(`${API_URL}/credentials`, data, {
        withCredentials: true,
      });
      if (response.status == 201) {
        dispatch({ type: "CREATE", payload: response.data.credential });
        setFormData({
          title: "",
          username: "",
          password: "",
          website: "",
        });
        showSnackbar({
          type: "SUCCESS",
          payload: "Credential Added Successfully",
        });
      }
    } catch (error) {
      console.log(error);
      alert("error while adding");
    }
  };

  const [formData, setFormData] = useState({
    title: "",
    username: "",
    password: "",
    website: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClearField = (field) => {
    setFormData({ ...formData, [field]: "" });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.title) formErrors.title = "Title is required";
    if (!formData.username) formErrors.username = "Username is required";
    if (!formData.password) formErrors.password = "Password is required";
    if (!formData.website) formErrors.website = "Website is required";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      console.log("Form Submitted", formData);
    }
  };

  const handleClearAll = () => {
    setFormData({
      title: "",
      username: "",
      password: "",
      website: "",
    });
    setErrors({});
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "400px",
        margin: "30px auto",
        marginTop: "50px",
        border: "1px solid #ccc",
        padding: "20px",
      }}
      onSubmit={handleSubmit}
    >
      <TextField
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        error={!!errors.title}
        helperText={errors.title}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                sx={{ fontSize: "2px" }}
                onClick={() => handleClearField("title")}
              >
                <Clear />
              </IconButton>
            </InputAdornment>
          ),
        }}
        fullWidth
      />

      <TextField
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        error={!!errors.username}
        helperText={errors.username}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => handleClearField("username")}>
                <Clear />
              </IconButton>
            </InputAdornment>
          ),
        }}
        fullWidth
      />

      <TextField
        label="Password"
        name="password"
        type={showPassword ? "text" : "password"}
        value={formData.password}
        onChange={handleChange}
        error={!!errors.password}
        helperText={errors.password}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
              <IconButton onClick={() => handleClearField("password")}>
                <Clear />
              </IconButton>
            </InputAdornment>
          ),
        }}
        fullWidth
      />

      <TextField
        label="Website"
        name="website"
        value={formData.website}
        onChange={handleChange}
        error={!!errors.website}
        helperText={errors.website}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => handleClearField("website")}>
                <Clear />
              </IconButton>
            </InputAdornment>
          ),
        }}
        fullWidth
      />

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleClearAll}>
          Clear All
        </Button>
      </Box>
    </Box>
  );
};

export default AddCredentialForm;
