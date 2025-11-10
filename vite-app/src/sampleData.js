// const sample_data = [
//   {
//     id: "438868ff90501a1fe9a0fbecbee9dc12",
//     commenceTime: "2025-11-11T01:15:00Z",
//     homeTeam: "Green Bay Packers",
//     awayTeam: "Philadelphia Eagles",
//     bookmakers: [
//       {
//         key: "fanduel",
//         title: "FanDuel",
//         lastUpdate: "2025-11-09T22:26:57Z",
//         markets: [
//           {
//             key: "h2h",
//             lastUpdate: "2025-11-09T22:26:57Z",
//             outcomes: [
//               {
//                 name: "Green Bay Packers",
//                 price: -118,
//                 point: null
//               },
//               {
//                 name: "Philadelphia Eagles",
//                 price: 100,
//                 point: null
//               }
//             ]
//           },
//           {
//             key: "spreads",
//             lastUpdate: "2025-11-09T22:26:57Z",
//             outcomes: [
//               {
//                 name: "Green Bay Packers",
//                 price: -105,
//                 point: -1.5
//               },
//               {
//                 name: "Philadelphia Eagles",
//                 price: -115,
//                 point: 1.5
//               }
//             ]
//           },
//           {
//             key: "totals",
//             lastUpdate: "2025-11-09T22:26:57Z",
//             outcome: [
//               {
//                 name: "Over",
//                 price: -120,
//                 point: 44.5
//               },
//               {
//                 name: "Under",
//                 price: -102,
//                 point: 44.5
//               }
//             ]
//           }
//         ]
//       }
//     ]
//   }
// ]



const sample_data = [
  {
    "id": "438868ff90501a1fe9a0fbecbee9dc12",
    "commence_time": "2025-11-11T01:15:00Z",
    "home_team": "Green Bay Packers",
    "away_team": "Philadelphia Eagles",
    "bookmakers": [
      {
        "key": "fanduel",
        "title": "FanDuel",
        "last_update": "2025-11-10T05:50:40Z",
        "markets": [
          {
            "key": "h2h",
            "last_update": "2025-11-10T05:50:40Z",
            "outcomes": [
              {
                "name": "Green Bay Packers",
                "price": -120,
                "point": null
              },
              {
                "name": "Philadelphia Eagles",
                "price": 102,
                "point": null
              }
            ]
          },
          {
            "key": "spreads",
            "last_update": "2025-11-10T05:50:40Z",
            "outcomes": [
              {
                "name": "Green Bay Packers",
                "price": -105,
                "point": -1.5
              },
              {
                "name": "Philadelphia Eagles",
                "price": -115,
                "point": 1.5
              }
            ]
          },
          {
            "key": "totals",
            "last_update": "2025-11-10T05:50:40Z",
            "outcomes": [
              {
                "name": "Over",
                "price": -110,
                "point": 45.5
              },
              {
                "name": "Under",
                "price": -110,
                "point": 45.5
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "32ec2bd4ac9e4c40f9f5cbed7e67f837",
    "commence_time": "2025-11-14T01:15:00Z",
    "home_team": "New England Patriots",
    "away_team": "New York Jets",
    "bookmakers": [
      {
        "key": "fanduel",
        "title": "FanDuel",
        "last_update": "2025-11-10T05:50:40Z",
        "markets": [
          {
            "key": "h2h",
            "last_update": "2025-11-10T05:50:40Z",
            "outcomes": [
              {
                "name": "New England Patriots",
                "price": -800,
                "point": null
              },
              {
                "name": "New York Jets",
                "price": 560,
                "point": null
              }
            ]
          },
          {
            "key": "spreads",
            "last_update": "2025-11-10T05:50:40Z",
            "outcomes": [
              {
                "name": "New England Patriots",
                "price": -115,
                "point": -10.5
              },
              {
                "name": "New York Jets",
                "price": -105,
                "point": 10.5
              }
            ]
          },
          {
            "key": "totals",
            "last_update": "2025-11-10T05:50:40Z",
            "outcomes": [
              {
                "name": "Over",
                "price": -110,
                "point": 44.5
              },
              {
                "name": "Under",
                "price": -110,
                "point": 44.5
              }
            ]
          }
        ]
      }
    ]
  }
];

export default sample_data;
