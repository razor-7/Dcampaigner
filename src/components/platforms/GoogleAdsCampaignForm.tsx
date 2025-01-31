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
import { GoogleAdsCampaign } from '../../types/platforms';

interface GoogleAdsCampaignFormProps {
  onSubmit: (data: GoogleAdsCampaign) => void;
}

const CAMPAIGN_TYPES = ['search', 'display', 'shopping', 'performance-max'];
const DEVICES = ['mobile', 'desktop', 'tablet'];
const BID_STRATEGIES = ['manual', 'automated', 'maximize-conversions', 'target-roas'];

const GoogleAdsCampaignForm: React.FC<GoogleAdsCampaignFormProps> = ({ onSubmit }) => {
  const [campaignData, setCampaignData] = useState<Partial<GoogleAdsCampaign>>({
    campaignType: 'search',
    keywords: [],
    negativeKeywords: [],
    targeting: {
      locations: [],
      languages: [],
      devices: [],
    },
    bidStrategy: 'automated',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      onSubmit(campaignData as GoogleAdsCampaign);
    }
  };

  const isFormValid = () => {
    return (
      campaignData.campaignType &&
      (campaignData.targeting?.locations?.length ?? 0) > 0 &&
      (campaignData.targeting?.devices?.length ?? 0) > 0
    );
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h6" gutterBottom>Google Ads Campaign Setup</Typography>

      <FormControl fullWidth>
        <InputLabel>Campaign Type</InputLabel>
        <Select
          value={campaignData.campaignType || ''}
          label="Campaign Type"
          onChange={(e) => setCampaignData({ 
            ...campaignData, 
            campaignType: e.target.value as GoogleAdsCampaign['campaignType']
          })}
        >
          {CAMPAIGN_TYPES.map((type) => (
            <MenuItem key={type} value={type}>
              {type.toUpperCase()}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {campaignData.campaignType === 'search' && (
        <>
          <TextField
            label="Keywords"
            fullWidth
            multiline
            rows={3}
            placeholder="Enter keywords (one per line)"
            value={campaignData.keywords?.join('\n') || ''}
            onChange={(e) => setCampaignData({
              ...campaignData,
              keywords: e.target.value.split('\n').filter(k => k.trim())
            })}
          />

          <TextField
            label="Negative Keywords"
            fullWidth
            multiline
            rows={3}
            placeholder="Enter negative keywords (one per line)"
            value={campaignData.negativeKeywords?.join('\n') || ''}
            onChange={(e) => setCampaignData({
              ...campaignData,
              negativeKeywords: e.target.value.split('\n').filter(k => k.trim())
            })}
          />
        </>
      )}

      <FormControl fullWidth>
        <InputLabel>Target Devices</InputLabel>
        <Select
          multiple
          value={campaignData.targeting?.devices || []}
          label="Target Devices"
          input={<OutlinedInput label="Target Devices" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {(selected as string[]).map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          onChange={(e) => setCampaignData({
            ...campaignData,
            targeting: {
              ...campaignData.targeting!,
              devices: e.target.value as GoogleAdsCampaign['targeting']['devices']
            }
          })}
        >
          {DEVICES.map((device) => (
            <MenuItem key={device} value={device}>
              {device.toUpperCase()}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Bid Strategy</InputLabel>
        <Select
          value={campaignData.bidStrategy || ''}
          label="Bid Strategy"
          onChange={(e) => setCampaignData({ 
            ...campaignData, 
            bidStrategy: e.target.value as GoogleAdsCampaign['bidStrategy']
          })}
        >
          {BID_STRATEGIES.map((strategy) => (
            <MenuItem key={strategy} value={strategy}>
              {strategy.replace('-', ' ').toUpperCase()}
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
        Create Google Ads Campaign
      </Button>
    </Box>
  );
};

export default GoogleAdsCampaignForm; 