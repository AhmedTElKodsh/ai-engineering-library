import { PrismaClient } from '@prisma/client';
import { getCache, setCache, invalidateCache } from './redis-service';

const prisma = new PrismaClient();

// Milestone Service - Task 4.2
export async function checkAndUnlockMilestones(userId: string, moduleId?: string): Promise<any[]> {
  const newAchievements: any[] = [];

  const where: any = {};
  if (moduleId) where.moduleId = moduleId;

  const milestones = await prisma.milestone.findMany({ where });

  const progress = await prisma.progress.findMany({
    where: { userId, completed: true },
    include: { chapter: true },
  });

  const completedChapterIds = new Set<string>();
  for (const p of progress) {
    completedChapterIds.add(p.chapterId);
  }

  const existingAchievements = await prisma.milestoneAchievement.findMany({
    where: { userId },
  });
  const achievedMilestoneIds = new Set<string>();
  for (const a of existingAchievements) {
    achievedMilestoneIds.add(a.milestoneId);
  }

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
        let allCompleted = true;
        for (const c of module.chapters) {
          if (!completedChapterIds.has(c.id)) {
            allCompleted = false;
            break;
          }
        }
        unlocked = allCompleted;
      }
    } else if (criteria.type === 'checkpoint-pass') {
      unlocked = true; // Placeholder - check assessment results
    } else if (criteria.type === 'custom') {
      unlocked = true; // Placeholder - custom logic
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

// Share milestone on social media
export async function shareMilestone(userId: string, milestoneId: string, platform: 'linkedin' | 'twitter' | 'facebook'): Promise<{ shareUrl: string }> {
  const achievement = await prisma.milestoneAchievement.findFirst({
    where: { userId, milestoneId },
    include: { milestone: { include: { module: true } },
  });

  if (!achievement) {
    throw new Error('Milestone achievement not found');
  }

  const milestone = achievement.milestone;
  const baseUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
  
  let shareUrl = '';
  const text = encodeURIComponent(`I just unlocked the "${milestone.title}" milestone in the AI Engineering Curriculum! ${milestone.description}`);
  const url = encodeURIComponent(`${baseUrl}/milestones/${milestone.id}`);

  switch (platform) {
    case 'linkedin':
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
      break;
    case 'twitter':
      shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
      break;
    case 'facebook':
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
      break;
  }

  // Update achievement with share info
  await prisma.milestoneAchievement.update({
    where: { id: achievement.id },
    data: {
      sharedAt: new Date(),
      sharePlatform: platform,
    },
  });

  return { shareUrl };
}

export async function getMilestoneAchievements(userId: string): Promise<any[]> {
  const cacheKey = `milestones:user:${userId}`;
  const cached = await getCache<any[]>(cacheKey);
  if (cached) return cached;

  const achievements = await prisma.milestoneAchievement.findMany({
    where: { userId },
    include: { milestone: { include: { module: true } },
    orderBy: { achievedAt: 'desc' },
  });

  await setCache(cacheKey, achievements, 1800);
  return achievements;
}

export async function getModuleMilestones(moduleId: string): Promise<any[]> {
  return await prisma.milestone.findMany({
    where: { moduleId },
  });
}