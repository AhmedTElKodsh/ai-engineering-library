import { useState, useEffect } from 'react';
import { useAppSelector } from '../store';
import axios from 'axios';

interface DurationData {
  totalWeeks: number;
  weeksCompleted: number;
  weeksRemaining: number;
  weeklyHours: number;
  estimatedCompletionDate: string;
  currentPace: number;
  onTrack: boolean;
  recommendation?: string;
}

function DurationCalculator() {
  const { token, user } = useAppSelector((state) => state.auth);
  const [duration, setDuration] = useState<DurationData | null>(null);
  const [weeklyHours, setWeeklyHours] = useState(10);
  const [loading, setLoading] = useState(true);

  const fetchDuration = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/v1/progress/users/${user?.id}/duration`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDuration(response.data);
      setWeeklyHours(response.data.weeklyHours || 10);
      setLoading(false);
    } catch (err) {
      console.error('Failed to load duration', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && user) fetchDuration();
  }, [token, user]);

  const handleWeeklyHoursChange = async (hours: number) => {
    setWeeklyHours(hours);
    try {
      await axios.put(
        `http://localhost:3001/api/v1/progress/users/${user?.id}/weekly-hours`,
        { weeklyHours: hours },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchDuration();
    } catch (err) {
      console.error('Failed to update weekly hours', err);
    }
  };

  if (loading) {
    return <div className="p-4">Loading duration calculator...</div>;
  }

  if (!duration) {
    return <div className="p-4">Failed to load duration data.</div>;
  }

  return (
    <div className="my-8 bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Learning Pace Calculator</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Stats */}
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Total Weeks</p>
            <p className="text-2xl font-bold">{duration.totalWeeks}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Weeks Completed</p>
            <p className="text-2xl font-bold text-green-600">{duration.weeksCompleted}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Weeks Remaining</p>
            <p className="text-2xl font-bold text-blue-600">{duration.weeksRemaining}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Estimated Completion</p>
            <p className="text-xl font-semibold">
              {new Date(duration.estimatedCompletionDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Right: Controls */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Weekly Hours Commitment: <span className="text-blue-600 font-bold">{weeklyHours}</span>
            </label>
            <input
              type="range"
              min={1}
              max={40}
              value={weeklyHours}
              onChange={(e) => handleWeeklyHoursChange(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>1 hour</span>
              <span>40 hours</span>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Current Pace This Week</p>
            <p className="text-lg font-semibold">{duration.currentPace} hours</p>
            {duration.onTrack ? (
              <p className="text-sm text-green-600">✓ On track!</p>
            ) : (
              <p className="text-sm text-yellow-600">⚠ Behind pace</p>
            )}
          </div>

          {duration.recommendation && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">{duration.recommendation}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DurationCalculator;