import {
  TestDatabase,
  TestRedis,
  createTestUser,
  createTestModule,
  createTestWeek,
  createTestChapter,
  createTestDailyContent,
  createTestMilestone,
  createTestLearningPath,
  createTestProgress,
} from '../utils/test-helpers';
import { DailyContentService } from '../../src/services/daily-content.service';
import { MilestoneService } from '../../src/services/milestone.service';
import { DurationCalculationService } from '../../src/services/duration-calculation.service';

describe('Daily Content, Milestones, and Duration Integration Tests', () => {
  let testDb: TestDatabase;
  let testRedis: TestRedis;
  let dailyContentService: DailyContentService;
  let milestoneService: MilestoneService;
  let durationService: DurationCalculationService;

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
    dailyContentService = new DailyContentService(testDb.getClient(), testRedis.getClient());
    milestoneService = new MilestoneService(testDb.getClient(), testRedis.getClient());
    durationService = new DurationCalculationService(testDb.getClient(), testRedis.getClient());
  });

  describe('Daily Content Retrieval', () => {
    it('should retrieve week days with daily content', async () => {
      const module = await createTestModule(testDb.getClient());
      const week = await createTestWeek(testDb.getClient(), module.id, { weekNumber: 1 });
      
      await createTestDailyContent(testDb.getClient(), week.id, {
        dayNumber: 1,
        topic: 'Variables and Data Types',
        hours: 3,
      });
      
      await createTestDailyContent(testDb.getClient(), week.id, {
        dayNumber: 2,
        topic: 'Control Flow',
        hours: 4,
      });

      const result = await dailyContentService.getWeekDays(week.id);

      expect(result.days).toHaveLength(2);
      expect(result.days[0].topic).toBe('Variables and Data Types');
      expect(result.days[0].hours).toBe(3);
      expect(result.days[1].topic).toBe('Control Flow');
    });

    it('should mark Day 5 as mini-project', async () => {
      const module = await createTestModule(testDb.getClient());
      const week = await createTestWeek(testDb.getClient(), module.id);
      
      await createTestDailyContent(testDb.getClient(), week.id, {
        dayNumber: 5,
        topic: 'Build a CLI Tool',
        type: 'mini-project',
        hours: 5,
      });

      const result = await dailyContentService.getWeekDays(week.id);
      const day5 = result.days.find(d => d.dayNumber === 5);

      expect(day5).toBeDefined();
      expect(day5?.type).toBe('mini-project');
      expect(day5?.topic).toBe('Build a CLI Tool');
    });

    it('should mark final week as flagship project', async () => {
      const module = await createTestModule(testDb.getClient(), { weeks: 2 });
      const week2 = await createTestWeek(testDb.getClient(), module.id, { weekNumber: 2 });
      
      await createTestDailyContent(testDb.getClient(), week2.id, {
        dayNumber: 1,
        topic: 'Capstone Project',
        type: 'flagship-project',
        hours: 20,
      });

      const result = await dailyContentService.getWeekDays(week2.id);

      expect(result.days[0].type).toBe('flagship-project');
    });

    it('should calculate current day based on progress', async () => {
      const user = await createTestUser(testDb.getClient());
      const module = await createTestModule(testDb.getClient());
      const week = await createTestWeek(testDb.getClient(), module.id);
      
      const day1Chapter = await createTestChapter(testDb.getClient(), module.id, week.id, { dayNumber: 1 });
      const day2Chapter = await createTestChapter(testDb.getClient(), module.id, week.id, { dayNumber: 2 });

      await createTestProgress(testDb.getClient(), user.id, day1Chapter.id);

      const currentDay = await dailyContentService.getCurrentDay(user.id, week.id);

      expect(currentDay).toBe(2); // Completed day 1, so current is day 2
    });

    it('should include chapter completion status', async () => {
      const user = await createTestUser(testDb.getClient());
      const module = await createTestModule(testDb.getClient());
      const week = await createTestWeek(testDb.getClient(), module.id);
      const day = await createTestDailyContent(testDb.getClient(), week.id, { dayNumber: 1 });
      
      const chapter1 = await createTestChapter(testDb.getClient(), module.id, week.id, { dayNumber: 1, order: 1 });
      const chapter2 = await createTestChapter(testDb.getClient(), module.id, week.id, { dayNumber: 1, order: 2 });

      await createTestProgress(testDb.getClient(), user.id, chapter1.id);

      const result = await dailyContentService.getWeekDaysWithProgress(week.id, user.id);
      const day1 = result.days.find(d => d.dayNumber === 1);

      expect(day1?.chapters).toHaveLength(2);
      expect(day1?.chapters[0].completed).toBe(true);
      expect(day1?.chapters[1].completed).toBe(false);
    });

    it('should cache daily content queries', async () => {
      const module = await createTestModule(testDb.getClient());
      const week = await createTestWeek(testDb.getClient(), module.id);
      await createTestDailyContent(testDb.getClient(), week.id, { dayNumber: 1 });

      await dailyContentService.getWeekDays(week.id);

      const cacheKey = `week:${week.id}:days`;
      const cached = await testRedis.getClient().get(cacheKey);

      expect(cached).toBeDefined();
    });
  });

  describe('Milestone Unlocking Logic', () => {
    it('should unlock milestone on module completion', async () => {
      const user = await createTestUser(testDb.getClient());
      const module = await createTestModule(testDb.getClient());
      const milestone = await createTestMilestone(testDb.getClient(), module.id, {
        milestoneText: 'Completed Python Foundations',
        unlockCriteria: { type: 'module-completion' },
      });

      const result = await milestoneService.checkAndUnlockMilestones(user.id, {
        type: 'module-completion',
        moduleId: module.id,
      });

      expect(result.unlockedMilestones).toContain(milestone.id);
    });

    it('should unlock milestone on checkpoint pass', async () => {
      const user = await createTestUser(testDb.getClient());
      const module = await createTestModule(testDb.getClient(), { checkpointId: 'checkpoint-1' });
      const milestone = await createTestMilestone(testDb.getClient(), module.id, {
        milestoneText: 'Passed Module 0 Checkpoint',
        unlockCriteria: {
          type: 'checkpoint-pass',
          requiredCheckpoints: ['checkpoint-1'],
        },
      });

      const result = await milestoneService.checkAndUnlockMilestones(user.id, {
        type: 'checkpoint-pass',
        checkpointId: 'checkpoint-1',
      });

      expect(result.unlockedMilestones).toContain(milestone.id);
    });

    it('should not unlock milestone if criteria not met', async () => {
      const user = await createTestUser(testDb.getClient());
      const module = await createTestModule(testDb.getClient());
      const milestone = await createTestMilestone(testDb.getClient(), module.id, {
        unlockCriteria: {
          type: 'checkpoint-pass',
          requiredCheckpoints: ['checkpoint-1'],
        },
      });

      const result = await milestoneService.checkAndUnlockMilestones(user.id, {
        type: 'module-completion',
        moduleId: module.id,
      });

      expect(result.unlockedMilestones).not.toContain(milestone.id);
    });

    it('should record milestone achievement', async () => {
      const user = await createTestUser(testDb.getClient());
      const module = await createTestModule(testDb.getClient());
      const milestone = await createTestMilestone(testDb.getClient(), module.id);

      await milestoneService.checkAndUnlockMilestones(user.id, {
        type: 'module-completion',
        moduleId: module.id,
      });

      const achievements = await testDb.getClient().milestoneAchievement.findMany({
        where: { userId: user.id, milestoneId: milestone.id },
      });

      expect(achievements).toHaveLength(1);
      expect(achievements[0].achievedAt).toBeDefined();
    });

    it('should not duplicate milestone achievements', async () => {
      const user = await createTestUser(testDb.getClient());
      const module = await createTestModule(testDb.getClient());
      const milestone = await createTestMilestone(testDb.getClient(), module.id);

      await milestoneService.checkAndUnlockMilestones(user.id, {
        type: 'module-completion',
        moduleId: module.id,
      });

      await milestoneService.checkAndUnlockMilestones(user.id, {
        type: 'module-completion',
        moduleId: module.id,
      });

      const achievements = await testDb.getClient().milestoneAchievement.findMany({
        where: { userId: user.id, milestoneId: milestone.id },
      });

      expect(achievements).toHaveLength(1);
    });

    it('should generate social share URLs', async () => {
      const user = await createTestUser(testDb.getClient());
      const module = await createTestModule(testDb.getClient());
      const milestone = await createTestMilestone(testDb.getClient(), module.id, {
        milestoneText: 'Completed Python Foundations',
      });

      await milestoneService.checkAndUnlockMilestones(user.id, {
        type: 'module-completion',
        moduleId: module.id,
      });

      const shareUrl = await milestoneService.shareMilestone(user.id, milestone.id, 'linkedin');

      expect(shareUrl).toBeDefined();
      expect(shareUrl).toContain('linkedin.com');
      expect(shareUrl).toContain('Completed Python Foundations');
    });

    it('should track shared platforms', async () => {
      const user = await createTestUser(testDb.getClient());
      const module = await createTestModule(testDb.getClient());
      const milestone = await createTestMilestone(testDb.getClient(), module.id);

      await milestoneService.checkAndUnlockMilestones(user.id, {
        type: 'module-completion',
        moduleId: module.id,
      });

      await milestoneService.shareMilestone(user.id, milestone.id, 'linkedin');
      await milestoneService.shareMilestone(user.id, milestone.id, 'twitter');

      const achievement = await testDb.getClient().milestoneAchievement.findFirst({
        where: { userId: user.id, milestoneId: milestone.id },
      });

      expect(achievement?.shared).toBe(true);
      expect(achievement?.sharedPlatforms).toContain('linkedin');
      expect(achievement?.sharedPlatforms).toContain('twitter');
    });
  });

  describe('Duration Calculation', () => {
    it('should calculate total weeks based on entry point', async () => {
      const testCases = [
        { entryModule: 'module-0-week-1', expectedWeeks: 30 },
        { entryModule: 'module-0-week-2', expectedWeeks: 29 },
        { entryModule: 'module-1', expectedWeeks: 28 },
        { entryModule: 'module-2', expectedWeeks: 25 },
        { entryModule: 'module-3', expectedWeeks: 19 },
      ];

      for (const testCase of testCases) {
        const weeks = await durationService.calculateTotalWeeks(testCase.entryModule);
        expect(weeks).toBe(testCase.expectedWeeks);
      }
    });

    it('should calculate completion date based on weekly hours', async () => {
      const user = await createTestUser(testDb.getClient());
      await createTestLearningPath(testDb.getClient(), user.id, {
        totalWeeks: 30,
        weeklyHours: 20,
      });

      const completionDate = await durationService.calculateCompletionDate(user.id);

      const expectedDate = new Date();
      expectedDate.setDate(expectedDate.getDate() + 30 * 7);

      expect(completionDate.getTime()).toBeCloseTo(expectedDate.getTime(), -6); // Within ~1 day
    });

    it('should recalculate on weekly hours update', async () => {
      const user = await createTestUser(testDb.getClient());
      const learningPath = await createTestLearningPath(testDb.getClient(), user.id, {
        totalWeeks: 30,
        weeklyHours: 20,
      });

      const originalDate = await durationService.calculateCompletionDate(user.id);

      await durationService.updateWeeklyHours(user.id, 10); // Half the hours

      const newDate = await durationService.calculateCompletionDate(user.id);

      expect(newDate.getTime()).toBeGreaterThan(originalDate.getTime());
    });

    it('should track current pace', async () => {
      const user = await createTestUser(testDb.getClient());
      await createTestLearningPath(testDb.getClient(), user.id, {
        weeklyHours: 20,
      });

      const module = await createTestModule(testDb.getClient());
      const week = await createTestWeek(testDb.getClient(), module.id);
      const chapter = await createTestChapter(testDb.getClient(), module.id, week.id);

      await createTestProgress(testDb.getClient(), user.id, chapter.id, {
        timeSpent: 120, // 2 hours
        completedAt: new Date(),
      });

      const pace = await durationService.getCurrentPace(user.id);

      expect(pace.hoursThisWeek).toBe(2);
      expect(pace.onTrack).toBeDefined();
    });

    it('should provide adjustment recommendations', async () => {
      const user = await createTestUser(testDb.getClient());
      await createTestLearningPath(testDb.getClient(), user.id, {
        weeklyHours: 20,
      });

      // Simulate being behind
      const pace = await durationService.getCurrentPace(user.id);

      expect(pace.adjustment).toBeDefined();
      if (!pace.onTrack) {
        expect(pace.adjustment).toContain('behind');
      }
    });

    it('should generate timeline data', async () => {
      const user = await createTestUser(testDb.getClient());
      await createTestLearningPath(testDb.getClient(), user.id, {
        entryModule: 'module-0',
        totalWeeks: 30,
      });

      const module0 = await createTestModule(testDb.getClient(), { order: 0, weeks: 2 });
      const module1 = await createTestModule(testDb.getClient(), { order: 1, weeks: 3 });

      const timeline = await durationService.getTimelineData(user.id);

      expect(timeline.modules).toHaveLength(2);
      expect(timeline.modules[0].weeks).toBe(2);
      expect(timeline.modules[1].weeks).toBe(3);
      expect(timeline.totalWeeks).toBe(30);
    });

    it('should cache duration calculations', async () => {
      const user = await createTestUser(testDb.getClient());
      await createTestLearningPath(testDb.getClient(), user.id);

      await durationService.calculateCompletionDate(user.id);

      const cacheKey = `duration:${user.id}`;
      const cached = await testRedis.getClient().get(cacheKey);

      expect(cached).toBeDefined();
    });

    it('should invalidate cache on progress update', async () => {
      const user = await createTestUser(testDb.getClient());
      await createTestLearningPath(testDb.getClient(), user.id);

      await durationService.calculateCompletionDate(user.id); // Populate cache

      await durationService.updateWeeklyHours(user.id, 15);

      const cacheKey = `duration:${user.id}`;
      const cached = await testRedis.getClient().get(cacheKey);

      expect(cached).toBeNull();
    });
  });

  describe('Integrated Flow: Daily Content → Progress → Milestones → Duration', () => {
    it('should update all systems when completing a day', async () => {
      const user = await createTestUser(testDb.getClient());
      const module = await createTestModule(testDb.getClient(), { weeks: 2 });
      const week = await createTestWeek(testDb.getClient(), module.id, { weekNumber: 1 });
      const day = await createTestDailyContent(testDb.getClient(), week.id, { dayNumber: 1 });
      const chapter = await createTestChapter(testDb.getClient(), module.id, week.id, { dayNumber: 1 });
      const milestone = await createTestMilestone(testDb.getClient(), module.id);
      await createTestLearningPath(testDb.getClient(), user.id, { totalWeeks: 30 });

      // Complete the chapter
      await createTestProgress(testDb.getClient(), user.id, chapter.id, { timeSpent: 180 });

      // Check daily content progress
      const currentDay = await dailyContentService.getCurrentDay(user.id, week.id);
      expect(currentDay).toBeGreaterThan(1);

      // Check duration update
      const pace = await durationService.getCurrentPace(user.id);
      expect(pace.hoursThisWeek).toBe(3); // 180 minutes = 3 hours

      // Complete module to unlock milestone
      await milestoneService.checkAndUnlockMilestones(user.id, {
        type: 'module-completion',
        moduleId: module.id,
      });

      const achievements = await testDb.getClient().milestoneAchievement.findMany({
        where: { userId: user.id },
      });

      expect(achievements.length).toBeGreaterThan(0);
    });
  });
});
