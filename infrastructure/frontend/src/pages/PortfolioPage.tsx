import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppSelector } from '../store';
import axios from 'axios';

function PortfolioPage() {
  const { slug } = useParams<{ slug?: string }>();
  const { token, user } = useAppSelector((state) => state.auth);
  const [portfolio, setPortfolio] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const isOwnPortfolio = !slug || slug === user?.portfolioSlug;

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        let url = 'http://localhost:3001/api/v1/portfolio/users/' + user?.id;
        if (slug) {
          url = `http://localhost:3001/api/v1/portfolio/public/${slug}`;
        }

        const response = await axios.get(url, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        setPortfolio(response.data);
        setLoading(false);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to load portfolio');
        setLoading(false);
      }
    };

    if (token || slug) fetchPortfolio();
  }, [token, slug, user?.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading portfolio...</div>
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {isOwnPortfolio && (
          <Link to="/dashboard" className="text-blue-600 hover:underline mb-4 inline-block">
            ← Back to Dashboard
          </Link>
        )}

        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {portfolio.userName || 'Portfolio'}
          </h1>
          {portfolio.userBio && (
            <p className="text-gray-600 mb-4">{portfolio.userBio}</p>
          )}
        </div>

        <h2 className="text-2xl font-bold mb-4">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolio.projects?.map((project: any, index: number) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{project.description}</p>
              {project.technologies && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech: string, i: number) => (
                    <span key={i} className="bg-gray-100 px-2 py-1 rounded text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex space-x-4">
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
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PortfolioPage;