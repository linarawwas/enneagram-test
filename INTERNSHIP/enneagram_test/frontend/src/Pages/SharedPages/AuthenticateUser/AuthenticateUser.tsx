import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { toast, ToastContainer } from "react-toastify";
import SignInForm from "./SignInForm.tsx";
import SignUpForm from "./SignUpForm.tsx";
import { useDispatch, useSelector } from "react-redux";
import { toggleAuthForm } from "../../../features/auth/authSlice.js";
// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function AuthenticateUser() {
  const isSignIn = useSelector((state: any) => state.auth.isSignIn);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleAuthForm());
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <ToastContainer />

      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <video
            autoPlay
            loop
            muted
            style={{
              // position: 'absolute',
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: -1,
            }}
          >
            <source
              src="https://videos.pexels.com/video-files/4146195/4146195-hd_1280_720_50fps.mp4"
              type="video/mp4"
            />
          </video>
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              To Take Our Personality Test, Please
              {isSignIn ? " Sign In" : " Sign Up"}
            </Typography>
            <Button onClick={handleToggle}>
              {isSignIn
                ? "Don't have an account? Please Sign Up"
                : "Already have an account? Sign In now!"}
            </Button>
            {isSignIn ? <SignInForm /> : <SignUpForm />}
          </Box>
      
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
