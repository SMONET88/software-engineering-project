package gettingdata;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

public class Methods {

    /**
     * Read Getting-Data/exampleScores.json and return an array of String entries.
     * If the JSON is an array, each element is returned as a string. If it's an
     * object, a single-element array containing the JSON object string is returned.
     */
    public static String[] getScores() {
        Path path = Paths.get("exampleScores.json");
        try {
            String content = Files.readString(path);

            JSONParser parser = new JSONParser();
            Object obj = parser.parse(content);

            if (obj instanceof JSONArray) {
                JSONArray arr = (JSONArray) obj;
                List<String> out = new ArrayList<>();

                for (int i = 0; i < arr.size(); i++) {
                    Object gameObj = arr.get(i);
                    if (!(gameObj instanceof JSONObject))
                        continue;
                    JSONObject game = (JSONObject) gameObj;

                    Object scoresObj = game.get("scores");
                    if (scoresObj == null) {
                        out.add("null");
                        continue;
                    }
                    if (!(scoresObj instanceof JSONArray)) {
                        out.add(scoresObj.toString());
                        continue;
                    }

                    JSONArray scores = (JSONArray) scoresObj;
                    // Build a readable string like "Team A 33 vs Team B 26"
                    StringBuilder sb = new StringBuilder();
                    for (int j = 0; j < scores.size(); j++) {
                        Object s = scores.get(j);
                        if (!(s instanceof JSONObject))
                            continue;
                        JSONObject teamScore = (JSONObject) s;
                        String name = teamScore.get("name") == null ? "?" : teamScore.get("name").toString();
                        String score = teamScore.get("score") == null ? "?" : teamScore.get("score").toString();
                        if (j > 0)
                            sb.append(" vs ");
                        sb.append(name).append(" ").append(score);
                    }
                    out.add(sb.toString());
                }

                return out.toArray(new String[0]);

            } else if (obj instanceof JSONObject) {
                // Return single-element array with the whole JSON object as string
                return new String[] { ((JSONObject) obj).toJSONString() };
            } else {
                // Fallback: return the raw content as single element
                return new String[] { content };
            }

        } catch (IOException | ParseException e) {
            e.printStackTrace();
            return new String[0];
        }
    }

}

    
