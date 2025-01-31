import { httpClient } from '../utils/http';
import { logger } from '../utils/logger';
import { API_ENDPOINTS } from '../config/constants';

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
}

export const getAuthToken = (): string | null => {
  return localStorage.getItem('auth_token');
};

export const setAuthToken = (token: string): void => {
  localStorage.setItem('auth_token', token);
};

export const clearAuthToken = (): void => {
  localStorage.removeItem('auth_token');
};

export const authenticatePlatform = async (platform: string): Promise<boolean> => {
  try {
    const response = await httpClient.post<AuthResponse>(
      `${API_ENDPOINTS.AUTH}/platform/${platform}`,
      {}
    );
    setAuthToken(response.token);
    return true;
  } catch (error) {
    logger.error('Platform authentication failed:', error);
    return false;
  }
}; 