package com.example.demo.service;

import com.example.demo.model.GameResult;
import com.example.demo.model.User;
import com.example.demo.model.UserBet;
import com.example.demo.repository.UserBetRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class BetEvaluatorService {

    private final UserBetRepository userBetRepository;
    private final UserRepository userRepository;
    private final GameDataLoader gameDataLoader;

    @Autowired
    public BetEvaluatorService(UserBetRepository userBetRepository,
                               UserRepository userRepository,
                               GameDataLoader gameDataLoader) {
        this.userBetRepository = userBetRepository;
        this.userRepository = userRepository;
        this.gameDataLoader = gameDataLoader;
    }

    /**
     * Verify all pending bets for a specific user.
     * @param userId UUID of the user whose bets to evaluate
     */
    public void verifyPendingBets(UUID userId) {
        // 1. Fetch pending bets from the database
        List<UserBet> pendingBets = userBetRepository.findByUserIdAndStatus(userId, "PENDING");

        // 2. Get the latest game results from the loader
        List<GameResult> gameResults = gameDataLoader.getGameResults();

        for (UserBet bet : pendingBets) {
            // 3. Find the matching game result
            GameResult result = findMatchingGameResult(bet, gameResults);
            if (result == null || !result.isCompleted()) continue; // skip if no result yet

            // 4. Determine outcome
            String outcome = determineOutcome(bet, result);

            // 5. Update bet status
            bet.setStatus(outcome);
            userBetRepository.save(bet);

            // 6. Pay winnings if bet won
            if ("WIN".equals(outcome)) {
                payOut(bet);
            }
        }
    }

    private GameResult findMatchingGameResult(UserBet bet, List<GameResult> results) {
        return results.stream()
                .filter(r -> r.getGameId().equals(bet.getGameId()))
                .findFirst()
                .orElse(null);
    }

    private String determineOutcome(UserBet bet, GameResult result) {
        if (!bet.getGameId().equals(result.getGameId())) {
            return "PENDING"; // can't evaluate if game IDs don't match, though they should
        }

        boolean hit = false;

        switch (bet.getType()) {
            case H2H -> {
                // determine winner
                String winner = result.getHomeScore() > result.getAwayScore() ? result.getHomeTeam() : result.getAwayTeam();
                hit = winner.equalsIgnoreCase(bet.getTeam());
            }
            case SPREAD -> {
                boolean isHome = result.getHomeTeam().equalsIgnoreCase(bet.getTeam());
                double pointDiff = (result.getHomeScore() - result.getAwayScore()) * (isHome ? 1 : -1);
                hit = pointDiff > -bet.getLine();
            }
            case TOTAL -> {
                double total = result.getHomeScore() + result.getAwayScore();
                if (bet.getIsOver() != null) {
                    hit = bet.getIsOver() ? total > bet.getLine() : total < bet.getLine();
                }
            }
        }

        if (hit) return "WIN";
        if (result.getHomeScore() == result.getAwayScore()) return "PUSH";
        return "LOSS";
    }

    private void payOut(UserBet bet) {
        User user = userRepository.findById(bet.getUserId()).orElseThrow();
        double winnings = calculateWinnings(bet.getAmount(), bet.getOdds());

        // Round up to the nearest whole number
        long roundedWinnings = (long) Math.ceil(winnings);

        user.setBalance(user.getBalance() + roundedWinnings);
        userRepository.save(user);
    }

    private double calculateWinnings(double amount, double odds) {
        // Example for American odds format
        if (odds > 0) {
            return amount * (odds / 100.0);
        } else {
            return amount * (100.0 / Math.abs(odds));
        }
    }
}