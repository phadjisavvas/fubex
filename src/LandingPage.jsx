import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <header className="bg-black text-white py-12 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Fubex</h1>
        <p className="text-lg max-w-2xl mx-auto">
          The all-in-one platform to manage your forex trading plans, set targets, and track your performance over time.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Link to="/login" className="bg-white text-black px-6 py-2 rounded font-semibold hover:opacity-90">Login</Link>
          <Link to="/signup" className="border border-white px-6 py-2 rounded font-semibold hover:bg-white hover:text-black">Sign Up</Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 px-4 text-center bg-gray-50 flex-1">
        <h2 className="text-2xl font-bold mb-8">Why Traders Love Fubex</h2>
        <div className="grid sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="p-4 shadow rounded bg-white">
            <h3 className="font-bold text-lg mb-2">Task Management</h3>
            <p className="text-sm text-gray-700">Create, assign, and track your trading tasks with deadlines and statuses.</p>
          </div>
          <div className="p-4 shadow rounded bg-white">
            <h3 className="font-bold text-lg mb-2">Weekly Target Tracking</h3>
            <p className="text-sm text-gray-700">Set specific weekly trading goals for yourself or your team.</p>
          </div>
          <div className="p-4 shadow rounded bg-white">
            <h3 className="font-bold text-lg mb-2">Backtesting Logs</h3>
            <p className="text-sm text-gray-700">Document and review your strategies using structured test logs.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-12 px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to improve your trading discipline?</h2>
        <p className="text-gray-600 mb-6">Sign up now and start managing your trading workflow more effectively.</p>
        <Link to="/signup" className="bg-black text-white px-8 py-3 rounded text-lg font-semibold hover:opacity-90">
          Get Started
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-6 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} Fubex. All rights reserved.
      </footer>
    </div>
  );
}
