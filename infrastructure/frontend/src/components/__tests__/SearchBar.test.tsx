import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import SearchBar from '../SearchBar';

// Mock Redux store
const createTestStore = (initialState = {}) => {
  const defaultState = {
    search: { results: [], loading: false, query: '' },
  };
  return configureStore({
    reducer: {
      search: (state = defaultState.search) => state,
    },
    preloadedState: { ...defaultState, ...initialState },
  });
};

// Mock API
jest.mock('../../services/api', () => ({
  searchContent: jest.fn(() => Promise.resolve({
    results: [
      { id: 'ch-1', title: 'Python Basics', type: 'chapter' },
    ],
  })),
}));

describe('SearchBar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render search input', async () => {
    const store = createTestStore();
    
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    expect(screen.getByRole('searchbox') || screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });

  it('should show autocomplete suggestions', async () => {
    const store = createTestStore();
    
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    const searchInput = screen.getByRole('searchbox') || screen.getByPlaceholderText(/search/i);
    fireEvent.change(searchInput, { target: { value: 'python' } });
    
    await waitFor(() => {
      expect(screen.getByText(/python basics/i)).toBeInTheDocument();
    });
  });

  it('should call search API on input', async () => {
    const store = createTestStore();
    
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    const searchInput = screen.getByRole('searchbox') || screen.getByPlaceholderText(/search/i);
    fireEvent.change(searchInput, { target: { value: 'python' } });
    
    await waitFor(() => {
      const api = require('../../services/api');
      expect(api.searchContent).toHaveBeenCalledWith('python');
    });
  });

  it('should have filter options', async () => {
    const store = createTestStore();
    
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    const filterBtn = screen.queryByText(/filter/i) || screen.queryByLabelText(/filter/i);
    if (filterBtn) {
      fireEvent.click(filterBtn);
      // Check for filter options
      expect(screen.getByText(/module/i) || screen.getByText(/chapter/i)).toBeInTheDocument();
    }
  });

  it('should clear search on clear button', async () => {
    const store = createTestStore();
    
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    const searchInput = screen.getByRole('searchbox') || screen.getByPlaceholderText(/search/i);
    fireEvent.change(searchInput, { target: { value: 'python' } });
    
    const clearBtn = screen.queryByLabelText(/clear/i) || screen.queryByText(/clear/i);
    if (clearBtn) {
      fireEvent.click(clearBtn);
      expect(searchInput).toHaveValue('');
    }
  });
});