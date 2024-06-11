import React, { useState } from "react";
import { Snackbar, SnackbarOrigin } from "@mui/material";

/**
 * Interface for the SnackbarComponent props.
 */
interface SnackbarComponentProps {
  message: string; // Message to be displayed in the snackbar
  vertical: "top" | "bottom"; // Vertical position of the snackbar
  horizontal: "left" | "center" | "right"; // Horizontal position of the snackbar
}

/**
 * A component representing a snackbar for displaying messages.
 * 
 * @param {SnackbarComponentProps} props - Props for the SnackbarComponent.
 * @returns {JSX.Element} - JSX for the SnackbarComponent.
 */
const SnackbarComponent: React.FC<SnackbarComponentProps> = ({ message, vertical, horizontal }) => {
  const [open, setOpen] = useState(true); // State to control the open/close state of the snackbar

  // Function to handle snackbar close event
  const handleClose = () => {
    setOpen(false); // Close the snackbar
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }} // Set the anchor origin of the snackbar
      open={open} // Set the open state of the snackbar
      onClose={handleClose} // Handle close event
      message={message} // Set the message to be displayed in the snackbar
      key={vertical + horizontal} // Set a unique key for the snackbar
    />
  );
};

export default SnackbarComponent;
