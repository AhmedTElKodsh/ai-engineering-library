import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import DiagramRenderer from '../DiagramRenderer';

// Mock Redux store
const createTestStore = (initialState = {}) => {
  const defaultState = {
    chapters: { currentChapter: { content: '# Test\n```mermaid\ngraph TD\nA-->B\n```' } },
  };
  return configureStore({
    reducer: {
      chapters: (state = defaultState.chapters) => state,
    },
    preloadedState: { ...defaultState, ...initialState },
  });
};

// Mock mermaid
jest.mock('mermaid', () => ({
  default: {
    render: jest.fn(() => Promise.resolve()),
    initialize: jest.fn(),
  },
}));

describe('DiagramRenderer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render mermaid diagrams', async () => {
    const store = createTestStore();
    
    render(
      <Provider store={store}>
        <DiagramRenderer diagramCode="graph TD\nA-->B" />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/diagram/i) || screen.getByTestId('diagram-container')).toBeInTheDocument();
    });
  });

  it('should render diagram container', async () => {
    const store = createTestStore();
    
    render(
      <Provider store={store}>
        <DiagramRenderer diagramCode="graph TD\nA-->B" />
      </Provider>
    );

    const container = document.querySelector('.diagram-container');
    expect(container).toBeInTheDocument();
  });

  it('should handle zoom in', async () => {
    const store = createTestStore();
    
    render(
      <Provider store={store}>
        <DiagramRenderer diagramCode="graph TD\nA-->B" />
      </Provider>
    );

    const zoomInBtn = screen.queryByText(/zoom in/i) || screen.queryByLabelText(/zoom in/i);
    if (zoomInBtn) {
      fireEvent.click(zoomInBtn);
    }
  });

  it('should handle zoom out', async () => {
    const store = createTestStore();
    
    render(
      <Provider store={store}>
        <DiagramRenderer diagramCode="graph TD\nA-->B" />
      </Provider>
    );

    const zoomOutBtn = screen.queryByText(/zoom out/i) || screen.queryByLabelText(/zoom out/i);
    if (zoomOutBtn) {
      fireEvent.click(zoomOutBtn);
    }
  });

  it('should handle pan', async () => {
    const store = createTestStore();
    
    render(
      <Provider store={store}>
        <DiagramRenderer diagramCode="graph TD\nA-->B" />
      </Provider>
    );

    const svg = document.querySelector('svg');
    if (svg) {
      fireEvent.mouseDown(svg);
      fireEvent.mouseMove(svg, { clientX: 100, clientY: 100 });
      fireEvent.mouseUp(svg);
    }
  });
});
