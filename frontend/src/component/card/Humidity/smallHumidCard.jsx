import { Box, Card, CardContent, FormControl, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
import { ReactComponent as HumidIcon } from "../../config/svgfiles/droplet.svg";
import { ReactComponent as WifiOffIcon } from "../../config/svgfiles/wifi-off.svg";
import './humid.css'

const SmallHumidityCard = ({ Data }) => {
    const [humidity, setHumidity] = useState('%');
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const handleMenuItemClick = (value) => {
        setHumidity(value);
        handleClose();
    };

    const getColorSettings = (value) => {

        if (!Data && !Data.min_humidity && !Data.max_humidity && !Data.critical_humidity) {
          return { bgColor: '#E5EBEB', borderColor: '#E5EBEB', colors: '#757676', fontColor: '#757676' };
      }
    
        if (value >= Data.min_humidity && value <= Data.max_humidity) {
            return { bgColor: '#E9EEEF', borderColor: '#E9EEEF', colors: '#006DBC', fontColor: '#878A8B' };
        } else if (value > Data.max_humidity && value < Data.critical_humidity) {
            return { bgColor: '#FFF0D9', borderColor: '#FF740E', colors: '#FF6B00', fontColor: '#FF6B00' };
        } else if (value >= Data.critical_humidity || value < Data.min_humidity) {
            return { bgColor: '#FFD9D9', borderColor: '#FF0E0E', colors: '#FF0000', fontColor: '#FF0000' };
        } 
          return { bgColor: '#E5EBEB', borderColor: '#E5EBEB', colors: '#757676', fontColor: '#757676' };
    };
    const convertTemperature = (value, unit) => {
        if (value < 0) {
            return 0;
          }
        switch (unit) {
            case '°K': return value + 273.15;
            case '°F': return (value * 9 / 5) + 32;
            case '%':
            default: return value;
        }
    };

    const humidityValue = Data && Array.isArray(Data.meter_reading) ? Data.meter_reading[Data.meter_reading.length - 1] : 0;
    const convertedValue = convertTemperature(humidityValue, humidity);
    const tempCheck = getColorSettings(humidityValue);
    const fontSize = convertedValue ? convertedValue.toString().length > 5 ? '48px' : '60px' : '60px';

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
                <HumidIcon sx={{ fontSize: '34px' }} />
                <Typography variant='h6' fontWeight='bold' sx={{ marginLeft: '5px' }}>
                    Humidity
                </Typography>
            </Box>
            <CardContent>
            {Data?.meter_reading?.length ? (
                    <Box>
                        <Box sx={{ textAlign: 'center', fontSize: fontSize, fontWeight: 'bold', color: tempCheck.colors, position: 'relative', bottom: 10 }}>
                            {convertedValue?.toFixed(1)}
                            <sup>
                                <FormControl sx={{ color: tempCheck.colors }} size="small" variant="outlined">
                                    <Box onClick={handleClick} size='small' sx={{ cursor: 'pointer', height: 35, marginTop: '30px' }}>
                                        <sup style={{ fontSize: '24px', verticalAlign: 'top', color: tempCheck.colors }}>{humidity}</sup>
                                    </Box>
                                    <Menu id="temperature-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                                        <MenuItem onClick={() => handleMenuItemClick("%")}>%</MenuItem>
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
                <Box sx={{ color: tempCheck.fontColor, position: 'relative', bottom: fontSize === '48px' ? 10 : 6, top: fontSize === '48px' ? 8 : '', }}>
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

export default SmallHumidityCard;

