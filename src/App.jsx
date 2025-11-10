import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddFood from "./pages/AddFood";
import AvailableFoods from "./pages/AvailableFoods";
import FoodDetails from "./pages/FoodDetails";
import ManageMyFoods from "./pages/ManageMyFoods";
import UpdateFood from "./pages/UpdateFood";
import ErrorPage from "./components/ErrorPage";

// Auth Provider (Firebase)
import { AuthProvider } from "./context/AuthContext";

// Private Route Component
import PrivateRoute from "./routes/PrivateRoute";




function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/available-foods" element={<AvailableFoods />} />

          {/* Private Routes */}
          <Route
            path="/add-food"
            element={
              <PrivateRoute>
                <AddFood />
              </PrivateRoute>
            }
          />
          <Route
            path="/food/:id"
            element={
              <PrivateRoute>
                <FoodDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/manage-my-foods"
            element={
              <PrivateRoute>
                <ManageMyFoods />
              </PrivateRoute>
            }
          />

          <Route 
            path="/foods/update/:foodId"
            element={
            <UpdateFood />} 
          />

          {/* ErrorPage */}
          <Route path="*" element={<ErrorPage/>} />
        </Routes>

        <Footer />
      </Router>
      </AuthProvider>
  );
}

export default App;
