import { Alert, Box, Button, Snackbar, TextField, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, { useEffect, useState } from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import ScrollableBox from "../Scrollbar/scrollbar";
import { getNodeParameter, updateNodeMeterRangeInfo } from "../Services/nodeService";
import { IoBookmarkSharp } from "react-icons/io5";
import { ReactComponent as WifiOffIcon } from "../config/svgfiles/wifi-off.svg";
import nodeInfo from "../config/nodeInfoJson";

const EditNode = ({ data, handleEditInfo }) => {
  const [node, setNode] = useState({});
  const [nodeData, setNodeData] = useState({});
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  console.log(data, "editable node");

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleEditClick = () => {
    handleEditInfo(false);
  };

  const handleNodeChange = (e) => {
    const { name, value } = e.target;
    setNode((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNodeDataChange = (e) => {
    const { name, value } = e.target;
    setNodeData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateClick = async () => {
    try {
      const resp = await updateNodeMeterRangeInfo(node);
      setSuccess(!!resp);
      setError(!resp);
      setMessage(resp?.message ? "Node : " + nodeData.node_name + " " + "Range Updated" : "An error occurred");
      setOpen(true);
    } catch (error) {
      console.log(error);
      setError(true);
      setMessage(error);
      setOpen(true);
    }
  };


  const fetchParameter = async () => {
    try {
      console.log(data, 'da');

      const resp = await getNodeParameter(data[0].node_mac);
      console.log(resp, 'resp')
      setNode(resp[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const filterSpecifications = (type, value) => {

    const ignoreKeys = ['timestamp', 'id', 'name_of_table', 'meter_name'];
    if (value !== null) {

      switch (type) {
        case 'energy_watt_hr' || 'power_watt':
          return Object.entries(node).filter(([key, value]) =>
            !ignoreKeys.includes(key) &&
            ['type', 'interval_data', 'energy_watt_hr', 'power_watt', 'current_a', 'min_energy', 'max_energy', 'critical_energy', 'min_power', 'max_power', 'critical_power', 'pf', 'voltage'].includes(key)
          );

        case 'temperature_c' || 'humidity_g_m3':
          return Object.entries(node).filter(([key, value]) =>
            !ignoreKeys.includes(key) &&
            ['type', 'interval_data', 'temperature_c', 'humidity_g_m3', 'min_temp', 'max_temp', 'critical_temp', 'min_humidity', 'max_humidity', 'critical_humidity'].includes(key)
          );

        case 'aud_db':
          return Object.entries(node).filter(([key, value]) =>
            !ignoreKeys.includes(key) &&
            ['type', 'interval_data', 'aud_db', 'min_aud', 'max_aud', 'critical_aud'].includes(key)
          );

        case 'co2_p':
          return Object.entries(node).filter(([key, value]) =>
            !ignoreKeys.includes(key) &&
            ['type', 'interval_data', 'co2_p', 'min_co2', 'max_co2', 'critical_co2'].includes(key)
          );

        case 'lux_l':
          return Object.entries(node).filter(([key, value]) =>
            !ignoreKeys.includes(key) &&
            ['type', 'interval_data', 'lux_l', 'min_lux', 'max_lux', 'critical_lux'].includes(key)
          );

        default:
          break;
        // return Object.entries(node).filter(([key, value]) => 
        //   !ignoreKeys.includes(key) && value !== null
        // );
      }
    }
  };

  useEffect(() => {
    if (data && data.length > 0) {
      setNodeData(data[0]);
      fetchParameter();
    }
  }, [data]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          severity={success ? "success" : "error"}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
      {/* <ScrollableBox> */}
      <Button
        sx={{
          color: "#464AA6",
          marginLeft: "-18px",
          height: "0px",
          width: "220px",
          marginTop: "25px",
          cursor: "pointer",
          "&:hover": {
            opacity: 1,
            backgroundColor: "transparent",
          },
        }}
        color="inherit"
        variant="inherit"
        size="small"
        onClick={handleEditClick}
      >
        <ArrowBackIcon sx={{ marginRight: "20px", fontSize: "25px" }} />
        <Typography fontWeight="bold">Node Name Info</Typography>
      </Button>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: "50px",
          gap: "20px",
        }}
      >
        <Typography fontWeight="bold">Device Information</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignContent: "space-evenly",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          {Object.entries(nodeData).map(([key, value]) => (key !== "node_id" && key !== 'row_num' &&
            <FormControl variant="outlined" sx={{ minWidth: 200 }} key={key}>
              <TextField
                label={key}
                name={key}
                variant="outlined"
                value={value || ""}
                onChange={handleNodeDataChange}
                disabled
              />
            </FormControl>
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: "50px",
          gap: "20px",
        }}
      >
        <Typography fontWeight="bold">Specification</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignContent: "space-evenly",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          {Object.entries(node).map(([key, value]) => {
            const specifications = filterSpecifications(key, value) || [];
            return specifications.map(([specKey, value]) => (
              <FormControl variant="outlined" sx={{ minWidth: 200 }} key={specKey}>
                <TextField
                  label={nodeInfo[specKey] || specKey}
                  name={specKey}
                  variant="outlined"
                  value={value || null}
                  onChange={handleNodeChange}
                />
              </FormControl>
            ));
          }
          )}
        </Box>
      </Box>
      {/* <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            marginTop: "50px",
            gap: "20px",
          }}
        >
          <Typography fontWeight="bold">Set Alert</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignContent: "space-evenly",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            <FormControl variant="outlined" sx={{ minWidth: 200 }}>
              <InputLabel>Normal Warning</InputLabel>
              <Select label="Normal Warning">
                <MenuItem key={"parameter"} value={"parameter"}>
                  {"parameter"}
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="outlined" sx={{ minWidth: 200 }}>
              <InputLabel>Critical Alert</InputLabel>
              <Select label="Critical Alert">
                <MenuItem key={"parameter"} value={"parameter"}>
                  {"parameter"}
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box> */}
      <Box sx={{ display: "flex", marginTop: "50px" }}>
        <Button
          variant="contained"
          sx={{ m: 1, width: 200, borderRadius: "5px" }}
          onClick={handleUpdateClick}
        >
          Update Information
        </Button>
        <Button
          variant="outlined"
          sx={{ m: 1, width: 100, borderRadius: "5px" }}
          onClick={handleEditClick}
        >
          Cancel
        </Button>
      </Box>

      {/* </ScrollableBox> */}
    </Box>
  );
};

export default EditNode;
