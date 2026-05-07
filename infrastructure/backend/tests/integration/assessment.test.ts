import { TestDatabase, TestRedis, createTestUser } from '../utils/test-helpers';
import { AssessmentService } from '../../src/services/assessment.service';

describe('Assessment Scoring and Recommendations Integration Tests', () => {
  let testDb: TestDatabase;
  let testRedis: TestRedis;
  let assessmentService: AssessmentService;

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
    assessmentService = new AssessmentService(testDb.getClient(), testRedis.getClient());
  });

  describe('Diagnostic Assessment - Python', () => {
    it('should score Python diagnostic correctly', async () => {
      const user = await createTestUser(testDb.getClient());
      
      const assessment = await assessmentService.startDiagnostic({
        userId: user.id,
        assessmentType: 'python',
      });

      const answers = {
        q1: 'correct_answer_1',
        q2: 'correct_answer_2',
        q3: 'wrong_answer',
      };

      const result = await assessmentService.submitDiagnostic({
        userId: user.id,
        assessmentId: assessment.assessmentId,
        answers,
      });

      expect(result.score).toBeDefined();
      expect(result.maxScore).toBeDefined();
      expect(result.percentage).toBeGreaterThanOrEqual(0);
      expect(result.percentage).toBeLessThanOrEqual(100);
    });

    it('should recommend Module 0 Week 1 for score < 50%', async () => {
      const user = await createTestUser(testDb.getClient());
      
      const result = await assessmentService.submitDiagnostic({
        userId: user.id,
        assessmentId: 'test-assessment',
        answers: {}, // All wrong answers
      });

      expect(result.recommendedModule).toBe('module-0');
      expect(result.recommendedPath).toContain('Week 1');
    });

    it('should recommend Module 0 Week 2 for score 50-80%', async () => {
      const user = await createTestUser(testDb.getClient());
      
      // Mock 60% score
      const result = await assessmentService.calculateRecommendation({
        pythonScore: 60,
        aiScore: 0,
      });

      expect(result.recommendedModule).toBe('module-0');
      expect(result.recommendedPath).toContain('Week 2');
      expect(result.totalWeeks).toBe(29);
    });

    it('should recommend Module 1 for Python > 80% and AI 0-2/5', async () => {
      const user = await createTestUser(testDb.getClient());
      
      const result = await assessmentService.calculateRecommendation({
        pythonScore: 85,
        aiScore: 2,
      });

      expect(result.recommendedModule).toBe('module-1');
      expect(result.totalWeeks).toBe(28);
    });

    it('should provide topic breakdown', async () => {
      const user = await createTestUser(testDb.getClient());
      
      const assessment = await assessmentService.startDiagnostic({
        userId: user.id,
        assessmentType: 'python',
      });

      const result = await assessmentService.submitDiagnostic({
        userId: user.id,
        assessmentId: assessment.assessmentId,
        answers: {
          oop_q1: 'correct',
          oop_q2: 'wrong',
          error_q1: 'correct',
        },
      });

      expect(result.breakdown).toBeDefined();
      expect(result.breakdown['OOP']).toBeDefined();
      expect(result.breakdown['Error Handling']).toBeDefined();
    });
  });

  describe('Diagnostic Assessment - AI Engineering', () => {
    it('should score AI engineering diagnostic correctly', async () => {
      const user = await createTestUser(testDb.getClient());
      
      const assessment = await assessmentService.startDiagnostic({
        userId: user.id,
        assessmentType: 'ai-engineering',
      });

      const answers = {
        q1: 'correct_answer',
        q2: 'correct_answer',
        q3: 'correct_answer',
      };

      const result = await assessmentService.submitDiagnostic({
        userId: user.id,
        assessmentId: assessment.assessmentId,
        answers,
      });

      expect(result.score).toBeGreaterThanOrEqual(0);
      expect(result.score).toBeLessThanOrEqual(5);
    });

    it('should recommend Module 2 for AI score 3-4/5', async () => {
      const result = await assessmentService.calculateRecommendation({
        pythonScore: 90,
        aiScore: 3,
      });

      expect(result.recommendedModule).toBe('module-2');
      expect(result.totalWeeks).toBe(25);
    });

    it('should recommend Module 3 for AI score 5/5', async () => {
      const result = await assessmentService.calculateRecommendation({
        pythonScore: 95,
        aiScore: 5,
      });

      expect(result.recommendedModule).toBe('module-3');
      expect(result.totalWeeks).toBe(19);
    });

    it('should only present AI assessment if Python > 80%', async () => {
      const user = await createTestUser(testDb.getClient());
      
      const pythonResult = await assessmentService.submitDiagnostic({
        userId: user.id,
        assessmentId: 'python-test',
        answers: {}, // Low score
      });

      expect(pythonResult.percentage).toBeLessThan(80);
      expect(pythonResult.recommendedModule).toBe('module-0');
      // Should not trigger AI assessment
    });
  });

  describe('Chapter Assessments', () => {
    it('should score multiple-choice questions', async () => {
      const questions = [
        { id: 'q1', type: 'multiple-choice', correctAnswer: 'A' },
        { id: 'q2', type: 'multiple-choice', correctAnswer: 'B' },
      ];

      const answers = { q1: 'A', q2: 'C' };

      const score = await assessmentService.scoreAssessment(questions, answers);

      expect(score.correct).toBe(1);
      expect(score.total).toBe(2);
      expect(score.percentage).toBe(50);
    });

    it('should provide feedback for incorrect answers', async () => {
      const questions = [
        {
          id: 'q1',
          type: 'multiple-choice',
          correctAnswer: 'A',
          explanation: 'This is why A is correct',
          referenceSection: 'Chapter 1.2',
        },
      ];

      const answers = { q1: 'B' };

      const result = await assessmentService.scoreWithFeedback(questions, answers);

      expect(result.feedback[0].correct).toBe(false);
      expect(result.feedback[0].explanation).toBeDefined();
      expect(result.feedback[0].referenceSection).toBe('Chapter 1.2');
    });

    it('should handle coding questions', async () => {
      const questions = [
        {
          id: 'q1',
          type: 'coding',
          testCases: [
            { input: [1, 2], expectedOutput: 3 },
            { input: [5, 5], expectedOutput: 10 },
          ],
        },
      ];

      const answers = {
        q1: 'def add(a, b): return a + b',
      };

      const result = await assessmentService.scoreCodeQuestion(questions[0], answers.q1);

      expect(result.passed).toBe(true);
      expect(result.testResults.every(t => t.passed)).toBe(true);
    });

    it('should handle short-answer questions', async () => {
      const questions = [
        {
          id: 'q1',
          type: 'short-answer',
          keywords: ['tokenization', 'BPE', 'subword'],
        },
      ];

      const answers = {
        q1: 'Tokenization is the process of breaking text into subwords using BPE algorithm',
      };

      const result = await assessmentService.scoreShortAnswer(questions[0], answers.q1);

      expect(result.score).toBeGreaterThan(0);
      expect(result.matchedKeywords).toContain('tokenization');
      expect(result.matchedKeywords).toContain('BPE');
    });
  });

  describe('Assessment Attempts Tracking', () => {
    it('should record assessment attempts', async () => {
      const user = await createTestUser(testDb.getClient());
      
      await assessmentService.recordAttempt({
        userId: user.id,
        assessmentId: 'chapter-1-quiz',
        score: 85,
        answers: { q1: 'A', q2: 'B' },
      });

      const attempts = await testDb.getClient().assessmentAttempt.findMany({
        where: { userId: user.id, assessmentId: 'chapter-1-quiz' },
      });

      expect(attempts).toHaveLength(1);
      expect(attempts[0].score).toBe(85);
    });

    it('should track multiple attempts', async () => {
      const user = await createTestUser(testDb.getClient());
      const assessmentId = 'chapter-1-quiz';

      await assessmentService.recordAttempt({
        userId: user.id,
        assessmentId,
        score: 60,
        answers: {},
      });

      await assessmentService.recordAttempt({
        userId: user.id,
        assessmentId,
        score: 85,
        answers: {},
      });

      const attempts = await testDb.getClient().assessmentAttempt.findMany({
        where: { userId: user.id, assessmentId },
        orderBy: { attemptedAt: 'asc' },
      });

      expect(attempts).toHaveLength(2);
      expect(attempts[0].score).toBe(60);
      expect(attempts[1].score).toBe(85);
    });

    it('should get best attempt score', async () => {
      const user = await createTestUser(testDb.getClient());
      const assessmentId = 'chapter-1-quiz';

      await assessmentService.recordAttempt({
        userId: user.id,
        assessmentId,
        score: 60,
        answers: {},
      });

      await assessmentService.recordAttempt({
        userId: user.id,
        assessmentId,
        score: 85,
        answers: {},
      });

      await assessmentService.recordAttempt({
        userId: user.id,
        assessmentId,
        score: 75,
        answers: {},
      });

      const bestScore = await assessmentService.getBestScore(user.id, assessmentId);

      expect(bestScore).toBe(85);
    });
  });

  describe('Recommendation Rationale', () => {
    it('should provide rationale for Module 0 recommendation', async () => {
      const result = await assessmentService.calculateRecommendation({
        pythonScore: 40,
        aiScore: 0,
      });

      expect(result.rationale).toBeDefined();
      expect(result.rationale).toContain('Python foundations');
    });

    it('should provide rationale for Module 1 recommendation', async () => {
      const result = await assessmentService.calculateRecommendation({
        pythonScore: 85,
        aiScore: 1,
      });

      expect(result.rationale).toBeDefined();
      expect(result.rationale).toContain('Whole Game');
    });

    it('should provide rationale for advanced entry', async () => {
      const result = await assessmentService.calculateRecommendation({
        pythonScore: 95,
        aiScore: 5,
      });

      expect(result.rationale).toBeDefined();
      expect(result.rationale).toContain('advanced');
    });
  });

  describe('Override Warnings', () => {
    it('should allow user to override recommendation', async () => {
      const user = await createTestUser(testDb.getClient());
      
      const recommendation = await assessmentService.calculateRecommendation({
        pythonScore: 40,
        aiScore: 0,
      });

      expect(recommendation.recommendedModule).toBe('module-0');

      const override = await assessmentService.overrideRecommendation({
        userId: user.id,
        recommendedModule: 'module-0',
        chosenModule: 'module-1',
      });

      expect(override.warning).toBeDefined();
      expect(override.warning).toContain('prerequisite');
    });

    it('should not warn if override matches recommendation', async () => {
      const user = await createTestUser(testDb.getClient());
      
      const override = await assessmentService.overrideRecommendation({
        userId: user.id,
        recommendedModule: 'module-1',
        chosenModule: 'module-1',
      });

      expect(override.warning).toBeUndefined();
    });
  });
});
