package com.example.demo.service;

import com.example.demo.model.GameResult;
import com.example.demo.model.GameResult.TeamScore;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.boot.CommandLineRunner;

import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

@Component
public class GameDataLoader implements CommandLineRunner {

    @Value("${api.key}")
    private String apiKey;

    // Keep the game results in memory
    private final List<GameResult> gameResults = new ArrayList<>();

    public List<GameResult> getGameResults() {
        return gameResults;
    }

    @Override
    public void run(String... args) {
        System.out.println("Fetching game results from API...");
        try {
            fetchGameResults();
            System.out.println("Loaded " + gameResults.size() + " game results.");
        } catch (Exception e) {
            System.err.println("Failed to fetch game data: " + e.getMessage());
        }
    }

    private void fetchGameResults() throws Exception {
        String endpoint = "https://api.the-odds-api.com/v4/sports/americanfootball_nfl/scores/?daysFrom=3&apiKey=" + apiKey;
        URL url = new URL(endpoint);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.connect();

        int responseCode = conn.getResponseCode();
        if (responseCode != 200) {
            throw new RuntimeException("Failed to fetch data: HTTP code " + responseCode);
        }

        StringBuilder inline = new StringBuilder();
        Scanner scanner = new Scanner(url.openStream());
        while (scanner.hasNext()) {
            inline.append(scanner.nextLine());
        }
        scanner.close();

        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = mapper.readTree(inline.toString());

        for (JsonNode node : root) {
            String gameId = node.get("id").asText();
            String homeTeam = node.get("home_team").asText();
            String awayTeam = node.get("away_team").asText();
            boolean completed = node.get("completed").asBoolean();

            GameResult gameResult = new GameResult(gameId, homeTeam, awayTeam, 0, 0, completed);

            // Map scores if present
            JsonNode scoresNode = node.get("scores");
            if (scoresNode != null && scoresNode.isArray()) {
                List<TeamScore> scores = new ArrayList<>();
                for (JsonNode scoreNode : scoresNode) {
                    String name = scoreNode.get("name").asText();
                    int score = scoreNode.get("score").asInt();
                    scores.add(new TeamScore(name, score));
                }
                gameResult.mapScores(scores);
            }

            gameResults.add(gameResult);
        }
    }
}