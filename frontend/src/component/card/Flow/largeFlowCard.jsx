import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import React from 'react';
import { ReactComponent as FlowIcon } from "../../config/svgfiles/git-commit.svg";
import { ReactComponent as WifiOffIcon } from "../../config/svgfiles/wifi-off.svg";
import './flow.css'

const LargeFlowCard = ({ Data }) => {
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

    const tempCheck = getColorSettings(Data.value ? Data.value : undefined);

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
                <FlowIcon />
                <Typography variant='h6' fontWeight='bold' sx={{ marginLeft: '5px' }}>
                    Flow
                </Typography>
            </Box>
            <CardContent>
                {Data.value ? <Box>
                    <Box sx={{ textAlign: 'center', fontSize: '72px', fontWeight: 'bold', color: tempCheck.colors }}>{Data.value}<sup style={{ fontSize: '24px', verticalAlign: 'top' }}>L/S</sup></Box>
                </Box> : <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: tempCheck.colors, marginTop: '5px', marginBottom: '15px' }}><WifiOffIcon className="temperature-icon" width={72} height={72} /></Box>}
                <Box sx={{ color: tempCheck.fontColor }}>
                    <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }}>{Data.meter_name}</Typography>
                    <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }}>{Data.location}</Typography>
                </Box>
            </CardContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
                <Box sx={{ textAlign: 'center', fontWeight: 'bold', width: '100%', height: '100%', bgcolor: tempCheck.fillCol, padding : 1.5,paddingX : 3.5, borderRadius : '10px' }}>
                    <Typography textAlign='left' fontWeight='bold' fontSize='22px' color={tempCheck.colors}>Total</Typography>
                    <Typography textAlign='left' fontWeight='bold' fontSize='25px'>52165 L</Typography>
                    <Typography  textAlign='left' fontSize='12px'>from 10th May 2022, 12:00am</Typography>
                </Box>
                <Box sx={{ textAlign: 'center', fontWeight: 'bold', width: '100%', height: '100%', bgcolor: tempCheck.fillCol, padding : 1.5,paddingX : 3.5, borderRadius : '10px' }}>
                    <Typography textAlign='left' fontWeight='bold' fontSize='22px' color={tempCheck.colors}>Custom</Typography>
                    <Typography textAlign='left' fontWeight='bold' fontSize='25px'>485 L</Typography>
                    <Typography  textAlign='left' fontSize='12px'>from 14th May 2022, 18:00pm</Typography>
                </Box>
            </Box>
        </Card>
    )
}

export default LargeFlowCard
