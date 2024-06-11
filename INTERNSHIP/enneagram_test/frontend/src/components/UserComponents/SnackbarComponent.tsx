// src/components/SnackbarComponent.tsx

import React, { useState } from "react";
import { Snackbar, SnackbarOrigin } from "@mui/material";

interface SnackbarComponentProps {
  message: string;
  vertical: "top" | "bottom";
  horizontal: "left" | "center" | "right";
}

const SnackbarComponent: React.FC<SnackbarComponentProps> = ({ message, vertical, horizontal }) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      onClose={handleClose}
      message={message}
      key={vertical + horizontal}
    />
  );
};

export default SnackbarComponent;
