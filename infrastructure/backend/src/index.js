"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
const redis_1 = require("redis");
dotenv_1.default.config();
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
const redis = (0, redis_1.createClient)({ url: process.env.REDIS_URL });
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Health check
app.get('/health', async (req, res) => {
    try {
        await prisma.$queryRaw `SELECT 1`;
        await redis.ping();
        res.json({ status: 'ok', database: 'up', redis: 'up' });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ status: 'error', message });
    }
});
// API Routes (to be implemented in later tasks)
app.get('/api/v1/health', (req, res) => {
    res.json({ message: 'AI Engineering Curriculum API - Setup Complete' });
});
// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
// Graceful shutdown
process.on('SIGTERM', async () => {
    await prisma.$disconnect();
    await redis.quit();
    process.exit(0);
});
