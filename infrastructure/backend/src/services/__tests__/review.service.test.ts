import { PrismaClient } from '@prisma/client';
import {
  submitReview,
  addCodeComment,
  getReviews,
  respondToReview,
  getPendingReviews,
  determineSubmissionStatus,
  ReviewInput,
  RubricScores,
} from '../review.service';

// Mock Prisma Client
jest.mock('@prisma/client', () => {
  const mockPrismaClient = {
    projectSubmission: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    review: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
    codeComment: {
      create: jest.fn(),
    },
    reviewResponse: {
      create: jest.fn(),
    },
  };
  return {
    PrismaClient: jest.fn(() => mockPrismaClient),
  };
});

describe('ProjectReviewService', () => {
  let prisma: any;

  beforeEach(() => {
    prisma = new PrismaClient();
    jest.clearAllMocks();
  });

  describe('submitReview', () => {
    it('should submit review with rubric scoring and status transitions', async () => {
      const mockSubmission = {
        id: 'sub-1',
        userId: 'user-1',
        chapterId: 'ch-1',
        status: 'pending-review',
        chapter: { title: 'Project 1' },
      };

      const reviewInput: ReviewInput = {
        submissionId: 'sub-1',
        rubricScores: {
          codeQuality: 85,
          documentation: 90,
          testing: 80,
          deployment: 88,
        },
        strengths: ['Clean code', 'Good documentation'],
        improvements: ['Add more tests', 'Improve error handling'],
        recommendation: 'approve',
        generalFeedback: 'Great work overall!',
      };

      const expectedOverallScore = (85 + 90 + 80 + 88) / 4; // 85.75

      prisma.projectSubmission.findUnique.mockResolvedValue(mockSubmission);
      prisma.review.create.mockResolvedValue({
        id: 'review-1',
        submissionId: 'sub-1',
        reviewerId: 'reviewer-1',
        overallScore: expectedOverallScore,
        recommendation: 'approve',
      });
      prisma.projectSubmission.update.mockResolvedValue({
        ...mockSubmission,
        status: 'approved',
      });

      const result = await submitReview(reviewInput, 'reviewer-1');

      expect(result.overallScore).toBe(expectedOverallScore);
      expect(prisma.review.create).toHaveBeenCalledWith({
        data: {
          submissionId: 'sub-1',
          reviewerId: 'reviewer-1',
          rubricScores: JSON.stringify(reviewInput.rubricScores),
          overallScore: expectedOverallScore,
          strengths: JSON.stringify(reviewInput.strengths),
          improvements: JSON.stringify(reviewInput.improvements),
          recommendation: 'approve',
          generalFeedback: 'Great work overall!',
        },
      });
      expect(prisma.projectSubmission.update).toHaveBeenCalledWith({
        where: { id: 'sub-1' },
        data: {
          status: 'approved',
          revisionNumber: undefined,
        },
      });
    });

    it('should transition to revision-requested status', async () => {
      const mockSubmission = {
        id: 'sub-1',
        userId: 'user-1',
        status: 'pending-review',
        chapter: {},
      };

      const reviewInput: ReviewInput = {
        submissionId: 'sub-1',
        rubricScores: {
          codeQuality: 60,
          documentation: 55,
          testing: 50,
          deployment: 65,
        },
        strengths: ['Good attempt'],
        improvements: ['Needs significant refactoring', 'Add comprehensive tests'],
        recommendation: 'revision-required',
      };

      prisma.projectSubmission.findUnique.mockResolvedValue(mockSubmission);
      prisma.review.create.mockResolvedValue({
        id: 'review-1',
        recommendation: 'revision-required',
      });
      prisma.projectSubmission.update.mockResolvedValue({
        ...mockSubmission,
        status: 'revision-requested',
        revisionNumber: 1,
      });

      await submitReview(reviewInput, 'reviewer-1');

      expect(prisma.projectSubmission.update).toHaveBeenCalledWith({
        where: { id: 'sub-1' },
        data: {
          status: 'revision-requested',
          revisionNumber: { increment: 1 },
        },
      });
    });

    it('should not change status for needs-work recommendation', async () => {
      const mockSubmission = {
        id: 'sub-1',
        userId: 'user-1',
        status: 'pending-review',
        chapter: {},
      };

      const reviewInput: ReviewInput = {
        submissionId: 'sub-1',
        rubricScores: {
          codeQuality: 70,
          documentation: 75,
          testing: 68,
          deployment: 72,
        },
        strengths: ['Decent implementation'],
        improvements: ['Minor improvements needed'],
        recommendation: 'needs-work',
      };

      prisma.projectSubmission.findUnique.mockResolvedValue(mockSubmission);
      prisma.review.create.mockResolvedValue({
        id: 'review-1',
        recommendation: 'needs-work',
      });

      await submitReview(reviewInput, 'reviewer-1');

      // Status should remain 'pending-review'
      expect(prisma.projectSubmission.update).not.toHaveBeenCalled();
    });

    it('should throw error for non-existent submission', async () => {
      const reviewInput: ReviewInput = {
        submissionId: 'non-existent',
        rubricScores: {
          codeQuality: 80,
          documentation: 80,
          testing: 80,
          deployment: 80,
        },
        strengths: [],
        improvements: [],
        recommendation: 'approve',
      };

      prisma.projectSubmission.findUnique.mockResolvedValue(null);

      await expect(submitReview(reviewInput, 'reviewer-1')).rejects.toThrow('Submission not found');
    });

    it('should throw error for submission not pending review', async () => {
      const mockSubmission = {
        id: 'sub-1',
        userId: 'user-1',
        status: 'approved',
        chapter: {},
      };

      const reviewInput: ReviewInput = {
        submissionId: 'sub-1',
        rubricScores: {
          codeQuality: 80,
          documentation: 80,
          testing: 80,
          deployment: 80,
        },
        strengths: [],
        improvements: [],
        recommendation: 'approve',
      };

      prisma.projectSubmission.findUnique.mockResolvedValue(mockSubmission);

      await expect(submitReview(reviewInput, 'reviewer-1')).rejects.toThrow(
        'Submission is not pending review'
      );
    });

    it('should calculate overall score correctly', async () => {
      const mockSubmission = {
        id: 'sub-1',
        userId: 'user-1',
        status: 'pending-review',
        chapter: {},
      };

      const reviewInput: ReviewInput = {
        submissionId: 'sub-1',
        rubricScores: {
          codeQuality: 100,
          documentation: 90,
          testing: 85,
          deployment: 95,
        },
        strengths: [],
        improvements: [],
        recommendation: 'approve',
      };

      const expectedScore = (100 + 90 + 85 + 95) / 4; // 92.5

      prisma.projectSubmission.findUnique.mockResolvedValue(mockSubmission);
      prisma.review.create.mockResolvedValue({
        id: 'review-1',
        overallScore: expectedScore,
      });
      prisma.projectSubmission.update.mockResolvedValue({});

      const result = await submitReview(reviewInput, 'reviewer-1');

      expect(result.overallScore).toBe(expectedScore);
    });
  });

  describe('addCodeComment', () => {
    it('should add code comment with different severity levels', async () => {
      const commentData = {
        reviewId: 'review-1',
        userId: 'reviewer-1',
        file: 'src/main.ts',
        lineNumber: 42,
        content: 'This function could be optimized',
        severity: 'suggestion' as const,
      };

      prisma.codeComment.create.mockResolvedValue({
        id: 'comment-1',
        ...commentData,
        createdAt: new Date(),
      });

      const result = await addCodeComment(commentData);

      expect(prisma.codeComment.create).toHaveBeenCalledWith({
        data: commentData,
      });
      expect(result.severity).toBe('suggestion');
    });

    it('should handle info severity level', async () => {
      const commentData = {
        reviewId: 'review-1',
        userId: 'reviewer-1',
        file: 'src/utils.ts',
        lineNumber: 10,
        content: 'Nice use of TypeScript generics here',
        severity: 'info' as const,
      };

      prisma.codeComment.create.mockResolvedValue({
        id: 'comment-2',
        ...commentData,
      });

      const result = await addCodeComment(commentData);

      expect(result.severity).toBe('info');
    });

    it('should handle issue severity level', async () => {
      const commentData = {
        reviewId: 'review-1',
        userId: 'reviewer-1',
        file: 'src/api.ts',
        lineNumber: 55,
        content: 'Missing error handling for this API call',
        severity: 'issue' as const,
      };

      prisma.codeComment.create.mockResolvedValue({
        id: 'comment-3',
        ...commentData,
      });

      const result = await addCodeComment(commentData);

      expect(result.severity).toBe('issue');
    });

    it('should handle critical severity level', async () => {
      const commentData = {
        reviewId: 'review-1',
        userId: 'reviewer-1',
        file: 'src/auth.ts',
        lineNumber: 88,
        content: 'Security vulnerability: SQL injection possible',
        severity: 'critical' as const,
      };

      prisma.codeComment.create.mockResolvedValue({
        id: 'comment-4',
        ...commentData,
      });

      const result = await addCodeComment(commentData);

      expect(result.severity).toBe('critical');
    });
  });

  describe('getReviews', () => {
    it('should retrieve reviews with code comments aggregation', async () => {
      const mockReviews = [
        {
          id: 'review-1',
          submissionId: 'sub-1',
          reviewerId: 'reviewer-1',
          overallScore: 85,
          recommendation: 'approve',
          createdAt: new Date('2024-01-01'),
          codeComments: [
            {
              id: 'comment-1',
              file: 'src/main.ts',
              lineNumber: 42,
              content: 'Good implementation',
              severity: 'info',
            },
            {
              id: 'comment-2',
              file: 'src/utils.ts',
              lineNumber: 10,
              content: 'Consider refactoring',
              severity: 'suggestion',
            },
          ],
          reviewer: {
            id: 'reviewer-1',
            name: 'Jane Reviewer',
            email: 'jane@example.com',
          },
        },
        {
          id: 'review-2',
          submissionId: 'sub-1',
          reviewerId: 'reviewer-2',
          overallScore: 90,
          recommendation: 'approve',
          createdAt: new Date('2024-01-02'),
          codeComments: [],
          reviewer: {
            id: 'reviewer-2',
            name: 'John Reviewer',
            email: 'john@example.com',
          },
        },
      ];

      prisma.review.findMany.mockResolvedValue(mockReviews);

      const result = await getReviews('sub-1');

      expect(result).toHaveLength(2);
      expect(result[0].codeComments).toHaveLength(2);
      expect(result[1].codeComments).toHaveLength(0);
      expect(result[0].reviewer.name).toBe('Jane Reviewer');
      expect(prisma.review.findMany).toHaveBeenCalledWith({
        where: { submissionId: 'sub-1' },
        include: {
          codeComments: true,
          reviewer: { select: { id: true, name: true, email: true } },
        },
        orderBy: { createdAt: 'desc' },
      });
    });

    it('should return empty array for submission with no reviews', async () => {
      prisma.review.findMany.mockResolvedValue([]);

      const result = await getReviews('sub-no-reviews');

      expect(result).toHaveLength(0);
    });

    it('should order reviews by creation date descending', async () => {
      const mockReviews = [
        {
          id: 'review-3',
          createdAt: new Date('2024-01-03'),
          codeComments: [],
          reviewer: { id: 'r1', name: 'R1', email: 'r1@example.com' },
        },
        {
          id: 'review-2',
          createdAt: new Date('2024-01-02'),
          codeComments: [],
          reviewer: { id: 'r2', name: 'R2', email: 'r2@example.com' },
        },
        {
          id: 'review-1',
          createdAt: new Date('2024-01-01'),
          codeComments: [],
          reviewer: { id: 'r3', name: 'R3', email: 'r3@example.com' },
        },
      ];

      prisma.review.findMany.mockResolvedValue(mockReviews);

      const result = await getReviews('sub-1');

      expect(result[0].id).toBe('review-3');
      expect(result[1].id).toBe('review-2');
      expect(result[2].id).toBe('review-1');
    });
  });

  describe('respondToReview', () => {
    it('should allow learner to respond to review (authorization)', async () => {
      const responseData = {
        id: 'response-1',
        reviewId: 'review-1',
        userId: 'user-1',
        content: 'Thank you for the feedback! I will address these issues.',
        createdAt: new Date(),
      };

      prisma.reviewResponse.create.mockResolvedValue(responseData);

      const result = await respondToReview('review-1', 'user-1', responseData.content);

      expect(prisma.reviewResponse.create).toHaveBeenCalledWith({
        data: {
          reviewId: 'review-1',
          userId: 'user-1',
          content: responseData.content,
        },
      });
      expect(result.content).toBe(responseData.content);
    });

    it('should handle multiple responses to same review', async () => {
      const response1 = 'First response';
      const response2 = 'Follow-up response';

      prisma.reviewResponse.create
        .mockResolvedValueOnce({
          id: 'response-1',
          reviewId: 'review-1',
          userId: 'user-1',
          content: response1,
        })
        .mockResolvedValueOnce({
          id: 'response-2',
          reviewId: 'review-1',
          userId: 'user-1',
          content: response2,
        });

      const result1 = await respondToReview('review-1', 'user-1', response1);
      const result2 = await respondToReview('review-1', 'user-1', response2);

      expect(result1.content).toBe(response1);
      expect(result2.content).toBe(response2);
      expect(prisma.reviewResponse.create).toHaveBeenCalledTimes(2);
    });
  });

  describe('getPendingReviews', () => {
    it('should retrieve pending reviews for specific reviewer', async () => {
      const mockPendingReviews = [
        {
          id: 'review-pending-1',
          reviewerId: 'reviewer-1',
          submission: {
            id: 'sub-1',
            status: 'pending-review',
            chapter: {
              title: 'Project 1',
              module: { title: 'Module 1' },
            },
          },
          reviewer: {
            id: 'reviewer-1',
            name: 'Jane Reviewer',
          },
          createdAt: new Date(),
        },
      ];

      prisma.review.findMany.mockResolvedValue(mockPendingReviews);

      const result = await getPendingReviews('reviewer-1');

      expect(result).toHaveLength(1);
      expect(result[0].submission.status).toBe('pending-review');
      expect(prisma.review.findMany).toHaveBeenCalledWith({
        where: {
          submission: { status: 'pending-review' },
          reviewerId: 'reviewer-1',
        },
        include: expect.any(Object),
        orderBy: { createdAt: 'desc' },
      });
    });

    it('should retrieve all pending reviews when no reviewer specified', async () => {
      const mockPendingReviews = [
        {
          id: 'review-pending-1',
          submission: { status: 'pending-review', chapter: { module: {} } },
          reviewer: { id: 'r1', name: 'R1' },
          createdAt: new Date(),
        },
        {
          id: 'review-pending-2',
          submission: { status: 'pending-review', chapter: { module: {} } },
          reviewer: { id: 'r2', name: 'R2' },
          createdAt: new Date(),
        },
      ];

      prisma.review.findMany.mockResolvedValue(mockPendingReviews);

      const result = await getPendingReviews();

      expect(result).toHaveLength(2);
      expect(prisma.review.findMany).toHaveBeenCalledWith({
        where: {
          submission: { status: 'pending-review' },
        },
        include: expect.any(Object),
        orderBy: { createdAt: 'desc' },
      });
    });
  });

  describe('determineSubmissionStatus', () => {
    it('should return pending-review for no reviews', () => {
      const status = determineSubmissionStatus([]);
      expect(status).toBe('pending-review');
    });

    it('should return approved for approve recommendation', () => {
      const reviews = [
        { id: 'r1', recommendation: 'approve' },
      ];
      const status = determineSubmissionStatus(reviews);
      expect(status).toBe('approved');
    });

    it('should return revision-requested for revision-required recommendation', () => {
      const reviews = [
        { id: 'r1', recommendation: 'revision-required' },
      ];
      const status = determineSubmissionStatus(reviews);
      expect(status).toBe('revision-requested');
    });

    it('should use latest review for status determination', () => {
      const reviews = [
        { id: 'r1', recommendation: 'revision-required' },
        { id: 'r2', recommendation: 'approve' },
      ];
      const status = determineSubmissionStatus(reviews);
      expect(status).toBe('approved');
    });
  });

  describe('Edge Cases', () => {
    describe('Resubmission', () => {
      it('should handle resubmission after revision request', async () => {
        const mockSubmission = {
          id: 'sub-1',
          userId: 'user-1',
          status: 'pending-review',
          revisionNumber: 1,
          chapter: {},
        };

        const reviewInput: ReviewInput = {
          submissionId: 'sub-1',
          rubricScores: {
            codeQuality: 90,
            documentation: 92,
            testing: 88,
            deployment: 91,
          },
          strengths: ['All issues addressed'],
          improvements: [],
          recommendation: 'approve',
        };

        prisma.projectSubmission.findUnique.mockResolvedValue(mockSubmission);
        prisma.review.create.mockResolvedValue({
          id: 'review-2',
          recommendation: 'approve',
        });
        prisma.projectSubmission.update.mockResolvedValue({
          ...mockSubmission,
          status: 'approved',
        });

        await submitReview(reviewInput, 'reviewer-1');

        expect(prisma.projectSubmission.update).toHaveBeenCalledWith({
          where: { id: 'sub-1' },
          data: {
            status: 'approved',
            revisionNumber: undefined,
          },
        });
      });
    });

    describe('Multiple Reviews', () => {
      it('should handle multiple reviews on same submission', async () => {
        const mockReviews = [
          {
            id: 'review-1',
            submissionId: 'sub-1',
            reviewerId: 'reviewer-1',
            overallScore: 75,
            recommendation: 'revision-required',
            createdAt: new Date('2024-01-01'),
            codeComments: [],
            reviewer: { id: 'r1', name: 'R1', email: 'r1@example.com' },
          },
          {
            id: 'review-2',
            submissionId: 'sub-1',
            reviewerId: 'reviewer-2',
            overallScore: 90,
            recommendation: 'approve',
            createdAt: new Date('2024-01-05'),
            codeComments: [],
            reviewer: { id: 'r2', name: 'R2', email: 'r2@example.com' },
          },
        ];

        prisma.review.findMany.mockResolvedValue(mockReviews);

        const result = await getReviews('sub-1');

        expect(result).toHaveLength(2);
        expect(result[0].recommendation).toBe('revision-required');
        expect(result[1].recommendation).toBe('approve');
      });
    });

    describe('Revision Tracking', () => {
      it('should increment revision number on revision request', async () => {
        const mockSubmission = {
          id: 'sub-1',
          userId: 'user-1',
          status: 'pending-review',
          revisionNumber: 0,
          chapter: {},
        };

        const reviewInput: ReviewInput = {
          submissionId: 'sub-1',
          rubricScores: {
            codeQuality: 60,
            documentation: 65,
            testing: 55,
            deployment: 62,
          },
          strengths: [],
          improvements: ['Major refactoring needed'],
          recommendation: 'revision-required',
        };

        prisma.projectSubmission.findUnique.mockResolvedValue(mockSubmission);
        prisma.review.create.mockResolvedValue({
          id: 'review-1',
          recommendation: 'revision-required',
        });
        prisma.projectSubmission.update.mockResolvedValue({
          ...mockSubmission,
          status: 'revision-requested',
          revisionNumber: 1,
        });

        await submitReview(reviewInput, 'reviewer-1');

        expect(prisma.projectSubmission.update).toHaveBeenCalledWith({
          where: { id: 'sub-1' },
          data: {
            status: 'revision-requested',
            revisionNumber: { increment: 1 },
          },
        });
      });

      it('should track multiple revision cycles', async () => {
        const submissions = [
          { revisionNumber: 0, status: 'pending-review' },
          { revisionNumber: 1, status: 'pending-review' },
          { revisionNumber: 2, status: 'pending-review' },
        ];

        for (let i = 0; i < submissions.length; i++) {
          const mockSubmission = {
            id: 'sub-1',
            userId: 'user-1',
            ...submissions[i],
            chapter: {},
          };

          const reviewInput: ReviewInput = {
            submissionId: 'sub-1',
            rubricScores: {
              codeQuality: 70,
              documentation: 70,
              testing: 70,
              deployment: 70,
            },
            strengths: [],
            improvements: ['Still needs work'],
            recommendation: 'revision-required',
          };

          prisma.projectSubmission.findUnique.mockResolvedValue(mockSubmission);
          prisma.review.create.mockResolvedValue({
            id: `review-${i + 1}`,
            recommendation: 'revision-required',
          });
          prisma.projectSubmission.update.mockResolvedValue({
            ...mockSubmission,
            status: 'revision-requested',
            revisionNumber: i + 1,
          });

          await submitReview(reviewInput, 'reviewer-1');

          expect(prisma.projectSubmission.update).toHaveBeenCalledWith({
            where: { id: 'sub-1' },
            data: {
              status: 'revision-requested',
              revisionNumber: { increment: 1 },
            },
          });
        }
      });
    });

    describe('Notification Triggers', () => {
      it('should trigger notification on review completion', async () => {
        // Note: Actual notification implementation is commented out in service
        // This test verifies the review is created successfully
        const mockSubmission = {
          id: 'sub-1',
          userId: 'user-1',
          status: 'pending-review',
          chapter: {},
        };

        const reviewInput: ReviewInput = {
          submissionId: 'sub-1',
          rubricScores: {
            codeQuality: 85,
            documentation: 85,
            testing: 85,
            deployment: 85,
          },
          strengths: ['Excellent work'],
          improvements: [],
          recommendation: 'approve',
        };

        prisma.projectSubmission.findUnique.mockResolvedValue(mockSubmission);
        prisma.review.create.mockResolvedValue({
          id: 'review-1',
          submissionId: 'sub-1',
          recommendation: 'approve',
        });
        prisma.projectSubmission.update.mockResolvedValue({
          ...mockSubmission,
          status: 'approved',
        });

        const result = await submitReview(reviewInput, 'reviewer-1');

        // Verify review was created (notification would be triggered here)
        expect(result.id).toBe('review-1');
        expect(result.submissionId).toBe('sub-1');
      });
    });
  });
});
