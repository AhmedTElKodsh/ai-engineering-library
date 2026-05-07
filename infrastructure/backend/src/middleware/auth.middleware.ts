import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Validate JWT_SECRET exists
if (!process.env.JWT_SECRET) {
  throw new Error('CRITICAL: JWT_SECRET environment variable is required. Set it in .env file.');
}
const JWT_SECRET: string = process.env.JWT_SECRET;

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
    oauthProvider?: string;
  };
}

export async function authenticateToken(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    res.status(401).json({ error: 'Access token required' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      oauthProvider: decoded.oauthProvider,
    };
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid or expired token' });
  }
}

export function authorizeRoles(...roles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    // For now, we only have user and admin roles; can be extended
    next();
  };
}

// OAuth 2.0 middleware (placeholder for Google/GitHub OAuth)
export function oauthMiddleware(provider: 'google' | 'github') {
  return (req: Request, res: Response, next: NextFunction): void => {
    // OAuth logic will be implemented in auth routes
    next();
  };
}

// Rate limiting middleware (simple in-memory store)
const requestCounts = new Map<string, { count: number; resetTime: number }>();

export function rateLimiter(maxRequests = 100, windowMs = 15 * 60 * 1000) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    const record = requestCounts.get(ip);

    if (!record || now > record.resetTime) {
      requestCounts.set(ip, { count: 1, resetTime: now + windowMs });
      next();
    } else if (record.count < maxRequests) {
      record.count++;
      next();
    } else {
      res.status(429).json({ error: 'Too many requests, please try again later.' });
    }
  };
}