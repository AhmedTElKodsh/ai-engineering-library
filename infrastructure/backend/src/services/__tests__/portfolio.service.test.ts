import { PrismaClient } from '@prisma/client';
import {
  getPortfolio,
  submitProject,
  markPortfolioReady,
  generatePublicPortfolio,
  getPublicPortfolio,
  exportPortfolio,
} from '../portfolio.service';
import * as s3Service from '../s3-service';

// Mock Prisma Client
jest.mock('@prisma/client', () => {
  const mockPrismaClient = {
    projectSubmission: {
      findMany: jest.fn(),
      findFirst: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    user: {
      findFirst: jest.fn(),
      update: jest.fn(),
    },
  };
  return {
    PrismaClient: jest.fn(() => mockPrismaClient),
  };
});

// Mock S3 Service
jest.mock('../s3-service', () => ({
  uploadExport: jest.fn(),
  getSignedDownloadUrl: jest.fn(),
}));

describe('ProjectPortfolioService', () => {
  let prisma: any;

  beforeEach(() => {
    prisma = new PrismaClient();
    jest.clearAllMocks();
  });

  describe('getPortfolio', () => {
    it('should retrieve portfolio with various project types', async () => {
      const mockSubmissions = [
        {
          id: 'sub-1',
          userId: 'user-1',
          chapterId: 'ch-1',
          status: 'approved',
          isPortfolioReady: true,
          screenshots: JSON.stringify(['screenshot1.png']),
          createdAt: new Date('2024-01-01'),
          chapter: {
            title: 'Mini Project 1',
            projectType: 'mini-project',
            module: { title: 'Module 1' },
          },
          reviews: [
            {
              review: {
                overallScore: 85,
              },
            },
          ],
        },
        {
          id: 'sub-2',
          userId: 'user-1',
          chapterId: 'ch-2',
          status: 'pending-review',
          isPortfolioReady: false,
          screenshots: JSON.stringify([]),
          createdAt: new Date('2024-01-02'),
          chapter: {
            title: 'Flagship Project',
            projectType: 'flagship-project',
            module: { title: 'Module 2' },
          },
          reviews: [],
        },
        {
          id: 'sub-3',
          userId: 'user-1',
          chapterId: 'ch-3',
          status: 'approved',
          isPortfolioReady: true,
          screenshots: null,
          createdAt: new Date('2024-01-03'),
          chapter: {
            title: 'Capstone Project',
            projectType: 'capstone',
            module: { title: 'Module 6' },
          },
          reviews: [
            {
              review: {
                overallScore: 92,
              },
            },
          ],
        },
      ];

      prisma.projectSubmission.findMany.mockResolvedValue(mockSubmissions);

      const result = await getPortfolio('user-1');

      expect(result.items).toHaveLength(3);
      expect(result.totalProjects).toBe(3);
      expect(result.portfolioReadyCount).toBe(2);
      expect(result.completenessPercentage).toBeCloseTo(66.67, 1);
      expect(result.items[0].projectType).toBe('mini-project');
      expect(result.items[1].projectType).toBe('flagship-project');
      expect(result.items[2].projectType).toBe('capstone');
      expect(result.items[0].score).toBe(85);
      expect(result.items[1].score).toBeNull();
    });

    it('should handle empty portfolio', async () => {
      prisma.projectSubmission.findMany.mockResolvedValue([]);

      const result = await getPortfolio('user-1');

      expect(result.items).toHaveLength(0);
      expect(result.totalProjects).toBe(0);
      expect(result.portfolioReadyCount).toBe(0);
      expect(result.completenessPercentage).toBe(0);
    });

    it('should parse screenshots correctly', async () => {
      const mockSubmissions = [
        {
          id: 'sub-1',
          userId: 'user-1',
          chapterId: 'ch-1',
          status: 'approved',
          isPortfolioReady: true,
          screenshots: JSON.stringify(['img1.png', 'img2.png', 'img3.png']),
          createdAt: new Date(),
          chapter: {
            title: 'Project',
            projectType: 'custom',
            module: { title: 'Module' },
          },
          reviews: [],
        },
      ];

      prisma.projectSubmission.findMany.mockResolvedValue(mockSubmissions);

      const result = await getPortfolio('user-1');

      expect(result.items[0].screenshots).toEqual(['img1.png', 'img2.png', 'img3.png']);
    });
  });

  describe('submitProject', () => {
    it('should create new project submission with validation', async () => {
      const projectData = {
        githubUrl: 'https://github.com/user/project',
        demoUrl: 'https://demo.example.com',
        screenshots: ['screenshot1.png', 'screenshot2.png'],
        description: 'My awesome project',
      };

      prisma.projectSubmission.findFirst.mockResolvedValue(null);
      prisma.projectSubmission.create.mockResolvedValue({
        id: 'sub-new',
        userId: 'user-1',
        chapterId: 'ch-1',
        ...projectData,
        screenshots: JSON.stringify(projectData.screenshots),
        status: 'pending-review',
        submittedAt: new Date(),
      });

      const result = await submitProject('user-1', 'ch-1', projectData);

      expect(prisma.projectSubmission.create).toHaveBeenCalledWith({
        data: {
          userId: 'user-1',
          chapterId: 'ch-1',
          githubUrl: projectData.githubUrl,
          demoUrl: projectData.demoUrl,
          screenshots: JSON.stringify(projectData.screenshots),
          description: projectData.description,
          status: 'pending-review',
          submittedAt: expect.any(Date),
        },
      });
      expect(result.status).toBe('pending-review');
    });

    it('should update existing submission (resubmission)', async () => {
      const existingSubmission = {
        id: 'sub-existing',
        userId: 'user-1',
        chapterId: 'ch-1',
        status: 'revision-requested',
      };

      const updatedData = {
        githubUrl: 'https://github.com/user/project-v2',
        demoUrl: 'https://demo-v2.example.com',
        screenshots: ['new-screenshot.png'],
        description: 'Updated project',
      };

      prisma.projectSubmission.findFirst.mockResolvedValue(existingSubmission);
      prisma.projectSubmission.update.mockResolvedValue({
        ...existingSubmission,
        ...updatedData,
        screenshots: JSON.stringify(updatedData.screenshots),
        status: 'pending-review',
        submittedAt: new Date(),
      });

      const result = await submitProject('user-1', 'ch-1', updatedData);

      expect(prisma.projectSubmission.update).toHaveBeenCalledWith({
        where: { id: 'sub-existing' },
        data: {
          githubUrl: updatedData.githubUrl,
          demoUrl: updatedData.demoUrl,
          screenshots: JSON.stringify(updatedData.screenshots),
          description: updatedData.description,
          status: 'pending-review',
          submittedAt: expect.any(Date),
        },
      });
      expect(result.status).toBe('pending-review');
    });

    it('should handle optional fields', async () => {
      const minimalData = {
        description: 'Minimal submission',
      };

      prisma.projectSubmission.findFirst.mockResolvedValue(null);
      prisma.projectSubmission.create.mockResolvedValue({
        id: 'sub-minimal',
        userId: 'user-1',
        chapterId: 'ch-1',
        ...minimalData,
        status: 'pending-review',
        submittedAt: new Date(),
      });

      const result = await submitProject('user-1', 'ch-1', minimalData);

      expect(result).toBeDefined();
      expect(result.description).toBe('Minimal submission');
    });
  });

  describe('markPortfolioReady', () => {
    it('should mark approved project as portfolio-ready', async () => {
      const submission = {
        id: 'sub-1',
        userId: 'user-1',
        status: 'approved',
        isPortfolioReady: false,
      };

      prisma.projectSubmission.findFirst.mockResolvedValue(submission);
      prisma.projectSubmission.update.mockResolvedValue({
        ...submission,
        isPortfolioReady: true,
      });

      const result = await markPortfolioReady('user-1', 'sub-1', true);

      expect(prisma.projectSubmission.update).toHaveBeenCalledWith({
        where: { id: 'sub-1' },
        data: { isPortfolioReady: true },
      });
      expect(result.isPortfolioReady).toBe(true);
    });

    it('should reject marking non-approved project as portfolio-ready (authorization)', async () => {
      const submission = {
        id: 'sub-1',
        userId: 'user-1',
        status: 'pending-review',
        isPortfolioReady: false,
      };

      prisma.projectSubmission.findFirst.mockResolvedValue(submission);

      await expect(markPortfolioReady('user-1', 'sub-1', true)).rejects.toThrow(
        'Only approved projects can be marked as portfolio-ready'
      );
    });

    it('should reject marking submission from different user (authorization)', async () => {
      prisma.projectSubmission.findFirst.mockResolvedValue(null);

      await expect(markPortfolioReady('user-1', 'sub-other', true)).rejects.toThrow(
        'Submission not found'
      );
    });

    it('should allow unmarking portfolio-ready', async () => {
      const submission = {
        id: 'sub-1',
        userId: 'user-1',
        status: 'approved',
        isPortfolioReady: true,
      };

      prisma.projectSubmission.findFirst.mockResolvedValue(submission);
      prisma.projectSubmission.update.mockResolvedValue({
        ...submission,
        isPortfolioReady: false,
      });

      const result = await markPortfolioReady('user-1', 'sub-1', false);

      expect(result.isPortfolioReady).toBe(false);
    });
  });

  describe('generatePublicPortfolio', () => {
    it('should generate unique slug for public portfolio', async () => {
      const mockDate = new Date('2024-01-15T10:30:00Z');
      jest.spyOn(Date, 'now').mockReturnValue(mockDate.getTime());

      prisma.user.update.mockResolvedValue({
        id: 'user-1',
        portfolioSlug: `portfolio-user-1-${mockDate.getTime()}`,
      });

      const result = await generatePublicPortfolio('user-1');

      expect(result.slug).toBe(`portfolio-user-1-${mockDate.getTime()}`);
      expect(result.url).toContain(result.slug);
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: 'user-1' },
        data: { portfolioSlug: result.slug },
      });
    });

    it('should generate different slugs for multiple calls (uniqueness)', async () => {
      const timestamps = [1000, 2000, 3000];
      let callCount = 0;

      jest.spyOn(Date, 'now').mockImplementation(() => timestamps[callCount++]);

      prisma.user.update.mockImplementation(({ data }: any) =>
        Promise.resolve({
          id: 'user-1',
          portfolioSlug: data.portfolioSlug,
        })
      );

      const result1 = await generatePublicPortfolio('user-1');
      const result2 = await generatePublicPortfolio('user-1');
      const result3 = await generatePublicPortfolio('user-1');

      expect(result1.slug).not.toBe(result2.slug);
      expect(result2.slug).not.toBe(result3.slug);
      expect(result1.slug).not.toBe(result3.slug);
    });

    it('should use environment URL if available', async () => {
      process.env.FRONTEND_URL = 'https://production.example.com';

      prisma.user.update.mockResolvedValue({
        id: 'user-1',
        portfolioSlug: 'portfolio-user-1-123',
      });

      const result = await generatePublicPortfolio('user-1');

      expect(result.url).toBe('https://production.example.com/portfolio/portfolio-user-1-123');

      delete process.env.FRONTEND_URL;
    });
  });

  describe('getPublicPortfolio', () => {
    it('should retrieve public portfolio by slug', async () => {
      const mockUser = {
        id: 'user-1',
        name: 'John Doe',
        bio: 'AI Engineer',
        avatarUrl: 'https://example.com/avatar.jpg',
        portfolioSlug: 'portfolio-user-1-123',
      };

      const mockSubmissions = [
        {
          id: 'sub-1',
          userId: 'user-1',
          isPortfolioReady: true,
          status: 'approved',
          description: 'Project 1 description',
          githubUrl: 'https://github.com/user/project1',
          demoUrl: 'https://demo1.example.com',
          screenshots: JSON.stringify(['img1.png']),
          technologies: JSON.stringify(['React', 'TypeScript']),
          chapter: {
            title: 'Project 1',
            module: { title: 'Module 1' },
          },
          reviews: [],
        },
      ];

      prisma.user.findFirst.mockResolvedValue(mockUser);
      prisma.projectSubmission.findMany.mockResolvedValue(mockSubmissions);

      const result = await getPublicPortfolio('portfolio-user-1-123');

      expect(result.userName).toBe('John Doe');
      expect(result.userBio).toBe('AI Engineer');
      expect(result.projects).toHaveLength(1);
      expect(result.projects[0].title).toBe('Project 1');
      expect(result.projects[0].technologies).toEqual(['React', 'TypeScript']);
    });

    it('should throw error for non-existent portfolio', async () => {
      prisma.user.findFirst.mockResolvedValue(null);

      await expect(getPublicPortfolio('invalid-slug')).rejects.toThrow('Portfolio not found');
    });

    it('should only show portfolio-ready and approved projects', async () => {
      const mockUser = {
        id: 'user-1',
        name: 'John Doe',
        portfolioSlug: 'portfolio-user-1-123',
      };

      prisma.user.findFirst.mockResolvedValue(mockUser);
      prisma.projectSubmission.findMany.mockResolvedValue([]);

      await getPublicPortfolio('portfolio-user-1-123');

      expect(prisma.projectSubmission.findMany).toHaveBeenCalledWith({
        where: {
          userId: 'user-1',
          isPortfolioReady: true,
          status: 'approved',
        },
        include: expect.any(Object),
      });
    });
  });

  describe('exportPortfolio', () => {
    it('should export portfolio in JSON format', async () => {
      const mockPortfolio = {
        items: [{ projectTitle: 'Project 1' }],
        totalProjects: 1,
        portfolioReadyCount: 1,
        completenessPercentage: 100,
      };

      prisma.projectSubmission.findMany.mockResolvedValue([
        {
          id: 'sub-1',
          userId: 'user-1',
          chapterId: 'ch-1',
          status: 'approved',
          isPortfolioReady: true,
          screenshots: null,
          createdAt: new Date(),
          chapter: {
            title: 'Project 1',
            projectType: 'custom',
            module: { title: 'Module' },
          },
          reviews: [],
        },
      ]);

      (s3Service.uploadExport as jest.Mock).mockResolvedValue(
        'https://s3.example.com/exports/portfolio-user-1-123.json'
      );

      const result = await exportPortfolio('user-1', 'json');

      expect(result.exportUrl).toContain('.json');
      expect(s3Service.uploadExport).toHaveBeenCalledWith(
        'user-1',
        expect.stringContaining('.json'),
        expect.any(Buffer),
        'json'
      );
    });

    it('should export portfolio in PDF format', async () => {
      prisma.projectSubmission.findMany.mockResolvedValue([]);

      (s3Service.uploadExport as jest.Mock).mockResolvedValue(
        'https://s3.example.com/exports/portfolio-user-1-123.pdf'
      );

      const result = await exportPortfolio('user-1', 'pdf');

      expect(result.exportUrl).toContain('.pdf');
      expect(s3Service.uploadExport).toHaveBeenCalledWith(
        'user-1',
        expect.stringContaining('.pdf'),
        expect.any(Buffer),
        'pdf'
      );
    });

    it('should export portfolio in HTML format', async () => {
      prisma.projectSubmission.findMany.mockResolvedValue([]);

      (s3Service.uploadExport as jest.Mock).mockResolvedValue(
        'https://s3.example.com/exports/portfolio-user-1-123.html'
      );

      const result = await exportPortfolio('user-1', 'html');

      expect(result.exportUrl).toContain('.html');
      expect(s3Service.uploadExport).toHaveBeenCalledWith(
        'user-1',
        expect.stringContaining('.html'),
        expect.any(Buffer),
        'html'
      );
    });

    it('should generate unique filenames for exports', async () => {
      prisma.projectSubmission.findMany.mockResolvedValue([]);
      (s3Service.uploadExport as jest.Mock).mockResolvedValue('https://s3.example.com/export.json');

      await exportPortfolio('user-1', 'json');
      await exportPortfolio('user-1', 'json');

      const calls = (s3Service.uploadExport as jest.Mock).mock.calls;
      expect(calls[0][1]).not.toBe(calls[1][1]); // Different filenames
    });
  });
});
