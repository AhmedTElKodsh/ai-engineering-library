import { useState } from 'react';

interface Revision {
  id: string;
  submissionDate: string;
  status: string;
  reviewScore?: number;
  changesMade?: string;
  feedbackAddressed?: string;
  review?: {
    id: string;
    overallScore: number;
    strengths: string[];
    improvements: string[];
  };
}

interface RevisionHistoryProps {
  revisions: Revision[];
  currentRevisionId?: string;
}

function RevisionHistory({ revisions, currentRevisionId }: RevisionHistoryProps) {
  const [expandedRevision, setExpandedRevision] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedRevision(prev => prev === id ? null : id);
  };

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-6">Revision History</h2>
      <div className="space-y-4">
        {revisions.map((revision, index) => {
          const isCurrent = revision.id === currentRevisionId;
          const isExpanded = expandedRevision === revision.id;
          
          return (
            <div
              key={revision.id}
              className={`border-2 rounded-lg p-4 ${
                isCurrent ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'
              }`}
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleExpand(revision.id)}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isCurrent ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-semibold">
                      Revision {index + 1}
                      {isCurrent && <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Current</span>}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(revision.submissionDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {revision.reviewScore !== undefined && (
                    <span className="text-sm font-medium">{revision.reviewScore}/100</span>
                  )}
                  <span className={`px-2 py-1 rounded text-xs ${
                    revision.status === 'approved' ? 'bg-green-100 text-green-800' :
                    revision.status === 'pending-review' ? 'bg-yellow-100 text-yellow-800' :
                    revision.status === 'revision-requested' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {revision.status}
                  </span>
                  <span className="text-gray-400">{isExpanded ? '▲' : '▼'}</span>
                </div>
              </div>

              {isExpanded && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  {revision.changesMade && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Changes Made</h4>
                      <p className="text-sm text-gray-600">{revision.changesMade}</p>
                    </div>
                  )}
                  {revision.feedbackAddressed && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Feedback Addressed</h4>
                      <p className="text-sm text-gray-600">{revision.feedbackAddressed}</p>
                    </div>
                  )}
                  {revision.review && (
                    <div>
                      <h4 className="font-semibold mb-2">Review Details</h4>
                      <div className="bg-gray-50 p-4 rounded">
                        <p className="text-sm mb-2">Overall Score: {revision.review.overallScore}/100</p>
                        {revision.review.strengths.length > 0 && (
                          <div className="mb-2">
                            <p className="text-sm font-medium text-green-700">Strengths:</p>
                            <ul className="list-disc pl-5 text-sm text-gray-600">
                              {revision.review.strengths.map((s, i) => (
                                <li key={i}>{s}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {revision.review.improvements.length > 0 && (
                          <div>
                            <p className="text-sm font-medium text-yellow-700">Areas for Improvement:</p>
                            <ul className="list-disc pl-5 text-sm text-gray-600">
                              {revision.review.improvements.map((imp, i) => (
                                <li key={i}>{imp}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RevisionHistory;