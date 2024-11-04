import gateways from "../config/gatewayconfig";
import individualGateway from "../config/gatewayinfo";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL || "http://10.1.1.252:3008";

export const getAllGateways = () => {
  return gateways;
};

export const getIndividualGateway = () => {
  return individualGateway;
};

export const getGatewayInfo = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const resp = await axios.get(`${apiUrl}/configuration/getGatewayInfo`, {
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
    console.log("Error fetching gatewayinfo in service : ", error);
  }
};
