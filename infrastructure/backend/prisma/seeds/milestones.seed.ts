import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const milestonesData = [
  // Module 0 Milestones
  {
    id: 'milestone-0-1',
    module_id: 'module-0',
    title: 'Python Beginner',
    description: 'Completed Python Foundations module',
    icon: '🐍',
    unlock_criteria: { type: 'module-completion', module_id: 'module-0' },
    order: 1
  },
  {
    id: 'milestone-0-2',
    module_id: 'module-0',
    title: 'First Checkpoint Passed',
    description: 'Passed Module 0 checkpoint assessment',
    icon: '✅',
    unlock_criteria: { type: 'checkpoint-pass', module_id: 'module-0' },
    order: 2
  },
  {
    id: 'milestone-0-3',
    module_id: 'module-0',
    title: 'First Mini-Project',
    description: 'Completed your first mini-project',
    icon: '🔨',
    unlock_criteria: { type: 'custom', condition: 'complete-first-mini-project' },
    order: 3
  },
  
  // Module 1 Milestones
  {
    id: 'milestone-1-1',
    module_id: 'module-1',
    title: 'Whole Game Complete',
    description: 'Built your first end-to-end AI application',
    icon: '🎮',
    unlock_criteria: { type: 'module-completion', module_id: 'module-1' },
    order: 4
  },
  {
    id: 'milestone-1-2',
    module_id: 'module-1',
    title: 'AI Application Builder',
    description: 'Passed Module 1 checkpoint',
    icon: '🏗️',
    unlock_criteria: { type: 'checkpoint-pass', module_id: 'module-1' },
    order: 5
  },
  {
    id: 'milestone-1-3',
    module_id: 'module-1',
    title: 'First Flagship Project',
    description: 'Completed your first flagship project',
    icon: '🏆',
    unlock_criteria: { type: 'custom', condition: 'complete-first-flagship' },
    order: 6
  },
  
  // Module 2 Milestones
  {
    id: 'milestone-2-1',
    module_id: 'module-2',
    title: 'ML Fundamentals Master',
    description: 'Mastered machine learning first principles',
    icon: '🧠',
    unlock_criteria: { type: 'module-completion', module_id: 'module-2' },
    order: 7
  },
  {
    id: 'milestone-2-2',
    module_id: 'module-2',
    title: 'Algorithm Expert',
    description: 'Passed Module 2 checkpoint',
    icon: '📊',
    unlock_criteria: { type: 'checkpoint-pass', module_id: 'module-2' },
    order: 8
  },
  {
    id: 'milestone-2-3',
    module_id: 'module-2',
    title: 'ML Project Complete',
    description: 'Built a complete ML project from scratch',
    icon: '🎯',
    unlock_criteria: { type: 'custom', condition: 'complete-ml-project' },
    order: 9
  },
  
  // Module 3 Milestones
  {
    id: 'milestone-3-1',
    module_id: 'module-3',
    title: 'Deep Learning Practitioner',
    description: 'Completed Neural Networks and Deep Learning',
    icon: '🔬',
    unlock_criteria: { type: 'module-completion', module_id: 'module-3' },
    order: 10
  },
  {
    id: 'milestone-3-2',
    module_id: 'module-3',
    title: 'Neural Network Architect',
    description: 'Passed Module 3 checkpoint',
    icon: '🏛️',
    unlock_criteria: { type: 'checkpoint-pass', module_id: 'module-3' },
    order: 11
  },
  {
    id: 'milestone-3-3',
    module_id: 'module-3',
    title: 'Deep Learning Project',
    description: 'Built a deep learning application',
    icon: '🚀',
    unlock_criteria: { type: 'custom', condition: 'complete-dl-project' },
    order: 12
  },
  
  // Module 4 Milestones
  {
    id: 'milestone-4-1',
    module_id: 'module-4',
    title: 'NLP Specialist',
    description: 'Completed Natural Language Processing module',
    icon: '💬',
    unlock_criteria: { type: 'module-completion', module_id: 'module-4' },
    order: 13
  },
  {
    id: 'milestone-4-2',
    module_id: 'module-4',
    title: 'Language Model Expert',
    description: 'Passed Module 4 checkpoint',
    icon: '📝',
    unlock_criteria: { type: 'checkpoint-pass', module_id: 'module-4' },
    order: 14
  },
  {
    id: 'milestone-4-3',
    module_id: 'module-4',
    title: 'NLP Application Built',
    description: 'Created an NLP application with transformers',
    icon: '🤖',
    unlock_criteria: { type: 'custom', condition: 'complete-nlp-project' },
    order: 15
  },
  
  // Module 5 Milestones
  {
    id: 'milestone-5-1',
    module_id: 'module-5',
    title: 'Computer Vision Engineer',
    description: 'Completed Computer Vision module',
    icon: '👁️',
    unlock_criteria: { type: 'module-completion', module_id: 'module-5' },
    order: 16
  },
  {
    id: 'milestone-5-2',
    module_id: 'module-5',
    title: 'Vision Systems Expert',
    description: 'Passed Module 5 checkpoint',
    icon: '📷',
    unlock_criteria: { type: 'checkpoint-pass', module_id: 'module-5' },
    order: 17
  },
  {
    id: 'milestone-5-3',
    module_id: 'module-5',
    title: 'CV Application Deployed',
    description: 'Built and deployed a computer vision system',
    icon: '🎥',
    unlock_criteria: { type: 'custom', condition: 'complete-cv-project' },
    order: 18
  },
  
  // Module 6 Milestones
  {
    id: 'milestone-6-1',
    module_id: 'module-6',
    title: 'Production AI Engineer',
    description: 'Completed Production AI Systems module',
    icon: '⚙️',
    unlock_criteria: { type: 'module-completion', module_id: 'module-6' },
    order: 19
  },
  {
    id: 'milestone-6-2',
    module_id: 'module-6',
    title: 'MLOps Professional',
    description: 'Passed Module 6 checkpoint',
    icon: '🔧',
    unlock_criteria: { type: 'checkpoint-pass', module_id: 'module-6' },
    order: 20
  },
  {
    id: 'milestone-6-3',
    module_id: 'module-6',
    title: 'AI Engineering Graduate',
    description: 'Completed the entire AI Engineering curriculum',
    icon: '🎓',
    unlock_criteria: { type: 'custom', condition: 'complete-all-modules' },
    order: 21
  }
];

export async function seedMilestones() {
  console.log('🌱 Seeding milestones...');
  
  for (const milestone of milestonesData) {
    await prisma.milestone.upsert({
      where: { id: milestone.id },
      update: milestone,
      create: milestone
    });
  }
  
  console.log('✅ Milestones seeded successfully');
}
