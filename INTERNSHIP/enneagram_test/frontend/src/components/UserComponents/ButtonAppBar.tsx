import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar,
  Box,
  Button,
  Snackbar,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { clearMe } from "../../features/auth/authSlice";

/**
 * Interface for the state of Snackbar.
 */
interface State {
  open: boolean; // Snackbar open state
  vertical: "top" | "bottom"; // Snackbar vertical position
  horizontal: "left" | "center" | "right"; // Snackbar horizontal position
}

/**
 * A component representing the application's top app bar.
 * Displays the app title, a hint button, and a logout button.
 * 
 * @returns {JSX.Element} - JSX for the ButtonAppBar component.
 */
const ButtonAppBar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State for Snackbar
  const [state, setState] = useState<State>({
    open: true, // Snackbar initially open
    vertical: "bottom", // Snackbar vertical position
    horizontal: "right", // Snackbar horizontal position
  });
  const { vertical, horizontal, open } = state;

  // Function to handle opening Snackbar with new state
  const handleClick = (newState: Partial<State>) => () => {
    setState({ ...state, ...newState, open: true });
  };

  // Function to handle closing Snackbar
  const handleClose = () => {
    setState({ ...state, open: false });
  };

  // Function to handle logout action
  const handleLogout = () => {
    dispatch(clearMe()); // Dispatch clearMe action to clear user info
    navigate("/login"); // Navigate to the login page
  };

  return (
    <Box sx={{ flexGrow: 1, marginBottom: 5 }}>
      <AppBar position="static">
        <Toolbar>
          {/* App title */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Enneagram Test
          </Typography>
          <Box sx={{ display: "flex" }}>
            {/* Hint button */}
            <Button
              onClick={handleClick({ vertical: "top", horizontal: "left" })}
              style={{ backgroundColor: "white" }}
            >
              Hint
            </Button>
            {/* Snackbar for displaying hint */}
            <Snackbar
              anchorOrigin={{ vertical, horizontal }}
              open={open}
              onClose={handleClose}
              message="The bigger the size of the circle, the more you agree :)"
              key={vertical + horizontal}
            />
            {/* Logout button */}
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ButtonAppBar;
