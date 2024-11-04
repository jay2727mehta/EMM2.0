import { Box, Card, CardContent, Divider, IconButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ReactComponent as AQIcon } from "../../config/svgfiles/wind.svg";
import { ReactComponent as WifiOffIcon } from "../../config/svgfiles/wifi-off.svg";
import './air.css'
import { getAirPollutionData } from '../../Services/weather.service';

const LargeAirCard = ({ Data }) => {
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
        if (value >= 1) {
            return { bgColor: '#E9EEEF', borderColor: '#E9EEEF', colors: '#006DBC', fontColor: '#878A8B', fillCol: '#D4E3EB' };
        } else if (value < 1 && value >= 0.5) {
            return { bgColor: '#FFF0D9', borderColor: '#FF740E', colors: '#FF6B00', fontColor: '#FF6B00', fillCol: '#ffe0bc' };
        } else if (value < 0.5) {
            return { bgColor: '#FFD9D9', borderColor: '#FF0E0E', colors: '#FF0000', fontColor: '#FF0000', fillCol: '#ffbcbc' };
        }
        return { bgColor: '#E5EBEB', borderColor: '#E5EBEB', colors: '#757676', fontColor: '#757676', fillCol: '#D6D6D6' };
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
        <Card sx={{ ...styles.thinBorder, width: 325, height: 568, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 5, borderRadius: '20px', bgcolor: tempCheck.bgColor, borderColor: tempCheck.borderColor, borderWidth: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', color: tempCheck.colors, gap: '8px' }}>
                <AQIcon />
                <Typography variant='h6' fontWeight='bold' sx={{ marginLeft: '5px' }}>
                    AQI
                </Typography>
            </Box>
            <CardContent>
                {weatherData ? <Box>
                    <Box sx={{ textAlign: 'center', fontSize: '72px', fontWeight: 'bold', color: tempCheck.colors }}>{weatherData.list[0].main.aqi}</Box>
                </Box> : <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: tempCheck.colors, marginTop: '5px', marginBottom: '15px' }}><WifiOffIcon className="temperature-icon" width={72} height={72} /></Box>}
                <Box sx={{ color: tempCheck.fontColor }}>
                    <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }}>{Data.meter_name}</Typography>
                    <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }}>{Data.location}</Typography>
                </Box>
            </CardContent>
            <Box sx={{ margin: 'auto', display: "flex", flexDirection: 'column', gap: '5px', color: tempCheck.colors }}>
                {weatherData ?
                    Object.entries(weatherData.list[0].components).map(([key, value], index, array) => (
                        <React.Fragment key={key}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '40px' }}>
                                <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>{key.toUpperCase()}</Typography>
                                {weatherData ? (
                                    <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>{value} μg/m³</Typography>
                                ) : (
                                    <Typography sx={{ fontWeight: 'bold', letterSpacing: 3 }}>----</Typography>
                                )}
                            </Box>
                            {index < array.length - 1 && <Divider />} {/* Divider added here */}
                        </React.Fragment>
                    ))

                    : ''}
                {/* <Divider sx={{ width: '235px' }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>Current</Typography>
                    {Data.value ? <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>{Data.current} A</Typography> : <Typography sx={{ fontWeight: 'bold', letterSpacing: 3 }}>----</Typography>}
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>Power Factor</Typography>
                    {Data.value ? <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>{Data.powerFactor}</Typography> : <Typography sx={{ fontWeight: 'bold', letterSpacing: 3 }}>----</Typography>}
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>Total Energy</Typography>
                    {Data.value ? <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>{Data.totalEnergy} MWh</Typography> : <Typography sx={{ fontWeight: 'bold', letterSpacing: 3 }}>----</Typography>}
                </Box> */}
            </Box>
        </Card>
    )
}

export default LargeAirCard;
