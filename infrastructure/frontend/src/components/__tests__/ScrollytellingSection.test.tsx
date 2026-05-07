import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ScrollytellingSection from '../ScrollytellingSection';

describe('ScrollytellingSection', () => {
  const mockSteps = [
    {
      id: 'step-1',
      content: '<p>First step content</p>',
      visualization: <div data-testid="viz-1">Viz 1</div>,
    },
    {
      id: 'step-2',
      content: '<p>Second step content</p>',
      visualization: <div data-testid="viz-2">Viz 2</div>,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    // Mock scroll event
    vi.spyOn(window, 'addEventListener').mockImplementation(() => {});
    vi.spyOn(window, 'removeEventListener').mockImplementation(() => {});
  });

  it('renders title', () => {
    render(<ScrollytellingSection title="How Neural Networks Learn" steps={mockSteps} />);
    expect(screen.getByText('How Neural Networks Learn')).toBeInTheDocument();
  });

  it('renders all steps', () => {
    render(<ScrollytellingSection title="Test" steps={mockSteps} />);
    expect(screen.getByText('First step content')).toBeInTheDocument();
    expect(screen.getByText('Second step content')).toBeInTheDocument();
  });

  it('renders step indicators', () => {
    render(<ScrollytellingSection title="Test" steps={mockSteps} />);
    // Should have step buttons
    const buttons = document.querySelectorAll('button[aria-label^="Go to step"]');
    expect(buttons.length).toBe(2);
  });

  it('shows step count', () => {
    render(<ScrollytellingSection title="Test" steps={mockSteps} />);
    expect(screen.getByText('Step 1 of 2')).toBeInTheDocument();
  });

  it('renders visualization for active step', () => {
    render(<ScrollytellingSection title="Test" steps={mockSteps} />);
    // First step should be active by default
    expect(screen.getByTestId('viz-1')).toBeInTheDocument();
  });

  it('applies active styles to current step', () => {
    render(<ScrollytellingSection title="Test" steps={mockSteps} />);
    const steps = document.querySelectorAll('.transition-all');
    expect(steps.length).toBeGreaterThan(0);
  });

  it('handles empty steps array', () => {
    render(<ScrollytellingSection title="Empty" steps={[]} />);
    expect(screen.getByText('Empty')).toBeInTheDocument();
  });

  it('renders sticky visualization container', () => {
    const { container } = render(
      <ScrollytellingSection title="Test" steps={mockSteps} />
    );
    const stickyContainer = container.querySelector('.sticky');
    expect(stickyContainer).toBeInTheDocument();
  });
});