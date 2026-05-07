import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Review Service - Task 9.2
export interface RubricScores {
  codeQuality: number;
  documentation: number;
  testing: number;
  deployment: number;
}

export interface ReviewInput {
  submissionId: string;
  rubricScores: RubricScores;
  strengths: string[];
  improvements: string[];
  recommendation: 'approve' | 'revision-required' | 'needs-work';
  generalFeedback?: string;
}

export async function submitReview(input: ReviewInput, reviewerId: string): Promise<any> {
  const submission = await prisma.projectSubmission.findUnique({
    where: { id: input.submissionId },
    include: { chapter: true },
  });

  if (!submission) throw new Error('Submission not found');
  if (submission.status !== 'pending-review') {
    throw new Error('Submission is not pending review');
  }

  const overallScore = (
    input.rubricScores.codeQuality +
    input.rubricScores.documentation +
    input.rubricScores.testing +
    input.rubricScores.deployment
  ) / 4;

  const review = await prisma.review.create({
    data: {
      submissionId: input.submissionId,
      reviewerId,
      rubricScores: JSON.stringify(input.rubricScores),
      overallScore,
      strengths: JSON.stringify(input.strengths),
      improvements: JSON.stringify(input.improvements),
      recommendation: input.recommendation,
      generalFeedback: input.generalFeedback,
    },
  });

  // Update submission status based on recommendation
  let newStatus = submission.status;
  if (input.recommendation === 'approve') {
    newStatus = 'approved';
  } else if (input.recommendation === 'revision-required') {
    newStatus = 'revision-requested';
  }

  if (newStatus !== submission.status) {
    await prisma.projectSubmission.update({
      where: { id: input.submissionId },
      data: {
        status: newStatus,
        revisionNumber: newStatus === 'revision-requested' ? { increment: 1 } : undefined,
      },
    });
  }

  // Send notification (placeholder)
  // await publishNotification(`user:${submission.userId}`, { type: 'review_complete', reviewId: review.id });

  return review;
}

export async function addCodeComment(data: {
  reviewId: string;
  userId: string;
  file: string;
  lineNumber: number;
  content: string;
  severity: 'info' | 'suggestion' | 'issue' | 'critical';
}): Promise<any> {
  return await prisma.codeComment.create({
    data: {
      reviewId: data.reviewId,
      userId: data.userId,
      file: data.file,
      lineNumber: data.lineNumber,
      content: data.content,
      severity: data.severity,
    },
  });
}

export async function getReviews(submissionId: string): Promise<any[]> {
  return await prisma.review.findMany({
    where: { submissionId },
    include: {
      codeComments: true,
      reviewer: { select: { id: true, name: true, email: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function respondToReview(reviewId: string, userId: string, response: string): Promise<any> {
  return await prisma.reviewResponse.create({
    data: {
      reviewId,
      userId,
      content: response,
    },
  });
}

export async function getPendingReviews(reviewerId?: string): Promise<any[]> {
  const where: any = { submission: { status: 'pending-review' } };
  if (reviewerId) where.reviewerId = reviewerId;

  return await prisma.review.findMany({
    where,
    include: {
      submission: {
        include: { chapter: { include: { module: true } },
      },
      reviewer: { select: { id: true, name: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
}

export function determineSubmissionStatus(reviews: any[]): string {
  if (reviews.length === 0) return 'pending-review';
  
  const latestReview = reviews[reviews.length - 1];
  return latestReview.recommendation === 'approve' ? 'approved' : 'revision-requested';
}