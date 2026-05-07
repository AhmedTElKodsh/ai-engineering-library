import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import DiagnosticAssessment from '../DiagnosticAssessment';

// Mock Redux store
const createTestStore = (initialState = {}) => {
  const defaultState = {
    auth: { token: 'test-token', user: { id: 'user-123' } },
    assessment: { currentAssessment: null, loading: false },
  };
  return configureStore({
    reducer: {
      auth: (state = defaultState.auth) => state,
      assessment: (state = defaultState.assessment) => state,
    },
    preloadedState: { ...defaultState, ...initialState },
  });
};

// Mock API
jest.mock('../../services/api', () => ({
  startDiagnostic: jest.fn(() => Promise.resolve({
    id: 'assessment-1',
    questions: [
      { id: 'q1', type: 'multiple-choice', question: 'What is Python?', options: ['Language', 'Snake', 'Tool'] },
    ],
  })),
  submitDiagnostic: jest.fn(() => Promise.resolve({
    entryPoint: 2,
    score: 75,
    recommendations: ['Start from Module 2'],
  })),
}));

describe('DiagnosticAssessment', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render assessment start button', async () => {
    const store = createTestStore();
    
    render(
      <Provider store={store}>
        <DiagnosticAssessment />
      </Provider>
    );

    expect(screen.getByText(/start assessment/i) || screen.getByRole('button')).toBeInTheDocument();
  });

  it('should start assessment on button click', async () => {
    const store = createTestStore();
    
    render(
      <Provider store={store}>
        <DiagnosticAssessment />
      </Provider>
    );

    const startBtn = screen.getByText(/start assessment/i) || screen.getAllByRole('button')[0];
    fireEvent.click(startBtn);
    
    await waitFor(() => {
      const api = require('../../services/api');
      expect(api.startDiagnostic).toHaveBeenCalled();
    });
  });

  it('should display questions after starting', async () => {
    const store = createTestStore();
    
    render(
      <Provider store={store}>
        <DiagnosticAssessment />
      </Provider>
    );

    const startBtn = screen.getByText(/start assessment/i) || screen.getAllByRole('button')[0];
    fireEvent.click(startBtn);
    
    await waitFor(() => {
      expect(screen.getByText(/what is python/i)).toBeInTheDocument();
    });
  });

  it('should show progress indicator', async () => {
    const store = createTestStore();
    
    render(
      <Provider store={store}>
        <DiagnosticAssessment />
      </Provider>
    );

    const progressBar = screen.getByRole('progressbar') || screen.getByTestId('progress-bar');
    if (progressBar) {
      expect(progressBar).toBeInTheDocument();
    }
  });

  it('should submit answers and show results', async () => {
    const store = createTestStore();
    
    render(
      <Provider store={store}>
        <DiagnosticAssessment />
      </Provider>
    );

    // Start assessment
    const startBtn = screen.getByText(/start assessment/i) || screen.getAllByRole('button')[0];
    fireEvent.click(startBtn);
    
    await waitFor(() => {
      expect(screen.getByText(/what is python/i)).toBeInTheDocument();
    });

    // Select answer
    const option = screen.getByText('Language');
    fireEvent.click(option);
    
    // Submit
    const submitBtn = screen.getByText(/submit/i) || screen.getAllByRole('button').pop();
    if (submitBtn) {
      fireEvent.click(submitBtn);
    }
    
    await waitFor(() => {
      const api = require('../../services/api');
      expect(api.submitDiagnostic).toHaveBeenCalled();
    });
  });
});