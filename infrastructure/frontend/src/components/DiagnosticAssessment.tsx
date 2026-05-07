import { useState, useEffect } from 'react';
import { useAppSelector } from '../store';
import axios from 'axios';

interface Question {
  id: string;
  type: string;
  content: string;
  options?: string[];
  order: number;
}

function DiagnosticAssessment() {
  const { token, user } = useAppSelector((state) => state.auth);
  const [attemptId, setAttemptId] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const startAssessment = async () => {
      try {
        const response = await axios.post(
          'http://localhost:3001/api/v1/assessments/diagnostic/start',
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setAttemptId(response.data.attemptId);
        setQuestions(response.data.questions || []);
        setLoading(false);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to start assessment');
        setLoading(false);
      }
    };

    if (token) startAssessment();
  }, [token]);

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const response = await axios.post(
        'http://localhost:3001/api/v1/assessments/diagnostic/submit',
        { attemptId, answers },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResult(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to submit assessment');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading assessment...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-600">{error}</div>;
  }

  if (result) {
    return (
      <div className="max-w-2xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Assessment Result</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-lg mb-4">
            Recommended entry point: <span className="font-bold text-blue-600">Module {result.entryPoint}</span>
          </p>
          <p className="text-gray-600 mb-4">{result.recommendation}</p>
          <button
            onClick={() => window.location.href = '/dashboard'}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-2">Diagnostic Assessment</h1>
      <p className="text-gray-600 mb-6">
        Question {currentQuestion + 1} of {questions.length}
      </p>

      {question && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">{question.content}</h2>

          {question.type === 'multiple-choice' && question.options?.map((option, index) => (
            <div key={index} className="mb-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name={question.id}
                  value={option}
                  checked={answers[question.id] === option}
                  onChange={() => handleAnswer(question.id, option)}
                  className="w-4 h-4"
                />
                <span>{option}</span>
              </label>
            </div>
          ))}

          {question.type === 'short-answer' && (
            <textarea
              value={answers[question.id] || ''}
              onChange={(e) => handleAnswer(question.id, e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              rows={4}
            />
          )}

          {question.type === 'coding' && (
            <textarea
              value={answers[question.id] || ''}
              onChange={(e) => handleAnswer(question.id, e.target.value)}
              className="w-full p-2 border border-gray-300 rounded font-mono"
              rows={8}
            />
          )}
        </div>
      )}

      <div className="flex justify-between">
        <button
          onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
          disabled={currentQuestion === 0}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>

        {currentQuestion < questions.length - 1 ? (
          <button
            onClick={() => setCurrentQuestion((prev) => prev + 1)}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="px-6 py-2 bg-green-600 text-white rounded disabled:opacity-50"
          >
            {submitting ? 'Submitting...' : 'Submit'}
          </button>
        )}
      </div>
    </div>
  );
}

export default DiagnosticAssessment;