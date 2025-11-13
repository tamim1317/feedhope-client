import React from "react";

const Button = ({ children, onClick, className = "", disabled = false }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded bg-teal-600 text-white hover:bg-teal-700 transition ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
