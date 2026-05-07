import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ReviewInterface from '../ReviewInterface';

describe('ReviewInterface', () => {
  const mockSubmissionData = {
    githubUrl: 'https://github.com/user/ml-model',
    demoUrl: 'https://demo.com',
    description: 'A machine learning model',
    technologies: ['Python', 'TensorFlow'],
    screenshots: ['screenshot1.jpg'],
  };

  const mockPreviousReviews = [
    { id: 'review-1', overallScore: 85, recommendation: 'approve' },
  ];

  const mockOnSubmitReview = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders submission details', () => {
    render(
      <ReviewInterface
        submissionId="sub-1"
        submissionData={mockSubmissionData}
        previousReviews={mockPreviousReviews}
        onSubmitReview={mockOnSubmitReview}
      />
    );
    expect(screen.getByText('A machine learning model')).toBeInTheDocument();
  });

  it('displays GitHub link', () => {
    render(
      <ReviewInterface
        submissionId="sub-1"
        submissionData={mockSubmissionData}
        previousReviews={mockPreviousReviews}
        onSubmitReview={mockOnSubmitReview}
      />
    );
    expect(screen.getByText(/GitHub/i)).toBeInTheDocument();
  });

  it('displays demo link', () => {
    render(
      <ReviewInterface
        submissionId="sub-1"
        submissionData={mockSubmissionData}
        previousReviews={mockPreviousReviews}
        onSubmitReview={mockOnSubmitReview}
      />
    );
    expect(screen.getByText(/demo.com/i)).toBeInTheDocument();
  });

  it('renders rubric scoring section', () => {
    render(
      <ReviewInterface
        submissionId="sub-1"
        submissionData={mockSubmissionData}
        previousReviews={mockPreviousReviews}
        onSubmitReview={mockOnSubmitReview}
      />
    );
    expect(screen.getByText(/Code Quality/i)).toBeInTheDocument();
    expect(screen.getByText(/Documentation/i)).toBeInTheDocument();
    expect(screen.getByText(/Testing/i)).toBeInTheDocument();
    expect(screen.getByText(/Deployment/i)).toBeInTheDocument();
  });

  it('renders recommendation radio buttons', () => {
    render(
      <ReviewInterface
        submissionId="sub-1"
        submissionData={mockSubmissionData}
        previousReviews={mockPreviousReviews}
        onSubmitReview={mockOnSubmitReview}
      />
    );
    expect(screen.getByLabelText(/approve/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/revision required/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/needs work/i)).toBeInTheDocument();
  });

  it('shows overall score', () => {
    render(
      <ReviewInterface
        submissionId="sub-1"
        submissionData={mockSubmissionData}
        previousReviews={mockPreviousReviews}
        onSubmitReview={mockOnSubmitReview}
      />
    );
    expect(screen.getByText(/Overall Score/i)).toBeInTheDocument();
  });

  it('renders previous reviews section', () => {
    render(
      <ReviewInterface
        submissionId="sub-1"
        submissionData={mockSubmissionData}
        previousReviews={mockPreviousReviews}
        onSubmitReview={mockOnSubmitReview}
      />
    );
    expect(screen.getByText(/Previous Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(/Review 1/i)).toBeInTheDocument();
  });

  it('calls onSubmitReview when review is submitted', () => {
    render(
      <ReviewInterface
        submissionId="sub-1"
        submissionData={mockSubmissionData}
        previousReviews={mockPreviousReviews}
        onSubmitReview={mockOnSubmitReview}
      />
    );
    
    // Select approve
    const approveRadio = screen.getByLabelText(/approve/i);
    fireEvent.click(approveRadio);
    
    // Add a strength
    const strengthInput = screen.getByPlaceholderText(/Add a strength/i);
    fireEvent.change(strengthInput, { target: { value: 'Good code' } });
    fireEvent.keyPress(strengthInput, { key: 'Enter' });
    
    // Submit review
    const submitButton = screen.getByRole('button', { name: /Submit Review/i });
    fireEvent.click(submitButton);
    
    expect(mockOnSubmitReview).toHaveBeenCalled();
  });

  it('disables submit button when no recommendation is selected', () => {
    render(
      <ReviewInterface
        submissionId="sub-1"
        submissionData={mockSubmissionData}
        previousReviews={mockPreviousReviews}
        onSubmitReview={mockOnSubmitReview}
      />
    );
    
    const submitButton = screen.getByRole('button', { name: /Submit Review/i });
    expect(submitButton).toBeDisabled();
  });
});