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


import java.util.List;

@RestController
public class BetController {

    private final BetApiService betApiService;

    @Autowired
    public BetController(BetApiService betApiService) {
        this.betApiService = betApiService;
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
        System.out.println("Bet after setting status: " + bet);
        // STORE BET IN DATABASE
        return bet;
    }

    @PostMapping("/verify-bets")
    public ResponseEntity<String> verifyBets() {
        // TRIGGER BET VERIFICATION LOGIC: call method to verify bets with status "PENDING"
        return ResponseEntity.ok("Bet verification triggered successfully.");
    }
}
