import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import PortfolioDashboard from '../PortfolioDashboard';

// Mock Redux store
const createTestStore = (initialState = {}) => {
  const defaultState = {
    auth: { token: 'test-token', user: { id: 'user-123' } },
    portfolio: {
      projects: [
        {
          id: 'proj-1',
          title: 'Test Project',
          status: 'approved',
          type: 'mini-project',
          isPortfolioReady: true,
        },
      ],
      loading: false,
    },
  };
  return configureStore({
    reducer: {
      auth: (state = defaultState.auth) => state,
      portfolio: (state = defaultState.portfolio) => state,
    },
    preloadedState: { ...defaultState, ...initialState },
  });
};

// Mock API
jest.mock('../../services/api', () => ({
  getPortfolio: jest.fn(() => Promise.resolve({
    projects: [],
    completeness: 50,
    totalProjects: 5,
    readyCount: 2,
  })),
  generatePublicPortfolio: jest.fn(() => Promise.resolve({
    slug: 'test-portfolio',
    url: 'http://localhost:3001/portfolio/test-portfolio',
  })),
  exportPortfolio: jest.fn(() => Promise.resolve({
    url: 'http://localhost:3001/exports/portfolio.pdf',
  })),
}));

describe('PortfolioDashboard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render portfolio dashboard', async () => {
    const store = createTestStore();
    
    render(
      <Provider store={store}>
        <PortfolioDashboard />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/portfolio/i)).toBeInTheDocument();
    });
  });

  it('should display project cards', async () => {
    const store = createTestStore();
    
    render(
      <Provider store={store}>
        <PortfolioDashboard />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/test project/i)).toBeInTheDocument();
    });
  });

  it('should show portfolio completeness', async () => {
    const store = createTestStore();
    
    render(
      <Provider store={store}>
        <PortfolioDashboard />
      </Provider>
    );

    await waitFor(() => {
      const progressBar = screen.getByRole('progressbar') || screen.getByTestId('completeness-bar');
      if (progressBar) {
        expect(progressBar).toBeInTheDocument();
      }
    });
  });

  it('should have generate public portfolio button', async () => {
    const store = createTestStore();
    
    render(
      <Provider store={store}>
        <PortfolioDashboard />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/generate.*public/i) || screen.getByRole('button', { name: /public/i })).toBeInTheDocument();
    });
  });

  it('should trigger public portfolio generation', async () => {
    const store = createTestStore();
    
    render(
      <Provider store={store}>
        <PortfolioDashboard />
      </Provider>
    );

    await waitFor(() => {
      const generateBtn = screen.getByText(/generate.*public/i) || screen.getAllByRole('button')[0];
      if (generateBtn) {
        fireEvent.click(generateBtn);
      }
    });
    
    await waitFor(() => {
      const api = require('../../services/api');
      expect(api.generatePublicPortfolio).toHaveBeenCalled();
    });
  });

  it('should show export button', async () => {
    const store = createTestStore();
    
    render(
      <Provider store={store}>
        <PortfolioDashboard />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/export/i)).toBeInTheDocument();
    });
  });
});