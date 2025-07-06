import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSignup = () => {
    if (user.email && user.password) {
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/plan");
    } else {
      alert("Please fill out all fields");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <input className="border p-2 w-full mb-2 rounded" placeholder="Email" onChange={(e) => setUser({ ...user, email: e.target.value })} />
      <input className="border p-2 w-full mb-2 rounded" placeholder="Password" type="password" onChange={(e) => setUser({ ...user, password: e.target.value })} />
      <button className="bg-black text-white px-4 py-2 rounded w-full" onClick={handleSignup}>Sign Up</button>
      <p className="mt-4 text-center text-sm">Already have an account? <Link to="/login" className="text-blue-600">Log in</Link></p>
    </div>
  );
}
