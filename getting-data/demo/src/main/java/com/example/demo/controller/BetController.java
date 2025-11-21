package com.example.demo.controller;


import com.example.demo.model.PotentialBet;
import com.example.demo.model.UserBet;
import com.example.demo.service.BetApiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import java.util.ArrayList;
import com.example.demo.repository.UserBetRepository;

import java.util.List;
import java.util.UUID;

@RestController
public class BetController {

    private final BetApiService betApiService;
    private final UserBetRepository userBetRepository;

    @Autowired
    public BetController(BetApiService betApiService, UserBetRepository userBetRepository) {
        this.betApiService = betApiService;
        this.userBetRepository = userBetRepository;
    }

    // Endpoint to fetch all potential bets
    @GetMapping("/bets")
    public List<PotentialBet> getBets() {
        return betApiService.fetchPotentialBets();
    }

    // Endpoint to fetch all potential bets
    @GetMapping("/user-bets")
    public List<UserBet> getUserBets() {
        // PLACEHOLDER: Replace with actual database retrieval logic
        return new ArrayList<>();
    }

    @PostMapping("/submit-bet")
    public UserBet submitBet(@RequestBody UserBet bet) {
        System.out.println("Received bet: " + bet);
        // Set status to PENDING automatically
        bet.setStatus("PENDING");
        // hard code userId until auth is set up
        bet.setUserId(UUID.fromString("41f9f48c-bd25-4b9b-8793-70cb381dc29a"));
        // STORE BET IN DATABASE
        UserBet savedBet = userBetRepository.save(bet);
        System.out.println("Saved bet: " + savedBet);
        return savedBet;
    }

    @PostMapping("/verify-bets")
    public ResponseEntity<String> verifyBets() {
        // TRIGGER BET VERIFICATION LOGIC: call method to verify bets with status "PENDING"
        return ResponseEntity.ok("Bet verification triggered successfully.");
    }
}
