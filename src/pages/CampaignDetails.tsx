import React, { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Tab,
  Tabs,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch,
  FormControlLabel,
  CircularProgress,
  InputAdornment,
} from '@mui/material';
import { Edit as EditIcon, Save as SaveIcon, Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';

// Define proper types for the campaign data
interface CampaignAudience {
  includeList: string[];
  excludeList: string[];
  customSegments: string[];
}

interface CampaignTargeting {
  age_range: { min: number; max: number };
  locations: string[];
  interests: string[];
  demographics: string[];
  audience: CampaignAudience;
}

interface CampaignData {
  id: number;
  name: string;
  platform: string;
  status: string;
  objective: string;
  targeting: CampaignTargeting;
  adSetDetails: {
    budget: {
      type: string;
      amount: number;
    };
    schedule: {
      startDate: string;
      endDate: string;
      timeZone: string;
    };
    optimization: {
      bidStrategy: string;
      optimizationGoal: string;
    };
  };
  creativeDetails: {
    format: string;
    primaryText: string;
    headline: string;
    description: string;
    callToAction: string;
    mediaUrls: string[];
  };
  metrics: {
    impressions: number;
    clicks: number;
    conversions: number;
    spend: number;
    ctr: number;
    cpc: number;
    conversionRate: number;
    roas: number;
  };
}

const CampaignDetails: React.FC = () => {
  const { campaignId } = useParams();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const clientId = searchParams.get('clientId');
  const [publishDialogOpen, setPublishDialogOpen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const [campaignData, setCampaignData] = useState<CampaignData>({
    id: Number(campaignId),
    name: 'Summer Sale Campaign',
    platform: 'Facebook',
    status: 'active',
    objective: 'CONVERSION',
    targeting: {
      age_range: { min: 18, max: 65 },
      locations: ['New York', 'Los Angeles', 'Chicago'],
      interests: ['Shopping', 'Fashion', 'Technology'],
      demographics: ['College Students', 'Young Professionals'],
      audience: {
        includeList: [],
        excludeList: [],
        customSegments: []
      }
    },
    adSetDetails: {
      budget: {
        type: 'daily',
        amount: 500,
      },
      schedule: {
        startDate: '2024-03-15',
        endDate: '2024-04-15',
        timeZone: 'UTC',
      },
      optimization: {
        bidStrategy: 'lowest_cost',
        optimizationGoal: 'CONVERSIONS',
      },
    },
    creativeDetails: {
      format: 'image',
      primaryText: 'Get 50% off on all summer collections!',
      headline: 'Summer Sale is Live',
      description: 'Limited time offer on premium brands',
      callToAction: 'Shop Now',
      mediaUrls: ['image1.jpg', 'image2.jpg'],
    },
    metrics: {
      impressions: 150000,
      clicks: 7500,
      conversions: 450,
      spend: 2500,
      ctr: 5.0,
      cpc: 0.33,
      conversionRate: 6.0,
      roas: 2.8,
    },
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleSave = () => {
    // API call to save campaign data
    setIsEditing(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      // Handle image upload logic
      const newMediaUrls = [...campaignData.creativeDetails.mediaUrls];
      // Add new image URLs
      setCampaignData({
        ...campaignData,
        creativeDetails: {
          ...campaignData.creativeDetails,
          mediaUrls: newMediaUrls
        }
      });
    }
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      // API call to publish campaign would go here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      setPublishDialogOpen(false);
      setCampaignData({ ...campaignData, status: 'active' });
    } catch (error) {
      console.error('Error publishing campaign:', error);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Campaign Details</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            variant="contained" 
            color={isEditing ? "success" : "primary"}
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
          >
            {isEditing ? "Save Changes" : "Edit Campaign"}
          </Button>
          {!isEditing && campaignData.status !== 'active' && (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setPublishDialogOpen(true)}
            >
              Publish Campaign
            </Button>
          )}
        </Box>
      </Box>

      <Paper sx={{ mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Overview" />
          <Tab label="Targeting" />
          <Tab label="Creative" />
          <Tab label="Budget & Schedule" />
          <Tab label="Settings" />
          <Tab label="Audience" />
        </Tabs>

        <Box sx={{ p: 3 }}>
          {activeTab === 0 && (
            <Grid container spacing={3}>
              {/* Basic Campaign Information */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Campaign Name"
                  value={campaignData.name}
                  disabled={!isEditing}
                  onChange={(e) => setCampaignData({ ...campaignData, name: e.target.value })}
                  sx={{ mb: 2 }}
                />
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={campaignData.status}
                    label="Status"
                    disabled={!isEditing}
                    onChange={(e) => setCampaignData({ ...campaignData, status: e.target.value })}
                  >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="paused">Paused</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {/* Metrics Display */}
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>Performance Metrics</Typography>
                <Grid container spacing={2}>
                  {/* Metrics cards */}
                </Grid>
              </Grid>
            </Grid>
          )}

          {activeTab === 1 && (
            <Box>
              <Typography variant="h6" gutterBottom>Targeting Options</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Age Range (Min)"
                    type="number"
                    value={campaignData.targeting.age_range.min}
                    disabled={!isEditing}
                    onChange={(e) => setCampaignData({
                      ...campaignData,
                      targeting: {
                        ...campaignData.targeting,
                        age_range: { ...campaignData.targeting.age_range, min: Number(e.target.value) }
                      }
                    })}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Age Range (Max)"
                    type="number"
                    value={campaignData.targeting.age_range.max}
                    disabled={!isEditing}
                    onChange={(e) => setCampaignData({
                      ...campaignData,
                      targeting: {
                        ...campaignData.targeting,
                        age_range: { ...campaignData.targeting.age_range, max: Number(e.target.value) }
                      }
                    })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  {/* Add location and interest targeting inputs */}
                </Grid>
              </Grid>
            </Box>
          )}

          {activeTab === 2 && (
            <Box>
              <Typography variant="h6" gutterBottom>Creative Details</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Primary Text"
                    value={campaignData.creativeDetails.primaryText}
                    disabled={!isEditing}
                    onChange={(e) => setCampaignData({
                      ...campaignData,
                      creativeDetails: { ...campaignData.creativeDetails, primaryText: e.target.value }
                    })}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Headline"
                    value={campaignData.creativeDetails.headline}
                    disabled={!isEditing}
                    onChange={(e) => setCampaignData({
                      ...campaignData,
                      creativeDetails: { ...campaignData.creativeDetails, headline: e.target.value }
                    })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Call to Action"
                    value={campaignData.creativeDetails.callToAction}
                    disabled={!isEditing}
                    onChange={(e) => setCampaignData({
                      ...campaignData,
                      creativeDetails: { ...campaignData.creativeDetails, callToAction: e.target.value }
                    })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>Media</Typography>
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    {campaignData.creativeDetails.mediaUrls.map((url, index) => (
                      <Paper
                        key={index}
                        sx={{ 
                          width: 200, 
                          height: 200, 
                          position: 'relative',
                          overflow: 'hidden'
                        }}
                      >
                        <img 
                          src={url} 
                          alt={`Creative ${index + 1}`} 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        {isEditing && (
                          <IconButton
                            sx={{ position: 'absolute', top: 8, right: 8 }}
                            onClick={() => {
                              const newMediaUrls = campaignData.creativeDetails.mediaUrls.filter((_, i) => i !== index);
                              setCampaignData({
                                ...campaignData,
                                creativeDetails: { ...campaignData.creativeDetails, mediaUrls: newMediaUrls }
                              });
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        )}
                      </Paper>
                    ))}
                    {isEditing && (
                      <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        onClick={() => setOpenImageDialog(true)}
                        sx={{ width: 200, height: 200 }}
                      >
                        Add Media
                      </Button>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}

          {activeTab === 3 && (
            <Box>
              <Typography variant="h6" gutterBottom>Budget & Schedule</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Budget Type</InputLabel>
                    <Select
                      value={campaignData.adSetDetails.budget.type}
                      label="Budget Type"
                      disabled={!isEditing}
                      onChange={(e) => setCampaignData({
                        ...campaignData,
                        adSetDetails: {
                          ...campaignData.adSetDetails,
                          budget: {
                            ...campaignData.adSetDetails.budget,
                            type: e.target.value
                          }
                        }
                      })}
                    >
                      <MenuItem value="daily">Daily Budget</MenuItem>
                      <MenuItem value="lifetime">Lifetime Budget</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    fullWidth
                    type="number"
                    label="Budget Amount"
                    value={campaignData.adSetDetails.budget.amount}
                    disabled={!isEditing}
                    onChange={(e) => setCampaignData({
                      ...campaignData,
                      adSetDetails: {
                        ...campaignData.adSetDetails,
                        budget: {
                          ...campaignData.adSetDetails.budget,
                          amount: Number(e.target.value)
                        }
                      }
                    })}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Time Zone</InputLabel>
                    <Select
                      value={campaignData.adSetDetails.schedule.timeZone}
                      label="Time Zone"
                      disabled={!isEditing}
                      onChange={(e) => setCampaignData({
                        ...campaignData,
                        adSetDetails: {
                          ...campaignData.adSetDetails,
                          schedule: {
                            ...campaignData.adSetDetails.schedule,
                            timeZone: e.target.value
                          }
                        }
                      })}
                    >
                      <MenuItem value="UTC">UTC</MenuItem>
                      <MenuItem value="America/New_York">Eastern Time</MenuItem>
                      <MenuItem value="America/Chicago">Central Time</MenuItem>
                      <MenuItem value="America/Denver">Mountain Time</MenuItem>
                      <MenuItem value="America/Los_Angeles">Pacific Time</MenuItem>
                    </Select>
                  </FormControl>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        type="date"
                        label="Start Date"
                        value={campaignData.adSetDetails.schedule.startDate}
                        disabled={!isEditing}
                        onChange={(e) => setCampaignData({
                          ...campaignData,
                          adSetDetails: {
                            ...campaignData.adSetDetails,
                            schedule: {
                              ...campaignData.adSetDetails.schedule,
                              startDate: e.target.value
                            }
                          }
                        })}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        type="date"
                        label="End Date"
                        value={campaignData.adSetDetails.schedule.endDate}
                        disabled={!isEditing}
                        onChange={(e) => setCampaignData({
                          ...campaignData,
                          adSetDetails: {
                            ...campaignData.adSetDetails,
                            schedule: {
                              ...campaignData.adSetDetails.schedule,
                              endDate: e.target.value
                            }
                          }
                        })}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          )}

          {activeTab === 4 && (
            <Box>
              <Typography variant="h6" gutterBottom>Campaign Settings</Typography>
              <List>
                <ListItem>
                  <ListItemText primary="Campaign ID" secondary={campaignData.id} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Platform" secondary={campaignData.platform} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Campaign Objective" secondary={campaignData.objective} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Status" secondary={campaignData.status} />
                </ListItem>
              </List>
            </Box>
          )}

          {activeTab === 5 && (
            <Box>
              <Typography variant="h6" gutterBottom>Audience Management</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>Include List</Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    placeholder="Enter email addresses or phone numbers (one per line)"
                    value={campaignData.targeting.audience.includeList.join('\n')}
                    disabled={!isEditing}
                    onChange={(e) => setCampaignData({
                      ...campaignData,
                      targeting: {
                        ...campaignData.targeting,
                        audience: {
                          ...campaignData.targeting.audience,
                          includeList: e.target.value.split('\n').filter(item => item.trim())
                        }
                      }
                    })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>Exclude List</Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    placeholder="Enter email addresses or phone numbers to exclude (one per line)"
                    value={campaignData.targeting.audience.excludeList.join('\n')}
                    disabled={!isEditing}
                    onChange={(e) => setCampaignData({
                      ...campaignData,
                      targeting: {
                        ...campaignData.targeting,
                        audience: {
                          ...campaignData.targeting.audience,
                          excludeList: e.target.value.split('\n').filter(item => item.trim())
                        }
                      }
                    })}
                  />
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
      </Paper>

      {/* Add Publish Confirmation Dialog */}
      <Dialog open={publishDialogOpen} onClose={() => !isPublishing && setPublishDialogOpen(false)}>
        <DialogTitle>Publish Campaign</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to publish this campaign? Once published, it will be live and start running according to the schedule.
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" color="primary">Campaign Details:</Typography>
            <List dense>
              <ListItem>
                <ListItemText primary="Name" secondary={campaignData.name} />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Budget" 
                  secondary={`$${campaignData.adSetDetails.budget.amount} (${campaignData.adSetDetails.budget.type})`} 
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Duration" 
                  secondary={`${campaignData.adSetDetails.schedule.startDate} to ${campaignData.adSetDetails.schedule.endDate}`} 
                />
              </ListItem>
            </List>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setPublishDialogOpen(false)} 
            disabled={isPublishing}
          >
            Cancel
          </Button>
          <Button 
            onClick={handlePublish} 
            color="primary" 
            variant="contained"
            disabled={isPublishing}
          >
            {isPublishing ? (
              <>
                <CircularProgress size={20} sx={{ mr: 1 }} />
                Publishing...
              </>
            ) : (
              'Publish'
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Image Upload Dialog */}
      <Dialog open={openImageDialog} onClose={() => setOpenImageDialog(false)}>
        <DialogTitle>Upload Media</DialogTitle>
        <DialogContent>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            multiple
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenImageDialog(false)}>Cancel</Button>
          <Button onClick={() => setOpenImageDialog(false)} color="primary">
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CampaignDetails; 