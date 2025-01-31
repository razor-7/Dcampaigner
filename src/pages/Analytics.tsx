import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
} from '@mui/material';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const socialMediaData = [
  { name: 'Jan', facebook: 4000, instagram: 2400, youtube: 2400 },
  { name: 'Feb', facebook: 3000, instagram: 1398, youtube: 2210 },
  { name: 'Mar', facebook: 2000, instagram: 9800, youtube: 2290 },
  { name: 'Apr', facebook: 2780, instagram: 3908, youtube: 2000 },
  { name: 'May', facebook: 1890, instagram: 4800, youtube: 2181 },
  { name: 'Jun', facebook: 2390, instagram: 3800, youtube: 2500 },
];

const platformShare = [
  { name: 'Facebook', value: 35 },
  { name: 'Instagram', value: 40 },
  { name: 'YouTube', value: 25 },
];

const COLORS = ['#1877F2', '#E4405F', '#FF0000'];

const Analytics: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Analytics Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Reach
              </Typography>
              <Typography variant="h3">2.4M</Typography>
              <Typography variant="body2" color="success.main">
                +15% from last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Engagement Rate
              </Typography>
              <Typography variant="h3">4.8%</Typography>
              <Typography variant="body2" color="success.main">
                +2.1% from last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Conversion Rate
              </Typography>
              <Typography variant="h3">2.1%</Typography>
              <Typography variant="body2" color="error.main">
                -0.3% from last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Social Media Performance
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={socialMediaData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="facebook" stroke="#1877F2" />
                <Line type="monotone" dataKey="instagram" stroke="#E4405F" />
                <Line type="monotone" dataKey="youtube" stroke="#FF0000" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Platform Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={platformShare}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {platformShare.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analytics; 