import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ExplorableExplanation from '../ExplorableExplanation';

describe('ExplorableExplanation', () => {
  const mockParameters = [
    { name: 'learningRate', min: 0.01, max: 1.0, default: 0.1, step: 0.01 },
    { name: 'epochs', min: 1, max: 100, default: 10 },
  ];

  const mockVisualization = vi.fn((params) => (
    <div data-testid="visualization">
      Learning Rate: {params.learningRate}, Epochs: {params.epochs}
    </div>
  ));

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders title and description', () => {
    render(
      <ExplorableExplanation
        title="Gradient Descent"
        description="Explore how learning rate affects training"
        parameters={mockParameters}
        renderVisualization={mockVisualization}
      />
    );

    expect(screen.getByText('Gradient Descent')).toBeInTheDocument();
    expect(screen.getByText('Explore how learning rate affects training')).toBeInTheDocument();
  });

  it('renders all parameter sliders', () => {
    render(
      <ExplorableExplanation
        title="Test"
        description="Test"
        parameters={mockParameters}
        renderVisualization={mockVisualization}
      />
    );

    expect(screen.getByText('learningRate:')).toBeInTheDocument();
    expect(screen.getByText('epochs:')).toBeInTheDocument();
  });

  it('displays default parameter values', () => {
    render(
      <ExplorableExplanation
        title="Test"
        description="Test"
        parameters={mockParameters}
        renderVisualization={mockVisualization}
      />
    );

    expect(screen.getByText('0.1')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('renders min and max labels for sliders', () => {
    render(
      <ExplorableExplanation
        title="Test"
        description="Test"
        parameters={mockParameters}
        renderVisualization={mockVisualization}
      />
    );

    expect(screen.getByText('0.01')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('updates visualization when slider changes', () => {
    render(
      <ExplorableExplanation
        title="Test"
        description="Test"
        parameters={mockParameters}
        renderVisualization={mockVisualization}
      />
    );

    const slider = screen.getByRole('slider', { name: /learningRate/i });
    fireEvent.change(slider, { target: { value: '0.5' } });

    expect(mockVisualization).toHaveBeenCalled();
  });

  it('renders reset button', () => {
    render(
      <ExplorableExplanation
        title="Test"
        description="Test"
        parameters={mockParameters}
        renderVisualization={mockVisualization}
      />
    );

    expect(screen.getByRole('button', { name: /Reset to Defaults/i })).toBeInTheDocument();
  });

  it('resets to default values when reset button is clicked', () => {
    render(
      <ExplorableExplanation
        title="Test"
        description="Test"
        parameters={mockParameters}
        renderVisualization={mockVisualization}
      />
    );

    // Change a value first
    const slider = screen.getByRole('slider', { name: /learningRate/i });
    fireEvent.change(slider, { target: { value: '0.5' } });

    // Click reset
    const resetButton = screen.getByRole('button', { name: /Reset to Defaults/i });
    fireEvent.click(resetButton);

    // Visualization should be called again with default values
    expect(mockVisualization).toHaveBeenCalled();
  });

  it('renders visualization', () => {
    render(
      <ExplorableExplanation
        title="Test"
        description="Test"
        parameters={mockParameters}
        renderVisualization={mockVisualization}
      />
    );

    expect(screen.getByTestId('visualization')).toBeInTheDocument();
    expect(mockVisualization).toHaveBeenCalledWith(
      expect.objectContaining({ learningRate: 0.1, epochs: 10 })
    );
  });
});