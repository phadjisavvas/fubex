import React from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function PlanSelection() {
  const navigate = useNavigate();

  const selectPlan = async (plan) => {
  if (plan === "Free") {
    localStorage.setItem("plan", plan);
    navigate("/hub");
  } else if (plan === "Pro") {
    const stripe = await stripePromise;

    const res = await fetch("https://fubex-backend.onrender.com/create-checkout-session", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ plan })
    });

    const session = await res.json();
    await stripe.redirectToCheckout({ sessionId: session.id });
  }
};

  return (
    <div className="p-4 max-w-md mx-auto space-y-4">
      <h2 className="text-2xl font-bold">Choose Your Plan</h2>
      <div className="flex flex-col gap-2">
        <button
          className="border p-4 rounded hover:bg-gray-100"
          onClick={() => selectPlan("Free")}
        >
          Free Plan
        </button>
        <button
          className="border p-4 rounded hover:bg-gray-100"
          onClick={() => selectPlan("Pro")}
        >
          Pro Plan
        </button>
      </div>
    </div>
  );
}
