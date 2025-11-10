package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import java.util.List;

@JsonPropertyOrder({
    "id",
    "commence_time",
    "home_team",
    "away_team",
    "bookmakers"
})
public class PotentialBet {

    @JsonProperty("id")
    private String id;

    @JsonProperty("commence_time")
    private String commence_time;

    @JsonProperty("home_team")
    private String home_team;

    @JsonProperty("away_team")
    private String away_team;

    @JsonProperty("bookmakers")
    private List<Bookmaker> bookmakers;

    public PotentialBet() {}

    // Constructor
    public PotentialBet(String id, String commence_time, String home_team, String away_team, List<Bookmaker> bookmakers) {
        this.id = id;
        this.commence_time = commence_time;
        this.home_team = home_team;
        this.away_team = away_team;
        this.bookmakers = bookmakers;
    }

    // Getters
    public String getId() { 
        return id; 
    }
    public String getCommence_time() { 
        return commence_time; 
    }
    public String getHome_team() { 
        return home_team; 
    }
    public String getAway_team() { 
        return away_team; 
    }
    public List<Bookmaker> getBookmakers() { 
        return bookmakers; 
    }

    // Setters
    public void setId(String id) { 
        this.id = id; 
    }
    public void setCommence_time(String commence_time) { 
        this.commence_time = commence_time; 
    }
    public void setHome_team(String home_team) { 
        this.home_team = home_team; 
    }
    public void setAway_team(String away_team) { 
        this.away_team = away_team; 
    }
    public void setBookmakers(List<Bookmaker> bookmakers) { 
        this.bookmakers = bookmakers; 
    }

    @Override
    public String toString() {
        return "PotentialBet{" +
                "id='" + id + '\'' +
                ", commence_time='" + commence_time + '\'' +
                ", home_team='" + home_team + '\'' +
                ", away_team='" + away_team + '\'' +
                ", bookmakers=" + bookmakers +
                '}';
    }

    @JsonPropertyOrder({ "key", "title", "last_update", "markets" })
    public static class Bookmaker {

        @JsonProperty("key")
        private String key;

        @JsonProperty("title")
        private String title;

        @JsonProperty("last_update")
        private String last_update;

        @JsonProperty("markets")
        private List<Market> markets;

        public Bookmaker() {}

        public Bookmaker(String key, String title, String last_update, List<Market> markets) {
            this.key = key;
            this.title = title;
            this.last_update = last_update;
            this.markets = markets;
        }

        public String getKey() { 
            return key; 
        }
        public String getTitle() { 
            return title; 
        }
        public String getLast_update() { 
            return last_update; 
        }
        public List<Market> getMarkets() { 
            return markets; 
        }

        public void setKey(String key) { 
            this.key = key; 
        }
        public void setTitle(String title) { 
            this.title = title; 
        }
        public void setLast_update(String last_update) { 
            this.last_update = last_update; 
        }
        public void setMarkets(List<Market> markets) { 
            this.markets = markets; 
        }

        @Override
        public String toString() {
            return "Bookmaker{" +
                    "key='" + key + '\'' +
                    ", title='" + title + '\'' +
                    ", last_update='" + last_update + '\'' +
                    ", markets=" + markets +
                    '}';
        }
    }

    @JsonPropertyOrder({ "key", "last_update", "outcomes" })
    public static class Market {

        @JsonProperty("key")
        private String key;

        @JsonProperty("last_update")
        private String last_update;

        @JsonProperty("outcomes")
        private List<Outcome> outcomes;

        public Market() {}

        public Market(String key, String last_update, List<Outcome> outcomes) {
            this.key = key;
            this.last_update = last_update;
            this.outcomes = outcomes;
        }

        public String getKey() { 
            return key; 
        }
        public String getLast_update() { 
            return last_update; 
        }
        public List<Outcome> getOutcomes() { 
            return outcomes; 
        }

        public void setKey(String key) { 
            this.key = key; 
        }
        public void setLast_update(String last_update) { 
            this.last_update = last_update; 
        }
        public void setOutcomes(List<Outcome> outcomes) { 
            this.outcomes = outcomes; 
        }

        @Override
        public String toString() {
            return "Market{" +
                    "key='" + key + '\'' +
                    ", last_update='" + last_update + '\'' +
                    ", outcomes=" + outcomes +
                    '}';
        }
    }

    @JsonPropertyOrder({ "name", "price", "point" })
    public static class Outcome {

        @JsonProperty("name")
        private String name;

        @JsonProperty("price")
        private double price;

        @JsonProperty("point")
        private Double point; // nullable

        public Outcome() {}

        public Outcome(String name, double price, Double point) {
            this.name = name;
            this.price = price;
            this.point = point;
        }

        public String getName() { 
            return name; 
        }
        public double getPrice() { 
            return price; 
        }
        public Double getPoint() { 
            return point; 
        }

        public void setName(String name) { 
            this.name = name; 
        }
        public void setPrice(double price) { 
            this.price = price; 
        }
        public void setPoint(Double point) { 
            this.point = point; 
        }

        @Override
        public String toString() {
            return "Outcome{" +
                    "name='" + name + '\'' +
                    ", price=" + price +
                    ", point=" + point +
                    '}';
        }
    }
}
