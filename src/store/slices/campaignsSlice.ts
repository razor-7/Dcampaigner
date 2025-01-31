import { createSlice, createAsyncThunk, PayloadAction, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { httpClient } from '../../utils/http';
import { API_ENDPOINTS } from '../../config/constants';
import type { PlatformData } from '../../types/platforms';
import { logger } from '../../utils/logger';

interface CampaignsState {
  items: PlatformData[];
  loading: boolean;
  error: string | null;
}

const initialState: CampaignsState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchCampaigns = createAsyncThunk(
  'campaigns/fetchCampaigns',
  async (clientId?: number) => {
    const url = clientId 
      ? `${API_ENDPOINTS.CAMPAIGNS}?clientId=${clientId}`
      : API_ENDPOINTS.CAMPAIGNS;
    const response = await httpClient.get<PlatformData[]>(url);
    return response;
  }
);

export const createCampaign = createAsyncThunk(
  'campaigns/createCampaign',
  async (campaignData: PlatformData) => {
    const response = await httpClient.post<PlatformData>(
      API_ENDPOINTS.CAMPAIGNS,
      campaignData
    );
    return response;
  }
);

const campaignsSlice = createSlice({
  name: 'campaigns',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<CampaignsState>) => {
    builder
      .addCase(fetchCampaigns.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCampaigns.fulfilled, (state, action: PayloadAction<PlatformData[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCampaigns.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch campaigns';
        logger.error('Failed to fetch campaigns:', action.error);
      })
      .addCase(createCampaign.fulfilled, (state, action: PayloadAction<PlatformData>) => {
        state.items.push(action.payload);
      });
  },
});

export default campaignsSlice.reducer; 