import { Request, Response, NextFunction } from 'express';

interface MetricData {
  name: string;
  value: number;
  tags?: Record<string, string>;
  timestamp?: Date;
}

interface ErrorData {
  message: string;
  stack?: string;
  context?: Record<string, any>;
  userId?: string;
  timestamp?: Date;
}

class MonitoringService {
  private metrics: MetricData[] = [];
  private errors: ErrorData[] = [];
  
  // Track custom metrics
  trackMetric(name: string, value: number, tags?: Record<string, string>) {
    const metric: MetricData = {
      name,
      value,
      tags,
      timestamp: new Date()
    };
    
    this.metrics.push(metric);
    
    // In production, send to APM service (DataDog, New Relic, etc.)
    console.log('[Metric]', metric);
  }
  
  // Track errors
  trackError(error: Error, context?: Record<string, any>, userId?: string) {
    const errorData: ErrorData = {
      message: error.message,
      stack: error.stack,
      context,
      userId,
      timestamp: new Date()
    };
    
    this.errors.push(errorData);
    
    // In production, send to error tracking service (Sentry, Rollbar, etc.)
    console.error('[Error]', errorData);
  }
  
  // Middleware for request tracking
  requestTracker() {
    return (req: Request, res: Response, next: NextFunction) => {
      const startTime = Date.now();
      
      // Track request
      res.on('finish', () => {
        const duration = Date.now() - startTime;
        
        this.trackMetric('http.request.duration', duration, {
          method: req.method,
          path: req.path,
          status: res.statusCode.toString()
        });
        
        // Track slow requests
        if (duration > 1000) {
          console.warn('[Slow Request]', {
            method: req.method,
            path: req.path,
            duration: `${duration}ms`
          });
        }
      });
      
      next();
    };
  }
  
  // Middleware for error tracking
  errorTracker() {
    return (err: Error, req: Request, res: Response, next: NextFunction) => {
      this.trackError(err, {
        method: req.method,
        path: req.path,
        query: req.query,
        body: req.body
      }, req.user?.id);
      
      next(err);
    };
  }
  
  // Track database query performance
  trackDatabaseQuery(query: string, duration: number) {
    this.trackMetric('database.query.duration', duration, {
      query: query.substring(0, 100) // Truncate long queries
    });
    
    if (duration > 500) {
      console.warn('[Slow Query]', { query, duration: `${duration}ms` });
    }
  }
  
  // Track cache hit/miss
  trackCacheOperation(operation: 'hit' | 'miss' | 'set', key: string) {
    this.trackMetric('cache.operation', 1, {
      operation,
      key: key.substring(0, 50)
    });
  }
  
  // Track user actions
  trackUserAction(action: string, userId: string, metadata?: Record<string, any>) {
    this.trackMetric('user.action', 1, {
      action,
      userId,
      ...metadata
    });
  }
  
  // Get health status
  getHealthStatus() {
    return {
      status: 'healthy',
      timestamp: new Date(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      metrics: {
        total: this.metrics.length,
        errors: this.errors.length
      }
    };
  }
  
  // Get metrics summary
  getMetricsSummary(timeWindow: number = 3600000) { // Default 1 hour
    const now = Date.now();
    const recentMetrics = this.metrics.filter(
      m => m.timestamp && (now - m.timestamp.getTime()) < timeWindow
    );
    
    const summary: Record<string, any> = {};
    
    recentMetrics.forEach(metric => {
      if (!summary[metric.name]) {
        summary[metric.name] = {
          count: 0,
          sum: 0,
          min: Infinity,
          max: -Infinity,
          avg: 0
        };
      }
      
      const stats = summary[metric.name];
      stats.count++;
      stats.sum += metric.value;
      stats.min = Math.min(stats.min, metric.value);
      stats.max = Math.max(stats.max, metric.value);
      stats.avg = stats.sum / stats.count;
    });
    
    return summary;
  }
  
  // Get recent errors
  getRecentErrors(limit: number = 100) {
    return this.errors.slice(-limit);
  }
  
  // Clear old metrics (cleanup)
  cleanup(maxAge: number = 86400000) { // Default 24 hours
    const now = Date.now();
    
    this.metrics = this.metrics.filter(
      m => m.timestamp && (now - m.timestamp.getTime()) < maxAge
    );
    
    this.errors = this.errors.filter(
      e => e.timestamp && (now - e.timestamp.getTime()) < maxAge
    );
  }
}

export const monitoringService = new MonitoringService();

// Cleanup old data every hour
setInterval(() => {
  monitoringService.cleanup();
}, 3600000);
