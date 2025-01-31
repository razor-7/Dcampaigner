import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { httpClient } from '../../utils/http';
import { API_ENDPOINTS } from '../../config/constants';
import { logger } from '../../utils/logger';

export const authenticatePlatform = createAsyncThunk(
  'platforms/authenticate',
  async (platform: string) => {
    const response = await httpClient.post(
      `${API_ENDPOINTS.AUTH}/platform/${platform}`,
      {}
    );
    return response;
  }
);

const platformsSlice = createSlice({
  name: 'platforms',
  initialState: {
    authenticated: {} as Record<string, boolean>,
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authenticatePlatform.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authenticatePlatform.fulfilled, (state, action) => {
        state.loading = false;
        state.authenticated[action.meta.arg] = true;
      })
      .addCase(authenticatePlatform.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Authentication failed';
        logger.error('Platform authentication failed:', action.error);
      });
  },
});

export default platformsSlice.reducer; 