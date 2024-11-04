import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, Divider } from '@mui/material';
import { ReactComponent as WifiOffIcon } from "../../config/svgfiles/wifi-off.svg";
import { ReactComponent as CloudIcon } from "../../config/svgfiles/cloud.svg";
import { ReactComponent as ArrowUpIcon } from "../../config/svgfiles/arrow-up.svg";
import { ReactComponent as ArrowDownIcon } from "../../config/svgfiles/arrow-down.svg";
import { getWeatherData } from "../../Services/weather.service";

const MediumWhetherCard = ({ Data }) => {
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState("tokyo");

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
        if (value < 30) {
            return { bgColor: '#E9EEEF', borderColor: '#E9EEEF', colors: '#006DBC', fontColor: '#878A8B' };
        } else if (value >= 30 && value < 40) {
            return { bgColor: '#FFF0D9', borderColor: '#FF740E', colors: '#FF6B00', fontColor: '#FF6B00' };
        } else if (value >= 40) {
            return { bgColor: '#FFD9D9', borderColor: '#FF0E0E', colors: '#FF0000', fontColor: '#FF0000' };
        }
        return { bgColor: '#E5EBEB', borderColor: '#E5EBEB', colors: '#757676', fontColor: '#757676' };
    };

    const tempCheck = getColorSettings(weatherData ? weatherData.main.temp : undefined);

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
                    <Box sx={{
                        display: 'flex', alignItems: 'center', textAlign: 'left', color: tempCheck.colors, position: 'relative', bottom: 10
                    }}>
                        <CloudIcon sx={{ fontSize: '32px' }} />
                        <Typography variant='h6' fontWeight='bold' sx={{ marginLeft: '5px' }}>
                        天気
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                        {weatherData ? <Box>
                            <Box sx={{
                                textAlign: 'center', fontSize: '60px', fontWeight: 'bold', color: tempCheck.colors, position: 'relative', bottom: 15, whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}>{weatherData.main.temp}<sup style={{ fontSize: '24px', verticalAlign: 'top' }}>°C</sup></Box>
                        </Box> : <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: tempCheck.colors, marginBottom: '20px' }}><WifiOffIcon className="temperature-icon" width={72} height={72} /></Box>}
                        {weatherData ? <Box sx={{ color: tempCheck.fontColor }}>
                            <Box sx={{
                                display: 'flex', gap: '20px', color: tempCheck.colors, justifyContent: 'center', alignItems: 'center', position: 'relative', bottom: 18, whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}>
                                <Box sx={{ display: 'flex' }}><ArrowUpIcon /><Typography sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '18px' }}>{weatherData.main.temp_max}<sup style={{ fontSize: '12px', verticalAlign: 'top' }}>°C</sup></Typography></Box>
                                <Divider orientation='vertical' flexItem sx={{ borderColor: tempCheck.colors, borderWidth: '0.5px' }} />
                                <Box sx={{ display: 'flex' }}><ArrowDownIcon /><Typography sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '18px' }}>{weatherData.main.temp_min}<sup style={{ fontSize: '12px', verticalAlign: 'top' }}>°C</sup></Typography></Box>
                            </Box>
                            <Typography sx={{ textAlign: 'center', fontWeight: 'bold', position: 'relative', bottom: 0 }}>{weatherData.weather[0].description}</Typography>
                        </Box> : <Typography sx={{ textAlign: 'center', fontWeight: 'bold', letterSpacing: 3, fontSize: '25px' }}>------</Typography>}
                    </Box>
                </Box>
                <Box sx={{
                    margin: 'auto', display: "flex", flexDirection: 'column', gap: '10px', color: tempCheck.colors, position: 'relative', bottom: 10, whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '40px' }}>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>圧力</Typography>
                        {weatherData ? <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>{weatherData.main.pressure} hPa</Typography> : <Typography sx={{ fontWeight: 'bold', letterSpacing: 3 }}>----</Typography>}
                    </Box>
                    <Divider sx={{ width: '275px' }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>湿度</Typography>
                        {weatherData ? <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>{weatherData.main.humidity} %</Typography> : <Typography sx={{ fontWeight: 'bold', letterSpacing: 3 }}>----</Typography>}
                    </Box>
                    <Divider />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>風速</Typography>
                        {weatherData ? <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>{weatherData.wind.speed} m/s</Typography> : <Typography sx={{ fontWeight: 'bold', letterSpacing: 3 }}>----</Typography>}
                    </Box>
                    <Divider sx={{}} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>曇り</Typography>
                        {weatherData ? <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>{weatherData.clouds.all} %</Typography> : <Typography sx={{ fontWeight: 'bold', letterSpacing: 3 }}>----</Typography>}
                    </Box>
                </Box>
            </Box>
        </Card>
    );
};

export default MediumWhetherCard;