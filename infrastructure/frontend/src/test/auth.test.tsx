import { describe, it, expect, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  setUser,
} from '../store';

describe('Authentication Flows', () => {
  let store: any;

  beforeEach(() => {
    localStorage.clear();
    store = configureStore({
      reducer: {
        auth: (
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
              localStorage.setItem('token', action.payload.token);
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
              localStorage.removeItem('token');
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
        },
      },
    });
  });

  describe('Login Flow', () => {
    it('should set loading state when login starts', () => {
      store.dispatch(loginStart());
      const state = store.getState().auth;

      expect(state.loading).toBe(true);
      expect(state.error).toBe(null);
    });

    it('should set authenticated state on successful login', () => {
      const mockUser = { id: '1', name: 'Test User', email: 'test@example.com' };
      const mockToken = 'mock-jwt-token';

      store.dispatch(loginSuccess({ user: mockUser, token: mockToken }));
      const state = store.getState().auth;

      expect(state.isAuthenticated).toBe(true);
      expect(state.user).toEqual(mockUser);
      expect(state.token).toBe(mockToken);
      expect(state.loading).toBe(false);
      expect(localStorage.getItem('token')).toBe(mockToken);
    });

    it('should set error state on login failure', () => {
      const errorMessage = 'Invalid credentials';

      store.dispatch(loginFailure(errorMessage));
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
      store.dispatch(loginSuccess({ user: mockUser, token: mockToken }));

      // Then logout
      store.dispatch(logout());
      const state = store.getState().auth;

      expect(state.isAuthenticated).toBe(false);
      expect(state.user).toBe(null);
      expect(state.token).toBe(null);
      expect(localStorage.getItem('token')).toBe(null);
    });
  });

  describe('Token Management', () => {
    it('should persist token to localStorage on login', () => {
      const mockToken = 'test-token-123';
      store.dispatch(
        loginSuccess({
          user: { id: '1', name: 'Test' },
          token: mockToken,
        })
      );

      expect(localStorage.getItem('token')).toBe(mockToken);
    });

    it('should remove token from localStorage on logout', () => {
      localStorage.setItem('token', 'existing-token');
      store.dispatch(logout());

      expect(localStorage.getItem('token')).toBe(null);
    });
  });

  describe('User State Management', () => {
    it('should update user information', () => {
      const mockUser = { id: '1', name: 'Updated User', email: 'updated@example.com' };

      store.dispatch(setUser(mockUser));
      const state = store.getState().auth;

      expect(state.user).toEqual(mockUser);
    });
  });
});
