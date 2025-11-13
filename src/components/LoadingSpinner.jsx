import React from "react";

const LoadingSpinner = ({ size = "w-10 h-10" }) => (
  <div className="flex justify-center items-center py-12">
    <div
      className={`${size} border-4 border-gray-200 border-t-teal-500 rounded-full animate-spin`}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

export default LoadingSpinner;
