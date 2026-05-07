import { PrismaClient } from '@prisma/client';
import { getCache, setCache, invalidateCache } from './redis-service';

const prisma = new PrismaClient();

// Mapping entry points to total weeks (Requirement 36)
const ENTRY_POINT_WEEKS: { [key: number]: number } = {
  0: 30, // Module 0 entry
  1: 29, // Module 1 entry
  2: 28, // Module 2 entry
  3: 25, // Module 3 entry
  4: 19, // Module 4 entry (or Module 4+? Actually spec says 5 learning paths: 30,29,28,25,19 weeks)
};

export async function calculateTotalWeeks(entryPointModuleOrder: number): Promise<number> {
  return ENTRY_POINT_WEEKS[entryPointModuleOrder] || 30;
}

export async function calculateCompletionDate(userId: string): Promise<any> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { entryPoint: true, preferences: true },
  });

  if (!user) throw new Error('User not found');

  const entryPoint = user.entryPoint || 0;
  const totalWeeks = await calculateTotalWeeks(entryPoint);

  const preferences = user.preferences ? JSON.parse(user.preferences as string) : null;
  const weeklyHours = preferences?.weeklyHours || 10;

  // Calculate completed weeks based on progress
  const progress = await prisma.progress.findMany({
    where: { userId, completed: true },
    include: { chapter: { include: { module: true } },
  });

  // Simplified: assume each completed chapter represents about 0.5 weeks (since each week has multiple chapters)
  const completedWeeks = Math.floor(progress.length * 0.5);

  const remainingWeeks = Math.max(0, totalWeeks - completedWeeks);
  const estimatedDate = new Date();
  estimatedDate.setDate(estimatedDate.getDate() + (remainingWeeks * 7));

  return {
    totalWeeks,
    completedWeeks,
    remainingWeeks,
    weeklyHours,
    estimatedCompletionDate: estimatedDate.toISOString(),
  };
}

export async function updateWeeklyHours(userId: string, weeklyHours: number): Promise<void> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error('User not found');

  const preferences = user.preferences ? JSON.parse(user.preferences as string) : {};
  preferences.weeklyHours = weeklyHours;

  await prisma.user.update({
    where: { id: userId },
    data: { preferences: JSON.stringify(preferences) },
  });

  // Invalidate cache
  await invalidateCache(`duration:${userId}`);
}

export async function getCurrentPace(userId: string): Promise<any> {
  // Get progress entries in the last 7 days
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const recentProgress = await prisma.progress.findMany({
    where: {
      userId,
      completed: true,
      completedAt: { gte: oneWeekAgo },
    },
  });

  // Estimate hours spent this week (simplified: each chapter ~2.5 hours)
  const hoursThisWeek = recentProgress.length * 2.5;

  // Get user's target weekly hours
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { preferences: true },
  });
  const preferences = user?.preferences ? JSON.parse(user.preferences as string) : null;
  const targetWeeklyHours = preferences?.weeklyHours || 10;

  const onTrack = hoursThisWeek >= targetWeeklyHours * 0.8; // 80% of target

  return {
    hoursThisWeek,
    targetWeeklyHours,
    onTrack,
    recommendation: onTrack ? 'Keep going!' : 'Consider increasing your weekly study hours.',
  };
}

export async function getTimelineData(userId: string): Promise<any> {
  const cacheKey = `timeline:${userId}`;
  const cached = await getCache<any>(cacheKey);
  if (cached) return cached;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { entryPoint: true },
  });
  const entryPoint = user?.entryPoint || 0;
  const totalWeeks = await calculateTotalWeeks(entryPoint);

  // Get modules based on entry point
  const modules = await prisma.module.findMany({
    where: { order: { gte: entryPoint } },
    orderBy: { order: 'asc' },
    include: { weeks: { orderBy: { weekNumber: 'asc' } },
  });

  const timeline = [];
  let weekCounter = 0;
  for (const mod of modules) {
    for (const week of mod.weeks) {
      weekCounter++;
      if (weekCounter > totalWeeks) break;
      timeline.push({
        weekNumber: weekCounter,
        moduleTitle: mod.title,
        weekTitle: week.title,
        status: 'upcoming', // Simplified: would need progress to determine completed/current
      });
    }
    if (weekCounter >= totalWeeks) break;
  }

  const result = {
    totalWeeks,
    timeline,
    startDate: new Date().toISOString(), // Simplified
  };

  await setCache(cacheKey, result, 3600);
  return result;
}