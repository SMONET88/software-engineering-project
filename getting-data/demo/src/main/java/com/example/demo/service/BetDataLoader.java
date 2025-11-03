package com.example.demo.service;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.demo.model.PotentialBet;

@Component
public class BetDataLoader implements CommandLineRunner {

    private final BetApiService betApiService;

    public BetDataLoader(BetApiService betApiService) {
        this.betApiService = betApiService;
    }

    @Override
    public void run(String... args) {
        System.out.println("Fetching bet data at startup...");
        try {
            List<PotentialBet> bets = betApiService.fetchPotentialBets(); 
            System.out.println("Got: " + bets.size());
            for (PotentialBet bet : bets) {
                System.out.println(bet); 
            }
        } catch (Exception e) {
            System.err.println("Failed to fetch bet data: " + e.getMessage());
        }
        System.out.println("Bet data loaded.");

    }
}

