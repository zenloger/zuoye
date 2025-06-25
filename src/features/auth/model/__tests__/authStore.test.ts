import { configureStore } from '@reduxjs/toolkit';
import authReducer, { clearError, setToken } from '../authStore';

describe('authStore', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authReducer,
      },
    });
    localStorage.clear();
  });

  describe('initial state', () => {
    it('should have correct initial state', () => {
      const state = store.getState().auth;
      expect(state.user).toBeFalsy(); // Can be null or undefined
      expect(state.token).toBeFalsy(); // Can be null or undefined
      expect(state.isAuthenticated).toBe(false);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBeFalsy(); // Can be null or undefined
    });
  });

  describe('synchronous actions', () => {
    it('should clear error', () => {
      store.dispatch(clearError());
      const state = store.getState().auth;
      expect(state.error).toBeNull();
    });

    it('should set token', () => {
      const token = 'test-token';
      store.dispatch(setToken(token));

      const state = store.getState().auth;
      expect(state.token).toBe(token);
      expect(state.isAuthenticated).toBe(true);
    });
  });
});