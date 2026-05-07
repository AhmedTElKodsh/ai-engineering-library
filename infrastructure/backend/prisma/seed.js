"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Starting seed...');
    // Create demo user
    const hashedPassword = await bcrypt_1.default.hash('password123', 10);
    const user = await prisma.user.upsert({
        where: { email: 'demo@ai-eng.com' },
        update: {},
        create: {
            email: 'demo@ai-eng.com',
            name: 'Demo User',
            password: hashedPassword,
            preferences: JSON.stringify({
                theme: 'dark',
                fontSize: 14,
                codeTheme: 'monokai',
                notifications: { email: true, inApp: true }
            })
        }
    });
    console.log('Created demo user:', user.id);
    // Create Module 0: Python Foundations
    const module0 = await prisma.module.create({
        data: {
            title: 'Module 0: Python Foundations',
            description: 'Learn Python basics for AI Engineering',
            order: 0,
            weeks: {
                create: [
                    {
                        weekNumber: 1,
                        title: 'Week 1: Python Basics',
                        days: {
                            create: [
                                { dayNumber: 1, topic: 'Variables and Data Types', hours: 2.5, type: 'regular' },
                                { dayNumber: 2, topic: 'Control Flow', hours: 3.0, type: 'regular' },
                                { dayNumber: 3, topic: 'Functions and Scope', hours: 3.5, type: 'regular' },
                                { dayNumber: 4, topic: 'Data Structures', hours: 4.0, type: 'regular' },
                                { dayNumber: 5, topic: 'Mini-Project: Calculator', hours: 5.0, type: 'mini-project' },
                                { dayNumber: 6, topic: 'Catch-up Day', hours: 2.0, type: 'catch-up' },
                                { dayNumber: 7, topic: 'Catch-up Day', hours: 2.0, type: 'catch-up' }
                            ]
                        }
                    }
                ]
            },
            chapters: {
                create: [
                    { title: 'Introduction to Python', content: '# Python Basics\n\nWelcome to Python...', order: 1 },
                    { title: 'Variables and Types', content: '# Variables\n\nLearn about variables...', order: 2 },
                    { title: 'Control Flow', content: '# Control Flow\n\nIf statements...', order: 3 },
                    { title: 'Functions', content: '# Functions\n\nDefine functions...', order: 4, isProject: true, projectType: 'mini-project' }
                ]
            },
            milestones: {
                create: [
                    {
                        title: 'Python Foundations Master',
                        description: 'Completed Module 0: Python Foundations',
                        criteria: JSON.stringify({ type: 'module-completion', moduleOrder: 0 }),
                        icon: '🐍'
                    }
                ]
            }
        }
    });
    console.log('Created Module 0:', module0.id);
    // Create Module 1: Whole Game
    const module1 = await prisma.module.create({
        data: {
            title: 'Module 1: Whole Game',
            description: 'Build a complete AI application end-to-end',
            order: 1,
            chapters: {
                create: [
                    { title: 'AI Application Overview', content: '# Whole Game\n\nBuild an AI app...', order: 1 },
                    { title: 'Setting Up the Project', content: '# Project Setup\n\nInitialize...', order: 2 },
                    { title: 'Flagship Project', content: '# Flagship Project\n\nBuild the app...', order: 3, isProject: true, projectType: 'flagship-project' }
                ]
            },
            milestones: {
                create: [
                    {
                        title: 'First AI App Builder',
                        description: 'Completed Module 1: Whole Game',
                        criteria: JSON.stringify({ type: 'module-completion', moduleOrder: 1 }),
                        icon: '🎮'
                    }
                ]
            }
        }
    });
    console.log('Created Module 1:', module1.id);
    console.log('Seed completed successfully!');
}
main()
    .catch(async (e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
