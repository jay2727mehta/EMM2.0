import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Button,
} from "@mui/material";
import gadgets from "./graphscomponent/index"; // Check the path to gadgettype.js

const GadgetDialog = ({
  open,
  handleClose,
  selectedGadget,
  setSelectedGadget,
  handleAddToDashboard,
}) => {
  return (
    <Dialog open={open} onClose={handleClose} >
      <DialogTitle>Select a Gadget</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {gadgets.map((gadget, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Paper
                elevation={3}
                onClick={() => setSelectedGadget(gadget)}
                style={{
                  padding: 20,
                  cursor: "pointer",
                  backgroundColor:
                    selectedGadget === gadget ? "#f0f0f0" : "white",
                }}
              >
                {gadget.name}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleAddToDashboard}
          color="primary"
          disabled={!selectedGadget}
        >
          Add to Dashboard
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GadgetDialog;
