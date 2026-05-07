import { useState } from 'react';

interface RubricScores {
  codeQuality: number;
  documentation: number;
  testing: number;
  deployment: number;
}

interface ReviewRubricProps {
  scores: RubricScores;
  onChange?: (scores: RubricScores) => void;
  readonly?: boolean;
}

function ReviewRubric({ scores, onChange, readonly = false }: ReviewRubricProps) {
  const [localScores, setLocalScores] = useState<RubricScores>(scores);

  const handleChange = (category: keyof RubricScores, value: number) => {
    const newScores = { ...localScores, [category]: value };
    setLocalScores(newScores);
    if (onChange) onChange(newScores);
  };

  const calculateOverall = () => {
    const { codeQuality, documentation, testing, deployment } = localScores;
    return Math.round((codeQuality + documentation + testing + deployment) / 4);
  };

  const getScoreDescription = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Work';
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const categories = [
    { key: 'codeQuality' as const, label: 'Code Quality', description: 'Clean, maintainable, follows best practices' },
    { key: 'documentation' as const, label: 'Documentation', description: 'Clear comments, README, API docs' },
    { key: 'testing' as const, label: 'Testing', description: 'Unit tests, integration tests, coverage' },
    { key: 'deployment' as const, label: 'Deployment', description: 'CI/CD, containerization, production-ready' },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-6">Review Rubric</h2>

      <div className="space-y-6">
        {categories.map(({ key, label, description }) => (
          <div key={key}>
            <div className="flex justify-between items-center mb-2">
              <div>
                <h3 className="font-semibold">{label}</h3>
                <p className="text-xs text-gray-500">{description}</p>
              </div>
              <span className={`text-lg font-bold ${getScoreColor(localScores[key])}`}>
                {localScores[key]}/100
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={localScores[key]}
              onChange={(e) => !readonly && handleChange(key, parseInt(e.target.value))}
              disabled={readonly}
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">
              {getScoreDescription(localScores[key])} ({localScores[key]}/100)
            </p>
          </div>
        ))}
      </div>

      {/* Overall Score */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">Overall Score</h3>
          <div className="text-center">
            <div className={`text-3xl font-bold ${getScoreColor(calculateOverall())}`}>
              {calculateOverall()}/100
            </div>
            <p className="text-sm text-gray-500">{getScoreDescription(calculateOverall())}</p>
          </div>
        </div>

        {/* Score Breakdown Chart */}
        <div className="mt-4 space-y-2">
          {categories.map(({ key, label }) => (
            <div key={key} className="flex items-center gap-2">
              <span className="text-xs w-24">{label}</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    localScores[key] >= 80 ? 'bg-green-500' :
                    localScores[key] >= 60 ? 'bg-blue-500' :
                    localScores[key] >= 40 ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${localScores[key]}%` }}
                />
              </div>
              <span className="text-xs w-12 text-right">{localScores[key]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reset Button */}
      {!readonly && (
        <button
          onClick={() => {
            const resetScores = { codeQuality: 0, documentation: 0, testing: 0, deployment: 0 };
            setLocalScores(resetScores);
            if (onChange) onChange(resetScores);
          }}
          className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          Reset Scores
        </button>
      )}
    </div>
  );
}

export default ReviewRubric;