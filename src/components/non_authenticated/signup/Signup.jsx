import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useSignup } from "../../../hooks/useSignup";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { signup, error, isLoading } = useSignup();
  const [formData, setFormData] = useState({
    username: "",
    displayName: "",
    password: "",
    passwordConfirm: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.username) formErrors.username = "Username is required";
    if (!formData.displayName)
      formErrors.displayName = "Display name is required";
    if (!formData.password) formErrors.password = "Password is required";
    if (formData.password.length < 6)
      formErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.passwordConfirm)
      formErrors.passwordConfirm = "Passwords do not match";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle successful form submission here
      await signup(
        formData.username,
        formData.password,
        formData.passwordConfirm,
        formData.displayName
      );
      // console.log("Form Submitted", formData);
    }
  };

  return (
    <Box
      sx={{
        width: 400,
        margin: "auto",
        padding: 3,
        borderRadius: 2,
        boxShadow: 3,
        mt: 5,
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          label="Username"
          name="username"
          variant="outlined"
          value={formData.username}
          onChange={handleChange}
          error={!!errors.username}
          helperText={errors.username}
          sx={{ mb: 2 }}
          autoComplete="off"
        />
        <TextField
          fullWidth
          label="Display Name"
          name="displayName"
          variant="outlined"
          value={formData.displayName}
          onChange={handleChange}
          error={!!errors.displayName}
          helperText={errors.displayName}
          sx={{ mb: 2 }}
          autoComplete="off"
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
          sx={{ mb: 2 }}
          autoComplete="off"
        />
        <TextField
          fullWidth
          label="Confirm Password"
          name="passwordConfirm"
          type="password"
          variant="outlined"
          value={formData.passwordConfirm}
          onChange={handleChange}
          error={!!errors.passwordConfirm}
          helperText={errors.passwordConfirm}
          sx={{ mb: 2 }}
          autoComplete="off"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Sign Up
        </Button>
      </form>
      {error && (
        <Typography
          variant="body2"
          color="error"
          sx={{ mt: 2, textAlign: "center" }}
        >
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default Signup;
