import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import UserProfile from '../UserProfile';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

vi.mock('axios');
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

// Mock store setup
const createMockStore = (authState = {}) => {
  return configureStore({
    reducer: {
      auth: () => ({
        token: 'mock-token',
        user: { id: 'user-1', name: 'Test User', email: 'test@example.com' },
        ...authState,
      }),
    },
  });
};

describe('UserProfile', () => {
  let store: any;

  beforeEach(() => {
    vi.clearAllMocks();
    store = createMockStore();
  });

  it('renders user profile with name', () => {
    render(
      <Provider store={store}>
        <UserProfile />
      </Provider>
    );
    expect(screen.getByText('Test User')).toBeInTheDocument();
  });

  it('displays user email', () => {
    render(
      <Provider store={store}>
        <UserProfile />
      </Provider>
    );
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  it('shows theme selection', () => {
    render(
      <Provider store={store}>
        <UserProfile />
      </Provider>
    );
    expect(screen.getByText(/Theme/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Light/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Dark/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Auto/i)).toBeInTheDocument();
  });

  it('allows changing theme', () => {
    render(
      <Provider store={store}>
        <UserProfile />
      </Provider>
    );
    const darkRadio = screen.getByLabelText(/Dark/i);
    fireEvent.click(darkRadio);
    expect(darkRadio).toBeChecked();
  });

  it('shows font size preferences', () => {
    render(
      <Provider store={store}>
        <UserProfile />
      </Provider>
    );
    expect(screen.getByText(/Font Size/i)).toBeInTheDocument();
  });

  it('displays notification preferences', () => {
    render(
      <Provider store={store}>
        <UserProfile />
      </Provider>
    );
    expect(screen.getByText(/Notifications/i)).toBeInTheDocument();
  });

  it('shows save button', () => {
    render(
      <Provider store={store}>
        <UserProfile />
      </Provider>
    );
    expect(screen.getByRole('button', { name: /Save/i })).toBeInTheDocument();
  });

  it('calls save when save button is clicked', async () => {
    render(
      <Provider store={store}>
        <UserProfile />
      </Provider>
    );
    const saveButton = screen.getByRole('button', { name: /Save/i });
    fireEvent.click(saveButton);
    // Should show success message or call API
    await vi.waitFor(() => {
      expect(screen.getByText(/saved/i)).toBeInTheDocument();
    });
  });
});