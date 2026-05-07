import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { renderWithProviders } from './test-utils';
import App from '../App';

describe('Protected Route Logic', () => {
  describe('Authentication-based Routing', () => {
    it('should redirect unauthenticated users from dashboard to login', () => {
      renderWithProviders(
        <MemoryRouter initialEntries={['/dashboard']}>
          <App />
        </MemoryRouter>,
        {
          preloadedState: {
            auth: {
              isAuthenticated: false,
              user: null,
              token: null,
              loading: false,
              error: null,
            },
          },
        }
      );

      // Should be redirected to login page
      expect(screen.getByText(/login/i)).toBeInTheDocument();
    });

    it('should allow authenticated users to access dashboard', () => {
      renderWithProviders(
        <MemoryRouter initialEntries={['/dashboard']}>
          <App />
        </MemoryRouter>,
        {
          preloadedState: {
            auth: {
              isAuthenticated: true,
              user: { id: '1', name: 'Test User', email: 'test@example.com' },
              token: 'mock-token',
              loading: false,
              error: null,
            },
          },
        }
      );

      // Should see dashboard content
      expect(screen.getByText('AI Engineering')).toBeInTheDocument();
    });

    it('should redirect authenticated users from login to dashboard', () => {
      renderWithProviders(
        <MemoryRouter initialEntries={['/login']}>
          <App />
        </MemoryRouter>,
        {
          preloadedState: {
            auth: {
              isAuthenticated: true,
              user: { id: '1', name: 'Test User', email: 'test@example.com' },
              token: 'mock-token',
              loading: false,
              error: null,
            },
          },
        }
      );

      // Should be redirected to dashboard
      expect(screen.getByText('AI Engineering')).toBeInTheDocument();
    });

    it('should redirect authenticated users from register to dashboard', () => {
      renderWithProviders(
        <MemoryRouter initialEntries={['/register']}>
          <App />
        </MemoryRouter>,
        {
          preloadedState: {
            auth: {
              isAuthenticated: true,
              user: { id: '1', name: 'Test User', email: 'test@example.com' },
              token: 'mock-token',
              loading: false,
              error: null,
            },
          },
        }
      );

      // Should be redirected to dashboard
      expect(screen.getByText('AI Engineering')).toBeInTheDocument();
    });

    it('should allow unauthenticated users to access login page', () => {
      renderWithProviders(
        <MemoryRouter initialEntries={['/login']}>
          <App />
        </MemoryRouter>,
        {
          preloadedState: {
            auth: {
              isAuthenticated: false,
              user: null,
              token: null,
              loading: false,
              error: null,
            },
          },
        }
      );

      expect(screen.getByText(/login/i)).toBeInTheDocument();
    });

    it('should allow unauthenticated users to access register page', () => {
      renderWithProviders(
        <MemoryRouter initialEntries={['/register']}>
          <App />
        </MemoryRouter>,
        {
          preloadedState: {
            auth: {
              isAuthenticated: false,
              user: null,
              token: null,
              loading: false,
              error: null,
            },
          },
        }
      );

      expect(screen.getByText(/register/i)).toBeInTheDocument();
    });
  });

  describe('Public Routes', () => {
    it('should allow access to home page without authentication', () => {
      renderWithProviders(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>,
        {
          preloadedState: {
            auth: {
              isAuthenticated: false,
              user: null,
              token: null,
              loading: false,
              error: null,
            },
          },
        }
      );

      // Home page should be accessible
      expect(screen.getByText(/AI Engineering Curriculum/i)).toBeInTheDocument();
    });

    it('should show 404 page for non-existent routes', () => {
      renderWithProviders(
        <MemoryRouter initialEntries={['/non-existent-route']}>
          <App />
        </MemoryRouter>,
        {
          preloadedState: {
            auth: {
              isAuthenticated: false,
              user: null,
              token: null,
              loading: false,
              error: null,
            },
          },
        }
      );

      expect(screen.getByText(/404/i)).toBeInTheDocument();
    });
  });

  describe('Layout-wrapped Routes', () => {
    it('should render Layout component for protected routes', () => {
      const { container } = renderWithProviders(
        <MemoryRouter initialEntries={['/dashboard']}>
          <App />
        </MemoryRouter>,
        {
          preloadedState: {
            auth: {
              isAuthenticated: true,
              user: { id: '1', name: 'Test User', email: 'test@example.com' },
              token: 'mock-token',
              loading: false,
              error: null,
            },
          },
        }
      );

      // Layout should be present (contains GlobalNavigation)
      expect(screen.getByText('AI Engineering')).toBeInTheDocument();
      expect(container.querySelector('nav')).toBeInTheDocument();
    });

    it('should not render Layout for login page', () => {
      const { container } = renderWithProviders(
        <MemoryRouter initialEntries={['/login']}>
          <App />
        </MemoryRouter>,
        {
          preloadedState: {
            auth: {
              isAuthenticated: false,
              user: null,
              token: null,
              loading: false,
              error: null,
            },
          },
        }
      );

      // Layout navigation should not be present
      expect(container.querySelector('nav')).not.toBeInTheDocument();
    });
  });

  describe('Route Parameters', () => {
    it('should handle module routes with parameters', () => {
      renderWithProviders(
        <MemoryRouter initialEntries={['/modules/123']}>
          <App />
        </MemoryRouter>,
        {
          preloadedState: {
            auth: {
              isAuthenticated: true,
              user: { id: '1', name: 'Test User' },
              token: 'mock-token',
              loading: false,
              error: null,
            },
          },
        }
      );

      // Module page should render
      expect(screen.getByText('AI Engineering')).toBeInTheDocument();
    });

    it('should handle chapter routes with parameters', () => {
      renderWithProviders(
        <MemoryRouter initialEntries={['/chapters/456']}>
          <App />
        </MemoryRouter>,
        {
          preloadedState: {
            auth: {
              isAuthenticated: true,
              user: { id: '1', name: 'Test User' },
              token: 'mock-token',
              loading: false,
              error: null,
            },
          },
        }
      );

      // Chapter page should render
      expect(screen.getByText('AI Engineering')).toBeInTheDocument();
    });

    it('should handle portfolio routes with optional slug parameter', () => {
      renderWithProviders(
        <MemoryRouter initialEntries={['/portfolio/john-doe']}>
          <App />
        </MemoryRouter>,
        {
          preloadedState: {
            auth: {
              isAuthenticated: true,
              user: { id: '1', name: 'Test User' },
              token: 'mock-token',
              loading: false,
              error: null,
            },
          },
        }
      );

      // Portfolio page should render
      expect(screen.getByText('AI Engineering')).toBeInTheDocument();
    });
  });
});
