import { Box, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { getSolarPredictionByDate, getSolarRawPredictionData } from '../../Services/pred/prediction.service';
import { useNavigate } from 'react-router-dom';
import MediumSolarPredictCard from '../../card/Solar/mediumSolarPredictCard';

const SolarPredictionHome = ({ }) => {
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [rawData, setRawData] = useState([]);
    const [predictionData, setPredictionData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [processData, setProcessData] = useState([]);
    // const { solarGen } = useReport();

    const fetchdatafromsolarenergy = async () => {
        try {
            setIsLoading(true);
            const startDate = "2024-08-05";
            const endDate = "2024-10-01";
            const preData = await getSolarPredictionByDate(startDate, endDate);
            setPredictionData(preData);
        } catch (error) {
            handleError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const data = await getSolarRawPredictionData();
            setRawData(data);
        } catch (error) {
            handleError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleError = (error) => {
        setError(true);
        //   switch (error.message) {
        //     case "Request failed with status code 500":
        //       setErrorMessage(errorMessageIndividual.error_500);
        //       break;
        //     case "Request failed with status code 404":
        //       setErrorMessage(errorMessageIndividual.error_404);
        //       break;
        //     case "Network Error":
        //       setErrorMessage(errorMessageIndividual.networkError);
        //       break;
        //     case "Request failed with status code 400":
        //       setErrorMessage(errorMessageIndividual.error_400);
        //       break;
        //     default:
        //       setErrorMessage("An unexpected error occurred.");
        //   }
    };

    const convertDate = (isostring) => {
        const date = new Date(isostring);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Ensure two digits
        const day = String(date.getDate()).padStart(2, "0"); // Ensure two digits

        const convertedDate = `${year}-${month}-${day}`;
        return convertedDate;
    };

    // const appendRawData = () => {
    //   const data = solarGen ? solarGen.resultdata.slice(1) : [];

    //   // Convert dates in data array
    //   data.forEach((item) => {
    //     const convertedDate = convertDate(item.date);
    //     item.date = convertedDate;
    //   });

    //   // Get endDate from rawData if it exists
    //   const endDate =
    //     rawData.length > 0
    //       ? convertDate(rawData[rawData.length - 1].DateTime)
    //       : "";

    //   // Filter data based on endDate
    //   const filterData = data.filter((item) => item.date > endDate);

    //   // Update rawData with new data
    //   setRawData([
    //     ...rawData,
    //     ...filterData
    //       .map((item) => ({
    //         DateTime: item.date,
    //         DayGen: item.total_solar_gen_day,
    //       }))
    //       .reverse(),
    //   ]);
    // };

    const processedData = (raw, predict) => {
        try {
            if (raw.length && predict.length) {
                // Define the fixed start date
                const fixedStartDate = new Date("2024-05-01");

                // Get the latest date from raw and predict data
                const rawDates = raw.map((item) => new Date(item.DateTime));
                const predictDates = predict.map((item) => new Date(item.date));

                const endDate = new Date(Math.max(...rawDates, ...predictDates));

                // Generate a list of dates within the range from fixedStartDate to endDate
                const datesInRange = [];
                for (
                    let d = new Date(fixedStartDate);
                    d <= endDate;
                    d.setDate(d.getDate() + 1)
                ) {
                    datesInRange.push(d.toISOString().split("T")[0]); // Format as YYYY-MM-DD
                }

                // Create a map for predict data for quick lookup
                const predictMap = predict.reduce((acc, item) => {
                    acc[item.date] = item.solarenergy;
                    return acc;
                }, {});

                // Map dates to raw data and predict data
                const processedSolarPreData = datesInRange.map((date) => {
                    const rawItem = raw.find((item) => item.DateTime === date) || {};
                    const dayGen = rawItem.DayGen || null;
                    const solarEnergy = predictMap[date] || null;
                    return [date, dayGen, solarEnergy];
                });

                setProcessData(processedSolarPreData);
            }
        } catch (error) {
            handleError(error)
        }
    };

    useEffect(() => {
        fetchData();
        fetchdatafromsolarenergy();
    }, []);

    useEffect(() => {
        processedData(rawData, predictionData);
    }, [rawData, predictionData]);

    const styles = {
        thinBorder: {
            border: "0.5px solid #E5E7EB",
            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
            backgroundColor: "white",
        },
    };

    return (
        <Box sx={{ padding: 4, }}>
            <MediumSolarPredictCard Data={processData} />
        </Box>
    )
}
export default SolarPredictionHome