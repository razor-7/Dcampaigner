import React, { useState } from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Button,
  Typography,
  Alert,
} from '@mui/material';
import { SMSCampaign } from '../../types/platforms';

interface SMSCampaignFormProps {
  onSubmit: (data: SMSCampaign) => void;
}

const TIMEZONES = [
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'Europe/London',
  'Asia/Tokyo',
];

const SMSCampaignForm: React.FC<SMSCampaignFormProps> = ({ onSubmit }) => {
  const [campaignData, setCampaignData] = useState<Partial<SMSCampaign>>({
    message: '',
    sender: '',
    scheduling: {
      sendTime: new Date().toISOString(),
      timezone: 'America/New_York',
    },
    audience: {
      segments: [],
      phoneNumberType: 'mobile',
    },
    compliance: {
      optIn: true,
      optOutMessage: true,
      messageType: 'promotional',
    },
    tracking: {
      clickTracking: true,
      deliveryTracking: true,
    },
  });

  const [messageLength, setMessageLength] = useState(0);
  const MAX_LENGTH = 160;

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setMessageLength(text.length);
    setCampaignData({ ...campaignData, message: text });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      onSubmit(campaignData as SMSCampaign);
    }
  };

  const isFormValid = () => {
    return (
      campaignData.message &&
      campaignData.sender &&
      messageLength <= MAX_LENGTH &&
      (campaignData.audience?.segments?.length ?? 0) > 0
    );
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h6" gutterBottom>SMS Campaign Setup</Typography>

      <TextField
        label="Sender ID"
        fullWidth
        required
        value={campaignData.sender || ''}
        onChange={(e) => setCampaignData({ ...campaignData, sender: e.target.value })}
        helperText="Must comply with local regulations"
      />

      <TextField
        label="Message Content"
        multiline
        rows={4}
        fullWidth
        required
        value={campaignData.message || ''}
        onChange={handleMessageChange}
        helperText={`${messageLength}/${MAX_LENGTH} characters`}
        error={messageLength > MAX_LENGTH}
      />

      {messageLength > MAX_LENGTH && (
        <Alert severity="warning">
          Message exceeds standard SMS length and may be split into multiple messages
        </Alert>
      )}

      <FormControl fullWidth>
        <InputLabel>Message Type</InputLabel>
        <Select
          value={campaignData.compliance?.messageType || 'promotional'}
          label="Message Type"
          onChange={(e) => setCampaignData({
            ...campaignData,
            compliance: { ...campaignData.compliance!, messageType: e.target.value as 'promotional' | 'transactional' }
          })}
        >
          <MenuItem value="promotional">Promotional</MenuItem>
          <MenuItem value="transactional">Transactional</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Phone Number Type</InputLabel>
        <Select
          value={campaignData.audience?.phoneNumberType || 'mobile'}
          label="Phone Number Type"
          onChange={(e) => setCampaignData({
            ...campaignData,
            audience: { ...campaignData.audience!, phoneNumberType: e.target.value as 'mobile' | 'landline' | 'all' }
          })}
        >
          <MenuItem value="mobile">Mobile Only</MenuItem>
          <MenuItem value="landline">Landline Only</MenuItem>
          <MenuItem value="all">All Numbers</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography variant="subtitle2">Compliance Settings</Typography>
        <FormControlLabel
          control={
            <Switch
              checked={campaignData.compliance?.optIn ?? true}
              onChange={(e) => setCampaignData({
                ...campaignData,
                compliance: { ...campaignData.compliance!, optIn: e.target.checked }
              })}
            />
          }
          label="Verify Opt-In Status"
        />
        <FormControlLabel
          control={
            <Switch
              checked={campaignData.compliance?.optOutMessage ?? true}
              onChange={(e) => setCampaignData({
                ...campaignData,
                compliance: { ...campaignData.compliance!, optOutMessage: e.target.checked }
              })}
            />
          }
          label="Include Opt-Out Instructions"
        />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography variant="subtitle2">Tracking Options</Typography>
        <FormControlLabel
          control={
            <Switch
              checked={campaignData.tracking?.deliveryTracking ?? true}
              onChange={(e) => setCampaignData({
                ...campaignData,
                tracking: { ...campaignData.tracking!, deliveryTracking: e.target.checked }
              })}
            />
          }
          label="Track Delivery Status"
        />
        <FormControlLabel
          control={
            <Switch
              checked={campaignData.tracking?.clickTracking ?? true}
              onChange={(e) => setCampaignData({
                ...campaignData,
                tracking: { ...campaignData.tracking!, clickTracking: e.target.checked }
              })}
            />
          }
          label="Track Link Clicks"
        />
      </Box>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={!isFormValid()}
      >
        Create SMS Campaign
      </Button>
    </Box>
  );
};

export default SMSCampaignForm; 