import { useState } from "react";

import { useNavigate }
from "react-router-dom";

import { toast }
from "react-toastify";

import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

function LoginPage() {

  const navigate =
    useNavigate();

  const [email,
    setEmail] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const handleLogin = () => {

    // Admin Login
    if (
      email ===
        "admin@gmail.com" &&

      password ===
        "admin@123"
    ) {

      localStorage.setItem(
        "isAuthenticated",
        "true"
      );

      localStorage.setItem(
        "role",
        "admin"
      );

      toast.success(
        "Admin Login Successful!"
      );

      navigate("/dashboard");
    }

    // Employee Login
    else if (
      email ===
        "jaanu@gmail.com" &&

      password ===
        "jaanu@123"
    ) {

      localStorage.setItem(
        "isAuthenticated",
        "true"
      );

      localStorage.setItem(
        "role",
        "employee"
      );

      toast.success(
        "Employee Login Successful!"
      );

      navigate("/dashboard");
    }

    // Invalid Login
    else {

      toast.error(
        "Invalid Email or Password"
      );
    }
  };

  return (

    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >

      <Paper
        elevation={4}
        sx={{
          padding: 4,
          width: 350,
        }}
      >

        <Typography
          variant="h4"
          gutterBottom
          align="center"
        >
          e-GRCP Login
        </Typography>

        <TextField
          fullWidth
          label="Email"
          margin="normal"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <Button
          fullWidth
          variant="contained"
          sx={{
            marginTop: 2,
          }}
          onClick={handleLogin}
        >
          Login
        </Button>

      </Paper>

    </Box>
  );
}

export default LoginPage;