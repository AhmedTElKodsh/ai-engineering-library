import { describe, it, expect, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';

// Simple auth reducer for testing
const authReducer = (
  state = {
    isAuthenticated: false,
    user: null,
    token: null,
    loading: false,
    error: null,
  },
  action: any
) => {
  switch (action.type) {
    case 'auth/loginStart':
      return { ...state, loading: true, error: null };
    case 'auth/loginSuccess':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
      };
    case 'auth/loginFailure':
      return { ...state, loading: false, error: action.payload };
    case 'auth/logout':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      };
    case 'auth/setUser':
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

describe('Authentication Redux State Management', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authReducer,
      },
    });
  });

  describe('Login Flow', () => {
    it('should set loading state when login starts', () => {
      store.dispatch({ type: 'auth/loginStart' });
      const state = store.getState().auth;

      expect(state.loading).toBe(true);
      expect(state.error).toBe(null);
    });

    it('should set authenticated state on successful login', () => {
      const mockUser = { id: '1', name: 'Test User', email: 'test@example.com' };
      const mockToken = 'mock-jwt-token';

      store.dispatch({
        type: 'auth/loginSuccess',
        payload: { user: mockUser, token: mockToken },
      });
      const state = store.getState().auth;

      expect(state.isAuthenticated).toBe(true);
      expect(state.user).toEqual(mockUser);
      expect(state.token).toBe(mockToken);
      expect(state.loading).toBe(false);
    });

    it('should set error state on login failure', () => {
      const errorMessage = 'Invalid credentials';

      store.dispatch({
        type: 'auth/loginFailure',
        payload: errorMessage,
      });
      const state = store.getState().auth;

      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
      expect(state.isAuthenticated).toBe(false);
    });
  });

  describe('Logout Flow', () => {
    it('should clear authentication state on logout', () => {
      // First login
      const mockUser = { id: '1', name: 'Test User', email: 'test@example.com' };
      const mockToken = 'mock-jwt-token';
      store.dispatch({
        type: 'auth/loginSuccess',
        payload: { user: mockUser, token: mockToken },
      });

      // Then logout
      store.dispatch({ type: 'auth/logout' });
      const state = store.getState().auth;

      expect(state.isAuthenticated).toBe(false);
      expect(state.user).toBe(null);
      expect(state.token).toBe(null);
    });
  });

  describe('User State Management', () => {
    it('should update user information', () => {
      const mockUser = { id: '1', name: 'Updated User', email: 'updated@example.com' };

      store.dispatch({
        type: 'auth/setUser',
        payload: mockUser,
      });
      const state = store.getState().auth;

      expect(state.user).toEqual(mockUser);
    });
  });

  describe('Initial State', () => {
    it('should have correct initial state', () => {
      const state = store.getState().auth;

      expect(state.isAuthenticated).toBe(false);
      expect(state.user).toBe(null);
      expect(state.token).toBe(null);
      expect(state.loading).toBe(false);
      expect(state.error).toBe(null);
    });
  });

  describe('State Transitions', () => {
    it('should handle multiple login attempts', () => {
      // First attempt - failure
      store.dispatch({ type: 'auth/loginStart' });
      store.dispatch({
        type: 'auth/loginFailure',
        payload: 'Invalid credentials',
      });

      let state = store.getState().auth;
      expect(state.isAuthenticated).toBe(false);
      expect(state.error).toBe('Invalid credentials');

      // Second attempt - success
      store.dispatch({ type: 'auth/loginStart' });
      store.dispatch({
        type: 'auth/loginSuccess',
        payload: {
          user: { id: '1', name: 'Test' },
          token: 'token',
        },
      });

      state = store.getState().auth;
      expect(state.isAuthenticated).toBe(true);
      expect(state.error).toBe(null);
    });

    it('should maintain user data after updating', () => {
      // Login
      store.dispatch({
        type: 'auth/loginSuccess',
        payload: {
          user: { id: '1', name: 'Original' },
          token: 'token',
        },
      });

      // Update user
      store.dispatch({
        type: 'auth/setUser',
        payload: { id: '1', name: 'Updated', email: 'new@example.com' },
      });

      const state = store.getState().auth;
      expect(state.isAuthenticated).toBe(true);
      expect(state.user.name).toBe('Updated');
      expect(state.user.email).toBe('new@example.com');
    });
  });
});
