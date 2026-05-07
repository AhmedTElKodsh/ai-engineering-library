import { z } from 'zod';

// Auth validation schemas
export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters').optional(),
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  oauthProvider: z.enum(['google', 'github']).optional(),
  oauthId: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

// Progress validation schemas
export const completeChapterSchema = z.object({
  chapterId: z.string().cuid('Invalid chapter ID'),
});

// Assessment validation schemas
export const submitDiagnosticSchema = z.object({
  attemptId: z.string().cuid('Invalid attempt ID'),
  answers: z.array(z.object({
    questionId: z.string().cuid('Invalid question ID'),
    answer: z.string().min(1, 'Answer cannot be empty'),
  })).min(1, 'At least one answer is required'),
});

export const submitCheckpointSchema = z.object({
  attemptId: z.string().cuid('Invalid attempt ID'),
  answers: z.array(z.object({
    questionId: z.string().cuid('Invalid question ID'),
    answer: z.string().min(1, 'Answer cannot be empty'),
  })).min(1, 'At least one answer is required'),
});

// Code execution validation schemas
export const executeCodeSchema = z.object({
  code: z.string().min(1, 'Code cannot be empty').max(10000, 'Code exceeds maximum length'),
  language: z.enum(['python', 'javascript', 'typescript']),
  testCases: z.array(z.object({
    input: z.string(),
    expectedOutput: z.string(),
  })).optional(),
});

// Project submission validation schemas
export const submitProjectSchema = z.object({
  chapterId: z.string().cuid('Invalid chapter ID'),
  githubUrl: z.string().url('Invalid GitHub URL').optional(),
  demoUrl: z.string().url('Invalid demo URL').optional(),
  screenshots: z.array(z.string().url('Invalid screenshot URL')).optional(),
  description: z.string().min(10, 'Description must be at least 10 characters').optional(),
  technologies: z.array(z.string()).optional(),
});

// Review validation schemas
export const submitReviewSchema = z.object({
  submissionId: z.string().cuid('Invalid submission ID'),
  rubricScores: z.object({
    codeQuality: z.number().min(0).max(10),
    documentation: z.number().min(0).max(10),
    testing: z.number().min(0).max(10),
    deployment: z.number().min(0).max(10),
  }).optional(),
  overallScore: z.number().min(0).max(10).optional(),
  strengths: z.array(z.string()).optional(),
  improvements: z.array(z.string()).optional(),
  recommendation: z.enum(['approve', 'revision-required', 'needs-work']).optional(),
  generalFeedback: z.string().optional(),
});

// Weekly hours validation
export const updateWeeklyHoursSchema = z.object({
  weeklyHours: z.number().min(1, 'Weekly hours must be at least 1').max(168, 'Weekly hours cannot exceed 168'),
});

// Validation middleware helper
export function validateRequest(schema: z.ZodSchema) {
  return (req: any, res: any, next: any) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: 'Validation failed',
          details: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        });
      }
      next(error);
    }
  };
}
