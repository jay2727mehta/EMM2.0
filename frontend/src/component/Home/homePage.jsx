import React from 'react'
import SankeyChart from '../Sankey/sankeyChart'
import { Box } from '@mui/material'
import MediumWhetherCard from '../card/Whether/mediumWhetherCard'
import MediumAirCard from '../card/Air/mediumAirCard'
import NotifyCard from './notifyCard'
import SmallGasCard from '../card/Gas/smallGasCard'
import SmallNoiseCard from '../card/Noise/smallNoiseCard'
import LargeEnergyCard from '../card/Energy Meter/largeEnergyCard'
import SmallLuxCard from '../card/Lighting/smallLuxCard'

const HomePage = () => {
    const styles = {
        thinBorder: {
            border: "0.5px solid #E5E7EB",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
            backgroundColor: "rgba(255, 255, 255, 0.68)",
        },
    };
    return (
        <div>
            <Box sx={{ marginTop: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                <MediumWhetherCard />
                <MediumAirCard Data={{ meter_name: 'フジタ技術センター', location: '志' }} />
                {/* <NotifyCard /> */}
            </Box>
            <Box sx={{ paddingY: 2 }}>
                <Box sx={{ ...styles.thinBorder, padding: 5, display: 'flex', justifyContent: 'center', bgcolor: '#E9EEEF', alignItems: 'center', flexWrap: 'wrap', width: '98%', borderRadius: '20px', height: '100%', margin: 'auto' }}>
                    <SankeyChart />
                </Box>
            </Box>
        </div>
    )
}

export default HomePage
