import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../hooks/useAppDispatch';

const AuthWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Only redirect if user is not authenticated and trying to access protected routes
    if (!token && location.pathname !== '/' && location.pathname !== '/demo') {
      navigate('/');
    }
  }, [token, navigate, location.pathname]);

  return <>{children}</>;
};

export default AuthWrapper; 