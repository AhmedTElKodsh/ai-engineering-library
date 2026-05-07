import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

// Code Execution Service - Task 6
export interface ExecutionRequest {
  code: string;
  language: string;
  testCases?: Array<{ input: string; expectedOutput: string }>;
}

export interface ExecutionResult {
  executionId: string;
  output: string;
  errors: string;
  executionTime: number;
  passedTests?: number;
  totalTests?: number;
}

// Execute code (simplified - in production, this would use Docker sandboxes)
export async function executeCode(request: ExecutionRequest, userId: string): Promise<ExecutionResult> {
  const executionId = uuidv4();
  const startTime = Date.now();

  // In a real implementation, this would:
  // 1. Send to Docker sandbox via queue
  // 2. Execute in isolated container
  // 3. Return results
  
  // Simplified simulation for now
  let output = '';
  let errors = '';
  
  try {
    // Basic Python execution simulation
    if (request.language === 'python') {
      if (request.code.includes('def') && request.code.includes('return')) {
        output = 'Code executed successfully (simulated)';
      } else {
        errors = 'Syntax error or missing function definition';
      }
    } else {
      errors = 'Unsupported language';
    }
  } catch (e: any) {
    errors = e.message;
  }

  const executionTime = Date.now() - startTime;

  // Save execution record
  await prisma.codeExecution.create({
    data: {
      userId,
      code: request.code,
      language: request.language,
      output,
      errors: errors || null,
      executionTime,
      status: errors ? 'error' : 'success',
    },
  });

  // Run test cases if provided
  let passedTests = 0;
  let totalTests = 0;
  
  if (request.testCases && request.testCases.length > 0) {
    totalTests = request.testCases.length;
    for (const test of request.testCases) {
      // Simplified test validation
      if (output.includes(test.expectedOutput)) {
        passedTests++;
      }
    }
  }

  return {
    executionId,
    output,
    errors,
    executionTime,
    passedTests: totalTests > 0 ? passedTests : undefined,
    totalTests: totalTests > 0 ? totalTests : undefined,
  };
}

// Get execution history for user
export async function getExecutionHistory(userId: string, limit = 50): Promise<any[]> {
  return await prisma.codeExecution.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
}

// Validate code (basic security checks)
export function validateCode(code: string, language: string): { valid: boolean; errors: string } {
  const errors: string[] = [];
  
  // Check for dangerous patterns
  const dangerousPatterns = [
    /import\s+os/, 
    /import\s+sys/, 
    /exec\(/, 
    /eval\(/, 
    /__import__/,
  ];
  
  for (const pattern of dangerousPatterns) {
    if (pattern.test(code)) {
      errors.push('Potentially unsafe code detected');
      break;
    }
  }
  
  // Check code length
  if (code.length > 10000) {
    errors.push('Code exceeds maximum length (10000 characters)');
  }
  
  return {
    valid: errors.length === 0,
    errors: errors.join('; '),
  };
}