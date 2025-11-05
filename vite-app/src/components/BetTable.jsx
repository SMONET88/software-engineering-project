import "./Bet.css";
import { useState, useEffect } from "react";

const BetTable = ({ game, formatTime, betType, sample_data }) => {
  const [betTeam, setName] = useState("");
  const [disabledGame, setDisabledGame] = useState('');
  const [tableProfit, setTableProfit] = useState(0);
  const [currentBet, setCurrentBet] = useState({ amount: 0, profit: 0 });


  const handleBetChange = (bet) => {
    setCurrentBet(bet);
  };

  const onClick = (teamName, gameId) => {
    setName(teamName);
    setDisabledGame(gameId);
    setTableProfit((prev) => prev + (currentBet.profit || 0));
  };

  useEffect(() => {
    setName("");
    setDisabledGame(true);
    setTableProfit(0);
  }, [betType]);
    const [bet, setBet] = useState(0);

    const teamName = betTeam;

    let oddsDictionary = {};

    sample_data.map((game) => {
      game.bookmakers?.forEach((bookmaker) => {
        const h2h = bookmaker.markets.find((m) => m.key === "h2h");

        const currName0 = h2h.outcomes[0].name;
        const currPrice0 = h2h.outcomes[0].price;

        const currName1 = h2h.outcomes[1].name;
        const currPrice1 = h2h.outcomes[1].price;

        oddsDictionary[currName0] = currPrice0;
        oddsDictionary[currName1] = currPrice1;
      });
    });

    const odds = oddsDictionary[teamName];

    const profitCalculation = () => {
      console.log(`SHOUL DBE CALCULATING!!`);
       console.log(`odds: ${odds}, bet: ${bet}`);
      if (odds === 100) {
        return bet * 2;
      } else if (odds > 0) {
        return ((odds / 100) * bet).toFixed(2);
      } else if (odds < 0) {
        return ((100 / Math.abs(odds)) * bet).toFixed(2);
      }
    };

    useEffect(() => {
      setBet(0);
    }, [betType]);

    return (
      <>
        <div key={game.id} className="rounded-div">
          <table>
            <thead>
              <tr>
                <th>{formatTime(game.commence_time)}</th>
                <th>{betType} Bet</th>
              </tr>
            </thead>
            <tbody>
              {/* Home team row */}
              <tr>
                <td style={{ fontWeight: "bold" }}>{game.home_team}</td>
                <td>
                  <div className="root">
                    <div className="table-data">
                      <input
                        type="text"
                        className="input"
                        value={bet}
                        onChange={(e) => {
                          const newBet = +e.target.value;
                          setBet(newBet);
                        }}
                      />
                      <div className="box">{`${profitCalculation() || 0}`}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <button
                    className="betButton"
                    onClick={() => onClick(game.home_team, game.id)}
                    disabled={disabledGame === game.id}
                  >
                    Place Bet
                  </button>
                </td>
              </tr>

              {/* Away team row */}
              <tr>
                <td style={{ fontWeight: "bold" }}>{game.away_team}</td>
                <td>
                  <div className="root">
                    <div className="table-data">
                      <input
                        type="text"
                        className="input"
                        value={bet}
                        onChange={(e) => {
                          const newBet = +e.target.value;
                          setBet(newBet);
                        }}
                      />
                      <div className="box">{`${profitCalculation() || 0}`}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <button
                    className="betButton"
                    onClick={() => onClick(game.away_team, game.id)}
                    disabled={disabledGame === game.id}
                  >
                    Place Bet
                  </button>
                </td>
              </tr>
              <tr>
              </tr>
               <p>You bet on {betTeam}</p>
            </tbody>
          </table>
        </div>
      </>
    );
};

export default BetTable;
