//import { useState } from 'react'
import { GameList2 } from "./GameList2";
import sample_data from "./sampleData";

function App() {
  // const [money, setMoney] = useState(100);

  return (
    <>
      <h1 className="top-element">Simple Betting App</h1>

      <div className="center-container">
        <h3 className="money-text">100 CURRENCY NAME</h3>
        <h3 className="money-text">TOTAL PROFIT: {} </h3>
      </div>

      <GameList2 games={sample_data} />
    </>
  );
}

export default App;
