import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import NodeInfo from "../node/NodeInfo";
import NodewayCard from "../node/nodeCard";
import EditNode from "../node/EditNode";
import { ReactComponent as WifiOffIcon } from "../config/svgfiles/wifi-off.svg";
import Loading from "../Loading/loading";

function AllNodes({ allNodes, fetchSingleNode, handleFilterNode, errorMessage }) {
  const [filterNode, setFilterNode] = useState([]);
  const [selectedNode, setselectedNode] = useState(null);
  const [singleNode, setSingleNode] = useState("");
  const [editClick, setEditClick] = useState(false);
  const [nodeInfo, setNodeInfo] = useState(null);
  const [status, setStatus] = useState(1);

  const handleIsClickedNode = (nodeClick) => {
    setselectedNode(nodeClick);
  };

  const handleEditInfo = (click) => {
    setEditClick(click);
    console.log(click);
  };

  const getSingleNode = (key) => {
    const node = fetchSingleNode(key);
    setSingleNode(node);
  };

  const handleFilterStatus = () => {
    setStatus(status === 0 ? 1 : 0);
  };

  useEffect(() => {
    const data = handleFilterNode(status);
    setFilterNode(data);
  }, [status]);

  if (!allNodes) {
    return <Loading />;
  }

  if (errorMessage) {
    return <Box sx={{ display: 'flex', flexDirection: 'column', fontWeight: 'bold', justifyContent: 'center', gap: '10px', alignItems: 'center', color: "#757676", margin: 'auto', height: "80vh", }}>
      <WifiOffIcon className="temperature-icon" width={300} height={300} />  <Typography variant="h4" fontWeight="bold">
        Offline
      </Typography>
    </Box>;
  }

  return (
    <div>
      {/* {!allNodes?.length ? <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', height: '80vh', margin: 'auto', color: '#757676', gap: 2 }}>
        <WifiOffIcon className="temperature-icon" width={300} height={300} /> <Typography variant="h3" fontWeight='bold'>Offline</Typography> </Box> : */}
         <Box>
        {editClick ? (
          <EditNode data={singleNode} handleEditInfo={handleEditInfo} />
        ) : (
          <Box>
            {!selectedNode ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "40px",
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  textAlign="left"
                  fontSize="28px"
                  marginLeft="20px"
                >  
                合計 {status === 0 ? filterNode?.length : allNodes?.length} ノード
                </Typography>
                <Button
                  variant="contained"
                  onClick={handleFilterStatus}
                  sx={{
                    height: "70%",
                    bgcolor: "#464AA6",
                    marginLeft: "auto",
                    marginRight: "70px",
                  }}
                >
                  フィルター
                </Button>
              </Box>
            ) : (
              <Box></Box>
            )}
            <Box>
              {selectedNode ? (
                <NodeInfo
                  data={singleNode}
                  handleIsClickedNode={handleIsClickedNode}
                  handleEditInfo={handleEditInfo}
                />
              ) : (
                // <ScrollableBox
                //   sx={{
                //     display: "flex",
                //     alignItems: "flex-start",
                //     width: "100%",
                //     animation: "fadeIn 3s",
                //     padding: "20px",
                //   }}
                // >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      width: "100%",
                      animation: "fadeIn 3s",
                      padding: "20px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        flexDirection: "column",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "70px",
                        }}
                      >
                        {status === 0
                          ? filterNode?.map((data) => (
                            <Box
                              key={data?.node_mac}
                              sx={{
                                maxWidth: "calc(33.333% - 16px)",
                                minWidth: "325px",
                              }}
                            >
                              <NodewayCard
                                data={data}
                                handleIsClickedNode={handleIsClickedNode}
                                getSingleNode={getSingleNode}
                              />
                            </Box>
                          ))
                          : allNodes?.map((data) => (
                            <Box
                              key={data?.node_mac}
                              sx={{
                                maxWidth: "calc(33.333% - 16px)",
                                minWidth: "325px",
                              }}
                            >
                              {console.log(allNodes,'nodes')
                              }
                              <NodewayCard
                                data={data}
                                handleIsClickedNode={handleIsClickedNode}
                                getSingleNode={getSingleNode}
                              />
                            </Box>
                          ))}
                      </Box>
                    </Box>
                  </Box>
                // </ScrollableBox>
              )}
            </Box>
          </Box>
        )}
      </Box>
      {/* } */}
    </div>
  );
}

export default AllNodes;
