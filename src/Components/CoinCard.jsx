import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, Typography, Grid, Avatar } from "@mui/material";

const CoinCard = ({ id, name, img, symbol, price, currencySymbol = "₹" }) => (
  <Link to={`/coin/${id}`} style={{ textDecoration: "none" }}>
    <Grid item >
      <Card
        sx={{
          backgroundColor: "grey.200",
          boxShadow: 3,
          borderRadius: "8px",
          transition: "all 0.3s",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      >
        <CardContent>
          <Avatar
            alt={name}
            src={img}
            sx={{
              width: 50,
              height: 50,
              margin: "0 auto",
              objectFit: "contain",
            }}
          />
          <Typography
            variant="h6"
            align="center"
            sx={{
              textTransform: "uppercase",
              fontWeight: "bold",
              marginTop: 2,
            }}
          >
            {symbol}
          </Typography>
          <Typography variant="body2" align="center" noWrap>
            {name}
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{ marginTop: 1 }}
            noWrap
          >
            {price ? `${currencySymbol}${price}` : "NA"}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  </Link>
);

export default CoinCard;
