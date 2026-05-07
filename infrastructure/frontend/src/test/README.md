# Frontend Infrastructure Unit Tests

This directory contains comprehensive unit tests for the core frontend infrastructure components.

## Test Coverage

### 1. Authentication Flows (`auth.test.tsx`)
Tests for Redux authentication state management:
- **Login Flow**
  - Loading state when login starts
  - Authenticated state on successful login
  - Error state on login failure
- **Logout Flow**
  - Clearing authentication state
  - Removing token from localStorage
- **Token Management**
  - Persisting JWT tokens to localStorage
  - Removing tokens on logout
- **User State Management**
  - Updating user information

### 2. Navigation Components (`navigation.test.tsx`)
Tests for GlobalNavigation and Layout components:
- **GlobalNavigation**
  - Conditional rendering based on authentication
  - Active link highlighting
  - User name display with fallback
  - Logout functionality
  - Logo link to dashboard
- **Layout Component**
  - Rendering GlobalNavigation and main content
  - Proper styling application

### 3. Error Boundary (`error-boundary.test.tsx`)
Tests for ErrorBoundary component behavior:
- Rendering children when no error occurs
- Catching and displaying errors
- Generic error message fallback
- "Try again" button functionality
- Error state reset
- Proper styling in error state
- Console error logging
- Handling multiple children

### 4. Protected Routes (`protected-routes.test.tsx`)
Tests for route protection and authentication-based navigation:
- **Authentication-based Routing**
  - Redirecting unauthenticated users from protected routes
  - Allowing authenticated users to access protected routes
  - Redirecting authenticated users from login/register pages
  - Allowing unauthenticated access to public pages
- **Public Routes**
  - Home page accessibility
  - 404 page for non-existent routes
- **Layout-wrapped Routes**
  - Layout rendering for protected routes
  - No layout for login/register pages
- **Route Parameters**
  - Module routes with parameters
  - Chapter routes with parameters
  - Portfolio routes with optional slug

## Running Tests

### Prerequisites
Ensure all dependencies are installed:
```bash
npm install
```

Required dependencies:
- `vitest` - Test runner
- `@testing-library/react` - React testing utilities
- `@testing-library/jest-dom` - DOM matchers
- `@testing-library/user-event` - User interaction simulation
- `happy-dom` or `jsdom` - DOM environment
- `@vitest/ui` - Optional UI for test results

### Run All Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm test -- --watch
```

### Run Tests with UI
```bash
npm test -- --ui
```

### Run Specific Test File
```bash
npm test -- auth.test.tsx
```

### Run Tests with Coverage
```bash
npm test -- --coverage
```

## Test Structure

### Test Utilities (`test-utils.tsx`)
Provides a custom `renderWithProviders` function that wraps components with:
- Redux Provider with configurable preloaded state
- React Router's BrowserRouter
- Default state for auth, progress, and modules slices

Usage:
```typescript
import { renderWithProviders } from './test-utils';

renderWithProviders(<MyComponent />, {
  preloadedState: {
    auth: {
      isAuthenticated: true,
      user: { id: '1', name: 'Test User' },
      token: 'mock-token',
      loading: false,
      error: null,
    },
  },
});
```

### Test Setup (`setup.ts`)
Configures the test environment:
- Imports `@testing-library/jest-dom` for DOM matchers
- Cleans up after each test
- Mocks localStorage for browser API testing

## Best Practices

1. **Isolation**: Each test is independent and doesn't rely on other tests
2. **Cleanup**: Automatic cleanup after each test prevents state leakage
3. **Mocking**: localStorage and window.location are mocked for consistent testing
4. **Descriptive Names**: Test names clearly describe what is being tested
5. **Arrange-Act-Assert**: Tests follow the AAA pattern for clarity
6. **User-Centric**: Tests simulate real user interactions using `@testing-library/user-event`

## Troubleshooting

### Tests Not Running
- Ensure `vitest` is installed: `npm install --save-dev vitest`
- Check that `vite.config.ts` includes test configuration
- Verify `happy-dom` or `jsdom` is installed

### Import Errors
- Ensure all test dependencies are installed
- Check that `setup.ts` is properly configured in `vite.config.ts`

### State Not Updating
- Verify `renderWithProviders` is used instead of plain `render`
- Check that preloadedState matches the expected Redux state shape

### Async Tests Failing
- Use `await` with `userEvent` methods
- Use `findBy` queries for elements that appear asynchronously
- Increase timeout if needed: `{ timeout: 5000 }`

## Future Enhancements

- Add integration tests for complete user flows
- Add visual regression tests for UI components
- Add performance tests for rendering optimization
- Add accessibility tests using `jest-axe`
- Add E2E tests using Playwright or Cypress
