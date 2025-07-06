import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./LandingPage.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import PlanSelection from "./PlanSelection.jsx";
import ForexProjectHub from "./fubex.jsx";

const isAuthenticated = localStorage.getItem("user");
const hasPlan = localStorage.getItem("plan");

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/plan" element={isAuthenticated ? <PlanSelection /> : <Navigate to="/login" />} />
        <Route path="/hub" element={isAuthenticated && hasPlan ? <ForexProjectHub /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}
