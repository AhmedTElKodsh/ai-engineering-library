import { useState } from 'react';

interface Review {
  id: string;
  overallScore: number;
  strengths: string[];
  improvements: string[];
  generalFeedback: string;
  recommendation: string;
  reviewerName?: string;
  reviewDate?: string;
  codeComments?: Array<{
    id: string;
    lineNumber: number;
    content: string;
    severity: string;
    filename: string;
    resolved: boolean;
  }>;
}

interface ReviewFeedbackDisplayProps {
  reviews: Review[];
  onRespond?: (reviewId: string, response: string) => void;
}

function ReviewFeedbackDisplay({ reviews, onRespond }: ReviewFeedbackDisplayProps) {
  const [expandedReview, setExpandedReview] = useState<string | null>(null);
  const [responseText, setResponseText] = useState<Record<string, string>>({});

  const handleResponse = (reviewId: string) => {
    if (responseText[reviewId]?.trim() && onRespond) {
      onRespond(reviewId, responseText[reviewId]);
      setResponseText(prev => ({ ...prev, [reviewId]: '' }));
    }
  };

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-6">Review Feedback</h2>
      <div className="space-y-6">
        {reviews.map((review) => {
          const isExpanded = expandedReview === review.id;
          
          return (
            <div key={review.id} className="bg-white rounded-lg shadow p-6">
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setExpandedReview(isExpanded ? null : review.id)}
              >
                <div>
                  <h3 className="font-semibold">
                    Review by {review.reviewerName || 'Anonymous'}
                    {review.reviewDate && (
                      <span className="ml-2 text-sm text-gray-500">
                        {new Date(review.reviewDate).toLocaleDateString()}
                      </span>
                    )}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-medium">Score: {review.overallScore}/100</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      review.recommendation === 'approve' ? 'bg-green-100 text-green-800' :
                      review.recommendation === 'revision-required' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {review.recommendation}
                    </span>
                  </div>
                </div>
                <span className="text-gray-400">{isExpanded ? '▲' : '▼'}</span>
              </div>

              {isExpanded && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  {/* Strengths */}
                  {review.strengths.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-green-700 mb-2">Strengths</h4>
                      <ul className="list-disc pl-5">
                        {review.strengths.map((s, i) => (
                          <li key={i} className="text-gray-700">{s}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Improvements */}
                  {review.improvements.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-yellow-700 mb-2">Areas for Improvement</h4>
                      <ul className="list-disc pl-5">
                        {review.improvements.map((imp, i) => (
                          <li key={i} className="text-gray-700">{imp}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* General Feedback */}
                  {review.generalFeedback && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">General Feedback</h4>
                      <p className="text-gray-700">{review.generalFeedback}</p>
                    </div>
                  )}

                  {/* Code Comments */}
                  {review.codeComments && review.codeComments.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Code Comments</h4>
                      <div className="space-y-2">
                        {review.codeComments
                          .filter(c => !c.resolved)
                          .map(comment => (
                            <div key={comment.id} className={`p-3 rounded ${
                              comment.severity === 'critical' ? 'bg-red-50' :
                              comment.severity === 'issue' ? 'bg-yellow-50' :
                              'bg-blue-50'
                            }`}>
                              <div className="flex justify-between items-start">
                                <span className="text-xs text-gray-500">
                                  {comment.filename}:{comment.lineNumber}
                                </span>
                                <span className="text-xs px-2 py-1 rounded bg-gray-200">
                                  {comment.severity}
                                </span>
                              </div>
                              <p className="text-sm mt-1">{comment.content}</p>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Response */}
                  {onRespond && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h4 className="font-semibold mb-2">Your Response</h4>
                      <textarea
                        value={responseText[review.id] || ''}
                        onChange={(e) => setResponseText(prev => ({ 
                          ...prev, 
                          [review.id]: e.target.value 
                        }))}
                        placeholder="Respond to this review..."
                        rows={3}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                      <button
                        onClick={() => handleResponse(review.id)}
                        disabled={!responseText[review.id]?.trim()}
                        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                      >
                        Send Response
                      </button>
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

export default ReviewFeedbackDisplay;