import { Button } from "@mui/material";
import React, { useState } from "react";
import './sliding.css';

const SlidingButton = () => {
  const [isUser, setIsUser] = useState(true);

  const handleIsUser = () => {
    setIsUser(true);
  };

  const handleIsAdmin = () => {
    setIsUser(false);
  };

  return (
    <div className="slider-container">
      <div className="slider">
        <div className={`slider-button ${isUser ? "left" : "right"}`} />
        <div className="slider-labels">
          <Button
            color="inherit"
            onClick={handleIsUser}
            disabled={isUser}
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
            Gateway
          </Button>
          <Button
            color="inherit"
            onClick={handleIsAdmin}
            disabled={!isUser}
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
            Node
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SlidingButton;
