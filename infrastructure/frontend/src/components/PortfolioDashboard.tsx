import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../store';
import axios from 'axios';

interface Project {
  id: string;
  title: string;
  type: string;
  status: string;
  githubUrl?: string;
  demoUrl?: string;
  screenshots?: string[];
  technologies?: string[];
  reviewScore?: number;
  revisionNumber: number;
  isPortfolioReady: boolean;
}

function PortfolioDashboard() {
  const { token, user } = useAppSelector((state) => state.auth);
  const [portfolio, setPortfolio] = useState<{
    projects: Project[];
    userName?: string;
    userBio?: string;
    portfolioSlug?: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/v1/portfolio/users/${user?.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setPortfolio(response.data);
        setLoading(false);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to load portfolio');
        setLoading(false);
      }
    };

    if (token && user) fetchPortfolio();
  }, [token, user]);

  const handleGeneratePublic = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3001/api/v1/portfolio/users/${user?.id}/generate-public`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Public portfolio generated! URL: ' + response.data.slug);
      // Refresh
      setLoading(true);
      // re-fetch
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to generate public portfolio');
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading portfolio...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-600">{error}</div>;
  }

  if (!portfolio) {
    return <div className="p-8">No portfolio data.</div>;
  }

  const projects = portfolio.projects || [];
  const readyCount = projects.filter(p => p.isPortfolioReady).length;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Portfolio</h1>
        <div className="space-x-2">
          <button
            onClick={handleGeneratePublic}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Generate Public Portfolio
          </button>
          <Link
            to="/portfolio"
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            View Public
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Total Projects</p>
          <p className="text-2xl font-bold">{projects.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Portfolio Ready</p>
          <p className="text-2xl font-bold text-green-600">{readyCount}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Completion</p>
          <p className="text-2xl font-bold text-blue-600">
            {projects.length > 0 ? Math.round((readyCount / projects.length) * 100) : 0}%
          </p>
        </div>
      </div>

      {/* Projects Grid */}
      <h2 className="text-2xl font-bold mb-4">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold">{project.title}</h3>
              <span className={`px-2 py-1 rounded text-xs ${
                project.status === 'approved' ? 'bg-green-100 text-green-800' :
                project.status === 'pending-review' ? 'bg-yellow-100 text-yellow-800' :
                project.status === 'revision-requested' ? 'bg-red-100 text-red-800' :
                'bg-gray-100 text-gray-600'
              }`}>
                {project.status}
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-2">Type: {project.type}</p>
            {project.reviewScore !== undefined && (
              <p className="text-sm text-gray-600 mb-2">Score: {project.reviewScore}/100</p>
            )}
            <div className="flex space-x-2 mt-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  GitHub
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  Demo
                </a>
              )}
            </div>
            <button
              onClick={() => {
                // Toggle portfolio ready
                axios.post(
                  `http://localhost:3001/api/v1/portfolio/users/${user?.id}/projects/${project.id}/mark-ready`,
                  { isReady: !project.isPortfolioReady },
                  { headers: { Authorization: `Bearer ${token}` } }
                ).then(() => {
                  // refresh
                  setLoading(true);
                }).catch(err => alert('Failed to update'));
              }}
              className={`mt-2 px-3 py-1 rounded text-sm ${
                project.isPortfolioReady
                  ? 'bg-green-200 text-green-800'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {project.isPortfolioReady ? '✓ Portfolio Ready' : 'Mark as Ready'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PortfolioDashboard;