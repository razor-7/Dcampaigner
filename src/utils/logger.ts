import * as Sentry from "@sentry/react";

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LoggerConfig {
  dsn: string;
  environment: string;
}

class Logger {
  private static instance: Logger;

  private constructor() {
    const config = this.getConfig();
    if (config) {
      Sentry.init(config);
    }
  }

  private getConfig(): LoggerConfig | null {
    const dsn = process.env.REACT_APP_SENTRY_DSN;
    const environment = process.env.REACT_APP_ENVIRONMENT;

    if (dsn && environment) {
      return { dsn, environment };
    }
    return null;
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private formatMessage(level: LogLevel, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
  }

  public info(message: string, ...args: unknown[]): void {
    console.info(this.formatMessage('info', message), ...args);
  }

  public error(message: string, error?: Error | unknown, ...args: unknown[]): void {
    console.error(this.formatMessage('error', message), error, ...args);
    if (process.env.REACT_APP_ENVIRONMENT === 'production' && error instanceof Error) {
      Sentry.captureException(error);
    }
  }

  public warn(message: string, ...args: unknown[]): void {
    console.warn(this.formatMessage('warn', message), ...args);
  }

  public debug(message: string, ...args: unknown[]): void {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(this.formatMessage('debug', message), ...args);
    }
  }
}

export const logger = Logger.getInstance(); 