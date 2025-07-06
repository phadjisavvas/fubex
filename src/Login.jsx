import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const saved = JSON.parse(localStorage.getItem("user"));
    if (saved?.email === email && saved?.password === password) {
      navigate(localStorage.getItem("plan") ? "/hub" : "/plan");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <input className="border p-2 w-full mb-2 rounded" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input className="border p-2 w-full mb-2 rounded" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button className="bg-black text-white px-4 py-2 rounded w-full" onClick={handleLogin}>Login</button>
      <p className="mt-4 text-center text-sm">Don't have an account? <Link to="/signup" className="text-blue-600">Sign up</Link></p>
    </div>
  );
}
