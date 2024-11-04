import { useEffect } from 'react';

const useFetchDataOnInterval = (fetchDataMethod, interval = 10000) => {
  useEffect(() => {
    // Function to fetch data
    const fetchData = async () => {
      try {
        const data = await fetchDataMethod();
        console.log("Fetched data:", data);
        // Handle the fetched data as needed (e.g., update state)
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error as needed
      }
    };

    // Immediately fetch data when component mounts
    fetchData();

    // Set up the interval to run fetchData every `interval` milliseconds
    const intervalId = setInterval(fetchData, interval);

    // Cleanup function to clear the interval when the component unmounts or dependencies change
    return () => clearInterval(intervalId);
  }, [fetchDataMethod, interval]); // Dependencies include the fetch method and interval time
};

export default useFetchDataOnInterval;
