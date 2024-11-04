import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;


export const getCurrentDate = () => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate()); // Subtract one day

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Add leading zero if needed
  const day = String(currentDate.getDate()).padStart(2, "0"); // Add leading zero if needed

  return `${year}-${month}-${day}`;
};

export const getSolardataRangewisegenBar = async (
  selectTable,
  selectedRange
) => {
  try {
    const resp = await axios.get(
      `${apiUrl}/solar/solarenergydatarangedaywise`,
      {
        params: {
          tablename: selectTable,
          range: selectedRange,
        },
      }
    );

    return resp.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // rethrow the error to handle it in the calling code
  }
};

export const getSolarEnergydaily = async () => {
  try {
    const rangeDay = getCurrentDate();

    const resp = await axios.get(`${apiUrl}/solar/solarenergydatarange`, {
      params: {
        range: rangeDay,
      },
    });

    return resp.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // rethrow the error to handle it in the calling code
  }
};

export const getsolaralldata = async () => {
  try {
    const rangeDay = getCurrentDate();

    const resp = await axios.get(`${apiUrl}/solar/solaralldata`, {
      params: {
        range: rangeDay,
      },
    });

    return resp.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // rethrow the error to handle it in the calling code
  }
};

export const getSolar5mindata = async () => {
  try {
    const rangeDay = getCurrentDate();

    // const resp = await axios.get(`${apiUrl}/solar/solartimlydata`, {
    //   params: {
    //     range:rangeDay
    //     },
    // });
    const resp = await axios.get(`${apiUrl}/solar/solarpowertimlydata`);

    return resp.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // rethrow the error to handle it in the calling code
  }
};

export const getCurrentsolarpower = async () => {
  try {
    const resp = await axios.get(`${apiUrl}/solar/Currentsolarpower`);

    return resp.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // rethrow the error to handle it in the calling code
  }
};
export const getdaygenerationEnergy = async () => {
  try {
    const resp = await axios.get(`${apiUrl}/solar/dayEnergyGen`);

    return resp.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // rethrow the error to handle it in the calling code
  }
};

export const getTotalgenerationSolar = async () => {
  try {
    const resp = await axios.get(`${apiUrl}/solar/TotalgenerationSolar`);

    return resp.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // rethrow the error to handle it in the calling code
  }
};

export const getenergypowerCurrentdatedata = async () => {
  try {
    const resp = await axios.get(`${apiUrl}/solar/energypowercurrentdate`);

    return resp.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // rethrow the error to handle it in the calling code
  }
};

export const getenergypowerPastdatedata = async (data) => {
  try {
    const resp = await axios.get(`${apiUrl}/solar/energypowerPastdate`, {
      params: {
        date: data,
      },
    });

    return resp.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // rethrow the error to handle it in the calling code
  }
};

export const getSolarpowerPastdatedata = async (data) => {
  try {
    const resp = await axios.get(`${apiUrl}/solar/solarpowerPastdate`, {
      params: {
        date: data,
      },
    });

    return resp.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // rethrow the error to handle it in the calling code
  }
};

export const getTotalGenbySolarandMeter = async () => {
  try {
    const resp = await axios.get(`${apiUrl}/solar/TotalGenbySolarandMeter`);

    return resp.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // rethrow the error to handle it in the calling code
  }
};

export const getSolarTotalgenlast5days = async () => {
  try {
    const resp = await axios.get(`${apiUrl}/solar/last5dayEnergyGen`);

    return resp.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // rethrow the error to handle it in the calling code
  }
};

export const getmonthlyEnergyGen = async () => {
  try {
    const resp = await axios.get(`${apiUrl}/solar/currentMonthGen`);

    return resp.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // rethrow the error to handle it in the calling code
  }
};

export const getsolarenergydata = async () => {
  try {
    const resp = await axios.get(`${apiUrl}/solar/dailyenergydata`);
    return resp.data;
  } catch (error) {
    console.log("Error fetching data:", error);
    throw error; // rethrow the error to handle it in the calling code
  }
};

export const getCurrentSolarPowerGrid = async () => {
  try {
    const resp = await axios.get(`${apiUrl}/solar/currentSolarPowerGrid`);
    return resp.data;
  } catch (error) {
    console.log("Error fetching data:", error);
    throw error; // rethrow the error to handle it in the calling code
  }
};

export const getsolarMonthlyGen = async () => {
  try {
    const resp = await axios.get(`${apiUrl}/solar/monthlyenergydata`);
    return resp.data;
  } catch (error) {
    console.log("Error fetching data:", error);
    throw error;
  }
};

export const getSolarGridDistribution = async () => {
  try {
    const resp = await axios.get(`${apiUrl}/solar/getsolargriddistribution`);
    return resp.data;
  } catch (error) {
    console.log("Error fetching data:", error);
    throw error;
  }
};

export const getWeeklyAvgConsumption = async () => {
  try {
    const resp = await axios.get(`${apiUrl}/solar/getweeklyavgconsumption`);
    return resp.data;
  } catch (error) {
    console.log("Error fetching data:", error);
    throw error;
  }
};

export const getMDHitValueSolar = async () => {
  try {
    const resp = await axios.get(`${apiUrl}/solar/getmdhitvalue`);
    return resp.data;
  } catch (error) {
    console.log("Error fetching data:", error);
    throw error;
  }
};
