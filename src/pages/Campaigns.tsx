import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { Campaign, Client } from '../types';
import PlatformIntegration from '../components/platforms/PlatformIntegration';

// Sample clients data
const sampleClients: Client[] = [
  {
    id: 1,
    name: "Tech Solutions Inc",
    industry: "Technology",
    email: "contact@techsolutions.com",
    website: "www.techsolutions.com",
    status: "active",
    createdAt: "2024-01-01"
  },
  {
    id: 2,
    name: "Fashion Forward",
    industry: "Retail",
    email: "info@fashionforward.com",
    website: "www.fashionforward.com",
    status: "active",
    createdAt: "2024-01-15"
  }
];

const initialCampaigns: Campaign[] = [
  {
    id: 1,
    clientId: 1,
    name: "Summer Sale 2024",
    platform: "Facebook",
    status: "active",
    budget: 5000,
    reach: 50000,
    startDate: "2024-06-01",
    metrics: {
      impressions: 75000,
      clicks: 2500,
      conversions: 150,
      spend: 4800
    }
  },
  {
    id: 2,
    clientId: 1,
    name: "YouTube Product Launch",
    platform: "YouTube",
    status: "planned",
    budget: 10000,
    reach: 100000,
    startDate: "2024-07-15",
    metrics: {
      impressions: 0,
      clicks: 0,
      conversions: 0,
      spend: 0
    }
  },
  {
    id: 3,
    clientId: 2,
    name: "Instagram Story Ads",
    platform: "Instagram",
    status: "active",
    budget: 3000,
    reach: 25000,
    startDate: "2024-05-20",
    metrics: {
      impressions: 30000,
      clicks: 1200,
      conversions: 80,
      spend: 2800
    }
  }
];

