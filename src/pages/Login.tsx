import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Button,
  Divider,
  Stack,
} from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { loginWithGoogle } from '../store/slices/authSlice';

interface LoginProps {
  onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogin = async (role: 'admin' | 'client') => {
    // Mock user data based on role
    const mockCredential = {
      user: {
        id: role === 'admin' ? 'admin-123' : 'client-456',
        email: `${role}@example.com`,
        name: `${role.charAt(0).toUpperCase() + role.slice(1)} User`,
        role: role,
        ...(role === 'client' && { clientId: 1 }), // Add clientId for client role
      },
      token: `mock_${role}_token`, // Create a mock token
    };

    try {
      await dispatch(loginWithGoogle(mockCredential)).unwrap();
      onClose();
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom align="center">
        Sign In
      </Typography>
      
      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle2" gutterBottom color="text.secondary" align="center">
          Developer Testing Options
        </Typography>
        
        <Stack spacing={2}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => handleLogin('admin')}
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              py: 1.5,
              '&:hover': {
                bgcolor: 'primary.dark',
              },
            }}
          >
            Sign In as Admin
          </Button>

          <Button
            variant="contained"
            fullWidth
            onClick={() => handleLogin('client')}
            sx={{
              bgcolor: 'secondary.main',
              color: 'white',
              py: 1.5,
              '&:hover': {
                bgcolor: 'secondary.dark',
              },
            }}
          >
            Sign In as Client
          </Button>
        </Stack>
      </Box>

      <Divider sx={{ my: 3 }}>OR</Divider>

      <GoogleLogin
        onSuccess={(credentialResponse) => {
          dispatch(loginWithGoogle(credentialResponse));
          navigate('/dashboard');
          onClose();
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </Paper>
  );
};

export default Login; 