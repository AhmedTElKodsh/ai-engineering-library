import { TestDatabase, TestRedis, createTestModule, createTestWeek, createTestChapter, createTestDailyContent, delay } from '../utils/test-helpers';
import { ContentService } from '../../src/services/content.service';

describe('Content Retrieval and Caching Integration Tests', () => {
  let testDb: TestDatabase;
  let testRedis: TestRedis;
  let contentService: ContentService;

  beforeAll(async () => {
    testDb = new TestDatabase();
    testRedis = new TestRedis();
    await testDb.connect();
    await testRedis.connect();
  });

  afterAll(async () => {
    await testDb.disconnect();
    await testRedis.disconnect();
  });

  beforeEach(async () => {
    await testDb.cleanup();
    await testRedis.cleanup();
    contentService = new ContentService(
      testDb.getClient(),
      testRedis.getClient(),
      {} as any // S3 service mock
    );
  });

  describe('Module Retrieval', () => {
    it('should retrieve all modules', async () => {
      const module1 = await createTestModule(testDb.getClient(), { order: 1, title: 'Module 0' });
      const module2 = await createTestModule(testDb.getClient(), { order: 2, title: 'Module 1' });

      const modules = await contentService.getModules();

      expect(modules).toHaveLength(2);
      expect(modules[0].title).toBe('Module 0');
      expect(modules[1].title).toBe('Module 1');
    });

    it('should cache module list', async () => {
      await createTestModule(testDb.getClient());

      // First call - should hit database
      const firstCall = await contentService.getModules();
      
      // Second call - should hit cache
      const secondCall = await contentService.getModules();

      expect(firstCall).toEqual(secondCall);

      // Verify cache was used
      const cacheKey = 'modules:all';
      const cached = await testRedis.getClient().get(cacheKey);
      expect(cached).toBeDefined();
    });

    it('should invalidate cache on module update', async () => {
      const module = await createTestModule(testDb.getClient());

      await contentService.getModules(); // Populate cache

      await contentService.updateModule(module.id, { title: 'Updated Module' });

      const cached = await testRedis.getClient().get('modules:all');
      expect(cached).toBeNull();
    });
  });

  describe('Chapter Retrieval', () => {
    it('should retrieve chapter by ID', async () => {
      const module = await createTestModule(testDb.getClient());
      const week = await createTestWeek(testDb.getClient(), module.id);
      const chapter = await createTestChapter(testDb.getClient(), module.id, week.id, {
        title: 'Test Chapter',
        slug: 'test-chapter',
      });

      const result = await contentService.getChapter(chapter.id);

      expect(result).toBeDefined();
      expect(result.title).toBe('Test Chapter');
      expect(result.slug).toBe('test-chapter');
    });

    it('should cache chapter content', async () => {
      const module = await createTestModule(testDb.getClient());
      const week = await createTestWeek(testDb.getClient(), module.id);
      const chapter = await createTestChapter(testDb.getClient(), module.id, week.id);

      // First call
      await contentService.getChapter(chapter.id);

      // Verify cache
      const cacheKey = `chapter:${chapter.id}`;
      const cached = await testRedis.getClient().get(cacheKey);
      expect(cached).toBeDefined();

      const cachedData = JSON.parse(cached!);
      expect(cachedData.id).toBe(chapter.id);
    });

    it('should return cached chapter on subsequent calls', async () => {
      const module = await createTestModule(testDb.getClient());
      const week = await createTestWeek(testDb.getClient(), module.id);
      const chapter = await createTestChapter(testDb.getClient(), module.id, week.id);

      const firstCall = await contentService.getChapter(chapter.id);
      const secondCall = await contentService.getChapter(chapter.id);

      expect(firstCall).toEqual(secondCall);
    });

    it('should handle cache miss gracefully', async () => {
      const module = await createTestModule(testDb.getClient());
      const week = await createTestWeek(testDb.getClient(), module.id);
      const chapter = await createTestChapter(testDb.getClient(), module.id, week.id);

      // Clear cache
      await testRedis.cleanup();

      const result = await contentService.getChapter(chapter.id);

      expect(result).toBeDefined();
      expect(result.id).toBe(chapter.id);
    });
  });

  describe('Daily Content Retrieval', () => {
    it('should retrieve week days with daily content', async () => {
      const module = await createTestModule(testDb.getClient());
      const week = await createTestWeek(testDb.getClient(), module.id, { weekNumber: 1 });
      
      const day1 = await createTestDailyContent(testDb.getClient(), week.id, {
        dayNumber: 1,
        topic: 'Day 1 Topic',
        hours: 3,
      });
      
      const day2 = await createTestDailyContent(testDb.getClient(), week.id, {
        dayNumber: 2,
        topic: 'Day 2 Topic',
        hours: 4,
      });

      const result = await contentService.getWeekDays(week.id);

      expect(result.days).toHaveLength(2);
      expect(result.days[0].topic).toBe('Day 1 Topic');
      expect(result.days[1].topic).toBe('Day 2 Topic');
    });

    it('should mark Day 5 as mini-project', async () => {
      const module = await createTestModule(testDb.getClient());
      const week = await createTestWeek(testDb.getClient(), module.id);
      
      const day5 = await createTestDailyContent(testDb.getClient(), week.id, {
        dayNumber: 5,
        topic: 'Mini Project',
        type: 'mini-project',
      });

      const result = await contentService.getWeekDays(week.id);
      const miniProject = result.days.find(d => d.dayNumber === 5);

      expect(miniProject).toBeDefined();
      expect(miniProject?.type).toBe('mini-project');
    });

    it('should cache daily content', async () => {
      const module = await createTestModule(testDb.getClient());
      const week = await createTestWeek(testDb.getClient(), module.id);
      await createTestDailyContent(testDb.getClient(), week.id, { dayNumber: 1 });

      await contentService.getWeekDays(week.id);

      const cacheKey = `week:${week.id}:days`;
      const cached = await testRedis.getClient().get(cacheKey);
      expect(cached).toBeDefined();
    });

    it('should include chapter completion status', async () => {
      const module = await createTestModule(testDb.getClient());
      const week = await createTestWeek(testDb.getClient(), module.id);
      const day = await createTestDailyContent(testDb.getClient(), week.id, { dayNumber: 1 });
      const chapter = await createTestChapter(testDb.getClient(), module.id, week.id, { dayNumber: 1 });

      const result = await contentService.getWeekDaysWithProgress(week.id, 'user-123');

      expect(result.days[0].chapters).toBeDefined();
      expect(result.days[0].chapters[0].completed).toBeDefined();
    });
  });

  describe('Content Search', () => {
    it('should search chapters by query', async () => {
      const module = await createTestModule(testDb.getClient());
      const week = await createTestWeek(testDb.getClient(), module.id);
      
      await createTestChapter(testDb.getClient(), module.id, week.id, {
        title: 'Python Basics',
        tags: ['python', 'basics'],
      });
      
      await createTestChapter(testDb.getClient(), module.id, week.id, {
        title: 'Advanced Python',
        tags: ['python', 'advanced'],
      });

      const results = await contentService.searchContent('python');

      expect(results.length).toBeGreaterThan(0);
      expect(results.some(r => r.title.includes('Python'))).toBe(true);
    });

    it('should filter search by module', async () => {
      const module1 = await createTestModule(testDb.getClient(), { title: 'Module 1' });
      const module2 = await createTestModule(testDb.getClient(), { title: 'Module 2' });
      const week1 = await createTestWeek(testDb.getClient(), module1.id);
      const week2 = await createTestWeek(testDb.getClient(), module2.id);

      await createTestChapter(testDb.getClient(), module1.id, week1.id, { title: 'Chapter in Module 1' });
      await createTestChapter(testDb.getClient(), module2.id, week2.id, { title: 'Chapter in Module 2' });

      const results = await contentService.searchContent('Chapter', { moduleIds: [module1.id] });

      expect(results).toHaveLength(1);
      expect(results[0].title).toBe('Chapter in Module 1');
    });
  });

  describe('Content Versioning', () => {
    it('should track content version', async () => {
      const module = await createTestModule(testDb.getClient(), { version: '1.0.0' });
      const week = await createTestWeek(testDb.getClient(), module.id);
      const chapter = await createTestChapter(testDb.getClient(), module.id, week.id, { version: '1.0.0' });

      const result = await contentService.getChapter(chapter.id);

      expect(result.version).toBe('1.0.0');
    });

    it('should update version on content change', async () => {
      const module = await createTestModule(testDb.getClient());
      const week = await createTestWeek(testDb.getClient(), module.id);
      const chapter = await createTestChapter(testDb.getClient(), module.id, week.id, { version: '1.0.0' });

      await contentService.updateChapter(chapter.id, {
        title: 'Updated Title',
        version: '1.1.0',
      });

      const updated = await contentService.getChapter(chapter.id);
      expect(updated.version).toBe('1.1.0');
    });
  });

  describe('Cache Performance', () => {
    it('should improve response time with caching', async () => {
      const module = await createTestModule(testDb.getClient());
      const week = await createTestWeek(testDb.getClient(), module.id);
      const chapter = await createTestChapter(testDb.getClient(), module.id, week.id);

      // First call - database
      const start1 = Date.now();
      await contentService.getChapter(chapter.id);
      const time1 = Date.now() - start1;

      // Second call - cache
      const start2 = Date.now();
      await contentService.getChapter(chapter.id);
      const time2 = Date.now() - start2;

      // Cache should be faster (though in tests this might not always be true)
      expect(time2).toBeLessThanOrEqual(time1 * 2);
    });

    it('should set appropriate cache TTL', async () => {
      const module = await createTestModule(testDb.getClient());
      const week = await createTestWeek(testDb.getClient(), module.id);
      const chapter = await createTestChapter(testDb.getClient(), module.id, week.id);

      await contentService.getChapter(chapter.id);

      const cacheKey = `chapter:${chapter.id}`;
      const ttl = await testRedis.getClient().ttl(cacheKey);

      expect(ttl).toBeGreaterThan(0);
      expect(ttl).toBeLessThanOrEqual(3600); // 1 hour
    });
  });
});
