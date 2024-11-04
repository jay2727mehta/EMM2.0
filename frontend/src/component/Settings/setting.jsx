import React, { useState } from "react";
import { Box } from "@mui/material";
import PersistentDrawerLeft from "../Sidebar/sidebar";
import { Route, Routes } from "react-router-dom";
import IntegrationHome from "../Integration/integrationhome";
import GatewayHome from "../Devices/devices";
import NodeDiagram from "../gateflow";
import MqttConfigure from "../Integration/MQTT/mqttConfigure";
import EditGateway from '../gateway/editGateway'
import Security from "../Security/security";
import Rules from "../Rules/rules";
import Personal from "../Personal/personal";

const Setting = () => {
  const role = sessionStorage.getItem('role')
  const [item,setItem] = useState('');
  const handleSettings = (set) => {

  };

  const handleDrawerItem = (itemMenu) => {
    setItem(itemMenu)
  }

  return (
    <Box>
      <PersistentDrawerLeft isOpen={true} />
      <Box sx={{ marginLeft: "280px" }}>
        <Routes>
          <Route
            path="integration/*"
            element={<IntegrationHome handleSettings={handleSettings} />}
          />
          <Route path="integration/MQTT" element={<MqttConfigure />} />
          <Route path="devices/editGateway" element={<EditGateway />} />
          <Route path="devices" element={<GatewayHome handleSettings={handleSettings} />} />
          <Route path="gadgets" element={<NodeDiagram handleDrawerItem={handleDrawerItem} />} />
          <Route path="rules" element={<Rules />} />
          <Route path="personal" element={<Personal />} />
          {role === 'ADMIN' ? <Route path="security" element={<Security /> } /> : null}
        </Routes>
      </Box>
    </Box>
  );
};

export default Setting;
