import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import CodePlayground from '../CodePlayground';

// Mock Redux store
const createTestStore = (initialState = {}) => {
  const defaultState = {
    auth: { token: 'test-token' },
    progress: { completedChapters: [] },
  };
  return configureStore({
    reducer: {
      auth: (state = defaultState.auth) => state,
      progress: (state = defaultState.progress) => state,
    },
    preloadedState: { ...defaultState, ...initialState },
  });
};

// Mock API
jest.mock('../../services/api', () => ({
  executeCode: jest.fn(() => Promise.resolve({
    output: 'Hello World',
    errors: '',
    executionTime: 100,
  })),
}));

describe('CodePlayground', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render code editor', async () => {
    const store = createTestStore();
    
    render(
      <Provider store={store}>
        <CodePlayground initialCode="print('hello')" />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });
  });

  it('should show run button', async () => {
    const store = createTestStore();
    
    render(
      <Provider store={store}>
        <CodePlayground initialCode="print('hello')" />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/run/i)).toBeInTheDocument();
    });
  });

  it('should execute code on run click', async () => {
    const store = createTestStore();
    const { getByText } = render(
      <Provider store={store}>
        <CodePlayground initialCode="print('hello')" />
      </Provider>
    );

    await waitFor(() => getByText(/run/i));
    
    fireEvent.click(getByText(/run/i));
    
    await waitFor(() => {
      const api = require('../../services/api');
      expect(api.executeCode).toHaveBeenCalled();
    });
  });

  it('should display execution output', async () => {
    const store = createTestStore();
    
    render(
      <Provider store={store}>
        <CodePlayground initialCode="print('hello')" />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/hello world/i) || screen.getByText(/output/i)).toBeInTheDocument();
    });
  });

  it('should have reset button', async () => {
    const store = createTestStore();
    
    render(
      <Provider store={store}>
        <CodePlayground initialCode="print('hello')" />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/reset/i)).toBeInTheDocument();
    });
  });

  it('should show solution button when solutionCode provided', async () => {
    const store = createTestStore();
    
    render(
      <Provider store={store}>
        <CodePlayground 
          initialCode="print('hello')"
          solutionCode="print('hello world')"
        />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/show solution/i)).toBeInTheDocument();
    });
  });
});
