import { PrismaClient } from '@prisma/client';
import { getCache, setCache, invalidateCache } from './redis-service';

const prisma = new PrismaClient();

// Content Service - Module and Chapter CRUD
export async function getModules(): Promise<any[]> {
  const cacheKey = 'modules:all';
  const cached = await getCache<any[]>(cacheKey);
  if (cached) return cached;

  const modules = await prisma.module.findMany({
    orderBy: { order: 'asc' },
    include: { chapters: true, weeks: true, milestones: true },
  });
  await setCache(cacheKey, modules, 3600); // 1 hour TTL
  return modules;
}

export async function getModuleById(moduleId: string): Promise<any | null> {
  const cacheKey = `module:${moduleId}`;
  const cached = await getCache<any>(cacheKey);
  if (cached) return cached;

  const module = await prisma.module.findUnique({
    where: { id: moduleId },
    include: { chapters: { orderBy: { order: 'asc' } }, weeks: true, milestones: true },
  });
  if (module) await setCache(cacheKey, module, 3600);
  return module;
}

export async function getChapterById(chapterId: string): Promise<any | null> {
  const cacheKey = `chapter:${chapterId}`;
  const cached = await getCache<any>(cacheKey);
  if (cached) return cached;

  const chapter = await prisma.chapter.findUnique({
    where: { id: chapterId },
    include: { module: true },
  });
  if (chapter) await setCache(cacheKey, chapter, 3600);
  return chapter;
}

// MDX content parser (placeholder - will parse MDX to HTML/React)
export function parseMDX(content: string): string {
  // Basic MDX parsing - in reality, use a proper MDX parser
  return content; // placeholder
}

// Week and Daily Content endpoints
export async function getModuleWeeks(moduleId: string): Promise<any[]> {
  return await prisma.week.findMany({
    where: { moduleId },
    orderBy: { weekNumber: 'asc' },
    include: { days: { orderBy: { dayNumber: 'asc' } } },
  });
}

export async function getWeekDays(moduleId: string, weekId: string): Promise<any[]> {
  return await prisma.dailyContent.findMany({
    where: { weekId },
    orderBy: { dayNumber: 'asc' },
    include: { chapters: true },
  });
}

// Milestone retrieval
export async function getModuleMilestones(moduleId: string): Promise<any[]> {
  return await prisma.milestone.findMany({
    where: { moduleId },
  });
}

// Content versioning (placeholder)
export async function getContentVersion(chapterId: string, version?: string): Promise<any> {
  // In a real implementation, you'd have version history
  return await getChapterById(chapterId);
}

export async function invalidateContentCache(moduleId?: string, chapterId?: string): Promise<void> {
  if (chapterId) {
    await invalidateCache(`chapter:${chapterId}`);
  }
  if (moduleId) {
    await invalidateCache(`module:${moduleId}`);
    await invalidateCache('modules:all');
  }
}