const Campaigns: React.FC = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const [openDialog, setOpenDialog] = useState(false);
  const [newCampaign, setNewCampaign] = useState<Partial<Campaign>>({});
  const [filters, setFilters] = useState({
    platform: 'all',
    status: 'all',
    dateRange: 'all'
  });

  // Filter campaigns based on all criteria
  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesClient = clientId ? campaign.clientId === parseInt(clientId) : true;
    const matchesPlatform = filters.platform === 'all' ? true : campaign.platform === filters.platform;
    const matchesStatus = filters.status === 'all' ? true : campaign.status === filters.status;
    
    return matchesClient && matchesPlatform && matchesStatus;
  });

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const renderFilters = () => (
    <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <FormControl size="small" sx={{ minWidth: 200 }}>
        <InputLabel>Client</InputLabel>
        <Select
          value={clientId || ''}
          label="Client"
          onChange={(e) => {
            const value = e.target.value;
            if (value) {
              navigate(`/campaigns/${value}`);
            } else {
              navigate('/campaigns');
            }
          }}
        >
          <MenuItem value="">All Clients</MenuItem>
          {sampleClients.map((client) => (
            <MenuItem key={client.id} value={client.id}>
              {client.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 200 }}>
        <InputLabel>Platform</InputLabel>
        <Select
          value={filters.platform}
          label="Platform"
          onChange={(e) => handleFilterChange('platform', e.target.value)}
        >
          <MenuItem value="all">All Platforms</MenuItem>
          <MenuItem value="Facebook">Facebook</MenuItem>
          <MenuItem value="Instagram">Instagram</MenuItem>
          <MenuItem value="YouTube">YouTube</MenuItem>
          <MenuItem value="Google Ads">Google Ads</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 200 }}>
        <InputLabel>Status</InputLabel>
        <Select
          value={filters.status}
          label="Status"
          onChange={(e) => handleFilterChange('status', e.target.value)}
        >
          <MenuItem value="all">All Status</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="planned">Planned</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
          <MenuItem value="paused">Paused</MenuItem>
        </Select>
      </FormControl>

      <Button 
        size="small"
        variant="outlined"
        onClick={() => {
          setFilters({
            platform: 'all',
            status: 'all',
            dateRange: 'all'
          });
          if (clientId) {
            navigate('/campaigns');
          }
        }}
      >
        Clear Filters
      </Button>
    </Box>
  );

  const handleAddCampaign = () => {
    setNewCampaign({
      clientId: clientId ? parseInt(clientId) : undefined,
      metrics: {
        impressions: 0,
        clicks: 0,
        conversions: 0,
        spend: 0
      }
    });
    setOpenDialog(true);
  };

  const handleSaveCampaign = (platformData: any) => {
    // Use the clientId from URL params or from the new campaign data
    const selectedClientId = newCampaign.clientId || (clientId ? Number(clientId) : undefined);
    
    if (!selectedClientId) {
      // Add error handling for missing client
      console.error('No client selected');
      return;
    }

    if (newCampaign.name && newCampaign.platform) {
      const newCampaignData: Campaign = {
        id: campaigns.length + 1,
        clientId: selectedClientId,
        name: newCampaign.name,
        platform: newCampaign.platform,
        status: 'planned',
        budget: platformData.budget || 0,
        reach: 0,
        startDate: platformData.startDate || new Date().toISOString().split('T')[0],
        metrics: {
          impressions: 0,
          clicks: 0,
          conversions: 0,
          spend: 0
        },
        ...platformData // Merge platform-specific data
      };

      setCampaigns([...campaigns, newCampaignData]);
      setOpenDialog(false);
      setNewCampaign({}); // Reset form
    }
  };

  const handleCampaignClick = (campaignId: number) => {
    navigate(`/campaign/${campaignId}${clientId ? `?clientId=${clientId}` : ''}`);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4">Campaign Management</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddCampaign}
        >
          New Campaign
        </Button>
      </Box>

      {renderFilters()}

      <Grid container spacing={3}>
        {filteredCampaigns.length > 0 ? (
          filteredCampaigns.map((campaign) => (
            <Grid item xs={12} md={6} lg={4} key={campaign.id}>
              <Card 
                sx={{ 
                  cursor: 'pointer',
                  '&:hover': {
                    boxShadow: 6,
                    transform: 'translateY(-2px)',
                    transition: 'all 0.2s ease-in-out'
                  }
                }}
                onClick={() => handleCampaignClick(campaign.id)}
              >
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" component="div">
                      {campaign.name}
                    </Typography>
                    <Chip
                      label={campaign.status}
                      color={campaign.status === 'active' ? 'success' : 'default'}
                    />
                  </Box>
                  <Typography color="textSecondary" gutterBottom>
                    Platform: {campaign.platform}
                  </Typography>
                  <Typography variant="body2" component="p">
                    Budget: ${campaign.budget.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" component="p">
                    Reach: {campaign.reach.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" component="p">
                    Start Date: {campaign.startDate}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    startIcon={<EditIcon />}
                    color="primary"
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    startIcon={<DeleteIcon />}
                    color="error"
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Box 
              sx={{ 
                textAlign: 'center', 
                py: 4,
                bgcolor: 'background.paper',
                borderRadius: 1
              }}
            >
              <Typography variant="h6" color="text.secondary">
                No campaigns found with the selected filters
              </Typography>
              <Button 
                sx={{ mt: 2 }}
                variant="outlined"
                onClick={() => {
                  setFilters({
                    platform: 'all',
                    status: 'all',
                    dateRange: 'all'
                  });
                }}
              >
                Clear Filters
              </Button>
            </Box>
          </Grid>
        )}
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create New Campaign</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            {!clientId && (
              <FormControl fullWidth required error={!newCampaign.clientId}>
                <InputLabel>Client</InputLabel>
                <Select
                  value={newCampaign.clientId || ''}
                  label="Client"
                  onChange={(e) => setNewCampaign({ ...newCampaign, clientId: Number(e.target.value) })}
                >
                  {sampleClients.map((client) => (
                    <MenuItem key={client.id} value={client.id}>
                      {client.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            
            <TextField
              label="Campaign Name"
              fullWidth
              required
              value={newCampaign.name || ''}
              onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
            />
            
            <FormControl fullWidth required>
              <InputLabel>Platform</InputLabel>
              <Select
                value={newCampaign.platform || ''}
                label="Platform"
                onChange={(e) => setNewCampaign({ ...newCampaign, platform: e.target.value })}
              >
                <MenuItem value="Facebook">Facebook</MenuItem>
                <MenuItem value="Instagram">Instagram</MenuItem>
                <MenuItem value="YouTube">YouTube</MenuItem>
                <MenuItem value="Google Ads">Google Ads</MenuItem>
                <MenuItem value="Email">Email Campaign</MenuItem>
                <MenuItem value="SMS">SMS Campaign</MenuItem>
              </Select>
            </FormControl>
            
            {newCampaign.platform && newCampaign.clientId && (
              <PlatformIntegration
                platform={newCampaign.platform}
                campaignId={campaigns.length + 1}
                clientId={newCampaign.clientId}
                onComplete={handleSaveCampaign}
              />
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Campaigns; 