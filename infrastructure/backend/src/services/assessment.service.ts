import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Diagnostic Assessment
export async function startDiagnosticAssessment(userId: string): Promise<any> {
  let assessment = await prisma.assessment.findFirst({
    where: { type: 'diagnostic' },
    include: { questions: true },
  });

  if (!assessment) {
    assessment = await prisma.assessment.create({
      data: {
        type: 'diagnostic',
        title: 'Diagnostic Assessment',
        description: 'Determine your entry point into the curriculum',
        questions: {
          create: [
            {
              type: 'multiple-choice',
              content: 'What is your experience level with Python?',
              options: JSON.stringify(['Beginner', 'Intermediate', 'Advanced']),
              correctAnswer: '0',
              order: 1,
            },
            {
              type: 'multiple-choice',
              content: 'Have you built any AI/ML projects before?',
              options: JSON.stringify(['Yes, multiple', 'Yes, one or two', 'No']),
              correctAnswer: '2',
              order: 2,
            },
            {
              type: 'coding',
              content: 'Write a Python function that returns the sum of two numbers.',
              language: 'python',
              order: 3,
            },
          ],
        },
      },
      include: { questions: true },
    });
  }

  const attempt = await prisma.assessmentAttempt.create({
    data: {
      userId,
      assessmentId: assessment.id,
      status: 'in-progress',
    },
  });

  return {
    attemptId: attempt.id,
    assessmentId: assessment.id,
    questions: assessment.questions.map((q: any) => ({
      id: q.id,
      type: q.type,
      content: q.content,
      options: q.options ? JSON.parse(q.options) : null,
      order: q.order,
    })),
  };
}

export async function submitDiagnosticAnswers(attemptId: string, answers: any[]): Promise<any> {
  const attempt = await prisma.assessmentAttempt.findUnique({
    where: { id: attemptId },
    include: { assessment: { include: { questions: true } }, user: true },
  });

  if (!attempt || attempt.status !== 'in-progress') {
    throw new Error('Invalid or completed attempt');
  }

  let score = 0;
  const totalQuestions = attempt.assessment.questions.length;

  for (const answer of answers) {
    const question = attempt.assessment.questions.find((q: any) => q.id === answer.questionId);
    if (!question) continue;

    let isCorrect = false;
    if (question.type === 'multiple-choice') {
      isCorrect = answer.answer === question.correctAnswer;
    } else if (question.type === 'coding') {
      isCorrect = answer.answer && answer.answer.includes('def') && answer.answer.includes('return');
    }

    if (isCorrect) score++;

    await prisma.assessmentResponse.create({
      data: {
        attemptId,
        questionId: question.id,
        answer: answer.answer,
        isCorrect,
      },
    });
  }

  const percentage = (score / totalQuestions) * 100;

  let entryModuleOrder = 0;
  if (percentage >= 80) {
    entryModuleOrder = 2;
  } else if (percentage >= 60) {
    entryModuleOrder = 1;
  }

  await prisma.assessmentAttempt.update({
    where: { id: attemptId },
    data: {
      status: 'completed',
      score: percentage,
      completedAt: new Date(),
    },
  });

  await prisma.user.update({
    where: { id: attempt.userId },
    data: { entryPoint: entryModuleOrder },
  });

  return {
    score: percentage,
    entryModuleOrder,
    feedback: `Based on your assessment, you should start at Module ${entryModuleOrder}.`,
    recommendedModule: `Module ${entryModuleOrder}`,
  };
}

// Checkpoint Assessment
export async function startCheckpointAttempt(userId: string, chapterId: string): Promise<any> {
  const chapter = await prisma.chapter.findUnique({
    where: { id: chapterId },
    include: { assessment: { include: { questions: true } },
  });

  if (!chapter?.assessment) {
    throw new Error('No checkpoint assessment for this chapter');
  }

  const attempt = await prisma.assessmentAttempt.create({
    data: {
      userId,
      assessmentId: chapter.assessment.id,
      status: 'in-progress',
    },
  });

  return {
    attemptId: attempt.id,
    questions: chapter.assessment.questions.map((q: any) => ({
      id: q.id,
      type: q.type,
      content: q.content,
      options: q.options ? JSON.parse(q.options) : null,
    })),
  };
}

export async function submitCheckpoint(attemptId: string, answers: any[]): Promise<any> {
  const attempt = await prisma.assessmentAttempt.findUnique({
    where: { id: attemptId },
    include: { assessment: { include: { questions: true } },
  });

  if (!attempt) throw new Error('Attempt not found');

  let score = 0;
  const totalQuestions = attempt.assessment.questions.length;

  for (const answer of answers) {
    const question = attempt.assessment.questions.find((q: any) => q.id === answer.questionId);
    if (!question) continue;

    let isCorrect = false;
    if (question.correctAnswer) {
      isCorrect = answer.answer === question.correctAnswer;
    }

    if (isCorrect) score++;

    await prisma.assessmentResponse.create({
      data: {
        attemptId,
        questionId: question.id,
        answer: answer.answer,
        isCorrect,
      },
    });
  }

  const percentage = (score / totalQuestions) * 100;
  const passed = percentage >= 70;

  await prisma.assessmentAttempt.update({
    where: { id: attemptId },
    data: {
      status: passed ? 'passed' : 'failed',
      score: percentage,
      completedAt: new Date(),
    },
  });

  return {
    passed,
    score: percentage,
    message: passed ? 'Checkpoint passed! You may proceed.' : 'Checkpoint failed. Review the material and try again.',
  };
}

export async function getAssessmentResults(userId: string): Promise<any[]> {
  return await prisma.assessmentAttempt.findMany({
    where: { userId },
    include: { assessment: true, responses: true },
    orderBy: { createdAt: 'desc' },
  });
}