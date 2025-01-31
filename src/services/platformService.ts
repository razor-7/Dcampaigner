import { httpClient } from '../utils/http';
import { logger } from '../utils/logger';
import { API_ENDPOINTS } from '../config/constants';
import type { PlatformData } from '../types/platforms';

class PlatformService {
  public async createCampaign(platformData: PlatformData): Promise<boolean> {
    try {
      await httpClient.post(`${API_ENDPOINTS.CAMPAIGNS}`, platformData);
      return true;
    } catch (error) {
      logger.error('Failed to create campaign:', error);
      return false;
    }
  }

  public async getPlatformMetrics(platformId: string): Promise<any> {
    try {
      return await httpClient.get(`${API_ENDPOINTS.ANALYTICS}/${platformId}`);
    } catch (error) {
      logger.error('Failed to fetch platform metrics:', error);
      throw error;
    }
  }

  // Other platform-related methods...
}

export const platformService = new PlatformService(); 