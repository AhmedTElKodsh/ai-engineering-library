import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from './test-utils';
import GlobalNavigation from '../components/GlobalNavigation';
import Layout from '../components/Layout';

describe('Navigation Components', () => {
  describe('GlobalNavigation', () => {
    it('should not render when user is not authenticated', () => {
      const { container } = renderWithProviders(<GlobalNavigation />, {
        preloadedState: {
          auth: {
            isAuthenticated: false,
            user: null,
            token: null,
            loading: false,
            error: null,
          },
        },
      });

      expect(container.firstChild).toBe(null);
    });

    it('should render navigation when user is authenticated', () => {
      renderWithProviders(<GlobalNavigation />, {
        preloadedState: {
          auth: {
            isAuthenticated: true,
            user: { id: '1', name: 'Test User', email: 'test@example.com' },
            token: 'mock-token',
            loading: false,
            error: null,
          },
        },
      });

      expect(screen.getByText('AI Engineering')).toBeInTheDocument();
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Portfolio')).toBeInTheDocument();
    });

    it('should display user name when authenticated', () => {
      renderWithProviders(<GlobalNavigation />, {
        preloadedState: {
          auth: {
            isAuthenticated: true,
            user: { id: '1', name: 'John Doe', email: 'john@example.com' },
            token: 'mock-token',
            loading: false,
            error: null,
          },
        },
      });

      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    it('should display "User" as fallback when name is not available', () => {
      renderWithProviders(<GlobalNavigation />, {
        preloadedState: {
          auth: {
            isAuthenticated: true,
            user: { id: '1', email: 'test@example.com' },
            token: 'mock-token',
            loading: false,
            error: null,
          },
        },
      });

      expect(screen.getByText('User')).toBeInTheDocument();
    });

    it('should highlight active navigation link', () => {
      renderWithProviders(<GlobalNavigation />, {
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

      const dashboardLink = screen.getByText('Dashboard');
      expect(dashboardLink).toHaveClass('bg-blue-50', 'text-blue-700');
    });

    it('should handle logout button click', async () => {
      const user = userEvent.setup();
      
      // Mock window.location
      delete (window as any).location;
      window.location = { href: '' } as any;

      renderWithProviders(<GlobalNavigation />, {
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

      const logoutButton = screen.getByText('Logout');
      await user.click(logoutButton);

      expect(localStorage.getItem('token')).toBe(null);
      expect(window.location.href).toBe('/login');
    });

    it('should render logo link to dashboard', () => {
      renderWithProviders(<GlobalNavigation />, {
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

      const logoLink = screen.getByText('AI Engineering').closest('a');
      expect(logoLink).toHaveAttribute('href', '/dashboard');
    });
  });

  describe('Layout Component', () => {
    it('should render GlobalNavigation and main content area', () => {
      const { container } = renderWithProviders(<Layout />, {
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

      expect(screen.getByText('AI Engineering')).toBeInTheDocument();
      expect(container.querySelector('main')).toBeInTheDocument();
    });

    it('should apply correct styling classes', () => {
      const { container } = renderWithProviders(<Layout />, {
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

      const layoutDiv = container.firstChild;
      expect(layoutDiv).toHaveClass('min-h-screen', 'bg-gray-50');
    });
  });
});
