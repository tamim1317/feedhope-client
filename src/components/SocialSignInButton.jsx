import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SocialSignInButton = ({ icon, onClick, label }) => (
  <button
    onClick={onClick}
    className="w-full h-14 flex items-center justify-center bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 border border-gray-100 hover:border-gray-200 mt-4"
  >
    {icon && <FontAwesomeIcon icon={icon} className="text-2xl mr-3" />}
    <span className="text-gray-700 font-medium">{label}</span>
  </button>
);

export default SocialSignInButton;
