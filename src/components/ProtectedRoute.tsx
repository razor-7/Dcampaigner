import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../hooks/useAppDispatch';

const clientRestrictedPaths = ['/clients'];

const ProtectedRoute = () => {
  const { token, user } = useAppSelector((state) => state.auth);
  const location = useLocation();

  // If not authenticated, redirect to landing page
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Check if client is trying to access restricted paths
  if (user?.role === 'client' && clientRestrictedPaths.some(path => location.pathname.startsWith(path))) {
    return <Navigate to="/dashboard" replace />;
  }

  // If authenticated, render child routes
  return <Outlet />;
};

export default ProtectedRoute; 