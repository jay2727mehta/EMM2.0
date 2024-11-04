import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ReactComponent as AQIcon } from "../../config/svgfiles/wind.svg";
import { ReactComponent as WifiOffIcon } from "../../config/svgfiles/wifi-off.svg";
import AirIcon from '@mui/icons-material/Air';
import './air.css'
import { getAirPollutionData } from '../../Services/weather.service';

const SmallAirCard = ({ Data }) => {
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState("pune");

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await getAirPollutionData(city);
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
        if (value < 2) {
            return { bgColor: '#E9EEEF', borderColor: '#E9EEEF', colors: '#006DBC', fontColor: '#878A8B' };
        } else if (value >= 3 && value <= 4) {
            return { bgColor: '#FFF0D9', borderColor: '#FF740E', colors: '#FF6B00', fontColor: '#FF6B00' };
        } else if (value >= 5) {
            return { bgColor: '#FFD9D9', borderColor: '#FF0E0E', colors: '#FF0000', fontColor: '#FF0000' };
        }
        return { bgColor: '#E5EBEB', borderColor: '#E5EBEB', colors: '#757676', fontColor: '#757676' };
    };

    const tempCheck = getColorSettings(weatherData ? weatherData.list[0].main.aqi : undefined);

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
                <AQIcon sx={{ fontSize : '32px'}} />
                <Typography variant='h6' fontWeight='bold' sx={{ marginLeft: '5px' }}>
                    AQI
                </Typography>
            </Box>
            <CardContent>
                {weatherData ? <Box>
                    <Box sx={{ textAlign: 'center', fontSize: '60px', fontWeight: 'bold', color: tempCheck.colors }}>{weatherData.list[0].main.aqi}</Box>
                </Box> : <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: tempCheck.colors, marginTop: '5px', marginBottom: '15px' }}><WifiOffIcon className="temperature-icon" width={72} height={72} /></Box>}
                <Box sx={{ color: tempCheck.fontColor }}>
                    <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }}>{Data && Data.meter_name || 'Neilsoft Campus'}</Typography>
                    <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }}>{Data && Data.location || 'SEZ'}</Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default SmallAirCard;

