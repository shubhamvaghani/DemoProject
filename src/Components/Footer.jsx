import React from "react";
import { Avatar, Box, Stack, Typography } from "@mui/material";

const avatarSrc = "https://avatars.githubusercontent.com/u/101635193";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "black",
        color: "rgba(255, 255, 255, 0.7)",
        minHeight: "8rem",
        px: 4,
        py: { xs: 3, sm: 2 },
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        height="100%"
        alignItems="center"
        spacing={2}
      >
        <Box
          sx={{
            width: "100%",
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            About Us
          </Typography>
          <Typography
            variant="body2"
            sx={{
              letterSpacing: "0.1em",
            }}
          >
            We are the best crypto trading app in India, we provide our
            guidance at a very cheap price.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            src={avatarSrc}
            sx={{
              width: "5rem",
              height: "5rem",
              marginTop: { xs: 2, sm: 0 },
            }}
          />
          <span  >Our Founder</span>
        </Box>
      </Stack>
    </Box>
  );
};

export default Footer;
