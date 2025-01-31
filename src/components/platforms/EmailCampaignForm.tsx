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
  Typography,
} from '@mui/material';
import { EmailCampaign } from '../../types/platforms';

interface EmailCampaignFormProps {
  onSubmit: (data: EmailCampaign) => void;
}

const TIMEZONES = [
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'Europe/London',
  'Asia/Tokyo',
];

const EmailCampaignForm: React.FC<EmailCampaignFormProps> = ({ onSubmit }) => {
  const [campaignData, setCampaignData] = useState<Partial<EmailCampaign>>({
    subject: '',
    template: 'default',
    content: {
      html: '',
      plainText: '',
    },
    scheduling: {
      sendTime: new Date().toISOString(),
      timezone: 'America/New_York',
    },
    audience: {
      segments: [],
    },
    tracking: {
      openTracking: true,
      clickTracking: true,
      unsubscribeTracking: true,
    },
    sender: {
      name: '',
      email: '',
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      onSubmit(campaignData as EmailCampaign);
    }
  };

  const isFormValid = () => {
    return (
      campaignData.subject &&
      campaignData.content?.html &&
      campaignData.sender?.email &&
      (campaignData.audience?.segments?.length ?? 0) > 0
    );
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h6" gutterBottom>Email Campaign Setup</Typography>

      <TextField
        label="Subject Line"
        fullWidth
        required
        value={campaignData.subject || ''}
        onChange={(e) => setCampaignData({ ...campaignData, subject: e.target.value })}
      />

      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          label="Sender Name"
          fullWidth
          required
          value={campaignData.sender?.name || ''}
          onChange={(e) => setCampaignData({
            ...campaignData,
            sender: { ...campaignData.sender!, name: e.target.value }
          })}
        />
        <TextField
          label="Sender Email"
          type="email"
          fullWidth
          required
          value={campaignData.sender?.email || ''}
          onChange={(e) => setCampaignData({
            ...campaignData,
            sender: { ...campaignData.sender!, email: e.target.value }
          })}
        />
      </Box>

      <TextField
        label="Email Content (HTML)"
        multiline
        rows={4}
        fullWidth
        required
        value={campaignData.content?.html || ''}
        onChange={(e) => setCampaignData({
          ...campaignData,
          content: { ...campaignData.content!, html: e.target.value }
        })}
      />

      <FormControl fullWidth>
        <InputLabel>Timezone</InputLabel>
        <Select
          value={campaignData.scheduling?.timezone || ''}
          label="Timezone"
          onChange={(e) => setCampaignData({
            ...campaignData,
            scheduling: { ...campaignData.scheduling!, timezone: e.target.value }
          })}
        >
          {TIMEZONES.map((tz) => (
            <MenuItem key={tz} value={tz}>{tz}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography variant="subtitle2">Tracking Options</Typography>
        <FormControlLabel
          control={
            <Switch
              checked={campaignData.tracking?.openTracking ?? true}
              onChange={(e) => setCampaignData({
                ...campaignData,
                tracking: { ...campaignData.tracking!, openTracking: e.target.checked }
              })}
            />
          }
          label="Track Opens"
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
          label="Track Clicks"
        />
      </Box>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={!isFormValid()}
      >
        Create Email Campaign
      </Button>
    </Box>
  );
};

export default EmailCampaignForm; 