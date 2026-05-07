import { PrismaClient } from '@prisma/client';
import { createClient, RedisClientType } from 'redis';
import jwt from 'jsonwebtoken';

export class TestDatabase {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.TEST_DATABASE_URL || process.env.DATABASE_URL,
        },
      },
    });
  }

  async connect() {
    await this.prisma.$connect();
  }

  async disconnect() {
    await this.prisma.$disconnect();
  }

  async cleanup() {
    // Delete in reverse order of dependencies
    await this.prisma.milestoneAchievement.deleteMany();
    await this.prisma.milestone.deleteMany();
    await this.prisma.projectReviewResponse.deleteMany();
    await this.prisma.codeComment.deleteMany();
    await this.prisma.projectReview.deleteMany();
    await this.prisma.projectSubmission.deleteMany();
    await this.prisma.portfolioConfig.deleteMany();
    await this.prisma.assessmentAttempt.deleteMany();
    await this.prisma.checkpointAttempt.deleteMany();
    await this.prisma.progress.deleteMany();
    await this.prisma.dailyContent.deleteMany();
    await this.prisma.week.deleteMany();
    await this.prisma.chapter.deleteMany();
    await this.prisma.module.deleteMany();
    await this.prisma.learningPath.deleteMany();
    await this.prisma.user.deleteMany();
  }

  getClient() {
    return this.prisma;
  }
}

export class TestRedis {
  private client: RedisClientType;

  constructor() {
    this.client = createClient({
      url: process.env.TEST_REDIS_URL || process.env.REDIS_URL,
    });
  }

  async connect() {
    await this.client.connect();
  }

  async disconnect() {
    await this.client.quit();
  }

  async cleanup() {
    await this.client.flushDb();
  }

  getClient() {
    return this.client;
  }
}

export function generateTestToken(userId: string, role: string = 'learner'): string {
  return jwt.sign(
    { userId, role },
    process.env.JWT_SECRET || 'test-secret-key',
    { expiresIn: '1h' }
  );
}

export async function createTestUser(prisma: PrismaClient, overrides: any = {}) {
  return await prisma.user.create({
    data: {
      email: overrides.email || `test-${Date.now()}@example.com`,
      name: overrides.name || 'Test User',
      passwordHash: overrides.passwordHash || 'hashed-password',
      role: overrides.role || 'learner',
      authProvider: overrides.authProvider || 'email',
      ...overrides,
    },
  });
}

export async function createTestModule(prisma: PrismaClient, overrides: any = {}) {
  return await prisma.module.create({
    data: {
      title: overrides.title || 'Test Module',
      description: overrides.description || 'Test module description',
      order: overrides.order || 1,
      duration: overrides.duration || 40,
      weeks: overrides.weeks || 2,
      prerequisites: overrides.prerequisites || [],
      learningObjectives: overrides.learningObjectives || ['Objective 1'],
      version: overrides.version || '1.0.0',
      ...overrides,
    },
  });
}

export async function createTestWeek(prisma: PrismaClient, moduleId: string, overrides: any = {}) {
  return await prisma.week.create({
    data: {
      moduleId,
      weekNumber: overrides.weekNumber || 1,
      title: overrides.title || 'Test Week',
      ...overrides,
    },
  });
}

export async function createTestDailyContent(prisma: PrismaClient, weekId: string, overrides: any = {}) {
  return await prisma.dailyContent.create({
    data: {
      weekId,
      dayNumber: overrides.dayNumber || 1,
      topic: overrides.topic || 'Test Topic',
      hours: overrides.hours || 3,
      type: overrides.type || 'content',
      description: overrides.description || 'Test description',
      learningObjectives: overrides.learningObjectives || ['Objective 1'],
      ...overrides,
    },
  });
}

export async function createTestChapter(prisma: PrismaClient, moduleId: string, weekId: string, overrides: any = {}) {
  return await prisma.chapter.create({
    data: {
      moduleId,
      weekId,
      dayNumber: overrides.dayNumber || 1,
      title: overrides.title || 'Test Chapter',
      slug: overrides.slug || `test-chapter-${Date.now()}`,
      order: overrides.order || 1,
      contentPath: overrides.contentPath || '/content/test.mdx',
      duration: overrides.duration || 30,
      difficulty: overrides.difficulty || 'beginner',
      tags: overrides.tags || ['test'],
      version: overrides.version || '1.0.0',
      ...overrides,
    },
  });
}

export async function createTestMilestone(prisma: PrismaClient, moduleId: string, overrides: any = {}) {
  return await prisma.milestone.create({
    data: {
      moduleId,
      milestoneText: overrides.milestoneText || 'Test Milestone',
      badgeIcon: overrides.badgeIcon || '🏆',
      unlockCriteria: overrides.unlockCriteria || { type: 'module-completion' },
      order: overrides.order || 1,
      ...overrides,
    },
  });
}

export async function createTestLearningPath(prisma: PrismaClient, userId: string, overrides: any = {}) {
  return await prisma.learningPath.create({
    data: {
      userId,
      entryModule: overrides.entryModule || 'module-0',
      totalWeeks: overrides.totalWeeks || 30,
      weeklyHours: overrides.weeklyHours || 20,
      estimatedCompletionDate: overrides.estimatedCompletionDate || new Date(Date.now() + 30 * 7 * 24 * 60 * 60 * 1000),
      ...overrides,
    },
  });
}

export async function createTestProgress(prisma: PrismaClient, userId: string, chapterId: string, overrides: any = {}) {
  return await prisma.progress.create({
    data: {
      userId,
      chapterId,
      completed: overrides.completed !== undefined ? overrides.completed : true,
      timeSpent: overrides.timeSpent || 30,
      assessmentScore: overrides.assessmentScore,
      ...overrides,
    },
  });
}

export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
