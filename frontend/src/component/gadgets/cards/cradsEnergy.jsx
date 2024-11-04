// src/components/InitialCards.js
import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Button,
  Typography,
  Box,
  useScrollTrigger,
} from "@mui/material";
import cards from "./cardconfig";

const InitialCards = ({ onAdd, typeGraph }) => {
  const [typesCard, setTypecard] = useState([]);

  const filterCards = () => {

    if (typeGraph === "alltypes") {
      setTypecard(cards);
      return;
    }
    const cardData = cards.filter((item) => item.type === typeGraph);
    setTypecard(cardData);
    return cardData;
  };

  const handleAddClick = (card) => {
    onAdd(card);
  };

  const styles = {
    thinBorder: {
      border: "0.5px solid #E5E7EB",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
      backgroundColor: "white",
    },
    thinBorderN: {
      border: "0.5px solid #E5E7EB",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
      backgroundColor: "#FFFFFF",
    },
  };

  useEffect(() => {
    filterCards();
  }, [typeGraph]);

  return (
    <Grid
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignContent: "flex-start",
        gap: "30px",
      }}
    >
      {typesCard.map((card, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Box
            border={styles.thinBorderN}
            style={{
              padding: 20,
              borderRadius: "20px",
              height: "450px",
              width: "450px",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              margin: "auto",
              gap: "10px",
            }}
          >
            <Typography variant="h6" fontWeight="bold" textAlign="center">
              {card.title}
            </Typography>
            <Box>
              <Typography
                variant="body1"
                textAlign="center"
                sx={{
                  flexShrink: 1,
                  whiteSpace: "normal",
                  wordWrap: "break-word",
                }}
              >
                {card.description}
              </Typography>
            </Box>
            <Box sx={{
              width: 'auto',
              height: '250px',
              padding: 1,
              margin: 'auto'
            }}>
              <img
                src={card.image}
                alt={card.title}
                width="100%"
                height="100%"
                style={{
                  //maxWidth: "300px",
                  //maxHeight: "250px",
                  //height: "auto",
                  // margin: "auto",
                  //  borderRadius: "15px",
                }}
              />
            </Box>
            <Box display="flex" justifyContent="flex-end" marginTop={2}>
              <Button
                variant="contained"
                sx={{ bgcolor: "#446FF2" }}
                onClick={() => handleAddClick(card)}
              >
                Add
              </Button>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default InitialCards;
