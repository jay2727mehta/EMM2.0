import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { FaLink } from "react-icons/fa";
import { IoIosLink } from "react-icons/io";
import { FaTabletAlt } from "react-icons/fa";
import { MdOutlineAnalytics } from "react-icons/md";
import { FaRegBell } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlinePoweroff } from "react-icons/ai";
import { AiOutlineTablet } from "react-icons/ai";
import { Link , useNavigate } from "react-router-dom";
import "./sidebar.css";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft({ isOpen,item }) {
  const role = sessionStorage.getItem('role');
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [selectedListItem, setselectedListItem] = React.useState(item || 2);
  const [selectedItem, setSelectedItem] = React.useState(
    "/setting/devices"
  );
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
    isOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    isOpen(false);
  };

  const handleListItemClick = (itemId) => {
    setselectedListItem(itemId);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const isItemSelected = (item) => {
    return selectedItem === item;
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/')
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 1, ...(open && { display: "none" }) }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <Drawer
        sx={{
          width: drawerWidth,
          height: "100%",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "#ECEFF3",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Box></Box>
        <DrawerHeader sx={{ justifyContent: "space-between" }}>
          <Typography
            varient="h6"
            fontWeight="bold"
            fontSize="30px"
            sx={{
              // margin: "auto",
              marginLeft: "20px",
              textAllign: "left",
              marginTop: "30px",
            }}
          >
            Settings
          </Typography>
          {/* <IconButton onClick={handleDrawerClose} sx={{ marginTop : '30px'}}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton> */}
        </DrawerHeader>
        <List
          sx={{
            marginTop: "40px",
            marginLeft: "auto",
            marginRight: "auto",
            height: "100%",
            width : 185
          }}
        >
          {/* <ListItem
            sx={{ width: "200px" }}
            disablePadding
            className={`list-item ${selectedListItem === 1 ? "selected" : ""}`}
            onClick={() => handleListItemClick(1)}
          >
            <ListItemButton
              component={Link}
              to="/setting/integration"
              selected={isItemSelected("/setting/integration")}
              onClick={() => handleItemClick("/setting/integration")}
              sx={{
                "&:hover, &.Mui-selected": {
                  borderRadius: "10px",
                  background: "#ffffff",
                  fontWeight: "bold",
                },
                "&.Mui-disabled": {
                  opacity: 1, // Maintain the opacity for the selected disabled button
                  backgroundColor: "#FFFFFF",
                  borderRadius: "10px", // Light gray background for disabled state
                },
              }}
              disabled={isItemSelected("/setting/integration")}
            >
              <IconButton
                sx={{
                  fontWeight: selectedListItem === 1 ? "bold" : "normal",
                  marginRight: "10px",
                }}
                disabled
              >
                <IoIosLink
                  fontSize={24}
                  className={`list-button ${
                    selectedListItem === 1 ? "selected" : ""
                  }`}
                />
              </IconButton>
              <ListItemText
                primary="Integration"
                primaryTypographyProps={{
                  fontWeight: selectedListItem === 1 ? "700" : "normal",
                }}
              />
            </ListItemButton>
          </ListItem> */}
          <ListItem
            disablePadding
            className={`list-item ${selectedListItem === 2 ? "selected" : ""}`}
            onClick={() => handleListItemClick(2)}
          >
            <ListItemButton
              component={Link}
              to="/setting/devices"
              selected={isItemSelected("/setting/devices")}
              onClick={() => handleItemClick("/setting/devices")}
              sx={{
                "&:hover, &.Mui-selected": {
                  borderRadius: "10px",
                  background: "#ffffff",
                  fontWeight: "bold",
                },
                "&.Mui-disabled": {
                  opacity: 1, // Maintain the opacity for the selected disabled button
                  backgroundColor: "#FFFFFF",
                  borderRadius: "10px", // Light gray background for disabled state
                },
              }}
              disabled={isItemSelected("/setting/devices")}
            >
              <IconButton
                sx={{
                  fontWeight: selectedListItem === 2 ? "bold" : "normal",
                  marginRight: "10px",
                }}
                disabled
              >
                <AiOutlineTablet
                  fontSize={24}
                  className={`list-button ${
                    selectedListItem === 2 ? "selected" : ""
                  }`}
                />
              </IconButton>
              <ListItemText
                primary="デバイス"
                primaryTypographyProps={{
                  fontWeight: selectedListItem === 2 ? "700" : "normal",
                }}
              />
            </ListItemButton>
          </ListItem>
          {/* <ListItem
            disablePadding
            className={`list-item ${selectedListItem === 3 ? "selected" : ""}`}
            onClick={() => handleListItemClick(3)}
          >
            <ListItemButton
              component={Link}
              to="/setting/gadgets"
              selected={isItemSelected("/setting/gadgets")}
              onClick={() => handleItemClick("/setting/gadgets")}
              sx={{
                "&:hover, &.Mui-selected": {
                  borderRadius: "10px",
                  background: "#ffffff",
                  fontWeight: "bold",
                },
                "&.Mui-disabled": {
                  opacity: 1, // Maintain the opacity for the selected disabled button
                  backgroundColor: "#FFFFFF",
                  borderRadius: "10px", // Light gray background for disabled state
                },
              }}
              disabled={isItemSelected("/setting/gadgets")}
            >
              <IconButton
                sx={{
                  fontWeight: selectedListItem === 3 ? "bold" : "normal",
                  marginRight: "10px",
                }}
                disabled
              >
                <MdOutlineAnalytics
                  fontSize={24}
                  className={`list-button ${
                    selectedListItem === 3 ? "selected" : ""
                  }`}
                  style={{
                    fontWeight: `${selectedListItem === 3 ? "bold" : "normal"}`,
                  }}
                />
              </IconButton>
              <ListItemText
                primary="Gadgets"
                primaryTypographyProps={{
                  fontWeight: selectedListItem === 3 ? "700" : "normal",
                }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            className={`list-item ${selectedListItem === 4 ? "selected" : ""}`}
            onClick={() => handleListItemClick(4)}
          >
            <ListItemButton
              component={Link}
              to="/setting/rules"
              selected={isItemSelected("/setting/rules")}
              onClick={() => handleItemClick("/setting/rules")}
              sx={{
                "&:hover, &.Mui-selected": {
                  borderRadius: "10px",
                  background: "#ffffff",
                  fontWeight: "bold",
                },
                "&.Mui-disabled": {
                  opacity: 1, // Maintain the opacity for the selected disabled button
                  backgroundColor: "#FFFFFF",
                  borderRadius: "10px", // Light gray background for disabled state
                },
              }}
              disabled={isItemSelected("/setting/rules")}
            >
              <IconButton
                sx={{
                  fontWeight: selectedListItem === 4 ? "bold" : "normal",
                  marginRight: "10px",
                }}
                disabled
              >
                <FaRegBell
                  fontSize={24}
                  className={`list-button ${
                    selectedListItem === 4 ? "selected" : ""
                  }`}
                />
              </IconButton>
              <ListItemText
                primary="Rules"
                primaryTypographyProps={{
                  fontWeight: selectedListItem === 4 ? "700" : "normal",
                }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            className={`list-item ${selectedListItem === 5 ? "selected" : ""}`}
            onClick={() => handleListItemClick(5)}
          >
            <ListItemButton
              component={Link}
              to="/setting/personal"
              selected={isItemSelected("/setting/personal")}
              onClick={() => handleItemClick("/setting/personal")}
              sx={{
                "&:hover, &.Mui-selected": {
                  borderRadius: "10px",
                  background: "#ffffff",
                  fontWeight: "bold",
                },
                "&.Mui-disabled": {
                  opacity: 1, // Maintain the opacity for the selected disabled button
                  backgroundColor: "#FFFFFF",
                  borderRadius: "10px", // Light gray background for disabled state
                },
              }}
              disabled={isItemSelected("/setting/personal")}
            >
              <IconButton
                sx={{
                  fontWeight: selectedListItem === 5 ? "bold" : "normal",
                  marginRight: "10px",
                }}
                disabled
              >
                <FiUser
                  fontSize={24}
                  className={`list-button ${
                    selectedListItem === 5 ? "selected" : ""
                  }`}
                />
              </IconButton>
              <ListItemText
                primary="Personal"
                primaryTypographyProps={{
                  fontWeight: selectedListItem === 5 ? "700" : "normal",
                }}
              />
            </ListItemButton> 
          </ListItem> */}
          {role === 'ADMIN' ?   <ListItem
            disablePadding
            className={`list-item ${selectedListItem === 6 ? "selected" : ""}`}
            onClick={() => handleListItemClick(6)}
          >
            <ListItemButton
              component={Link}
              to="/setting/security"
              selected={isItemSelected("/setting/security")}
              onClick={() => handleItemClick("/setting/security")}
              sx={{
                "&:hover, &.Mui-selected": {
                  borderRadius: "10px",
                  background: "#ffffff",
                  fontWeight: "bold",
                },
                "&.Mui-disabled": {
                  opacity: 1, // Maintain the opacity for the selected disabled button
                  backgroundColor: "#FFFFFF",
                  borderRadius: "10px", // Light gray background for disabled state
                },
              }}
              disabled={isItemSelected("/security")}
            >
              <IconButton
                sx={{
                  fontWeight: selectedListItem === 6 ? "bold" : "normal",
                  marginRight: "10px",
                }}
                disabled
              >
                <IoSettingsOutline
                  fontSize={24}
                  className={`list-button ${
                    selectedListItem === 6 ? "selected" : ""
                  }`}
                />
              </IconButton>
              <ListItemText
                primary="保障"
                primaryTypographyProps={{
                  fontWeight: selectedListItem === 6 ? "700" : "normal",
                }}
              />
            </ListItemButton>
          </ListItem> : null}
        
          <ListItem
            disablePadding
            className={`list-item ${selectedListItem === 7 ? "selected" : ""}`}
            onClick={() => handleListItemClick(7)}
            sx={{ position: "absolute", bottom: 20 }}
          >
            <ListItemButton
              component={Link}
              to="/"
              selected={isItemSelected("/")}
              onClick={handleLogout}
              sx={{
                // position : 'absolute', bottom : 20,
                "&:hover, &.Mui-selected": {
                  borderRadius: "10px",
                  background: "#ffffff",
                  fontWeight: "bold",
                  width: "200px",
                },
                "&.Mui-disabled": {
                  opacity: 1, // Maintain the opacity for the selected disabled button
                  backgroundColor: "#FFFFFF",
                  borderRadius: "10px", // Light gray background for disabled state
                },
              }}
              disabled={selectedListItem === 7}
            >
              <IconButton
                sx={{
                  fontWeight: selectedListItem === 7 ? "bold" : "normal",
                  marginRight: "10px",
                }}
                disabled
              >
                <AiOutlinePoweroff
                  fontSize={24}
                  className={`list-button ${
                    selectedListItem === 7 ? "selected" : ""
                  }`}
                />
              </IconButton>
              <ListItemText
                primary="ログアウト"
                primaryTypographyProps={{
                  fontWeight: selectedListItem === 7 ? "700" : "normal",
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}
