// src/pages/Register.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faUser, faEnvelope, faLock, faCamera } from "@fortawesome/free-solid-svg-icons";

const InputField = ({ icon, placeholder, value, onChange, type = "text", disabled }) => (
  <div className="mt-4">
    <div className="relative">
      <FontAwesomeIcon icon={icon} className="absolute left-3 top-3 text-gray-400" />
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

// Social Sign-In Button
const SocialSignInButton = ({ icon, onClick, text }) => (
  <button
    onClick={onClick}
    className="w-full h-14 flex items-center justify-center bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 border border-gray-100 hover:border-gray-200 mt-4"
  >
    <FontAwesomeIcon icon={icon} className="text-2xl mr-3" />
    <span className="text-gray-700 font-medium">{text}</span>
  </button>
);

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { registerUser, signInWithGoogle, showToast } = useAuth();
  const navigate = useNavigate();

  // Validate all fields
  const validate = () => {
    const errors = {};
    if (!name.trim()) errors.name = "Full name is required.";
    if (!email.trim()) errors.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = "Invalid email address.";
    if (!password) errors.password = "Password is required.";
    else if (password.length < 6) errors.password = "Password must be at least 6 characters.";
    else if (!/[A-Z]/.test(password)) errors.password = "Password must include 1 uppercase letter.";
    else if (!/[a-z]/.test(password)) errors.password = "Password must include 1 lowercase letter.";
    return errors;
  };

  const isFormValid = Object.keys(formErrors).length === 0 && name && email && password;

  // Handle registration
  const handleRegister = async (e) => {
    e.preventDefault();
    const errors = validate();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    try {
      await registerUser(email.trim(), password, name.trim(), photoURL.trim());
      showToast("Registration successful!", "success");
      navigate("/", { replace: true });
    } catch (err) {
      const message =
        err.code === "auth/email-already-in-use"
          ? "Email already registered."
          : "Registration failed.";
      showToast(message, "error");
    } finally {
      setLoading(false);
    }
  };

  // Handle Google sign-in
  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      showToast("Signed in with Google!", "success");
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Google sign-in error:", err);
      showToast("Google sign-in failed.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setFormErrors(validate());
  }, [name, email, password]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100 font-sans">
      <div className="w-full max-w-sm p-8 bg-white rounded-3xl shadow-2xl">
        <h2 className="text-center text-4xl font-extrabold text-[#0069B5] mb-6">Create Account</h2>

        {photoURL && (
          <div className="w-24 h-24 mx-auto mb-4">
            <img
              src={photoURL}
              alt="Avatar Preview"
              className="w-full h-full object-cover rounded-full border-2 border-gray-300 shadow"
            />
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <InputField icon={faUser} placeholder="Full Name" value={name} onChange={setName} />
          {formErrors.name && <p className="text-red-600 text-xs">{formErrors.name}</p>}

          <InputField icon={faEnvelope} placeholder="E-mail" value={email} onChange={setEmail} type="email" />
          {formErrors.email && <p className="text-red-600 text-xs">{formErrors.email}</p>}

          <InputField icon={faCamera} placeholder="Photo URL" value={photoURL} onChange={setPhotoURL} />

          <InputField icon={faLock} placeholder="Password" type="password" value={password} onChange={setPassword} />
          {formErrors.password && <p className="text-red-600 text-xs">{formErrors.password}</p>}

          <button
            type="submit"
            disabled={loading || !isFormValid}
            className="w-full h-14 mt-4 bg-gradient-to-r from-blue-400 to-teal-500 hover:from-blue-500 hover:to-teal-600 text-white font-semibold rounded-xl shadow-lg disabled:from-gray-400 disabled:to-gray-500"
          >
            {loading ? "Registering..." : "Register Account"}
          </button>
        </form>

        <div className="mt-6 text-center text-gray-900 font-bold">Or</div>
        <SocialSignInButton icon={faGoogle} onClick={handleGoogleSignIn} text="Sign in with Google" />

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 font-semibold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
