import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, Divider } from '@mui/material';
import { ReactComponent as WifiOffIcon } from "../../config/svgfiles/wifi-off.svg";
import { ReactComponent as AQIcon } from "../../config/svgfiles/wind.svg";
import AirIcon from '@mui/icons-material/Air';
import { getAirPollutionData } from '../../Services/weather.service';


const MediumAirCard = ({ Data }) => {
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
        if (value <= 2) {
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
        <Card sx={{ ...styles.thinBorder, width: 610, height: '250px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 5, borderRadius: '20px', bgcolor: tempCheck.bgColor, borderColor: tempCheck.borderColor, borderWidth: 2 }}>
            <Box display="flex" alignItems="center" justifyContent="space-evenly" gap='20px'>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', color: tempCheck.colors }}>
                        <AQIcon sx={{ fontSize: '32px' }} />
                        <Typography variant='h6' fontWeight='bold' sx={{ marginLeft: '5px' }}>
                            AQI
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                        {weatherData ? <Box>
                            <Box sx={{ textAlign: 'center', fontSize: '60px', fontWeight: 'bold', color: tempCheck.colors }}>{weatherData.list[0].main.aqi}</Box>
                        </Box> : <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: tempCheck.colors, marginBottom: '20px' }}><WifiOffIcon className="temperature-icon" width={72} height={72} /></Box>}
                        <Box sx={{ color: tempCheck.fontColor }}>
                            <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }}>{Data.meter_name}</Typography>
                            <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }}>{Data.location}</Typography>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ margin: 'auto', display: "flex", flexDirection: 'column', gap: '10px', color: tempCheck.colors }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '40px' }}>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>PM2.5</Typography>
                        {weatherData ? <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>{weatherData.list[0].components.pm2_5} μg/m3</Typography> : <Typography sx={{ fontWeight: 'bold', letterSpacing: 3 }}>----</Typography>}
                    </Box>
                    <Divider sx={{ width: '275px' }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>PM10</Typography>
                        {weatherData ? <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>{weatherData.list[0].components.pm10} μg/m3</Typography> : <Typography sx={{ fontWeight: 'bold', letterSpacing: 3 }}>----</Typography>}
                    </Box>
                    <Divider />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>O3</Typography>
                        {weatherData ? <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>{weatherData.list[0].components.o3} μg/m3</Typography> : <Typography sx={{ fontWeight: 'bold', letterSpacing: 3 }}>----</Typography>}
                    </Box>
                    <Divider sx={{}} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>NO2</Typography>
                        {weatherData ? <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>{weatherData.list[0].components.no2} μg/m3</Typography> : <Typography sx={{ fontWeight: 'bold', letterSpacing: 3 }}>----</Typography>}
                    </Box>
                </Box>
            </Box>
        </Card>
    );
};

export default MediumAirCard;