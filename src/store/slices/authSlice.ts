import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import { httpClient } from '../../utils/http';
import { API_ENDPOINTS } from '../../config/constants';

interface GoogleUser {
  email: string;
  name: string;
  picture: string;
  sub: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

interface AuthResponse {
  user: User;
  token: string;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('auth_token'),
  loading: false,
  error: null,
};

export const loginWithGoogle = createAsyncThunk(
  'auth/loginWithGoogle',
  async (mockCredential: any) => {
    // For development, return mock data directly
    return {
      user: mockCredential.user,
      token: mockCredential.token,
    };
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('auth_token');
      // Redirect to landing page on logout
      window.location.href = '/';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('auth_token', action.payload.token);
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Login failed';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer; 