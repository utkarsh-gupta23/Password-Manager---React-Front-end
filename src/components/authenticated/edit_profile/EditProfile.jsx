import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useUpdateUser } from "../../../hooks/useUpdateUser";

const EditProfile = () => {
  const { updateUser, isLoading, error } = useUpdateUser();
  const { user } = useAuthContext();
  const [formData, setFormData] = useState({
    username: user.user_name,
    displayName: user.display_name,
    password: "",
    new_password: "",
    new_password_confirm: "",
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
    if (formData.new_password.length > 0 && formData.new_password.length < 6)
      formErrors.new_password = "New Passwords must be alteast of 6 characters";
    if (formData.new_password !== formData.new_password_confirm)
      formErrors.new_password_confirm = "New Passwords do not match";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      await updateUser(
        formData.username,
        formData.displayName,
        formData.password,
        formData.new_password
      );
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
        Edit Profile
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
          label="New Password"
          name="new_password"
          type="password"
          variant="outlined"
          value={formData.new_password}
          onChange={handleChange}
          error={!!errors.new_password}
          helperText={errors.new_password}
          sx={{ mb: 2 }}
          autoComplete="off"
        />

        <TextField
          fullWidth
          label="Confirm New Password"
          name="new_password_confirm"
          type="password"
          variant="outlined"
          value={formData.new_password_confirm}
          onChange={handleChange}
          error={!!errors.new_password_confirm}
          helperText={errors.new_password_confirm}
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
          Update Details
        </Button>
      </form>
      {/* {error && (
        <Typography
          variant="body2"
          color="error"
          sx={{ mt: 2, textAlign: "center" }}
        >
          {error}
        </Typography>
      )} */}
    </Box>
  );
};

export default EditProfile;
