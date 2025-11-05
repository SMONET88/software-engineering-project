package com.example.demo.service;

import com.example.demo.model.PotentialBet;
import com.example.demo.model.PotentialBet.Bookmaker;
import com.example.demo.model.PotentialBet.Market;
import com.example.demo.model.PotentialBet.Outcome;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class BetApiService {

    @Value("${api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public List<PotentialBet> fetchPotentialBets() {
        String apiUrl = "https://api.the-odds-api.com/v4/sports/americanfootball_nfl/odds/?apiKey="
                + apiKey + "&regions=us&markets=h2h,spreads,totals&oddsFormat=american&bookmakers=fanduel";

        ResponseEntity<List> response = restTemplate.getForEntity(apiUrl, List.class);
        List<Map<String, Object>> games = response.getBody();
        List<PotentialBet> potentialBets = new ArrayList<>();

        if (games == null) return potentialBets;

        for (Map<String, Object> game : games) {
            String gameId = (String) game.get("id");
            String commenceTime = (String) game.get("commence_time");
            String homeTeam = (String) game.get("home_team");
            String awayTeam = (String) game.get("away_team");

            List<Map<String, Object>> bookmakerMaps = (List<Map<String, Object>>) game.get("bookmakers");
            List<Bookmaker> bookmakers = new ArrayList<>();

            if (bookmakerMaps != null) {
                for (Map<String, Object> bookmakerMap : bookmakerMaps) {
                    String key = (String) bookmakerMap.get("key");
                    String title = (String) bookmakerMap.get("title");
                    String lastUpdate = (String) bookmakerMap.get("last_update");

                    List<Map<String, Object>> marketMaps = (List<Map<String, Object>>) bookmakerMap.get("markets");
                    List<Market> markets = new ArrayList<>();

                    if (marketMaps != null) {
                        for (Map<String, Object> marketMap : marketMaps) {
                            String marketKey = (String) marketMap.get("key");
                            String marketLastUpdate = (String) marketMap.get("last_update");

                            List<Map<String, Object>> outcomeMaps = (List<Map<String, Object>>) marketMap.get("outcomes");
                            List<Outcome> outcomes = new ArrayList<>();

                            if (outcomeMaps != null) {
                                for (Map<String, Object> outcomeMap : outcomeMaps) {
                                    String name = (String) outcomeMap.get("name");
                                    double price = ((Number) outcomeMap.get("price")).doubleValue();

                                    // Extract point if it exists, otherwise null
                                    Double point = null;
                                    if (outcomeMap.containsKey("point")) {
                                        Object pointObj = outcomeMap.get("point");
                                        if (pointObj != null) {
                                            point = ((Number) pointObj).doubleValue();
                                        }
                                    }

                                    outcomes.add(new Outcome(name, price, point));
                                }
                            }

                            markets.add(new Market(marketKey, marketLastUpdate, outcomes));
                        }
                    }

                    bookmakers.add(new Bookmaker(key, title, lastUpdate, markets));
                }
            }

            potentialBets.add(new PotentialBet(gameId, commenceTime, homeTeam, awayTeam, bookmakers));
        }

        return potentialBets;
    }
}
