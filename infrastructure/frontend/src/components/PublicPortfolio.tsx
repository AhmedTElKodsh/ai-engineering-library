import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Project {
  title: string;
  description?: string;
  githubUrl?: string;
  demoUrl?: string;
  technologies?: string[];
  screenshots?: string[];
}

interface PortfolioData {
  userName?: string;
  userBio?: string;
  projects: Project[];
}

function PublicPortfolio() {
  const { slug } = useParams<{ slug: string }>();
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/v1/portfolio/public/${slug}`
        );
        setPortfolio(response.data);
        setLoading(false);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Portfolio not found');
        setLoading(false);
      }
    };

    if (slug) fetchPortfolio();
  }, [slug]);

  if (loading) {
    return <div className="p-8 text-center">Loading portfolio...</div>;
  }

  if (error || !portfolio) {
    return <div className="p-8 text-center text-red-600">{error || 'Portfolio not found'}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-8 mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">{portfolio.userName || 'Portfolio'}</h1>
          {portfolio.userBio && (
            <p className="text-gray-600 max-w-2xl mx-auto">{portfolio.userBio}</p>
          )}
          <div className="mt-4 text-sm text-gray-500">
            Powered by AI Engineering Curriculum
          </div>
        </div>

        {/* Projects */}
        <h2 className="text-2xl font-bold mb-6">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolio.projects?.map((project, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
              {project.description && (
                <p className="text-gray-600 text-sm mb-4">{project.description}</p>
              )}
              
              {project.technologies && project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
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

              {project.screenshots && project.screenshots.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {project.screenshots.slice(0, 4).map((screenshot, i) => (
                    <img
                      key={i}
                      src={screenshot}
                      alt={`Screenshot ${i + 1}`}
                      className="rounded border border-gray-200"
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PublicPortfolio;