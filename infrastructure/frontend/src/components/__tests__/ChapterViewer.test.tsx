import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ChapterViewer from '../ChapterViewer';

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ chapterId: 'ch-1' }),
}));

// Mock axios
jest.mock('axios');
const mockAxios = require('axios');

// Mock Redux store
const createTestStore = (initialState = {}) => {
  const defaultState = {
    progress: { completedChapters: [], currentChapter: null },
    auth: { token: 'test-token' },
  };
  return configureStore({
    reducer: {
      progress: (state = defaultState.progress) => state,
      auth: (state = defaultState.auth) => state,
    },
    preloadedState: { ...defaultState, ...initialState },
  });
};

describe('ChapterViewer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render loading state initially', () => {
    mockAxios.get.mockImplementationOnce(() => new Promise(() => {})); // Never resolves
    
    render(
      <Provider store={createTestStore()}>
        <ChapterViewer />
      </Provider>
    );

    expect(screen.getByText('Loading chapter...')).toBeInTheDocument();
  });

  it('should render chapter content after loading', async () => {
    mockAxios.get.mockResolvedValueOnce({
      data: {
        id: 'ch-1',
        title: 'Test Chapter',
        content: '# Test Content\n\nThis is test content.',
        moduleId: 'module-1',
      },
    });
    
    render(
      <Provider store={createTestStore()}>
        <ChapterViewer />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Chapter')).toBeInTheDocument();
    });
    
    expect(screen.getByText(/This is test content/)).toBeInTheDocument();
  });

  it('should render error state', async () => {
    mockAxios.get.mockRejectedValueOnce({
      response: { data: { error: 'Chapter not found' } },
    });
    
    render(
      <Provider store={createTestStore()}>
        <ChapterViewer />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Chapter not found/)).toBeInTheDocument();
    });
  });

  it('should show "Mark as Complete" button', async () => {
    mockAxios.get.mockResolvedValueOnce({
      data: {
        id: 'ch-1',
        title: 'Test Chapter',
        content: 'Test content',
        moduleId: 'module-1',
      },
    });
    
    render(
      <Provider store={createTestStore()}>
        <ChapterViewer />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Mark as Complete')).toBeInTheDocument();
    });
  });

  it('should call API to mark chapter complete', async () => {
    mockAxios.get.mockResolvedValueOnce({
      data: {
        id: 'ch-1',
        title: 'Test Chapter',
        content: 'Test content',
        moduleId: 'module-1',
      },
    });
    mockAxios.post.mockResolvedValueOnce({ data: {} });
    
    render(
      <Provider store={createTestStore()}>
        <ChapterViewer />
      </Provider>
    );

    await waitFor(() => screen.getByText('Mark as Complete'));
    
    fireEvent.click(screen.getByText('Mark as Complete'));
    
    await waitFor(() => {
      expect(mockAxios.post).toHaveBeenCalledWith(
        expect.stringContaining('/progress/chapters/ch-1/complete'),
        expect.anything(),
        expect.anything()
      );
    });
  });
});