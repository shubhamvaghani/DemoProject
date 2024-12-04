import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import btcSrc from "../assets/btc.png";

const Home = () => {
  return (
    <Box 
      sx={{
        backgroundColor: "blackAlpha.900",
        width: "100%",
        height: "85vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <motion.div
        style={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        animate={{
          translateY: "20px",
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <img
          src={btcSrc}
          alt="Bitcoin"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            filter: "grayscale(1)",
          }}
        />
      </motion.div>

      <Typography
        variant="h2"
        align="center"
        sx={{
          fontWeight: "lighter",
          color: "whiteAlpha.700",
          position: "absolute",
          top: "calc(50% - 20px)", 
        }}
      >
        Xcrypto
      </Typography>
    </Box>
  );
};

export default Home;
