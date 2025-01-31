export const PLATFORM_TYPES = {
  FACEBOOK: 'Facebook',
  INSTAGRAM: 'Instagram',
  YOUTUBE: 'YouTube',
  GOOGLE_ADS: 'Google Ads',
  EMAIL: 'Email',
  SMS: 'SMS'
} as const;

export const API_ENDPOINTS = {
  CAMPAIGNS: '/api/campaigns',
  PLATFORMS: '/api/platforms',
  AUTH: '/api/auth',
  ANALYTICS: '/api/analytics'
} as const;

export const ERROR_MESSAGES = {
  AUTH_FAILED: 'Authentication failed. Please try again.',
  CAMPAIGN_CREATE_FAILED: 'Failed to create campaign. Please check your inputs.',
  NETWORK_ERROR: 'Network error. Please check your connection.'
} as const; 