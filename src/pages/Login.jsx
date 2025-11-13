import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useAuth } from "../context/AuthContext";
import InputField from "../components/InputField";
import SocialSignInButton from "../components/SocialSignInButton";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const { loginUser, signInWithGoogle, user, showToast } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const validateForm = () => {
    setFormError("");
    const emailRegex = /\S+@\S+\.\S+/;
    if (!email || !password) return "Please enter both email and password.";
    if (!emailRegex.test(email)) return "Please enter a valid email address.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    return null;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setFormError(validationError);
      showToast(validationError, "error");
      return;
    }

    setLoading(true);
    try {
      await loginUser(email, password);
      showToast("Logged in successfully!", "success");
      navigate("/");
    } catch (err) {
      console.error(err);
      const message =
        err.code === "auth/user-not-found"
          ? "User not found. Please register first."
          : "Invalid email or password.";
      setFormError(message);
      showToast(message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setFormError("");
    setLoading(true);
    try {
      await signInWithGoogle();
      showToast("Signed in with Google!", "success");
      navigate("/");
    } catch (err) {
      console.error(err);
      const message = "Google sign-in failed. Please try again.";
      setFormError(message);
      showToast(message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <div className="w-full max-w-sm p-8 bg-white rounded-3xl shadow-2xl">
        <h2 className="text-center text-4xl font-extrabold text-[#0069B5] mb-6">
          Sign In
        </h2>

        <form onSubmit={handleLogin} className="space-y-4" aria-busy={loading}>
          <InputField
            placeholder="Email"
            value={email}
            onChange={setEmail}
            type="email"
            disabled={loading}
          />
          <InputField
            placeholder="Password"
            value={password}
            onChange={setPassword}
            type="password"
            disabled={loading}
          />

          <div className="flex justify-end text-sm mt-1">
            <Link
              to="/forgot-password"
              className="text-blue-500 hover:text-blue-700 font-medium"
            >
              Forgot Password?
            </Link>
          </div>

          {formError && (
            <p className="text-red-600 text-center p-2 rounded-lg bg-red-50">
              {formError}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 mt-4 bg-gradient-to-r from-blue-400 to-teal-500 hover:from-blue-500 hover:to-teal-600 text-white font-semibold rounded-xl shadow-lg disabled:from-gray-400 disabled:to-gray-500 flex items-center justify-center"
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            ) : null}
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center font-bold text-gray-900">Or</div>
        <div className="mt-4">
          <SocialSignInButton
            icon={faGoogle}
            onClick={handleGoogleSignIn}
            label="Sign in with Google"
          />
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-500 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
