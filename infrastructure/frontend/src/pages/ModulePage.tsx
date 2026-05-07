import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppSelector } from '../store';
import axios from 'axios';

function ModulePage() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { token } = useAppSelector((state) => state.auth);
  const [module, setModule] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchModule = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/v1/content/modules/${moduleId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setModule(response.data);
        setLoading(false);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to load module');
        setLoading(false);
      }
    };

    if (token) fetchModule();
  }, [moduleId, token]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading module...</div>
      </div>
    );
  }

  if (error || !module) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">{error || 'Module not found'}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <Link to="/dashboard" className="text-blue-600 hover:underline mb-4 inline-block">
          ← Back to Dashboard
        </Link>

        <h1 className="text-3xl font-bold mb-2">{module.title}</h1>
        <p className="text-gray-600 mb-8">{module.description}</p>

        {/* Weeks Section */}
        {module.weeks && module.weeks.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Weekly Schedule</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {module.weeks.map((week: any) => (
                <div key={week.id} className="bg-white p-4 rounded-lg shadow">
                  <h3 className="font-semibold">{week.title || `Week ${week.weekNumber}`}</h3>
                  <p className="text-sm text-gray-600">{week.days?.length || 0} days</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Chapters List */}
        <h2 className="text-2xl font-bold mb-4">Chapters</h2>
        <div className="space-y-4">
          {module.chapters?.map((chapter: any) => (
            <Link
              key={chapter.id}
              to={`/chapters/${chapter.id}`}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition block"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{chapter.title}</h3>
                  <p className="text-sm text-gray-500">Order: {chapter.order}</p>
                </div>
                {chapter.isProject && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    Project
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ModulePage;