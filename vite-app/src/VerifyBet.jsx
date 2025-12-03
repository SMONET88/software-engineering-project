import { supabase } from "./database/Login";

export const VerifyBet = async () => {

        const {
          data: { session },
        } = await supabase.auth.getSession();
        const userId = session.user.id;
        const response = await fetch(`http://localhost:8080/verify-bets`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(userId),
        });

        if (!response.ok) {
          throw new Error("Failed to get bet info");
        }
        console.log(`DATA HERE XXX: ${JSON.stringify(response)}`);

};
