import React from "react";
import { Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Stack 
      direction="row" 
      spacing={2} 
      sx={{ p: 2, boxShadow: 1, backgroundColor: "#000" }}
    >
      <Button variant="text" sx={{ color: "#fff" }} component={Link} to="/">
        Home
      </Button>
      <Button variant="text" sx={{ color: "#fff" }} component={Link} to="/exchanges">
        Exchanges
      </Button>
      <Button variant="text" sx={{ color: "#fff" }} component={Link} to="/coin">
        Coins
      </Button>
    </Stack>
  );
};

export default Header;