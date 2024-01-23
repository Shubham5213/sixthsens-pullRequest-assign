import { Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import "./App.css";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import AuthContext from "./context/authContext";
import PrRequestsPage from "./pages/PrRequestsPage";
import MyPRsPage from "./pages/MyPRsPage.js";

const App = () => {
  const authContext = useContext(AuthContext);
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          exact
          element={
            authContext.isLoggedIn ? <Navigate to="home" /> : <AuthPage />
          }
        />
        <Route
          path="/home"
          element={authContext.isLoggedIn ? <HomePage /> : <Navigate to="/" />}
        />
        <Route
          path="/pr-requests"
          element={
            authContext.isLoggedIn ? <PrRequestsPage /> : <Navigate to="/" />
          }
        />
        <Route
          path="/my-prs"
          element={authContext.isLoggedIn ? <MyPRsPage /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
};

export default App;
