import {
  TestDatabase,
  TestRedis,
  createTestUser,
  createTestModule,
  createTestWeek,
  createTestChapter,
  createTestProgress,
  createTestLearningPath,
} from '../utils/test-helpers';
import { ProgressService } from '../../src/services/progress.service';

describe('Progress Tracking and Checkpoint Gating Integration Tests', () => {
  let testDb: TestDatabase;
  let testRedis: TestRedis;
  let progressService: ProgressService;

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
    progressService = new ProgressService(testDb.getClient(), testRedis.getClient());
  });

  describe('Chapter Completion Tracking', () => {
    it('should mark chapter as complete', async () => {
      const user = await createTestUser(testDb.getClient());
      const module = await createTestModule(testDb.getClient());
      const week = await createTestWeek(testDb.getClient(), module.id);
      const chapter = await createTestChapter(testDb.getClient(), module.id, week.id);

      const result = await progressService.completeChapter({
        userId: user.id,
        chapterId: chapter.id,
        timeSpent: 30,
      });

      expect(result.success).toBe(true);
      expect(result.newProgress.completedChapters).toContain(chapter.id);
    });

    it('should track time spent on chapter', async () => {
      const user = await createTestUser(testDb.getClient());
      const module = await createTestModule(testDb.getClient());
      const week = await createTestWeek(testDb.getClient(), module.id);
      const chapter = await createTestChapter(testDb.getClient(), module.id, week.id);

      await progressService.completeChapter({
        userId: user.id,
        chapterId: chapter.id,
        timeSpent: 45,
      });

      const progress = await testDb.getClient().progress.findFirst({
        where: { userId: user.id, chapterId: chapter.id },
      });

      expect(progress?.timeSpent).toBe(45);
    });

    it('should update total hours spent', async () => {
      const user = await createTestUser(testDb.getClient());
      const module = await createTestModule(testDb.getClient());
      const week = await createTestWeek(testDb.getClient(), module.id);
      const chapter1 = await createTestChapter(testDb.getClient(), module.id, week.id);
      const chapter2 = await createTestChapter(testDb.getClient(), module.id, week.id);

      await progressService.completeChapter({
        userId: user.id,
        chapterId: chapter1.id,
        timeSpent: 30,
      });

      await progressService.completeChapter({
        userId: user.id,
        chapterId: chapter2.id,
        timeSpent: 45,
      });

      const snapshot = await progressService.getProgressSnapshot(user.id);

      expect(snapshot.totalHoursSpent).toBe(75); // 30 + 45 minutes = 1.25 hours
    });

    it('should not duplicate completion records', async () => {
      const user = await createTestUser(testDb.getClient());
      const module = await createTestModule(testDb.getClient());
      const week = await createTestWeek(testDb.getClient(), module.id);
      const chapter = await createTestChapter(testDb.getClient(), module.id, week.id);

      await progressService.completeChapter({
        userId: user.id,
        chapterId: chapter.id,
        timeSpent: 30,
      });

      await progressService.completeChapter({
        userId: user.id,
        chapterId: chapter.id,
        timeSpent: 15,
      });

      const progressRecords = await testDb.getClient().progress.findMany({
        where: { userId: user.id, chapterId: chapter.id },
      });

      expect(progressRecords).toHaveLength(1);
      expect(progressRecords[0].timeSpent).toBe(45); // Updated time
    });
  });

  describe('Module Completion Tracking', () => {
    it('should mark module as complete when all chapters done', async () => {
      const user = await createTestUser(testDb.getClient());
      const module = await createTestModule(testDb.getClient());
      const week = await createTestWeek(testDb.getClient(), module.id);
      const chapter1 = await createTestChapter(testDb.getClient(), module.id, week.id, { order: 1 });
      const chapter2 = await createTestChapter(testDb.getClient(), module.id, week.id, { order: 2 });

      await progressService.completeChapter({
        userId: user.id,
        chapterId: chapter1.id,
        timeSpent: 30,
      });

      await progressService.completeChapter({
        userId: user.id,
        chapterId: chapter2.id,
        timeSpent: 30,
      });

      const snapshot = await progressService.getProgressSnapshot(user.id);

      expect(snapshot.completedModules).toContain(module.id);
    });

    it('should calculate progress percentage', async () => {
      const user = await createTestUser(testDb.getClient());
      const module = await createTestModule(testDb.getClient());
      const week = await createTestWeek(testDb.getClient(), module.id);
      const chapter1 = await createTestChapter(testDb.getClient(), module.id, week.id);
      const chapter2 = await createTestChapter(testDb.getClient(), module.id, week.id);

      await progressService.completeChapter({
        userId: user.id,
        chapterId: chapter1.id,
        timeSpent: 30,
      });

      const snapshot = await progressService.getProgressSnapshot(user.id);

      expect(snapshot.progressPercentage).toBeGreaterThan(0);
      expect(snapshot.progressPercentage).toBeLessThan(100);
    });
  });

  describe('Checkpoint Gating', () => {
    it('should unlock checkpoint when module is complete', async () => {
      const user = await createTestUser(testDb.getClient());
      const module = await createTestModule(testDb.getClient(), { checkpointId: 'checkpoint-1' });
      const week = await createTestWeek(testDb.getClient(), module.id);
      const chapter = await createTestChapter(testDb.getClient(), module.id, week.id);

      const result = await progressService.completeChapter({
        userId: user.id,
        chapterId: chapter.id,
        timeSpent: 30,
      });

      expect(result.checkpointUnlocked).toBe('checkpoint-1');
    });

    it('should not unlock checkpoint if module incomplete', async () => {
      const user = await createTestUser(testDb.getClient());
      const module = await createTestModule(testDb.getClient(), { checkpointId: 'checkpoint-1' });
      const week = await createTestWeek(testDb.getClient(), module.id);
      const chapter1 = await createTestChapter(testDb.getClient(), module.id, week.id);
      const chapter2 = await createTestChapter(testDb.getClient(), module.id, week.id);

      const result = await progressService.completeChapter({
        userId: user.id,
        chapterId: chapter1.id,
        timeSpent: 30,
      });

      expect(result.checkpointUnlocked).toBeUndefined();
    });

    it('should track checkpoint attempts', async () => {
      const user = await createTestUser(testDb.getClient());
      const checkpointId = 'checkpoint-1';

      await progressService.recordCheckpointAttempt({
        userId: user.id,
        checkpointId,
        responses: { q1: 'answer1', q2: 'answer2' },
        passed: false,
        score: 60,
      });

      const attempts = await testDb.getClient().checkpointAttempt.findMany({
        where: { userId: user.id, checkpointId },
      });

      expect(attempts).toHaveLength(1);
      expect(attempts[0].passed).toBe(false);
      expect(attempts[0].score).toBe(60);
    });

    it('should unlock next module on checkpoint pass', async () => {
      const user = await createTestUser(testDb.getClient());
      const module1 = await createTestModule(testDb.getClient(), { order: 1, checkpointId: 'checkpoint-1' });
      const module2 = await createTestModule(testDb.getClient(), { order: 2, prerequisites: [module1.id] });

      await progressService.recordCheckpointAttempt({
        userId: user.id,
        checkpointId: 'checkpoint-1',
        responses: {},
        passed: true,
        score: 85,
      });

      const canAccess = await progressService.canAccessModule(user.id, module2.id);

      expect(canAccess).toBe(true);
    });

    it('should provide gap analysis on checkpoint failure', async () => {
      const user = await createTestUser(testDb.getClient());
      const checkpointId = 'checkpoint-1';

      const result = await progressService.recordCheckpointAttempt({
        userId: user.id,
        checkpointId,
        responses: { q1: 'wrong', q2: 'correct' },
        passed: false,
        score: 50,
      });

      expect(result.gaps).toBeDefined();
      expect(result.gaps!.length).toBeGreaterThan(0);
    });
  });

  describe('Progress Caching', () => {
    it('should cache progress snapshot', async () => {
      const user = await createTestUser(testDb.getClient());
      const module = await createTestModule(testDb.getClient());
      const week = await createTestWeek(testDb.getClient(), module.id);
      const chapter = await createTestChapter(testDb.getClient(), module.id, week.id);

      await createTestProgress(testDb.getClient(), user.id, chapter.id);

      await progressService.getProgressSnapshot(user.id);

      const cacheKey = `progress:${user.id}`;
      const cached = await testRedis.getClient().get(cacheKey);

      expect(cached).toBeDefined();
    });

    it('should invalidate cache on progress update', async () => {
      const user = await createTestUser(testDb.getClient());
      const module = await createTestModule(testDb.getClient());
      const week = await createTestWeek(testDb.getClient(), module.id);
      const chapter = await createTestChapter(testDb.getClient(), module.id, week.id);

      await progressService.getProgressSnapshot(user.id); // Populate cache

      await progressService.completeChapter({
        userId: user.id,
        chapterId: chapter.id,
        timeSpent: 30,
      });

      const cacheKey = `progress:${user.id}`;
      const cached = await testRedis.getClient().get(cacheKey);

      expect(cached).toBeNull();
    });
  });

  describe('Current Week and Day Tracking', () => {
    it('should track current week and day', async () => {
      const user = await createTestUser(testDb.getClient());
      const module = await createTestModule(testDb.getClient());
      const week = await createTestWeek(testDb.getClient(), module.id, { weekNumber: 1 });
      const chapter = await createTestChapter(testDb.getClient(), module.id, week.id, { dayNumber: 2 });

      await progressService.completeChapter({
        userId: user.id,
        chapterId: chapter.id,
        timeSpent: 30,
      });

      const snapshot = await progressService.getProgressSnapshot(user.id);

      expect(snapshot.currentWeek).toBe(1);
      expect(snapshot.currentDay).toBe(2);
    });

    it('should advance to next day after completing all chapters', async () => {
      const user = await createTestUser(testDb.getClient());
      const module = await createTestModule(testDb.getClient());
      const week = await createTestWeek(testDb.getClient(), module.id, { weekNumber: 1 });
      const chapter1 = await createTestChapter(testDb.getClient(), module.id, week.id, { dayNumber: 1, order: 1 });
      const chapter2 = await createTestChapter(testDb.getClient(), module.id, week.id, { dayNumber: 1, order: 2 });

      await progressService.completeChapter({
        userId: user.id,
        chapterId: chapter1.id,
        timeSpent: 30,
      });

      await progressService.completeChapter({
        userId: user.id,
        chapterId: chapter2.id,
        timeSpent: 30,
      });

      const snapshot = await progressService.getProgressSnapshot(user.id);

      expect(snapshot.currentDay).toBeGreaterThan(1);
    });
  });

  describe('Learning Path Integration', () => {
    it('should calculate remaining weeks', async () => {
      const user = await createTestUser(testDb.getClient());
      await createTestLearningPath(testDb.getClient(), user.id, {
        totalWeeks: 30,
      });

      const module = await createTestModule(testDb.getClient(), { weeks: 2 });
      const week = await createTestWeek(testDb.getClient(), module.id);
      const chapter = await createTestChapter(testDb.getClient(), module.id, week.id);

      await createTestProgress(testDb.getClient(), user.id, chapter.id);

      const snapshot = await progressService.getProgressSnapshot(user.id);

      expect(snapshot.totalWeeks).toBe(30);
      expect(snapshot.remainingWeeks).toBeLessThan(30);
    });

    it('should update estimated completion date', async () => {
      const user = await createTestUser(testDb.getClient());
      const futureDate = new Date(Date.now() + 30 * 7 * 24 * 60 * 60 * 1000);
      await createTestLearningPath(testDb.getClient(), user.id, {
        estimatedCompletionDate: futureDate,
      });

      const snapshot = await progressService.getProgressSnapshot(user.id);

      expect(new Date(snapshot.estimatedCompletion).getTime()).toBeCloseTo(
        futureDate.getTime(),
        -5 // Within 100,000ms (about 1.5 minutes)
      );
    });
  });
});
