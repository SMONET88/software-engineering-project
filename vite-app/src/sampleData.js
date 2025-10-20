const sample_data = [
  {
    id: "79de65f1b97c9145ebdcb019eb486500",
    sport_key: "americanfootball_nfl",
    sport_title: "NFL",
    commence_time: "2025-10-19T13:30:00Z",
    home_team: "Jacksonville Jaguars",
    away_team: "Los Angeles Rams",
    bookmakers: [
      {
        key: "fanduel",
        title: "FanDuel",
        last_update: "2025-10-18T20:50:55Z",
        markets: [
          {
            key: "h2h",
            outcomes: [
              { name: "Jacksonville Jaguars", price: 138 },
              { name: "Los Angeles Rams", price: -164 }
            ]
          },
          {
            key: "spreads",
            outcomes: [
              { name: "Jacksonville Jaguars", price: -110, point: 3 },
              { name: "Los Angeles Rams", price: -110, point: -3 }
            ]
          },
          {
            key: "totals",
            outcomes: [
              { name: "Over", price: -112, point: 44.5 },
              { name: "Under", price: -108, point: 44.5 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "ba4e8bfa1f4eeaa74c7b09f409361c0d",
    sport_key: "americanfootball_nfl",
    sport_title: "NFL",
    commence_time: "2025-10-19T17:00:00Z",
    home_team: "New York Jets",
    away_team: "Carolina Panthers",
    bookmakers: [
      {
        key: "fanduel",
        title: "FanDuel",
        last_update: "2025-10-18T20:50:55Z",
        markets: [
          {
            key: "h2h",
            outcomes: [
              { name: "Carolina Panthers", price: -118 },
              { name: "New York Jets", price: 100 }
            ]
          },
          {
            key: "spreads",
            outcomes: [
              { name: "Carolina Panthers", price: -105, point: -1.5 },
              { name: "New York Jets", price: -115, point: 1.5 }
            ]
          },
          {
            key: "totals",
            outcomes: [
              { name: "Over", price: -110, point: 41.5 },
              { name: "Under", price: -110, point: 41.5 }
            ]
          }
        ]
      }
    ]
  }
];

export default sample_data;
