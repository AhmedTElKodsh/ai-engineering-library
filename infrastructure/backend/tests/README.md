# Backend Integration Tests

This directory contains comprehensive integration tests for the AI Engineering Curriculum Platform backend services.

## Test Structure

```
tests/
├── setup.ts                          # Global test setup and configuration
├── utils/
│   └── test-helpers.ts              # Test utilities and helper functions
└── integration/
    ├── auth.test.ts                 # Authentication and authorization tests
    ├── content.test.ts              # Content retrieval and caching tests
    ├── progress.test.ts             # Progress tracking and checkpoint gating tests
    ├── assessment.test.ts           # Assessment scoring and recommendations tests
    └── daily-milestone-duration.test.ts  # Daily content, milestones, and duration tests
```

## Prerequisites

Before running tests, ensure you have:

1. **PostgreSQL Test Database**: Set up a separate test database
2. **Redis Test Instance**: Set up a separate Redis instance for testing
3. **Environment Variables**: Configure test environment variables

### Environment Setup

Create a `.env.test` file in the backend directory:

```bash
NODE_ENV=test
TEST_DATABASE_URL=postgresql://test:test@localhost:5432/ai_curriculum_test
TEST_REDIS_URL=redis://localhost:6379
JWT_SECRET=test-secret-key
```

### Database Setup

Create the test database:

```bash
# Create test database
createdb ai_curriculum_test

# Run migrations
DATABASE_URL=$TEST_DATABASE_URL npm run prisma:migrate
```

## Running Tests

### Run All Integration Tests

```bash
npm run test:integration
```

### Run Specific Test Suite

```bash
# Authentication tests
npm test -- auth.test.ts

# Content tests
npm test -- content.test.ts

# Progress tests
npm test -- progress.test.ts

# Assessment tests
npm test -- assessment.test.ts

# Daily content, milestones, and duration tests
npm test -- daily-milestone-duration.test.ts
```

### Run Tests in Watch Mode

```bash
npm run test:watch
```

### Generate Coverage Report

```bash
npm run test:coverage
```

## Test Coverage

The integration tests cover the following requirements:

### Authentication and Authorization (auth.test.ts)
- ✅ User registration and login
- ✅ Password hashing and validation
- ✅ JWT token generation and validation
- ✅ OAuth authentication (Google, GitHub)
- ✅ Role-based access control (RBAC)
- ✅ Session management with Redis

### Content Retrieval and Caching (content.test.ts)
- ✅ Module and chapter retrieval
- ✅ Redis caching for content
- ✅ Cache invalidation on updates
- ✅ Daily content retrieval
- ✅ Week schedule with completion status
- ✅ Content search functionality
- ✅ Content versioning

### Progress Tracking and Checkpoint Gating (progress.test.ts)
- ✅ Chapter completion tracking
- ✅ Time spent tracking
- ✅ Module completion detection
- ✅ Progress percentage calculation
- ✅ Checkpoint unlocking logic
- ✅ Checkpoint attempt tracking
- ✅ Gap analysis on checkpoint failure
- ✅ Progress caching with Redis
- ✅ Current week and day tracking

### Assessment Scoring and Recommendations (assessment.test.ts)
- ✅ Python diagnostic assessment scoring
- ✅ AI engineering diagnostic assessment scoring
- ✅ Entry point recommendations (Module 0-3)
- ✅ Topic breakdown for diagnostics
- ✅ Multiple-choice question scoring
- ✅ Coding question evaluation
- ✅ Short-answer question scoring
- ✅ Assessment attempt tracking
- ✅ Recommendation rationale
- ✅ Override warnings

### Daily Content, Milestones, and Duration (daily-milestone-duration.test.ts)
- ✅ Daily content retrieval with completion status
- ✅ Current day calculation based on progress
- ✅ Mini-project marking (Day 5)
- ✅ Flagship project marking (final week)
- ✅ Milestone unlocking on module completion
- ✅ Milestone unlocking on checkpoint pass
- ✅ Social sharing URL generation
- ✅ Shared platform tracking
- ✅ Total weeks calculation by entry point
- ✅ Completion date calculation
- ✅ Weekly hours recalculation
- ✅ Current pace tracking
- ✅ Adjustment recommendations
- ✅ Timeline data generation
- ✅ Duration caching

## Test Utilities

### TestDatabase
Manages PostgreSQL test database connections and cleanup.

```typescript
const testDb = new TestDatabase();
await testDb.connect();
await testDb.cleanup(); // Clears all data
await testDb.disconnect();
```

### TestRedis
Manages Redis test instance connections and cleanup.

```typescript
const testRedis = new TestRedis();
await testRedis.connect();
await testRedis.cleanup(); // Flushes all keys
await testRedis.disconnect();
```

### Helper Functions

- `createTestUser()` - Create test user
- `createTestModule()` - Create test module
- `createTestWeek()` - Create test week
- `createTestChapter()` - Create test chapter
- `createTestDailyContent()` - Create test daily content
- `createTestMilestone()` - Create test milestone
- `createTestLearningPath()` - Create test learning path
- `createTestProgress()` - Create test progress record
- `generateTestToken()` - Generate JWT token for testing

## Best Practices

1. **Isolation**: Each test is isolated with `beforeEach` cleanup
2. **Real Dependencies**: Tests use real PostgreSQL and Redis instances
3. **No Mocking**: Integration tests avoid mocking to test real interactions
4. **Cleanup**: All tests clean up data after execution
5. **Assertions**: Tests use specific assertions with clear expectations
6. **Coverage**: Tests cover happy paths, edge cases, and error scenarios

## Troubleshooting

### Database Connection Errors

If you see database connection errors:

```bash
# Check if PostgreSQL is running
pg_isready

# Verify test database exists
psql -l | grep ai_curriculum_test

# Check connection string
echo $TEST_DATABASE_URL
```

### Redis Connection Errors

If you see Redis connection errors:

```bash
# Check if Redis is running
redis-cli ping

# Verify Redis URL
echo $TEST_REDIS_URL
```

### Test Timeouts

If tests timeout, increase the timeout in `jest.config.js`:

```javascript
testTimeout: 60000, // 60 seconds
```

## CI/CD Integration

These tests are designed to run in CI/CD pipelines. See `.github/workflows/ci-cd.yml` for the automated test execution configuration.

## Contributing

When adding new tests:

1. Follow the existing test structure
2. Use test helpers for data creation
3. Clean up data in `beforeEach`
4. Add descriptive test names
5. Test both success and failure scenarios
6. Update this README with new test coverage
