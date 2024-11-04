import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { get1FfloorCombineEnergy, get2FfloorCombineEnergy, get3FfloorCombineEnergy, getEVStationCombineEnergy, getFireHydrantCombineEnergy, getMainMeterdatabybuilding, getPowerGridCombineEnergy, getSolarPowerCombineEnergy, getUPSCombineEnergy } from "../Services/graph.service";
import { getDgmonthlyProduce } from "../Services/graph.service";
import { useEnergy } from "../context/energyMainmetercontext"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";
import { SankeyController, Flow } from "chartjs-chart-sankey";
import { Chart } from "react-chartjs-2";
import { ReactComponent as WifiOffIcon } from "../config/svgfiles/wifi-off.svg";
import { ReactComponent as EnergyIcon } from "../config/svgfiles/zap.svg";

ChartJS.register(
    SankeyController,
    Flow,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
);

const SankeyChart = () => {
    const [difference, setdifference] = useState(0);
    const [error, setError] = useState(false);
    const [errormessage, setErrorMessage] = useState(null);
    const [Monthlydata_Gen, setMonthlydata_Gen] = useState({
        powergrid: 0,
        solar: null,
        ups: null,
        dg: 0,
    });
    const [Monthlydata_Consume, setMonthlydata_Consume] = useState({
        F1: 0,
        F2: 0,
        F3: 0,
        EV: 0,
        FH: 0
    });
    const [IsLoading, setLoading] = useState(true);
    const { Monthlydata_Generation } = useEnergy();

    const processdata = () => {
        const { solar, meter } = Monthlydata_Generation;
        setMonthlydata_Gen({ solar, meter });
        return solar + meter;
    };

    const processdataconsume = (data) => {
        const processedData = {
            op1: Math.floor(data.op1),
            op2: Math.floor(data.op2),
            admin: Math.floor(data.admin),
        };
        setMonthlydata_Consume(processedData);
        return Object.values(processedData).reduce((sum, value) => sum + value, 0);
    };

    const fetchdata = async () => {
        let Solar;
        let FirstFloor;
        let SecondFloor;
        let ThirdFloor;
        let UPS;
        let FireHydrant;
        let EVStation;

        try {

            try {
                 //  const  PowerGrid=await getPowerGridCombineEnergy()
                Solar = await getSolarPowerCombineEnergy();
                FirstFloor = await get1FfloorCombineEnergy();
                SecondFloor = await get2FfloorCombineEnergy();
                ThirdFloor = await get3FfloorCombineEnergy()
                UPS = await getUPSCombineEnergy()
                FireHydrant = await getFireHydrantCombineEnergy()
                EVStation = await getEVStationCombineEnergy()
            } catch (error) {
                console.log('Error in sankey ',error);
            }

            Monthlydata_Gen.solar = Solar?.meter_reading[0];
            console.log(Monthlydata_Gen.solar,'solar');
            Monthlydata_Consume.F1 = FirstFloor?.meter_reading[0];
            console.log(Monthlydata_Consume.F1,'F1');
            Monthlydata_Consume.F2 = SecondFloor?.meter_reading[0];
            console.log(Monthlydata_Consume.F2,'F2');
            Monthlydata_Consume.F3 = ThirdFloor?.meter_reading[0];
            console.log(Monthlydata_Consume.F3,'F3');
            Monthlydata_Gen.ups = UPS?.meter_reading[0];
            console.log(Monthlydata_Gen.ups,'UPS');
            Monthlydata_Consume.FH = FireHydrant ? FireHydrant?.meter_reading[0] : 0;
            console.log(Monthlydata_Consume.FH,'fh');
            Monthlydata_Consume.EV = EVStation ? EVStation?.meter_reading[0] : 0;
            console.log(Monthlydata_Consume.EV,'EV');
           
            const totalConsumption = FirstFloor?.meter_reading[0] + SecondFloor?.meter_reading[0] + ThirdFloor?.meter_reading[0];
            const totalGeneration = Solar?.meter_reading[0] + UPS?.meter_reading[0];
            console.log(totalConsumption,totalGeneration, 'total PowerGrid Calculation');
            const PowerGrid = totalConsumption - totalGeneration;
            // console.log(PowerGrid, 'PowerGrid Calculation');


            setMonthlydata_Gen({
                powergrid: PowerGrid,
                dg: 0,
                solar: Solar.meter_reading[0],
                ups: UPS.meter_reading[0],
            })

        } catch (error) {
            setError(true);
            //   const errorMessages = {
            //     500: errorMessageIndividual.error_500,
            //     404: errorMessageIndividual.error_404,
            //     'Network Error': errorMessageIndividual.networkError,
            //     400: errorMessageIndividual.error_400,
            //   };
            //   setErrorMessage(errorMessages[error.message.split(' ').pop()] || 'An unexpected error occurred');
            console.error(error);
        }
    };

    // const fetchdata = async () => {
    //     try {

    //         //  const  PowerGrid=await getPowerGridCombineEnergy()
    //         //  console.log("power grid",PowerGrid);
    //         const Solar = await getSolarPowerCombineEnergy();
    //         Monthlydata_Gen.solar = Solar.meter_reading[0];
    //         console.log(Monthlydata_Gen.solar, 'consume');

    //         const FirstFloor = await get1FfloorCombineEnergy();
    //         Monthlydata_Consume.F1 = FirstFloor.meter_reading[0];
    //         const SecondFloor = await get2FfloorCombineEnergy();
    //         Monthlydata_Consume.F2 = SecondFloor.meter_reading[0];
    //         const ThirdFloor = await get3FfloorCombineEnergy()
    //         Monthlydata_Consume.F3 = ThirdFloor.meter_reading[0];
    //         const UPS = await getUPSCombineEnergy()
    //         Monthlydata_Gen.ups = UPS.meter_reading[0];
    //         // const FireHydrant = await getFireHydrantCombineEnergy()
    //         // Monthlydata_Consume.FH = FireHydrant.meter_reading[0];
    //         // const EVStation = await getEVStationCombineEnergy()
    //         // Monthlydata_Consume.EV = EVStation.meter_reading[0];


    //         // console.log((FirstFloor.meter_reading[0] + SecondFloor.meter_reading[0] + ThirdFloor.meter_reading[0]) - (Solar.meter_reading[0] + UPS.meter_reading[0]), 'logss');

    //         const totalConsumption = FirstFloor.meter_reading[0] + SecondFloor.meter_reading[0] + ThirdFloor.meter_reading[0];
    //         const totalGeneration = Solar.meter_reading[0] + UPS.meter_reading[0];
    //         //console.log(totalConsumption,totalGeneration, 'total PowerGrid Calculation');
    //         const PowerGrid = totalConsumption - totalGeneration;
    //         // console.log(PowerGrid, 'PowerGrid Calculation');


    //         setMonthlydata_Gen({
    //             powergrid: PowerGrid,
    //             dg: 0,
    //             solar: Solar.meter_reading[0],
    //             ups: UPS.meter_reading[0],
    //         })

    //     } catch (error) {
    //         setError(true);
    //         //   const errorMessages = {
    //         //     500: errorMessageIndividual.error_500,
    //         //     404: errorMessageIndividual.error_404,
    //         //     'Network Error': errorMessageIndividual.networkError,
    //         //     400: errorMessageIndividual.error_400,
    //         //   };
    //         //   setErrorMessage(errorMessages[error.message.split(' ').pop()] || 'An unexpected error occurred');
    //         console.error(error);
    //     }
    // };

    useEffect(() => {
        setLoading(true);
        fetchdata();
        setLoading(false);
    }, [Monthlydata_Gen]);

    const data = {
        labels: [
            `Diesel Generator ${Math.floor(Monthlydata_Gen.dg)}kWh`,
            `Power Grid ${Monthlydata_Gen.powergrid}kWh`,
            `Solar ${Monthlydata_Gen.solar}kWh`,
            `志 ${parseFloat(
                (Monthlydata_Gen.solar + Monthlydata_Gen.powergrid + Monthlydata_Gen.ups + Monthlydata_Gen.dg).toFixed(2)
            )}kWh`,
            `1F ${parseFloat(
                (Monthlydata_Consume.F1 + difference).toFixed(2)
            )}kWh`,
            `2F ${parseFloat(
                (Monthlydata_Consume.F2 + difference).toFixed(2)
            )}kWh`,
            `3F ${parseFloat(
                (Monthlydata_Consume.F3 + difference).toFixed(2)
            )}kWh`,
        ],
        datasets: [
            {
                label: "Sankey",
                font: {
                    size: 16, // Adjust the size as needed
                    weight: 'bold', // Make the labels bold
                },
                data: [
                    {
                        from: `技術センター ${53684.19}kWh`,
                        to: `志 ${parseFloat(
                            (Monthlydata_Gen.solar + Monthlydata_Gen.powergrid + Monthlydata_Gen.dg + Monthlydata_Gen.ups).toFixed(2)
                        )}kWh`,
                        flow: Monthlydata_Gen.powergrid,
                    },
                    {
                        from: `太陽光1 & 太陽光2 ${parseFloat(Monthlydata_Gen.solar).toFixed(2)}kWh`,
                        to: `志 ${parseFloat(
                            (Monthlydata_Gen.solar + Monthlydata_Gen.powergrid + Monthlydata_Gen.dg + Monthlydata_Gen.ups).toFixed(2)
                        )}kWh`,
                        flow: Monthlydata_Gen.solar,
                    },
                    {
                        from: `蓄電池 UPS ${parseFloat(Monthlydata_Gen.ups).toFixed(2)}kWh`,
                        to: `志 ${parseFloat(
                            (Monthlydata_Gen.solar + Monthlydata_Gen.powergrid + Monthlydata_Gen.dg + Monthlydata_Gen.ups).toFixed(2)
                        )}kWh`,
                        flow: Monthlydata_Gen.ups,
                    },
                    {
                        from: `DG ${Math.floor(Monthlydata_Gen.dg)}kWh`,
                        to: `志 ${parseFloat(
                            (Monthlydata_Gen.solar + Monthlydata_Gen.powergrid + Monthlydata_Gen.dg + Monthlydata_Gen.ups).toFixed(2)
                        )}kWh`,
                        flow: Math.floor(Monthlydata_Gen.dg),
                    },
                    {
                        from: `志 ${parseFloat(
                            (Monthlydata_Gen.solar + Monthlydata_Gen.powergrid + Monthlydata_Gen.dg + Monthlydata_Gen.ups).toFixed(2)
                        )}kWh`,
                        to: `1F ${parseFloat(
                            (Monthlydata_Consume.F1 + difference).toFixed(2)
                        )}kWh`,
                        flow: parseFloat((Monthlydata_Consume.F1 + difference).toFixed(2)),
                    },
                    {
                        from: `志 ${parseFloat(
                            (Monthlydata_Gen.solar + Monthlydata_Gen.powergrid + Monthlydata_Gen.dg + Monthlydata_Gen.ups).toFixed(2)
                        )}kWh`,
                        to: `2F ${parseFloat(
                            (Monthlydata_Consume.F2 + difference).toFixed(2)
                        )}kWh`,
                        flow: parseFloat((Monthlydata_Consume.F2 + difference).toFixed(2)),
                    },
                    {
                        from: `志 ${parseFloat(
                            (Monthlydata_Gen.solar + Monthlydata_Gen.powergrid + Monthlydata_Gen.dg + Monthlydata_Gen.ups).toFixed(2)
                        )}kWh`,
                        to: `3F ${parseFloat(
                            (Monthlydata_Consume.F3 + difference).toFixed(2)
                        )}kWh`,
                        flow: parseFloat(
                            (Monthlydata_Consume.F3 + difference).toFixed(2)
                        ),
                    },
                    {
                        from: `志 ${parseFloat(
                            (Monthlydata_Gen.solar + Monthlydata_Gen.powergrid + Monthlydata_Gen.dg + Monthlydata_Gen.ups).toFixed(2)
                        )}kWh`,
                        to: `EV充電器電灯盤 ${parseFloat(
                            (Monthlydata_Consume.EV + difference).toFixed(2)
                        )}kWh`,
                        flow: parseFloat(
                            (Monthlydata_Consume.EV + difference).toFixed(2)
                        ),
                    },
                    {
                        from: `志 ${parseFloat(
                            (Monthlydata_Gen.solar + Monthlydata_Gen.powergrid + Monthlydata_Gen.dg + Monthlydata_Gen.ups).toFixed(2)
                        )}kWh`,
                        to: `屋内消火栓 ${parseFloat(
                            (Monthlydata_Consume.FH + difference).toFixed(2)
                        )}kWh`,
                        flow: parseFloat(
                            (Monthlydata_Consume.FH + difference).toFixed(2)
                        ),
                    },
                ],
                colorFrom: "#7EC6F2",
                colorTo: "#79F2AE",
                colorMode: "gradient",
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    const getColorSettings = (data) => {
        if (data?.dg !== null && data?.meter !== null && data?.solar !== null) {
            return { bgColor: '#E9EEEF', borderColor: '#E9EEEF', colors: '#006DBC', fontColor: '#878A8B' };
        }
        else {
            return { bgColor: '#E5EBEB', borderColor: '#E5EBEB', colors: '#757676', fontColor: '#757676' };
        }
    };

    const tempCheck = getColorSettings(Monthlydata_Gen);

    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', justifyContent: 'center', color: tempCheck.colors, }}>
                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', justifyContent: 'center', gap: 2, }}>
                    <EnergyIcon className="temperature-icon" width={32} height={32} />
                    <Typography variant='h6' fontWeight='bold'>
                        毎月のエネルギー割り当て
                    </Typography>
                </Box>
            </Box>
            {console.log(Monthlydata_Gen, 'mon')
            }
            {!(Monthlydata_Gen?.dg !== null && Monthlydata_Gen?.powergrid !== null && Monthlydata_Gen?.solar !== null) ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: tempCheck.colors, marginTop: 3, marginBottom: '25px' }}>
                <WifiOffIcon className="temperature-icon" width={72} height={72} />
            </Box> : <Box sx={{ marginTop: 3 }}>
                <Chart type="sankey" data={data} options={options} width="1500" height="800" />
            </Box>}
        </Box>
    );
};

export default SankeyChart;
