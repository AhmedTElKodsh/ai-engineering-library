import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Module 0: Python Foundations - 4 weeks
export async function seedModule0Content() {
  console.log('🌱 Seeding Module 0 (Python Foundations) content...');
  
  const moduleId = 'module-0';
  
  // Week 1: Python Basics
  const week1 = await prisma.week.upsert({
    where: { id: 'module-0-week-1' },
    update: {},
    create: {
      id: 'module-0-week-1',
      module_id: moduleId,
      week_number: 1,
      title: 'Python Basics',
      description: 'Variables, data types, and basic operations',
      estimated_hours: 15
    }
  });
  
  // Week 1 Daily Content
  const week1Days = [
    {
      id: 'module-0-week-1-day-1',
      week_id: week1.id,
      day_number: 1,
      title: 'Getting Started with Python',
      topic: 'Installation, REPL, and first program',
      estimated_hours: 2,
      type: 'lesson'
    },
    {
      id: 'module-0-week-1-day-2',
      week_id: week1.id,
      day_number: 2,
      title: 'Variables and Data Types',
      topic: 'Strings, numbers, booleans, and type conversion',
      estimated_hours: 2,
      type: 'lesson'
    },
    {
      id: 'module-0-week-1-day-3',
      week_id: week1.id,
      day_number: 3,
      title: 'Operators and Expressions',
      topic: 'Arithmetic, comparison, and logical operators',
      estimated_hours: 2,
      type: 'lesson'
    },
    {
      id: 'module-0-week-1-day-4',
      week_id: week1.id,
      day_number: 4,
      title: 'Control Flow',
      topic: 'If statements, loops, and conditionals',
      estimated_hours: 3,
      type: 'lesson'
    },
    {
      id: 'module-0-week-1-day-5',
      week_id: week1.id,
      day_number: 5,
      title: 'Mini-Project: Calculator',
      topic: 'Build a command-line calculator',
      estimated_hours: 3,
      type: 'mini-project'
    }
  ];
  
  for (const day of week1Days) {
    await prisma.dailyContent.upsert({
      where: { id: day.id },
      update: day,
      create: day
    });
  }
  
  // Week 2: Data Structures
  const week2 = await prisma.week.upsert({
    where: { id: 'module-0-week-2' },
    update: {},
    create: {
      id: 'module-0-week-2',
      module_id: moduleId,
      week_number: 2,
      title: 'Data Structures',
      description: 'Lists, dictionaries, sets, and tuples',
      estimated_hours: 15
    }
  });
  
  const week2Days = [
    {
      id: 'module-0-week-2-day-1',
      week_id: week2.id,
      day_number: 1,
      title: 'Lists and List Operations',
      topic: 'Creating, indexing, slicing, and list methods',
      estimated_hours: 2,
      type: 'lesson'
    },
    {
      id: 'module-0-week-2-day-2',
      week_id: week2.id,
      day_number: 2,
      title: 'Dictionaries',
      topic: 'Key-value pairs, dictionary methods, and use cases',
      estimated_hours: 2,
      type: 'lesson'
    },
    {
      id: 'module-0-week-2-day-3',
      week_id: week2.id,
      day_number: 3,
      title: 'Sets and Tuples',
      topic: 'Immutable data structures and set operations',
      estimated_hours: 2,
      type: 'lesson'
    },
    {
      id: 'module-0-week-2-day-4',
      week_id: week2.id,
      day_number: 4,
      title: 'List Comprehensions',
      topic: 'Elegant list creation and filtering',
      estimated_hours: 3,
      type: 'lesson'
    },
    {
      id: 'module-0-week-2-day-5',
      week_id: week2.id,
      day_number: 5,
      title: 'Mini-Project: Contact Manager',
      topic: 'Build a contact management system',
      estimated_hours: 3,
      type: 'mini-project'
    }
  ];
  
  for (const day of week2Days) {
    await prisma.dailyContent.upsert({
      where: { id: day.id },
      update: day,
      create: day
    });
  }
  
  // Week 3: Functions and Modules
  const week3 = await prisma.week.upsert({
    where: { id: 'module-0-week-3' },
    update: {},
    create: {
      id: 'module-0-week-3',
      module_id: moduleId,
      week_number: 3,
      title: 'Functions and Modules',
      description: 'Function definition, scope, and code organization',
      estimated_hours: 15
    }
  });
  
  const week3Days = [
    {
      id: 'module-0-week-3-day-1',
      week_id: week3.id,
      day_number: 1,
      title: 'Defining Functions',
      topic: 'Function syntax, parameters, and return values',
      estimated_hours: 2,
      type: 'lesson'
    },
    {
      id: 'module-0-week-3-day-2',
      week_id: week3.id,
      day_number: 2,
      title: 'Function Arguments',
      topic: 'Default arguments, *args, and **kwargs',
      estimated_hours: 2,
      type: 'lesson'
    },
    {
      id: 'module-0-week-3-day-3',
      week_id: week3.id,
      day_number: 3,
      title: 'Scope and Namespaces',
      topic: 'Local, global, and nonlocal variables',
      estimated_hours: 2,
      type: 'lesson'
    },
    {
      id: 'module-0-week-3-day-4',
      week_id: week3.id,
      day_number: 4,
      title: 'Modules and Packages',
      topic: 'Importing, creating modules, and package structure',
      estimated_hours: 3,
      type: 'lesson'
    },
    {
      id: 'module-0-week-3-day-5',
      week_id: week3.id,
      day_number: 5,
      title: 'Mini-Project: Text Analyzer',
      topic: 'Build a text analysis tool with functions',
      estimated_hours: 3,
      type: 'mini-project'
    }
  ];
  
  for (const day of week3Days) {
    await prisma.dailyContent.upsert({
      where: { id: day.id },
      update: day,
      create: day
    });
  }
  
  // Week 4: OOP and File I/O (Flagship Project Week)
  const week4 = await prisma.week.upsert({
    where: { id: 'module-0-week-4' },
    update: {},
    create: {
      id: 'module-0-week-4',
      module_id: moduleId,
      week_number: 4,
      title: 'OOP and File I/O',
      description: 'Object-oriented programming and file handling',
      estimated_hours: 20
    }
  });
  
  const week4Days = [
    {
      id: 'module-0-week-4-day-1',
      week_id: week4.id,
      day_number: 1,
      title: 'Classes and Objects',
      topic: 'Class definition, attributes, and methods',
      estimated_hours: 3,
      type: 'lesson'
    },
    {
      id: 'module-0-week-4-day-2',
      week_id: week4.id,
      day_number: 2,
      title: 'Inheritance and Polymorphism',
      topic: 'Class inheritance and method overriding',
      estimated_hours: 3,
      type: 'lesson'
    },
    {
      id: 'module-0-week-4-day-3',
      week_id: week4.id,
      day_number: 3,
      title: 'File I/O',
      topic: 'Reading and writing files, context managers',
      estimated_hours: 2,
      type: 'lesson'
    },
    {
      id: 'module-0-week-4-day-4',
      week_id: week4.id,
      day_number: 4,
      title: 'Error Handling',
      topic: 'Try-except blocks and exception handling',
      estimated_hours: 2,
      type: 'lesson'
    },
    {
      id: 'module-0-week-4-day-5',
      week_id: week4.id,
      day_number: 5,
      title: 'Flagship Project: Task Manager CLI',
      topic: 'Build a complete task management application',
      estimated_hours: 10,
      type: 'flagship-project'
    }
  ];
  
  for (const day of week4Days) {
    await prisma.dailyContent.upsert({
      where: { id: day.id },
      update: day,
      create: day
    });
  }
  
  // Create sample chapters for each day
  console.log('Creating sample chapters for Module 0...');
  
  const sampleChapter = await prisma.chapter.upsert({
    where: { id: 'module-0-chapter-1' },
    update: {},
    create: {
      id: 'module-0-chapter-1',
      module_id: moduleId,
      title: 'Introduction to Python',
      slug: 'introduction-to-python',
      content: '# Introduction to Python\n\nWelcome to Python programming!',
      order: 1,
      estimated_minutes: 30,
      is_checkpoint: false,
      daily_content_id: 'module-0-week-1-day-1'
    }
  });
  
  console.log('✅ Module 0 content seeded successfully');
}
