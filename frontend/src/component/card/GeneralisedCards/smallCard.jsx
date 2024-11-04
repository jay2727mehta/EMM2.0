import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, FormControl, Menu, MenuItem, Tooltip as ToolTipBox } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { ReactComponent as TemperatureIcon } from "../../config/svgfiles/zap.svg";
import { ReactComponent as WifiOffIcon } from "../../config/svgfiles/wifi-off.svg";
import { useFitText } from '../../config/fontResizeConfig';
import { criticalpowerMail } from "../../Services/emailservice";
import { iconsCon } from "../../config/iconsConfig";


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const SmallCard = ({ Data }) => {

  const getConversion = (type) => {
    switch (type) {
      case 'basicEnergy': return 'kWh';
      case 'basicPower': return 'kW';
      case 'basicTemp': return '°C';
      case 'basicHumidity': return '%';
      default: return '';
    }
  };

  const [power, setpower] = useState();
  const [minValue, setMinValue] = useState(null);
  const [maxValue, setMaxValue] = useState(null);
  const [criticalValue, setCriticalValue] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const { ref } = useFitText();

  const convertPower = (value, unit) => {
    if (value == null || isNaN(value)) return 0;

    switch (unit) {
      case 'W': return value * 1000;
      case 'kW': return (value);
      case '°C': return value;
      case '°K': return (value + 273.15);
      case '°F': return (value * 9 / 5) + 32;
      case 'Wh': return value * 1000;
      case 'kWh': return (1.0 * value);
      default:
        return value;
    }
  };

  const formatValue = (value) => {
    if (value == null || isNaN(value)) {
      return '0'; // Return default '0' for undefined, null, or NaN values
    }

    if (value >= 1_000_000_000) {
      return (value / 1_000_000_000)?.toFixed(1) + 'B'; // Billions
    } else if (value >= 1_000_000) {
      return (value / 1_000_000)?.toFixed(1) + 'M'; // Millions
    } else if (value >= 1_000) {
      return (value / 1_000)?.toFixed(1) + 'K'; // Thousands
    } else {
      return value?.toFixed(2); // For values less than 1,000
    }
  };

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleMenuItemClick = (value) => {
    setpower(value);
    handleClose();
  };

  const getCriticalValues = (type) => {
    if (type === ('basicEnergy')) {
      setMinValue(Data?.min_energy);
      setMaxValue(Data?.max_energy);
      setCriticalValue(Data?.critical_energy);
    }

    if (type === ('basicPower')) {
      setMinValue(Data?.min_power);
      setMaxValue(Data?.max_power);
      setCriticalValue(Data?.critical_power);
    }

    if (type === ('basicTemp')) {
      setMinValue(Data?.min_temp);
      setMaxValue(Data?.max_temp);
      setCriticalValue(Data?.critical_temp);
    }

    if (type === ('basicHumidity')) {
      setMinValue(Data?.min_humidity);
      setMaxValue(Data?.max_humidity);
      setCriticalValue(Data?.critical_humidity);
    }

    if (type === ('basicNoise')) {
      setMinValue(Data?.min_aud);
      setMaxValue(Data?.max_aud);
      setCriticalValue(Data?.critical_aud);
    }

    if (type === ('basicCO2')) {
      setMinValue(Data?.min_co2);
      setMaxValue(Data?.max_co2);
      setCriticalValue(Data?.critical_co2);
    }

    if (type === ('basicLux')) {
      setMinValue(Data?.min_lux);
      setMaxValue(Data?.max_lux);
      setCriticalValue(Data?.critical_lux);
    }
  }

  const getColorSettings = (value) => {
    
    
    if (!value||(!minValue||!maxValue)) {
      // If any of the required values are null, return default colors
      return {
        bgColor: '#E5EBEB',
        borderColor: '#E5EBEB',
        colors: '#757676',
        fontColor: '#757676',
      };
    }
    // else if  (value && !minValue && !maxValue) {
    //   // Within normal range (Green)
    //   return {
    //     bgColor: '#E9EEEF',
    //     borderColor: '#E9EEEF',
    //     colors: '#006DBC',
    //     fontColor: '#878A8B',
    //   };
    // }
    else if  (value > minValue && value < maxValue) {
      // Within normal range (Green)
      return {
        bgColor: '#E9EEEF',
        borderColor: '#E9EEEF',
        colors: '#006DBC',
        fontColor: '#878A8B',
      };
    } else if (value >= maxValue && value < criticalValue) {
      // In the warning range (Orange)
      return {
        bgColor: '#FFF0D9',
        borderColor: '#FF740E',
        colors: '#FF6B00',
        fontColor: '#FF6B00',
      };
    } else if (value >= criticalValue || value <= minValue) {
      // Outside critical range (Red)
      return {
        bgColor: '#FFD9D9',
        borderColor: '#FF0E0E',
        colors: '#FF0000',
        fontColor: '#FF0000',
      };
    }

    // Return default colors if conditions are not met
    return {
      bgColor: '#E5EBEB',
      borderColor: '#E5EBEB',
      colors: '#757676',
      fontColor: '#757676',
    };
  };

  const powerValue = Data?.meter_reading?.length ? Data.meter_reading[Data.meter_reading.length - 1] : 0;
  const convertedValue = Data ? convertPower(powerValue, power) : 0;
  const formattedValue = Data ? formatValue(parseFloat(convertedValue)) : 0;
  const tempCheck = getColorSettings(powerValue);
  const numericValue = formattedValue?.match(/(\d+(\.\d+)?)/g)?.join('') || "";
  const textValue = formattedValue?.match(/[a-zA-Z]+/g)?.join('') || "";

  const sendCriticalPower = async () => {
    try {
      const criticalPower = {
        power: powerValue,
        critical_power: Data?.critical_power,
        meter_name: Data?.meter_name?.toUpperCase(),
        meter_location: Data?.node_location
      }
      if (powerValue > Data?.critical_power) {
        await criticalpowerMail(criticalPower);
      }
    } catch (error) {
      console.log(error);
    }
  };

  sendCriticalPower();

  const styles = {
    thinBorder: {
      border: "0.5px solid #E5E7EB",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
      backgroundColor: "rgba(255, 255, 255, 0.68)",
    },
  };

  const getIcon = (type) => {
    if (type === ('basicEnergy')) {
      return iconsCon.find((item) => item.gadget_name === 'energy')
    }

    if (type === ('basicPower')) {
      return iconsCon.find((item) => item.gadget_name === 'power')
    }

    if (type === ('basicTemp')) {
      return iconsCon.find((item) => item.gadget_name === 'temperature')
    }

    if (type === ('basicHumidity')) {
      return iconsCon.find((item) => item.gadget_name === 'humidity')
    }

    if (type === ('basicNoise')) {
      return iconsCon.find((item) => item.gadget_name === 'noise')
    }

    if (type === ('basicCO2')) {
      return iconsCon.find((item) => item.gadget_name === 'co2')
    }

    if (type === ('basicLux')) {
      return iconsCon.find((item) => item.gadget_name === 'lux')
    }

    if (type === ('basicCurrent')) {
      return iconsCon.find((item) => item.gadget_name === 'current')
    }
  }

  useEffect(() => {
    if (Data?.gadget_type) {
      setpower(getConversion(Data.gadget_type));
    }

    getCriticalValues(Data?.gadget_type)
  }, [Data])

  return (
    <Card sx={{ ...styles.thinBorder, width: 300, height: '250px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 4, borderRadius: '20px', bgcolor: tempCheck.bgColor, borderColor: tempCheck.borderColor, borderWidth: 2 }}>
      <Box display="flex" alignItems="center" justifyContent="space-evenly" gap='20px'>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, }}>
          <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', color: tempCheck.colors, position: 'relative', left: -15, gap: 1 }}>
            {getIcon(Data?.gadget_type)?.render({ width: 32, height: 32 })}
            <Typography variant='h6' fontWeight='bold'>
              {Data?.gadget_name}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: Data?.meter_reading?.length ? 3 : -5 }}>
            {Data?.meter_reading?.length ?
              <Box>
                <Box sx={{
                  display: 'flex', justifyContent: 'center',
                  textAlign: 'center', fontSize: 45, fontWeight: 'bold', color: tempCheck.colors, whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                  <Typography sx={{ textAlign: 'center', fontSize: 45, fontWeight: 'bold', }}>{numericValue}</Typography>
                  <Typography sx={{ textAlign: 'center', fontSize: 30, fontWeight: 'bold', marginTop: 2 }}>{textValue}</Typography>
                  <sup style={{ position: 'relative', bottom: 25, }}>
                    <FormControl sx={{ color: tempCheck.colors }} size="small" variant="outlined">
                      <Box onClick={handleClick} size='small' sx={{
                        cursor: 'pointer', height: 35, marginTop: '30px',
                      }}>
                        <sup style={{ fontSize: 18, verticalAlign: 'top', color: tempCheck.colors, }}>{power}</sup>
                      </Box>
                      <Menu id="temperature-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                        {(() => {
                          switch (Data?.gadget_type) {
                            case 'basicEnergy':
                              return (
                                <>
                                  <MenuItem onClick={() => handleMenuItemClick("Wh")}>Wh</MenuItem>
                                  <MenuItem onClick={() => handleMenuItemClick("kWh")}>kWh</MenuItem>
                                </>
                              );
                            case 'basicTemp':
                              return (
                                <>
                                  <MenuItem onClick={() => handleMenuItemClick("°C")}>°C</MenuItem>
                                  <MenuItem onClick={() => handleMenuItemClick("°F")}>°F</MenuItem>
                                  <MenuItem onClick={() => handleMenuItemClick("°K")}>°K</MenuItem>
                                </>
                              );
                            case 'basicPower':
                              return (
                                <>

                                  <MenuItem onClick={() => handleMenuItemClick("W")}>W</MenuItem>
                                  <MenuItem onClick={() => handleMenuItemClick("kW")}>kW</MenuItem>
                                </>
                              );
                            case 'basicNoise':
                              return (
                                <>
                                  {/* <MenuItem onClick={() => handleMenuItemClick("KW")}>KW</MenuItem> */}
                                  <MenuItem onClick={() => handleMenuItemClick("dB")}>dB</MenuItem>
                                </>
                              );
                            case 'basicCO2':
                              return (
                                <>
                                  {/* <MenuItem onClick={() => handleMenuItemClick("KW")}>KW</MenuItem> */}
                                  <MenuItem onClick={() => handleMenuItemClick("ppm")}>ppm</MenuItem>
                                </>
                              );
                            case 'basicLux':
                              return (
                                <>
                                  {/* <MenuItem onClick={() => handleMenuItemClick("KW")}>KW</MenuItem> */}
                                  <MenuItem onClick={() => handleMenuItemClick("LUX")}>LUX</MenuItem>
                                </>
                              );
                            case 'basicHumidity':
                              return (
                                <>
                                  {/* <MenuItem onClick={() => handleMenuItemClick("KW")}>KW</MenuItem> */}
                                  <MenuItem onClick={() => handleMenuItemClick("%")}>%</MenuItem>
                                </>
                              );
                            default:
                              return null; // No menu items for other gadget types
                          }
                        })()}
                      </Menu>
                    </FormControl>
                  </sup>
                </Box>
              </Box>
              : (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: tempCheck.colors, marginTop: '5px', marginBottom: '25px' }}>
                  <WifiOffIcon className="temperature-icon" width={60} height={60} />
                </Box>
              )}
            <Box ref={ref} sx={{ color: tempCheck.fontColor, width: 200 }}>
              <ToolTipBox title={`${'デバイス名 : ' + (Data?.meter_name || 'N/A')} ${'位置 : ' + (Data?.node_location_jp || 'フジタ技術センター')}`} arrow>
                <Typography
                  sx={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
             
                  {/* {Data?.range?.toUpperCase()}, */}
                  {Data?.meter_name || 'N/A'}
                </Typography>
              </ToolTipBox>
              <Typography sx={{
                textAlign: 'center', fontWeight: 'bold', whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>{Data?.node_location_jp || 'フジタ技術センター'}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default SmallCard;


