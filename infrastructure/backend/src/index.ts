import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { createClient } from 'redis';
import apiRoutes from './routes/api.routes';
import { connectRedis } from './services/redis-service';
import { connectElasticSearch } from './services/elasticsearch-service';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ok', database: 'up' });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ status: 'error', message });
  }
});

// API Routes
app.use('/api/v1', apiRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectRedis();
    await connectElasticSearch();
    console.log('📦 Redis and ElasticSearch connections initiated');
  } catch (e) {
    console.log('Note: Redis/ElasticSearch connection failed - continuing without them');
  }

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

startServer();

// Graceful shutdown
process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
