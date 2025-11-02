import { useState } from "react";
import "../src/InputButton.css";
import sample_data from "./sampleData";
import { useEffect } from "react";

const CalculateBet = (name, betType) => {
  const [bet, setBet] = useState(0);

  const teamName = name.name;

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
    
    if (odds === 100){
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
      <div className="root">
        <div className="table-data">
          <input
            type="text"
            className="input"
            value={bet}
            onChange={(e) => setBet(+e.target.value)}
          ></input>
          <div className="box">{`${profitCalculation()}`}</div>
        </div>
      </div>
    </>
  );
};

export default CalculateBet;
