import { configureStore } from '@reduxjs/toolkit';
import campaignsReducer from './slices/campaignsSlice';
import platformsReducer from './slices/platformsSlice';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    campaigns: campaignsReducer,
    platforms: platformsReducer,
    auth: authReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 