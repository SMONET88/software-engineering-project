import React from "react";
import BetButton from "./BetButton";
import "./App.css";

const GameList = ({ games }) => {
  return (
    <>
      {games.map((game) => {
        const bookmaker = game.bookmakers[0];
        const h2h = bookmaker.markets.find((m) => m.key === "h2h");
        const spreads = bookmaker.markets.find((m) => m.key === "spreads");
        const totals = bookmaker.markets.find((m) => m.key === "totals");

        const over = totals.outcomes.find((o) => o.name === "Over");
        const under = totals.outcomes.find((o) => o.name === "Under");

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
          <div key={game.id} className="rounded-div">
            <table>
              <thead>
                <tr>
                  <th>{formatTime(game.commence_time)}</th>
                  <th>Winner</th>
                  <th>Spread</th>
                  <th>Total Points</th>
                  <th>$</th>
                  <th>profit if hit</th>
                </tr>
              </thead>
              <tbody>
                {/* Home team row */}
                <tr>
                  <td style={{ fontWeight: "bold" }}>{game.home_team}</td>
                  <td>
                    <BetButton
                      label={
                        h2h.outcomes.find((o) => o.name === game.home_team)
                          ?.price
                      }
                    />
                  </td>
                  <td>
                    <BetButton
                      label={`${
                        spreads.outcomes.find((o) => o.name === game.home_team)
                          ?.price
                      } (${
                        spreads.outcomes.find((o) => o.name === game.home_team)
                          ?.point
                      })`}
                    />
                  </td>
                  <td>
                    <BetButton label={`O ${over?.point} (${over?.price})`} />
                  </td>
                </tr>

                {/* Away team row */}
                <tr>
                  <td style={{ fontWeight: "bold" }}>{game.away_team}</td>
                  <td>
                    <BetButton
                      label={
                        h2h.outcomes.find((o) => o.name === game.away_team)
                          ?.price
                      }
                    />
                  </td>
                  <td>
                    <BetButton
                      label={`${
                        spreads.outcomes.find((o) => o.name === game.away_team)
                          ?.price
                      } (${
                        spreads.outcomes.find((o) => o.name === game.away_team)
                          ?.point
                      })`}
                    />
                  </td>
                  <td>
                    <BetButton label={`U ${under?.point} (${under?.price})`} />
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
