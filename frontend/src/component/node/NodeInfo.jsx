import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import CustomButton from "../button/colorButton";
import nodeInfo from "../config/nodeInfoJson";
import Infocard from "../card/infcard";
import dataButton from "../config/buttonconfig";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useNavigate } from "react-router-dom";
import { getNodeParameter } from "../Services/nodeService";
// import ScrollableBox from "../Scrollbar/scrollbar";
import { useFitText } from "../config/fontResizeConfig";
import { ReactComponent as WifiOffIcon } from "../config/svgfiles/wifi-off.svg";

const NodeInfo = ({ data, handleIsClickedNode, handleEditInfo }) => {
  const [node, setNode] = useState({});
  const userRole = sessionStorage.getItem("role");
  const { ref } = useFitText();
  const handleClick = () => {
    handleIsClickedNode(false);
  };

  const handleEditClick = () => {
    handleEditInfo(true);
  };

  const fetchParameter = async () => {
    try {
      const resp = await getNodeParameter(data[0].node_mac);
      setNode(resp[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const filterSpecifications = (type, value) => {

    const ignoreKeys = ['timestamp', 'id', 'name_of_table', 'meter_name'];
    if (value !== null) {

      switch (type) {
        case  'energy_watt_hr' || 'power_watt':
          return Object.entries(node).filter(([key, value]) =>
            !ignoreKeys.includes(key) &&
            ['type','interval_data','energy_watt_hr','power_watt','current_a','min_energy', 'max_energy', 'critical_energy', 'min_power', 'max_power', 'critical_power','pf','voltage'].includes(key)
          );

        case 'temperature_c' || 'humidity_g_m3':
          return Object.entries(node).filter(([key, value]) =>
            !ignoreKeys.includes(key) &&
            ['type','interval_data','temperature_c','humidity_g_m3','min_temp', 'max_temp', 'critical_temp','min_humidity', 'max_humidity', 'critical_humidity'].includes(key)
          );

        case 'aud_db':
          return Object.entries(node).filter(([key, value]) =>
            !ignoreKeys.includes(key) &&
            ['type','interval_data','aud_db','min_aud', 'max_aud', 'critical_aud'].includes(key)
          );

        case 'co2_p':
          return Object.entries(node).filter(([key, value]) =>
            !ignoreKeys.includes(key) &&
            ['type','interval_data','co2_p','min_co2', 'max_co2', 'critical_co2'].includes(key)
          );

        case 'lux_l':
          return Object.entries(node).filter(([key, value]) =>
            !ignoreKeys.includes(key) &&
            ['type','interval_data','lux_l','min_lux', 'max_lux', 'critical_lux'].includes(key)
          );

        default:
          break;
        // return Object.entries(node).filter(([key, value]) => 
        //   !ignoreKeys.includes(key) && value !== null
        // );
      }
    }
  };

  const nodeKeys = Object.keys(node)

  useEffect(() => {
    fetchParameter();
  }, [data]);

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: "80%",
        }}
      >
        <Box>
          <Button
            sx={{
              color: "#464AA6",
              marginLeft: -1,
              height: "0px",
              // width: "20%",
              marginTop: "65px",
              cursor: "pointer",
              "&:hover": {
                opacity: 1,
                backgroundColor: "transparent",
              },
            }}
            color="inherit"
            variant="inherit"
            size="small"
            onClick={handleClick}
          >
            <ArrowBackIcon
              sx={{ marginRight: "10px", fontSize: "25px" }}
            />
            <Typography fontWeight="bold">
            すべてのノード</Typography>
          </Button>
        </Box>
        <Box></Box>
        {/* <ScrollableBox> */}
        <Box sx={{ marginTop: 4, marginBottom: 5 }}>
          <Typography variant="h5" fontWeight="bold">
            {data?.location_jp}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography marginBottom={3} color={"lightgray"}>
            DEVICE INFORMATION
          </Typography>
          <Box
            ref={ref}
            sx={{
              display: "flex",
              flexWrap: "wrap",
              columnGap: "40px",
              rowGap: "5px",
              maxWidth: "100%",
            }}
          >
            {Object.entries(data[0]).map(([key, value]) => (key !== "node_id" && key !== 'row_num' &&
              <Infocard
                key={key}
                data={{ heading: key, value: value ? value : "NA" }}
              />
            ))}
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography marginBottom={3} color={"lightgray"}>
            SPECIFICATION
          </Typography>
          <Box
            ref={ref}
            sx={{
              display: "flex",
              flexWrap: "wrap",
              columnGap: "40px",
              rowGap: "5px",
              maxWidth: "100%",
            }}
          >
            {Object.entries(node).map(([key, item]) => {
              const specifications = filterSpecifications(key,item) || []; // Fallback to an empty array
              return specifications.map(([specKey, value]) => (
                <Infocard
                  key={specKey}
                  data={{
                    heading: nodeInfo[specKey] || specKey,
                    value: value !== null ? value : "NA",
                  }}
                />
              ));
            })}


          </Box>
        </Box>
        {userRole === "ADMIN" && (
          <Box
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Typography marginBottom={3} color={"lightgray"}>
              ACTION
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "10px",
              }}
            >
              <Button variant="contained"
                sx={{ paddingLeft: 3 }}
                onClick={handleEditClick}
              >
                Edit Device Information
              </Button>
            </Box>
          </Box>
        )}
        {/* <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography marginBottom={3} color={"lightgray"}>
            CONFIGURATION
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              columnGap: "40px",
              rowGap: "5px",
              maxWidth: "100%",
            }}
          >
            {Object.entries(nodeInfo.Configuration).map(([key, value]) => (
              <Infocard key={key} data={{ heading: key, value: value }} />
            ))}
          </Box>
        </Box> */}
        {/* </ScrollableBox> */}
      </Box>
    </Box>
  );
};

export default NodeInfo;
