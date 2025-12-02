package com.example.demo.model;

import jakarta.persistence.*;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false, updatable = false)
    private OffsetDateTime createdAt;

    @Column(nullable = true, unique = true)
    private String email;

    @Column(nullable = true, unique = true)
    private String username;

    @Column(nullable = false)
    private Long balance; // int8 maps to Long in Java

    // Default constructor
    public User() {}

    // Full constructor
    public User(UUID id, OffsetDateTime createdAt, String email, String username, Long balance) {
        this.id = id;
        this.createdAt = createdAt;
        this.email = email;
        this.username = username;
        this.balance = balance;
    }

    // Getters and setters
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public OffsetDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(OffsetDateTime createdAt) { this.createdAt = createdAt; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public Long getBalance() { return balance; }
    public void setBalance(Long balance) { this.balance = balance; }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", createdAt=" + createdAt +
                ", email='" + email + '\'' +
                ", username='" + username + '\'' +
                ", balance=" + balance +
                '}';
    }
}