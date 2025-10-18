import React from "react";

const GameList = ({ games }) => {
  return (
    <>
      {games.map((game) => {
        const h2h = game.bookmakers[0].markets.find((m) => m.key === "h2h");
        const spreads = game.bookmakers[0].markets.find((m) => m.key === "spreads");
        const totals = game.bookmakers[0].markets.find((m) => m.key === "totals");

        const over = totals.outcomes.find(o => o.name === "Over");
        const under = totals.outcomes.find(o => o.name === "Under");

        return (
          <div key={game.id}>
            <h3>{game.home_team} vs {game.away_team}</h3>

            <table>
              <thead>
                {/* column labels*/}
                <tr>
                  <th>Team</th>
                  <th>Winner</th>
                  <th>Spread</th>
                  <th>Total Points</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {/* home team row */}
                  <td>{game.home_team}</td>
                  <td>
                    <button>
                      {h2h.outcomes.find(o => o.name === game.home_team)?.price}
                    </button>
                  </td>
                  <td>
                    <button>
                      {spreads.outcomes.find(o => o.name === game.home_team)?.price} (
                      {spreads.outcomes.find(o => o.name === game.home_team)?.point})
                    </button>
                  </td>
                  <td>
                    <button>
                      Over {over?.point} ({over?.price})
                    </button>
                  </td>
                </tr>
                <tr>
                  {/* away team row */}
                  <td>{game.away_team}</td>
                  <td>
                    <button>
                      {h2h.outcomes.find(o => o.name === game.away_team)?.price}
                    </button>
                  </td>
                  <td>
                    <button>
                      {spreads.outcomes.find(o => o.name === game.away_team)?.price} (
                      {spreads.outcomes.find(o => o.name === game.away_team)?.point})
                    </button>
                  </td>
                  <td>
                    <button>
                      Under {under?.point} ({under?.price})
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
    </>
  );
};

export default GameList;
