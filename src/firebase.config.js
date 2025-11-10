// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDi4-ZduC1m-t2BA1bBLaakWSTdhYDTubU",
  authDomain: "feedhope-authentication.firebaseapp.com",
  projectId: "feedhope-authentication",
  storageBucket: "feedhope-authentication.firebasestorage.app",
  messagingSenderId: "349023407163",
  appId: "1:349023407163:web:08459a93698e06908ea01e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;