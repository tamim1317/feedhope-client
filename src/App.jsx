import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./routes/PrivateRoute";
import AvailableFoods from "./pages/AvailableFoods";
import FoodDetails from "./pages/FoodDetails";
import AddFood from "./pages/AddFood";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ManageMyFoods = lazy(() => import("./pages/ManageMyFoods"));
const MyFoodRequests = lazy(() => import("./pages/MyFoodRequests"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));

// Scroll restoration component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => window.scrollTo({ top: 0, behavior: "smooth" }), [pathname]);
  return null;
};

function App() {
  return (
    <AuthProvider>
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
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/available-foods" element={<AvailableFoods />} />
            <Route path="/food/:id" element={<FoodDetails />} />

            {/* Private Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/add-food" element={<AddFood />} />
              <Route path="/manage-my-foods" element={<ManageMyFoods />} />
              <Route path="/my-food-requests" element={<MyFoodRequests />} />
            </Route>

            {/* Catch-all 404 Page */}
            <Route path="*" element={<ErrorPage message="Page not found. Please check the URL." />} />
          </Routes>
        </Suspense>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
