package com.example.demo.service;

import org.springframework.stereotype.Service;
import com.example.demo.model.Bet;
import com.example.demo.model.GameResult;

@Service
public class BetEvaluatorService {

    public boolean didBetHit(Bet bet, GameResult result) {
        if (!bet.getGameId().equals(result.getGameId())) {
            throw new IllegalArgumentException("Game IDs do not match!");
        }

        int homeScore = result.getHomeScore();
        int awayScore = result.getAwayScore();

        return switch (bet.getType()) {
            case MONEYLINE -> {
                String winner = homeScore > awayScore ? result.getHomeTeam() : result.getAwayTeam();
                yield winner.equalsIgnoreCase(bet.getTeam());
            }
            case SPREAD -> {
                boolean isHome = result.getHomeTeam().equalsIgnoreCase(bet.getTeam());
                double pointDiff = (homeScore - awayScore) * (isHome ? 1 : -1);
                yield pointDiff > -bet.getLine();
            }
            case TOTAL -> {
                double total = homeScore + awayScore;
                yield bet.getIsOver() ? total > bet.getLine() : total < bet.getLine();
            }
        };
    }
}

