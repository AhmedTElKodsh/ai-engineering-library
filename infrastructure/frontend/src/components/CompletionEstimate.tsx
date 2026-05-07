import { useEffect, useState } from 'react';
import { useAppSelector } from '../store';
import axios from 'axios';

function CompletionEstimate() {
  const { token, user } = useAppSelector((state) => state.auth);
  const [duration, setDuration] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDuration = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/v1/progress/users/${user?.id}/duration`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setDuration(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load duration', err);
        setLoading(false);
      }
    };

    if (token && user) fetchDuration();
  }, [token, user]);

  if (loading) {
    return <div className="p-4">Loading estimate...</div>;
  }

  if (!duration) {
    return <div className="p-4">Failed to load estimate.</div>;
  }

  const completionDate = new Date(duration.estimatedCompletionDate).toLocaleDateString();
  const weeksRemaining = duration.weeksRemaining;
  const onTrack = duration.onTrack;

  return (
    <div className="my-8 bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Completion Estimate</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600">{completionDate}</div>
          <div className="text-sm text-gray-500">Estimated Completion</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-green-600">{weeksRemaining}</div>
          <div className="text-sm text-gray-500">Weeks Remaining</div>
        </div>
        <div className="text-center">
          <div className={`text-3xl font-bold ${onTrack ? 'text-green-600' : 'text-yellow-600'}`}>
            {onTrack ? '✓' : '⚠'}
          </div>
          <div className="text-sm text-gray-500">
            {onTrack ? 'On Track' : 'Behind Pace'}
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-sm text-blue-800">
          Based on your current pace of {duration.currentPace} hours/week, you are projected to complete the curriculum by {completionDate}.
        </p>
        {!onTrack && (
          <p className="text-sm text-yellow-800 mt-2">
            Consider increasing your weekly commitment to get back on track.
          </p>
        )}
      </div>
    </div>
  );
}

export default CompletionEstimate;