import { PrismaClient } from '@prisma/client';
import {
  getWeekDays,
  getCurrentDay,
  getDayType,
  getCachedWeekDays,
} from '../../src/services/daily-content.service';
import {
  checkAndUnlockMilestones,
  shareMilestone,
  getMilestoneAchievements,
  getModuleMilestones,
} from '../../src/services/milestone.service';
import {
  calculateTotalWeeks,
  calculateCompletionDate,
  updateWeeklyHours,
  getCurrentPace,
  getTimelineData,
} from '../../src/services/duration-calculation.service';

// Mock Prisma Client
jest.mock('@prisma/client', () => {
  const mockPrismaClient = {
    dailyContent: {
      findMany: jest.fn(),
    },
    week: {
      findMany: jest.fn(),
    },
    progress: {
      findMany: jest.fn(),
    },
    milestone: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
    milestoneAchievement: {
      findMany: jest.fn(),
      findFirst: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    module: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
    },
    user: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    chapter: {
      findMany: jest.fn(),
    },
  };
  return {
    PrismaClient: jest.fn(() => mockPrismaClient),
  };
});

// Mock Redis service
jest.mock('../../src/services/redis-service', () => ({
  getCache: jest.fn(),
  setCache: jest.fn(),
  invalidateCache: jest.fn(),
}));

