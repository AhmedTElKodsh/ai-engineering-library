#!/usr/bin/env node

/**
 * Content Seeding Script for AI Engineering Curriculum
 * Seeds all 7 modules with chapters, daily content breakdown, milestones, and project tags
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Module definitions with chapters and daily content
const modules = [
  {
    id: 'module-0',
    title: 'Module 0: Python Foundations',
    description: 'Learn Python basics, syntax, data structures, and OOP concepts',
    order: 0,
    chapters: [
      { id: 'ch-0-1', title: 'Python Installation & Setup', order: 1, content: '# Python Setup\n\nLearn to install Python and set up your development environment.' },
      { id: 'ch-0-2', title: 'Variables & Data Types', order: 2, content: '# Variables\n\nLearn about Python variables and data types.' },
      { id: 'ch-0-3', title: 'Control Flow', order: 3, content: '# Control Flow\n\nLearn if/else statements and loops.' },
      { id: 'ch-0-4', title: 'Functions & Loops', order: 4, content: '# Functions\n\nLearn to write functions and advanced loops.' },
      { id: 'ch-0-5', title: 'Mini-Project: Calculator', order: 5, content: '# Calculator Project\n\nBuild a calculator using Python.', isProject: true, projectType: 'mini-project' },
    ],
    weeks: [
      {
        weekNumber: 1,
        days: [
          { dayNumber: 1, topic: 'Python Installation & Setup', hours: 2, type: 'regular', chapterId: 'ch-0-1' },
          { dayNumber: 2, topic: 'Variables & Data Types', hours: 2, type: 'regular', chapterId: 'ch-0-2' },
          { dayNumber: 3, topic: 'Control Flow (if/else)', hours: 2, type: 'regular', chapterId: 'ch-0-3' },
          { dayNumber: 4, topic: 'Loops & Functions', hours: 3, type: 'regular', chapterId: 'ch-0-4' },
          { dayNumber: 5, topic: 'Mini-Project: Calculator', hours: 4, type: 'mini-project', chapterId: 'ch-0-5' },
          { dayNumber: 6, topic: 'Catch-up & Review', hours: 2, type: 'catch-up' },
          { dayNumber: 7, topic: 'Catch-up & Review', hours: 2, type: 'catch-up' },
        ],
      },
    ],
    milestones: [
      { title: 'Python Basics Master', description: 'Complete all Python foundation chapters', criteria: JSON.stringify({ type: 'module-completion' }) },
      { title: 'OOP Expert', description: 'Complete object-oriented programming section', criteria: JSON.stringify({ type: 'checkpoint-pass', checkpointId: 'checkpoint-0-3' }) },
    ],
  },
  {
    id: 'module-1',
    title: 'Module 1: Whole Game',
    description: 'Build a complete ML project from scratch to understand the full workflow',
    order: 1,
    chapters: [
      { id: 'ch-1-1', title: 'ML Problem Framing', order: 1, content: '# ML Problem Framing\n\nDefine machine learning problems.' },
      { id: 'ch-1-2', title: 'Data Collection & Exploration', order: 2, content: '# Data Exploration\n\nLearn to collect and explore data.' },
      { id: 'ch-1-3', title: 'Feature Engineering Basics', order: 3, content: '# Feature Engineering\n\nLearn feature engineering techniques.' },
      { id: 'ch-1-4', title: 'Model Selection', order: 4, content: '# Model Selection\n\nChoose the right ML model.' },
      { id: 'ch-1-5', title: 'Mini-Project: First ML Model', order: 5, content: '# First ML Model\n\nBuild your first ML model.', isProject: true, projectType: 'mini-project' },
    ],
    weeks: [
      {
        weekNumber: 1,
        days: [
          { dayNumber: 1, topic: 'ML Problem Framing', hours: 2, type: 'regular', chapterId: 'ch-1-1' },
          { dayNumber: 2, topic: 'Data Collection & Exploration', hours: 3, type: 'regular', chapterId: 'ch-1-2' },
          { dayNumber: 3, topic: 'Feature Engineering Basics', hours: 3, type: 'regular', chapterId: 'ch-1-3' },
          { dayNumber: 4, topic: 'Model Selection', hours: 2, type: 'regular', chapterId: 'ch-1-4' },
          { dayNumber: 5, topic: 'Mini-Project: First ML Model', hours: 5, type: 'mini-project', chapterId: 'ch-1-5' },
          { dayNumber: 6, topic: 'Catch-up & Review', hours: 2, type: 'catch-up' },
          { dayNumber: 7, topic: 'Catch-up & Review', hours: 2, type: 'catch-up' },
        ],
      },
    ],
    milestones: [
      { title: 'ML Practitioner', description: 'Build your first complete ML project', criteria: JSON.stringify({ type: 'project-completion', projectType: 'mini-project' }) },
    ],
  },
  {
    id: 'module-2',
    title: 'Module 2: First Principles',
    description: 'Understand ML theory, math foundations, and algorithm intuition',
    order: 2,
    chapters: [
      { id: 'ch-2-1', title: 'Linear Algebra for ML', order: 1, content: '# Linear Algebra\n\nLearn linear algebra for ML.' },
      { id: 'ch-2-2', title: 'Calculus Basics', order: 2, content: '# Calculus\n\nLearn calculs concepts for ML.' },
      { id: 'ch-2-3', title: 'Probability & Statistics', order: 3, content: '# Probability\n\nLearn probability and statistics.' },
      { id: 'ch-2-4', title: 'Gradient Descent', order: 4, content: '# Gradient Descent\n\nUnderstand gradient descent algorithm.' },
      { id: 'ch-2-5', title: 'Mini-Project: Implement Gradient Descent', order: 5, content: '# Implement Gradient Descent\n\nCode gradient descent from scratch.', isProject: true, projectType: 'mini-project' },
    ],
    weeks: [
      {
        weekNumber: 1,
        days: [
          { dayNumber: 1, topic: 'Linear Algebra for ML', hours: 3, type: 'regular', chapterId: 'ch-2-1' },
          { dayNumber: 2, topic: 'Calculus Basics', hours: 3, type: 'regular', chapterId: 'ch-2-2' },
          { dayNumber: 3, topic: 'Probability & Statistics', hours: 3, type: 'regular', chapterId: 'ch-2-3' },
          { dayNumber: 4, topic: 'Gradient Descent', hours: 3, type: 'regular', chapterId: 'ch-2-4' },
          { dayNumber: 5, topic: 'Mini-Project: Implement Gradient Descent', hours: 4, type: 'mini-project', chapterId: 'ch-2-5' },
          { dayNumber: 6, topic: 'Catch-up & Review', hours: 2, type: 'catch-up' },
          { dayNumber: 7, topic: 'Catch-up & Review', hours: 2, type: 'catch-up' },
        ],
      },
    ],
    milestones: [
      { title: 'Math Foundation', description: 'Master the mathematical foundations of ML', criteria: JSON.stringify({ type: 'module-completion' }) },
    ],
  },
  {
    id: 'module-3',
    title: 'Module 3: Deep Learning',
    description: 'Neural networks, backpropagation, and deep learning architectures',
    order: 3,
    chapters: [
      { id: 'ch-3-1', title: 'Neural Network Basics', order: 1, content: '# Neural Networks\n\nLearn neural network fundamentals.' },
      { id: 'ch-3-2', title: 'Backpropagation', order: 2, content: '# Backpropagation\n\nUnderstand backpropagation.' },
      { id: 'ch-3-3', title: 'Activation Functions', order: 3, content: '# Activation Functions\n\nLearn different activation functions.' },
      { id: 'ch-3-4', title: 'Training Deep Networks', order: 4, content: '# Training\n\nLearn to train deep networks.' },
      { id: 'ch-3-5', title: 'Mini-Project: Build a Neural Net', order: 5, content: '# Build Neural Net\n\nBuild a neural network from scratch.', isProject: true, projectType: 'mini-project' },
    ],
    weeks: [
      {
        weekNumber: 1,
        days: [
          { dayNumber: 1, topic: 'Neural Network Basics', hours: 3, type: 'regular', chapterId: 'ch-3-1' },
          { dayNumber: 2, topic: 'Backpropagation', hours: 3, type: 'regular', chapterId: 'ch-3-2' },
          { dayNumber: 3, topic: 'Activation Functions', hours: 2, type: 'regular', chapterId: 'ch-3-3' },
          { dayNumber: 4, topic: 'Training Deep Networks', hours: 3, type: 'regular', chapterId: 'ch-3-4' },
          { dayNumber: 5, topic: 'Mini-Project: Build a Neural Net', hours: 5, type: 'mini-project', chapterId: 'ch-3-5' },
          { dayNumber: 6, topic: 'Catch-up & Review', hours: 2, type: 'catch-up' },
          { dayNumber: 7, topic: 'Catch-up & Review', hours: 2, type: 'catch-up' },
        ],
      },
    ],
    milestones: [
      { title: 'Deep Learning Developer', description: 'Build and train neural networks', criteria: JSON.stringify({ type: 'project-completion', projectType: 'mini-project' }) },
    ],
  },
  {
    id: 'module-4',
    title: 'Module 4: Computer Vision',
    description: 'CNNs, image processing, and computer vision applications',
    order: 4,
    chapters: [
      { id: 'ch-4-1', title: 'Image Processing Basics', order: 1, content: '# Image Processing\n\nLearn image processing basics.' },
      { id: 'ch-4-2', title: 'CNN Architecture', order: 2, content: '# CNNs\n\nLearn convolutional neural networks.' },
      { id: 'ch-4-3', title: 'Data Augmentation', order: 3, content: '# Data Augmentation\n\nLearn data augmentation techniques.' },
      { id: 'ch-4-4', title: 'Transfer Learning', order: 4, content: '# Transfer Learning\n\nLearn transfer learning concepts.' },
      { id: 'ch-4-5', title: 'Mini-Project: Image Classifier', order: 5, content: '# Image Classifier\n\nBuild an image classifier.', isProject: true, projectType: 'mini-project' },
    ],
    weeks: [
      {
        weekNumber: 1,
        days: [
          { dayNumber: 1, topic: 'Image Processing Basics', hours: 2, type: 'regular', chapterId: 'ch-4-1' },
          { dayNumber: 2, topic: 'CNN Architecture', hours: 3, type: 'regular', chapterId: 'ch-4-2' },
          { dayNumber: 3, topic: 'Data Augmentation', hours: 2, type: 'regular', chapterId: 'ch-4-3' },
          { dayNumber: 4, topic: 'Transfer Learning', hours: 3, type: 'regular', chapterId: 'ch-4-4' },
          { dayNumber: 5, topic: 'Mini-Project: Image Classifier', hours: 5, type: 'mini-project', chapterId: 'ch-4-5' },
          { dayNumber: 6, topic: 'Catch-up & Review', hours: 2, type: 'catch-up' },
          { dayNumber: 7, topic: 'Catch-up & Review', hours: 2, type: 'catch-up' },
        ],
      },
    ],
    milestones: [
      { title: 'Vision Engineer', description: 'Build computer vision applications', criteria: JSON.stringify({ type: 'project-completion', projectType: 'mini-project' }) },
    ],
  },
  {
    id: 'module-5',
    title: 'Module 5: NLP & Transformers',
    description: 'Natural language processing and transformer models',
    order: 5,
    chapters: [
      { id: 'ch-5-1', title: 'Text Processing', order: 1, content: '# Text Processing\n\nLearn NLP text processing.' },
      { id: 'ch-5-2', title: 'Word Embeddings', order: 2, content: '# Embeddings\n\nLearn word embeddings.' },
      { id: 'ch-5-3', title: 'Attention Mechanism', order: 3, content: '# Attention\n\nUnderstand attention mechanism.' },
      { id: 'ch-5-4', title: 'Transformer Architecture', order: 4, content: '# Transformers\n\nLearn transformer architecture.' },
      { id: 'ch-5-5', title: 'Mini-Project: Text Classifier', order: 5, content: '# Text Classifier\n\nBuild a text classifier.', isProject: true, projectType: 'mini-project' },
    ],
    weeks: [
      {
        weekNumber: 1,
        days: [
          { dayNumber: 1, topic: 'Text Processing', hours: 2, type: 'regular', chapterId: 'ch-5-1' },
          { dayNumber: 2, topic: 'Word Embeddings', hours: 3, type: 'regular', chapterId: 'ch-5-2' },
          { dayNumber: 3, topic: 'Attention Mechanism', hours: 3, type: 'regular', chapterId: 'ch-5-3' },
          { dayNumber: 4, topic: 'Transformer Architecture', hours: 3, type: 'regular', chapterId: 'ch-5-4' },
          { dayNumber: 5, topic: 'Mini-Project: Text Classifier', hours: 5, type: 'mini-project', chapterId: 'ch-5-5' },
          { dayNumber: 6, topic: 'Catch-up & Review', hours: 2, type: 'catch-up' },
          { dayNumber: 7, topic: 'Catch-up & Review', hours: 2, type: 'catch-up' },
        ],
      },
    ],
    milestones: [
      { title: 'NLP Specialist', description: 'Build NLP applications with transformers', criteria: JSON.stringify({ type: 'project-completion', projectType: 'mini-project' }) },
    ],
  },
  {
    id: 'module-6',
    title: 'Module 6: Flagship Project',
    description: 'Capstone project combining all learned concepts',
    order: 6,
    chapters: [
      { id: 'ch-6-1', title: 'Project Planning', order: 1, content: '# Project Planning\n\nPlan your flagship project.' },
      { id: 'ch-6-2', title: 'Architecture Design', order: 2, content: '# Architecture\n\nDesign your project architecture.' },
      { id: 'ch-6-3', title: 'Implementation Part 1', order: 3, content: '# Implementation\n\nStart implementing your project.' },
      { id: 'ch-6-4', title: 'Implementation Part 2', order: 4, content: '# Implementation Continued\n\nContinue implementation.' },
      { id: 'ch-6-5', title: 'Flagship Project: Start', order: 5, content: '# Flagship Project\n\nBuild your capstone project.', isProject: true, projectType: 'flagship-project' },
      { id: 'ch-6-6', title: 'Flagship Project: Continue', order: 6, content: '# Continue Flagship\n\nContinue building.', isProject: true, projectType: 'flagship-project' },
      { id: 'ch-6-7', title: 'Flagship Project: Testing', order: 7, content: '# Testing\n\nTest your project.', isProject: true, projectType: 'flagship-project' },
      { id: 'ch-6-8', title: 'Flagship Project: Documentation', order: 8, content: '# Documentation\n\nDocument your project.', isProject: true, projectType: 'flagship-project' },
      { id: 'ch-6-9', title: 'Flagship Project: Deployment', order: 9, content: '# Deployment\n\nDeploy your project.', isProject: true, projectType: 'flagship-project' },
    ],
    weeks: [
      {
        weekNumber: 1,
        days: [
          { dayNumber: 1, topic: 'Project Planning', hours: 3, type: 'regular', chapterId: 'ch-6-1' },
          { dayNumber: 2, topic: 'Architecture Design', hours: 3, type: 'regular', chapterId: 'ch-6-2' },
          { dayNumber: 3, topic: 'Implementation Part 1', hours: 4, type: 'regular', chapterId: 'ch-6-3' },
          { dayNumber: 4, topic: 'Implementation Part 2', hours: 4, type: 'regular', chapterId: 'ch-6-4' },
          { dayNumber: 5, topic: 'Flagship Project: Start', hours: 6, type: 'flagship-project', chapterId: 'ch-6-5' },
          { dayNumber: 6, topic: 'Catch-up & Review', hours: 2, type: 'catch-up' },
          { dayNumber: 7, topic: 'Catch-up & Review', hours: 2, type: 'catch-up' },
        ],
      },
      {
        weekNumber: 2,
        days: [
          { dayNumber: 8, topic: 'Flagship Project: Continue', hours: 6, type: 'flagship-project', chapterId: 'ch-6-6' },
          { dayNumber: 9, topic: 'Flagship Project: Continue', hours: 6, type: 'flagship-project', chapterId: 'ch-6-7' },
          { dayNumber: 10, topic: 'Flagship Project: Testing', hours: 4, type: 'flagship-project', chapterId: 'ch-6-8' },
          { dayNumber: 11, topic: 'Flagship Project: Documentation', hours: 3, type: 'flagship-project', chapterId: 'ch-6-9' },
          { dayNumber: 12, topic: 'Flagship Project: Deployment', hours: 4, type: 'flagship-project', chapterId: 'ch-6-9' },
          { dayNumber: 13, topic: 'Catch-up & Review', hours: 2, type: 'catch-up' },
          { dayNumber: 14, topic: 'Catch-up & Review', hours: 2, type: 'catch-up' },
        ],
      },
    ],
    milestones: [
      { title: 'AI Engineer', description: 'Complete the flagship capstone project', criteria: JSON.stringify({ type: 'project-completion', projectType: 'flagship-project' }) },
      { title: 'Portfolio Master', description: 'Build a professional portfolio', criteria: JSON.stringify({ type: 'custom', checkPortfolioReady: true }) },
    ],
  },
];

async function seedContent() {
  console.log('Starting content seeding...');

  for (const moduleData of modules) {
    console.log(`Seeding ${moduleData.title}...`);

    // Create or update module
    const module = await prisma.module.upsert({
      where: { id: moduleData.id },
      update: {
        title: moduleData.title,
        description: moduleData.description,
        order: moduleData.order,
      },
      create: {
        id: moduleData.id,
        title: moduleData.title,
        description: moduleData.description,
        order: moduleData.order,
      },
    });

    // Create chapters
    for (const chapterData of moduleData.chapters) {
      await prisma.chapter.upsert({
        where: { id: chapterData.id },
        update: {
          title: chapterData.title,
          content: chapterData.content,
          order: chapterData.order,
          isProject: chapterData.isProject || false,
          projectType: chapterData.projectType || null,
        },
        create: {
          id: chapterData.id,
          title: chapterData.title,
          content: chapterData.content,
          order: chapterData.order,
          moduleId: module.id,
          isProject: chapterData.isProject || false,
          projectType: chapterData.projectType || null,
        },
      });
    }

    // Create weeks and daily content
    for (const weekData of moduleData.weeks) {
      // Find existing week or create
      let week = await prisma.week.findFirst({
        where: {
          moduleId: module.id,
          weekNumber: weekData.weekNumber,
        },
      });

      if (!week) {
        week = await prisma.week.create({
          data: {
            id: `week-${moduleData.id}-${weekData.weekNumber}`,
            moduleId: module.id,
            weekNumber: weekData.weekNumber,
          },
        });
      }

      // Create daily content
      for (const dayData of weekData.days) {
        const existingDay = await prisma.dailyContent.findFirst({
          where: {
            weekId: week.id,
            dayNumber: dayData.dayNumber,
          },
        });

        if (!existingDay) {
          await prisma.dailyContent.create({
            data: {
              id: `day-${moduleData.id}-w${weekData.weekNumber}-d${dayData.dayNumber}`,
              weekId: week.id,
              dayNumber: dayData.dayNumber,
              topic: dayData.topic,
              hours: dayData.hours,
              type: dayData.type,
              chapterId: dayData.chapterId || null,
            },
          });
        } else {
          await prisma.dailyContent.update({
            where: { id: existingDay.id },
            data: {
              topic: dayData.topic,
              hours: dayData.hours,
              type: dayData.type,
              chapterId: dayData.chapterId || null,
            },
          });
        }
      }
    }

    // Create milestones
    for (const milestoneData of moduleData.milestones) {
      const existingMilestone = await prisma.milestone.findFirst({
        where: {
          moduleId: module.id,
          title: milestoneData.title,
        },
      });

      if (!existingMilestone) {
        await prisma.milestone.create({
          data: {
            id: `milestone-${moduleData.id}-${milestoneData.title.toLowerCase().replace(/\s+/g, '-')}`,
            moduleId: module.id,
            title: milestoneData.title,
            description: milestoneData.description,
            criteria: milestoneData.criteria,
            order: 0,
          },
        });
      } else {
        await prisma.milestone.update({
          where: { id: existingMilestone.id },
          data: {
            description: milestoneData.description,
            criteria: milestoneData.criteria,
          },
        });
      }
    }
  }

  console.log('Content seeding completed successfully!');
}

seedContent()
  .catch((error) => {
    console.error('Error seeding content:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });