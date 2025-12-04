import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail
} from "firebase/auth";
import { toast } from "react-toastify";
import app from "../firebase.config";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);

  const showToast = (message, type = "info") => toast[type](message);

  // LOGIN
  const loginUser = async (email, password) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      showToast("Login successful!", "success");
      return res;
    } catch (err) {
      showToast(err.message, "error");
      throw err;
    }
  };

  // REGISTER
  const registerUser = async (email, password, displayName, photoURL) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName, photoURL });
      }
      showToast("Registration successful!", "success");
      return res;
    } catch (err) {
      showToast(err.message, "error");
      throw err;
    }
  };

  // LOGOUT
  const logoutUser = async () => {
    try {
      await signOut(auth);
      showToast("Logged out successfully!", "success");
    } catch (err) {
      showToast("Logout failed", "error");
      throw err;
    }
  };

  // GOOGLE LOGIN
  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      showToast("Logged in with Google!", "success");
    } catch (err) {
      showToast(err.message, "error");
      throw err;
    }
  };

  // PASSWORD RESET
  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      showToast("Password reset email sent!", "success");
    } catch (err) {
      showToast(err.message, "error");
      throw err;
    }
  };

  // GET FIREBASE TOKEN for API
  const getToken = async () => {
    if (!user) return null;
    return await user.getIdToken();
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      loginUser,
      registerUser,
      logoutUser,
      signInWithGoogle,
      resetPassword,
      showToast,
      getToken
    }}>
      {children}
    </AuthContext.Provider>
  );
};
