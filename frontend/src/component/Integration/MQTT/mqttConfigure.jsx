import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ClearIcon from "@mui/icons-material/Clear";
import { useNavigate } from "react-router-dom";
import ScrollableBox from "../../Scrollbar/scrollbar";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const MqttConfigure = () => {
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState(false);
  const [formData, setFormData] = useState({
    broker: "",
    port: "",
    username: "",
    password: "",
    clientId: "",
    keepAliveTime: "",
    certificateValidation: "",
    protocol: "",
    transport: "",
  });

  const handleFocusChange = (event) => {
    setIsFocused(event.target === document.activeElement);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSelectChange = (e) => {
    setFormData({ ...formData, certificateValidation: e.target.value });
  };

  const handleSubmit = () => {
    // Implement form submission logic
    console.log("Form data submitted:", formData);
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: -10,
        }}
      >
        <Button
          sx={{ display: "flex", gap: "10px" }}
          size="small"
          onClick={() => navigate("/setting/integration")}
        >
          <ArrowBackIosNewIcon sx={{ fontSize: "20px" }} />
          <Typography fontWeight="bold" marginTop="5px" textAlign="left">
            Integration List
          </Typography>
        </Button>
        <Typography
          margin="auto"
          variant="h4"
          fontWeight="bold"
          textAlign="center"
        >
          MQTT
        </Typography>
        <Button
          sx={{ border: "0.5px solid #E5E7EB", marginRight: "50px" }}
          onClick={() => navigate("/setting/integration")}
        >
          <ClearIcon />
        </Button>
      </Box>
      <Divider sx={{ marginTop: "20px", marginLeft: -5 }} />
      <Box>
        <ScrollableBox>
          <Box sx={{ marginTop: "50px" }}>
            <Box>
              <Typography variant="body1" fontWeight="600" fontSize="22px">
                Broker Option
              </Typography>
              <Typography color="#979797">
                Please enter the connection information of your MQTT broker
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  gap: "30px",
                  flexWrap: "wrap",
                }}
              >
                <Box sx={{ marginTop: "20px" }}>
                  <TextField
                    variant="filled"
                    id="broker"
                    label="Broker"
                    sx={{
                      minWidth: 500,
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#F0F2FA",
                      },
                      "& .MuiFilledInput-root:hover": {
                        backgroundColor: "#E8EAF6", // optional: slightly darker shade on hover
                      },
                      "& .MuiFilledInput-root.Mui-focused": {
                        backgroundColor: "#F0F2FA", // maintain the same color when focused
                      },
                    }}
                    required
                    value={formData.broker}
                    onChange={handleChange}
                  />
                  <Typography color="#979797">
                    The host name or IP address of your MQTT broker
                  </Typography>
                </Box>
                <Box sx={{ marginTop: "20px" }}>
                  <TextField
                    variant="filled"
                    id="port"
                    label="Port"
                    sx={{
                      minWidth: 500,
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#F0F2FA",
                      },
                      "& .MuiFilledInput-root:hover": {
                        backgroundColor: "#E8EAF6", // optional: slightly darker shade on hover
                      },
                      "& .MuiFilledInput-root.Mui-focused": {
                        backgroundColor: "#F0F2FA", // maintain the same color when focused
                      },
                    }}
                    required
                    value={formData.port}
                    onChange={handleChange}
                  />
                  <Typography color="#979797">
                    The Port your MQTT broker listens to
                  </Typography>
                </Box>
                <Box sx={{ marginTop: "20px" }}>
                  <TextField
                    variant="filled"
                    id="username"
                    label="Username"
                    sx={{
                      minWidth: 500,
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#F0F2FA",
                      },
                      "& .MuiFilledInput-root:hover": {
                        backgroundColor: "#E8EAF6", // optional: slightly darker shade on hover
                      },
                      "& .MuiFilledInput-root.Mui-focused": {
                        backgroundColor: "#F0F2FA", // maintain the same color when focused
                      },
                    }}
                    required
                    value={formData.username}
                    onChange={handleChange}
                  />
                  <Typography color="#979797">
                    The Username to login to your MQTT broker
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  gap: "30px",
                  marginTop: "20px",
                  flexWrap: "wrap",
                }}
              >
                <Box sx={{ marginTop: "20px" }}>
                  <TextField
                    variant="filled"
                    id="password"
                    label="Password"
                    sx={{
                      minWidth: 500,
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#F0F2FA",
                      },
                      "& .MuiFilledInput-root:hover": {
                        backgroundColor: "#E8EAF6", // optional: slightly darker shade on hover
                      },
                      "& .MuiFilledInput-root.Mui-focused": {
                        backgroundColor: "#F0F2FA", // maintain the same color when focused
                      },
                    }}
                    required
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={handleFocusChange}
                    onBlur={handleFocusChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? (
                              <VisibilityOff
                                color={isFocused ? "primary" : "action"}
                              />
                            ) : (
                              <Visibility
                                color={isFocused ? "primary" : "action"}
                              />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Typography color="#979797">
                    The password to login to your MQTT broker
                  </Typography>
                </Box>
                <Box sx={{ marginTop: "20px" }}>
                  <TextField
                    variant="filled"
                    id="clientId"
                    label="Client ID"
                    sx={{
                      minWidth: 500,
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#F0F2FA",
                      },
                      "& .MuiFilledInput-root:hover": {
                        backgroundColor: "#E8EAF6", // optional: slightly darker shade on hover
                      },
                      "& .MuiFilledInput-root.Mui-focused": {
                        backgroundColor: "#F0F2FA", // maintain the same color when focused
                      },
                    }}
                    required
                    value={formData.clientId}
                    onChange={handleChange}
                  />
                  <Typography color="#979797">
                    It identifies the Home Assistant MQTT API as MQTT client
                  </Typography>
                </Box>
                <Box sx={{ marginTop: "20px" }}>
                  <TextField
                    variant="filled"
                    id="keepAliveTime"
                    label="Keep Alive Time (s)"
                    sx={{
                      minWidth: 500,
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#F0F2FA",
                      },
                      "& .MuiFilledInput-root:hover": {
                        backgroundColor: "#E8EAF6", // optional: slightly darker shade on hover
                      },
                      "& .MuiFilledInput-root.Mui-focused": {
                        backgroundColor: "#F0F2FA", // maintain the same color when focused
                      },
                    }}
                    required
                    value={formData.keepAliveTime}
                    onChange={handleChange}
                  />
                  <Typography color="#979797">Value in seconds</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box sx={{ marginTop: "50px" }}>
            <Box>
              <Typography variant="body1" fontWeight="600" fontSize="22px">
                Use a Client Certificate
              </Typography>
              <Typography color="#979797">
                Enable client certificate and private key to authenticate
                against your MQTT broker
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                }}
              >
                <Box sx={{ marginTop: "20px" }}>
                  <FormControl
                    variant="filled"
                    sx={{
                      minWidth: 500,
                      "& .MuiFilledInput-root": {
                        backgroundColor: "#F0F2FA",
                      },
                      "& .MuiFilledInput-root:hover": {
                        backgroundColor: "#E8EAF6", // optional: slightly darker shade on hover
                      },
                      "& .MuiFilledInput-root.Mui-focused": {
                        backgroundColor: "#F0F2FA", // maintain the same color when focused
                      },
                    }}
                    required
                  >
                    <InputLabel id="certificateValidation-label">
                      Broker certificate validation
                    </InputLabel>
                    <Select
                      labelId="certificateValidation-label"
                      id="certificateValidation"
                      value={formData.certificateValidation}
                      onChange={handleSelectChange}
                    >
                      <MenuItem value="Yes">Yes</MenuItem>
                      <MenuItem value="No">No</MenuItem>
                    </Select>
                  </FormControl>
                  <Typography color="#979797">
                    Select 'Yes' for automatic CA validation
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box sx={{ marginTop: "50px" }}>
            <Box>
              <Typography variant="body1" fontWeight="600" fontSize="22px">
                Ignore broker certificate validation
              </Typography>
              <Typography color="#979797">
                Option to ignore validation of your MQTT broker's certificate
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "30px",
                  flexWrap: "wrap",
                }}
              >
                <Box sx={{ marginTop: "20px" }}>
                  <TextField
                    variant="filled"
                    id="protocol"
                    label="MQTT protocol"
                    sx={{
                      minWidth: 500,
                      '& .MuiFilledInput-root': {
                        backgroundColor: '#F0F2FA',
                      },
                      '& .MuiFilledInput-root:hover': {
                        backgroundColor: '#E8EAF6', // optional: slightly darker shade on hover
                      },
                      '& .MuiFilledInput-root.Mui-focused': {
                        backgroundColor: '#F0F2FA', // maintain the same color when focused
                      },
                    }}
                    required
                    value={formData.protocol}
                    onChange={handleChange}
                  />
                  <Typography color="#979797">
                    The MQTT protocol your broker operates at.
                  </Typography>
                </Box>
                <Box sx={{ marginTop: "20px" }}>
                  <TextField
                    variant="filled"
                    id="transport"
                    label="MQTT transport"
                    sx={{
                      minWidth: 500,
                      '& .MuiFilledInput-root': {
                        backgroundColor: '#F0F2FA',
                      },
                      '& .MuiFilledInput-root:hover': {
                        backgroundColor: '#E8EAF6', // optional: slightly darker shade on hover
                      },
                      '& .MuiFilledInput-root.Mui-focused': {
                        backgroundColor: '#F0F2FA', // maintain the same color when focused
                      },
                    }}
                    required
                    value={formData.transport}
                    onChange={handleChange}
                  />
                  <Typography color="#979797">
                    The transport to be used for the connection to your MQTT
                    broker
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              marginTop: "50px",
              display: "flex",
              gap: "15px",
              alignItems: "flex-start",
            }}
          >
            <Button
              variant="contained"
              sx={{ borderRadius: "15px" }}
              onClick={handleSubmit}
            >
              Update
            </Button>
            <Button
              variant="outlined"
              sx={{ borderRadius: "15px" }}
              onClick={() => navigate("/setting/integration")}
            >
              Cancel
            </Button>
          </Box>
        </ScrollableBox>
      </Box>
    </div>
  );
};

export default MqttConfigure;
