# Unit Tests

This directory contains unit tests for individual service modules.

## Code Execution Service Tests

### Test Coverage

The `code-execution.service.test.ts` file provides comprehensive unit tests for the Code Execution Service, covering:

#### 1. Valid Python Code Execution
- ✅ Execute valid Python code successfully
- ✅ Execute code with function definitions and return statements
- ✅ Track execution time accurately

#### 2. Timeout Handling
- ✅ Handle long-running code with timeout enforcement
- ✅ Handle infinite loops gracefully
- ✅ Enforce 30-second timeout limit
- ✅ Prevent hanging on blocking operations

#### 3. Memory Limit Enforcement
- ✅ Handle memory-intensive operations
- ✅ Reject code exceeding 512MB memory limit
- ✅ Handle recursive memory allocation
- ✅ Enforce container resource limits

#### 4. Error Handling
- ✅ Handle syntax errors (missing parentheses, invalid syntax)
- ✅ Handle runtime errors (ZeroDivisionError, etc.)
- ✅ Handle import errors (nonexistent modules)
- ✅ Handle type errors (type mismatches)
- ✅ Handle name errors (undefined variables)
- ✅ Handle indentation errors
- ✅ Handle missing function definitions
- ✅ Handle unsupported languages

#### 5. Test Case Execution
- ✅ Run test cases and report results
- ✅ Handle failing test cases
- ✅ Handle empty test cases
- ✅ Handle multiple test cases with mixed results

#### 6. Security Validation
- ✅ Reject code with `os` import
- ✅ Reject code with `sys` import
- ✅ Reject code with `exec()` function
- ✅ Reject code with `eval()` function
- ✅ Reject code with `__import__`
- ✅ Accept safe code
- ✅ Reject code exceeding maximum length (10,000 characters)
- ✅ Accept code within length limit

#### 7. Execution History
- ✅ Retrieve execution history for user
- ✅ Limit execution history results
- ✅ Return empty array for users with no history
- ✅ Order history by most recent first

#### 8. Database Logging
- ✅ Log successful executions to database
- ✅ Log failed executions to database
- ✅ Include execution time in database logs

### Running the Tests

```bash
# Run all unit tests
npm test

# Run only code execution service tests
npm test tests/unit/code-execution.service.test.ts

# Run tests in watch mode
npm test:watch

# Run tests with coverage
npm test:coverage
```

### Test Structure

Each test suite follows this structure:

1. **Setup**: Mock Prisma client and test database
2. **Test Cases**: Organized by functionality (valid code, timeouts, errors, etc.)
3. **Assertions**: Verify expected behavior and side effects
4. **Cleanup**: Clear mocks between tests

### Mocking Strategy

- **Prisma Client**: Mocked to avoid database dependencies in unit tests
- **Code Execution**: Simulated responses for different scenarios
- **Test Database**: Utility class for integration tests (not used in unit tests)

### Requirements Coverage

These tests satisfy **Requirement 15 (Code Playground Infrastructure)**:

- Code execution with valid Python code ✅
- Timeout handling for long-running code ✅
- Memory limit enforcement ✅
- Error handling for syntax and runtime errors ✅
- Security validation ✅
- Test case execution ✅
- Execution history tracking ✅
- Database logging ✅

### Future Enhancements

- Add tests for Docker container orchestration
- Add tests for queue-based execution
- Add tests for concurrent execution limits
- Add tests for network isolation
- Add tests for allowed library restrictions
