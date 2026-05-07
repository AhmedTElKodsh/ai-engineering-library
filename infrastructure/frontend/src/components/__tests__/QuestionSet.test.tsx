import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import QuestionSet from '../QuestionSet';

describe('QuestionSet', () => {
  const mockQuestions = [
    {
      id: 'q1',
      type: 'multiple-choice',
      content: 'What is 2+2?',
      options: ['3', '4', '5'],
      order: 1,
    },
    {
      id: 'q2',
      type: 'short-answer',
      content: 'Explain addition.',
      order: 2,
    },
    {
      id: 'q3',
      type: 'coding',
      content: 'Write a function to add two numbers.',
      order: 3,
    },
  ];

  const mockOnAnswer = vi.fn();
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders question content', () => {
    render(
      <QuestionSet
        questions={mockQuestions}
        answers={{}}
        onAnswer={mockOnAnswer}
        onSubmit={mockOnSubmit}
      />
    );
    expect(screen.getByText('What is 2+2?')).toBeInTheDocument();
  });

  it('shows question count', () => {
    render(
      <QuestionSet
        questions={mockQuestions}
        answers={{}}
        onAnswer={mockOnAnswer}
        onSubmit={mockOnSubmit}
      />
    );
    expect(screen.getByText('Question 1 of 3')).toBeInTheDocument();
  });

  it('renders progress bar', () => {
    render(
      <QuestionSet
        questions={mockQuestions}
        answers={{}}
        onAnswer={mockOnAnswer}
        onSubmit={mockOnSubmit}
      />
    );
    expect(screen.getByText('33% Complete')).toBeInTheDocument();
  });

  it('renders multiple choice options', () => {
    render(
      <QuestionSet
        questions={mockQuestions}
        answers={{}}
        onAnswer={mockOnAnswer}
        onSubmit={mockOnSubmit}
      />
    );
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('calls onAnswer when option is selected', () => {
    render(
      <QuestionSet
        questions={mockQuestions}
        answers={{}}
        onAnswer={mockOnAnswer}
        onSubmit={mockOnSubmit}
      />
    );
    const option = screen.getByText('4');
    fireEvent.click(option);
    expect(mockOnAnswer).toHaveBeenCalledWith('q1', '4');
  });

  it('renders textarea for short-answer', () => {
    render(
      <QuestionSet
        questions={mockQuestions}
        answers={{}}
        onAnswer={mockOnAnswer}
        onSubmit={mockOnSubmit}
      />
    );
    // Navigate to second question
    const nextButton = screen.getByRole('button', { name: /Next/i });
    fireEvent.click(nextButton);
    expect(screen.getByPlaceholderText(/Type your answer here/i)).toBeInTheDocument();
  });

  it('renders textarea for coding question', () => {
    render(
      <QuestionSet
        questions={mockQuestions}
        answers={{}}
        onAnswer={mockOnAnswer}
        onSubmit={mockOnSubmit}
      />
    );
    // Navigate to third question
    const nextButton = screen.getByRole('button', { name: /Next/i });
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    expect(screen.getByPlaceholderText(/Write your code here/i)).toBeInTheDocument();
  });

  it('disables previous button on first question', () => {
    render(
      <QuestionSet
        questions={mockQuestions}
        answers={{}}
        onAnswer={mockOnAnswer}
        onSubmit={mockOnSubmit}
      />
    );
    const prevButton = screen.getByRole('button', { name: /Previous/i });
    expect(prevButton).toBeDisabled();
  });

  it('shows submit button on last question', () => {
    render(
      <QuestionSet
        questions={mockQuestions}
        answers={{ q1: '4', q2: 'answer', q3: 'code' }}
        onAnswer={mockOnAnswer}
        onSubmit={mockOnSubmit}
      />
    );
    // Navigate to last question
    const nextButton = screen.getByRole('button', { name: /Next/i });
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    expect(screen.getByRole('button', { name: /Submit All Answers/i })).toBeInTheDocument();
  });

  it('calls onSubmit when submit button is clicked', () => {
    render(
      <QuestionSet
        questions={mockQuestions}
        answers={{ q1: '4', q2: 'answer', q3: 'code' }}
        onAnswer={mockOnAnswer}
        onSubmit={mockOnSubmit}
        submitting={false}
      />
    );
    // Navigate to last question
    const nextButton = screen.getByRole('button', { name: /Next/i });
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    const submitButton = screen.getByRole('button', { name: /Submit All Answers/i });
    fireEvent.click(submitButton);
    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it('shows submitting state', () => {
    render(
      <QuestionSet
        questions={mockQuestions}
        answers={{ q1: '4', q2: 'answer', q3: 'code' }}
        onAnswer={mockOnAnswer}
        onSubmit={mockOnSubmit}
        submitting={true}
      />
    );
    // Navigate to last question
    const nextButton = screen.getByRole('button', { name: /Next/i });
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    expect(screen.getByText(/Submitting/i)).toBeInTheDocument();
  });

  it('shows warning when trying to submit incomplete', () => {
    render(
      <QuestionSet
        questions={mockQuestions}
        answers={{ q1: '4' }} // only one answer
        onAnswer={mockOnAnswer}
        onSubmit={mockOnSubmit}
      />
    );
    // Navigate to last question
    const nextButton = screen.getByRole('button', { name: /Next/i });
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    expect(screen.getByText(/Please answer all questions/i)).toBeInTheDocument();
  });

  it('handles empty questions array', () => {
    render(
      <QuestionSet
        questions={[]}
        answers={{}}
        onAnswer={mockOnAnswer}
        onSubmit={mockOnSubmit}
      />
    );
    expect(screen.getByText(/No questions available/i)).toBeInTheDocument();
  });
});