import { useState } from 'react';
import { useAppSelector } from '../store';
import axios from 'axios';

interface FeedbackFormProps {
  chapterId?: string;
  onSubmitSuccess?: () => void;
}

function FeedbackForm({ chapterId, onSubmitSuccess }: FeedbackFormProps) {
  const { token, user } = useAppSelector((state) => state.auth);
  const [feedbackType, setFeedbackType] = useState<'helpful' | 'issue' | 'suggestion'>('helpful');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState<number>(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setSubmitting(true);
    setError('');

    try {
      await axios.post(
        'http://localhost:3001/api/v1/feedback',
        {
          type: feedbackType,
          content,
          rating: feedbackType === 'helpful' ? rating : undefined,
          chapterId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess(true);
      if (onSubmitSuccess) onSubmitSuccess();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to submit feedback');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <div className="text-4xl mb-4">✓</div>
          <h2 className="text-2xl font-bold text-green-800 mb-2">Thank You!</h2>
          <p className="text-green-700">Your feedback has been submitted successfully.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Feedback & Issue Reporting</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded">{error}</div>
        )}

        {/* Feedback Type */}
        <div>
          <label className="block text-sm font-medium mb-2">Feedback Type</label>
          <div className="flex gap-2">
            {(['helpful', 'issue', 'suggestion'] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setFeedbackType(type)}
                className={`px-4 py-2 rounded capitalize ${
                  feedbackType === type
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Rating (for helpful feedback) */}
        {feedbackType === 'helpful' && (
          <div>
            <label className="block text-sm font-medium mb-2">Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`text-2xl ${
                    star <= rating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Content */}
        <div>
          <label className="block text-sm font-medium mb-2">
            {feedbackType === 'issue' ? 'Describe the Issue' : 'Your Feedback'}
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            placeholder={
              feedbackType === 'issue'
                ? 'Please describe the issue in detail...'
                : 'Share your thoughts...'
            }
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Chapter Context */}
        {chapterId && (
          <p className="text-sm text-gray-500">Feedback for chapter: {chapterId}</p>
        )}

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submitting || !content.trim()}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {submitting ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FeedbackForm;