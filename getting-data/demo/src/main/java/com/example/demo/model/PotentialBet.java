package com.example.demo.model;

import java.util.List;

public class PotentialBet {

    private String id;
    private String commenceTime;
    private String homeTeam;
    private String awayTeam;
    private List<Bookmaker> bookmakers;

    public PotentialBet() {}

    public PotentialBet(String id, String commenceTime, String homeTeam, String awayTeam, List<Bookmaker> bookmakers) {
        this.id = id;
        this.commenceTime = commenceTime;
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
        this.bookmakers = bookmakers;
    }

    public String getId() { return id; }
    public String getCommenceTime() { return commenceTime; }
    public String getHomeTeam() { return homeTeam; }
    public String getAwayTeam() { return awayTeam; }
    public List<Bookmaker> getBookmakers() { return bookmakers; }

    public void setId(String id) { this.id = id; }
    public void setCommenceTime(String commenceTime) { this.commenceTime = commenceTime; }
    public void setHomeTeam(String homeTeam) { this.homeTeam = homeTeam; }
    public void setAwayTeam(String awayTeam) { this.awayTeam = awayTeam; }
    public void setBookmakers(List<Bookmaker> bookmakers) { this.bookmakers = bookmakers; }

    @Override
    public String toString() {
        return "PotentialBet{" +
                "id='" + id + '\'' +
                ", commenceTime='" + commenceTime + '\'' +
                ", homeTeam='" + homeTeam + '\'' +
                ", awayTeam='" + awayTeam + '\'' +
                ", bookmakers=" + bookmakers +
                '}';
    }

    public static class Bookmaker {
        private String key;
        private String title;
        private String lastUpdate;
        private List<Market> markets;

        public Bookmaker() {}

        public Bookmaker(String key, String title, String lastUpdate, List<Market> markets) {
            this.key = key;
            this.title = title;
            this.lastUpdate = lastUpdate;
            this.markets = markets;
        }

        public String getKey() { return key; }
        public String getTitle() { return title; }
        public String getLastUpdate() { return lastUpdate; }
        public List<Market> getMarkets() { return markets; }

        public void setKey(String key) { this.key = key; }
        public void setTitle(String title) { this.title = title; }
        public void setLastUpdate(String lastUpdate) { this.lastUpdate = lastUpdate; }
        public void setMarkets(List<Market> markets) { this.markets = markets; }

        @Override
        public String toString() {
            return "Bookmaker{" +
                    "key='" + key + '\'' +
                    ", title='" + title + '\'' +
                    ", lastUpdate='" + lastUpdate + '\'' +
                    ", markets=" + markets +
                    '}';
        }
    }

    public static class Market {
        private String key;
        private String lastUpdate;
        private List<Outcome> outcomes;

        public Market() {}

        public Market(String key, String lastUpdate, List<Outcome> outcomes) {
            this.key = key;
            this.lastUpdate = lastUpdate;
            this.outcomes = outcomes;
        }

        public String getKey() { return key; }
        public String getLastUpdate() { return lastUpdate; }
        public List<Outcome> getOutcomes() { return outcomes; }

        public void setKey(String key) { this.key = key; }
        public void setLastUpdate(String lastUpdate) { this.lastUpdate = lastUpdate; }
        public void setOutcomes(List<Outcome> outcomes) { this.outcomes = outcomes; }

        @Override
        public String toString() {
            return "Market{" +
                    "key='" + key + '\'' +
                    ", lastUpdate='" + lastUpdate + '\'' +
                    ", outcomes=" + outcomes +
                    '}';
        }
    }

    public static class Outcome {
        private String name;
        private double price;

        public Outcome() {}

        public Outcome(String name, double price) {
            this.name = name;
            this.price = price;
        }

        public String getName() { return name; }
        public double getPrice() { return price; }

        public void setName(String name) { this.name = name; }
        public void setPrice(double price) { this.price = price; }

        @Override
        public String toString() {
            return "Outcome{" +
                    "name='" + name + '\'' +
                    ", price=" + price +
                    '}';
        }
    }
}
