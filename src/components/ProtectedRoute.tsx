import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks/useAppDispatch';

const ProtectedRoute = () => {
  const { token } = useAppSelector((state) => state.auth);

  // If not authenticated, redirect to landing page
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // If authenticated, render child routes
  return <Outlet />;
};

export default ProtectedRoute; 