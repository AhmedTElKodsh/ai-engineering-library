import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../store';
import axios from 'axios';

function ProgressDashboard() {
  const { token, user } = useAppSelector((state) => state.auth);
  const [progress, setProgress] = useState<any[]>([]);
  const [modules, setModules] = useState<any[]>([]);
  const [milestones, setMilestones] = useState<any[]>([]);
  const [duration, setDuration] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [progressRes, modulesRes, durationRes] = await Promise.all([
          axios.get(`http://localhost:3001/api/v1/progress/users/${user?.id}`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get('http://localhost:3001/api/v1/content/modules'),
          axios.get(`http://localhost:3001/api/v1/progress/users/${user?.id}/duration`, {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        setProgress(progressRes.data || []);
        setModules(modulesRes.data || []);
        setDuration(durationRes.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load dashboard data', err);
        setLoading(false);
      }
    };

    if (token && user) fetchData();
  }, [token, user]);

  if (loading) {
    return <div className="p-8 text-center">Loading dashboard...</div>;
  }

  const completedCount = progress.filter(p => p.completed).length;
  const totalChapters = modules.reduce((acc, m) => acc + (m.chapters?.length || 0), 0);
  const progressPercentage = totalChapters > 0 ? Math.round((completedCount / totalChapters) * 100) : 0;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Progress Dashboard</h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Chapters Completed</p>
          <p className="text-2xl font-bold text-blue-600">{completedCount}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Total Chapters</p>
          <p className="text-2xl font-bold text-gray-900">{totalChapters}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Progress</p>
          <p className="text-2xl font-bold text-green-600">{progressPercentage}%</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Weeks Remaining</p>
          <p className="text-2xl font-bold text-purple-600">{duration?.weeksRemaining || 0}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">Overall Progress</span>
          <span className="text-sm text-gray-500">{progressPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-blue-600 h-4 rounded-full transition-all"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Module Progress */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Module Progress</h2>
        <div className="space-y-4">
          {modules.map((module) => {
            const moduleChapters = module.chapters || [];
            const completedInModule = progress.filter(p => 
              moduleChapters.some(c => c.id === p.chapterId && p.completed)
            ).length;
            const modulePercentage = moduleChapters.length > 0 
              ? Math.round((completedInModule / moduleChapters.length) * 100) 
              : 0;

            return (
              <div key={module.id}>
                <div className="flex justify-between mb-1">
                  <Link to={`/modules/${module.id}`} className="text-blue-600 hover:underline">
                    {module.title}
                  </Link>
                  <span className="text-sm text-gray-500">{completedInModule}/{moduleChapters.length}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${modulePercentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Milestones Summary */}
      {milestones.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Recent Milestones</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {milestones.slice(0, 4).map((milestone) => (
              <div key={milestone.id} className="text-center p-3 border rounded-lg">
                <div className="text-2xl mb-1">{milestone.achievedAt ? '🏆' : '🔒'}</div>
                <p className="text-xs text-gray-600">{milestone.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/modules"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Continue Learning
          </Link>
          <Link
            to="/portfolio"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            View Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProgressDashboard;