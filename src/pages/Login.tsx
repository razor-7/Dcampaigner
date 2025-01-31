import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Button,
  Divider,
  CircularProgress,
  Alert,
} from '@mui/material';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { loginWithGoogle } from '../store/slices/authSlice';
import { logger } from '../utils/logger';

interface LoginProps {
  onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  // Simulated Google login response
  const mockGoogleCredential = {
    credential: 'mock_credential',
    user: {
      id: '123',
      email: 'demo@example.com',
      name: 'Demo User',
      picture: 'https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg',
    },
    token: 'mock_token_123',
  };

  const handleLogin = async () => {
    try {
      await dispatch(loginWithGoogle(mockGoogleCredential)).unwrap();
      onClose();
      navigate('/dashboard'); // Always navigate to dashboard after successful login
    } catch (error) {
      logger.error('Login failed:', error);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      // For development, use mock credentials instead of actual Google response
      await handleLogin();
    } catch (error) {
      logger.error('Google login failed:', error);
    }
  };

  const handleGoogleError = () => {
    logger.error('Google login failed');
  };

  return (
    <Paper
      sx={{
        p: 4,
        width: '100%',
        maxWidth: 400,
        margin: 'auto',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Welcome to DCampaigner
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
        Sign in to manage your campaigns
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ mb: 3 }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            {/* Real Google Login button */}
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              theme="outline"
              size="large"
              width="100%"
              useOneTap
            />
            {/* Development bypass button */}
            <Button
              variant="contained"
              fullWidth
              onClick={handleLogin}
              sx={{
                mt: 2,
                bgcolor: '#4285F4',
                color: 'white',
                py: 1.5,
                '&:hover': {
                  bgcolor: '#3367D6',
                },
              }}
            >
              Quick Sign In (Dev Mode)
            </Button>
          </>
        )}
      </Box>

      <Divider sx={{ my: 2 }}>OR</Divider>

      <Button
        variant="outlined"
        fullWidth
        onClick={() => navigate('/demo')}
        disabled={loading}
      >
        Try Demo
      </Button>
    </Paper>
  );
};

export default Login; 