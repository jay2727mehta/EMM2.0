import { sankey_monthly } from "./sankey/sankeyConfig";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3008";



export const addGraphConfig = async (graphConfig) => {
  try {
    const token = sessionStorage.getItem("token");
    const resp = await axios.post(
      `${apiUrl}/graphservice/addGraphConfig`,
      graphConfig,
      {
        headers: {
          authorization: token,
        },
      }
    );

    if (resp.status === 200) {
      return resp.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log("Error inserting graphconfig in service : ", error);
  }
};

export const getCompleteGraphConfig = async (userId,componentMap) => {
  try {
    const token = sessionStorage.getItem("token");
    const resp = await axios.get(
      `${apiUrl}/graphservice/getCompleteGraphConfig`,
      {
        params: {
          userId,componentMap
        },
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    if (resp.status === 200) {
      return resp.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log("Error fetching graphconfig in service : ", error);
  }
};

export const getCompleteGraphConfigUser = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const resp = await axios.get(
      `${apiUrl}/graphservice/getCompleteGraphConfigUser`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log(resp.data, "serv");

    if (resp.status === 200) {
      return resp.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log("Error fetching graphconfig in service : ", error);
  }
};

export const deleteGraphConfig = async (graph_id) => {
  try {
    const token = sessionStorage.getItem("token");

    const resp = await axios.delete(
      `${apiUrl}/graphservice/deleteGraphConfig`,
      {
        headers: {
          Authorization: token,
        },
        params: {
          graph_id,
        },
      }
    );

    if (resp.status === 200) {
      return resp.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log("Error deleting graph config in service:", error.message);
    return null;
  }
};

export const getdataEnergyDynamicindi = async (selectedRange, meterConfig) => {
  try {
    const resp = await axios.get(
      `${apiUrl}/graphDataservice/getEnergyDataDynamicallSpecificTable`,
      {
        params: {
          range: selectedRange,
          meterConfig: meterConfig,
        },
      }
    );
    return resp.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // rethrow the error to handle it in the calling code
  }
};

export const getdata10minSelectedMeter = async (selectedRange, meterConfig) => {
  try {
    const resp = await axios.get(
      `${apiUrl}/graphDataservice/getPowerTrendlineDynamically`,
      {
        params: {
          range: selectedRange,
          meterConfig: meterConfig,
        },
      }
    );
    return resp.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getTempInfoIndivisualDeviceCurrent = async (selectedRange,meterConfig) => {
  try {
    const resp = await axios.get(
      `${apiUrl}/graphDataservice/getTempInfoIndivisualDeviceCurrent`,
      {
        params: {
          range: selectedRange,
          meterConfig: meterConfig,
        },
      }
    );
    if (resp.status === 200) {
      return resp.data.data; 
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getHumidityInfoIndivisualDeviceCurrent = async (selectedRange,meterConfig) => {
  try {
    const resp = await axios.get(
      `${apiUrl}/graphDataservice/getHumidityInfoIndivisualDeviceCurrent`,
      {
        params: {
          range: selectedRange,
          meterConfig: meterConfig,
        },
      }
    );
    if (resp.status === 200) {
      return resp.data.data; 
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getDeviceInfoIndivisualDeviceCurrent = async (selectedRange,meterConfig) => {
  try {
    const resp = await axios.get(
      `${apiUrl}/graphDataservice/getDeviceInfoIndivisualDeviceCurrent`,
      {
        params: {
          range: selectedRange,
          meterConfig: meterConfig,
        },
      }
    );
    if (resp.status === 200) {
      return resp.data.data; 
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getDeviceCombineIndivisualDeviceCurrent = async (selectedRange,meterConfig) => {
  try {
    console.log("in getDeviceCombineIndivisualDeviceCurrent");
    
    const resp = await axios.get(
      `${apiUrl}/graphDataservice/getDeviceCombineIndivisualDeviceCurrent`,
      {
        params: {
          range: selectedRange,
          meterConfig: meterConfig,
        },
      }
    );
    if (resp.status === 200) {
      return resp.data.data; 
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getEnergyDataCombineDynamicallSpecificTable = async (selectedRange,meterConfig) => {
  try {
    console.log("in getEnergyDataCombineDynamicallSpecificTable");
    
    const resp = await axios.get(
      `${apiUrl}/graphDataservice/getEnergyDataCombineDynamicallSpecificTable`,
      {
        params: {
          range: selectedRange,
          meterConfig: meterConfig,
        },
      }
    );
    if (resp.status === 200) {
      return resp.data.data; 
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getMainMeterdatabybuilding = async () => {
  try {
    const resp = await axios.get(
      `${apiUrl}/energymeter/MainMeterdatabybuildingMonthly`
    );
  
    return resp.data;
  } catch (error) {
    throw error;
  }
};

export const getDgmonthlyProduce = async () => {
  try {
    const resp = await axios.get(`${apiUrl}/energy/getDgMonthlyProduceData`);
    return resp.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // rethrow the error to handle it in the calling code
  }
};

export const getdgdataevery5min = async () => {
  try {
    const resp = await axios.get(`${apiUrl}/energy/getDgDataEvery5Min`);
    return resp.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getSolarPowerCombineEnergy = async () => {
  try {
   
    let selectedRange="month"
    let meterConfig=sankey_monthly.Solar
    const resp = await axios.get(
      `${apiUrl}/graphDataservice/getEnergyDataCombineDynamicallSpecificTable`,
      {
        params: {
          range: selectedRange,
          meterConfig: meterConfig,
        },
      }
    );
    if (resp.status === 200) {
      return resp.data.data; 
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
export const get1FfloorCombineEnergy = async () => {
  try {

    let selectedRange="month"
    let meterConfig=sankey_monthly["1F"]
    const resp = await axios.get(
      `${apiUrl}/graphDataservice/getEnergyDataCombineDynamicallSpecificTable`,
      {
        params: {
          range: selectedRange,
          meterConfig: meterConfig,
        },
      }
    );
    if (resp.status === 200) {
      return resp.data.data; 
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
export const get2FfloorCombineEnergy = async () => {
  try {

    let selectedRange="month"
    let meterConfig=sankey_monthly["2F"]
    const resp = await axios.get(
      `${apiUrl}/graphDataservice/getEnergyDataCombineDynamicallSpecificTable`,
      {
        params: {
          range: selectedRange,
          meterConfig: meterConfig,
        },
      }
    );
    if (resp.status === 200) {
      return resp.data.data; 
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
export const get3FfloorCombineEnergy = async () => {
  try {
    let selectedRange="month"
    let meterConfig=sankey_monthly["3F"]
    const resp = await axios.get(
      `${apiUrl}/graphDataservice/getEnergyDataCombineDynamicallSpecificTable`,
      {
        params: {
          range: selectedRange,
          meterConfig: meterConfig,
        },
      }
    );
    if (resp.status === 200) {
      return resp.data.data; 
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getEVStationCombineEnergy = async () => {
  try {
  
    let selectedRange="month"
    let meterConfig=sankey_monthly["EV Station"]
    const resp = await axios.get(
      `${apiUrl}/graphDataservice/getEnergyDataCombineDynamicallSpecificTable`,
      {
        params: {
          range: selectedRange,
          meterConfig: meterConfig,
        },
      }
    );
    if (resp.status === 200) {
      return resp.data.data; 
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
export const getFireHydrantCombineEnergy = async () => {
  try {
    let selectedRange="month"
    let meterConfig=sankey_monthly["Fire Hydrant"]
    const resp = await axios.get(
      `${apiUrl}/graphDataservice/getEnergyDataCombineDynamicallSpecificTable`,
      {
        params: {
          range: selectedRange,
          meterConfig: meterConfig,
        },
      }
    );
    if (resp.status === 200) {
      return resp.data.data; 
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
export const getUPSCombineEnergy = async () => {
  try {
    console.log("in get3FfloorCombineEnergy" ,sankey_monthly["UPS"]);
    let selectedRange="month"
    let meterConfig=sankey_monthly["UPS"]
    const resp = await axios.get(
      `${apiUrl}/graphDataservice/getEnergyDataCombineDynamicallSpecificTable`,
      {
        params: {
          range: selectedRange,
          meterConfig: meterConfig,
        },
      }
    );
    if (resp.status === 200) {
      return resp.data.data; 
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
export const getPowerGridCombineEnergy = async () => {
  try {
    console.log("in getPowerGridCombineEnergy" ,sankey_monthly.PowerGrid);
    let selectedRange="month"
    let meterConfig=sankey_monthly.PowerGrid
    const resp = await axios.get(
      `${apiUrl}/graphDataservice/getEnergyDataCombineDynamicallSpecificTable`,
      {
        params: {
          range: selectedRange,
          meterConfig: meterConfig,
        },
      }
    );
    if (resp.status === 200) {
      return resp.data.data; 
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
// export const getEnergyDataCombineDynamicallSpecificTable = async (selectedRange,meterConfig) => {
//   try {
//     console.log("in getEnergyDataCombineDynamicallSpecificTable");
    
//     const resp = await axios.get(
//       `${apiUrl}/graphDataservice/getEnergyDataCombineDynamicallSpecificTable`,
//       {
//         params: {
//           range: selectedRange,
//           meterConfig: meterConfig,
//         },
//       }
//     );
//     if (resp.status === 200) {
//       return resp.data.data; 
//     } else {
//       return null;
//     }
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     throw error;
//   }
// };