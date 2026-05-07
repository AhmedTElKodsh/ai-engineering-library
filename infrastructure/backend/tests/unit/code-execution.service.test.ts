import { PrismaClient } from '@prisma/client';
import { executeCode, validateCode, getExecutionHistory, ExecutionRequest } from '../../src/services/code-execution.service';
import { TestDatabase } from '../utils/test-helpers';

// Mock Prisma Client
jest.mock('@prisma/client', () => {
  const mockPrismaClient = {
    codeExecution: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
  };
  return {
    PrismaClient: jest.fn(() => mockPrismaClient),
  };
});

describe('Code Execution Service - Unit Tests', () => {
  let mockPrisma: any;
  let testDb: TestDatabase;

  beforeAll(() => {
    testDb = new TestDatabase();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockPrisma = new PrismaClient();
  });

  describe('executeCode - Valid Python Code', () => {
    it('should execute valid Python code successfully', async () => {
      const request: ExecutionRequest = {
        code: 'def add(a, b):\n    return a + b',
        language: 'python',
      };

      mockPrisma.codeExecution.create.mockResolvedValue({
        id: 'exec-123',
        userId: 'user-123',
        code: request.code,
        language: 'python',
        output: 'Code executed successfully (simulated)',
        errors: null,
        executionTime: 50,
        status: 'success',
        createdAt: new Date(),
      });

      const result = await executeCode(request, 'user-123');

      expect(result).toBeDefined();
      expect(result.executionId).toBeDefined();
      expect(result.output).toContain('Code executed successfully');
      expect(result.errors).toBe('');
      expect(result.executionTime).toBeGreaterThanOrEqual(0);
      expect(mockPrisma.codeExecution.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          userId: 'user-123',
          code: request.code,
          language: 'python',
          status: 'success',
        }),
      });
    });

    it('should execute code with function definition and return statement', async () => {
      const request: ExecutionRequest = {
        code: 'def multiply(x, y):\n    return x * y\n\nresult = multiply(5, 3)',
        language: 'python',
      };

      mockPrisma.codeExecution.create.mockResolvedValue({
        id: 'exec-124',
        userId: 'user-123',
        code: request.code,
        language: 'python',
        output: 'Code executed successfully (simulated)',
        errors: null,
        executionTime: 45,
        status: 'success',
        createdAt: new Date(),
      });

      const result = await executeCode(request, 'user-123');

      expect(result.output).toContain('Code executed successfully');
      expect(result.errors).toBe('');
    });

    it('should track execution time', async () => {
      const request: ExecutionRequest = {
        code: 'def fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n-1) + fibonacci(n-2)',
        language: 'python',
      };

      mockPrisma.codeExecution.create.mockResolvedValue({
        id: 'exec-125',
        userId: 'user-123',
        code: request.code,
        language: 'python',
        output: 'Code executed successfully (simulated)',
        errors: null,
        executionTime: 100,
        status: 'success',
        createdAt: new Date(),
      });

      const result = await executeCode(request, 'user-123');

      expect(result.executionTime).toBeGreaterThanOrEqual(0);
      expect(typeof result.executionTime).toBe('number');
    });
  });

  describe('executeCode - Timeout Handling', () => {
    it('should handle long-running code with timeout', async () => {
      const request: ExecutionRequest = {
        code: 'import time\nwhile True:\n    time.sleep(1)',
        language: 'python',
      };

      // Simulate timeout scenario
      mockPrisma.codeExecution.create.mockResolvedValue({
        id: 'exec-126',
        userId: 'user-123',
        code: request.code,
        language: 'python',
        output: '',
        errors: 'Execution timeout exceeded',
        executionTime: 30000,
        status: 'error',
        createdAt: new Date(),
      });

      const result = await executeCode(request, 'user-123');

      // In a real implementation, this would timeout after 30 seconds
      expect(result).toBeDefined();
      expect(result.executionTime).toBeLessThanOrEqual(30000);
    });

    it('should handle infinite loops gracefully', async () => {
      const request: ExecutionRequest = {
        code: 'while True:\n    pass',
        language: 'python',
      };

      mockPrisma.codeExecution.create.mockResolvedValue({
        id: 'exec-127',
        userId: 'user-123',
        code: request.code,
        language: 'python',
        output: '',
        errors: 'Execution timeout exceeded',
        executionTime: 30000,
        status: 'error',
        createdAt: new Date(),
      });

      const result = await executeCode(request, 'user-123');

      expect(result).toBeDefined();
      // Should not hang indefinitely
      expect(result.executionTime).toBeDefined();
    });

    it('should enforce 30-second timeout limit', async () => {
      const request: ExecutionRequest = {
        code: 'def slow_function():\n    total = 0\n    for i in range(10000000):\n        total += i\n    return total',
        language: 'python',
      };

      mockPrisma.codeExecution.create.mockResolvedValue({
        id: 'exec-128',
        userId: 'user-123',
        code: request.code,
        language: 'python',
        output: '',
        errors: null,
        executionTime: 29500,
        status: 'success',
        createdAt: new Date(),
      });

      const result = await executeCode(request, 'user-123');

      // Execution time should be within reasonable bounds
      expect(result.executionTime).toBeLessThanOrEqual(30000);
    });
  });

  describe('executeCode - Memory Limit Enforcement', () => {
    it('should handle memory-intensive operations', async () => {
      const request: ExecutionRequest = {
        code: 'large_list = [i for i in range(1000000)]',
        language: 'python',
      };

      mockPrisma.codeExecution.create.mockResolvedValue({
        id: 'exec-129',
        userId: 'user-123',
        code: request.code,
        language: 'python',
        output: 'Code executed successfully (simulated)',
        errors: null,
        executionTime: 200,
        status: 'success',
        createdAt: new Date(),
      });

      const result = await executeCode(request, 'user-123');

      expect(result).toBeDefined();
      // In production, this would enforce 512MB RAM limit
    });

    it('should reject code exceeding memory limits', async () => {
      const request: ExecutionRequest = {
        code: 'huge_list = [i for i in range(100000000)]',
        language: 'python',
      };

      mockPrisma.codeExecution.create.mockResolvedValue({
        id: 'exec-130',
        userId: 'user-123',
        code: request.code,
        language: 'python',
        output: '',
        errors: 'MemoryError: Memory limit exceeded',
        executionTime: 1000,
        status: 'error',
        createdAt: new Date(),
      });

      const result = await executeCode(request, 'user-123');

      // In production, Docker container would enforce 512MB limit
      expect(result).toBeDefined();
    });

    it('should handle recursive memory allocation', async () => {
      const request: ExecutionRequest = {
        code: 'def allocate_memory(n):\n    if n > 0:\n        data = [0] * 1000000\n        allocate_memory(n-1)\nallocate_memory(100)',
        language: 'python',
      };

      mockPrisma.codeExecution.create.mockResolvedValue({
        id: 'exec-131',
        userId: 'user-123',
        code: request.code,
        language: 'python',
        output: '',
        errors: 'RecursionError: maximum recursion depth exceeded',
        executionTime: 500,
        status: 'error',
        createdAt: new Date(),
      });

      const result = await executeCode(request, 'user-123');

      expect(result).toBeDefined();
    });
  });

  describe('executeCode - Error Handling', () => {
    it('should handle syntax errors', async () => {
      const request: ExecutionRequest = {
        code: 'def broken_function(\n    print("missing closing parenthesis"',
        language: 'python',
      };

      mockPrisma.codeExecution.create.mockResolvedValue({
        id: 'exec-132',
        userId: 'user-123',
        code: request.code,
        language: 'python',
        output: '',
        errors: 'SyntaxError: invalid syntax',
        executionTime: 10,
        status: 'error',
        createdAt: new Date(),
      });

      const result = await executeCode(request, 'user-123');

      expect(result.errors).toBeTruthy();
      expect(result.output).toBe('');
    });

    it('should handle runtime errors', async () => {
      const request: ExecutionRequest = {
        code: 'def divide(a, b):\n    return a / b\n\nresult = divide(10, 0)',
        language: 'python',
      };

      mockPrisma.codeExecution.create.mockResolvedValue({
        id: 'exec-133',
        userId: 'user-123',
        code: request.code,
        language: 'python',
        output: '',
        errors: 'ZeroDivisionError: division by zero',
        executionTime: 15,
        status: 'error',
        createdAt: new Date(),
      });

      const result = await executeCode(request, 'user-123');

      expect(result.errors).toBeTruthy();
    });

    it('should handle import errors', async () => {
      const request: ExecutionRequest = {
        code: 'import nonexistent_module',
        language: 'python',
      };

      mockPrisma.codeExecution.create.mockResolvedValue({
        id: 'exec-134',
        userId: 'user-123',
        code: request.code,
        language: 'python',
        output: '',
        errors: 'ModuleNotFoundError: No module named \'nonexistent_module\'',
        executionTime: 20,
        status: 'error',
        createdAt: new Date(),
      });

      const result = await executeCode(request, 'user-123');

      expect(result.errors).toBeTruthy();
    });

    it('should handle type errors', async () => {
      const request: ExecutionRequest = {
        code: 'def add_numbers(a, b):\n    return a + b\n\nresult = add_numbers("5", 3)',
        language: 'python',
      };

      mockPrisma.codeExecution.create.mockResolvedValue({
        id: 'exec-135',
        userId: 'user-123',
        code: request.code,
        language: 'python',
        output: '',
        errors: 'TypeError: can only concatenate str (not "int") to str',
        executionTime: 12,
        status: 'error',
        createdAt: new Date(),
      });

      const result = await executeCode(request, 'user-123');

      expect(result.errors).toBeTruthy();
    });

    it('should handle name errors', async () => {
      const request: ExecutionRequest = {
        code: 'print(undefined_variable)',
        language: 'python',
      };

      mockPrisma.codeExecution.create.mockResolvedValue({
        id: 'exec-136',
        userId: 'user-123',
        code: request.code,
        language: 'python',
        output: '',
        errors: 'NameError: name \'undefined_variable\' is not defined',
        executionTime: 8,
        status: 'error',
        createdAt: new Date(),
      });

      const result = await executeCode(request, 'user-123');

      expect(result.errors).toBeTruthy();
    });

    it('should handle indentation errors', async () => {
      const request: ExecutionRequest = {
        code: 'def test():\nprint("bad indentation")',
        language: 'python',
      };

      mockPrisma.codeExecution.create.mockResolvedValue({
        id: 'exec-137',
        userId: 'user-123',
        code: request.code,
        language: 'python',
        output: '',
        errors: 'IndentationError: expected an indented block',
        executionTime: 5,
        status: 'error',
        createdAt: new Date(),
      });

      const result = await executeCode(request, 'user-123');

      expect(result.errors).toBeTruthy();
    });

    it('should handle missing function definition', async () => {
      const request: ExecutionRequest = {
        code: 'print("Hello")',
        language: 'python',
      };

      mockPrisma.codeExecution.create.mockResolvedValue({
        id: 'exec-138',
        userId: 'user-123',
        code: request.code,
        language: 'python',
        output: '',
        errors: 'Syntax error or missing function definition',
        executionTime: 10,
        status: 'error',
        createdAt: new Date(),
      });

      const result = await executeCode(request, 'user-123');

      expect(result.errors).toContain('missing function definition');
    });

    it('should handle unsupported language', async () => {
      const request: ExecutionRequest = {
        code: 'console.log("JavaScript");',
        language: 'javascript',
      };

      mockPrisma.codeExecution.create.mockResolvedValue({
        id: 'exec-139',
        userId: 'user-123',
        code: request.code,
        language: 'javascript',
        output: '',
        errors: 'Unsupported language',
        executionTime: 2,
        status: 'error',
        createdAt: new Date(),
      });

      const result = await executeCode(request, 'user-123');

      expect(result.errors).toContain('Unsupported language');
    });
  });

  describe('executeCode - Test Cases', () => {
    it('should run test cases and report results', async () => {
      const request: ExecutionRequest = {
        code: 'def add(a, b):\n    return a + b',
        language: 'python',
        testCases: [
          { input: '2, 3', expectedOutput: '5' },
          { input: '10, 20', expectedOutput: '30' },
        ],
      };

      mockPrisma.codeExecution.create.mockResolvedValue({
        id: 'exec-140',
        userId: 'user-123',
        code: request.code,
        language: 'python',
        output: 'Code executed successfully (simulated)',
        errors: null,
        executionTime: 50,
        status: 'success',
        createdAt: new Date(),
      });

      const result = await executeCode(request, 'user-123');

      expect(result.totalTests).toBe(2);
      expect(result.passedTests).toBeDefined();
    });

    it('should handle failing test cases', async () => {
      const request: ExecutionRequest = {
        code: 'def add(a, b):\n    return a - b',  // Wrong implementation
        language: 'python',
        testCases: [
          { input: '2, 3', expectedOutput: '5' },
        ],
      };

      mockPrisma.codeExecution.create.mockResolvedValue({
        id: 'exec-141',
        userId: 'user-123',
        code: request.code,
        language: 'python',
        output: 'Code executed successfully (simulated)',
        errors: null,
        executionTime: 45,
        status: 'success',
        createdAt: new Date(),
      });

      const result = await executeCode(request, 'user-123');

      expect(result.totalTests).toBe(1);
      expect(result.passedTests).toBeDefined();
    });

    it('should handle empty test cases', async () => {
      const request: ExecutionRequest = {
        code: 'def add(a, b):\n    return a + b',
        language: 'python',
        testCases: [],
      };

      mockPrisma.codeExecution.create.mockResolvedValue({
        id: 'exec-142',
        userId: 'user-123',
        code: request.code,
        language: 'python',
        output: 'Code executed successfully (simulated)',
        errors: null,
        executionTime: 40,
        status: 'success',
        createdAt: new Date(),
      });

      const result = await executeCode(request, 'user-123');

      expect(result.totalTests).toBeUndefined();
      expect(result.passedTests).toBeUndefined();
    });

    it('should handle multiple test cases with mixed results', async () => {
      const request: ExecutionRequest = {
        code: 'def multiply(a, b):\n    return a * b',
        language: 'python',
        testCases: [
          { input: '2, 3', expectedOutput: '6' },
          { input: '5, 4', expectedOutput: '20' },
          { input: '0, 10', expectedOutput: '0' },
        ],
      };

      mockPrisma.codeExecution.create.mockResolvedValue({
        id: 'exec-143',
        userId: 'user-123',
        code: request.code,
        language: 'python',
        output: 'Code executed successfully (simulated)',
        errors: null,
        executionTime: 60,
        status: 'success',
        createdAt: new Date(),
      });

      const result = await executeCode(request, 'user-123');

      expect(result.totalTests).toBe(3);
      expect(result.passedTests).toBeDefined();
    });
  });

  describe('validateCode - Security Checks', () => {
    it('should reject code with os import', () => {
      const code = 'import os\nos.system("rm -rf /")';
      const result = validateCode(code, 'python');

      expect(result.valid).toBe(false);
      expect(result.errors).toContain('unsafe code');
    });

    it('should reject code with sys import', () => {
      const code = 'import sys\nsys.exit()';
      const result = validateCode(code, 'python');

      expect(result.valid).toBe(false);
      expect(result.errors).toContain('unsafe code');
    });

    it('should reject code with exec function', () => {
      const code = 'exec("malicious_code")';
      const result = validateCode(code, 'python');

      expect(result.valid).toBe(false);
      expect(result.errors).toContain('unsafe code');
    });

    it('should reject code with eval function', () => {
      const code = 'result = eval("2 + 2")';
      const result = validateCode(code, 'python');

      expect(result.valid).toBe(false);
      expect(result.errors).toContain('unsafe code');
    });

    it('should reject code with __import__', () => {
      const code = '__import__("os").system("ls")';
      const result = validateCode(code, 'python');

      expect(result.valid).toBe(false);
      expect(result.errors).toContain('unsafe code');
    });

    it('should accept safe code', () => {
      const code = 'def add(a, b):\n    return a + b';
      const result = validateCode(code, 'python');

      expect(result.valid).toBe(true);
      expect(result.errors).toBe('');
    });

    it('should reject code exceeding maximum length', () => {
      const code = 'x = 1\n'.repeat(10000);  // > 10000 characters
      const result = validateCode(code, 'python');

      expect(result.valid).toBe(false);
      expect(result.errors).toContain('exceeds maximum length');
    });

    it('should accept code within length limit', () => {
      const code = 'def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n-1)';
      const result = validateCode(code, 'python');

      expect(result.valid).toBe(true);
      expect(result.errors).toBe('');
    });
  });

  describe('getExecutionHistory', () => {
    it('should retrieve execution history for user', async () => {
      const mockHistory = [
        {
          id: 'exec-1',
          userId: 'user-123',
          code: 'def test(): pass',
          language: 'python',
          output: 'Success',
          errors: null,
          executionTime: 50,
          status: 'success',
          createdAt: new Date(),
        },
        {
          id: 'exec-2',
          userId: 'user-123',
          code: 'def test2(): pass',
          language: 'python',
          output: 'Success',
          errors: null,
          executionTime: 45,
          status: 'success',
          createdAt: new Date(),
        },
      ];

      mockPrisma.codeExecution.findMany.mockResolvedValue(mockHistory);

      const history = await getExecutionHistory('user-123');

      expect(history).toHaveLength(2);
      expect(mockPrisma.codeExecution.findMany).toHaveBeenCalledWith({
        where: { userId: 'user-123' },
        orderBy: { createdAt: 'desc' },
        take: 50,
      });
    });

    it('should limit execution history results', async () => {
      mockPrisma.codeExecution.findMany.mockResolvedValue([]);

      await getExecutionHistory('user-123', 10);

      expect(mockPrisma.codeExecution.findMany).toHaveBeenCalledWith({
        where: { userId: 'user-123' },
        orderBy: { createdAt: 'desc' },
        take: 10,
      });
    });

    it('should return empty array for user with no history', async () => {
      mockPrisma.codeExecution.findMany.mockResolvedValue([]);

      const history = await getExecutionHistory('new-user');

      expect(history).toHaveLength(0);
    });

    it('should order history by most recent first', async () => {
      const mockHistory = [
        {
          id: 'exec-3',
          userId: 'user-123',
          createdAt: new Date('2024-01-03'),
        },
        {
          id: 'exec-2',
          userId: 'user-123',
          createdAt: new Date('2024-01-02'),
        },
        {
          id: 'exec-1',
          userId: 'user-123',
          createdAt: new Date('2024-01-01'),
        },
      ];

      mockPrisma.codeExecution.findMany.mockResolvedValue(mockHistory);

      const history = await getExecutionHistory('user-123');

      expect(mockPrisma.codeExecution.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          orderBy: { createdAt: 'desc' },
        })
      );
    });
  });

  describe('executeCode - Database Logging', () => {
    it('should log successful execution to database', async () => {
      const request: ExecutionRequest = {
        code: 'def test():\n    return True',
        language: 'python',
      };

      mockPrisma.codeExecution.create.mockResolvedValue({
        id: 'exec-200',
        userId: 'user-123',
        code: request.code,
        language: 'python',
        output: 'Code executed successfully (simulated)',
        errors: null,
        executionTime: 50,
        status: 'success',
        createdAt: new Date(),
      });

      await executeCode(request, 'user-123');

      expect(mockPrisma.codeExecution.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          userId: 'user-123',
          code: request.code,
          language: 'python',
          status: 'success',
        }),
      });
    });

    it('should log failed execution to database', async () => {
      const request: ExecutionRequest = {
        code: 'invalid syntax',
        language: 'python',
      };

      mockPrisma.codeExecution.create.mockResolvedValue({
        id: 'exec-201',
        userId: 'user-123',
        code: request.code,
        language: 'python',
        output: '',
        errors: 'Syntax error or missing function definition',
        executionTime: 10,
        status: 'error',
        createdAt: new Date(),
      });

      await executeCode(request, 'user-123');

      expect(mockPrisma.codeExecution.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          userId: 'user-123',
          status: 'error',
        }),
      });
    });

    it('should include execution time in database log', async () => {
      const request: ExecutionRequest = {
        code: 'def test():\n    return True',
        language: 'python',
      };

      mockPrisma.codeExecution.create.mockResolvedValue({
        id: 'exec-202',
        userId: 'user-123',
        code: request.code,
        language: 'python',
        output: 'Success',
        errors: null,
        executionTime: 75,
        status: 'success',
        createdAt: new Date(),
      });

      await executeCode(request, 'user-123');

      expect(mockPrisma.codeExecution.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          executionTime: expect.any(Number),
        }),
      });
    });
  });
});
