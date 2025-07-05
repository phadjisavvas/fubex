import React from "react";

export function Button({ children, ...props }) {
  return (
    <button
      {...props}
      style={{
        padding: "0.5rem 1rem",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}
