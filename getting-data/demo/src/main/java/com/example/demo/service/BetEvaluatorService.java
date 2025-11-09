package com.example.demo.service;

import org.springframework.stereotype.Service;
import com.example.demo.model.UserBet;
import com.example.demo.model.GameResult;

@Service
public class BetEvaluatorService {

    public boolean didBetHit(UserBet userBet, GameResult result) {
        if (!userBet.getGameId().equals(result.getGameId())) {
            throw new IllegalArgumentException("Game IDs do not match!");
        }

        int homeScore = result.getHomeScore();
        int awayScore = result.getAwayScore();

        return switch (userBet.getType()) {
            case H2H -> {
                // Determine winner
                String winner = homeScore > awayScore ? result.getHomeTeam() : result.getAwayTeam();
                yield winner.equalsIgnoreCase(userBet.getTeam());
            }
            case SPREAD -> {
                boolean isHome = result.getHomeTeam().equalsIgnoreCase(userBet.getTeam());
                double pointDiff = (homeScore - awayScore) * (isHome ? 1 : -1);
                yield pointDiff > -userBet.getLine();
            }
            case TOTAL -> {
                double total = homeScore + awayScore;
                yield userBet.getIsOver() != null && userBet.getIsOver() ? total > userBet.getLine() : total < userBet.getLine();
            }
        };
    }
}
