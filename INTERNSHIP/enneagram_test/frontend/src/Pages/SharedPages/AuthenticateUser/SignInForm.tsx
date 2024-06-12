import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import Copyright from "./Copyright.tsx";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkAuthToken } from "../../../features/auth/authSlice.js";
export default function SignInForm() {
  let success = false;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {
      email: data.get("email"),
      password: data.get("password"),
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        user
      );
      toast.success("Sign in successful!");
      localStorage.setItem("token", response.data.token);

      localStorage.setItem("token", response.data.token);
      dispatch(checkAuthToken());
      dispatch(fetchAuthenticatedMe());
      navigate("/"); // Adjust the path as needed
    } catch (error) {
      toast.error("There was an error signing in!");
      console.error("There was an error signing in!", error);
      // Handle error, e.g., show an error message
    }
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
      />
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign In
      </Button>
      <Grid container>
        <Grid item xs>
          <Link href="#" variant="body2">
            Forgot password?
          </Link>
        </Grid>
      </Grid>
      <Copyright sx={{ mt: 5 }} />
    </Box>
  );
}
