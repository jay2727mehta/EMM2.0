// src/index.js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeContextProvider } from "./component/context/themeContext";
import { EnergyMainMeterdataProvide } from "./component/context/energyMainmetercontext";


ReactDOM.render(
  <ThemeContextProvider>
    <EnergyMainMeterdataProvide>
      <App />
    </EnergyMainMeterdataProvide>
  </ThemeContextProvider>,
  document.getElementById("root")
);
