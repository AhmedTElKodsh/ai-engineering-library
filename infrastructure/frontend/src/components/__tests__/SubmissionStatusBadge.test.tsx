import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SubmissionStatusBadge from '../SubmissionStatusBadge';

describe('SubmissionStatusBadge', () => {
  it('renders not-submitted status', () => {
    render(<SubmissionStatusBadge status="not-submitted" />);
    expect(screen.getByText('Not Submitted')).toBeInTheDocument();
  });

  it('renders pending-review status', () => {
    render(<SubmissionStatusBadge status="pending-review" />);
    expect(screen.getByText('Pending Review')).toBeInTheDocument();
  });

  it('renders reviewed status', () => {
    render(<SubmissionStatusBadge status="reviewed" />);
    expect(screen.getByText('Reviewed')).toBeInTheDocument();
  });

  it('renders revision-requested status', () => {
    render(<SubmissionStatusBadge status="revision-requested" />);
    expect(screen.getByText('Revision Requested')).toBeInTheDocument();
  });

  it('renders approved status', () => {
    render(<SubmissionStatusBadge status="approved" />);
    expect(screen.getByText('Approved')).toBeInTheDocument();
  });

  it('shows revision number when provided', () => {
    render(<SubmissionStatusBadge status="revision-requested" revisionNumber={2} />);
    expect(screen.getByText('(2)')).toBeInTheDocument();
  });

  it('does not show revision for first submission', () => {
    render(<SubmissionStatusBadge status="pending-review" revisionNumber={0} />);
    expect(screen.queryByText(/\(/)).not.toBeInTheDocument();
  });

  it('applies correct color for not-submitted', () => {
    const { container } = render(<SubmissionStatusBadge status="not-submitted" />);
    const badge = container.firstChild;
    expect(badge).toHaveClass('bg-gray-100', 'text-gray-800');
  });

  it('applies correct color for pending-review', () => {
    const { container } = render(<SubmissionStatusBadge status="pending-review" />);
    const badge = container.firstChild;
    expect(badge).toHaveClass('bg-yellow-100', 'text-yellow-800');
  });

  it('applies correct color for approved', () => {
    const { container } = render(<SubmissionStatusBadge status="approved" />);
    const badge = container.firstChild;
    expect(badge).toHaveClass('bg-green-100', 'text-green-800');
  });
});