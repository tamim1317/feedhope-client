import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/available-foods');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-8 font-sans">
      <div className="text-center max-w-lg">
        <h1 className="text-9xl font-extrabold text-blue-900 mb-4 animate-bounce">
          404
        </h1>

        <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center justify-center">
          <AlertTriangle className="w-8 h-8 mr-3 text-red-600" /> Oops! Page Not Found
        </h2>

        <p className="text-gray-600 mb-8">
          The food you were looking for might have expired or the page doesn't exist. Let's get you back to the available listings!
        </p>

        <img
          src="https://placehold.co/400x200/F8D7DA/CC3333?text=Missing+Food"
          alt="Missing food illustration"
          className="mx-auto w-full max-w-sm rounded-lg shadow-xl mb-8"
        />

        <button
          onClick={handleBack}
          className="px-8 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition shadow-lg text-lg"
        >
          ← Back
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
