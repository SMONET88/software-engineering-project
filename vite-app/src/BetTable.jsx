import "./App.css";
import { useState, useEffect } from "react";
import sample_data from "./sampleData";
import Tooltip from "@mui/material/Tooltip";

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

  const createUserObj = (betTeam, homeBetInput, awayBetInput) => {
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

    return {
      gameId: game.id,
      BetType: objBetType,
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

  const onClickHandle = (teamName, gameId) => {
    console.log(`xxx ${gameId}`);
    setBetTeam(teamName);

    if (teamName === game.home_team) {
      addProfit(homeProfit);
    } else if (teamName === game.away_team) {
      addProfit(awayProfit);
    }

    setUserObj(createUserObj(teamName, homeBetInput, awayBetInput));
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
    <div className="tables">
      {showH2HTable ? (
        <div key={game.id} className="rounded-div">
          <table>
            <thead>
              <tr>
                <th>{formatTime(game.commence_time)}</th>
                <Tooltip
                  disableFocusListener
                  disableTouchListener
                  title={ttDescription}
                >
                  <th>{betType} Bet</th>
                </Tooltip>
              </tr>
            </thead>
            <tbody>
              {/* Home team row */}
              <tr>
                <td style={{ fontWeight: "bold" }}>{game.home_team}</td>
                <td>
                  <div
                    className="table-data"
                    style={{
                      display: "flex",
                      gap: "8px",
                      alignItems: "center",
                    }}
                  >
                    <input
                      type="text"
                      className="input"
                      value={homeBetInput}
                      onChange={(e) => setHomeBetInput(e.target.value)}
                    />
                    <button
                      className="betButton"
                      onClick={() => onClickHandle(game.home_team, game.id)}
                    >
                      Place
                    </button>
                  </div>
                  <div className="box">{homeProfit}</div>
                </td>
              </tr>

              {/* Away team row */}
              <tr>
                <td style={{ fontWeight: "bold" }}>{game.away_team}</td>
                <td>
                  <div
                    className="table-data"
                    style={{
                      display: "flex",
                      gap: "8px",
                      alignItems: "center",
                    }}
                  >
                    <input
                      type="text"
                      className="input"
                      value={awayBetInput}
                      onChange={(e) => setAwayBetInput(e.target.value)}
                    />
                    <button
                      className="betButton"
                      onClick={() => onClickHandle(game.away_team, game.id)}
                    >
                      Place
                    </button>
                  </div>
                  <div className="box">{awayProfit}</div>
                </td>
              </tr>
              <tr>
                <td>
                  <h2>{`You bet on ${betTeam}`}</h2>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : showTotalTable ? (
        <div key={game.id} className="rounded-div">
          <table>
            <thead>
              <tr>
                <th>{formatTime(game.commence_time)}</th>
                <Tooltip
                  disableFocusListener
                  disableTouchListener
                  title={ttDescription}
                >
                  <th>{betType} Bet</th>
                </Tooltip>
              </tr>
            </thead>
            <td style={{ fontWeight: "bold" }}>{game.home_team}</td>
            <td>Over</td>
            <td>
              <div
                className="table-data"
                style={{
                  display: "flex",
                  gap: "8px",
                  alignItems: "center",
                }}
              >
                <input
                  type="text"
                  className="input"
                  value={homeBetInput}
                  onChange={(e) => setHomeBetInput(e.target.value)}
                />
                <button
                  className="betButton"
                  onClick={() => onClickHandle(game.home_team, game.id)}
                >
                  Place
                </button>
              </div>
              <div className="box">{homeProfit}</div>
            </td>
            <tr>
              <td>vs. </td>
              <td>{game.bookmakers[0].markets[2].outcomes[0].point}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: "bold" }}>{game.away_team}</td>
              <td>Under</td>
              <td>
                <div
                  className="table-data"
                  style={{
                    display: "flex",
                    gap: "8px",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="text"
                    className="input"
                    value={awayBetInput}
                    onChange={(e) => setAwayBetInput(e.target.value)}
                  />
                  <button
                    className="betButton"
                    onClick={() => onClickHandle(game.away_team, game.id)}
                  >
                    Place
                  </button>
                </div>
                <div className="box">{awayProfit}</div>
              </td>
            </tr>
            <tr>
              <td>
                <h2>{`You bet on ${betTeam}`}</h2>
              </td>
            </tr>
          </table>
        </div>
      ) : (
        <table className="rounded-div">
          <thead>
            <tr>
              <th>{formatTime(game.commence_time)}</th>
              <Tooltip
                disableFocusListener
                disableTouchListener
                title={ttDescription}
              >
                <th>{betType} Bet</th>
              </Tooltip>
            </tr>
          </thead>
          <tbody>
            {/* Home team row */}
            <tr>
              <td style={{ fontWeight: "bold" }}>{game.home_team}</td>
              <td>
                <div
                  className="table-data"
                  style={{
                    display: "flex",
                    gap: "8px",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="text"
                    className="input"
                    value={homeBetInput}
                    onChange={(e) => setHomeBetInput(e.target.value)}
                  />
                  <button
                    className="betButton"
                    onClick={() => onClickHandle(game.home_team, game.id)}
                  >
                    Place
                  </button>
                </div>
                <div className="box">{homeProfit}</div>
              </td>
            </tr>
            <tr>
              <td>Line: {oddsDictionary[game.home_team].spreadLine}</td>
            </tr>

            {/* Away team row */}
            <tr>
              <td style={{ fontWeight: "bold" }}>{game.away_team}</td>
              <td>
                <div
                  className="table-data"
                  style={{
                    display: "flex",
                    gap: "8px",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="text"
                    className="input"
                    value={awayBetInput}
                    onChange={(e) => setAwayBetInput(e.target.value)}
                  />
                  <button
                    className="betButton"
                    onClick={() => onClickHandle(game.away_team, game.id)}
                  >
                    Place
                  </button>
                </div>
                <div className="box">{awayProfit}</div>
              </td>
            </tr>
            <tr>
              <td>Line: {oddsDictionary[game.away_team].spreadLine}</td>
            </tr>
            <tr>
              <td>
                <h2>{`You bet on ${betTeam}`}</h2>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BetTable;
