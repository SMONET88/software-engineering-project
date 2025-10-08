package gettingdata;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Arrays;

public class Main {

    public static void main(String[] args) {
        String apiKey = "7f5b6fde74732dbe086924bcd9778f61";
        String getURL = "https://api.the-odds-api.com/v4/sports/americanfootball_nfl/odds/?apiKey=" + apiKey
                + "&regions=us&markets=h2h";

        try {
            // 1. Create the HttpClient
            // HttpClient client = HttpClient.newHttpClient();

            // // 2. Build the request
            // HttpRequest request = HttpRequest.newBuilder()
            // .uri(URI.create(getURL))
            // .GET() // optional, GET is default
            // .build();

            // // 3. Send the request and get the response
            // HttpResponse<String> response = client.send(request,
            // HttpResponse.BodyHandlers.ofString());

            // // 4. Print status code and body
            // System.out.println("Status code: " + response.statusCode());
            // System.out.println("Response body: " + response.body());

            String test = Arrays.toString(Methods.getScores());
            System.out.println("SCORES HERE:" + test);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
