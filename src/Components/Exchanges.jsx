import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../index";
import {
    Container,
    Typography,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Link,
} from "@mui/material";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";

const Exchanges = () => {
    const [exchanges, setExchanges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchExchanges = async () => {
            try {
                const { data } = await axios.get(`${server}/exchanges`);
                setExchanges(data);
                setLoading(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        fetchExchanges();
    }, []);

    if (error)
        return <ErrorComponent message={"Error While Fetching Exchanges"} />;

    return (
        <Container maxWidth="xl" sx={{ mt: 4 }}>
            {loading ? (
                <Loader />
            ) : (
                <Grid container spacing={4} justifyContent="center">
                    {exchanges.map((i) => (
                        <Grid item key={i.id} xs={12} sm={6} md={2}>
                            <ExchangeCard
                                name={
                                    i.name.length > 15
                                        ? i.name.substring(0, 15) + "..."
                                        : i.name
                                }
                                img={i.image}
                                rank={i.trust_score_rank}
                                url={i.url}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

const ExchangeCard = ({ name, img, rank, url }) => (
    <Link href={url} target="_blank" underline="none" style={{textDecoration: "none"} }>
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
            <CardMedia
                component="img"
                image={img}
                alt={"Exchange"}
                sx={{
                    width: 50,
                    height: 50,
                    margin: "0.5rem auto ",
                    objectFit: "contain"
                }}
            />
            <CardContent>
                <Typography variant="h6" gutterBottom align="center">
                    {rank}
                </Typography>
                <Typography variant="body1" noWrap align="center">
                    {name}
                </Typography>
            </CardContent>
        </Card>
    </Link>
);

export default Exchanges;
