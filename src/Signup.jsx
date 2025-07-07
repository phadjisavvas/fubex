import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import supabase from './supabase';

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert("Signup failed: " + error.message);
    } else {
      navigate("/plan");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <input className="border p-2 w-full mb-2 rounded" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input className="border p-2 w-full mb-2 rounded" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button className="bg-black text-white px-4 py-2 rounded w-full" onClick={handleSignup}>Sign Up</button>
      <p className="mt-4 text-center text-sm">Already have an account? <Link to="/login" className="text-blue-600">Log in</Link></p>
    </div>
  );
}