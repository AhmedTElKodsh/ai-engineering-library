import { PrismaClient } from '@prisma/client';
import { getCache, setCache, invalidateCache } from './redis-service';

const prisma = new PrismaClient();

export interface DayInfo {
  dayNumber: number;
  topic: string;
  hours: number;
  type: string;
  completed?: boolean;
}

// Get week days with completion status
export async function getWeekDays(userId: string, weekId: string): Promise<DayInfo[]> {
  const days = await prisma.dailyContent.findMany({
    where: { weekId },
    orderBy: { dayNumber: 'asc' },
    include: { chapters: true },
  });

  // Get user progress to determine completion
  const progress = await prisma.progress.findMany({
    where: { userId, completed: true },
    select: { chapterId: true },
  });
  
  const completedChapterIds = new Set<string>();
  for (const p of progress) {
    completedChapterIds.add(p.chapterId);
  }

  const result: DayInfo[] = [];
  for (const day of days) {
    let dayCompleted = false;
    if (day.chapters) {
      for (const c of day.chapters) {
        if (completedChapterIds.has(c.id)) {
          dayCompleted = true;
          break;
        }
      }
    }
    result.push({
      dayNumber: day.dayNumber,
      topic: day.topic,
      hours: day.hours,
      type: day.type,
      completed: dayCompleted,
    });
  }
  return result;
}

// Calculate current day based on user progress
export async function getCurrentDay(userId: string, moduleId: string): Promise<{ weekNumber: number; dayNumber: number }> {
  const weeks = await prisma.week.findMany({
    where: { moduleId },
    orderBy: { weekNumber: 'asc' },
    include: { days: { orderBy: { dayNumber: 'asc' }, include: { chapters: true } },
  });

  const progress = await prisma.progress.findMany({
    where: { userId, completed: true },
    include: { chapter: true },
  });
  
  const completedChapterIds = new Set<string>();
  for (const p of progress) {
    completedChapterIds.add(p.chapterId);
  }

  for (const week of weeks) {
    for (const day of week.days) {
      let dayCompleted = false;
      if (day.chapters) {
        for (const c of day.chapters) {
          if (completedChapterIds.has(c.id)) {
            dayCompleted = true;
            break;
          }
        }
      }
      if (!dayCompleted) {
        return { weekNumber: week.weekNumber, dayNumber: day.dayNumber };
      }
    }
  }

  // If all days completed, return last day
  const lastWeek = weeks[weeks.length - 1];
  const lastDay = lastWeek.days[lastWeek.days.length - 1];
  return { weekNumber: lastWeek.weekNumber, dayNumber: lastDay.dayNumber };
}

// Mark Day 5 as mini-project and final week as flagship project
export function getDayType(weekNumber: number, dayNumber: number, totalWeeks: number): string {
  if (weekNumber === totalWeeks && dayNumber >= 5) {
    return 'flagship-project';
  }
  if (dayNumber === 5) {
    return 'mini-project';
  }
  if (dayNumber >= 6) {
    return 'catch-up';
  }
  return 'regular';
}

// Cache daily content queries
export async function getCachedWeekDays(userId: string, weekId: string): Promise<DayInfo[]> {
  const cacheKey = `weekdays:${weekId}:${userId}`;
  const cached = await getCache<DayInfo[]>(cacheKey);
  if (cached) return cached;

  const days = await getWeekDays(userId, weekId);
  await setCache(cacheKey, days, 3600);
  return days;
}