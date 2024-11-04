import { Box, Card, CardContent, FormControl, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
import { ReactComponent as WifiOffIcon } from "../../config/svgfiles/wifi-off.svg";
import AirIcon from '@mui/icons-material/Air';
import './noise.css'

const SmallNoiseCard = ({ Data }) => {

    const [temperature, setTemperature] = useState('db');
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const handleMenuItemClick = (value) => {
        setTemperature(value);
        handleClose();
    };

    const convertTemperature = (value, unit) => {
        if (value < 0) {
            return 0;
          }
        switch (unit) {
            default: return value;
        }
    };

    const formatValue = (value) => {
        if (!value) {
            return 0; // Return a default value if `value` is undefined or null
        }

        if (value >= 1_000_000_000) {
            return (value / 1_000_000_000).toFixed(1) + 'b'; // Billions
        } else if (value >= 1_000_000) {
            return (value / 1_000_000).toFixed(1) + 'm'; // Millions
        } else if (value >= 1_000) {
            return (value / 1_000).toFixed(1) + 'k'; // Thousands
        } else {
            return value.toFixed(2); // For values less than 1,000
        }
    };

    const getColorSettings = (value) => {
        if (!Data || typeof Data.min_aud === 'undefined' || typeof Data.max_aud === 'undefined' || typeof Data.critical_aud === 'undefined') {
            return { bgColor: '#E5EBEB', borderColor: '#E5EBEB', colors: '#757676', fontColor: '#757676' };
        }

        if (value >= Data.min_aud && value <= Data.max_aud) {
            return { bgColor: '#E9EEEF', borderColor: '#E9EEEF', colors: '#006DBC', fontColor: '#878A8B' };
        } else if (value < Data.max_aud && value > Data.min_aud) {
            return { bgColor: '#FFF0D9', borderColor: '#FF740E', colors: '#FF6B00', fontColor: '#FF6B00' };
        } else if (value >= Data.critical_aud || value < Data.min_aud) {
            return { bgColor: '#FFD9D9', borderColor: '#FF0E0E', colors: '#FF0000', fontColor: '#FF0000' };
        }
        return { bgColor: '#E5EBEB', borderColor: '#E5EBEB', colors: '#757676', fontColor: '#757676' };
    };

    const temperatureValue = Data && Array.isArray(Data.meter_reading) ? Data.meter_reading[Data.meter_reading.length - 1] : 0;
    const convertedValue = convertTemperature(temperatureValue, temperature);
    const formattedValue = Data ? formatValue(convertedValue) : 0;
    const tempCheck = getColorSettings(temperatureValue);
    const fontSize = formattedValue ? formattedValue.toString().length > 3 ? '45px' : '60px' : '60px';

    const styles = {
        thinBorder: {
            border: "0.5px solid #E5E7EB",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
            backgroundColor: "rgba(255, 255, 255, 0.68)",
        },
    };

    return (
        <Card sx={{ border: "0.5px solid #E5E7EB", boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)", backgroundColor: "rgba(255, 255, 255, 0.68)", width: '300px', height: '250px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 5, borderRadius: '20px', bgcolor: tempCheck.bgColor, borderColor: tempCheck.borderColor, borderWidth: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', color: tempCheck.colors }}>
            <VolumeUpOutlinedIcon className="temperature-icon" width={32} height={32} />
            <Typography variant='h6' fontWeight='bold' sx={{ marginLeft: '5px' }}>Noise</Typography>
        </Box>
        <CardContent>
            {Data?.meter_reading?.length ? (
                <Box>
                    <Box sx={{ textAlign: 'center', fontSize: fontSize, fontWeight: 'bold', color: tempCheck.colors, position: 'relative', bottom: fontSize === '45px' ? 5 : 10 }}>
                        {formattedValue}
                        <sup>
                            <FormControl sx={{ color: tempCheck.colors }} size="small" variant="outlined">
                                <Box onClick={handleClick} size='small' sx={{ cursor: 'pointer', height: 35, marginTop: '30px' }}>
                                    <sup style={{ fontSize: '24px', verticalAlign: 'top', color: tempCheck.colors }}>{temperature}</sup>
                                </Box>
                                <Menu id="temperature-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                                    <MenuItem onClick={() => handleMenuItemClick("db")}>db</MenuItem>
                                </Menu>
                            </FormControl>
                        </sup>
                    </Box>
                </Box>
            ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: tempCheck.colors, marginTop: '5px', marginBottom: '25px' }}>
                    <WifiOffIcon className="temperature-icon" width={72} height={72} />
                </Box>
            )}
            <Box sx={{ color: tempCheck.fontColor, position: 'relative', bottom: fontSize === '45px' ? 10 : 6, top: fontSize === '45px' ? 15 : '', }}>
                {/* <Typography sx={{
                    textAlign: 'center', fontWeight: 'bold', whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    
                }}>{Data?.meter_name.toUpperCase() || 'N/A'}</Typography> */}
                <Tooltip title={`${'Meter Name : '+Data?.meter_name?.toUpperCase() || 'N/A'} ${'Location : '+Data?.node_location?.toUpperCase() || 'SEZ'}`} arrow>
                    <Typography
                        sx={{
                            textAlign: 'center',
                            fontWeight: 'bold',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}
                    >
                        {Data?.range?.toUpperCase()},{Data?.meter_name?.toUpperCase() || 'N/A'}
                    </Typography>
                </Tooltip>

                <Typography sx={{
                    textAlign: 'center', fontWeight: 'bold', whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}>{Data?.node_location?.toUpperCase() || 'SEZ'}</Typography>
            </Box>
        </CardContent>
    </Card>
    );
};

export default SmallNoiseCard;

