// src/App.jsx
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./routes/PrivateRoute";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const AddFood = lazy(() => import("./pages/AddFood"));
const AvailableFoods = lazy(() => import("./pages/AvailableFoods"));
const FoodDetails = lazy(() => import("./pages/FoodDetails"));
const ManageMyFoods = lazy(() => import("./pages/ManageMyFoods"));
const UpdateFood = lazy(() => import("./pages/UpdateFood"));
const MyFoodRequests = lazy(() => import("./pages/MyFoodRequests"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));

// Scroll restoration component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
};

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-r from-red-50 to-teal-50">
        <BrowserRouter>
          <ScrollToTop />
          <Navbar />
          <Suspense
            fallback={
              <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg font-medium">
                🔄 Loading...
              </div>
            }
          >
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/available-foods" element={<AvailableFoods />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              {/* Private Routes */}
              <Route element={<PrivateRoute />}>
                <Route path="/add-food" element={<AddFood />} />
                <Route path="/food/:id" element={<FoodDetails />} />
                <Route path="/my-food-requests" element={<MyFoodRequests />} />
                <Route path="/update-food/:id" element={<UpdateFood />} />
                <Route path="/manage-my-foods" element={<ManageMyFoods />} />
              </Route>

              {/* Catch-all 404 Page */}
              <Route
                path="*"
                element={<ErrorPage message="Page not found. Please check the URL." />}
              />
            </Routes>
          </Suspense>
          <Footer />
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
