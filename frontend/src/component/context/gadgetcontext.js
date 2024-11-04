
import React, { createContext, useState ,useContext} from 'react';

const DashboardContext = createContext();

const useDashboardContext = () => useContext(DashboardContext);
const DashboardProvider = ({ children }) => {
  const [dashboardGadgets, setDashboardGadgets] = useState([]);

  const addGadget = (gadget) => {
    setDashboardGadgets((prevGadgets) => [...prevGadgets, gadget]);
  };

  const removeGadget = (type) => {
    setDashboardGadgets((prevGadgets) =>
      prevGadgets.filter((gadget) => gadget.type !== type)
    );
  };

  return (
    <DashboardContext.Provider value={{ dashboardGadgets, addGadget,removeGadget }}>
      {children}
    </DashboardContext.Provider>
  );
};

export { DashboardContext, DashboardProvider,useDashboardContext };
