//import "./index.css";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { Typography, Box } from "@mui/material";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY,
);

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [session, setSession] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error getting session:", error.message);
      } else {
        setSession(data.session);
      }
    };

    getSession();

    // Subscribe to auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Check URL params on initial render
  const params = new URLSearchParams(window.location.search);
  const hasTokenHash = params.get("token_hash");

  const [verifying, setVerifying] = useState(!!hasTokenHash);
  const [authError, setAuthError] = useState(null);
  const [authSuccess, setAuthSuccess] = useState(false);
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/loggedIn");
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });
    if (error) {
      alert(error.error_description || error.message);
    } else {
      alert("Check your email for the login link!");
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  // Show verification state
  if (verifying) {
    return (
      <div>
        <h1>Authentication</h1>
        <p>Confirming your magic link...</p>
        <p>Loading...</p>
      </div>
    );
  }

  // Show auth error
  if (authError) {
    return (
      <div>
        <h1>Authentication</h1>
        <p>✗ Authentication failed</p>
        <p>{authError}</p>
        <button
          onClick={() => {
            setAuthError(null);
            window.history.replaceState({}, document.title, "/");
          }}
        >
          Return to login
        </button>
      </div>
    );
  }

  // Show auth success (briefly before session loads)
  if (authSuccess && !session) {
    return (
      <div>
        <h1>Authentication</h1>
        <p>✓ Authentication successful!</p>
        <p>Loading your account...</p>
      </div>
    );
  }

  // If user is logged in, show welcome screen
  useEffect(() => {
    if (session) {
      const insertUser = async () => {
        const { error } = await supabase.from("users").upsert([
          {
            id: session.user.id,
            email: session.user.email,
            balance: 100,
          },
        ]);
        if (error) {
          console.error("Error inserting user:", error);
        } else {
          console.log("User row created in users table");
        }
      };
      // const getUserId = async
      insertUser();
    }
  }, [session]);

  if (!session) {
    // Show login form
    return (
      <div>
        <h1>Supabase + React</h1>
        <p>Sign in via magic link with your email below</p>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Your email"
            value={email}
            required={true}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button disabled={loading}>
            {loading ? <span>Loading</span> : <span>Send magic link</span>}
          </button>
        </form>
      </div>
    );
  }

  return (
    <Box sx={{
       display: "flex",
       flexDirection: "column",   // stack items vertically
       alignItems: "center",      // center horizontally
       justifyContent: "center",  // center vertically
       minHeight: "100vh",        // take full viewport height
       textAlign: "center",       // center text inside elements
     }}>
      <div>
        <h1>Welcome!</h1>
        <Typography>You are logged in as: {session.user.email}</Typography>
        <button onClick={handleClick}>Acess App</button>
        <button onClick={handleLogout}>Sign Out</button>
      </div>
    </Box>
  );
}
