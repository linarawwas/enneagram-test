// src/components/ButtonAppBar.tsx

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
import { clearMe, clearUser } from "../../features/auth/authSlice";

interface State {
  open: boolean;
  vertical: "top" | "bottom";
  horizontal: "left" | "center" | "right";
}

const ButtonAppBar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState<State>({
    open: true,
    vertical: "bottom",
    horizontal: "right",
  });
  const { vertical, horizontal, open } = state;

  const handleClick = (newState: Partial<State>) => () => {
    setState({ ...state, ...newState, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const handleLogout = () => {
    dispatch(clearMe());
    navigate("/login");
  };

  return (
    <Box sx={{ flexGrow: 1, marginBottom: 5 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Enneagram Test
          </Typography>
          <Box sx={{ display: "flex" }}>
            <Button
              onClick={handleClick({ vertical: "top", horizontal: "left" })}
              style={{ backgroundColor: "white" }}
            >
              Hint
            </Button>
            <Snackbar
              anchorOrigin={{ vertical, horizontal }}
              open={open}
              onClose={handleClose}
              message="The bigger the size of the circle, the more you agree :)"
              key={vertical + horizontal}
            />
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
