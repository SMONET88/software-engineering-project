package com.example.demo.model;

import java.util.UUID;
import jakarta.persistence.*;
import java.time.LocalDateTime;


@Entity
@Table(name = "bets")
public class UserBet {

    public enum BetType {
        H2H, SPREAD, TOTAL
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // primary key

    @Column(name = "\"gameId\"", nullable = false)
    private String gameId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BetType type;

    // The team the user is betting on (null for TOTAL bets)
    @Column(nullable = true)
    private String team;

    // The line (point, spread, total, etc.)
    @Column(nullable = true)
    private Double line;

    // The odds for payout calculation (American odds)
    @Column(nullable = false)
    private Double odds;

    // Only used for TOTAL bets to indicate over/under
    @Column(nullable = true)
    private Boolean isOver;

    @Column(nullable = false)
    private String status = "PENDING"; // "PENDING", "WIN", "LOSS"

    @Column(nullable = false)
    private Double amount;

    @Column(nullable = false, columnDefinition = "uuid")
    private UUID userId;
    
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    // Default constructor
    public UserBet() {}

    // Full constructor
    public UserBet(String gameId, BetType type, String team, Double line,
                   Double odds, Boolean isOver, double amount, UUID userId) {
        this.gameId = gameId;
        this.type = type;
        this.team = team;
        this.line = line;
        this.odds = odds;
        this.isOver = isOver;
        this.amount = amount;
        this.status = "PENDING";
        this.userId = userId;
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getGameId() { return gameId; }
    public void setGameId(String gameId) { this.gameId = gameId; }

    public BetType getType() { return type; }
    public void setType(BetType type) { this.type = type; }

    public String getTeam() { return team; }
    public void setTeam(String team) { this.team = team; }

    public Double getLine() { return line; }
    public void setLine(Double line) { this.line = line; }

    public Double getOdds() { return odds; }
    public void setOdds(Double odds) { this.odds = odds; }

    public Boolean getIsOver() { return isOver; }
    public void setIsOver(Boolean isOver) { this.isOver = isOver; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }

    public UUID getUserId() { return userId; }
    public void setUserId(UUID userId) { this.userId = userId; }

    @Override
    public String toString() {
        return "UserBet{" +
                "id=" + id +
                ", gameId='" + gameId + '\'' +
                ", type=" + type +
                ", team='" + team + '\'' +
                ", line=" + line +
                ", odds=" + odds +
                ", isOver=" + isOver +
                ", status='" + status + '\'' +
                ", amount=" + amount +
                ", userId=" + userId +
                '}';
    }
}