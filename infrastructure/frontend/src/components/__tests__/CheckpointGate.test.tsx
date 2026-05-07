import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import CheckpointGate from '../CheckpointGate';

// Mock axios
vi.mock('axios');
const mockedAxios = axios as any;

// Mock store setup
const createMockStore = (authState = {}) => {
  return configureStore({
    reducer: {
      auth: () => ({
        token: 'mock-token',
        user: { id: 'user-1', name: 'Test User' },
        ...authState,
      }),
    },
  });
};

describe('CheckpointGate', () => {
  const mockOnPass = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Checkpoint Loading', () => {
    it('should display loading state initially', () => {
      mockedAxios.post.mockImplementation(() => new Promise(() => {}));
      const store = createMockStore();

      render(
        <Provider store={store}>
          <CheckpointGate chapterId="chapter-1" onPass={mockOnPass} />
        </Provider>
      );

      expect(screen.getByText('Loading checkpoint...')).toBeInTheDocument();
    });

    it('should start checkpoint attempt on mount', async () => {
      const mockAttempt = {
        attemptId: 'attempt-1',
        questions: [
          { id: 'q1', type: 'multiple-choice', content: 'Question 1', options: ['A', 'B'] },
        ],
      };

      mockedAxios.post.mockResolvedValueOnce({ data: mockAttempt });

      const store = createMockStore();

      render(
        <Provider store={store}>
          <CheckpointGate chapterId="chapter-1" onPass={mockOnPass} />
        </Provider>
      );

      await waitFor(() => {
        expect(mockedAxios.post).toHaveBeenCalledWith(
          'http://localhost:3001/api/v1/assessments/checkpoint/chapter-1/start',
          {},
          { headers: { Authorization: 'Bearer mock-token' } }
        );
      });

      await waitFor(() => {
        expect(screen.getByText('Checkpoint Assessment')).toBeInTheDocument();
      });
    });

    it('should display error message when checkpoint fails to load', async () => {
      mockedAxios.post.mockRejectedValueOnce({
        response: { data: { error: 'Failed to start checkpoint' } },
      });

      const store = createMockStore();

      render(
        <Provider store={store}>
          <CheckpointGate chapterId="chapter-1" onPass={mockOnPass} />
        </Provider>
      );

      await waitFor(() => {
        expect(screen.getByText('Failed to start checkpoint')).toBeInTheDocument();
      });
    });
  });

  describe('Checkpoint Requirements Display', () => {
    const mockAttempt = {
      attemptId: 'attempt-1',
      questions: [
        { id: 'q1', type: 'multiple-choice', content: 'What is Python?', options: ['Language', 'Snake'] },
        { id: 'q2', type: 'short-answer', content: 'Explain OOP' },
      ],
    };

    beforeEach(() => {
      mockedAxios.post.mockResolvedValueOnce({ data: mockAttempt });
    });

    it('should display checkpoint title and description', async () => {
      const store = createMockStore();

      render(
        <Provider store={store}>
          <CheckpointGate chapterId="chapter-1" onPass={mockOnPass} />
        </Provider>
      );

      await waitFor(() => {
        expect(screen.getByText('Checkpoint Assessment')).toBeInTheDocument();
        expect(screen.getByText('Complete this checkpoint to unlock the next module.')).toBeInTheDocument();
      });
    });

    it('should display all checkpoint questions', async () => {
      const store = createMockStore();

      render(
        <Provider store={store}>
          <CheckpointGate chapterId="chapter-1" onPass={mockOnPass} />
        </Provider>
      );

      await waitFor(() => {
        expect(screen.getByText(/What is Python\?/)).toBeInTheDocument();
        expect(screen.getByText(/Explain OOP/)).toBeInTheDocument();
      });
    });

    it('should display question numbers', async () => {
      const store = createMockStore();

      render(
        <Provider store={store}>
          <CheckpointGate chapterId="chapter-1" onPass={mockOnPass} />
        </Provider>
      );

      await waitFor(() => {
        expect(screen.getByText('Question 1: What is Python?')).toBeInTheDocument();
        expect(screen.getByText('Question 2: Explain OOP')).toBeInTheDocument();
      });
    });
  });

  describe('Answer Submission', () => {
    const mockAttempt = {
      attemptId: 'attempt-1',
      questions: [
        { id: 'q1', type: 'multiple-choice', content: 'Question 1', options: ['A', 'B'] },
        { id: 'q2', type: 'short-answer', content: 'Question 2' },
      ],
    };

    beforeEach(() => {
      mockedAxios.post.mockResolvedValueOnce({ data: mockAttempt });
    });

    it('should handle multiple-choice answer selection', async () => {
      const store = createMockStore();

      render(
        <Provider store={store}>
          <CheckpointGate chapterId="chapter-1" onPass={mockOnPass} />
        </Provider>
      );

      await waitFor(() => {
        expect(screen.getByText('Question 1')).toBeInTheDocument();
      });

      const optionA = screen.getByLabelText('A');
      fireEvent.click(optionA);

      expect(optionA).toBeChecked();
    });

    it('should handle short-answer text input', async () => {
      const store = createMockStore();

      render(
        <Provider store={store}>
          <CheckpointGate chapterId="chapter-1" onPass={mockOnPass} />
        </Provider>
      );

      await waitFor(() => {
        expect(screen.getByText('Question 2')).toBeInTheDocument();
      });

      const textareas = screen.getAllByRole('textbox');
      fireEvent.change(textareas[0], { target: { value: 'My answer' } });

      expect(textareas[0]).toHaveValue('My answer');
    });

    it('should disable submit button when not all questions are answered', async () => {
      const store = createMockStore();

      render(
        <Provider store={store}>
          <CheckpointGate chapterId="chapter-1" onPass={mockOnPass} />
        </Provider>
      );

      await waitFor(() => {
        expect(screen.getByText('Question 1')).toBeInTheDocument();
      });

      const submitButton = screen.getByText('Submit Checkpoint');
      expect(submitButton).toBeDisabled();
    });

    it('should enable submit button when all questions are answered', async () => {
      const store = createMockStore();

      render(
        <Provider store={store}>
          <CheckpointGate chapterId="chapter-1" onPass={mockOnPass} />
        </Provider>
      );

      await waitFor(() => {
        expect(screen.getByText('Question 1')).toBeInTheDocument();
      });

      // Answer both questions
      fireEvent.click(screen.getByLabelText('A'));
      const textareas = screen.getAllByRole('textbox');
      fireEvent.change(textareas[0], { target: { value: 'Answer' } });

      const submitButton = screen.getByText('Submit Checkpoint');
      expect(submitButton).not.toBeDisabled();
    });

    it('should submit checkpoint with all answers', async () => {
      mockedAxios.post.mockResolvedValueOnce({
        data: { status: 'passed', feedback: 'Great job!' },
      });

      const store = createMockStore();

      render(
        <Provider store={store}>
          <CheckpointGate chapterId="chapter-1" onPass={mockOnPass} />
        </Provider>
      );

      await waitFor(() => {
        expect(screen.getByText('Question 1')).toBeInTheDocument();
      });

      // Answer questions
      fireEvent.click(screen.getByLabelText('A'));
      const textareas = screen.getAllByRole('textbox');
      fireEvent.change(textareas[0], { target: { value: 'Answer' } });

      // Submit
      fireEvent.click(screen.getByText('Submit Checkpoint'));

      await waitFor(() => {
        expect(mockedAxios.post).toHaveBeenCalledWith(
          'http://localhost:3001/api/v1/assessments/checkpoint/submit',
          expect.objectContaining({
            attemptId: 'attempt-1',
            answers: { q1: 'A', q2: 'Answer' },
          }),
          { headers: { Authorization: 'Bearer mock-token' } }
        );
      });
    });
  });

  describe('Pass/Fail Feedback', () => {
    const mockAttempt = {
      attemptId: 'attempt-1',
      questions: [
        { id: 'q1', type: 'multiple-choice', content: 'Question 1', options: ['A', 'B'] },
      ],
    };

    beforeEach(() => {
      mockedAxios.post.mockResolvedValueOnce({ data: mockAttempt });
    });

    it('should display success message when checkpoint is passed', async () => {
      mockedAxios.post.mockResolvedValueOnce({
        data: { status: 'passed', feedback: 'Excellent work!' },
      });

      const store = createMockStore();

      render(
        <Provider store={store}>
          <CheckpointGate chapterId="chapter-1" onPass={mockOnPass} />
        </Provider>
      );

      await waitFor(() => {
        expect(screen.getByText('Question 1')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByLabelText('A'));
      fireEvent.click(screen.getByText('Submit Checkpoint'));

      await waitFor(() => {
        expect(screen.getByText('Checkpoint Passed!')).toBeInTheDocument();
        expect(screen.getByText('You can now proceed to the next module.')).toBeInTheDocument();
      });
    });

    it('should call onPass callback when checkpoint is passed', async () => {
      mockedAxios.post.mockResolvedValueOnce({
        data: { status: 'passed', feedback: 'Great!' },
      });

      const store = createMockStore();

      render(
        <Provider store={store}>
          <CheckpointGate chapterId="chapter-1" onPass={mockOnPass} />
        </Provider>
      );

      await waitFor(() => {
        expect(screen.getByText('Question 1')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByLabelText('A'));
      fireEvent.click(screen.getByText('Submit Checkpoint'));

      await waitFor(() => {
        expect(mockOnPass).toHaveBeenCalled();
      });
    });

    it('should display failure message with feedback when checkpoint fails', async () => {
      mockedAxios.post.mockResolvedValueOnce({
        data: {
          status: 'failed',
          feedback: 'You need to review some concepts',
          gaps: ['Python OOP', 'Error Handling'],
        },
      });

      const store = createMockStore();

      render(
        <Provider store={store}>
          <CheckpointGate chapterId="chapter-1" onPass={mockOnPass} />
        </Provider>
      );

      await waitFor(() => {
        expect(screen.getByText('Question 1')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByLabelText('A'));
      fireEvent.click(screen.getByText('Submit Checkpoint'));

      await waitFor(() => {
        expect(screen.getByText('Checkpoint Failed')).toBeInTheDocument();
        expect(screen.getByText('You need to review some concepts')).toBeInTheDocument();
      });
    });

    it('should display gap analysis when checkpoint fails', async () => {
      mockedAxios.post.mockResolvedValueOnce({
        data: {
          status: 'failed',
          feedback: 'Review needed',
          gaps: ['Python OOP', 'Error Handling', 'Context Managers'],
        },
      });

      const store = createMockStore();

      render(
        <Provider store={store}>
          <CheckpointGate chapterId="chapter-1" onPass={mockOnPass} />
        </Provider>
      );

      await waitFor(() => {
        expect(screen.getByText('Question 1')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByLabelText('A'));
      fireEvent.click(screen.getByText('Submit Checkpoint'));

      await waitFor(() => {
        expect(screen.getByText('Gap Analysis')).toBeInTheDocument();
        expect(screen.getByText('Python OOP')).toBeInTheDocument();
        expect(screen.getByText('Error Handling')).toBeInTheDocument();
        expect(screen.getByText('Context Managers')).toBeInTheDocument();
      });
    });

    it('should provide retry option when checkpoint fails', async () => {
      mockedAxios.post.mockResolvedValueOnce({
        data: {
          status: 'failed',
          feedback: 'Try again',
          gaps: ['Topic 1'],
        },
      });

      const store = createMockStore();

      render(
        <Provider store={store}>
          <CheckpointGate chapterId="chapter-1" onPass={mockOnPass} />
        </Provider>
      );

      await waitFor(() => {
        expect(screen.getByText('Question 1')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByLabelText('A'));
      fireEvent.click(screen.getByText('Submit Checkpoint'));

      await waitFor(() => {
        expect(screen.getByText('Retry Checkpoint')).toBeInTheDocument();
      });
    });

    it('should reset checkpoint when retry button is clicked', async () => {
      mockedAxios.post.mockResolvedValueOnce({
        data: {
          status: 'failed',
          feedback: 'Try again',
          gaps: ['Topic 1'],
        },
      });

      const store = createMockStore();

      render(
        <Provider store={store}>
          <CheckpointGate chapterId="chapter-1" onPass={mockOnPass} />
        </Provider>
      );

      await waitFor(() => {
        expect(screen.getByText('Question 1')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByLabelText('A'));
      fireEvent.click(screen.getByText('Submit Checkpoint'));

      await waitFor(() => {
        expect(screen.getByText('Retry Checkpoint')).toBeInTheDocument();
      });

      // Reset by clicking retry
      fireEvent.click(screen.getByText('Retry Checkpoint'));

      await waitFor(() => {
        expect(screen.getByText('Question 1')).toBeInTheDocument();
      });
    });

    it('should not call onPass callback when checkpoint fails', async () => {
      mockedAxios.post.mockResolvedValueOnce({
        data: {
          status: 'failed',
          feedback: 'Failed',
          gaps: ['Topic 1'],
        },
      });

      const store = createMockStore();

      render(
        <Provider store={store}>
          <CheckpointGate chapterId="chapter-1" onPass={mockOnPass} />
        </Provider>
      );

      await waitFor(() => {
        expect(screen.getByText('Question 1')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByLabelText('A'));
      fireEvent.click(screen.getByText('Submit Checkpoint'));

      await waitFor(() => {
        expect(screen.getByText('Checkpoint Failed')).toBeInTheDocument();
      });

      expect(mockOnPass).not.toHaveBeenCalled();
    });
  });

  describe('Error Handling', () => {
    const mockAttempt = {
      attemptId: 'attempt-1',
      questions: [
        { id: 'q1', type: 'multiple-choice', content: 'Question 1', options: ['A', 'B'] },
      ],
    };

    beforeEach(() => {
      mockedAxios.post.mockResolvedValueOnce({ data: mockAttempt });
    });

    it('should display error message on submission failure', async () => {
      mockedAxios.post.mockRejectedValueOnce({
        response: { data: { error: 'Network error' } },
      });

      const store = createMockStore();

      render(
        <Provider store={store}>
          <CheckpointGate chapterId="chapter-1" onPass={mockOnPass} />
        </Provider>
      );

      await waitFor(() => {
        expect(screen.getByText('Question 1')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByLabelText('A'));
      fireEvent.click(screen.getByText('Submit Checkpoint'));

      await waitFor(() => {
        expect(screen.getByText('Network error')).toBeInTheDocument();
      });
    });

    it('should disable submit button while submitting', async () => {
      mockedAxios.post.mockImplementation(() => new Promise(() => {}));

      const store = createMockStore();

      render(
        <Provider store={store}>
          <CheckpointGate chapterId="chapter-1" onPass={mockOnPass} />
        </Provider>
      );

      await waitFor(() => {
        expect(screen.getByText('Question 1')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByLabelText('A'));
      fireEvent.click(screen.getByText('Submit Checkpoint'));

      await waitFor(() => {
        const submitButton = screen.getByText('Submitting...');
        expect(submitButton).toBeDisabled();
      });
    });
  });
});