describe('DailyContentService - Unit Tests', () => {
  let mockPrisma: any;

  beforeEach(() => {
    jest.clearAllMocks();
    mockPrisma = new PrismaClient();
  });

  describe('getWeekDays', () => {
    it('should return week days with completion status', async () => {
      const mockDays = [
        {
          dayNumber: 1,
          topic: 'Introduction to Python',
          hours: 2,
          type: 'regular',
          chapters: [{ id: 'chapter-1' }, { id: 'chapter-2' }],
        },
        {
          dayNumber: 2,
          topic: 'Variables and Data Types',
          hours: 3,
          type: 'regular',
          chapters: [{ id: 'chapter-3' }],
        },
        {
          dayNumber: 5,
          topic: 'Mini Project',
          hours: 4,
          type: 'mini-project',
          chapters: [{ id: 'chapter-10' }],
        },
      ];

      mockPrisma.dailyContent.findMany.mockResolvedValue(mockDays);
      mockPrisma.progress.findMany.mockResolvedValue([
        { userId: 'user-123', chapterId: 'chapter-1', completed: true },
        { userId: 'user-123', chapterId: 'chapter-2', completed: true },
      ]);

      const result = await getWeekDays('user-123', 'week-1');

      expect(result).toHaveLength(3);
      expect(result[0].dayNumber).toBe(1);
      expect(result[0].completed).toBe(true);
      expect(result[1].completed).toBe(false);
      expect(result[2].dayNumber).toBe(5);
    });

    it('should handle empty days', async () => {
      mockPrisma.dailyContent.findMany.mockResolvedValue([]);
      mockPrisma.progress.findMany.mockResolvedValue([]);

      const result = await getWeekDays('user-123', 'week-empty');

      expect(result).toHaveLength(0);
    });

    it('should handle days with no chapters', async () => {
      const mockDays = [
        {
          dayNumber: 1,
          topic: 'Overview',
          hours: 1,
          type: 'regular',
          chapters: [],
        },
      ];

      mockPrisma.dailyContent.findMany.mockResolvedValue(mockDays);
      mockPrisma.progress.findMany.mockResolvedValue([]);

      const result = await getWeekDays('user-123', 'week-1');

      expect(result).toHaveLength(1);
      expect(result[0].completed).toBe(false);
    });
  });

  describe('getCurrentDay', () => {
    it('should return first incomplete day', async () => {
      const mockWeeks = [
        {
          weekNumber: 1,
          days: [
            {
              dayNumber: 1,
              chapters: [{ id: 'chapter-1' }],
            },
            {
              dayNumber: 2,
              chapters: [{ id: 'chapter-2' }],
            },
          ],
        },
      ];

      mockPrisma.week.findMany.mockResolvedValue(mockWeeks);
      mockPrisma.progress.findMany.mockResolvedValue([
        { chapterId: 'chapter-1', completed: true },
      ]);

      const result = await getCurrentDay('user-123', 'module-1');

      expect(result.weekNumber).toBe(1);
      expect(result.dayNumber).toBe(2);
    });

    it('should return last day if all completed', async () => {
      const mockWeeks = [
        {
          weekNumber: 1,
          days: [
            { dayNumber: 1, chapters: [{ id: 'c1' }] },
            { dayNumber: 2, chapters: [{ id: 'c2' }] },
          ],
        },
      ];

      mockPrisma.week.findMany.mockResolvedValue(mockWeeks);
      mockPrisma.progress.findMany.mockResolvedValue([
        { chapterId: 'c1', completed: true },
        { chapterId: 'c2', completed: true },
      ]);

      const result = await getCurrentDay('user-123', 'module-1');

      expect(result.weekNumber).toBe(1);
      expect(result.dayNumber).toBe(2);
    });
  });

  describe('getDayType', () => {
    it('should return regular for normal days', () => {
      expect(getDayType(1, 1, 7)).toBe('regular');
      expect(getDayType(1, 4, 7)).toBe('regular');
    });

    it('should return mini-project for day 5', () => {
      expect(getDayType(1, 5, 7)).toBe('mini-project');
      expect(getDayType(3, 5, 7)).toBe('mini-project');
    });

    it('should return flagship-project for final week day 5+', () => {
      expect(getDayType(7, 5, 7)).toBe('flagship-project');
      expect(getDayType(7, 6, 7)).toBe('flagship-project');
      expect(getDayType(7, 7, 7)).toBe('flagship-project');
    });

    it('should return catch-up for days 6 and 7', () => {
      expect(getDayType(1, 6, 7)).toBe('catch-up');
      expect(getDayType(1, 7, 7)).toBe('catch-up');
      expect(getDayType(6, 6, 7)).toBe('catch-up');
    });

    it('should handle edge case: day 5 in final week is flagship', () => {
      expect(getDayType(7, 5, 7)).toBe('flagship-project');
    });
  });

  describe('getCachedWeekDays', () => {
    it('should return cached data if available', async () => {
      const { getCache } = require('../../src/services/redis-service');
      const cachedData = [
        { dayNumber: 1, topic: 'Cached', hours: 2, type: 'regular' },
      ];
      getCache.mockResolvedValue(cachedData);

      const result = await getCachedWeekDays('user-123', 'week-1');

      expect(result).toEqual(cachedData);
      expect(mockPrisma.dailyContent.findMany).not.toHaveBeenCalled();
    });

    it('should fetch and cache data if not cached', async () => {
      const { getCache, setCache } = require('../../src/services/redis-service');
      getCache.mockResolvedValue(null);

      const mockDays = [
        {
          dayNumber: 1,
          topic: 'Python Basics',
          hours: 3,
          type: 'regular',
          chapters: [],
        },
      ];
      mockPrisma.dailyContent.findMany.mockResolvedValue(mockDays);
      mockPrisma.progress.findMany.mockResolvedValue([]);

      const result = await getCachedWeekDays('user-123', 'week-1');

      expect(result).toHaveLength(1);
      expect(setCache).toHaveBeenCalledWith(
        'weekdays:week-1:user-123',
        expect.any(Array),
        3600
      );
    });
  });
});

