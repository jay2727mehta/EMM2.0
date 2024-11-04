import {
  Box,
  Button,
  Divider,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useLocation } from "react-router-dom";
import ScrollableBox from "../Scrollbar/scrollbar";

const EditGateway = ({ info, Buttondata, open, onClose }) => {
  const [publishTopic, setPublishTopic] = useState(info.publishTopic);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      sx={{
        "& .MuiPaper-root": {
          borderRadius: "10px",
        },
      }}
      BackdropProps={{
        style: {
          backdropFilter: "blur(8px)",
        },
      }}
    >
      <DialogTitle>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" fontWeight="normal" textAlign="center">
            Edit Gateway
          </Typography>
          <IconButton sx={{ border: "0.5px solid #E5E7EB" }} onClick={onClose}>
            <ClearIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <Divider />
      <ScrollableBox>
        <DialogContent sx={{ overflow: "hidden" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              flexWrap: "wrap",
              gap: "30px",
            }}
          >
            <TextField
              sx={{
                minWidth: 500,
                marginLeft: "auto",
                marginRight: "auto",
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
              margin="normal"
              name="brokerHost"
              label="Broker Host"
              value={info.brokerHost}
              variant="filled"
            />
            <TextField
              sx={{
                minWidth: 500,
                marginLeft: "auto",
                marginRight: "auto",
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
              margin="normal"
              name="port"
              label="Port"
              value={info.port}
              variant="filled"
            />
            <TextField
              sx={{
                minWidth: 500,
                marginLeft: "auto",
                marginRight: "auto",
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
              margin="normal"
              name="clientId"
              label="Client ID"
              value={info.clientId}
              variant="filled"
            />
            <TextField
              sx={{
                minWidth: 500,
                marginLeft: "auto",
                marginRight: "auto",
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
              margin="normal"
              name="userName"
              label="User Name"
              value={info.userName}
              variant="filled"
            />
            <TextField
              sx={{
                minWidth: 500,
                marginLeft: "auto",
                marginRight: "auto",
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
              margin="normal"
              name="subscribeTopic"
              label="Subscribe Topic"
              value={info.subscribeTopic}
              variant="filled"
            />
            <TextField
              sx={{
                minWidth: 500,
                marginLeft: "auto",
                marginRight: "auto",
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
              margin="normal"
              name="publishTopic"
              label="Publish Topic"
              value={publishTopic}
              onChange={(e) => setPublishTopic(e.target.value)}
              variant="filled"
            />
            <TextField
              sx={{
                minWidth: 500,
                marginLeft: "auto",
                marginRight: "auto",
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
              margin="normal"
              name="password"
              label="Password"
              type="password"
              value={info.password}
              variant="filled"
            />
          </Box>
        </DialogContent>
      </ScrollableBox>
      <Divider />
      <DialogActions>
        <Button variant="contained" onClick={onClose} sx={{ margin: "auto" }}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditGateway;
