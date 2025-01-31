import axios, { 
  AxiosInstance, 
  AxiosRequestConfig, 
  AxiosResponse,
  InternalAxiosRequestConfig 
} from 'axios';
import { getAuthToken } from '../auth/authHelpers';
import { logger } from './logger';

class HttpClient {
  private static instance: HttpClient;
  private axiosInstance: AxiosInstance;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    this.setupInterceptors();
  }

  public static getInstance(): HttpClient {
    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient();
    }
    return HttpClient.instance;
  }

  private setupInterceptors(): void {
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = getAuthToken();
        if (token) {
          config.headers.set('Authorization', `Bearer ${token}`);
        }
        return config;
      },
      (error: unknown) => {
        logger.error('Request interceptor error:', error);
        return Promise.reject(error);
      }
    );

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: unknown) => {
        logger.error('Response interceptor error:', error);
        return Promise.reject(error);
      }
    );
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.axiosInstance.get<T>(url, config);
      return response.data;
    } catch (error) {
      logger.error(`GET request failed for ${url}:`, error);
      throw error;
    }
  }

  public async post<T>(url: string, data: unknown, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.axiosInstance.post<T>(url, data, config);
      return response.data;
    } catch (error) {
      logger.error(`POST request failed for ${url}:`, error);
      throw error;
    }
  }

  public async put<T>(url: string, data: unknown, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.axiosInstance.put<T>(url, data, config);
      return response.data;
    } catch (error) {
      logger.error(`PUT request failed for ${url}:`, error);
      throw error;
    }
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.axiosInstance.delete<T>(url, config);
      return response.data;
    } catch (error) {
      logger.error(`DELETE request failed for ${url}:`, error);
      throw error;
    }
  }
}

export const httpClient = HttpClient.getInstance(); 