import React, { useState } from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
  Checkbox,
  ListItemText,
  Button,
  Typography,
  Divider,
  Grid,
  Paper,
  Tabs,
  Tab,
  Autocomplete,
} from '@mui/material';
import { FacebookCampaign } from '../../types/platforms';

interface FacebookCampaignFormProps {
  onSubmit: (data: FacebookCampaign) => void;
}

const OBJECTIVES = {
  AWARENESS: ['Brand Awareness', 'Reach', 'Traffic'],
  CONSIDERATION: ['Engagement', 'App Installs', 'Video Views', 'Lead Generation', 'Messages'],
  CONVERSION: ['Conversions', 'Catalog Sales', 'Store Traffic']
};

const DETAILED_TARGETING = {
  demographics: [
    'Age', 'Gender', 'Education', 'Job Title', 'Income', 'Relationship Status',
    'Life Events', 'Parents', 'Politics', 'Industries'
  ],
  interests: [
    'Entertainment', 'Shopping', 'Sports', 'Technology', 'Travel', 'Fashion',
    'Food and Drink', 'Hobbies', 'Business', 'Fitness'
  ],
  behaviors: [
    'Digital Activities', 'Mobile Device Users', 'Purchase Behavior', 
    'Travel Preferences', 'Charitable Donations', 'Financial'
  ]
};

const AD_FORMATS = ['image', 'video', 'carousel', 'collection'];
const PLACEMENTS = ['feed', 'stories', 'reels', 'marketplace'];

const FacebookCampaignForm: React.FC<FacebookCampaignFormProps> = ({ onSubmit }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [campaignData, setCampaignData] = useState<Partial<FacebookCampaign>>({
    name: '',
    objective: 'AWARENESS',
    targeting: {
      age_range: { min: 18, max: 65 },
      locations: [],
      interests: [],
      demographics: [],
    },
    adFormats: [],
    placement: [],
    specialAdCategory: 'NONE',
    adSetDetails: {
      budget: {
        type: 'daily',
        amount: 0,
      },
      schedule: {
        startDate: new Date().toISOString().split('T')[0],
        endDate: '',
        timeZone: 'UTC',
      },
      optimization: {
        bidStrategy: 'lowest_cost',
        optimizationGoal: 'REACH',
      },
    },
    creativeDetails: {
      format: 'image',
      primaryText: '',
      headline: '',
      description: '',
      callToAction: 'LEARN_MORE',
      mediaUrls: [],
    }
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      onSubmit(campaignData as FacebookCampaign);
    }
  };

  const isFormValid = () => {
    return (
      campaignData.name &&
      campaignData.objective &&
      (campaignData.targeting?.locations?.length ?? 0) > 0 &&
      (campaignData.adFormats?.length ?? 0) > 0 &&
      ((campaignData.adSetDetails?.budget?.amount ?? 0) > 0)
    );
  };

  return (
    <Box>
      <Tabs value={activeTab} onChange={handleTabChange}>
        <Tab label="Campaign Settings" />
        <Tab label="Audience" />
        <Tab label="Placements" />
        <Tab label="Budget & Schedule" />
        <Tab label="Ad Creative" />
      </Tabs>

      <Box sx={{ mt: 3 }}>
        {activeTab === 0 && (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Campaign Settings</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Campaign Objective</InputLabel>
                  <Select
                    value={campaignData.objective || ''}
                    label="Campaign Objective"
                    onChange={(e) => setCampaignData({ 
                      ...campaignData, 
                      objective: e.target.value as FacebookCampaign['objective']
                    })}
                  >
                    {Object.entries(OBJECTIVES).map(([category, objectives]) => (
                      <Box key={category}>
                        <ListItemText 
                          primary={category} 
                          sx={{ 
                            px: 2, 
                            py: 1, 
                            bgcolor: 'grey.100' 
                          }} 
                        />
                        {objectives.map((objective) => (
                          <MenuItem key={objective} value={category}>
                            {objective}
                          </MenuItem>
                        ))}
                      </Box>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Campaign Name"
                  value={campaignData.name || ''}
                  onChange={(e) => setCampaignData({
                    ...campaignData,
                    name: e.target.value
                  })}
                  helperText="Enter a name to help you identify your campaign"
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Special Ad Categories</InputLabel>
                  <Select
                    value={campaignData.specialAdCategory || 'NONE'}
                    label="Special Ad Categories"
                  >
                    <MenuItem value="NONE">None</MenuItem>
                    <MenuItem value="HOUSING">Housing</MenuItem>
                    <MenuItem value="EMPLOYMENT">Employment</MenuItem>
                    <MenuItem value="CREDIT">Credit</MenuItem>
                    <MenuItem value="SOCIAL_ISSUES">Social Issues</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>
        )}

        {activeTab === 1 && (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Audience Targeting</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" gutterBottom>Demographics</Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <TextField
                    label="Min Age"
                    type="number"
                    value={campaignData.targeting?.age_range.min || ''}
                    onChange={(e) => setCampaignData({
                      ...campaignData,
                      targeting: {
                        ...campaignData.targeting!,
                        age_range: { 
                          ...campaignData.targeting!.age_range, 
                          min: Number(e.target.value) 
                        }
                      }
                    })}
                  />
                  <TextField
                    label="Max Age"
                    type="number"
                    value={campaignData.targeting?.age_range.max || ''}
                    onChange={(e) => setCampaignData({
                      ...campaignData,
                      targeting: {
                        ...campaignData.targeting!,
                        age_range: { 
                          ...campaignData.targeting!.age_range, 
                          max: Number(e.target.value) 
                        }
                      }
                    })}
                  />
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  options={DETAILED_TARGETING.demographics}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Detailed Targeting"
                      placeholder="Add demographics, interests, or behaviors"
                    />
                  )}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        label={option}
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                />
              </Grid>

              {/* Add more targeting options */}
            </Grid>
          </Paper>
        )}

        {/* Continue with other tabs */}
      </Box>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <FormControl fullWidth>
          <InputLabel>Ad Formats</InputLabel>
          <Select
            multiple
            value={campaignData.adFormats || []}
            onChange={(e) => setCampaignData({
              ...campaignData,
              adFormats: e.target.value as any
            })}
            input={<OutlinedInput label="Ad Formats" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {(selected as string[]).map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {AD_FORMATS.map((format) => (
              <MenuItem key={format} value={format}>
                <Checkbox 
                  checked={(campaignData.adFormats?.indexOf(format as any) ?? -1) > -1} 
                />
                <ListItemText primary={format} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!isFormValid()}
        >
          Create Facebook Campaign
        </Button>
      </Box>
    </Box>
  );
};

export default FacebookCampaignForm; 