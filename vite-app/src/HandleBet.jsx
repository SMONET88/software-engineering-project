import React, { useState } from "react";
import sample_data from "./sampleData";

const HandleBet = ({ game, betType, isHome }) => {
    const [betInput, setBet] = useState("");
    const [disabledGame, setDisabledGame] = useState("");
    const [totalProfit, setTotalProfit] = useState([]);



    // immutable update
    const addProfit = (newProfitAddition) => {
        setTotalProfit((prev) => [...prev, newProfitAddition]);
    };

    const teamName = isHome ? game.home_team : game.away_team;




    let oddsDictionary = {};

    sample_data.forEach((game) => {
        const homeTeam = game.home_team;
        const awayTeam = game.away_team;

        game.bookmakers?.forEach((bookmaker) => {
            const h2h = bookmaker.markets.find((m) => m.key === "h2h");
            const spread = bookmaker.markets.find((m) => m.key === "spread");
            const totals = bookmaker.markets.find((m) => m.key === "totals");

            const totalsOver = totals?.outcomes.find(n => n.name === "Over");
            const totalsUnder = totals?.outcomes.find(n => n.name === "Under");

            // Home team odds
            oddsDictionary[homeTeam] = {
                h2hOdds: h2h?.outcomes[0]?.price,
                h2hLine: null,
                spreadOdds: spread?.outcomes[0]?.price,
                spreadLine: spread?.outcomes[0]?.point,

                totalOddsOver: totalsOver.price,
                totalLineOver: totalsOver.point,

                totalOddsUnder: totalsUnder.price,
                totalLineUnder: totalsUnder.point,
            };

            // Away team odds
            oddsDictionary[awayTeam] = {
                h2hOdds: h2h?.outcomes[1]?.price,
                h2hLine: null,

                spreadOdds: spread?.outcomes[1]?.price,
                spreadLine: spread?.outcomes[1]?.point,


                totalOddsOver: totalsOver.price,
                totalLineOver: totalsOver.point,

                totalOddsUnder: totalsUnder.price,
                totalLineUnder: totalsUnder.point,
            };
        });
    });



    // this is what the odds object looks like for each team, need to figure out how to calculayte dyanmically:
    // {
    //     h2hOdds: -120,
    //         spreadOdds: -110,
    //             totalOddsOver: -105,
    //                 totalOddsUnder: -115
    // }

    const odds = oddsDictionary[teamName].h2hOdds;

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



    const onClickHandle = (teamName, gameId) => {
        console.log(`cameron clicked the button`);
        setDisabledGame(gameId);
        addProfit(profit);
        console.log(`profit here: ${profit}`);

        const userBet = {
            gameId: game.id,
            BetType: betType,
            team: teamName,
            line: odds,
            isOver: true,
            amount: betInput
        }

    }

    return (

        <>
            <div className="table-data" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input
                    type="text"
                    className="input"
                    value={betInput}
                    onChange={(e) => setBet(e.target.value)}
                />
                <button className="betButton" onClick={() => onClickHandle(game.away_team, game.id)} disabled={disabledGame === game.id} >Place</button>
            </div>
            <div className="box">{profit}</div>

        </>

    );
}

export default HandleBet;
