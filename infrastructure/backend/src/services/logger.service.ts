import winston from 'winston';
import path from 'path';

// Define log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Define log colors
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
};

winston.addColors(colors);

// Define log format
const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

// Define transports
const transports = [
  // Console transport
  new winston.transports.Console(),
  
  // Error log file
  new winston.transports.File({
    filename: path.join('logs', 'error.log'),
    level: 'error',
    maxsize: 5242880, // 5MB
    maxFiles: 5,
  }),
  
  // Combined log file
  new winston.transports.File({
    filename: path.join('logs', 'combined.log'),
    maxsize: 5242880, // 5MB
    maxFiles: 5,
  }),
];

// Create logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  levels,
  format,
  transports,
});

// Structured logging helpers
export class Logger {
  static info(message: string, meta?: Record<string, any>) {
    logger.info(message, meta);
  }
  
  static error(message: string, error?: Error, meta?: Record<string, any>) {
    logger.error(message, {
      error: error ? {
        message: error.message,
        stack: error.stack,
        name: error.name
      } : undefined,
      ...meta
    });
  }
  
  static warn(message: string, meta?: Record<string, any>) {
    logger.warn(message, meta);
  }
  
  static debug(message: string, meta?: Record<string, any>) {
    logger.debug(message, meta);
  }
  
  static http(message: string, meta?: Record<string, any>) {
    logger.http(message, meta);
  }
  
  // Audit logging for sensitive operations
  static audit(action: string, userId: string, resource: string, meta?: Record<string, any>) {
    logger.info(`[AUDIT] ${action}`, {
      userId,
      resource,
      timestamp: new Date().toISOString(),
      ...meta
    });
  }
  
  // Security logging
  static security(event: string, severity: 'low' | 'medium' | 'high' | 'critical', meta?: Record<string, any>) {
    logger.warn(`[SECURITY] ${event}`, {
      severity,
      timestamp: new Date().toISOString(),
      ...meta
    });
  }
  
  // Performance logging
  static performance(operation: string, duration: number, meta?: Record<string, any>) {
    const level = duration > 1000 ? 'warn' : 'info';
    logger[level](`[PERFORMANCE] ${operation} took ${duration}ms`, meta);
  }
}

export default logger;
