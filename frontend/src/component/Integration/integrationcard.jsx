import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import backgroundImage from "./cardbg.png";

function IntegrationCard({ data, handleCardNavigate }) {
  const styles = {
    thinBorder: {
      border: "0.5px solid #E5E7EB",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.05)",
      backgroundColor: "transparent",
    },
  };

  return (
    <div>
      <Card
        sx={{
          width: "350px",
          // height: "200px",
          cursor: "pointer",
          borderRadius: "10px",
          backgroundImage: `url(${backgroundImage})`, // Apply background image
          backgroundSize: "cover", // Adjust background size as needed
          backgroundPosition: "center", // Center the background image
          color: "#FFFFFF",
          "&:hover": {
            opacity: 1,
            boxShadow: "0 4px 12px rgba(0, 0, 74, 0.35)",
          },
        }}
        onClick={() => handleCardNavigate(data.header)}
      >
        <CardContent
          sx={{
            padding: "30px",
            display: "flex",
            flexDirection: "column",
            gap: "50px",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "#FFFFFF",
              fontWeight: "bold",
              fontSize: "30px",
              textAlign: "left",
            }}
          >
            {data.header}
          </Typography>
          <Button
            variant="contained"
            sx={{
              background: "transparent",
              color: "#FFFFFF",
              width: "60%",
              border: styles.thinBorder,
            }}
          >
            Re-Configure
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default IntegrationCard;
