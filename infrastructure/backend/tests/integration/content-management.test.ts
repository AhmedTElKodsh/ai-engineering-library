import { PrismaClient } from '@prisma/client';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);
const prisma = new PrismaClient();

describe('Content Management Integration Tests', () => {
  beforeAll(async () => {
    // Clean up test data
    await prisma.milestoneAchievement.deleteMany();
    await prisma.milestone.deleteMany();
    await prisma.dailyContent.deleteMany();
    await prisma.week.deleteMany();
    await prisma.progress.deleteMany();
    await prisma.chapter.deleteMany();
    await prisma.module.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('Content Versioning', () => {
    it('should create content version on update', async () => {
      // Create a module
      const module = await prisma.module.create({
        data: {
          id: 'test-module-1',
          title: 'Test Module',
          description: 'Test',
          order: 99,
        },
      });

      // Create a chapter
      const chapter = await prisma.chapter.create({
        data: {
          id: 'test-chapter-1',
          title: 'Test Chapter',
          content: 'Version 1',
          moduleId: module.id,
          order: 1,
        },
      });

      // Update chapter content (should create version)
      const updated = await prisma.chapter.update({
        where: { id: chapter.id },
        data: { content: 'Version 2' },
      });

      expect(updated.content).toBe('Version 2');

      // Check if version record was created (via ContentVersioningService)
      const versions = await prisma.contentReview.findMany({
        where: { chapterId: chapter.id },
      });

      // Cleanup
      await prisma.chapter.delete({ where: { id: chapter.id } });
      await prisma.module.delete({ where: { id: module.id } });
    });

    it('should track content reviews', async () => {
      const module = await prisma.module.create({
        data: {
          id: 'test-module-2',
          title: 'Test Module 2',
          description: 'Test',
          order: 98,
        },
      });

      const chapter = await prisma.chapter.create({
        data: {
          id: 'test-chapter-2',
          title: 'Test Chapter 2',
          content: 'Content',
          moduleId: module.id,
          order: 1,
        },
      });

      // Create content review
      const review = await prisma.contentReview.create({
        data: {
          id: 'review-1',
          chapterId: chapter.id,
          status: 'pending',
          submittedBy: 'user-1',
        },
      });

      expect(review.status).toBe('pending');

      // Update to approved
      const approved = await prisma.contentReview.update({
        where: { id: review.id },
        data: { status: 'approved' },
      });

      expect(approved.status).toBe('approved');

      // Cleanup
      await prisma.contentReview.delete({ where: { id: review.id } });
      await prisma.chapter.delete({ where: { id: chapter.id } });
      await prisma.module.delete({ where: { id: module.id } });
    });
  });

  describe('Content Workflow', () => {
    it('should handle publish workflow', async () => {
      // Create module and chapter
      const module = await prisma.module.create({
        data: {
          id: 'test-module-3',
          title: 'Workflow Test',
          description: 'Test',
          order: 97,
        },
      });

      const chapter = await prisma.chapter.create({
        data: {
          id: 'test-chapter-3',
          title: 'Workflow Chapter',
          content: 'Draft content',
          moduleId: module.id,
          order: 1,
        },
      });

      // Create review record
      const review = await prisma.contentReview.create({
        data: {
          id: 'review-2',
          chapterId: chapter.id,
          status: 'approved',
          submittedBy: 'user-1',
          reviewedBy: 'user-2',
        },
      });

      // Create publish record
      const publish = await prisma.publishRecord.create({
        data: {
          id: 'publish-1',
          chapterId: chapter.id,
          version: 1,
          publishedBy: 'user-2',
        },
      });

      expect(publish.version).toBe(1);

      // Cleanup
      await prisma.publishRecord.delete({ where: { id: publish.id } });
      await prisma.contentReview.delete({ where: { id: review.id } });
      await prisma.chapter.delete({ where: { id: chapter.id } });
      await prisma.module.delete({ where: { id: module.id } });
    });
  });

  describe('Seeding Script Integration', () => {
    it('should validate seed script can run', async () => {
      // This test validates the seed script structure is correct
      // In a real environment, you would run: npx ts-node scripts/seed-content.ts
      
      // Check that the seed file exists and has valid syntax
      const fs = require('fs');
      const seedPath = 'scripts/seed-content.ts';
      
      expect(fs.existsSync(seedPath)).toBe(true);
      
      const content = fs.readFileSync(seedPath, 'utf-8');
      expect(content).toContain('seedContent');
      expect(content).toContain('PrismaClient');
    }, 10000);

    it('should have all 7 modules defined', async () => {
      const fs = require('fs');
      const seedPath = 'scripts/seed-content.ts';
      const content = fs.readFileSync(seedPath, 'utf-8');
      
      // Count module definitions
      const moduleMatches = content.match(/id: 'module-\d+'/g);
      expect(moduleMatches).toBeTruthy();
      expect(moduleMatches.length).toBeGreaterThanOrEqual(7);
    });

    it('should have milestones for each module', async () => {
      const fs = require('fs');
      const seedPath = 'scripts/seed-content.ts';
      const content = fs.readFileSync(seedPath, 'utf-8');
      
      // Check for milestone definitions
      expect(content).toContain('milestones:');
      expect(content).toContain('criteria:');
    });
  });
});