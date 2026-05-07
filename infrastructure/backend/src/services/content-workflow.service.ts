import { PrismaClient } from '@prisma/client';
import { ContentVersioningService } from './content-versioning.service';

const prisma = new PrismaClient();
const versioningService = new ContentVersioningService();

export type ContentStatus = 'draft' | 'in-review' | 'approved' | 'published' | 'archived';

interface ContentReview {
  id: string;
  chapterId: string;
  reviewerId: string;
  status: 'pending' | 'approved' | 'rejected';
  comments?: string;
  reviewedAt?: Date;
}

interface PublishRecord {
  id: string;
  chapterId: string;
  version: number;
  publishedAt: Date;
  publishedBy: string;
  previousVersion?: number;
}

/**
 * Content Workflow Service
 * Handles content staging, review, publishing, and rollback
 */
export class ContentWorkflowService {
  /**
   * Submit content for review
   */
  async submitForReview(
    chapterId: string,
    content: string,
    submitterId: string
  ): Promise<ContentReview> {
    // Create new version
    const version = await versioningService.createVersion(chapterId, content, 'Submitted for review');

    // Create review record
    const review = await prisma.contentReview.create({
      data: {
        chapterId: version.chapterId,
        submitterId,
        status: 'pending',
        version: version.version,
      },
    });

    return {
      id: review.id,
      chapterId: review.chapterId,
      reviewerId: review.reviewerId || '',
      status: review.status,
      comments: review.comments || undefined,
      reviewedAt: review.reviewedAt || undefined,
    };
  }

  /**
   * Approve content
   */
  async approveContent(
    reviewId: string,
    reviewerId: string,
    comments?: string
  ): Promise<PublishRecord> {
    // Get review
    const review = await prisma.contentReview.findUnique({
      where: { id: reviewId },
    });

    if (!review) {
      throw new Error(`Review ${reviewId} not found`);
    }

    if (review.status !== 'pending') {
      throw new Error(`Review is already ${review.status}`);
    }

    // Update review status
    await prisma.contentReview.update({
      where: { id: reviewId },
      data: {
        status: 'approved',
        reviewerId,
        comments,
        reviewedAt: new Date(),
      },
    });

    // Publish the content
    return this.publishContent(review.chapterId, review.version, reviewerId);
  }

  /**
   * Reject content
   */
  async rejectContent(
    reviewId: string,
    reviewerId: string,
    comments: string
  ): Promise<ContentReview> {
    const review = await prisma.contentReview.findUnique({
      where: { id: reviewId },
    });

    if (!review) {
      throw new Error(`Review ${reviewId} not found`);
    }

    // Update review status
    const updated = await prisma.contentReview.update({
      where: { id: reviewId },
      data: {
        status: 'rejected',
        reviewerId,
        comments,
        reviewedAt: new Date(),
      },
    });

    return {
      id: updated.id,
      chapterId: updated.chapterId,
      reviewerId: updated.reviewerId || '',
      status: updated.status,
      comments: updated.comments || undefined,
      reviewedAt: updated.reviewedAt || undefined,
    };
  }

  /**
   * Publish content
   */
  async publishContent(
    chapterId: string,
    version: number,
    publishedBy: string
  ): Promise<PublishRecord> {
    // Get the version to publish
    const versionData = await versioningService.getVersion(chapterId, version);
    
    if (!versionData) {
      throw new Error(`Version ${version} not found for chapter ${chapterId}`);
    }

    // Get current published version (if any)
    const currentPublished = await prisma.publishRecord.findFirst({
      where: { chapterId },
      orderBy: { publishedAt: 'desc' },
    });

    // Create publish record
    const publishRecord = await prisma.publishRecord.create({
      data: {
        chapterId,
        version,
        publishedBy,
        previousVersion: currentPublished?.version,
      },
    });

    // Update chapter status to published
    await prisma.chapter.update({
      where: { id: chapterId },
      data: { status: 'published' },
    });

    return {
      id: publishRecord.id,
      chapterId: publishRecord.chapterId,
      version: publishRecord.version,
      publishedAt: publishRecord.publishedAt,
      publishedBy: publishRecord.publishedBy,
      previousVersion: publishRecord.previousVersion || undefined,
    };
  }

  /**
   * Rollback to previous version
   */
  async rollback(
    chapterId: string,
    targetVersion: number,
    rolledBackBy: string
  ): Promise<PublishRecord> {
    // Get target version
    const targetVersionData = await versioningService.getVersion(chapterId, targetVersion);
    
    if (!targetVersionData) {
      throw new Error(`Target version ${targetVersion} not found`);
    }

    // Create new version with reverted content
    const reverted = await versioningService.revertToVersion(chapterId, targetVersion);

    // Publish the reverted version
    return this.publishContent(chapterId, reverted.version, rolledBackBy);
  }

  /**
   * Get content staging items (draft/in-review)
   */
  async getStagingItems(): Promise<any[]> {
    const chapters = await prisma.chapter.findMany({
      where: {
        status: { in: ['draft', 'in-review'] },
      },
      include: {
        module: true,
        reviews: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });

    return chapters.map(ch => ({
      id: ch.id,
      title: ch.title,
      status: ch.status,
      version: ch.version,
      moduleTitle: ch.module.title,
      lastReview: ch.reviews[0] || null,
    }));
  }

  /**
   * Get publish history for a chapter
   */
  async getPublishHistory(chapterId: string): Promise<PublishRecord[]> {
    const records = await prisma.publishRecord.findMany({
      where: { chapterId },
      orderBy: { publishedAt: 'desc' },
    });

    return records.map(r => ({
      id: r.id,
      chapterId: r.chapterId,
      version: r.version,
      publishedAt: r.publishedAt,
      publishedBy: r.publishedBy,
      previousVersion: r.previousVersion || undefined,
    }));
  }
}

export default new ContentWorkflowService();