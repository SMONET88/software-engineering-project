package com.example.demo.controller;

import com.example.demo.model.PotentialBet;
import com.example.demo.model.UserBet;
import com.example.demo.service.BetApiService;
import com.example.demo.service.BetEvaluatorService;
import com.example.demo.repository.UserBetRepository;
import com.example.demo.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.time.LocalDate;
import java.time.DayOfWeek;

@RestController
public class BetController {

    private final BetApiService betApiService;
    private final UserBetRepository userBetRepository;
    private final BetEvaluatorService betEvaluatorService;
    private final UserRepository userRepository;

    @Autowired
    public BetController(BetApiService betApiService, UserBetRepository userBetRepository, BetEvaluatorService betEvaluatorService, UserRepository userRepository) {
        this.betApiService = betApiService;
        this.userBetRepository = userBetRepository;
        this.betEvaluatorService = betEvaluatorService;
        this.userRepository = userRepository;
    }

    // Endpoint to fetch all potential bets
    @GetMapping("/bets")
    public List<PotentialBet> getBets() {
        return betApiService.fetchPotentialBets();
    }

    // Endpoint to fetch all potential bets
    @GetMapping("/user-bets")
    public List<UserBet> getUserBets(@RequestParam UUID userId) {
        // Fetch all pending bets for that user
        return userBetRepository.findByUserId(userId);
    }

    @GetMapping("/user-balance")
    public ResponseEntity<Long> getUserBalance(@RequestParam UUID userId) {
        // Fetch the balance from the UserRepository
        Long balance = userRepository.findBalanceById(userId);

        if (balance == null) {
            return ResponseEntity.notFound().build(); // User not found
        }

        return ResponseEntity.ok(balance);
    }

    @PostMapping("/submit-bet")
    public UserBet submitBet(@RequestBody UserBet bet) {
        System.out.println("Received bet: " + bet);
        // Set status to PENDING automatically
        bet.setStatus("PENDING");
        // hard code userId until auth is set up
        bet.setUserId(UUID.fromString("23116ad0-a28d-4a8b-bd2e-aca8f63f5118"));
        // STORE BET IN DATABASE
        UserBet savedBet = userBetRepository.save(bet);
        System.out.println("Saved bet: " + savedBet);
        return savedBet;
    }

    @PostMapping("/verify-bets")
    public ResponseEntity<String> verifyBets(@RequestParam UUID userId) {
        DayOfWeek today = LocalDate.now().getDayOfWeek(); 
        if (today == DayOfWeek.TUESDAY) {
            // TRIGGER BET VERIFICATION LOGIC: call method to verify bets with status "PENDING"
            betEvaluatorService.verifyPendingBets(userId);
            return ResponseEntity.ok("Bet verification triggered successfully.");
        } else {
            return ResponseEntity
                .badRequest()
                .body("Bet verification is only available on Tuesdays.");
        }
    }
}