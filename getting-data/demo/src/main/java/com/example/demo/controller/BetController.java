package com.example.demo.controller;


import com.example.demo.model.PotentialBet;
import com.example.demo.model.UserBet;
import com.example.demo.service.BetApiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class BetController {

    private final BetApiService betApiService;

    @Autowired
    public BetController(BetApiService betApiService) {
        this.betApiService = betApiService;
    }

    // Endpoint to fetch all bets
    @GetMapping("/bets")
    public List<PotentialBet> getBets() {
        return betApiService.fetchPotentialBets();
    }

    @PostMapping("/submit-bet")
    // PLACEHOLDER. EVENTUALLY WILL PROCESS BET SUBMISSION
    public UserBet submitBet(@RequestBody UserBet bet) {
        System.out.println("Received bet: " + bet);
        // For now, just return it back as confirmation
        return bet;
    }
}
