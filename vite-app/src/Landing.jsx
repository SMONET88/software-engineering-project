import { useNavigate } from "react-router-dom";
import Login from "./database/Login";


export const LandingPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/loggedIn");
  };
  
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", // vertical center
        alignItems: "center",
        paddingTop: 50,
      }}
    >
      <h1>Log in to access ScurryBetting</h1>
      <Login />
      <Button onClick={handleClick}>Sign Up</Button>
    </Box>
  );
};