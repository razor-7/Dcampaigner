import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  useTheme,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { fetchCampaigns } from '../store/slices/campaignsSlice';
import { PlatformData, PlatformPerformance, AggregateMetrics } from '../types/platforms';

const Performance: React.FC = () => {
  const { clientId } = useParams();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  
  const { items: campaigns, loading } = useAppSelector(state => state.campaigns);

  useEffect(() => {
    if (clientId) {
      dispatch(fetchCampaigns(parseInt(clientId)));
    } else {
      dispatch(fetchCampaigns());
    }
  }, [dispatch, clientId]);

  const aggregateMetrics = campaigns.reduce<AggregateMetrics>((acc, campaign) => {
    acc.totalSpend += campaign.metrics.spend;
    acc.totalImpressions += campaign.metrics.impressions;
    acc.totalClicks += campaign.metrics.clicks;
    acc.totalConversions += campaign.metrics.conversions;
    return acc;
  }, {
    totalSpend: 0,
    totalImpressions: 0,
    totalClicks: 0,
    totalConversions: 0
  });

  const performanceByPlatform = campaigns.reduce<Record<string, PlatformPerformance>>((acc, campaign) => {
    if (!acc[campaign.platform]) {
      acc[campaign.platform] = {
        platform: campaign.platform,
        spend: 0,
        impressions: 0,
        clicks: 0,
        conversions: 0,
      };
    }
    acc[campaign.platform].spend += campaign.metrics.spend;
    acc[campaign.platform].impressions += campaign.metrics.impressions;
    acc[campaign.platform].clicks += campaign.metrics.clicks;
    acc[campaign.platform].conversions += campaign.metrics.conversions;
    return acc;
  }, {});

  const platformData = Object.values(performanceByPlatform);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Performance Overview
        {clientId && <Typography variant="subtitle1" color="textSecondary">
          Client ID: {clientId}
        </Typography>}
      </Typography>

      {/* Key Metrics Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Spend
              </Typography>
              <Typography variant="h5">
                ${aggregateMetrics.totalSpend.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Impressions
              </Typography>
              <Typography variant="h5">
                {aggregateMetrics.totalImpressions.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Clicks
              </Typography>
              <Typography variant="h5">
                {aggregateMetrics.totalClicks.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Conversions
              </Typography>
              <Typography variant="h5">
                {aggregateMetrics.totalConversions.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Performance Charts */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Platform Performance
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={platformData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="platform" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="clicks" fill={theme.palette.primary.main} name="Clicks" />
                <Bar dataKey="conversions" fill={theme.palette.secondary.main} name="Conversions" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Spend by Platform
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={platformData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="platform" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="spend" 
                  stroke={theme.palette.primary.main} 
                  name="Spend ($)"
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Performance; 