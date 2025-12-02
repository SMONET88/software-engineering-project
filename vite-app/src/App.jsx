import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./database/Login";
import MainPage from "./MainPage";

function App() {
  //const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/loggedIn" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
