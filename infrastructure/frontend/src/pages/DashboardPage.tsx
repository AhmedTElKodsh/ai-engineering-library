import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store';
import { setModules, setCurrentModule } from '../store';
import { setProgress } from '../store';
import axios from 'axios';

function DashboardPage() {
  const { user, token } = useAppSelector((state) => state.auth);
  const modules = useAppSelector((state) => state.modules.items);
  const progress = useAppSelector((state) => state.progress.items);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const [modulesRes, progressRes] = await Promise.all([
          axios.get('http://localhost:3001/api/v1/content/modules', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`http://localhost:3001/api/v1/progress/users/${user?.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        dispatch(setModules(modulesRes.data));
        dispatch(setProgress(progressRes.data));
        setLoading(false);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to load data');
        setLoading(false);
      }
    };

    fetchData();
  }, [token, user?.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  const completedCount = progress.filter((p: any) => p.completed).length;
  const totalChapters = modules.reduce((acc: number, m: any) => acc + m.chapters?.length || 0, 0);
  const progressPercentage = totalChapters > 0 ? Math.round((completedCount / totalChapters) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Welcome, {user?.name || 'Learner'}!</h1>

        {/* Progress Overview */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Progress Overview</h2>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-blue-600 h-4 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
            <span className="text-sm text-gray-600">{progressPercentage}% Complete</span>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{completedCount}</div>
              <div className="text-sm text-gray-600">Chapters Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{modules.length}</div>
              <div className="text-sm text-gray-600">Modules Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{totalChapters}</div>
              <div className="text-sm text-gray-600">Total Chapters</div>
            </div>
          </div>
        </div>

        {/* Modules Grid */}
        <h2 className="text-2xl font-bold mb-4">Learning Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module: any) => {
            const moduleProgress = progress.filter((p: any) => 
              module.chapters?.some((c: any) => c.id === p.chapterId)
            );
            const moduleCompleted = moduleProgress.filter((p: any) => p.completed).length;
            const totalModuleChapters = module.chapters?.length || 0;
            const modulePercentage = totalModuleChapters > 0 
              ? Math.round((moduleCompleted / totalModuleChapters) * 100) 
              : 0;

            return (
              <Link
                key={module.id}
                to={`/modules/${module.id}`}
                className="bg-white rounded-lg shadow hover:shadow-lg transition p-6 block"
              >
                <h3 className="text-lg font-semibold mb-2">{module.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{module.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Order: {module.order}</span>
                  <span className="text-sm font-medium text-blue-600">{modulePercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${modulePercentage}%` }}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;