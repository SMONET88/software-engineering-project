import "./App.css";
import sample_data from "./sampleData";
import BetTable from "./BetTable";
import { useState} from "react";

export const GameList2 = () => {
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
    <>
      {sample_data.map((game) => (
        <BetTable key={game.id} game={game} formatTime={formatTime} betType={betType} />
      ))}

      <div className="bet-type-buttons">
        <button onClick={() => setBetType("Win Bet (moneyline)")}>Win Bet (moneyline)</button>
        <button onClick={() => setBetType("Win By (spread)")}>Win By (spread)</button>
        <button onClick={() => setBetType("Totals (over/under)")}>Totals (over/under)</button>

        {/* //ADD TOOLTIPS */}
      </div>

    </>
  )


};
