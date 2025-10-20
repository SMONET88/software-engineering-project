import { useState } from 'react'
import GameList from "./GameList";
import sample_data from "./sampleData";

function App() {

  const [money, setMoney] = useState(100);

  return (
    <>
    <h1 className="top-element">Simple Betting App</h1>

    <div className="center-container">
      <h3 className="money-text">{money} CURRENCY NAME</h3>
    </div>

    <GameList games={sample_data} />
    </>
  )
}

export default App