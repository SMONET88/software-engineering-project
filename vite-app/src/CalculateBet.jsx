import { useState, useEffect } from "react";
import sample_data from "./sampleData";

const CalculateBet = (name, betType, onProfitReady) => {
  const [betInput, setBet] = useState("");


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

    const bet = Number(betInput);


    if (typeof bet !== "number" || isNaN(bet)) {
      return 0;
    } else if (odds === 100) {
      return bet * 2;
    } else if (odds > 0) {
      return ((odds / 100) * bet).toFixed(2);
    } else if (odds < 0) {
      return ((100 / Math.abs(odds)) * bet).toFixed(2);
    }
  };


  const profit = profitCalculation();

  useEffect(() => {
    if (typeof onProfitReady === "function") {
      onProfitReady(profit);
    }
  }, [profit, onProfitReady]);



  return (
    <>
      <div className="root">
        <div className="table-data">
          <input
            type="text"
            className="input"
            value={betInput}
            onChange={(e) => setBet(e.target.value)}
          ></input>
          <div className="box">{profit}</div>
        </div>
      </div>
    </>
  );
};

export default CalculateBet;
