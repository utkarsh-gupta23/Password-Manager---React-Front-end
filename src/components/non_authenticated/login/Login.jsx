import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useLogin } from "../../../hooks/useLogin";
import { Navigate, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();

  const { login, isLoading, error } = useLogin();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.username) formErrors.username = "Username is required";
    if (!formData.password) formErrors.password = "Password is required";
    if (formData.password.length < 6)
      formErrors.password = "Password must be at least 6 characters";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      await login(formData.username, formData.password);
      console.log("Form Submitted", formData);
    }
  };

  return (
    <Box
      sx={{
        width: 330,
        margin: "auto",
        padding: 3,
        borderRadius: 2,
        boxShadow: 3,
        mt: 5,
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Login
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
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
          sx={{ mb: 2 }}
          autoComplete="off"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ width: "45%" }}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            sx={{ width: "45%" }}
            onClick={() => {
              navigate("/home/signup");
            }}
          >
            Sign Up
          </Button>
        </Box>
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

export default LoginForm;
