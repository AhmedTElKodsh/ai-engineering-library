import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const modulesData = [
  {
    id: 'module-0',
    title: 'Python Foundations',
    description: 'Master Python fundamentals and programming basics',
    order: 0,
    duration_weeks: 4,
    entry_point: 'beginner',
    is_optional: false
  },
  {
    id: 'module-1',
    title: 'The Whole Game',
    description: 'Build your first end-to-end AI application',
    order: 1,
    duration_weeks: 5,
    entry_point: 'intermediate',
    is_optional: false
  },
  {
    id: 'module-2',
    title: 'First Principles',
    description: 'Deep dive into machine learning fundamentals',
    order: 2,
    duration_weeks: 6,
    entry_point: 'intermediate',
    is_optional: false
  },
  {
    id: 'module-3',
    title: 'Neural Networks and Deep Learning',
    description: 'Master neural networks and deep learning architectures',
    order: 3,
    duration_weeks: 5,
    entry_point: 'advanced',
    is_optional: false
  },
  {
    id: 'module-4',
    title: 'Natural Language Processing',
    description: 'Build NLP applications with transformers and LLMs',
    order: 4,
    duration_weeks: 4,
    entry_point: 'advanced',
    is_optional: false
  },
  {
    id: 'module-5',
    title: 'Computer Vision',
    description: 'Create computer vision systems and applications',
    order: 5,
    duration_weeks: 3,
    entry_point: 'advanced',
    is_optional: false
  },
  {
    id: 'module-6',
    title: 'Production AI Systems',
    description: 'Deploy and scale AI applications in production',
    order: 6,
    duration_weeks: 3,
    entry_point: 'advanced',
    is_optional: false
  }
];

export async function seedModules() {
  console.log('🌱 Seeding modules...');
  
  for (const module of modulesData) {
    await prisma.module.upsert({
      where: { id: module.id },
      update: module,
      create: module
    });
  }
  
  console.log('✅ Modules seeded successfully');
}
