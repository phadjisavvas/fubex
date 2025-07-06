import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center space-y-6">
      <h1 className="text-4xl font-bold">Welcome to Fubex</h1>
      <p className="text-gray-700 max-w-xl">
        Manage your trading projects, set weekly targets, and track performance with ease. Start by creating your free account.
      </p>
      <div className="flex gap-4">
        <Link to="/login" className="bg-black text-white px-6 py-2 rounded hover:opacity-80">
          Login
        </Link>
        <Link to="/signup" className="border border-black px-6 py-2 rounded hover:bg-gray-100">
          Sign Up
        </Link>
      </div>
    </div>
  );
}
