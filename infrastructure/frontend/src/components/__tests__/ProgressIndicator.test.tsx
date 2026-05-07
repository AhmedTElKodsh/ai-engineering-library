import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProgressIndicator from '../ProgressIndicator';

describe('ProgressIndicator', () => {
  it('renders with default props', () => {
    render(<ProgressIndicator percentage={50} />);
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('displays correct percentage', () => {
    render(<ProgressIndicator percentage={75} />);
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('hides label when showLabel is false', () => {
    render(<ProgressIndicator percentage={25} showLabel={false} />);
    expect(screen.queryByText('25%')).not.toBeInTheDocument();
  });

  it('applies small size class', () => {
    const { container } = render(<ProgressIndicator percentage={50} size="sm" />);
    const indicator = container.firstChild;
    expect(indicator).toHaveClass('w-8', 'h-8', 'text-xs');
  });

  it('applies medium size class by default', () => {
    const { container } = render(<ProgressIndicator percentage={50} />);
    const indicator = container.firstChild;
    expect(indicator).toHaveClass('w-12', 'h-12', 'text-sm');
  });

  it('applies large size class', () => {
    const { container } = render(<ProgressIndicator percentage={50} size="lg" />);
    const indicator = container.firstChild;
    expect(indicator).toHaveClass('w-16', 'h-16', 'text-lg');
  });

  it('applies blue color by default', () => {
    const { container } = render(<ProgressIndicator percentage={50} />);
    const span = screen.getByText('50%');
    expect(span).toHaveClass('text-blue-600');
  });

  it('applies green color', () => {
    const { container } = render(<ProgressIndicator percentage={50} color="green" />);
    const span = screen.getByText('50%');
    expect(span).toHaveClass('text-green-600');
  });

  it('applies purple color', () => {
    const { container } = render(<ProgressIndicator percentage={50} color="purple" />);
    const span = screen.getByText('50%');
    expect(span).toHaveClass('text-purple-600');
  });

  it('renders SVG circle for progress', () => {
    const { container } = render(<ProgressIndicator percentage={50} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('handles 0% progress', () => {
    render(<ProgressIndicator percentage={0} />);
    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('handles 100% progress', () => {
    render(<ProgressIndicator percentage={100} />);
    expect(screen.getByText('100%')).toBeInTheDocument();
  });
});