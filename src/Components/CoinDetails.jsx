import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../index";
import { Box, Button, Container, Stack, Typography, Badge, Grid, LinearProgress } from "@mui/material";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";
import Chart from "./Chart";
import { Radio, RadioGroup, FormControlLabel, FormControl } from "@mui/material";

const CoinDetails = () => {
    const params = useParams();
    const [coin, setCoin] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [currency, setCurrency] = useState("inr");
    const [days, setDays] = useState("24h");
    const [chartArray, setChartArray] = useState([]);

    const currencySymbol =
        currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

    const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"];

    const switchChartStats = (key) => {
        setDays(key);
        setLoading(true);
    };

    useEffect(() => {
        const fetchCoin = async () => {
            try {
                const { data } = await axios.get(`${server}/coins/${params.id}`);
                const { data: chartData } = await axios.get(
                    `${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`
                );
                setCoin(data);
                setChartArray(chartData.prices);
                setLoading(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        fetchCoin();
    }, [params.id, currency, days]);

    if (error) return <ErrorComponent message={"Error While Fetching Coin"} />;

    return (
        <Container maxWidth="xl" sx={{ padding: 4 }}>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <Box width="100%" sx={{ border: "1px solid", borderRadius: 2, padding: 2 }}>
                        <Chart arr={chartArray} currency={currencySymbol} days={days} />
                    </Box>

                    <Stack direction="row" spacing={2} p={2} overflowX="auto">
                        {btns.map((i) => (
                            <Button
                                disabled={days === i}
                                key={i}
                                onClick={() => switchChartStats(i)}
                                variant={days === i ? "contained" : "outlined"}
                                sx={{
                                    textTransform: "none",
                                    backgroundColor: days === i ? "primary.main" : "transparent",
                                }}
                            >
                                {i}
                            </Button>
                        ))}
                    </Stack>

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

                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="body2" textAlign="center" sx={{ opacity: 0.7, mb: 2 }}>
                                Last Updated On {Date(coin.market_data.last_updated).split("G")[0]}
                            </Typography>

                            <Box display="flex" justifyContent="center" mb={2}>
                                <img
                                    src={coin.image.large}
                                    alt={coin.name}
                                    style={{ width: "100px", height: "100px", objectFit: "contain" }}
                                />
                            </Box>

                            <Typography variant="h5" textAlign="center">
                                {coin.name}
                            </Typography>
                            <Typography variant="h4" textAlign="center" color="primary">
                                {currencySymbol}
                                {coin.market_data.current_price[currency]}
                            </Typography>
                            <Typography
                                variant="body2"
                                textAlign="center"
                                color={coin.market_data.price_change_percentage_24h > 0 ? "green" : "red"}
                            >
                                {coin.market_data.price_change_percentage_24h}%
                            </Typography>

                            <Box display="flex" justifyContent="center" mt={2}>
                                <Badge
                                    sx={{
                                        fontSize: "1.5rem",
                                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                                        color: "white",
                                        padding: "0.5rem",
                                    }}
                                >
                                    {`#${coin.market_cap_rank}`}
                                </Badge>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <CustomBar
                                high={`${currencySymbol}${coin.market_data.high_24h[currency]}`}
                                low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}
                                current={`${currencySymbol}${coin.market_data.current_price[currency]}`}
                            />

                            <Box>
                                <Item title="Max Supply" value={coin.market_data.max_supply != null ? coin.market_data.max_supply : 0.00} />
                                <Item
                                    title="Circulating Supply"
                                    value={coin.market_data.circulating_supply != null ? coin.market_data.circulating_supply : 0.00}
                                />
                                <Item
                                    title="Market Cap"
                                    value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}
                                />
                                <Item
                                    title="All Time Low"
                                    value={`${currencySymbol}${coin.market_data.atl[currency]}`}
                                />
                                <Item
                                    title="All Time High"
                                    value={`${currencySymbol}${coin.market_data.ath[currency]}`}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </>
            )}
        </Container>
    );
};

const Item = ({ title, value }) => (
    <Stack direction="row" justifyContent="space-between" sx={{ my: 2 }}>
        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            {title}
        </Typography>
        <Typography variant="body2">{value}</Typography>
    </Stack>
);

const CustomBar = ({ high, low, current }) => {

    const highValue = parseFloat(high.replace(/[^0-9.]/g, ""));
    const lowValue = parseFloat(low.replace(/[^0-9.]/g, ""));
    const currentValue = parseFloat(current.replace(/[^0-9.]/g, ""));

    const progressValue = ((currentValue - lowValue) / (highValue - lowValue)) * 100;

    return (
        <Stack spacing={2}>
            <LinearProgress value={progressValue} variant="determinate" sx={{ width: '100%', color: 'teal', fontWeight: 'bold', padding: '0.5rem', }} />
            <Stack direction="row" justifyContent="space-between" sx={{ width: "100%" }}>
                <Badge sx={{
                    color: 'red',
                    fontWeight: 'bold',
                    padding: '0.5rem',
                }}>{low}</Badge>
                <Typography variant="body2">24H Range</Typography>
                <Badge
                    sx={{
                        color: 'green',
                        fontWeight: 'bold',
                        padding: '0.5rem',
                    }} >{high}</Badge>
            </Stack>
        </Stack>
    )
};

export default CoinDetails;
