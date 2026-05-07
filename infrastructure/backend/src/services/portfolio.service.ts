import { PrismaClient } from '@prisma/client';
import { uploadExport, getSignedDownloadUrl } from './s3-service';

const prisma = new PrismaClient();

// Portfolio Service - Task 9.1
export async function getPortfolio(userId: string): Promise<any> {
  const submissions = await prisma.projectSubmission.findMany({
    where: { userId },
    include: {
      chapter: { include: { module: true } },
      reviews: {
        include: { review: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  const portfolioItems = [];
  for (const sub of submissions) {
    const reviews = sub.reviews || [];
    const latestReview = reviews.length > 0 ? reviews[reviews.length - 1].review : null;
    const score = latestReview ? latestReview.overallScore : null;
    
    portfolioItems.push({
      submissionId: sub.id,
      projectTitle: sub.chapter?.title || 'Untitled Project',
      projectType: sub.chapter?.projectType || 'custom',
      status: sub.status,
      score,
      isPortfolioReady: sub.isPortfolioReady,
      screenshots: sub.screenshots ? JSON.parse(sub.screenshots) : [],
      createdAt: sub.createdAt,
      moduleTitle: sub.chapter?.module?.title,
    });
  }

  const readyCount = portfolioItems.filter((i) => i.isPortfolioReady).length;
  
  return {
    items: portfolioItems,
    totalProjects: portfolioItems.length,
    portfolioReadyCount: readyCount,
    completenessPercentage: portfolioItems.length > 0 ? (readyCount / portfolioItems.length) * 100 : 0,
  };
}

export async function submitProject(userId: string, chapterId: string, data: {
  githubUrl?: string;
  demoUrl?: string;
  screenshots?: string[];
  description?: string;
}): Promise<any> {
  let submission = await prisma.projectSubmission.findFirst({
    where: { userId, chapterId },
  });

  if (submission) {
    submission = await prisma.projectSubmission.update({
      where: { id: submission.id },
      data: {
        githubUrl: data.githubUrl,
        demoUrl: data.demoUrl,
        screenshots: data.screenshots ? JSON.stringify(data.screenshots) : undefined,
        description: data.description,
        status: 'pending-review',
        submittedAt: new Date(),
      },
    });
  } else {
    submission = await prisma.projectSubmission.create({
      data: {
        userId,
        chapterId,
        githubUrl: data.githubUrl,
        demoUrl: data.demoUrl,
        screenshots: data.screenshots ? JSON.stringify(data.screenshots) : undefined,
        description: data.description,
        status: 'pending-review',
        submittedAt: new Date(),
      },
    });
  }

  return submission;
}

export async function markPortfolioReady(userId: string, submissionId: string, isReady: boolean): Promise<any> {
  const submission = await prisma.projectSubmission.findFirst({
    where: { id: submissionId, userId },
  });

  if (!submission) throw new Error('Submission not found');
  if (submission.status !== 'approved') {
    throw new Error('Only approved projects can be marked as portfolio-ready');
  }

  return await prisma.projectSubmission.update({
    where: { id: submissionId },
    data: { isPortfolioReady: isReady },
  });
}

export async function generatePublicPortfolio(userId: string): Promise<{ slug: string; url: string }> {
  const slug = `portfolio-${userId}-${Date.now()}`;
  
  await prisma.user.update({
    where: { id: userId },
    data: { portfolioSlug: slug },
  });

  const baseUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
  const url = `${baseUrl}/portfolio/${slug}`;

  return { slug, url };
}

export async function getPublicPortfolio(slug: string): Promise<any> {
  const user = await prisma.user.findFirst({
    where: { portfolioSlug: slug },
  });

  if (!user) throw new Error('Portfolio not found');

  const submissions = await prisma.projectSubmission.findMany({
    where: { userId: user.id, isPortfolioReady: true, status: 'approved' },
    include: {
      chapter: { include: { module: true } },
      reviews: { include: { review: true } },
    },
  });

  return {
    userName: user.name,
    userBio: user.bio,
    userAvatar: user.avatarUrl,
    projects: submissions.map((s) => ({
      title: s.chapter?.title,
      description: s.description,
      githubUrl: s.githubUrl,
      demoUrl: s.demoUrl,
      screenshots: s.screenshots ? JSON.parse(s.screenshots) : [],
      technologies: s.technologies ? JSON.parse(s.technologies) : [],
    })),
  };
}

export async function exportPortfolio(userId: string, format: 'pdf' | 'html' | 'json'): Promise<{ exportUrl: string }> {
  const portfolio = await getPortfolio(userId);
  
  // In real implementation, generate actual PDF/HTML
  const content = format === 'json' ? JSON.stringify(portfolio) : 'Exported content';
  const buffer = Buffer.from(content);
  
  const fileName = `portfolio-${userId}-${Date.now()}.${format}`;
  const url = await uploadExport(userId, fileName, buffer, format);

  return { exportUrl: url };
}