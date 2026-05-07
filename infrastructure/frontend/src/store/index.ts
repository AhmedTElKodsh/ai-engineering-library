import { configureStore, combineReducers, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

// Auth slice
interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: localStorage.getItem('token'),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<{ user: any; token: string }>) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
      localStorage.setItem('token', action.payload.token);
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
    setUser(state, action: PayloadAction<any>) {
      state.user = action.payload;
    },
  },
});

// Progress slice
interface ProgressState {
  items: any[];
  loading: boolean;
  error: string | null;
}

const progressSlice = createSlice({
  name: 'progress',
  initialState: { items: [], loading: false, error: null } as ProgressState,
  reducers: {
    setProgress(state, action: PayloadAction<any[]>) {
      state.items = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

// Modules slice
interface ModulesState {
  items: any[];
  currentModule: any | null;
  loading: boolean;
  error: string | null;
}

const modulesSlice = createSlice({
  name: 'modules',
  initialState: { items: [], currentModule: null, loading: false, error: null } as ModulesState,
  reducers: {
    setModules(state, action: PayloadAction<any[]>) {
      state.items = action.payload;
    },
    setCurrentModule(state, action: PayloadAction<any>) {
      state.currentModule = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

// Root reducer
const rootReducer = combineReducers({
  auth: authSlice.reducer,
  progress: progressSlice.reducer,
  modules: modulesSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const { loginStart, loginSuccess, loginFailure, logout, setUser } = authSlice.actions;

export const progressActions = progressSlice.actions;
export const { setProgress } = progressActions;
export const setProgressLoading = progressActions.setLoading;
export const setProgressError = progressActions.setError;

export const modulesActions = modulesSlice.actions;
export const { setModules, setCurrentModule } = modulesActions;
export const setModulesLoading = modulesActions.setLoading;
export const setModulesError = modulesActions.setError;