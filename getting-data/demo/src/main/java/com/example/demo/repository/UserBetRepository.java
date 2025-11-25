package com.example.demo.repository;

import com.example.demo.model.UserBet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface UserBetRepository extends JpaRepository<UserBet, Long> {

    // find all bets with a specific status (e.g., "PENDING")
    List<UserBet> findByUserIdAndStatus(UUID userId, String status);

    // find all bets given a userId
    List<UserBet> findByUserId(UUID userID);

    // find all pending bets created after a given date (for last week’s bets)
    List<UserBet> findByUserIdAndStatusAndCreatedAtAfter(UUID userId, String status, LocalDateTime createdAt);
}
