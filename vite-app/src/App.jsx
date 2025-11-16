import { useState } from 'react'
import { GameList2 } from "./GameList2";
import sample_data from "./sampleData";

function App() {
  const [money, setMoney] = useState(100);

  const [totalProfit, setTotalProfit] = useState(0);
  
  const addProfit = (newProfitAddition) => {
    setTotalProfit((prev) => prev + newProfitAddition);
    if (money - newProfitAddition < 0) {
      alert("You don't have enough money!");
    }
    else {
      setMoney(money - newProfitAddition);
    }
  };


  return (
    <>
      <h1 className="top-element">Scurry Betting</h1>
      <p className="top-element">Nut your mommas betting app.</p>

      <div className="center-container">
        <h3 className="money-text">{money.toFixed(2)} ACORNS</h3>
        <h3 className="money-text">
          Total Profit: {totalProfit.toFixed(2)}
        </h3>
        <GameList2 games={sample_data} addProfit={addProfit} />
      </div>
    </>
  );
}

export default App;
