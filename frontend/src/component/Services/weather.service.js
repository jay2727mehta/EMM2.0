import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL || "http://10.1.1.252:3008";

export const getWeatherData = async (city) => {
    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=6338868659bd8edd0bcf903faaf3d8a2`
        );
        
        if (response.status === 200) {
            return response.data;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

export const getAirPollutionData = async (city) => {
    try { 
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/air_pollution?lat=37.87622933692861&lon=140.55045987785402&units=metric&appid=6338868659bd8edd0bcf903faaf3d8a2`
        );
        
        if (response.status === 200) {
            return response.data;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}