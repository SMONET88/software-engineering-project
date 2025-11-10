import "./App.css";
import CalculateBet from "./CalculateBet";
import { useState, useEffect } from "react";
import HandleBet from "./HandleBet";

const BetTable = ({ game, formatTime, betType }) => {
  const [betTeam, setName] = useState("");
  const [disabledGame, setDisabledGame] = useState(game.id);
  const [showTotalTable, setShowTotalTable] = useState(false);



  const onClick = (teamName) => {
    setName(teamName);
    setDisabledGame(game.id);
  };

  useEffect(() => {
    setName('');
    setDisabledGame(true);

    if (betType === "Totals (over/under)") {
      setShowTotalTable(true);
    } else {
      setShowTotalTable(false);
    }
  }, [betType]);

  return (
    <>

      {!showTotalTable ? (

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
                  <HandleBet game={game} betType={betType} isHome={true} />
                </td>

              </tr>

              {/* Away team row */}
              <tr>
                <td style={{ fontWeight: "bold" }}>{game.away_team}</td>
                <td>
                  <HandleBet game={game} betType={betType} isHome={false} />
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

      ) :
        <div key={game.id} className="rounded-div">
          <table>
            <thead>
              <tr>
                <td>{game.home_team}</td>
                <td>Over</td>
                <td>{<HandleBet game={game} betType={betType} isHome={true} />}</td>
              </tr>
              <tr>
                <td>vs. </td>
                <td>{game.bookmakers[0].markets[2].outcomes[0].point}</td>


              </tr>
              <tr>
                <td>{game.away_team}</td>
                <td>Under</td>
                <td>{<HandleBet game={game} betType={betType} isHome={false} />}</td>


              </tr>



            </thead>



          </table>
        </div>




      }
    </>
  );
};





export default BetTable;
