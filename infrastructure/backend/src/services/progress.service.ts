import { PrismaClient } from '@prisma/client';
import { getCache, setCache, invalidateCache } from './redis-service';

const prisma = new PrismaClient();

// Progress tracking
export async function completeChapter(userId: string, chapterId: string): Promise<any> {
  const progress = await prisma.progress.upsert({
    where: {
      userId_chapterId: { userId, chapterId },
    },
    update: {
      completed: true,
      completedAt: new Date(),
    },
    create: {
      userId,
      chapterId,
      completed: true,
      completedAt: new Date(),
    },
  });

  await invalidateCache(`progress:user:${userId}`);
  await onChapterComplete(userId, chapterId);
  return progress;
}

export async function getUserProgress(userId: string): Promise<any[]> {
  const cacheKey = `progress:user:${userId}`;
  const cached = await getCache<any[]>(cacheKey);
  if (cached) return cached;

  const progress = await prisma.progress.findMany({
    where: { userId },
    include: { chapter: { include: { module: true } } },
    orderBy: { chapter: { order: 'asc' } },
  });

  await setCache(cacheKey, progress, 1800);
  return progress;
}

export async function getChapterProgress(userId: string, chapterId: string): Promise<any | null> {
  return await prisma.progress.findUnique({
    where: {
      userId_chapterId: { userId, chapterId },
    },
  });
}

// Checkpoint gating logic
export async function checkCheckpointGate(userId: string, checkpointChapterId: string): Promise<{ allowed: boolean; message: string }> {
  const chapter = await prisma.chapter.findUnique({
    where: { id: checkpointChapterId },
    include: { module: { include: { chapters: { orderBy: { order: 'asc' } } } },
  });

  if (!chapter) {
    return { allowed: false, message: 'Chapter not found' };
  }

  const completed = await prisma.progress.findMany({
    where: { userId, completed: true },
    select: { chapterId: true },
  });
  const completedIds = new Set(completed.map((c: any) => c.chapterId));

  const moduleChapters = chapter.module.chapters;
  const currentChapterIndex = moduleChapters.findIndex((c: any) => c.id === checkpointChapterId);

  for (let i = 0; i < currentChapterIndex; i++) {
    if (!completedIds.has(moduleChapters[i].id)) {
      return {
        allowed: false,
        message: `Complete "${moduleChapters[i].title}" before proceeding to checkpoint.`,
      };
    }
  }

  return { allowed: true, message: 'Checkpoint gate passed' };
}

// Milestone achievement tracking
export async function checkAndUnlockMilestones(userId: string, moduleId?: string): Promise<any[]> {
  const newAchievements: any[] = [];

  const where: any = {};
  if (moduleId) where.moduleId = moduleId;

  const milestones = await prisma.milestone.findMany({ where });

  const progress = await prisma.progress.findMany({
    where: { userId, completed: true },
    include: { chapter: true },
  });

  const completedChapterIds = new Set(progress.map((p: any) => p.chapterId));

  const existingAchievements = await prisma.milestoneAchievement.findMany({
    where: { userId },
  });
  const achievedMilestoneIds = new Set(existingAchievements.map((a: any) => a.milestoneId));

  for (const milestone of milestones) {
    if (achievedMilestoneIds.has(milestone.id)) continue;

    const criteria = milestone.criteria as any;
    let unlocked = false;

    if (criteria.type === 'module-completion') {
      const module = await prisma.module.findUnique({
        where: { id: milestone.moduleId },
        include: { chapters: true },
      });
      if (module) {
        unlocked = module.chapters.every((c: any) => completedChapterIds.has(c.id));
      }
    } else if (criteria.type === 'checkpoint-pass') {
      unlocked = true; // Placeholder
    } else if (criteria.type === 'custom') {
      unlocked = true; // Placeholder
    }

    if (unlocked) {
      const achievement = await prisma.milestoneAchievement.create({
        data: {
          userId,
          milestoneId: milestone.id,
        },
      });
      newAchievements.push(achievement);
    }
  }

  return newAchievements;
}

export async function getUserMilestones(userId: string): Promise<any[]> {
  return await prisma.milestoneAchievement.findMany({
    where: { userId },
    include: { milestone: { include: { module: true } } },
    orderBy: { achievedAt: 'desc' },
  });
}

// Duration calculation
export async function calculateDuration(userId: string): Promise<any> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { preferences: true },
  });

  const preferences = user?.preferences ? JSON.parse(user.preferences as string) : null;
  const weeklyHours = (preferences as any)?.weeklyHours || 10;

  const modules = await prisma.module.findMany({
    orderBy: { order: 'asc' },
    include: { chapters: true, weeks: { include: { days: true } } },
  });

  let totalHours = 0;
  for (const mod of modules) {
    for (const week of mod.weeks) {
      for (const day of week.days) {
        totalHours += day.hours || 0;
      }
    }
  }

  const totalWeeks = Math.ceil(totalHours / weeklyHours);

  const progress = await getUserProgress(userId);
  let completedHours = 0;
  for (const p of progress) {
    if (p.completed && p.chapter) {
      completedHours += 2.5;
    }
  }

  const remainingHours = Math.max(0, totalHours - completedHours);
  const remainingWeeks = Math.ceil(remainingHours / weeklyHours);

  const completionDate = new Date();
  completionDate.setDate(completionDate.getDate() + (remainingWeeks * 7));

  return {
    totalWeeks,
    completedWeeks: totalWeeks - remainingWeeks,
    remainingWeeks,
    totalHours,
    completedHours,
    remainingHours,
    weeklyHours,
    estimatedCompletionDate: completionDate.toISOString(),
  };
}

export async function updateWeeklyHours(userId: string, weeklyHours: number): Promise<void> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error('User not found');

  const preferences = user.preferences ? JSON.parse(user.preferences as string) : {};
  (preferences as any).weeklyHours = weeklyHours;

  await prisma.user.update({
    where: { id: userId },
    data: { preferences: JSON.stringify(preferences) },
  });
}

// Trigger portfolio entry creation when project chapter is completed
export async function onChapterComplete(userId: string, chapterId: string): Promise<void> {
  const chapter = await prisma.chapter.findUnique({
    where: { id: chapterId },
  });

  if (chapter?.isProject) {
    const existing = await prisma.projectSubmission.findFirst({
      where: { userId, chapterId },
    });

    if (!existing) {
      await prisma.projectSubmission.create({
        data: {
          userId,
          chapterId,
          status: 'not-submitted',
        },
      });
    }
  }

  await checkAndUnlockMilestones(userId, chapter?.moduleId);
}