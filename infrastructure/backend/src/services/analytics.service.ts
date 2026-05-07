import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Analytics Service - Task 7
export interface EventData {
  userId: string;
  eventType: string;
  eventData?: any;
  moduleId?: string;
  chapterId?: string;
}

export async function trackEvent(data: EventData): Promise<void> {
  await prisma.analyticsEvent.create({
    data: {
      userId: data.userId,
      eventType: data.eventType,
      eventData: data.eventData ? JSON.stringify(data.eventData) : null,
      moduleId: data.moduleId,
      chapterId: data.chapterId,
    },
  });
}

export async function getChapterMetrics(chapterId: string): Promise<any> {
  const events = await prisma.analyticsEvent.findMany({
    where: { chapterId },
    orderBy: { createdAt: 'desc' },
  });

  const totalViews = events.filter((e) => e.eventType === 'chapter_view').length;
  const totalCompletions = events.filter((e) => e.eventType === 'chapter_complete').length;
  const avgTimeSpent = 0; // Simplified - would calculate from events

  return {
    chapterId,
    totalViews,
    totalCompletions,
    completionRate: totalViews > 0 ? (totalCompletions / totalViews) * 100 : 0,
    avgTimeSpent,
  };
}

export async function getDashboardMetrics(): Promise<any> {
  const totalUsers = await prisma.user.count();
  const totalModules = await prisma.module.count();
  const totalChapters = await prisma.chapter.count();
  
  // Get completion rate
  const totalProgress = await prisma.progress.count({ where: { completed: true } });
  const totalChaptersAll = await prisma.chapter.count();
  const overallCompletionRate = totalChaptersAll > 0 ? (totalProgress / totalChaptersAll) * 100 : 0;

  // Recent activity (last 7 days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
  const recentCompletions = await prisma.progress.count({
    where: {
      completed: true,
      completedAt: { gte: sevenDaysAgo },
    },
  });

  return {
    totalUsers,
    totalModules,
    totalChapters,
    overallCompletionRate,
    recentCompletions,
  };
}

// Data anonymization for GDPR
export function anonymizeData(data: any): any {
  const anonymized = { ...data };
  // Remove or hash PII
  if (anonymized.email) {
    anonymized.email = 'anonymized@' + Buffer.from(anonymized.email).toString('base64');
  }
  if (anonymized.name) {
    anonymized.name = 'Anonymized User';
  }
  return anonymized;
}