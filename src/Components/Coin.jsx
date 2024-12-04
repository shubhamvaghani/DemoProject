import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../index";
import { Button, Container, Grid, Input, Box } from "@mui/material";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";
import CoinCard from "./CoinCard";
import { Radio, RadioGroup, FormControlLabel, FormControl } from "@mui/material";

const Coin = () => {
    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(1);
    const [currency, setCurrency] = useState("inr");

    const currencySymbol =
        currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

    const changePage = (page) => {
        setPage(page);
        setLoading(true);
    };

    const btns = new Array(132).fill(1);

    useEffect(() => {
        const fetchCoins = async () => {
            try {
                const { data } = await axios.get(
                    `${server}/coins/markets?vs_currency=${currency}&page=${page}&per_page=28`
                );
                setCoins(data);
                if (search !== "") {
                    const filteredCoins = data.filter((coin) =>
                        coin.name.toLowerCase().includes(search.toLowerCase())
                    );
                    setCoins(filteredCoins);
                }
                setLoading(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        fetchCoins();
    }, [currency, page, search]);

    if (error) return <ErrorComponent message={"Error While Fetching Coins"} />;

    return (
        <Container maxWidth="xl">

            {loading ? (
                <Loader />
            ) : (
                <>

                    <Box display="flex" justifyContent={"space-between"}>

                    <Box p={2}>
                        <FormControl component="fieldset" sx={{ mb: 4 }}>
                            <RadioGroup
                                row
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                                sx={{ gap: 2 }}
                            >
                                <FormControlLabel value="inr" control={<Radio />} label="INR" />
                                <FormControlLabel value="usd" control={<Radio />} label="USD" />
                                <FormControlLabel value="eur" control={<Radio />} label="EUR" />
                            </RadioGroup>
                        </FormControl>
                        </Box>

                        <Box p={2}>
                            <Input
                                fullWidth
                                placeholder="Search coins..."
                                size="medium"
                                onChange={(e) => setSearch(e.target.value)}
                                sx={{ maxWidth: 600 }}
                            />
                        </Box>
                    </Box>

                    <Grid container spacing={4} justifyContent="center">
                        {coins.map((coin) => (
                            <Grid item xs={12} sm={6} md={2} key={coin.id}>
                                <CoinCard
                                    id={coin.id}
                                    name={coin.name.length > 15 ? coin.name.substring(0, 15) + "..." : coin.name}
                                    price={coin.current_price}
                                    img={coin.image}
                                    symbol={coin.symbol}
                                    currencySymbol={currencySymbol}
                                />
                            </Grid>
                        ))}
                    </Grid>

                    <Box
                        display="flex"
                        alignItems="center"
                        p={4}
                        sx={{
                            width: '100%',
                            overflowX: 'auto',
                            mx: 'auto',
                        }}
                    >
                        {btns.map((item, index) => (
                            <Button
                                key={index}
                                variant="contained"
                                sx={{
                                    backgroundColor: "black",
                                    color: "white",
                                    margin: 0.5,
                                    "&:hover": {
                                        backgroundColor: "black",
                                    },
                                }}
                                onClick={() => changePage(index + 1)}
                            >
                                {index + 1}
                            </Button>
                        ))}
                    </Box>

                </>
            )}
        </Container>
    );
};

export default Coin;
