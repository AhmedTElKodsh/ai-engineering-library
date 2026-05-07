import { PrismaClient } from '@prisma/client';
import { createHash } from 'crypto';

const prisma = new PrismaClient();

interface ContentVersion {
  id: string;
  chapterId: string;
  version: number;
  content: string;
  contentHash: string;
  createdAt: Date;
  changeLog?: string;
}

interface VersionDiff {
  additions: number;
  deletions: number;
  changes: Array<{
    type: 'added' | 'removed' | 'modified';
    line?: number;
    content: string;
  }>;
}

/**
 * Content Versioning Service
 * Handles version creation, retrieval, diff generation, and migration
 */
export class ContentVersioningService {
  /**
   * Create a new version of a chapter
   */
  async createVersion(
    chapterId: string,
    newContent: string,
    changeLog?: string
  ): Promise<ContentVersion> {
    // Get current chapter
    const chapter = await prisma.chapter.findUnique({
      where: { id: chapterId },
    });

    if (!chapter) {
      throw new Error(`Chapter ${chapterId} not found`);
    }

    // Calculate content hash
    const contentHash = this.calculateHash(newContent);

    // Check if content actually changed
    if (chapter.contentHash === contentHash) {
      throw new Error('Content has not changed');
    }

    // Create new version
    const newVersion = await prisma.chapter.create({
      data: {
        title: chapter.title,
        content: newContent,
        order: chapter.order,
        moduleId: chapter.moduleId,
        isProject: chapter.isProject,
        projectType: chapter.projectType,
        version: chapter.version + 1,
        previousVersionId: chapter.id,
        contentHash,
      },
    });

    return {
      id: newVersion.id,
      chapterId: newVersion.id,
      version: newVersion.version,
      content: newVersion.content || '',
      contentHash: newVersion.contentHash || '',
      createdAt: newVersion.createdAt,
      changeLog,
    };
  }

  /**
   * Get all versions of a chapter
   */
  async getVersions(chapterId: string): Promise<ContentVersion[]> {
    const chapter = await prisma.chapter.findUnique({
      where: { id: chapterId },
    });

    if (!chapter) {
      throw new Error(`Chapter ${chapterId} not found`);
    }

    // Get version history by following previousVersionId chain
    const versions: ContentVersion[] = [];
    let current: any = chapter;

    while (current) {
      versions.push({
        id: current.id,
        chapterId: current.id,
        version: current.version,
        content: current.content || '',
        contentHash: current.contentHash || '',
        createdAt: current.createdAt,
      });

      if (current.previousVersionId) {
        current = await prisma.chapter.findUnique({
          where: { id: current.previousVersionId },
        });
      } else {
        break;
      }
    }

    return versions.reverse(); // Return oldest first
  }

  /**
   * Get specific version of a chapter
   */
  async getVersion(chapterId: string, targetVersion: number): Promise<ContentVersion | null> {
    const versions = await this.getVersions(chapterId);
    return versions.find(v => v.version === targetVersion) || null;
  }

  /**
   * Generate diff between two versions
   */
  async generateDiff(
    oldContent: string,
    newContent: string
  ): Promise<VersionDiff> {
    const oldLines = oldContent.split('\n');
    const newLines = newContent.split('\n');

    const changes: VersionDiff['changes'] = [];
    let additions = 0;
    let deletions = 0;

    // Simple line-by-line diff
    const maxLines = Math.max(oldLines.length, newLines.length);
    
    for (let i = 0; i < maxLines; i++) {
      const oldLine = oldLines[i];
      const newLine = newLines[i];

      if (oldLine === undefined && newLine !== undefined) {
        // Added
        additions++;
        changes.push({ type: 'added', line: i + 1, content: newLine });
      } else if (newLine === undefined && oldLine !== undefined) {
        // Removed
        deletions++;
        changes.push({ type: 'removed', line: i + 1, content: oldLine });
      } else if (oldLine !== newLine) {
        // Modified
        deletions++;
        additions++;
        changes.push({ type: 'removed', line: i + 1, content: oldLine });
        changes.push({ type: 'added', line: i + 1, content: newLine });
      }
    }

    return { additions, deletions, changes };
  }

  /**
   * Migrate user progress to a new version
   */
  async migrateProgress(
    oldChapterId: string,
    newChapterId: string
  ): Promise<{ migrated: number; failed: number }> {
    // Get all progress records for old chapter
    const progressRecords = await prisma.progress.findMany({
      where: { chapterId: oldChapterId },
    });

    let migrated = 0;
    let failed = 0;

    for (const record of progressRecords) {
      try {
        // Check if progress already exists for new chapter
        const existing = await prisma.progress.findFirst({
          where: {
            userId: record.userId,
            chapterId: newChapterId,
          },
        });

        if (!existing) {
          // Create new progress record
          await prisma.progress.create({
            data: {
              userId: record.userId,
              chapterId: newChapterId,
              completed: record.completed,
              completedAt: record.completedAt,
            },
          });
        } else {
          // Update existing if old was completed
          if (record.completed && !existing.completed) {
            await prisma.progress.update({
              where: { id: existing.id },
              data: {
                completed: true,
                completedAt: record.completedAt,
              },
            });
          }
        }

        migrated++;
      } catch (error) {
        console.error(`Failed to migrate progress for user ${record.userId}:`, error);
        failed++;
      }
    }

    return { migrated, failed };
  }

  /**
   * Calculate content hash using SHA-256
   */
  private calculateHash(content: string): string {
    return createHash('sha256').update(content).digest('hex');
  }

  /**
   * Revert to a previous version
   */
  async revertToVersion(
    chapterId: string,
    targetVersion: number
  ): Promise<ContentVersion> {
    const targetVersionData = await this.getVersion(chapterId, targetVersion);
    
    if (!targetVersionData) {
      throw new Error(`Version ${targetVersion} not found`);
    }

    // Create new version with reverted content
    return this.createVersion(chapterId, targetVersionData.content, `Reverted to version ${targetVersion}`);
  }
}

export default new ContentVersioningService();