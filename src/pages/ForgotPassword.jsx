import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { resetPassword, showToast } = useAuth();
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setError("Please enter your email.");
      return;
    }

    setLoading(true);
    try {
      await resetPassword(trimmedEmail);
      setMessage("Password reset email sent! Check your inbox.");
      showToast("Password reset email sent!", "success");

      // Optional: redirect after 5 seconds
      setTimeout(() => navigate("/login"), 5000);
    } catch (err) {
      console.error("Reset password error:", err.code, err.message);
      if (err.code === "auth/user-not-found") setError("No user found with this email.");
      else if (err.code === "auth/invalid-email") setError("Invalid email address.");
      else setError("Failed to send reset email. Try again later.");
      showToast("Failed to send reset email.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 sm:p-10">
        <h2 className="text-3xl font-bold text-teal-700 mb-4 text-center">
          🔑 Reset Password
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Enter your registered email to receive a password reset link.
        </p>

        <form onSubmit={handleReset} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-12 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 placeholder-gray-400"
            disabled={loading}
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          {message && <p className="text-green-600 text-sm">{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-semibold shadow-lg hover:scale-105 transition-transform flex justify-center items-center"
          >
            {loading ? <LoadingSpinner small /> : "Send Reset Email"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600 text-sm">
          Remembered your password?{" "}
          <Link to="/login" className="text-teal-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
