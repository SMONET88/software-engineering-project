import { useEffect, useState } from "react";
import { GameList2 } from "./GameList2";
import sample_data from "./sampleData";
import { Box, Typography, CircularProgress } from "@mui/material";
import { supabase } from "./supabaseClient";


const MainPage = () => {
  const [money, setMoney] = useState(0); 
  const [totalProfit, setTotalProfit] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

 const addProfit = (betAmount) => {
  if (money - betAmount < 0) {
    alert("You don't have enough money!");
    return false;  
  } else {
    const newBalance = money - betAmount;
    updateBalance(newBalance);  
    setTotalProfit((prev) => prev + betAmount);
    return true; 
  }
};
  useEffect(() => {
  const fetchUserBalance = async () => {
    try {
      console.log("🔍 Starting to fetch user balance...");  // ADD
      
      const { data: { user } } = await supabase.auth.getUser();
      console.log("👤 Current user:", user);  // ADD
      
      if (!user) {
        console.error("❌ No user found");
        return;
      }
      
      setUserId(user.id);
      console.log("✅ User ID set:", user.id);  // ADD

      const { data, error } = await supabase
        .from('users')
        .select('balance')
        .eq('id', user.id)
        .single();

      console.log("💰 Balance data from Supabase:", data);  // ADD
      console.log("⚠️ Any error?", error);  // ADD
      
      if (error) throw error;
      
      setMoney(data.balance);
      console.log("✅ Balance set to:", data.balance);  // ADD
    } catch (error) {
      console.error("❌ Error fetching balance:", error);
    } finally {
      setLoading(false);
      console.log("✅ Loading complete");  // ADD
    }
  };

  fetchUserBalance();
}, []);

const updateBalance = async (newBalance) => {
  try {
    const { error } = await supabase
      .from('users')                    // update the users table
      .update({ balance: newBalance })  
      .eq('id', userId);                

    if (error) throw error;
    setMoney(newBalance);  // also update the UI
  } catch (error) {
    console.error("Error updating balance:", error);
  }
};

if (loading) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <CircularProgress />
    </Box>
  );
}

  return (
    <>
      {/* Header */}
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Typography variant="h1" sx={{ fontSize: "2.5rem", fontWeight: "bold" }}>
          Scurry Betting
        </Typography>
        <Typography variant="subtitle1">Nut your mommas betting app.</Typography>
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
        <GameList2 games={sample_data} addProfit={addProfit} userId={userId}/>
      </Box>
    </>
  );
};

export default MainPage;
