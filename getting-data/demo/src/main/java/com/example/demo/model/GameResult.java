package com.example.demo.model;

public class GameResult {

    private String gameId;
    private String homeTeam;
    private String awayTeam;
    private int homeScore;
    private int awayScore;

    public GameResult() {}

    public GameResult(String gameId, String homeTeam, String awayTeam, int homeScore, int awayScore) {
        this.gameId = gameId;
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
        this.homeScore = homeScore;
        this.awayScore = awayScore;
    }

    public String getGameId() {
        return this.gameId;
    }

    public String getHomeTeam() {
        return this.homeTeam;
    }

    public String getAwayTeam() {
        return this.awayTeam;  
    }

    public int getHomeScore() {
        return this.homeScore;
    }

    public int getAwayScore() {
        return this.awayScore;
    }
    
}
