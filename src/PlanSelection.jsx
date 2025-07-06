import React from "react";
import { useNavigate } from "react-router-dom";

export default function PlanSelection() {
  const navigate = useNavigate();

  const selectPlan = (plan) => {
    localStorage.setItem("plan", plan);
    navigate("/hub");
  };

  return (
    <div className="p-4 max-w-md mx-auto space-y-4">
      <h2 className="text-2xl font-bold">Choose Your Plan</h2>
      <div className="flex flex-col gap-2">
        <button className="border p-4 rounded hover:bg-gray-100" onClick={() => selectPlan("Free")}>Free Plan</button>
        <button className="border p-4 rounded hover:bg-gray-100" onClick={() => selectPlan("Pro")}>Pro Plan</button>
      </div>
    </div>
  );
}
