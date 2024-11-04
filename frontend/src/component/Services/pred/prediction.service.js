import axios from "axios";
const predictUrl = process.env.REACT_APP_SOLAR_PREDICT || "http://10.1.2.3:5000";


// const apiUrl = process.env.REACT_APP_PREDICTION;

// console.log(apiUrl);

const apiURL="http://10.1.1.252:5000"
export const getPredictiondata = async (selectTable,selectedRange) => {
    try {
   
      const resp = await axios.get(`${apiURL}/predictionModel`, {
        params: {
          tablename:selectTable,
          range:selectedRange
          },
      });
      return resp.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // rethrow the error to handle it in the calling code
    }
  };

  
export const getRawdata = async (selectTable,selectedRange) => {
    try {
   
      const resp = await axios.get(`${apiURL}/rawdataweekly`, {
        params: {
          tablename:selectTable,
          range:selectedRange
          },
      });
      
      return resp.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // rethrow the error to handle it in the calling code
    }
  };

  export const getpredictdataUp = async (selectTable,selectedRange) => {
    try {
   
      const resp = await axios.get(`${apiURL}/predictionmodelupdate`, {
        params: {
          tablename:selectTable,
          range:selectedRange
          },
      });
      
      return resp.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // rethrow the error to handle it in the calling code
    }
  };
  
  export const getSolarRawPredictionData = async () => {
    try {
      const resp = await axios.get(`${predictUrl}/rawdataSolar`);
      return resp.data
    } catch (error) {
      console.log("Error Fetching Solar Prediction : ", error);
    }
  };
  
  export const getSolarPredictionByDate = async (startDate, endDate) => {
    try {
      const resp = await axios.get(`${predictUrl}/predictionModelSolar`, {
        params: {
          start_date: startDate,
          end_date: endDate,
        },
      });
      return resp.data;
    } catch (error) {
      console.log("Error fetching solar Prediction : ", error);
    }
  };