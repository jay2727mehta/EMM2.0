import React from 'react';
import { Box, Typography, Card } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { ReactComponent as ActivityIcon } from "../../config/svgfiles/activity.svg";
import { ReactComponent as WifiOffIcon } from "../../config/svgfiles/wifi-off.svg";
import './proxmity.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, Tooltip, Legend);

const MediumProximityCard = ({ Data, chartData }) => {
    const threshold = 61; // Set your threshold value here

    const data = {
        labels: chartData ? chartData.labels : '',
        datasets: [
            {
                type: 'bar',
                label: 'Frequency',
                data: chartData ? chartData.barData : '',
                backgroundColor: function(context) {
                    const value = context.raw;
                    return value >= threshold ? '#FF0000' : '#006DBC'; // Red if value >= threshold, otherwise Blue
                },
                borderColor: '#E5E7EB',
                borderWidth: 1,
                tension: 0.4,
            },
            {
                type: 'line',
                label: 'Trend',
                data: chartData ? chartData.lineData : '',
                borderColor: '#FF0000',
                backgroundColor: '#FF0000',
                fill: false,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 0,
                borderDash: [3, 3],
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                offset: true,
                grid: {
                    display: false,
                },
                ticks: {
                    font: {
                        size: 10,
                        color: '#9e9e9e',
                    },
                },
            },
            y: {
                display: true,
                ticks: {
                    font: {
                        size: 10,
                        color: '#9e9e9e',
                    },
                },
                afterDataLimits(scale) {
                    scale.max += 10; // Adjust y-axis max to make room for the line
                },
            },
        },
        plugins: {
            legend: {
                display: false,
                labels: {
                    color: '#9e9e9e',
                },
            },
            annotation: {
                annotations: {
                    line1: {
                        type: 'line',
                        yMin: threshold,
                        yMax: threshold,
                        borderColor: 'red',
                        borderWidth: 2,
                        label: {
                            enabled: true,
                            content: `Threshold (${threshold})`,
                            position: 'end',
                        },
                    },
                },
            },
        },
    };

    const getColorSettings = (value) => {
        if (value === 'Active') {
            return { bgColor: '#E9EEEF', borderColor: '#E9EEEF', colors: '#006DBC', fontColor: '#878A8B' };
        } else if (value === 'Warning') {
            return { bgColor: '#FFF0D9', borderColor: '#FF740E', colors: '#FF6B00', fontColor: '#FF6B00' };
        } else if (value === 'Alert') {
            return { bgColor: '#FFD9D9', borderColor: '#FF0E0E', colors: '#FF0000', fontColor: '#FF0000' };
        }
        return { bgColor: '#E5EBEB', borderColor: '#E5EBEB', colors: '#757676', fontColor: '#757676' };
    };

    const tempCheck = getColorSettings(Data.value ? Data.value : undefined);

    const styles = {
        thinBorder: {
            border: "0.5px solid #E5E7EB",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
            backgroundColor: "rgba(255, 255, 255, 0.68)",
        },
    };

    return (
        <Card sx={{ ...styles.thinBorder, width: 800, height: '250px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 5, borderRadius: '20px', bgcolor: tempCheck.bgColor, borderColor: tempCheck.borderColor, borderWidth: 2 }}>
            <Box display="flex" alignItems="center" justifyContent="space-evenly" gap='20px'>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', color: tempCheck.colors }}>
                        <ActivityIcon className="temperature-icon" width={32} height={32} />
                        <Typography variant='h6' fontWeight='bold' sx={{ marginLeft: '5px' }}>
                            Proximity
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column',gap : '15px' }}>
                        {Data.value ?
                            <Typography sx={{ fontSize: '48px', fontWeight: 'bold', color: tempCheck.colors, textAlign: 'center' }}>{Data.value}</Typography>
                            : <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: tempCheck.colors, marginTop: '10px', marginBottom: '20px' }}><WifiOffIcon className="temperature-icon" width={72} height={72} /></Box>}
                        <Box sx={{ color: tempCheck.fontColor }}>
                            <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }}>{Data.meter_name}</Typography>
                            <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }}>{Data.location}</Typography>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ margin: 'auto' }}>
                    <Bar data={data} options={options} width='500' height='200' />
                </Box>
            </Box>
        </Card>
    );
};

export default MediumProximityCard;

