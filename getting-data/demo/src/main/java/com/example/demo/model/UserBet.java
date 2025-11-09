package com.example.demo.model;

public class UserBet {

    public enum BetType {
        H2H, SPREAD, TOTAL
    }

    private String gameId;
    private BetType type;

    // The team the user is betting on (null for TOTAL bets)
    private String team;

    // The line (point, spread, total, etc.)
    private Double line;

    // The odds for payout calculation (American odds)
    private Double odds;

    // Only used for TOTAL bets to indicate over/under
    private Boolean isOver;

    private String status; // "PENDING", "WIN", "LOSS"

    // Default constructor
    public UserBet() {}

    // Full constructor
    public UserBet(String gameId, int userId, BetType type, String team, Double line, Double odds, Boolean isOver) {
        this.gameId = gameId;
        this.type = type;
        this.team = team;
        this.line = line;
        this.odds = odds;
        this.isOver = isOver;
        this.status = "PENDING";
    }

    // Getters and Setters
    public String getGameId() {
        return gameId;
    }

    public void setGameId(String gameId) {
        this.gameId = gameId;
    }

    public BetType getType() {
        return type;
    }

    public void setType(BetType type) {
        this.type = type;
    }

    public String getTeam() {
        return team;
    }

    public void setTeam(String team) {
        this.team = team;
    }

    public Double getLine() {
        return line;
    }

    public void setLine(Double line) {
        this.line = line;
    }

    public Double getOdds() {
        return odds;
    }

    public void setOdds(Double odds) {
        this.odds = odds;
    }

    public Boolean getIsOver() {
        return isOver;
    }

    public void setIsOver(Boolean isOver) {
        this.isOver = isOver;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "UserBet{" +
                "gameId='" + gameId + '\'' +
                ", type=" + type +
                ", team='" + team + '\'' +
                ", line=" + line +
                ", odds=" + odds +
                ", isOver=" + isOver +
                '}';
    }
}
