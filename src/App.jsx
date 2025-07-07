import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import supabase from './supabase';

import LandingPage from "./LandingPage.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import PlanSelection from "./PlanSelection.jsx";
import ForexProjectHub from "./fubex.jsx";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasPlan, setHasPlan] = useState(false);

  useEffect(() => {
    // Check session on first load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session?.user);
    });

    // Listen for login/logout
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session?.user);
    });

    // You can store plan info in Supabase later — for now we read it from localStorage
    const plan = localStorage.getItem("plan");
    setHasPlan(!!plan);

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/plan"
          element={isAuthenticated ? <PlanSelection /> : <Navigate to="/login" />}
        />
        <Route
          path="/hub"
          element={isAuthenticated && hasPlan ? <ForexProjectHub /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}
