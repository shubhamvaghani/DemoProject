import React from "react";
import { CircularProgress, Stack, Box } from "@mui/material";

const Loader = () => {
  return (
    <Stack
      sx={{
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          animation: "partialSpin 1.5s infinite ease-in-out",
        }}
      >
        <CircularProgress
          variant="indeterminate"
          sx={{
            color: "black",
            animation: "none", 
          }}
          thickness={5}
          size={80}
        />
      </Box>

      <Box
        sx={{
          marginTop: 2,
          fontSize: "18px",
          fontWeight: "bold",
          color: "black",
        }}
      >
        Loading, please wait...
      </Box>

      <style>
        {`
          @keyframes partialSpin {
            0% {
              transform: rotate(0deg);
            }
            50% {
              transform: rotate(180deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </Stack>
  );
};

export default Loader;
