import { useState } from 'react';

interface Question {
  id: string;
  type: string;
  content: string;
  options?: string[];
  order: number;
}

interface QuestionSetProps {
  questions: Question[];
  answers: Record<string, string>;
  onAnswer: (questionId: string, answer: string) => void;
  onSubmit: () => void;
  submiting?: boolean;
}

function QuestionSet({ questions, answers, onAnswer, onSubmit, submitting = false }: QuestionSetProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const question = questions[currentIndex];

  const canSubmit = () => {
    return questions.every(q => answers[q.id] !== undefined);
  };

  if (!question) {
    return <div className="p-4">No questions available.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>Question {currentIndex + 1} of {questions.length}</span>
          <span>{Math.round(((currentIndex + 1) / questions.length) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          {question.content}
        </h2>

        {question.type === 'multiple-choice' && question.options?.map((option, idx) => (
          <div key={idx} className="mb-3">
            <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition">
              <input
                type="radio"
                name={question.id}
                value={option}
                checked={answers[question.id] === option}
                onChange={() => onAnswer(question.id, option)}
                className="w-5 h-5 text-blue-600"
              />
              <span className="text-gray-800">{option}</span>
            </label>
          </div>
        ))}

        {question.type === 'short-answer' && (
          <textarea
            value={answers[question.id] || ''}
            onChange={(e) => onAnswer(question.id, e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={4}
            placeholder="Type your answer here..."
          />
        )}

        {question.type === 'coding' && (
          <textarea
            value={answers[question.id] || ''}
            onChange={(e) => onAnswer(question.id, e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={10}
            placeholder="Write your code here..."
            spellCheck={false}
          />
        )}

        {question.type === 'design' && (
          <textarea
            value={answers[question.id] || ''}
            onChange={(e) => onAnswer(question.id, e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={8}
            placeholder="Describe your design approach..."
          />
        )}
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
          disabled={currentIndex === 0}
          className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Previous
        </button>

        {currentIndex < questions.length - 1 ? (
          <button
            onClick={() => setCurrentIndex(prev => prev + 1)}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Next
          </button>
        ) : (
          <button
            onClick={onSubmit}
            disabled={submitting || !canSubmit()}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {submitting ? 'Submitting...' : 'Submit All Answers'}
          </button>
        )}
      </div>

      {!canSubmit() && currentIndex === questions.length - 1 && (
        <p className="text-yellow-600 text-sm mt-3 text-center">
          Please answer all questions before submitting.
        </p>
      )}
    </div>
  );
}

export default QuestionSet;