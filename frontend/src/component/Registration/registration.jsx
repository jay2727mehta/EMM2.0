import {
    Box,
    Button,
    Checkbox,
    Divider,
    IconButton,
    InputAdornment,
    Link,
    TextField,
    Typography,
  } from "@mui/material";
  import React, { useState } from "react";
  import VisibilityIcon from "@mui/icons-material/Visibility";
  import Alert from "@mui/material/Alert";
  import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
  import { authorizeUser, registerUser } from "../Services/auth.service";
  import { useNavigate } from "react-router-dom";
  import { useThemeContext } from "../context/themeContext";
  import Brightness7Icon from "@mui/icons-material/Brightness7";
  import Brightness4Icon from "@mui/icons-material/Brightness4";
  import { ReactComponent as Logo } from '../config/svgfiles/PowerOptimus_Logo_WithoutBG.svg'
  import "./register.css";
  
  const Registration = () => {
    const { darkMode, toggleTheme } = useThemeContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [isUser, setIsUser] = useState(true);
    const navigate = useNavigate();
  
    const handleFocusChange = (event) => {
      setIsFocused(event.target === document.activeElement);
    };
  
    const handleTogglePasswordVisibility = () => {
      setShowPassword((prevShowPassword) => !prevShowPassword);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      setShowError(false);
      setErrorMessage("");
    };

    const handleIsUser = () => {
      setIsUser(true);
    };
  
    const handleIsAdmin = () => {
      setIsUser(false);
    };
  
    const handleLogin = async () => {
      try {
        const registerObj = {
            firstName,
            lastName,
            email,
            password,
            role : isUser ? 'USER' : 'ADMIN'
        }
        const resp = await registerUser(registerObj);
        if (resp) {
          console.log(registerObj,'reg');
          navigate("/");
        } else {
          setShowError(true);
          setErrorMessage("Invalid Credentials!!");
          setTimeout(() => {
            setPassword("");
            setShowError(false);
            navigate("/register");
          }, 3000);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    const styles = {
      thinBorder: {
        border: "0.5px solid #E5E7EB",
        boxShadow: "0 4px 12px rgba(149, 19, 230, 0.25)",
        backgroundColor: "rgba(255,255,255, 0.24)",
      },
      thinNBorder: {
        border: "0.5px solid #E5E7EB",
        boxShadow: "0 4px 12px rgba(100, 150, 155, 0.5)",
        backgroundColor: "rgba(255,255,255, 0.24)",
      },
      valid: {
        borderColor: "#09A603",
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#09A603",
        },
      },
      invalid: {
        borderColor: "#F20505",
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#F20505",
        },
      },
    };
  
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
          height: "100vh",
          // border: styles.thinBorder,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "50px",
            justifyContent: "center",
            alignItems: "center",
            padding: "50px",
            width: "75%",
            margin: "auto",
            borderRadius: "20px",
            // border: styles.thinNBorder,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "auto",
              width: "100%",
              borderRadius: "20px",
            }}
          >
            {/* <Box sx={{ margin: "auto" }}>
              <img src="alternative_8724842-removebg-preview.png"></img>
            </Box>
            <Divider orientation="vertical" flexItem /> */}
            <Box
              sx={{
                margin: "auto",
                padding: "45px",
                borderRadius: "20px",
                background: "rgba(255,255,255, 0.24)",
                width: "35%",
                flexWrap: "wrap",
                border: styles.thinBorder,
              }}
            >
              <Logo style={{ margin: 0, padding: 0, display: 'block', width: '100%', height: '79', marginLeft: -15, marginTop: -38, top: 10, position: 'relative' }} />
              <Divider sx={{ marginTop: "20px", marginBottom: "20px" }} />
              <Box
                sx={{ display: "flex", justifyContent: "center", gap: "20px" }}
              >
                <div className="slider-container">
                  <div className="slider">
                    <div
                      className={`slider-button ${isUser ? "left" : "right"}`}
                    />
                    <div className="slider-labels">
                      <Button
                        color={isUser ? "primary" : "inherit"}
                        onClick={handleIsUser}
                        disabled={isUser ? true : false}
                        sx={{
                          "&:hover": {
                            opacity: 1,
                            backgroundColor: "transparent",
                          },
                          "&.Mui-disabled": {
                            opacity: 1, // Maintain the opacity for the selected disabled button
                            color: "#9513e6",
                          },
                        }}
                      >
                        {isUser ? (
                          <Typography fontWeight="normal">User</Typography>
                        ) : (
                          "User"
                        )}
                      </Button>
                      <Button
                        color={!isUser ? "primary" : "inherit"}
                        onClick={handleIsAdmin}
                        disabled={isUser ? false : true}
                        sx={{
                          "&:hover": {
                            opacity: 1,
                            backgroundColor: "transparent",
                          },
                          "&.Mui-disabled": {
                            opacity: 1, // Maintain the opacity for the selected disabled button
                            color: "#9513e6",
                          },
                        }}
                      >
                        {!isUser ? (
                          <Typography fontWeight="normal">Admin</Typography>
                        ) : (
                          "Admin"
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </Box>
              {/* {showError && (
              <Alert
                severity="error"
                sx={{
                  borderRadius: "10px",
                  margin: "auto",
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                {errorMessage}
              </Alert>
            )} */}
              <Typography
                variant="h6"
                fontSize="xx-large"
                align="center"
                gutterBottom
                fontWeight="bold"
                sx={{ marginTop: "25px" }}
              >
                SIGN UP
              </Typography>
              <Divider />
              <form onSubmit={handleSubmit}>
              <TextField
                  id="outlined-basic"
                  type="text"
                  label="FirstName"
                  variant="outlined"
                  fullWidth
                  required
                  margin="normal"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  sx={{
                    marginTop: 4,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "20px",
                    },
                  }}
                />
                <TextField
                  id="outlined-basic"
                  type="text"
                  label="LastName"
                  variant="outlined"
                  fullWidth
                  required
                  margin="normal"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  sx={{
                    marginTop: 4,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "20px",
                    },
                  }}
                />
                <TextField
                  id="outlined-basic"
                  type="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  required
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{
                    marginTop: 4,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "20px",
                    },
                  }}
                />
                <TextField
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  fullWidth
                  required
                  margin="normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "20px",
                    },
                  }}
                  onBlur={handleFocusChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleTogglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityOffIcon
                              color={isFocused ? "primary" : "action"}
                            />
                          ) : (
                            <VisibilityIcon
                              color={isFocused ? "primary" : "action"}
                            />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                  }}
                >
                </Box>
                <Button
                  variant="outlined"
                  color="inherit"
                  fullWidth
                  type="submit"
                  sx={{
                    marginTop: "30px",
                    color: "rgba(121, 15, 240, 0.77)",
                    background:
                      "linear-gradient(90deg, rgba(183,135,238,1) 0%, rgba(149,19,230,1) 100%)",
                    borderRadius: "20px",
                  }}
                  onClick={handleLogin}
                >
                  <Typography color="white" fontWeight="bold">
                    Sign up
                  </Typography>
                </Button>
                <Box textAlign="center" marginTop="20px">
                  <Typography margin="auto">
                    Already Have An Account?{" "}
                    <Link
                      component="button"
                      variant="body1"
                      color="inherit"
                      fontWeight="bold"
                      onClick={() => navigate('/')}
                    >
                      Login
                    </Link>
                  </Typography>
                </Box>
              </form>
            </Box>
          </Box>
        </Box>
      </div>
    );
  };
  
  export default Registration;
  