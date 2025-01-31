export interface Client {
  id: number;
  name: string;
  industry: string;
  email: string;
  logo?: string;
  website: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface Campaign {
  id: number;
  clientId: number;
  name: string;
  platform: string;
  status: string;
  budget: number;
  reach: number;
  startDate: string;
  endDate?: string;
  metrics: {
    impressions: number;
    clicks: number;
    conversions: number;
    spend: number;
  };
} 