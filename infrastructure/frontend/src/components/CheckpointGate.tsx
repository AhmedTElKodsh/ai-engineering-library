import { useState, useEffect } from 'react';
import { useAppSelector } from '../store';
import axios from 'axios';

interface CheckpointGateProps {
  chapterId: string;
  onPass: () => void;
}

function CheckpointGate({ chapterId, onPass }: CheckpointGateProps) {
  const { token, user } = useAppSelector((state) => state.auth);
  const [attempt, setAttempt] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const startAttempt = async () => {
      try {
        const response = await axios.post(
          `http://localhost:3001/api/v1/assessments/checkpoint/${chapterId}/start`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setAttempt(response.data);
        setLoading(false);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to start checkpoint');
        setLoading(false);
      }
    };

    if (token) startAttempt();
  }, [token, chapterId]);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const response = await axios.post(
        'http://localhost:3001/api/v1/assessments/checkpoint/submit',
        { attemptId: attempt.attemptId, answers },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResult(response.data);
      if (response.data.status === 'passed') {
        onPass();
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to submit');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading checkpoint...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-600">{error}</div>;
  }

  if (result && result.status !== 'passed') {
    return (
      <div className="max-w-2xl mx-auto p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-red-800 mb-2">Checkpoint Failed</h2>
          <p className="text-red-700 mb-4">{result.feedback}</p>
          <div className="bg-white p-4 rounded">
            <h3 className="font-semibold mb-2">Gap Analysis</h3>
            <ul className="list-disc pl-5">
              {result.gaps?.map((gap: string, i: number) => (
                <li key={i} className="text-gray-700">{gap}</li>
              ))}
            </ul>
          </div>
        </div>
        <button
          onClick={() => { setResult(null); setAnswers({}); }}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Retry Checkpoint
        </button>
      </div>
    );
  }

  if (result?.status === 'passed') {
    return (
      <div className="max-w-2xl mx-auto p-8 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-green-600 mb-2">Checkpoint Passed!</h2>
        <p className="text-gray-600">You can now proceed to the next module.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-2">Checkpoint Assessment</h1>
      <p className="text-gray-600 mb-6">Complete this checkpoint to unlock the next module.</p>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        {attempt?.questions?.map((question: any, index: number) => (
          <div key={question.id} className="mb-6">
            <h3 className="font-semibold mb-2">
              Question {index + 1}: {question.content}
            </h3>

            {question.type === 'multiple-choice' && question.options?.map((option: string) => (
              <label key={option} className="flex items-center space-x-2 mb-2 cursor-pointer">
                <input
                  type="radio"
                  name={question.id}
                  value={option}
                  checked={answers[question.id] === option}
                  onChange={() => setAnswers(prev => ({ ...prev, [question.id]: option }))}
                  className="w-4 h-4"
                />
                <span>{option}</span>
              </label>
            ))}

            {question.type === 'short-answer' && (
              <textarea
                value={answers[question.id] || ''}
                onChange={(e) => setAnswers(prev => ({ ...prev, [question.id]: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded"
                rows={3}
              />
            )}
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={submitting || Object.keys(answers).length < (attempt?.questions?.length || 0)}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {submitting ? 'Submitting...' : 'Submit Checkpoint'}
      </button>
    </div>
  );
}

export default CheckpointGate;