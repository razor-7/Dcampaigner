import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './store';
import { theme } from './theme';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import Campaigns from './pages/Campaigns';
import Analytics from './pages/Analytics';
import Performance from './pages/Performance';
import CampaignDetails from './pages/CampaignDetails';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ProtectedRoute from './components/ProtectedRoute';
import Landing from './pages/Landing';
import AuthWrapper from './components/AuthWrapper';
function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <AuthWrapper>
              <Routes>
                {/* Public route */}
                <Route path="/" element={<Landing />} />

                {/* Protected routes */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
                  <Route path="/clients" element={<Layout><Clients /></Layout>} />
                  <Route path="/campaigns/:clientId?" element={<Layout><Campaigns /></Layout>} />
                  <Route path="/campaign/:campaignId" element={<Layout><CampaignDetails /></Layout>} />
                  <Route path="/analytics/:clientId?" element={<Layout><Analytics /></Layout>} />
                  <Route path="/performance/:clientId?" element={<Layout><Performance /></Layout>} />
                </Route>

                {/* Catch all route */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </AuthWrapper>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </GoogleOAuthProvider>
  );
}

export default App; 