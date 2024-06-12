import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import axios from "axios";
export default function SignUpForm() {
  const [registered, setRegistered] = React.useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = {
      name: event.target.elements.name.value,
      email: event.target.elements.email.value,
      password: event.target.elements.password.value,
      isAdmin: false,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/auth/register",
        user,
        { headers: { "Content-Type": "application/json" } }
      );
      // Save token to local storage
      localStorage.setItem("token", response.data.token);
      const token = localStorage.getItem("token");
      console.log(token, "\n is the token");
      toast.success("Sign Up successful! please login to access the test!");
      // Fetch user info and update auth state
      setRegistered(!registered);
      // Optionally, you can redirect the user to another page here or after showing the success message
    } catch (error) {
      toast.error("There was an error signing up!");
      console.error("There was an error signing up!", error);
      // Handle error, e.g., show an error message
    }
  };
  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="family-name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
          />
        </Grid>
      </Grid>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign Up
      </Button>
    </Box>
  );
}
