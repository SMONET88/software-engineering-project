import "./App.css";
import CalculateBet from "./CalculateBet";
import { useState, useEffect } from "react";

const BetTable = ({ game, formatTime, betType }) => {
  const [betTeam, setName] = useState("");
  const [disabledGame, setDisabledGame] = useState(game.id);

  
  const onClick = (teamName) => {
    setName(teamName);
    setDisabledGame(game.id);
  };

  useEffect(() => {
    setName('');
    setDisabledGame(true);
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
                <CalculateBet name={game.home_team} betType={betType} />
              </td>
              <td>
                <button
                  className="betButton"
                  onClick={() => onClick(game.home_team, game.id)}
                  disabled={disabledGame === game.id}
                >Place</button>
              </td>
            </tr>

            {/* Away team row */}
            <tr>
              <td style={{ fontWeight: "bold" }}>{game.away_team}</td>
              <td>
                <CalculateBet name={game.away_team} betType={betType} />
              </td>
              <td>
                <button
                  className="betButton"
                  onClick={() => onClick(game.away_team, game.id)}
                  disabled={disabledGame === game.id}
                >Place</button>
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
    </>
  );
};





export default BetTable;
