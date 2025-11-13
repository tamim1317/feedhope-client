import React, { useEffect } from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const PrivateRoute = ({ requiredRole }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Show toast if logged in but lacks the required role
    if (user && requiredRole && user.role !== requiredRole) {
      toast.warn("You do not have permission to access this page.");
    }
  }, [user, requiredRole]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg font-medium">
        🔄 Checking Authentication...
      </div>
    );
  }

  if (!user) {
    // Not logged in → redirect to login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // Logged in but does not have required role → redirect home
    return <Navigate to="/" replace />;
  }

  // Authenticated and authorized
  return <Outlet />;
};

export default PrivateRoute;
