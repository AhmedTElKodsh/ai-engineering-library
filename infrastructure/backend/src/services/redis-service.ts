import { createClient, RedisClientType } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

export async function connectRedis(): Promise<void> {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log('📦 Redis connected');
  }
}

export async function disconnectRedis(): Promise<void> {
  await redisClient.quit();
}

// Session storage with TTL (24 hours)
export async function setSession(sessionId: string, data: any, ttlSeconds = 86400): Promise<void> {
  await redisClient.setEx(`session:${sessionId}`, ttlSeconds, JSON.stringify(data));
}

export async function getSession(sessionId: string): Promise<any | null> {
  const data = await redisClient.get(`session:${sessionId}`);
  return data ? JSON.parse(data) : null;
}

export async function deleteSession(sessionId: string): Promise<void> {
  await redisClient.del(`session:${sessionId}`);
}

// Cache helpers
export async function setCache(key: string, value: any, ttlSeconds = 3600): Promise<void> {
  await redisClient.setEx(key, ttlSeconds, JSON.stringify(value));
}

export async function getCache<T>(key: string): Promise<T | null> {
  const data = await redisClient.get(key);
  return data ? (JSON.parse(data) as T) : null;
}

export async function invalidateCache(key: string): Promise<void> {
  await redisClient.del(key);
}

export async function invalidateCachePattern(pattern: string): Promise<void> {
  const keys = await redisClient.keys(pattern);
  if (keys.length > 0) {
    await redisClient.del(keys);
  }
}

// Pub/Sub for real-time notifications
export async function publishNotification(channel: string, message: any): Promise<void> {
  await redisClient.publish(channel, JSON.stringify(message));
}

export function subscribeToChannel(channel: string, callback: (message: any) => void): void {
  const subscriber = redisClient.duplicate();
  subscriber.connect().then(() => {
    subscriber.subscribe(channel, (message) => {
      try {
        const parsed = JSON.parse(message);
        callback(parsed);
      } catch (e) {
        console.error('Failed to parse notification message', e);
      }
    });
  });
}

export default redisClient;