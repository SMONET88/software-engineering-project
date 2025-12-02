import { useState } from "react";
import { GameList2 } from "./GameList2";
import sample_data from "./sampleData";
import { Box, Typography } from "@mui/material";
import Login, { supabase } from "./database/Login";

function App() {
  const [money, setMoney] = useState(100);
  const [totalProfit, setTotalProfit] = useState(0);
  //const [isLoggedIn, setIsLoggedIn] = useState(false);
  //

  const addProfit = (newProfitAddition) => {
    if (money - newProfitAddition < 0) {
      alert("You don't have enough money!");
    } else {
      setTotalProfit((prev) => prev + newProfitAddition);
      setMoney(money - newProfitAddition);
    }
  };




  return (
    <>
      <Login />

      {/* Header */}
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Typography
          variant="h1"
          sx={{ fontSize: "2.5rem", fontWeight: "bold" }}
        >
          Scurry Betting
        </Typography>
        <Typography variant="subtitle1">
          Nut your mommas betting app.
        </Typography>
      </Box>

      {/* Profit summary */}
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          {money.toFixed(2)} ACORNS
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          Total Profit: {totalProfit.toFixed(2)}
        </Typography>
      </Box>

      {/* Tables */}
      <Box>
        <GameList2 games={sample_data} addProfit={addProfit} />
      </Box>
    </>
  );
}

export default App;
