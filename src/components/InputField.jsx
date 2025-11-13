import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InputField = ({ icon, placeholder, value, onChange, type = "text", disabled }) => (
  <div className="mt-4">
    <div className="relative">
      {icon && <FontAwesomeIcon icon={icon} className="absolute left-3 top-3 text-gray-400" />}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full h-14 pl-10 pr-4 border-none bg-white rounded-xl shadow-inner placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400/50 disabled:bg-gray-100 disabled:cursor-not-allowed transition duration-150"
      />
    </div>
  </div>
);

export default InputField;
