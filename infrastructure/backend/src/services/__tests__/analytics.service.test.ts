import { PrismaClient } from '@prisma/client';
import {
  trackEvent,
  getChapterMetrics,
  getDashboardMetrics,
  anonymizeData,
  EventData,
} from '../analytics.service';

// Mock Prisma Client
jest.mock('@prisma/client', () => {
  const mockPrismaClient = {
    analyticsEvent: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
    user: {
      count: jest.fn(),
    },
    module: {
      count: jest.fn(),
    },
    chapter: {
      count: jest.fn(),
    },
    progress: {
      count: jest.fn(),
    },
  };

  return {
    PrismaClient: jest.fn(() => mockPrismaClient),
  };
});

describe('Analytics Service', () => {
  let prisma: any;

  beforeEach(() => {
    // Get the mocked prisma instance
    prisma = new PrismaClient();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('trackEvent', () => {
    it('should track event with all fields', async () => {
      const eventData: EventData = {
        userId: 'user-123',
        eventType: 'chapter_view',
        eventData: { duration: 300 },
        moduleId: 'module-1',
        chapterId: 'chapter-1',
      };

      prisma.analyticsEvent.create.mockResolvedValue({
        id: 'event-1',
        ...eventData,
        eventData: JSON.stringify(eventData.eventData),
        createdAt: new Date(),
      });

      await trackEvent(eventData);

      expect(prisma.analyticsEvent.create).toHaveBeenCalledWith({
        data: {
          userId: 'user-123',
          eventType: 'chapter_view',
          eventData: JSON.stringify({ duration: 300 }),
          moduleId: 'module-1',
          chapterId: 'chapter-1',
        },
      });
      expect(prisma.analyticsEvent.create).toHaveBeenCalledTimes(1);
    });

    it('should track event without optional fields', async () => {
      const eventData: EventData = {
        userId: 'user-123',
        eventType: 'login',
      };

      prisma.analyticsEvent.create.mockResolvedValue({
        id: 'event-2',
        ...eventData,
        eventData: null,
        moduleId: null,
        chapterId: null,
        createdAt: new Date(),
      });

      await trackEvent(eventData);

      expect(prisma.analyticsEvent.create).toHaveBeenCalledWith({
        data: {
          userId: 'user-123',
          eventType: 'login',
          eventData: null,
          moduleId: undefined,
          chapterId: undefined,
        },
      });
    });

    it('should handle event data serialization', async () => {
      const complexEventData: EventData = {
        userId: 'user-123',
        eventType: 'assessment_complete',
        eventData: {
          score: 85,
          answers: ['A', 'B', 'C'],
          metadata: { difficulty: 'medium' },
        },
      };

      prisma.analyticsEvent.create.mockResolvedValue({
        id: 'event-3',
        userId: complexEventData.userId,
        eventType: complexEventData.eventType,
        eventData: JSON.stringify(complexEventData.eventData),
        createdAt: new Date(),
      });

      await trackEvent(complexEventData);

      expect(prisma.analyticsEvent.create).toHaveBeenCalledWith({
        data: {
          userId: 'user-123',
          eventType: 'assessment_complete',
          eventData: JSON.stringify({
            score: 85,
            answers: ['A', 'B', 'C'],
            metadata: { difficulty: 'medium' },
          }),
          moduleId: undefined,
          chapterId: undefined,
        },
      });
    });

    it('should handle database errors gracefully', async () => {
      const eventData: EventData = {
        userId: 'user-123',
        eventType: 'error_event',
      };

      prisma.analyticsEvent.create.mockRejectedValue(
        new Error('Database connection failed')
      );

      await expect(trackEvent(eventData)).rejects.toThrow(
        'Database connection failed'
      );
    });
  });

  describe('getChapterMetrics', () => {
    it('should calculate chapter metrics correctly', async () => {
      const mockEvents = [
        {
          id: '1',
          userId: 'user-1',
          eventType: 'chapter_view',
          chapterId: 'chapter-1',
          createdAt: new Date(),
        },
        {
          id: '2',
          userId: 'user-2',
          eventType: 'chapter_view',
          chapterId: 'chapter-1',
          createdAt: new Date(),
        },
        {
          id: '3',
          userId: 'user-1',
          eventType: 'chapter_complete',
          chapterId: 'chapter-1',
          createdAt: new Date(),
        },
        {
          id: '4',
          userId: 'user-3',
          eventType: 'chapter_view',
          chapterId: 'chapter-1',
          createdAt: new Date(),
        },
      ];

      prisma.analyticsEvent.findMany.mockResolvedValue(mockEvents);

      const metrics = await getChapterMetrics('chapter-1');

      expect(prisma.analyticsEvent.findMany).toHaveBeenCalledWith({
        where: { chapterId: 'chapter-1' },
        orderBy: { createdAt: 'desc' },
      });

      expect(metrics).toEqual({
        chapterId: 'chapter-1',
        totalViews: 3,
        totalCompletions: 1,
        completionRate: (1 / 3) * 100,
        avgTimeSpent: 0,
      });
    });

    it('should handle zero views correctly', async () => {
      prisma.analyticsEvent.findMany.mockResolvedValue([]);

      const metrics = await getChapterMetrics('chapter-empty');

      expect(metrics).toEqual({
        chapterId: 'chapter-empty',
        totalViews: 0,
        totalCompletions: 0,
        completionRate: 0,
        avgTimeSpent: 0,
      });
    });

    it('should calculate 100% completion rate', async () => {
      const mockEvents = [
        {
          id: '1',
          userId: 'user-1',
          eventType: 'chapter_view',
          chapterId: 'chapter-2',
          createdAt: new Date(),
        },
        {
          id: '2',
          userId: 'user-1',
          eventType: 'chapter_complete',
          chapterId: 'chapter-2',
          createdAt: new Date(),
        },
      ];

      prisma.analyticsEvent.findMany.mockResolvedValue(mockEvents);

      const metrics = await getChapterMetrics('chapter-2');

      expect(metrics.completionRate).toBe(100);
    });

    it('should filter events by chapter ID correctly', async () => {
      const mockEvents = [
        {
          id: '1',
          userId: 'user-1',
          eventType: 'chapter_view',
          chapterId: 'chapter-3',
          createdAt: new Date(),
        },
      ];

      prisma.analyticsEvent.findMany.mockResolvedValue(mockEvents);

      await getChapterMetrics('chapter-3');

      expect(prisma.analyticsEvent.findMany).toHaveBeenCalledWith({
        where: { chapterId: 'chapter-3' },
        orderBy: { createdAt: 'desc' },
      });
    });

    it('should handle mixed event types', async () => {
      const mockEvents = [
        {
          id: '1',
          userId: 'user-1',
          eventType: 'chapter_view',
          chapterId: 'chapter-4',
          createdAt: new Date(),
        },
        {
          id: '2',
          userId: 'user-1',
          eventType: 'code_execute',
          chapterId: 'chapter-4',
          createdAt: new Date(),
        },
        {
          id: '3',
          userId: 'user-1',
          eventType: 'chapter_complete',
          chapterId: 'chapter-4',
          createdAt: new Date(),
        },
        {
          id: '4',
          userId: 'user-2',
          eventType: 'assessment_start',
          chapterId: 'chapter-4',
          createdAt: new Date(),
        },
      ];

      prisma.analyticsEvent.findMany.mockResolvedValue(mockEvents);

      const metrics = await getChapterMetrics('chapter-4');

      expect(metrics.totalViews).toBe(1);
      expect(metrics.totalCompletions).toBe(1);
    });
  });

  describe('getDashboardMetrics', () => {
    it('should aggregate dashboard metrics correctly', async () => {
      prisma.user.count.mockResolvedValue(150);
      prisma.module.count.mockResolvedValue(7);
      prisma.chapter.count.mockResolvedValue(120);
      prisma.progress.count
        .mockResolvedValueOnce(450) // Total completed progress
        .mockResolvedValueOnce(25); // Recent completions

      const metrics = await getDashboardMetrics();

      expect(metrics).toEqual({
        totalUsers: 150,
        totalModules: 7,
        totalChapters: 120,
        overallCompletionRate: (450 / 120) * 100,
        recentCompletions: 25,
      });

      expect(prisma.user.count).toHaveBeenCalledTimes(1);
      expect(prisma.module.count).toHaveBeenCalledTimes(1);
      expect(prisma.chapter.count).toHaveBeenCalledTimes(2);
      expect(prisma.progress.count).toHaveBeenCalledTimes(2);
    });

    it('should handle zero chapters gracefully', async () => {
      prisma.user.count.mockResolvedValue(10);
      prisma.module.count.mockResolvedValue(0);
      prisma.chapter.count.mockResolvedValue(0);
      prisma.progress.count.mockResolvedValue(0);

      const metrics = await getDashboardMetrics();

      expect(metrics.overallCompletionRate).toBe(0);
    });

    it('should calculate recent completions with correct date filter', async () => {
      const mockDate = new Date('2024-01-15T12:00:00Z');
      jest.useFakeTimers();
      jest.setSystemTime(mockDate);

      prisma.user.count.mockResolvedValue(100);
      prisma.module.count.mockResolvedValue(5);
      prisma.chapter.count.mockResolvedValue(50);
      prisma.progress.count
        .mockResolvedValueOnce(200)
        .mockResolvedValueOnce(15);

      await getDashboardMetrics();

      const expectedDate = new Date('2024-01-08T12:00:00Z');

      expect(prisma.progress.count).toHaveBeenNthCalledWith(2, {
        where: {
          completed: true,
          completedAt: { gte: expect.any(Date) },
        },
      });

      // Verify the date is approximately 7 days ago
      const callArgs = prisma.progress.count.mock.calls[1][0];
      const actualDate = callArgs.where.completedAt.gte;
      const timeDiff = Math.abs(actualDate.getTime() - expectedDate.getTime());
      expect(timeDiff).toBeLessThan(1000); // Within 1 second

      jest.useRealTimers();
    });

    it('should handle high completion rates', async () => {
      prisma.user.count.mockResolvedValue(1000);
      prisma.module.count.mockResolvedValue(7);
      prisma.chapter.count.mockResolvedValue(100);
      prisma.progress.count
        .mockResolvedValueOnce(9500) // 95 completions per chapter
        .mockResolvedValueOnce(500);

      const metrics = await getDashboardMetrics();

      expect(metrics.overallCompletionRate).toBe(9500);
    });

    it('should handle database errors', async () => {
      prisma.user.count.mockRejectedValue(new Error('Database error'));

      await expect(getDashboardMetrics()).rejects.toThrow('Database error');
    });
  });

  describe('anonymizeData', () => {
    it('should anonymize email addresses', () => {
      const data = {
        userId: 'user-123',
        email: 'john.doe@example.com',
        score: 85,
      };

      const anonymized = anonymizeData(data);

      expect(anonymized.userId).toBe('user-123');
      expect(anonymized.email).toMatch(/^anonymized@/);
      expect(anonymized.email).not.toBe('john.doe@example.com');
      expect(anonymized.score).toBe(85);
    });

    it('should anonymize names', () => {
      const data = {
        userId: 'user-456',
        name: 'Jane Smith',
        completedChapters: 10,
      };

      const anonymized = anonymizeData(data);

      expect(anonymized.name).toBe('Anonymized User');
      expect(anonymized.userId).toBe('user-456');
      expect(anonymized.completedChapters).toBe(10);
    });

    it('should anonymize both email and name', () => {
      const data = {
        email: 'test@example.com',
        name: 'Test User',
        progress: 50,
      };

      const anonymized = anonymizeData(data);

      expect(anonymized.email).toMatch(/^anonymized@/);
      expect(anonymized.name).toBe('Anonymized User');
      expect(anonymized.progress).toBe(50);
    });

    it('should handle data without PII', () => {
      const data = {
        userId: 'user-789',
        score: 90,
        completedAt: new Date('2024-01-01'),
      };

      const anonymized = anonymizeData(data);

      expect(anonymized).toEqual(data);
    });

    it('should not modify original data object', () => {
      const data = {
        email: 'original@example.com',
        name: 'Original Name',
        score: 75,
      };

      const anonymized = anonymizeData(data);

      expect(data.email).toBe('original@example.com');
      expect(data.name).toBe('Original Name');
      expect(anonymized.email).not.toBe(data.email);
      expect(anonymized.name).not.toBe(data.name);
    });

    it('should handle empty objects', () => {
      const data = {};
      const anonymized = anonymizeData(data);

      expect(anonymized).toEqual({});
    });

    it('should handle null and undefined values', () => {
      const data = {
        email: null,
        name: undefined,
        userId: 'user-999',
      };

      const anonymized = anonymizeData(data);

      expect(anonymized.email).toBeNull();
      expect(anonymized.name).toBeUndefined();
      expect(anonymized.userId).toBe('user-999');
    });

    it('should create consistent anonymized emails', () => {
      const data1 = { email: 'test@example.com' };
      const data2 = { email: 'test@example.com' };

      const anonymized1 = anonymizeData(data1);
      const anonymized2 = anonymizeData(data2);

      // Same email should produce same anonymized result
      expect(anonymized1.email).toBe(anonymized2.email);
    });

    it('should handle complex nested objects', () => {
      const data = {
        user: {
          email: 'nested@example.com',
          name: 'Nested User',
        },
        metadata: {
          score: 95,
        },
      };

      const anonymized = anonymizeData(data);

      // Top-level anonymization only
      expect(anonymized.user).toEqual(data.user);
      expect(anonymized.metadata).toEqual(data.metadata);
    });

    it('should preserve data types', () => {
      const data = {
        email: 'type@example.com',
        name: 'Type Test',
        score: 88,
        active: true,
        completedAt: new Date('2024-01-01'),
        tags: ['tag1', 'tag2'],
      };

      const anonymized = anonymizeData(data);

      expect(typeof anonymized.score).toBe('number');
      expect(typeof anonymized.active).toBe('boolean');
      expect(anonymized.completedAt).toBeInstanceOf(Date);
      expect(Array.isArray(anonymized.tags)).toBe(true);
    });
  });

  describe('Integration scenarios', () => {
    it('should track and retrieve metrics for a learning session', async () => {
      // Track multiple events
      const events = [
        {
          userId: 'user-session',
          eventType: 'chapter_view',
          chapterId: 'chapter-session',
        },
        {
          userId: 'user-session',
          eventType: 'code_execute',
          chapterId: 'chapter-session',
          eventData: { success: true },
        },
        {
          userId: 'user-session',
          eventType: 'chapter_complete',
          chapterId: 'chapter-session',
        },
      ];

      prisma.analyticsEvent.create.mockResolvedValue({});

      for (const event of events) {
        await trackEvent(event);
      }

      expect(prisma.analyticsEvent.create).toHaveBeenCalledTimes(3);

      // Retrieve metrics
      prisma.analyticsEvent.findMany.mockResolvedValue([
        {
          id: '1',
          userId: 'user-session',
          eventType: 'chapter_view',
          chapterId: 'chapter-session',
          createdAt: new Date(),
        },
        {
          id: '2',
          userId: 'user-session',
          eventType: 'chapter_complete',
          chapterId: 'chapter-session',
          createdAt: new Date(),
        },
      ]);

      const metrics = await getChapterMetrics('chapter-session');

      expect(metrics.totalViews).toBe(1);
      expect(metrics.totalCompletions).toBe(1);
      expect(metrics.completionRate).toBe(100);
    });

    it('should handle concurrent event tracking', async () => {
      const events = Array.from({ length: 10 }, (_, i) => ({
        userId: `user-${i}`,
        eventType: 'chapter_view',
        chapterId: 'chapter-concurrent',
      }));

      prisma.analyticsEvent.create.mockResolvedValue({});

      await Promise.all(events.map((event) => trackEvent(event)));

      expect(prisma.analyticsEvent.create).toHaveBeenCalledTimes(10);
    });

    it('should anonymize data before aggregation', async () => {
      const userData = {
        userId: 'user-gdpr',
        email: 'gdpr@example.com',
        name: 'GDPR User',
        completedChapters: 15,
        score: 92,
      };

      const anonymized = anonymizeData(userData);

      expect(anonymized.email).not.toBe(userData.email);
      expect(anonymized.name).toBe('Anonymized User');
      expect(anonymized.completedChapters).toBe(15);
      expect(anonymized.score).toBe(92);
    });
  });
});
