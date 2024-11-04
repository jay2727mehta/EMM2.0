import { Box, Card, CardContent, FormControl, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import { ReactComponent as EnergyIcon } from "../../config/svgfiles/zap.svg";
import { ReactComponent as WifiOffIcon } from "../../config/svgfiles/wifi-off.svg";
import './energyCard.css'
import { useFitText } from "../../config/fontResizeConfig";

const SmallEnergyCard = ({ Data }) => {
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
        if (value < 0) {
            return 0;
        }
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
            return (value / 1_000_000_000).toFixed(1) + 'B'; // Billions
        } else if (value >= 1_000_000) {
            return (value / 1_000_000).toFixed(1) + 'M'; // Millions
        } else if (value >= 1_000) {
            return (value / 1_000).toFixed(1) + 'K'; // Thousands
        } else {
            return value.toFixed(1); // For values less than 1,000
        }
    };

    const getColorSettings = (value) => {
        if (!Data) {
            return { bgColor: '#E5EBEB', borderColor: '#E5EBEB', colors: '#757676', fontColor: '#757676' };
        }

        if (value > Data.min_energy && value < Data.max_energy) {
            return { bgColor: '#E9EEEF', borderColor: '#E9EEEF', colors: '#006DBC', fontColor: '#878A8B' };
        } else if (value < Data.critical_energy && value >= Data.max_energy) {
            return { bgColor: '#FFF0D9', borderColor: '#FF740E', colors: '#FF6B00', fontColor: '#FF6B00' };
        } else if (value >= Data.critical_energy || value <= Data.min_energy) {
            return { bgColor: '#FFD9D9', borderColor: '#FF0E0E', colors: '#FF0000', fontColor: '#FF0000' };
        }
        return { bgColor: '#E5EBEB', borderColor: '#E5EBEB', colors: '#757676', fontColor: '#757676' };
    };
    console.log(Data,'Da');
    
    const energyValue = Data && Array.isArray(Data.meter_reading) ? Data.meter_reading[Data.meter_reading.length - 1] : 0;;
    const convertedValue = Data ? convertEnergy(energyValue, energy) : 0;
    const formattedValue = Data ? formatValue(convertedValue) : 0;
    const tempCheck = getColorSettings(energyValue);
    const fontSize = formattedValue ? formattedValue.length > 3 ? '45px' : '60px' : '60px';
    // const formatValues = formattedValue.slice(0,formattedValue.lastIndexOf());
    // console.log(formatValues);
    

    const styles = {
        thinBorder: {
            border: "0.5px solid #E5E7EB",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
            backgroundColor: "rgba(255, 255, 255, 0.68)",
        },
    };

    return (
        <Card sx={{ ...styles.thinBorder, width: '300px', height: '250px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 5, borderRadius: '20px', bgcolor: tempCheck.bgColor, borderColor: tempCheck.borderColor, borderWidth: 2, whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis', }}>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', color: tempCheck.colors,}}>
                <EnergyIcon className="temperature-icon" width={32} height={32} />
                <Typography variant='h6' fontWeight='bold' sx={{ marginLeft: '5px'}}>
                    Energy Meter
                </Typography>
            </Box>
            <CardContent>
                {Data?.meter_reading?.length ? (
                    <Box>
                        <Box sx={{ display : 'flex',justifyContent : 'center',
                            textAlign: 'center', fontSize: 45, fontWeight: 'bold', color: tempCheck.colors, position: 'relative', bottom: 0, 
                        }}>
                            <Typography sx={{ textAlign: 'center',fontSize: 45, fontWeight: 'bold', }}>{formattedValue}</Typography>
                            <sup style={{ position : 'relative', bottom : 25, }}>
                                <FormControl sx={{ color: tempCheck.colors, width : 50 ,  wordBreak : 'break-word'}} size="small" variant="outlined" >
                                    <Box ref={ref} onClick={handleClick} size='small' sx={{ cursor: 'pointer', height: 35, marginTop: '30px' }}>
                                        <sup style={{ fontSize: 18, verticalAlign: 'top', color: tempCheck.colors , wordBreak : 'break-word'}}>{energy}</sup>
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
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: tempCheck.colors, marginTop: '5px', marginBottom: '25px',position : 'relative',bottom : 13  }}>
                        <WifiOffIcon className="temperature-icon" width={72} height={72} />
                    </Box>
                )}
                <Box ref={ref} sx={{ color: tempCheck.fontColor, position: 'relative', bottom: Data?.meter_reading?.length ? -15 : 15, }}>
                    <Tooltip title={`${'Meter Name : ' + Data?.meter_name?.toUpperCase() || 'N/A'} ${'Location : ' + Data?.node_location?.toUpperCase() || 'SEZ'}`} arrow>
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

export default SmallEnergyCard;
