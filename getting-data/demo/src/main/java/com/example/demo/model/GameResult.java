package com.example.demo.model;

import java.util.List;
import java.util.Optional;

public class GameResult {

    private String gameId;
    private String homeTeam;
    private String awayTeam;
    private int homeScore;
    private int awayScore;
    private boolean completed;

    // Inner class to match API scores
    public static class TeamScore {
        private String name;
        private int score;

        public TeamScore() {}

        public TeamScore(String name, int score) {
            this.name = name;
            this.score = score;
        }

        public String getName() {
            return name;
        }

        public int getScore() {
            return score;
        }

        @Override
        public String toString() {
            return "TeamScore{name='" + name + "', score=" + score + "}";
        }
    }

    public GameResult() {}

    public GameResult(String gameId, String homeTeam, String awayTeam, int homeScore, int awayScore, boolean completed) {
        this.gameId = gameId;
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
        this.homeScore = homeScore;
        this.awayScore = awayScore;
        this.completed = completed;
    }

    public String getGameId() {
        return gameId;
    }

    public String getHomeTeam() {
        return homeTeam;
    }

    public String getAwayTeam() {
        return awayTeam;
    }

    public int getHomeScore() {
        return homeScore;
    }

    public int getAwayScore() {
        return awayScore;
    }

    public boolean isCompleted() {
        return completed;
    }

    // Helper method to map scores array from API into home/away scores
    public void mapScores(List<TeamScore> scores) {
        if (scores == null || scores.size() < 2) return;

        Optional<TeamScore> home = scores.stream().filter(s -> s.getName().equals(this.homeTeam)).findFirst();
        Optional<TeamScore> away = scores.stream().filter(s -> s.getName().equals(this.awayTeam)).findFirst();

        home.ifPresent(s -> this.homeScore = s.getScore());
        away.ifPresent(s -> this.awayScore = s.getScore());
    }

    @Override
    public String toString() {
        return "GameResult{" +
                "gameId='" + gameId + '\'' +
                ", homeTeam='" + homeTeam + '\'' +
                ", awayTeam='" + awayTeam + '\'' +
                ", homeScore=" + homeScore +
                ", awayScore=" + awayScore +
                ", completed=" + completed +
                '}';
    }
}
