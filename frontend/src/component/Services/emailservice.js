import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

export const getTotalEnergydistributionLoad = async () => {
    try {
      const resp = await axios.get(`${apiUrl}/emailService`)
      return resp.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // rethrow the error to handle it in the calling code
    }
  };


  export const criticalpowerMail = async (data) => {
    try {
      const resp =  await axios.get(`${apiUrl}/emailService/criticalPower`,{
        params : data
      });
      
      return resp.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // rethrow the error to handle it in the calling code
    }
  };


  export const OfflineNodesMail = async (data) => {
    try {
      const resp =  await axios.get(`${apiUrl}/emailService/nodes`);
      return resp.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // rethrow the error to handle it in the calling code
    }
  };


  export const dgupdateMail = async (data) => {
    try {
      const resp = await axios.post(`${apiUrl}/emailService/dgupdate`,{data})
      return resp.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // rethrow the error to handle it in the calling code
    }
  };

  
  // export const getEmployeeCount = async (data) => {
  //   try {
  //     const resp = await axios.get(`${apiUrl}/emailService/getemployeecount`)
  //     return resp.data;
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //     throw error; // rethrow the error to handle it in the calling code
  //   }
  // };