import React, { useEffect } from "react";
import { auth } from "./firebase.config";


function App() {
  useEffect(() => {
    console.log("Firebase Auth:", auth);
  }, []);

  return <div>Check the console for Firebase Auth object</div>;
}

export default App;
