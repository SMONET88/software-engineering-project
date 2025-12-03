import "./App.css";
import BetTable from "./BetTable";
import { useState, useEffect } from "react";
import { Button, Box } from "@mui/material";
import { VerifyBet } from "./VerifyBet";

export const GameList2 = ({ addProfit, userId }) => {
  const [betType, setBetType] = useState("Moneyline");
  const [verifyButton, setShowVerifyButton] = useState(false);
  const [sample_data, setSampleData] = useState([]);

  const formatTime = (time) => {
    const date = new Date(time);
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";
    return `${date.getMonth() + 1}/${date.getDate()}, ${
      hours % 12 || 12
    }:${minutes}${ampm}`;
  };

  const handleVerifyBet = () => {
    <VerifyBet />;
    console.log("Bet verified");
  };

  useEffect(() => {
    const checkDate = async () => {
      const today = new Date();
      const weekday = 2; //today.getDay();
      if (weekday === 2) {
        setShowVerifyButton(true);
        console.log("Today is Tuesday");
      } else {
        setShowVerifyButton(false);
      }
    };
    checkDate();
  }, []);

  useEffect(() => {
  fetch("http://localhost:8080/bets")
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then((data) => {
      // Convert backend snake_case to frontend camelCase
      const normalized = data.map((game) => ({
        ...game,
        commenceTime: game.commence_time,
        homeTeam: game.home_team,
        awayTeam: game.away_team,
      }));
      setSampleData(normalized);
      console.log("Fetched & normalized data:", normalized);
    })
    .catch((error) => console.error("Fetch error:", error));
}, []);


  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center", 
        justifyContent: "center", 
        minHeight: "100vh", 
        gap: 4, 
        px: 2, 
      }}
    >
      {/* Left column: buttons */}
      <Box
        sx={{
           display: "flex",
           flexDirection: "column",
           gap: 2,
           position: "absolute", 
           left: 32,
           top: "50%", // Position at 50% from top
           transform: "translateY(-50%)", // Shift up by half its own height
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
        {verifyButton && (
          <Button variant={"contained"} onClick={() => handleVerifyBet()}>
            Verify
          </Button>
        )}
      </Box>

      {/* Right column: tables */}
      <Box>
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
