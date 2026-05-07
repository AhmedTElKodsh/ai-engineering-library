import { useState } from 'react';

interface ReviewInterfaceProps {
  submissionId: string;
  submissionData: {
    githubUrl?: string;
    demoUrl?: string;
    description?: string;
    technologies?: string[];
    screenshots?: string[];
  };
  previousReviews?: Array<{
    id: string;
    overallScore: number;
    recommendation: string;
  }>;
  onSubmitReview: (review: {
    codeQuality: number;
    documentation: number;
    testing: number;
    deployment: number;
    strengths: string[];
    improvements: string[];
    recommendation: string;
    generalFeedback: string;
  }) => void;
}

function ReviewInterface({ submissionData, previousReviews, onSubmitReview }: ReviewInterfaceProps) {
  const [scores, setScores] = useState({
    codeQuality: 0,
    documentation: 0,
    testing: 0,
    deployment: 0,
  });
  const [strengths, setStrengths] = useState<string[]>([]);
  const [improvements, setImprovements] = useState<string[]>([]);
  const [recommendation, setRecommendation] = useState('');
  const [generalFeedback, setGeneralFeedback] = useState('');
  const [newStrength, setNewStrength] = useState('');
  const [newImprovement, setNewImprovement] = useState('');

  const addStrength = () => {
    if (newStrength.trim()) {
      setStrengths([...strengths, newStrength.trim()]);
      setNewStrength('');
    }
  };

  const addImprovement = () => {
    if (newImprovement.trim()) {
      setImprovements([...improvements, newImprovement.trim()]);
      setNewImprovement('');
    }
  };

  const calculateOverallScore = () => {
    const { codeQuality, documentation, testing, deployment } = scores;
    return Math.round((codeQuality + documentation + testing + deployment) / 4);
  };

  const handleSubmit = () => {
    onSubmitReview({
      ...scores,
      strengths,
      improvements,
      recommendation,
      generalFeedback,
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Review Submission</h1>

      {/* Submission Details */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Submission Details</h2>
        {submissionData.githubUrl && (
          <p className="mb-2">
            <span className="font-medium">GitHub:</span>{' '}
            <a href={submissionData.githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              {submissionData.githubUrl}
            </a>
          </p>
        )}
        {submissionData.demoUrl && (
          <p className="mb-4">
            <span className="font-medium">Demo:</span>{' '}
            <a href={submissionData.demoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              {submissionData.demoUrl}
            </a>
          </p>
        )}
        {submissionData.description && (
          <div className="mb-4">
            <p className="font-medium mb-2">Description:</p>
            <p className="text-gray-700">{submissionData.description}</p>
          </div>
        )}
      </div>

      {/* Previous Reviews */}
      {previousReviews && previousReviews.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Previous Reviews</h2>
          {previousReviews.map((review, index) => (
            <div key={review.id} className="mb-4 p-4 bg-gray-50 rounded">
              <p className="font-medium">Review {index + 1} - Score: {review.overallScore}/100</p>
              <p className="text-sm text-gray-600">Recommendation: {review.recommendation}</p>
            </div>
          ))}
        </div>
      )}

      {/* Rubric Scoring */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Rubric Scoring</h2>
        {Object.entries(scores).map(([category, score]) => (
          <div key={category} className="mb-4">
            <div className="flex justify-between mb-2">
              <label className="font-medium capitalize">{category.replace(/([A-Z])/g, ' $1').trim()}</label>
              <span className="text-sm text-gray-600">{score}/100</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={score}
              onChange={(e) => setScores({ ...scores, [category]: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>
        ))}
        <div className="mt-4 p-4 bg-blue-50 rounded">
          <p className="font-bold">Overall Score: {calculateOverallScore()}/100</p>
        </div>
      </div>

      {/* Strengths */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Strengths</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newStrength}
            onChange={(e) => setNewStrength(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addStrength()}
            placeholder="Add a strength..."
            className="flex-1 p-2 border border-gray-300 rounded"
          />
          <button onClick={addStrength} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Add
          </button>
        </div>
        <ul className="list-disc pl-5">
          {strengths.map((s, i) => (
            <li key={i} className="text-gray-700">{s}</li>
          ))}
        </ul>
      </div>

      {/* Improvements */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Areas for Improvement</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newImprovement}
            onChange={(e) => setNewImprovement(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addImprovement()}
            placeholder="Add an improvement..."
            className="flex-1 p-2 border border-gray-300 rounded"
          />
          <button onClick={addImprovement} className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700">
            Add
          </button>
        </div>
        <ul className="list-disc pl-5">
          {improvements.map((imp, i) => (
            <li key={i} className="text-gray-700">{imp}</li>
          ))}
        </ul>
      </div>

      {/* Recommendation */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Recommendation</h2>
        <div className="space-y-2">
          {['approve', 'revision-required', 'needs-work'].map((rec) => (
            <label key={rec} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="recommendation"
                value={rec}
                checked={recommendation === rec}
                onChange={() => setRecommendation(rec)}
                className="w-4 h-4"
              />
              <span className="capitalize">{rec.replace(/-/g, ' ')}</span>
            </label>
          ))}
        </div>
      </div>

      {/* General Feedback */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">General Feedback</h2>
        <textarea
          value={generalFeedback}
          onChange={(e) => setGeneralFeedback(e.target.value)}
          rows={6}
          placeholder="Provide detailed feedback..."
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={!recommendation || calculateOverallScore() === 0}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
}

export default ReviewInterface;