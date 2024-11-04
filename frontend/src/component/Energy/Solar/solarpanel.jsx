import { Box, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { getSolar5mindata } from '../../Services/solar.service';
import SmallSolarCard from '../../card/Solar/smallSolarCard';
import MediumSolarCard from '../../card/Solar/mediumSolarCard';
import SmallEnergyGridPowerCard from '../../card/Solar/smallEnergyGridPowerCard';
import MediumGridPowerCard from '../../card/Solar/mediumGridPowerCard';

const SolarPanel = ({ }) => {
  const [solarData, setSolarData] = useState([]);

  const fetchData = async () => {
    try {
      const result = await getSolar5mindata();
      console.log(result.data);
      setSolarData(result.data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const styles = {
    thinBorder: {
      border: "0.5px solid #E5E7EB",
      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
      backgroundColor: "white",
    },
  };

  return (
    <Box sx={{ marginTop: "20px" }}>
      < Box sx={{ display : 'flex', gap : 2, padding : 2}}>
        <Grid item xs={2}>
          <SmallSolarCard Data={solarData} />
        </Grid>
        <Grid item xs={2}>
          <SmallEnergyGridPowerCard Data={solarData} />
        </Grid>
      </Box>
      < Box sx={{ display : 'flex', flexDirection : 'column', gap : 2, paddingX : 2}}>
        <MediumSolarCard Data={solarData} />
        <MediumGridPowerCard Data={solarData} />
      </Box>
    </Box>
  )
}

export default SolarPanel;
