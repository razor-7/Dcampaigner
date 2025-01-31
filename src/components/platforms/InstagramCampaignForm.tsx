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
  Switch,
  FormControlLabel,
  Button,
} from '@mui/material';
import { InstagramCampaign } from '../../types/platforms';

interface InstagramCampaignFormProps {
  onSubmit: (data: InstagramCampaign) => void;
}

const OBJECTIVES = ['AWARENESS', 'ENGAGEMENT', 'TRAFFIC'];
const FORMATS = ['post', 'story', 'reel', 'igtv'];

const InstagramCampaignForm: React.FC<InstagramCampaignFormProps> = ({ onSubmit }) => {
  const [campaignData, setCampaignData] = useState<Partial<InstagramCampaign>>({
    objective: 'ENGAGEMENT',
    format: 'post',
    targeting: {
      age_range: { min: 18, max: 65 },
      locations: [],
      interests: [],
      hashtags: [],
    },
    influencerCollaboration: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      onSubmit(campaignData as InstagramCampaign);
    }
  };

  const isFormValid = () => {
    return (
      campaignData.objective &&
      campaignData.format &&
      (campaignData.targeting?.locations?.length ?? 0) > 0 &&
      (campaignData.targeting?.hashtags?.length ?? 0) > 0
    );
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <FormControl fullWidth>
        <InputLabel>Campaign Objective</InputLabel>
        <Select
          value={campaignData.objective || ''}
          label="Campaign Objective"
          onChange={(e) => setCampaignData({ ...campaignData, objective: e.target.value as any })}
        >
          {OBJECTIVES.map((objective) => (
            <MenuItem key={objective} value={objective}>
              {objective}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Content Format</InputLabel>
        <Select
          value={campaignData.format || ''}
          label="Content Format"
          onChange={(e) => setCampaignData({ ...campaignData, format: e.target.value as any })}
        >
          {FORMATS.map((format) => (
            <MenuItem key={format} value={format}>
              {format.toUpperCase()}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Hashtags"
        fullWidth
        placeholder="Enter hashtags (comma separated)"
        value={campaignData.targeting?.hashtags.join(', ') || ''}
        onChange={(e) => setCampaignData({
          ...campaignData,
          targeting: {
            ...campaignData.targeting!,
            hashtags: e.target.value.split(',').map(tag => tag.trim())
          }
        })}
      />

      <FormControlLabel
        control={
          <Switch
            checked={campaignData.influencerCollaboration || false}
            onChange={(e) => setCampaignData({
              ...campaignData,
              influencerCollaboration: e.target.checked
            })}
          />
        }
        label="Include Influencer Collaboration"
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={!isFormValid()}
      >
        Create Instagram Campaign
      </Button>
    </Box>
  );
};

export default InstagramCampaignForm; 