import { useState, useEffect } from "react";
import sample_data from "./sampleData";
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
import { supabase } from './database/Login';

const BetTable = ({ game, formatTime, betType, addProfit }) => {
  const [betTeam, setBetTeam] = useState("");
  const [showTotalTable, setShowTotalTable] = useState(false);
  const [showH2HTable, setShowH2HTable] = useState(false);
  const [homeBetInput, setHomeBetInput] = useState("");
  const [awayBetInput, setAwayBetInput] = useState("");
  const [tableOdds, setTableOdds] = useState("");
  const [userObj, setUserObj] = useState({});
  const [ttDescription, setTTDescription] = useState("");

  let oddsDictionary = {};

  sample_data.forEach((game) => {
    const homeTeam = game.home_team;
    const awayTeam = game.away_team;

    game.bookmakers?.forEach((bookmaker) => {
      const h2h = bookmaker.markets.find((m) => m.key === "h2h");
      const spread = bookmaker.markets.find((m) => m.key === "spreads");
      const totals = bookmaker.markets.find((m) => m.key === "totals");

      const totalsOver = totals?.outcomes.find((n) => n.name === "Over");
      const totalsUnder = totals?.outcomes.find((n) => n.name === "Under");

      // Home team odds
      oddsDictionary[homeTeam] = {
        h2hOdds: h2h?.outcomes[0]?.price,
        h2hLine: null,

        spreadOdds: spread?.outcomes[0]?.price,
        spreadLine: spread?.outcomes[0]?.point,

        totalOddsOver: totalsOver.price,
        totalLineOver: totalsOver.point,

        totalOddsUnder: totalsUnder.price,
        totalLineUnder: totalsUnder.point,
      };

      // Away team odds
      oddsDictionary[awayTeam] = {
        h2hOdds: h2h?.outcomes[1]?.price,
        h2hLine: null,

        spreadOdds: spread?.outcomes[1]?.price,
        spreadLine: spread?.outcomes[1]?.point,

        totalOddsOver: totalsOver.price,
        totalLineOver: totalsOver.point,

        totalOddsUnder: totalsUnder.price,
        totalLineUnder: totalsUnder.point,
      };
    });
  });

  const profitCalculation = (betInput, odds) => {
    console.log(`team: ${betTeam}, odds: ${odds}`);
    const bet = Number(betInput);
    if (typeof bet !== "number" || isNaN(bet)) {
      return 0;
    } else if (odds === 100) {
      return Number(bet * 2);
    } else if (odds > 0) {
      return Number(((odds / 100) * bet).toFixed(2));
    } else if (odds < 0) {
      return Number(((100 / Math.abs(odds)) * bet).toFixed(2));
    }
  };

  const createUserObj = async (betTeam, homeBetInput, awayBetInput) => {
    let lineUpdated = "";
    let isOver = false;
    let objBetType = "";
    if (betType === "Win Bet (moneyline)") {
      objBetType = "H2H";
      lineUpdated = null;
      isOver = null;
    } else if (betType === "Totals (over/under)") {
      objBetType = "TOTAL";
      lineUpdated = oddsDictionary[game.away_team].totalLineOver;
      isOver = betTeam === game.home_team ? true : false;
    } else if (betType === "Win By (spread)" && betTeam === game.home_team) {
      objBetType = "SPREAD";
      lineUpdated = oddsDictionary[game.home_team].spreadLine;
      isOver = null;
    } else if (betType === "Win By (spread)" && betTeam === game.away_team) {
      objBetType = "SPREAD";
      lineUpdated = oddsDictionary[game.away_team].spreadLine;
      isOver = null;
    }

    const { data: { session } } = await supabase.auth.getSession();
    const userId = session.user.id;
    console.log(session.user.id);


    return {
      gameId: game.id,
      userId: userId,
      type: objBetType,
      team: betTeam,
      odds:
        betTeam === game.home_team
          ? oddsDictionary[game.home_team][tableOdds]
          : oddsDictionary[game.away_team][tableOdds],
      line: lineUpdated,
      isOver: isOver,
      amount: betTeam === game.home_team ? homeBetInput : awayBetInput,
    };
  };

  const onClickHandle = async (teamName, gameId) => {
    console.log(`xxx ${gameId}`);
    setBetTeam(teamName);

    if (teamName === game.home_team) {
      addProfit(homeProfit);
    } else if (teamName === game.away_team) {
      addProfit(awayProfit);
    }

    const objForBackend = await createUserObj(teamName, homeBetInput, awayBetInput);
    console.log(`USER OBJ XXXXXXXXXXXX: ${JSON.stringify(objForBackend)}`);

    const response = await fetch(`http://localhost:8080/submit-bet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(objForBackend),
    });

    if (!response.ok) {
      throw new Error("Failed to place bet");
    }
  };

  useEffect(() => {
    setBetTeam("");
    if (betType === "Totals (over/under)") {
      setShowTotalTable(true);
    } else if (betType === "Win Bet (moneyline)") {
      setShowH2HTable(true);
    } else {
      setShowTotalTable(false);
      setShowH2HTable(false);
    }

    if (betType.includes("moneyline")) {
      setTableOdds("h2hOdds");
      setTTDescription(
        "A moneyline bet is simply picking which team will win the game.",
      );
    } else if (betType.includes("spread")) {
      setTableOdds("spreadOdds");
      setTTDescription(
        "A spread bet means betting on a team to win by more than or stay within a set point margin.",
      );
    } else if (betType.includes("over/under")) {
      setTableOdds("totalOddsOver");
      setTTDescription(
        "An over/under bet is choosing whether the total combined score will be higher or lower than a set number.",
      );
    }
  }, [betType]);

  const homeProfit = profitCalculation(
    Number(homeBetInput),
    oddsDictionary[game.home_team][tableOdds],
  );
  const awayProfit = profitCalculation(
    Number(awayBetInput),
    oddsDictionary[game.away_team][tableOdds],
  );

  console.log(`user object: ${JSON.stringify(userObj)}`);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      {showH2HTable ? (
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
              {/* Home team row */}
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
                      onClick={() => onClickHandle(game.home_team, game.id)}
                    >
                      Place
                    </Button>
                  </Box>
                  <Box sx={{ mt: 1 }}>{homeProfit}</Box>
                </TableCell>
              </TableRow>

              {/* Away team row */}
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
                      onClick={() => onClickHandle(game.away_team, game.id)}
                    >
                      Place
                    </Button>
                  </Box>
                  <Box sx={{ mt: 1 }}>{awayProfit}</Box>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell colSpan={2}>
                  <Typography variant="h6">{`You bet on ${betTeam}`}</Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      ) : showTotalTable ? (
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
              {/* Home team row */}
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
                      onClick={() => onClickHandle(game.home_team, game.id)}
                    >
                      Place
                    </Button>
                  </Box>
                  <Box sx={{ mt: 1 }}>{homeProfit}</Box>
                </TableCell>
              </TableRow>
              <TableRow>
                {" "}
                <TableCell>vs. </TableCell>
                <TableCell>
                  {game.bookmakers[0].markets[2].outcomes[0].point}
                </TableCell>
              </TableRow>

              {/* Away team row */}
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
                      onClick={() => onClickHandle(game.away_team, game.id)}
                    >
                      Place
                    </Button>
                  </Box>
                  <Box sx={{ mt: 1 }}>{awayProfit}</Box>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell colSpan={2}>
                  <Typography variant="h6">{`You bet on ${betTeam}`}</Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      ) : (
        // And again for the fallback branch
        <Box sx={{ borderRadius: 2, p: 2, boxShadow: 2 }}>
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
              {/* Home team row */}
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
                      onClick={() => onClickHandle(game.home_team, game.id)}
                    >
                      Place
                    </Button>
                  </Box>
                  <Box sx={{ mt: 1 }}>{homeProfit}</Box>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  Line: {oddsDictionary[game.home_team].spreadLine}
                </TableCell>
              </TableRow>

              {/* Away team row */}
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
                      onClick={() => onClickHandle(game.away_team, game.id)}
                    >
                      Place
                    </Button>
                  </Box>
                  <Box sx={{ mt: 1 }}>{awayProfit}</Box>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  Line: {oddsDictionary[game.away_team].spreadLine}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell colSpan={2}>
                  <Typography variant="h6">{`You bet on ${betTeam}`}</Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      )}
    </Box>
  );
};

export default BetTable;
