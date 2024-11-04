// BarContext.js
import React, { createContext, useContext, useState } from 'react';

const BarContext = createContext();

 const useBarContext = () => useContext(BarContext);

 const BarProvider = ({ children }) => {
  const [barData, setBarData] = useState(false); // Example state for bar chart data

  const updateBarData = (newData) => {
    console.log();
    setBarData(newData);
  };

  return (
    <BarContext.Provider value={{ barData, updateBarData }}>
      {children}
    </BarContext.Provider>
  );
};

export { BarContext,BarProvider,useBarContext };