import { Box, Card, CardContent, FormControl, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import { ReactComponent as EnergyIcon } from "../../config/svgfiles/zap.svg";
import { ReactComponent as WifiOffIcon } from "../../config/svgfiles/wifi-off.svg";
import './solarCard.css'
import { useFitText } from "../../config/fontResizeConfig";

const SmallSolarCard = ({ Data }) => {
    const [energy, setEnergy] = useState('kWh');
    const [anchorEl, setAnchorEl] = useState(null);
    const { ref } = useFitText();

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const handleMenuItemClick = (value) => {
        setEnergy(value);
        handleClose(); 
    };

    const convertEnergy = (value, unit) => {
        switch (unit) {
            case 'Wh':
                return value * 1000;
            case 'kWh':
            default:
                return value;
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
        if (Data.length) { 
            return { bgColor: '#E9EEEF', borderColor: '#E9EEEF', colors: '#006DBC', fontColor: '#878A8B' };
        }
        else {
            return { bgColor: '#E5EBEB', borderColor: '#E5EBEB', colors: '#757676', fontColor: '#757676' };
        }
    };

    const energyValue = (Data && Array.isArray(Data) && Data.length) ? Math.abs(Data[Data.length - 1].total_solar_energy_kwh - Data[0].total_solar_energy_kwh) : 0;
    const convertedValue = Data ? convertEnergy(energyValue, energy) : 0;
    const formattedValue = convertedValue ? formatValue(convertedValue) : 0;
    const tempCheck = getColorSettings(energyValue);
    console.log(tempCheck);

    const fontSize = formattedValue ? formattedValue.length > 4 ? '45px' : '60px' : '60px';

    const styles = {
        thinBorder: {
            border: "0.5px solid #E5E7EB",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
            backgroundColor: "rgba(255, 255, 255, 0.68)",
        },
    };

    return (
        <Card sx={{ ...styles.thinBorder, width: '300px', height: '275px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 5, borderRadius: '20px', bgcolor: tempCheck.bgColor, borderColor: tempCheck.borderColor, borderWidth: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', color: tempCheck.colors }}>
                <EnergyIcon className="temperature-icon" width={32} height={32} />
                <Typography variant='h6' fontWeight='bold' sx={{ marginLeft: '5px' }}>
                    Solar Energy
                </Typography>
            </Box>
            <CardContent>
                {Data && (Array.isArray(Data) ? Data.length > 0 : false) ? (
                    <Box>
                        <Box sx={{ textAlign: 'center', fontSize: fontSize, fontWeight: 'bold', color: tempCheck.colors, position: 'relative', bottom: 10,whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis', }}>
                            {formattedValue}
                            <sup>
                                <FormControl sx={{ color: tempCheck.colors }} size="small" variant="outlined">
                                    <Box onClick={handleClick} size='small' sx={{ cursor: 'pointer', height: 35, marginTop: '30px' }}>
                                        <sup style={{ fontSize: formattedValue ? formattedValue.length > 4 ? '18px' : '24px' : '24px', verticalAlign: 'top', color: tempCheck.colors }}>{energy}</sup>
                                    </Box>
                                    <Menu id="temperature-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                                        <MenuItem onClick={() => handleMenuItemClick("kWh")}>kwh</MenuItem>
                                        <MenuItem onClick={() => handleMenuItemClick("Wh")}>wh</MenuItem>
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
                <Box ref={ref} sx={{ color: tempCheck.fontColor, position: 'relative', bottom: fontSize === '45px' ? 10 : 6, top: fontSize === '45px' ? 16 : '', }}>
                    {/* <Typography sx={{
                        textAlign: 'center', fontWeight: 'bold', whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        
                    }}>{Data?.meter_name.toUpperCase() || 'N/A'}</Typography> */}
                    <Tooltip title={`Day Generation, SEZ Campus`} arrow>
                        <Typography
                            sx={{
                                textAlign: 'center',
                                fontWeight: 'bold',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',

                            }}
                        >
                            {Data?.meter_name?.toUpperCase() || 'Day Generation'}
                        </Typography>
                    </Tooltip>

                    <Typography sx={{
                        textAlign: 'center', fontWeight: 'bold', whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}>{Data?.node_location?.toUpperCase() || 'SEZ Campus'}</Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default SmallSolarCard;