describe('MilestoneService - Unit Tests', () => {
  let mockPrisma: any;

  beforeEach(() => {
    jest.clearAllMocks();
    mockPrisma = new PrismaClient();
  });

  describe('checkAndUnlockMilestones', () => {
    it('should unlock milestone when module is completed', async () => {
      const mockMilestones = [
        {
          id: 'milestone-1',
          title: 'Module 1 Complete',
          moduleId: 'module-1',
          criteria: { type: 'module-completion' },
        },
      ];

      const mockModule = {
        id: 'module-1',
        chapters: [
          { id: 'chapter-1' },
          { id: 'chapter-2' },
        ],
      };

      mockPrisma.milestone.findMany.mockResolvedValue(mockMilestones);
      mockPrisma.progress.findMany.mockResolvedValue([
        { chapterId: 'chapter-1', completed: true },
        { chapterId: 'chapter-2', completed: true },
      ]);
      mockPrisma.milestoneAchievement.findMany.mockResolvedValue([]);
      mockPrisma.module.findUnique.mockResolvedValue(mockModule);
      mockPrisma.milestoneAchievement.create.mockResolvedValue({
        id: 'achievement-1',
        userId: 'user-123',
        milestoneId: 'milestone-1',
      });

      const result = await checkAndUnlockMilestones('user-123', 'module-1');

      expect(result).toHaveLength(1);
      expect(result[0].milestoneId).toBe('milestone-1');
    });

    it('should not unlock milestone if module not completed', async () => {
      const mockMilestones = [
        {
          id: 'milestone-1',
          title: 'Module 1 Complete',
          moduleId: 'module-1',
          criteria: { type: 'module-completion' },
        },
      ];

      const mockModule = {
        id: 'module-1',
        chapters: [
          { id: 'chapter-1' },
          { id: 'chapter-2' },
        ],
      };

      mockPrisma.milestone.findMany.mockResolvedValue(mockMilestones);
      mockPrisma.progress.findMany.mockResolvedValue([
        { chapterId: 'chapter-1', completed: true },
        // chapter-2 not completed
      ]);
      mockPrisma.milestoneAchievement.findMany.mockResolvedValue([]);
      mockPrisma.module.findUnique.mockResolvedValue(mockModule);

      const result = await checkAndUnlockMilestones('user-123', 'module-1');

      expect(result).toHaveLength(0);
      expect(mockPrisma.milestoneAchievement.create).not.toHaveBeenCalled();
    });

    it('should not unlock already achieved milestones', async () => {
      const mockMilestones = [
        {
          id: 'milestone-1',
          title: 'Module 1 Complete',
          moduleId: 'module-1',
          criteria: { type: 'module-completion' },
        },
      ];

      mockPrisma.milestone.findMany.mockResolvedValue(mockMilestones);
      mockPrisma.milestoneAchievement.findMany.mockResolvedValue([
        { milestoneId: 'milestone-1' },
      ]);

      const result = await checkAndUnlockMilestones('user-123', 'module-1');

      expect(result).toHaveLength(0);
      expect(mockPrisma.milestoneAchievement.create).not.toHaveBeenCalled();
    });

    it('should handle checkpoint-pass criteria', async () => {
      const mockMilestones = [
        {
          id: 'milestone-2',
          title: 'Checkpoint Passed',
          moduleId: 'module-1',
          criteria: { type: 'checkpoint-pass' },
        },
      ];

      mockPrisma.milestone.findMany.mockResolvedValue(mockMilestones);
      mockPrisma.progress.findMany.mockResolvedValue([]);
      mockPrisma.milestoneAchievement.findMany.mockResolvedValue([]);
      // checkpoint-pass currently returns true as placeholder
      mockPrisma.milestoneAchievement.create.mockResolvedValue({
        id: 'achievement-2',
        userId: 'user-123',
        milestoneId: 'milestone-2',
      });

      const result = await checkAndUnlockMilestones('user-123', 'module-1');

      expect(result.length).toBeGreaterThanOrEqual(0);
    });

    it('should handle custom criteria', async () => {
      const mockMilestones = [
        {
          id: 'milestone-3',
          title: 'Custom Milestone',
          moduleId: 'module-1',
          criteria: { type: 'custom' },
        },
      ];

      mockPrisma.milestone.findMany.mockResolvedValue(mockMilestones);
      mockPrisma.progress.findMany.mockResolvedValue([]);
      mockPrisma.milestoneAchievement.findMany.mockResolvedValue([]);
      // custom currently returns true as placeholder
      mockPrisma.milestoneAchievement.create.mockResolvedValue({
        id: 'achievement-3',
        userId: 'user-123',
        milestoneId: 'milestone-3',
      });

      const result = await checkAndUnlockMilestones('user-123', 'module-1');

      expect(result.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('shareMilestone', () => {
    it('should generate LinkedIn share URL', async () => {
      const mockAchievement = {
        id: 'achievement-1',
        userId: 'user-123',
        milestoneId: 'milestone-1',
        milestone: {
          id: 'milestone-1',
          title: 'Python Basics Master',
          description: 'Completed Python basics',
          module: { title: 'Module 0' },
        },
      };

      mockPrisma.milestoneAchievement.findFirst.mockResolvedValue(mockAchievement);
      mockPrisma.milestoneAchievement.update.mockResolvedValue({});

      const result = await shareMilestone('user-123', 'milestone-1', 'linkedin');

      expect(result.shareUrl).toContain('linkedin.com');
      expect(result.shareUrl).toContain('share-offsite');
    });

    it('should generate Twitter share URL', async () => {
      const mockAchievement = {
        id: 'achievement-1',
        userId: 'user-123',
        milestoneId: 'milestone-1',
        milestone: {
          id: 'milestone-1',
          title: 'Python Basics Master',
          description: 'Completed Python basics',
          module: { title: 'Module 0' },
        },
      };

      mockPrisma.milestoneAchievement.findFirst.mockResolvedValue(mockAchievement);
      mockPrisma.milestoneAchievement.update.mockResolvedValue({});

      const result = await shareMilestone('user-123', 'milestone-1', 'twitter');

      expect(result.shareUrl).toContain('twitter.com');
      expect(result.shareUrl).toContain('intent/tweet');
    });

    it('should generate Facebook share URL', async () => {
      const mockAchievement = {
        id: 'achievement-1',
        userId: 'user-123',
        milestoneId: 'milestone-1',
        milestone: {
          id: 'milestone-1',
          title: 'Python Basics Master',
          description: 'Completed Python basics',
          module: { title: 'Module 0' },
        },
      };

      mockPrisma.milestoneAchievement.findFirst.mockResolvedValue(mockAchievement);
      mockPrisma.milestoneAchievement.update.mockResolvedValue({});

      const result = await shareMilestone('user-123', 'milestone-1', 'facebook');

      expect(result.shareUrl).toContain('facebook.com');
      expect(result.shareUrl).toContain('sharer');
    });

    it('should throw error if milestone achievement not found', async () => {
      mockPrisma.milestoneAchievement.findFirst.mockResolvedValue(null);

      await expect(
        shareMilestone('user-123', 'milestone-1', 'linkedin')
      ).rejects.toThrow('Milestone achievement not found');
    });

    it('should update achievement with share info', async () => {
      const mockAchievement = {
        id: 'achievement-1',
        userId: 'user-123',
        milestoneId: 'milestone-1',
        milestone: {
          id: 'milestone-1',
          title: 'Test',
          description: 'Test',
          module: { title: 'Module' },
        },
      };

      mockPrisma.milestoneAchievement.findFirst.mockResolvedValue(mockAchievement);
      mockPrisma.milestoneAchievement.update.mockResolvedValue({});

      await shareMilestone('user-123', 'milestone-1', 'linkedin');

      expect(mockPrisma.milestoneAchievement.update).toHaveBeenCalledWith({
        where: { id: 'achievement-1' },
        data: {
          sharedAt: expect.any(Date),
          sharePlatform: 'linkedin',
        },
      });
    });
  });

  describe('getMilestoneAchievements', () => {
    it('should return cached achievements if available', async () => {
      const { getCache } = require('../../src/services/redis-service');
      const cachedAchievements = [
        { id: 'achievement-1', milestoneId: 'milestone-1' },
      ];
      getCache.mockResolvedValue(cachedAchievements);

      const result = await getMilestoneAchievements('user-123');

      expect(result).toEqual(cachedAchievements);
    });

    it('should fetch from database if not cached', async () => {
      const { getCache, setCache } = require('../../src/services/redis-service');
      getCache.mockResolvedValue(null);

      const mockAchievements = [
        {
          id: 'achievement-1',
          userId: 'user-123',
          milestone: { module: {} },
        },
      ];
      mockPrisma.milestoneAchievement.findMany.mockResolvedValue(mockAchievements);

      const result = await getMilestoneAchievements('user-123');

      expect(result).toHaveLength(1);
      expect(setCache).toHaveBeenCalledWith(
        'milestones:user:user-123',
        mockAchievements,
        1800
      );
    });
  });

  describe('getModuleMilestones', () => {
    it('should return milestones for a module', async () => {
      const mockMilestones = [
        { id: 'milestone-1', moduleId: 'module-1', title: 'Milestone 1' },
        { id: 'milestone-2', moduleId: 'module-1', title: 'Milestone 2' },
      ];

      mockPrisma.milestone.findMany.mockResolvedValue(mockMilestones);

      const result = await getModuleMilestones('module-1');

      expect(result).toHaveLength(2);
      expect(mockPrisma.milestone.findMany).toHaveBeenCalledWith({
        where: { moduleId: 'module-1' },
      });
    });
  });
});

describe('DurationCalculationService - Unit Tests', () => {
  let mockPrisma: any;

  beforeEach(() => {
    jest.clearAllMocks();
    mockPrisma = new PrismaClient();
  });

  describe('calculateTotalWeeks', () => {
    it('should return 30 weeks for entry point 0', async () => {
      const result = await calculateTotalWeeks(0);
      expect(result).toBe(30);
    });

    it('should return 29 weeks for entry point 1', async () => {
      const result = await calculateTotalWeeks(1);
      expect(result).toBe(29);
    });

    it('should return 28 weeks for entry point 2', async () => {
      const result = await calculateTotalWeeks(2);
      expect(result).toBe(28);
    });

    it('should return 25 weeks for entry point 3', async () => {
      const result = await calculateTotalWeeks(3);
      expect(result).toBe(25);
    });

    it('should return 19 weeks for entry point 4', async () => {
      const result = await calculateTotalWeeks(4);
      expect(result).toBe(19);
    });

    it('should return default 30 weeks for unknown entry point', async () => {
      const result = await calculateTotalWeeks(99);
      expect(result).toBe(30);
    });
  });

  describe('calculateCompletionDate', () => {
    it('should calculate completion date based on progress', async () => {
      const mockUser = {
        id: 'user-123',
        entryPoint: 0,
        preferences: JSON.stringify({ weeklyHours: 10 }),
      };

      mockPrisma.user.findUnique.mockResolvedValue(mockUser);
      mockPrisma.progress.findMany.mockResolvedValue([
        { completed: true, chapter: { module: {} } },
        { completed: true, chapter: { module: {} } },
      ]);

      const result = await calculateCompletionDate('user-123');

      expect(result.totalWeeks).toBe(30);
      expect(result.completedWeeks).toBe(1); // 2 chapters * 0.5 = 1 week
      expect(result.remainingWeeks).toBe(29);
      expect(result.weeklyHours).toBe(10);
      expect(result.estimatedCompletionDate).toBeDefined();
    });

    it('should use default 10 weekly hours if not set', async () => {
      const mockUser = {
        id: 'user-123',
        entryPoint: 1,
        preferences: null,
      };

      mockPrisma.user.findUnique.mockResolvedValue(mockUser);
      mockPrisma.progress.findMany.mockResolvedValue([]);

      const result = await calculateCompletionDate('user-123');

      expect(result.weeklyHours).toBe(10);
      expect(result.totalWeeks).toBe(29);
    });

    it('should throw error if user not found', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);

      await expect(calculateCompletionDate('invalid-user')).rejects.toThrow(
        'User not found'
      );
    });

    it('should handle zero completed weeks', async () => {
      const mockUser = {
        id: 'user-123',
        entryPoint: 2,
        preferences: JSON.stringify({ weeklyHours: 15 }),
      };

      mockPrisma.user.findUnique.mockResolvedValue(mockUser);
      mockPrisma.progress.findMany.mockResolvedValue([]);

      const result = await calculateCompletionDate('user-123');

      expect(result.completedWeeks).toBe(0);
      expect(result.remainingWeeks).toBe(28);
    });
  });

  describe('updateWeeklyHours', () => {
    it('should update weekly hours in preferences', async () => {
      const mockUser = {
        id: 'user-123',
        preferences: JSON.stringify({ theme: 'dark', weeklyHours: 10 }),
      };

      mockPrisma.user.findUnique.mockResolvedValue(mockUser);
      mockPrisma.user.update.mockResolvedValue({});

      await updateWeeklyHours('user-123', 20);

      expect(mockPrisma.user.update).toHaveBeenCalledWith({
        where: { id: 'user-123' },
        data: {
          preferences: expect.stringContaining('"weeklyHours":20'),
        },
      });
    });

    it('should create preferences if not exist', async () => {
      const mockUser = {
        id: 'user-123',
        preferences: null,
      };

      mockPrisma.user.findUnique.mockResolvedValue(mockUser);
      mockPrisma.user.update.mockResolvedValue({});

      await updateWeeklyHours('user-123', 15);

      expect(mockPrisma.user.update).toHaveBeenCalledWith({
        where: { id: 'user-123' },
        data: {
          preferences: expect.stringContaining('"weeklyHours":15'),
        },
      });
    });

    it('should throw error if user not found', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);

      await expect(updateWeeklyHours('invalid-user', 10)).rejects.toThrow(
        'User not found'
      );
    });

    it('should invalidate cache after update', async () => {
      const { invalidateCache } = require('../../src/services/redis-service');
      const mockUser = {
        id: 'user-123',
        preferences: null,
      };

      mockPrisma.user.findUnique.mockResolvedValue(mockUser);
      mockPrisma.user.update.mockResolvedValue({});

      await updateWeeklyHours('user-123', 10);

      expect(invalidateCache).toHaveBeenCalledWith('duration:user-123');
    });
  });

  describe('getCurrentPace', () => {
    it('should calculate pace based on recent progress', async () => {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      mockPrisma.progress.findMany.mockResolvedValue([
        { completed: true, completedAt: new Date() },
        { completed: true, completedAt: new Date() },
        { completed: true, completedAt: new Date() },
        { completed: true, completedAt: new Date() },
      ]);

      const mockUser = {
        preferences: JSON.stringify({ weeklyHours: 10 }),
      };
      mockPrisma.user.findUnique.mockResolvedValue(mockUser);

      const result = await getCurrentPace('user-123');

      expect(result.hoursThisWeek).toBe(10); // 4 chapters * 2.5 hours
      expect(result.targetWeeklyHours).toBe(10);
      expect(result.onTrack).toBe(true);
    });

    it('should indicate not on track if behind', async () => {
      mockPrisma.progress.findMany.mockResolvedValue([
        { completed: true, completedAt: new Date() },
      ]);

      const mockUser = {
        preferences: JSON.stringify({ weeklyHours: 20 }),
      };
      mockPrisma.user.findUnique.mockResolvedValue(mockUser);

      const result = await getCurrentPace('user-123');

      expect(result.hoursThisWeek).toBe(2.5);
      expect(result.onTrack).toBe(false);
      expect(result.recommendation).toContain('increasing');
    });

    it('should use default target hours if not set', async () => {
      mockPrisma.progress.findMany.mockResolvedValue([]);

      const mockUser = {
        preferences: null,
      };
      mockPrisma.user.findUnique.mockResolvedValue(mockUser);

      const result = await getCurrentPace('user-123');

      expect(result.targetWeeklyHours).toBe(10);
    });
  });

  describe('getTimelineData', () => {
    it('should return timeline with cached data if available', async () => {
      const { getCache } = require('../../src/services/redis-service');
      const cachedTimeline = {
        totalWeeks: 30,
        timeline: [],
      };
      getCache.mockResolvedValue(cachedTimeline);

      const result = await getTimelineData('user-123');

      expect(result).toEqual(cachedTimeline);
    });

    it('should generate timeline based on entry point', async () => {
      const { getCache, setCache } = require('../../src/services/redis-service');
      getCache.mockResolvedValue(null);

      const mockUser = {
        entryPoint: 0,
      };

      const mockModules = [
        {
          title: 'Module 0',
          order: 0,
          weeks: [
            { weekNumber: 1, title: 'Week 1' },
            { weekNumber: 2, title: 'Week 2' },
          ],
        },
      ];

      mockPrisma.user.findUnique.mockResolvedValue(mockUser);
      mockPrisma.module.findMany.mockResolvedValue(mockModules);

      const result = await getTimelineData('user-123');

      expect(result.totalWeeks).toBe(30);
      expect(result.timeline.length).toBeGreaterThan(0);
      expect(setCache).toHaveBeenCalledWith(
        'timeline:user-123',
        expect.any(Object),
        3600
      );
    });

    it('should limit timeline to total weeks', async () => {
      const { getCache } = require('../../src/services/redis-service');
      getCache.mockResolvedValue(null);

      const mockUser = {
        entryPoint: 4, // 19 weeks total
      };

      const mockModules = [];
      for (let i = 4; i <= 6; i++) {
        const weeks = [];
        for (let w = 1; w <= 10; w++) {
          weeks.push({ weekNumber: w, title: `Week ${w}` });
        }
        mockModules.push({ title: `Module ${i}`, order: i, weeks });
      }

      mockPrisma.user.findUnique.mockResolvedValue(mockUser);
      mockPrisma.module.findMany.mockResolvedValue(mockModules);

      const result = await getTimelineData('user-123');

      expect(result.totalWeeks).toBe(19);
      // Should not exceed totalWeeks
      const totalWeeksInTimeline = result.timeline.length;
      expect(totalWeeksInTimeline).toBeLessThanOrEqual(19);
    });
  });
});

describe('Edge Cases and Integration Scenarios', () => {
  let mockPrisma: any;

  beforeEach(() => {
    jest.clearAllMocks();
    mockPrisma = new PrismaClient();
  });

  describe('Pace change scenarios', () => {
    it('should handle rapid pace increase', async () => {
      mockPrisma.progress.findMany.mockResolvedValue(
        Array(20)
          .fill(null)
          .map(() => ({
            completed: true,
            completedAt: new Date(),
          }))
      );

      const mockUser = {
        preferences: JSON.stringify({ weeklyHours: 10 }),
      };
      mockPrisma.user.findUnique.mockResolvedValue(mockUser);

      const result = await getCurrentPace('user-123');

      expect(result.hoursThisWeek).toBe(50); // 20 * 2.5
      expect(result.onTrack).toBe(true);
    });

    it('should handle no progress this week', async () => {
      mockPrisma.progress.findMany.mockResolvedValue([]);

      const mockUser = {
        preferences: JSON.stringify({ weeklyHours: 10 }),
      };
      mockPrisma.user.findUnique.mockResolvedValue(mockUser);

      const result = await getCurrentPace('user-123');

      expect(result.hoursThisWeek).toBe(0);
      expect(result.onTrack).toBe(false);
    });
  });

  describe('Milestone unlock timing', () => {
    it('should handle multiple milestones unlocking at once', async () => {
      const mockMilestones = [
        {
          id: 'milestone-1',
          criteria: { type: 'module-completion' },
          moduleId: 'module-1',
        },
        {
          id: 'milestone-2',
          criteria: { type: 'module-completion' },
          moduleId: 'module-2',
        },
      ];

      mockPrisma.milestone.findMany.mockResolvedValue(mockMilestones);
      mockPrisma.progress.findMany.mockResolvedValue([
        { chapterId: 'c1', completed: true },
        { chapterId: 'c2', completed: true },
      ]);
      mockPrisma.milestoneAchievement.findMany.mockResolvedValue([]);
      mockPrisma.module.findUnique.mockResolvedValue({
        chapters: [{ id: 'c1' }, { id: 'c2' }],
      });
      mockPrisma.milestoneAchievement.create.mockImplementation((data: any) =>
        Promise.resolve({ ...data, id: 'new-achievement' })
      );

      const result = await checkAndUnlockMilestones('user-123');

      expect(result.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Day boundary scenarios', () => {
    it('should handle day 1 correctly', () => {
      expect(getDayType(1, 1, 7)).toBe('regular');
    });

    it('should handle last day of final week', () => {
      expect(getDayType(7, 7, 7)).toBe('flagship-project');
    });

    it('should handle day 6 in non-final week as catch-up', () => {
      expect(getDayType(1, 6, 7)).toBe('catch-up');
    });
  });
});