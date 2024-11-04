import React, { createContext, useContext, useState } from "react";

const AlertContext = createContext();

const useAlertContext = () => useContext(AlertContext);

const AlertContextProvider = ({ children }) => {
  return <AlertContext.Provider value={{}}>{children}</AlertContext.Provider>;
};

export { AlertContext, AlertContextProvider, useAlertContext };
