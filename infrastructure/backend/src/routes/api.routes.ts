import { Router, Request, Response } from 'express';
import { registerUser, loginUser, getUserProfile } from '../services/user.service';
import { getModules, getModuleById, getChapterById, getModuleWeeks, getWeekDays, getModuleMilestones } from '../services/content.service';
import { completeChapter, getUserProgress, getUserMilestones, calculateDuration, updateWeeklyHours } from '../services/progress.service';
import { startDiagnosticAssessment, submitDiagnosticAnswers, startCheckpointAttempt, submitCheckpoint } from '../services/assessment.service';
import { authenticateToken } from '../middleware/auth.middleware';
import { validateRequest, registerSchema, loginSchema, completeChapterSchema, submitDiagnosticSchema, submitCheckpointSchema, executeCodeSchema, submitProjectSchema, submitReviewSchema, updateWeeklyHoursSchema } from '../validation/schemas';

const router = Router();

// Auth routes
router.post('/auth/register', validateRequest(registerSchema), async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    const result = await registerUser({ email, password, name });
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/auth/login', validateRequest(loginSchema), async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser({ email, password });
    res.json(result);
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
});

router.get('/auth/profile', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const profile = await getUserProfile(userId);
    res.json(profile);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Content routes
router.get('/content/modules', async (req: Request, res: Response) => {
  try {
    const modules = await getModules();
    res.json(modules);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/content/modules/:moduleId', async (req: Request, res: Response) => {
  try {
    const { moduleId } = req.params;
    const module = await getModuleById(moduleId);
    if (!module) return res.status(404).json({ error: 'Module not found' });
    res.json(module);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/content/chapters/:chapterId', async (req: Request, res: Response) => {
  try {
    const { chapterId } = req.params;
    const chapter = await getChapterById(chapterId);
    if (!chapter) return res.status(404).json({ error: 'Chapter not found' });
    res.json(chapter);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/content/modules/:moduleId/weeks', async (req: Request, res: Response) => {
  try {
    const { moduleId } = req.params;
    const weeks = await getModuleWeeks(moduleId);
    res.json(weeks);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/content/modules/:moduleId/weeks/:weekId/days', async (req: Request, res: Response) => {
  try {
    const { moduleId, weekId } = req.params;
    const days = await getWeekDays(moduleId, weekId);
    res.json(days);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/content/modules/:moduleId/milestones', async (req: Request, res: Response) => {
  try {
    const { moduleId } = req.params;
    const milestones = await getModuleMilestones(moduleId);
    res.json(milestones);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Progress routes (protected)
router.post('/progress/chapters/:chapterId/complete', authenticateToken, validateRequest(completeChapterSchema), async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const { chapterId } = req.params;
    const result = await completeChapter(userId, chapterId);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/progress/users/:userId', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const progress = await getUserProgress(userId);
    res.json(progress);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/progress/users/:userId/milestones', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const milestones = await getUserMilestones(userId);
    res.json(milestones);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/progress/users/:userId/duration', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const duration = await calculateDuration(userId);
    res.json(duration);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/progress/users/:userId/weekly-hours', authenticateToken, validateRequest(updateWeeklyHoursSchema), async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { weeklyHours } = req.body;
    await updateWeeklyHours(userId, weeklyHours);
    res.json({ message: 'Weekly hours updated' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Assessment routes
router.post('/assessments/diagnostic/start', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const result = await startDiagnosticAssessment(userId);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/assessments/diagnostic/submit', authenticateToken, validateRequest(submitDiagnosticSchema), async (req: Request, res: Response) => {
  try {
    const { attemptId, answers } = req.body;
    const result = await submitDiagnosticAnswers(attemptId, answers);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/assessments/checkpoint/:chapterId/start', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const { chapterId } = req.params;
    const result = await startCheckpointAttempt(userId, chapterId);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/assessments/checkpoint/submit', authenticateToken, validateRequest(submitCheckpointSchema), async (req: Request, res: Response) => {
  try {
    const { attemptId, answers } = req.body;
    const result = await submitCheckpoint(attemptId, answers);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Portfolio routes
router.get('/portfolio/users/:userId', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { getPortfolio } = require('../services/portfolio.service');
    const portfolio = await getPortfolio(userId);
    res.json(portfolio);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/portfolio/users/:userId/projects/:submissionId/mark-ready', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { userId, submissionId } = req.params;
    const { markPortfolioReady } = require('../services/portfolio.service');
    const { isReady } = req.body;
    const result = await markPortfolioReady(userId, submissionId, isReady);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/portfolio/users/:userId/generate-public', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { generatePublicPortfolio } = require('../services/portfolio.service');
    const result = await generatePublicPortfolio(userId);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/portfolio/public/:slug', async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const { getPublicPortfolio } = require('../services/portfolio.service');
    const result = await getPublicPortfolio(slug);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/portfolio/users/:userId/export', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { exportPortfolio } = require('../services/portfolio.service');
    const { format } = req.body;
    const result = await exportPortfolio(userId, format);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Project Submission routes
router.post('/projects/submit', authenticateToken, validateRequest(submitProjectSchema), async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const { chapterId, githubUrl, demoUrl, screenshots, description } = req.body;
    const { submitProject } = require('../services/portfolio.service');
    const result = await submitProject(userId, chapterId, { githubUrl, demoUrl, screenshots, description });
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/projects/submissions/:submissionId', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { submissionId } = req.params;
    const { getReviews } = require('../services/review.service');
    const reviews = await getReviews(submissionId);
    res.json(reviews);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/projects/submissions/:submissionId/reviews', authenticateToken, validateRequest(submitReviewSchema), async (req: Request, res: Response) => {
  try {
    const { submissionId } = req.params;
    const userId = (req as any).user.userId;
    const { submitReview } = require('../services/review.service');
    const result = await submitReview({ submissionId, ...req.body }, userId);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/projects/submissions/:submissionId/comments', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { submissionId } = req.params;
    const userId = (req as any).user.userId;
    const { addCodeComment } = require('../services/review.service');
    const result = await addCodeComment({ reviewId: submissionId, userId, ...req.body });
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/projects/reviews/:reviewId/respond', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { reviewId } = req.params;
    const userId = (req as any).user.userId;
    const { respondToReview } = require('../services/review.service');
    const { response } = req.body;
    const result = await respondToReview(reviewId, userId, response);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/projects/submissions/pending', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const { getPendingReviews } = require('../services/review.service');
    const reviews = await getPendingReviews(userId);
    res.json(reviews);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Code execution route
router.post('/code/execute', authenticateToken, validateRequest(executeCodeSchema), async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const { code, language, testCases } = req.body;
    const { executeCode } = require('../services/code-execution.service');
    const result = await executeCode({ code, language, testCases }, userId);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Content Versioning routes
router.post('/content/chapters/:chapterId/versions', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { chapterId } = req.params;
    const { content, changeLog } = req.body;
    const versioningService = require('../services/content-versioning.service').default;
    const result = await versioningService.createVersion(chapterId, content, changeLog);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/content/chapters/:chapterId/versions', async (req: Request, res: Response) => {
  try {
    const { chapterId } = req.params;
    const versioningService = require('../services/content-versioning.service').default;
    const versions = await versioningService.getVersions(chapterId);
    res.json(versions);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/content/chapters/:chapterId/versions/:version', async (req: Request, res: Response) => {
  try {
    const { chapterId, version } = req.params;
    const versioningService = require('../services/content-versioning.service').default;
    const versionData = await versioningService.getVersion(chapterId, parseInt(version));
    if (!versionData) return res.status(404).json({ error: 'Version not found' });
    res.json(versionData);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/content/chapters/:chapterId/revert/:version', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { chapterId, version } = req.params;
    const versioningService = require('../services/content-versioning.service').default;
    const result = await versioningService.revertToVersion(chapterId, parseInt(version));
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/content/migrate-progress', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { oldChapterId, newChapterId } = req.body;
    const versioningService = require('../services/content-versioning.service').default;
    const result = await versioningService.migrateProgress(oldChapterId, newChapterId);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Content Workflow routes
router.post('/content/chapters/:chapterId/submit-review', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { chapterId } = req.params;
    const { content } = req.body;
    const userId = (req as any).user.userId;
    const workflowService = require('../services/content-workflow.service').default;
    const result = await workflowService.submitForReview(chapterId, content, userId);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/content/reviews/:reviewId/approve', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { reviewId } = req.params;
    const userId = (req as any).user.userId;
    const { comments } = req.body;
    const workflowService = require('../services/content-workflow.service').default;
    const result = await workflowService.approveContent(reviewId, userId, comments);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/content/reviews/:reviewId/reject', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { reviewId } = req.params;
    const userId = (req as any).user.userId;
    const { comments } = req.body;
    const workflowService = require('../services/content-workflow.service').default;
    const result = await workflowService.rejectContent(reviewId, userId, comments);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/content/chapters/:chapterId/publish', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { chapterId } = req.params;
    const userId = (req as any).user.userId;
    const { version } = req.body;
    const workflowService = require('../services/content-workflow.service').default;
    const result = await workflowService.publishContent(chapterId, version, userId);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/content/chapters/:chapterId/rollback', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { chapterId } = req.params;
    const userId = (req as any).user.userId;
    const { targetVersion } = req.body;
    const workflowService = require('../services/content-workflow.service').default;
    const result = await workflowService.rollback(chapterId, targetVersion, userId);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/content/staging', authenticateToken, async (req: Request, res: Response) => {
  try {
    const workflowService = require('../services/content-workflow.service').default;
    const items = await workflowService.getStagingItems();
    res.json(items);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/content/chapters/:chapterId/publish-history', async (req: Request, res: Response) => {
  try {
    const { chapterId } = req.params;
    const workflowService = require('../services/content-workflow.service').default;
    const history = await workflowService.getPublishHistory(chapterId);
    res.json(history);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
