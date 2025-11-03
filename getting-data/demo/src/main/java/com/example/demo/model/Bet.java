package com.example.demo.model;

public class Bet {

    public enum BetType {
        MONEYLINE, SPREAD, TOTAL
    }

    private String id;

    private BetType type;
    private String team;
    private double line;
    private boolean isOver;
    private String gameId;

    public Bet() {}

    public Bet(BetType type, String team, double line, boolean isOver, String gameId) {
        this.type = type;
        this.team = team;
        this.line = line;
        this.isOver = isOver;
        this.gameId = gameId;
    }

    public String getId() {
        return this.id;
    }

    public BetType getType() {
        return this.type;
    }

    public String getTeam() {
        return this.team;
    }

    public double getLine() {
        return this.line;
    }

    public boolean getIsOver() {
        return this.isOver;
    }

    public String getGameId() {
        return this.gameId;
    }

    @Override
    public String toString() {
        return "Bet{" +
                "id='" + id + '\'' +
                ", type=" + type +
                ", team='" + team + '\'' +
                ", line=" + line +
                ", isOver=" + isOver +
                ", gameId='" + gameId + '\'' +
                '}';
    }
}
