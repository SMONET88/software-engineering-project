import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import {
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  TextField,
  Button,
  Typography,
} from "@mui/material";

const BetTable = ({ game, formatTime, betType, addProfit, userId }) => {
  const [betTeam, setBetTeam] = useState("");
  const [showTotalTable, setShowTotalTable] = useState(false);
  const [showH2HTable, setShowH2HTable] = useState(false);
  const [homeBetInput, setHomeBetInput] = useState("");
  const [awayBetInput, setAwayBetInput] = useState("");
  const [tableOdds, setTableOdds] = useState("");
  const [ttDescription, setTTDescription] = useState("");

  // 🧩 Build odds dictionary for this single game safely
  let oddsDictionary = {};

  if (game?.bookmakers?.length > 0) {
    const homeTeam = game.home_team;
    const awayTeam = game.away_team;

    game.bookmakers.forEach((bookmaker) => {
      const h2h = bookmaker.markets.find((m) => m.key === "h2h");
      const spread = bookmaker.markets.find((m) => m.key === "spreads");
      const totals = bookmaker.markets.find((m) => m.key === "totals");

      const totalsOver = totals?.outcomes?.find((n) => n.name === "Over");
      const totalsUnder = totals?.outcomes?.find((n) => n.name === "Under");

      oddsDictionary[homeTeam] = {
        h2hOdds: h2h?.outcomes?.[0]?.price ?? 0,
        spreadOdds: spread?.outcomes?.[0]?.price ?? 0,
        spreadLine: spread?.outcomes?.[0]?.point ?? 0,
        totalOddsOver: totalsOver?.price ?? 0,
        totalLineOver: totalsOver?.point ?? 0,
        totalOddsUnder: totalsUnder?.price ?? 0,
        totalLineUnder: totalsUnder?.point ?? 0,
      };

      oddsDictionary[awayTeam] = {
        h2hOdds: h2h?.outcomes?.[1]?.price ?? 0,
        spreadOdds: spread?.outcomes?.[1]?.price ?? 0,
        spreadLine: spread?.outcomes?.[1]?.point ?? 0,
        totalOddsOver: totalsOver?.price ?? 0,
        totalLineOver: totalsOver?.point ?? 0,
        totalOddsUnder: totalsUnder?.price ?? 0,
        totalLineUnder: totalsUnder?.point ?? 0,
      };
    });
  }

  const profitCalculation = (betInput, odds) => {
    const bet = Number(betInput);
    if (typeof bet !== "number" || isNaN(bet)) return 0;
    if (odds === 100) return Number(bet * 2);
    if (odds > 0) return Number(((odds / 100) * bet).toFixed(2));
    if (odds < 0) return Number(((100 / Math.abs(odds)) * bet).toFixed(2));
    return 0;
  };

  const createBetObject = (betTeam, homeBetInput, awayBetInput) => {
    let lineUpdated = "";
    let isOver = false;
    let objBetType = "";

    if (betType === "Win Bet (moneyline)") {
      objBetType = "H2H";
      lineUpdated = null;
      isOver = null;
    } else if (betType === "Totals (over/under)") {
      objBetType = "TOTAL";
      lineUpdated = oddsDictionary[game.away_team]?.totalLineOver ?? null;
      isOver = betTeam === game.home_team;
    } else if (betType === "Win By (spread)") {
      objBetType = "SPREAD";
      lineUpdated = oddsDictionary[betTeam]?.spreadLine ?? null;
      isOver = null;
    }

    return {
      user_id: userId,
      game_id: game.id,
      type: objBetType,
      team: betTeam,
      odds:
        betTeam === game.home_team
          ? oddsDictionary[game.home_team]?.[tableOdds] ?? 0
          : oddsDictionary[game.away_team]?.[tableOdds] ?? 0,
      line: lineUpdated,
      is_over: isOver,
      amount: Number(
        betTeam === game.home_team ? homeBetInput : awayBetInput
      ),
      status: "PENDING",
    };
  };

  const onClickHandle = async (teamName) => {
    setBetTeam(teamName);

    const betAmount = Number(
      teamName === game.home_team ? homeBetInput : awayBetInput
    );
    if (!betAmount || betAmount <= 0) {
      alert("Please enter a valid bet amount!");
      return;
    }

    const canPlaceBet = addProfit(betAmount);
    if (!canPlaceBet) return;

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const betObject = createBetObject(teamName, homeBetInput, awayBetInput);
      console.log("Placing bet:", betObject);

      const { error: betError } = await supabase
        .from("bets")
        .insert([betObject]);

      if (betError) throw betError;

      const { error: transactionError } = await supabase
        .from("transactions")
        .insert([
          {
            user_id: userId,
            amount_changed: betAmount,
            transaction_type: "bet_placed",
          },
        ]);

      if (transactionError) throw transactionError;

      alert(`Bet placed successfully on ${teamName}!`);
      setHomeBetInput("");
      setAwayBetInput("");
    } catch (error) {
      console.error("Error placing bet:", error);
      alert("Failed to place bet: " + error.message);
    }
  };

  useEffect(() => {
    setBetTeam("");

    if (betType === "Totals (over/under)") {
      setShowTotalTable(true);
      setShowH2HTable(false);
    } else if (betType === "Win Bet (moneyline)") {
      setShowH2HTable(true);
      setShowTotalTable(false);
    } else {
      setShowTotalTable(false);
      setShowH2HTable(false);
    }

    if (betType.includes("moneyline")) {
      setTableOdds("h2hOdds");
      setTTDescription(
        "A moneyline bet is simply picking which team will win the game."
      );
    } else if (betType.includes("spread")) {
      setTableOdds("spreadOdds");
      setTTDescription(
        "A spread bet means betting on a team to win by more than or stay within a set point margin."
      );
    } else if (betType.includes("over/under")) {
      setTableOdds("totalOddsOver");
      setTTDescription(
        "An over/under bet is choosing whether the total combined score will be higher or lower than a set number."
      );
    }
  }, [betType]);

  const homeProfit = profitCalculation(
    Number(homeBetInput),
    oddsDictionary[game.home_team]?.[tableOdds] ?? 0
  );
  const awayProfit = profitCalculation(
    Number(awayBetInput),
    oddsDictionary[game.away_team]?.[tableOdds] ?? 0
  );

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        padding: 2,
      }}
    >
      <Box key={game.id} sx={{ borderRadius: 2, p: 2, boxShadow: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{formatTime(game.commence_time)}</TableCell>
              <TableCell>
                <Tooltip
                  disableFocusListener
                  disableTouchListener
                  title={ttDescription}
                >
                  <Typography>{betType} Bet</Typography>
                </Tooltip>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Home Team */}
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>
                {game.home_team}
              </TableCell>
              <TableCell>
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <TextField
                    size="small"
                    value={homeBetInput}
                    onChange={(e) => setHomeBetInput(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    onClick={() => onClickHandle(game.home_team)}
                  >
                    Place
                  </Button>
                </Box>
                <Box sx={{ mt: 1 }}>Profit: {homeProfit}</Box>
              </TableCell>
            </TableRow>

            {/* Away Team */}
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>
                {game.away_team}
              </TableCell>
              <TableCell>
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <TextField
                    size="small"
                    value={awayBetInput}
                    onChange={(e) => setAwayBetInput(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    onClick={() => onClickHandle(game.away_team)}
                  >
                    Place
                  </Button>
                </Box>
                <Box sx={{ mt: 1 }}>Profit: {awayProfit}</Box>
              </TableCell>
            </TableRow>

            {/* Spread / Total Info (if available) */}
            {betType.includes("spread") && (
              <>
                <TableRow>
                  <TableCell>
                    Line:{" "}
                    {oddsDictionary[game.home_team]?.spreadLine ?? "N/A"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    Line:{" "}
                    {oddsDictionary[game.away_team]?.spreadLine ?? "N/A"}
                  </TableCell>
                </TableRow>
              </>
            )}

            {betType.includes("over/under") && (
              <TableRow>
                <TableCell>
                  Total:{" "}
                  {game.bookmakers?.[0]?.markets?.find(
                    (m) => m.key === "totals"
                  )?.outcomes?.[0]?.point ?? "N/A"}
                </TableCell>
              </TableRow>
            )}

            <TableRow>
              <TableCell colSpan={2}>
                <Typography variant="h6">{`You bet on ${betTeam || "..."}`}</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default BetTable;
