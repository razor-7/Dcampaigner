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
  Button,
  Typography,
} from '@mui/material';
import { YouTubeCampaign } from '../../types/platforms';

interface YouTubeCampaignFormProps {
  onSubmit: (data: YouTubeCampaign) => void;
}

const AD_FORMATS = ['skippable', 'non-skippable', 'discovery', 'bumper'];
const PLACEMENTS = ['in-stream', 'discovery', 'in-feed'];
const AGE_GROUPS = ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'];
const GENDERS = ['male', 'female', 'unknown'];

const YouTubeCampaignForm: React.FC<YouTubeCampaignFormProps> = ({ onSubmit }) => {
  const [campaignData, setCampaignData] = useState<Partial<YouTubeCampaign>>({
    adFormat: 'skippable',
    targeting: {
      demographics: {
        age: [],
        gender: [],
      },
      interests: [],
      topics: [],
      keywords: [],
    },
    placement: [],
    videoDetails: {
      duration: 30,
      skipTime: 5,
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      onSubmit(campaignData as YouTubeCampaign);
    }
  };

  const isFormValid = () => {
    return (
      campaignData.adFormat &&
      (campaignData.targeting?.demographics?.age?.length ?? 0) > 0 &&
      (campaignData.targeting?.keywords?.length ?? 0) > 0 &&
      (campaignData.placement?.length ?? 0) > 0
    );
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <FormControl fullWidth>
        <InputLabel>Ad Format</InputLabel>
        <Select
          value={campaignData.adFormat || ''}
          label="Ad Format"
          onChange={(e) => setCampaignData({ ...campaignData, adFormat: e.target.value as any })}
        >
          {AD_FORMATS.map((format) => (
            <MenuItem key={format} value={format}>
              {format.toUpperCase()}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Age Groups</InputLabel>
        <Select
          multiple
          value={campaignData.targeting?.demographics.age || []}
          onChange={(e) => setCampaignData({
            ...campaignData,
            targeting: {
              ...campaignData.targeting!,
              demographics: {
                ...campaignData.targeting!.demographics,
                age: e.target.value as string[]
              }
            }
          })}
          input={<OutlinedInput label="Age Groups" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {(selected as string[]).map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {AGE_GROUPS.map((age) => (
            <MenuItem key={age} value={age}>
              {age}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Keywords"
        fullWidth
        placeholder="Enter keywords (comma separated)"
        value={campaignData.targeting?.keywords.join(', ') || ''}
        onChange={(e) => setCampaignData({
          ...campaignData,
          targeting: {
            ...campaignData.targeting!,
            keywords: e.target.value.split(',').map(keyword => keyword.trim())
          }
        })}
      />

      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          label="Video Duration (seconds)"
          type="number"
          value={campaignData.videoDetails?.duration || ''}
          onChange={(e) => setCampaignData({
            ...campaignData,
            videoDetails: {
              ...campaignData.videoDetails!,
              duration: Number(e.target.value)
            }
          })}
        />
        {campaignData.adFormat === 'skippable' && (
          <TextField
            label="Skip Time (seconds)"
            type="number"
            value={campaignData.videoDetails?.skipTime || ''}
            onChange={(e) => setCampaignData({
              ...campaignData,
              videoDetails: {
                ...campaignData.videoDetails!,
                skipTime: Number(e.target.value)
              }
            })}
          />
        )}
      </Box>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={!isFormValid()}
      >
        Create YouTube Campaign
      </Button>
    </Box>
  );
};

export default YouTubeCampaignForm; 