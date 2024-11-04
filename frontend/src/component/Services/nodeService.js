import nodes from "../config/nodeconfig";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL || "http://192.168.1.100:3008";
const apiConfigUrl = process.env.REACT_APPCONFIG_API_URL || "http://192.168.1.100:8888"
console.log(apiConfigUrl,"config url");

export const getAllNodes = () => {
  return nodes;
};

export const getIndividualNodeConnectedToGateway = (key) => {
  const connectedNodes = nodes.filter((element) => element.gatewayId === key);
  console.log(connectedNodes, "conn");
  return connectedNodes;
};

export const getSingleNodeConnected = (key) => {
  const node = nodes.find((element) => element.id === key);
  return node;
};

export const getNodeInfo = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const resp = await axios.get(`${apiUrl}/configuration/getNodeInfo`, {
      headers: {
        authorization: token,
      },
    });
    if (resp.status === 200) {
      return resp.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log("Error fetching nodeinfo in service : ", error);
  }
};

export const getNodeParameter = async (node_mac) => {
  try {
    const token = sessionStorage.getItem("token");
    const resp = await axios.get(`${apiUrl}/configuration/getNodeParameter`, {
      headers: {
        authorization: token,
      },
      params: {
        node_mac: node_mac,
      },
    });
    console.log(resp, "getnodepara");

    if (resp.status === 200) {
      return resp.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log("Error fetching nodeinfo in service : ", error);
  }
};

export const getAllMeters = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const resp = await axios.get(`${apiUrl}/configuration/getAllMeters`, {
      headers: {
        authorization: token,
      },
    });

    if (resp.status === 200) {
      return resp.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log("Error fetching nodeinfo in service : ", error);
  }
};

export const updateNodeMeterRangeInfo = async (updatedInfo) => {
  try {
    const token = sessionStorage.getItem("token");
    const resp = await axios.post(
      `${apiConfigUrl}/config/updateNodeMeterRangeInfo`,
      updatedInfo,
      {
        headers: {
          authorization: token,
        },
      }
    );
    
    if (resp.status === 201) {
      return resp.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log("Error fetching nodeinfo in service : ", error);
  }
};
