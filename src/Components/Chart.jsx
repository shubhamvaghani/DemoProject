import React from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Box, Typography, Grid } from "@mui/material";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Chart = ({ arr, currency, days }) => {
    const dates = arr.map(item =>
        days === "24h"
            ? new Date(item[0]).toLocaleTimeString()
            : new Date(item[0]).toLocaleDateString()
    );
    const prices = arr.map(item => item[1]);


    const data = {
        labels: dates,
        datasets: [
            {
                label: `Price in ${currency}`,
                data: prices,
                borderColor: "rgb(255,99,132)",
                backgroundColor: "rgba(255,99,132,0.5)",
            },
        ],
    };

    return (
        <Box sx={{ width: "100%", padding: 2 }}>
            <Typography
                variant="h5"
                component="div"
                sx={{ marginBottom: 2, textAlign: "center" }}
            >
                {`Price Trend (${currency})`}
            </Typography>


            <Grid container justifyContent="center" spacing={2}>
                <Grid item xs={12} md={8}>
                    <Box
                        sx={{
                            boxShadow: 3,
                            borderRadius: 2,
                            backgroundColor: "white",
                            padding: 2,
                            width: "100%",
                        }}
                    >
                        <Line
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                            }}
                            data={data}
                            height={400}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Chart;
