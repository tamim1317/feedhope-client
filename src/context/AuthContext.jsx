import { createContext, useContext, useEffect, useState } from 'react';
import { 
    getAuth, 
    onAuthStateChanged, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut,
    GoogleAuthProvider,
    signInWithPopup 
} from 'firebase/auth'; 

const AuthContext = createContext(null);
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [firebaseToken, setFirebaseToken] = useState(null);

    // --- Authentication Functions ---
    
    const registerUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const logoutUser = () => {
        setLoading(true);
        return signOut(auth);
    };

    // --- Token Management ---

    useEffect(() => {
        // login, logout, reload
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                try {
                    // Fetch ID token
                    const token = await currentUser.getIdToken(true);
                    setFirebaseToken(token);

                } catch (error) {
                    console.error("Failed to get Firebase token:", error);
                    setFirebaseToken(null);
                }
            } else {
                setFirebaseToken(null);
            }
            setLoading(false);
        });

        // Cleanup subscription
        return () => unsubscribe();
    }, []);

    // --- Context Value ---

    const authInfo = {
        user,
        loading,
        firebaseToken, // Export the token for API service
        registerUser,
        loginUser,
        googleLogin,
        logoutUser
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};