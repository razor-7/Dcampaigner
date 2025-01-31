import React from 'react';
import { Box, Paper, Typography, useTheme, Avatar, LinearProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { images } from '../assets/images';

const DashboardPreview: React.FC = () => {
  const theme = useTheme();

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  const chartVariants = {
    hidden: { opacity: 0, scaleY: 0 },
    visible: {
      opacity: 1,
      scaleY: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  const campaigns = [
    { 
      name: 'Summer Sale 2024',
      platform: 'facebook',
      progress: 78,
      reach: '2.3M',
      engagement: '4.2%'
    },
    { 
      name: 'Product Launch',
      platform: 'instagram',
      progress: 45,
      reach: '1.8M',
      engagement: '5.7%'
    },
    { 
      name: 'Brand Awareness',
      platform: 'youtube',
      progress: 92,
      reach: '850K',
      engagement: '3.9%'
    },
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        width: '100%',
        height: '100%',
        background: theme.palette.background.paper,
        borderRadius: 2,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 3,
          borderBottom: `1px solid ${theme.palette.divider}`,
          background: theme.palette.background.default,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h5" color="primary" fontWeight="bold">
          Campaign Dashboard
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {Object.values(images.platforms).slice(0, 4).map((icon, index) => (
            <Avatar
              key={index}
              src={icon}
              sx={{ 
                width: 32, 
                height: 32,
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Content */}
      <Box sx={{ p: 3 }}>
        {/* Stats Row */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, mb: 4 }}>
          {[
            { title: 'Active Campaigns', value: '12', trend: '+3' },
            { title: 'Total Reach', value: '4.8M', trend: '+12%' },
            { title: 'Engagement', value: '4.2%', trend: '+0.8%' },
            { title: 'ROI', value: '287%', trend: '+23%' },
          ].map((stat, i) => (
            <motion.div
              key={stat.title}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
            >
              <Paper
                elevation={2}
                sx={{
                  p: 2,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                  color: 'white',
                  borderRadius: 2,
                }}
              >
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  {stat.title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {stat.value}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: theme.palette.success.light,
                      fontWeight: 'bold',
                    }}
                  >
                    {stat.trend}
                  </Typography>
                </Box>
              </Paper>
            </motion.div>
          ))}
        </Box>

        {/* Active Campaigns */}
        <Typography variant="h6" sx={{ mb: 2 }}>Active Campaigns</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {campaigns.map((campaign, index) => (
            <motion.div
              key={campaign.name}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              custom={index}
            >
              <Paper
                elevation={1}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  '&:hover': {
                    bgcolor: 'background.default',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    src={images.platforms[campaign.platform as keyof typeof images.platforms]}
                    sx={{ width: 40, height: 40, mr: 2 }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {campaign.name}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={campaign.progress}
                      sx={{
                        mt: 1,
                        height: 6,
                        borderRadius: 3,
                        bgcolor: theme.palette.grey[200],
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 3,
                          background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                        },
                      }}
                    />
                  </Box>
                  <Box sx={{ textAlign: 'right', ml: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Reach: {campaign.reach}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Engagement: {campaign.engagement}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </motion.div>
          ))}
        </Box>
      </Box>
    </Paper>
  );
};

export default DashboardPreview; 