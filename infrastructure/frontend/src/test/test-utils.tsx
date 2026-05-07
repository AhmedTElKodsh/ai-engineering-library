import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore, PreloadedState } from '@reduxjs/toolkit';
import { RootState, store } from '../store';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: typeof store;
}

export function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState = {},
    store: customStore = configureStore({
      reducer: {
        auth: (state = { isAuthenticated: false, user: null, token: null, loading: false, error: null }) => state,
        progress: (state = { items: [], loading: false, error: null }) => state,
        modules: (state = { items: [], currentModule: null, loading: false, error: null }) => state,
      },
      preloadedState,
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <Provider store={customStore}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );
  }

  return { store: customStore, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export * from '@testing-library/react';
export { renderWithProviders as render };
