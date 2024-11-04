import { Box, Card, CardContent, Divider, IconButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ReactComponent as CloudIcon } from "../../config/svgfiles/cloud.svg";
import { ReactComponent as ArrowUpIcon } from "../../config/svgfiles/arrow-up.svg";
import { ReactComponent as ArrowDownIcon } from "../../config/svgfiles/arrow-down.svg";
import { ReactComponent as WifiOffIcon } from "../../config/svgfiles/wifi-off.svg";
import './whether.css'
import { getWeatherData } from "../../Services/weather.service";

const SmallWhetherCard = ({ Data }) => {
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState("pune");

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await getWeatherData(city);
                setWeatherData(response);
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        };

        // Fetch initial weather data
        fetchWeatherData();

        // Fetch weather data every 5 seconds
        const intervalId = setInterval(fetchWeatherData, 5000);

        // Clean up the interval when the component unmounts or when the effect re-runs
        return () => {
            clearInterval(intervalId);
        };
    }, [city]);

    const getColorSettings = (value) => {
        if (value < 40) {
            return { bgColor: '#E9EEEF', borderColor: '#E9EEEF', colors: '#006DBC', fontColor: '#878A8B' };
        } else if (value >= 40 && value < 55) {
            return { bgColor: '#FFF0D9', borderColor: '#FF740E', colors: '#FF6B00', fontColor: '#FF6B00' };
        } else if (value >= 55) {
            return { bgColor: '#FFD9D9', borderColor: '#FF0E0E', colors: '#FF0000', fontColor: '#FF0000' };
        }
        return { bgColor: '#E5EBEB', borderColor: '#E5EBEB', colors: '#757676', fontColor: '#757676' };
    };

    const tempCheck = getColorSettings(weatherData ? weatherData.main.temp: undefined);

    const styles = {
        thinBorder: {
            border: "0.5px solid #E5E7EB",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
            backgroundColor: "rgba(255, 255, 255, 0.68)",
        },
    };

    return (
        <Card sx={{ ...styles.thinBorder, width: 300, height: 250, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 5, borderRadius: '20px', bgcolor: tempCheck.bgColor, borderColor: tempCheck.borderColor, borderWidth: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', color: tempCheck.colors }}>
                <CloudIcon sx={{ fontSize: '32px' }} />
                <Typography variant='h6' fontWeight='bold' sx={{ marginLeft: '5px' }}>
                    Weather
                </Typography>
            </Box>
            <CardContent>
                {weatherData ? <Box>
                    <Box sx={{ textAlign: 'center', fontSize: '60px', fontWeight: 'bold', color: tempCheck.colors, position: 'relative', bottom: 8 }}>{weatherData.main.temp}<sup style={{ fontSize: '24px', verticalAlign: 'top' }}>°C</sup></Box>
                </Box> : <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: tempCheck.colors, marginTop: '5px', marginBottom: '15px' }}><WifiOffIcon className="temperature-icon" width={72} height={72} /></Box>}
                {weatherData ? <Box sx={{ color: tempCheck.fontColor }}>
                    <Box sx={{ display: 'flex', gap: '20px', color: tempCheck.colors, justifyContent: 'center', alignItems: 'center', position: 'relative', bottom: 10 }}>
                        <Box sx={{ display: 'flex' }}><ArrowUpIcon /><Typography sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '20px' }}>{weatherData.main.temp_max}<sup style={{ fontSize: '12px', verticalAlign: 'top' }}>°C</sup></Typography></Box>
                        <Divider orientation='vertical' flexItem sx={{ borderColor: tempCheck.colors, borderWidth: '0.5px' }} />
                        <Box sx={{ display: 'flex' }}><ArrowDownIcon /><Typography sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '20px' }}>{weatherData.main.temp_min}<sup style={{ fontSize: '12px', verticalAlign: 'top' }}>°C</sup></Typography></Box>
                    </Box>
                    <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }}>{weatherData.weather[0].description}</Typography>
                </Box> : <Typography sx={{ textAlign: 'center', fontWeight: 'bold', letterSpacing: 3, fontSize: '25px' }}>------</Typography>}
            </CardContent>
        </Card>
    );
};

export default SmallWhetherCard;

