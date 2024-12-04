import React from "react";
import { Alert, Snackbar } from "@mui/material";

const ErrorComponent = ({ message }) => {
  return (
    <Snackbar
      open={true}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      autoHideDuration={6000} 
    >
      <Alert severity="error" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ErrorComponent;
