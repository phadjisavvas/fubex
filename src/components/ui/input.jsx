import React from "react";

export function Input(props) {
  return (
    <input
      {...props}
      style={{
        padding: "0.5rem",
        border: "1px solid #ccc",
        borderRadius: "4px",
        width: "100%",
        marginTop: "0.5rem",
        marginBottom: "1rem"
      }}
    />
  );
}
