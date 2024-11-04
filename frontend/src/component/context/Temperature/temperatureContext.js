import React, { createContext, useContext, useState } from "react";

const TemperatureContext = createContext();

const useTemperatureContext = () => useContext(TemperatureContext);

const TemperatureContextProvider = ({ children }) => {
  return <TemperatureContext.Provider value={{}}>{children}</TemperatureContext.Provider>;
};

export { TemperatureContext, TemperatureContextProvider, useTemperatureContext };
