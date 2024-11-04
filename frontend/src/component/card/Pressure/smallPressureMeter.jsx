import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import React from 'react';
import { ReactComponent as PressureIcon } from "../../config/svgfiles/clock.svg";
import { ReactComponent as WifiOffIcon } from "../../config/svgfiles/wifi-off.svg";
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import './pressure.css'

const SmallPressureMeter = ({ Data }) => {

    const getColorSettings = (value) => {
        if (value <= 60) {
            return { bgColor: "#E9EEEF", borderColor: '#E9EEEF', colors: '#006DBC', fontColor: '#878A8B', fillCol: '#0477BF' };
        } else if (value > 60 && value < 85) {
            return { bgColor: '#FFF0D9', borderColor: '#FF740E', colors: '#FF6B00', fontColor: '#FF6B00', fillCol: '#F25C05' };
        } else if (value >= 85) {
            return { bgColor: '#FFD9D9', borderColor: '#FF0E0E', colors: '#FF0000', fontColor: '#FF0000', fillCol: '#F20505' };
        }
        return { bgColor: '#E5EBEB', borderColor: '#E5EBEB', colors: '#757676', fontColor: '#757676', fillCol: '#D6D6D6' };
    };

    const tempCheck = getColorSettings(Data.value ? Data.value : undefined);

    const data = {
        datasets: [
            {
                data: [Data.value, 100 - Data.value], // 75% filled, 25% empty
                backgroundColor: [`${tempCheck.fillCol}`, `#CCCCCC`], // Green for filled, grey for empty
                borderWidth: 0,
                borderColor: `#E5E7EB`,
                cutout: '90%', // This makes the chart look like a gauge
                rotation: -117, // Rotate to start from the top
                circumference: 235, // Display only 75% of the chart (270 degrees)
            },
        ],
    };

    const options = {
        rotation: -130, // Start angle for the gauge
        circumference: 260, // Sweep angle for the gauge (270 degrees = 75%)
        plugins: {
            tooltip: { enabled: false }, // Disable tooltips
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    const styles = {
        thinBorder: {
            border: "0.5px solid #E5E7EB",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
            backgroundColor: "rgba(255, 255, 255, 0.68)",
        },
    };

    return (
        <Card sx={{ ...styles.thinBorder, width: '300px', height: '250px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 5, borderRadius: '20px', bgcolor: "#F1F4F5", borderWidth: 2 }}>
            <CardContent sx={{ position: 'relative', }}>
                <Box sx={{ position: 'absolute', top: -20, left: 0, right: 0, height: 200 }}>
                    <Doughnut data={data} options={options} />
                </Box>
                <Box sx={{ position: 'absolute', textAlign: 'center', left: 0, right: 0, }}>
                    {Data.value ? <Box> <Box sx={{ textAlign: 'center', fontSize: '60px', fontWeight: 'bold', color: tempCheck.colors, position: 'relative', top: 25 }}>{Data.value}<sup style={{ fontSize: '24px', verticalAlign: 'top' }}>Pa</sup></Box>
                        <Box sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '18px', position: 'relative', top: 5 }} color={tempCheck.colors}>
                            Pressure
                        </Box> </Box> : <Box sx={{ color: tempCheck.colors, position: 'relative', top: 30 }}><WifiOffIcon className="temperature-icon" width={84} height={84} /></Box>}
                    <Box sx={{ color: '#757676', position: 'relative', top: Data.value ? 5 : 50 }}>
                        <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }}>{Data.meter_name}</Typography>
                        <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }}>{Data.location}</Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card >
    );
};

export default SmallPressureMeter;

