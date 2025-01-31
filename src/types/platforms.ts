export interface FacebookCampaign {
  id?: number;
  name: string;
  objective: 'AWARENESS' | 'CONSIDERATION' | 'CONVERSION';
  audienceSize?: number;
  targeting: {
    age_range: { min: number; max: number };
    locations: string[];
    interests: string[];
    demographics?: string[];
  };
  adFormats: ('image' | 'video' | 'carousel' | 'collection')[];
  placement: ('feed' | 'stories' | 'reels' | 'marketplace')[];
  specialAdCategory?: 'NONE' | 'HOUSING' | 'EMPLOYMENT' | 'CREDIT' | 'SOCIAL_ISSUES';
  adSetDetails: {
    budget: {
      type: 'daily' | 'lifetime';
      amount: number;
    };
    schedule: {
      startDate: string;
      endDate?: string;
      timeZone: string;
    };
    optimization: {
      bidStrategy: 'lowest_cost' | 'target_cost' | 'manual';
      optimizationGoal: 'REACH' | 'IMPRESSIONS' | 'CLICKS' | 'CONVERSIONS';
    };
  };
  creativeDetails: {
    format: 'image' | 'video' | 'carousel' | 'collection';
    primaryText: string;
    headline: string;
    description: string;
    callToAction: string;
    mediaUrls: string[];
  };
}

export interface InstagramCampaign {
  objective: 'AWARENESS' | 'ENGAGEMENT' | 'TRAFFIC';
  format: 'post' | 'story' | 'reel' | 'igtv';
  targeting: {
    age_range: { min: number; max: number };
    locations: string[];
    interests: string[];
    hashtags: string[];
  };
  influencerCollaboration?: boolean;
}

export interface YouTubeCampaign {
  adFormat: 'skippable' | 'non-skippable' | 'discovery' | 'bumper';
  targeting: {
    demographics: {
      age: string[];
      gender: string[];
      parentalStatus?: string;
    };
    interests: string[];
    topics: string[];
    keywords: string[];
  };
  placement: ('in-stream' | 'discovery' | 'in-feed')[];
  videoDetails?: {
    duration: number;
    skipTime?: number;
  };
}

export interface GoogleAdsCampaign {
  campaignType: 'search' | 'display' | 'shopping' | 'performance-max';
  keywords?: string[];
  negativeKeywords?: string[];
  targeting: {
    locations: string[];
    languages: string[];
    devices: ('mobile' | 'desktop' | 'tablet')[];
  };
  bidStrategy: 'manual' | 'automated' | 'maximize-conversions' | 'target-roas';
}

export interface EmailCampaign {
  subject: string;
  template: string;
  content: {
    html: string;
    plainText: string;
  };
  scheduling: {
    sendTime: string;
    timezone: string;
  };
  audience: {
    segments: string[];
    excludedSegments?: string[];
    customFilters?: Record<string, any>;
  };
  tracking: {
    openTracking: boolean;
    clickTracking: boolean;
    unsubscribeTracking: boolean;
  };
  sender: {
    name: string;
    email: string;
    replyTo?: string;
  };
}

export interface SMSCampaign {
  message: string;
  sender: string;
  scheduling: {
    sendTime: string;
    timezone: string;
  };
  audience: {
    segments: string[];
    excludedSegments?: string[];
    phoneNumberType: 'mobile' | 'landline' | 'all';
  };
  compliance: {
    optIn: boolean;
    optOutMessage: boolean;
    messageType: 'promotional' | 'transactional';
  };
  tracking: {
    clickTracking: boolean;
    deliveryTracking: boolean;
  };
}

export interface CampaignMetrics {
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
  ctr?: number;
  cpc?: number;
  conversionRate?: number;
  roas?: number;
}

export interface PlatformData {
  id: number;
  campaignId: number;
  clientId: number;
  platform: string;
  name: string;
  status: 'active' | 'paused' | 'completed' | 'planned';
  metrics: CampaignMetrics;
  data: any; // Platform-specific data
}

export interface PlatformPerformance {
  platform: string;
  spend: number;
  impressions: number;
  clicks: number;
  conversions: number;
}

export interface AggregateMetrics {
  totalSpend: number;
  totalImpressions: number;
  totalClicks: number;
  totalConversions: number;
} 