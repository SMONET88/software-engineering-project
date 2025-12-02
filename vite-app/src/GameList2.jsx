import "./App.css";
import sample_data from "./sampleData";
import BetTable from "./BetTable";
import { useState } from "react";
import { Button, Box } from "@mui/material";

export const GameList2 = ({ addProfit, userId }) => {
  const [betType, setBetType] = useState("Moneyline");

  const formatTime = (time) => {
    const date = new Date(time);
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";
    return `${date.getMonth() + 1}/${date.getDate()}, ${
      hours % 12 || 12
    }:${minutes}${ampm}`;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row", // side-by-side layout
        alignItems: "flex-start",
        width: "100%",
        minHeight: "80vh", // optional: give it height
        gap: 4, // spacing between columns
      }}
    >
      {/* Left column: buttons */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "flex-start",
          flex: "0 0 200px", 
        }}
      >
        <Button
          variant={betType === "Win Bet (moneyline)" ? "contained" : "outlined"}
          onClick={() => setBetType("Win Bet (moneyline)")}
        >
          Win Bet (moneyline)
        </Button>
        <Button
          variant={betType === "Win By (spread)" ? "contained" : "outlined"}
          onClick={() => setBetType("Win By (spread)")}
        >
          Win By (spread)
        </Button>
        <Button
          variant={betType === "Totals (over/under)" ? "contained" : "outlined"}
          onClick={() => setBetType("Totals (over/under)")}
        >
          Totals (over/under)
        </Button>
      </Box>

      {/* Right column: tables */}
      <Box
        sx={{
          display: "flex",
          flex: 1, // take remaining space
          justifyContent: "center", // center horizontally
          alignItems: "flex-start", // align to top
        }}
      >
        {sample_data.map((game) => (
          <BetTable
            key={game.id}
            game={game}
            formatTime={formatTime}
            betType={betType}
            addProfit={addProfit}
            userId={userId}
          />
        ))}
      </Box>
    </Box>
  );
};
