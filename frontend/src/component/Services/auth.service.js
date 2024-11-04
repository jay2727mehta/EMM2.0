import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL || "http://10.1.1.252:3008";

export const authorizeUser = async (email, password) => {
  try {
    const body = { email, password };
    const resp = await axios.post(`${apiUrl}/auth/`, body);

    if (resp.status === 200) {
      return resp.data.authConfig;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error in auth service : ", error);
  }
};

export const registerUser = async (registerObj) => {
  try {
    const resp = await axios.post(`${apiUrl}/auth/register`, registerObj);

    if (resp.status === 201) {
      return resp.data.message;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error in auth service : ", error);
  }
};

export const fetchUsers = async () => {
  try {
    const resp = await axios.get(`${apiUrl}/auth/getalluser`);
    if (resp.status === 200) {
      return resp.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error in auth service : ", error);
  }
};

export const assignUsers = async (assign) => {
  try {
    const resp = await axios.put(`${apiUrl}/auth/assignAdmin`,assign);
    console.log(resp,'res',assign);
    
    if (resp.status === 201) {
      return resp.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error in auth service : ", error);
  }
};
