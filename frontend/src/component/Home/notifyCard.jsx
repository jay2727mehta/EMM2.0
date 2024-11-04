import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import {
    faGasPump,
    faTemperatureHigh,
    faOilCan,
    faBolt,
    faPlug,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StatusIndicator from "./circleNotify";
import { getdgdataevery5min } from "../Services/graph.service";
import criticalValues from "../config/criticalMessage";
import { getCurrentSolarPowerGrid } from "../Services/solar.service";
import { ReactComponent as WifiOffIcon } from "../config/svgfiles/wifi-off.svg";

const NotifyCard = () => {
    const [active, setActive] = useState({
        fuel: null,
        temp: null,
        oil: null,
        MD_alert: null,
    });
    const [error, setError] = useState(false);
    const [solarPowerTrend, setSolarPowerTrend] = useState(null);
    const [colorCheck, setColorCheck] = useState({
        bgColor: "#E5EBEB",
        borderColor: "#E5EBEB",
        colors: "#757676",
        fontColor: "#757676",
    });

    const fetchCurrentSolarPower = async () => {
        try {
            const data = await getCurrentSolarPowerGrid();
            const solarPower = data.result[0].grid_active_power_kw;
            setSolarPowerTrend(solarPower / 1000);
        } catch (error) {
            setError(true);
        }
    };

    const fetchdgdata = async () => {
        try {
            const resultDG = await getdgdataevery5min();
            const obj = processDGdata(resultDG);
            setActive(obj);
            const colorObj = getColorSettings(obj);
            console.log(colorObj, 'col', obj);

            setColorCheck(colorObj);
        } catch (error) {
            setError(true);
        }
    };

    const processDGdata = (resultDG) => {
        const obj = { fuel: false, temp: false, oil: false, MD_alert: false };

        obj.fuel = resultDG.Fuel_Level < criticalValues.fuel;
        obj.temp = resultDG.Temperature > criticalValues.temp;
        obj.oil =
            resultDG.Oil_Level > criticalValues.oilPressure &&
            resultDG.Engine_Speed <= 0;
        obj.MD_alert = solarPowerTrend >= 290;

        return obj;
    };

    const getColorSettings = (value) => {
        if (!value) {
            return {
                bgColor: "#E5EBEB",
                borderColor: "#E5EBEB",
                colors: "#757676",
                fontColor: "#757676",
            };
        }

        if (value.fuel === false && value.temp === false && value.oil === false && value.MD_alert === false) {
            return {
                bgColor: "#E9EEEF",
                borderColor: "#E9EEEF",
                colors: "#006DBC",
                fontColor: "#878A8B",
            };
        }

        if (value.fuel === false || value.temp === false || value.oil === false || value.MD_alert === false) {
            return {
                bgColor: "#FFD9D9",
                borderColor: "#FF0E0E",
                colors: "#FF0000",
                fontColor: "#FF0000",
            };
        }
    };

    const styles = {
        thinBorder: {
            border: "0.5px solid #E5E7EB",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
            backgroundColor: "rgba(255, 255, 255, 0.68)",
        },
    };

    useEffect(() => {
        fetchCurrentSolarPower();
        fetchdgdata();
        const intervalId = setInterval(() => {
            fetchdgdata();
        }, 60000);

        return () => clearInterval(intervalId);
    }, [solarPowerTrend]);

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            {/* <Card
                sx={{
                    ...styles.thinBorder,
                    width: 300,
                    height: 250,
                    bgcolor: colorCheck.bgColor,
                    borderRadius: "20px",
                    border: "0.5px solid #E5E7EB",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
                    padding : 2
                }}
            >
                <CardContent>
                    <Box sx={{ display: "flex", justifyContent: "center", color: colorCheck.colors, borderRadius: "5px" }}>
                        <Typography variant="h4" fontWeight='bold'>DG</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, paddingX: 5, paddingY: 2, height: '100%', color: colorCheck.colors , marginTop : 'auto', marginBottom : 'auto'}}>
                        <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: 3, }}>
                            <StatusIndicator isActive={active.fuel} />
                            <Typography sx={{ marginLeft: "10px", fontWeight: 'bold', fontSize: '20px' }}>
                                <FontAwesomeIcon icon={faGasPump} /> : Fuel
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: 3 }}>
                            <StatusIndicator isActive={active.temp} />
                            <Typography sx={{ marginLeft: "10px", fontWeight: 'bold', fontSize: '20px' }}>
                                <FontAwesomeIcon icon={faTemperatureHigh} /> : Temp
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: 3 }}>
                            <StatusIndicator isActive={active.oil} />
                            <Typography sx={{ marginLeft: "10px", fontWeight: 'bold', fontSize: '20px' }}>
                                <FontAwesomeIcon icon={faOilCan} /> : Oil
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card> */}
            <Card
                sx={{
                    ...styles.thinBorder,
                    width: 300,
                    height: 250,
                    bgcolor: colorCheck.bgColor,
                    // marginLeft: "20px",
                    borderRadius: "20px",
                    paddingY: 2
                }}
            >
                <CardContent>
                    <Box sx={{ display: "flex", justifyContent: "center", color: colorCheck.colors, borderRadius: "5px" }}>
                        <Typography variant="h4" fontWeight='bold'>Energy</Typography>
                    </Box>
                    {(active?.MD_alert ===  null || active?.temp === null) ?  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#757676', margin : 'auto', height : '14vh' }}>
                        <WifiOffIcon className="temperature-icon" width={72} height={72} />
                    </Box> : <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, paddingX: 5, paddingY: 4, height: '100%', color: colorCheck.colors, marginTop: 'auto', marginBottom: 'auto' }}>
                        <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: 3, }}>
                            <StatusIndicator isActive={active.MD_alert} />
                            <Typography sx={{ marginLeft: "10px", fontWeight: 'bold', fontSize: '20px' }}>
                                <FontAwesomeIcon icon={faBolt} /> : MD Alert
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: 3, }}>
                            <StatusIndicator isActive={active.temp} />
                            <Typography sx={{ marginLeft: "10px", fontWeight: 'bold', fontSize: '20px' }}>
                                <FontAwesomeIcon icon={faPlug} /> : UPS
                            </Typography>
                        </Box>
                    </Box>}
                </CardContent>
            </Card>
        </div>
    );
};

export default NotifyCard;
