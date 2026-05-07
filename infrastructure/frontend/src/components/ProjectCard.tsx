import { Link } from 'react-router-dom';

interface Project {
  id: string;
  title: string;
  type: string;
  status: string;
  githubUrl?: string;
  demoUrl?: string;
  screenshots?: string[];
  reviewScore?: number;
  technologies?: string[];
  revisionNumber: number;
  isPortfolioReady: boolean;
  chapterId?: string;
}

interface ProjectCardProps {
  project: Project;
  onMarkReady?: (projectId: string, isReady: boolean) => void;
  onViewReview?: (projectId: string) => void;
}

function ProjectCard({ project, onMarkReady, onViewReview }: ProjectCardProps) {
  const getStatusColor = () => {
    switch (project.status) {
      case 'approved': return 'border-green-500';
      case 'pending-review': return 'border-yellow-500';
      case 'revision-requested': return 'border-red-500';
      case 'not-submitted': return 'border-gray-300';
      default: return 'border-gray-300';
    }
  };

  const getTypeIcon = () => {
    switch (project.type) {
      case 'mini-project': return '🔨';
      case 'flagship-project': return '🏆';
      case 'capstone': return '🎓';
      default: return '📄';
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow p-6 border-2 ${getStatusColor()}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            {getTypeIcon()} {project.title}
          </h3>
          <p className="text-sm text-gray-500 capitalize">{project.type}</p>
        </div>
        <StatusBadge status={project.status} />
      </div>

      {project.reviewScore !== undefined && (
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Score:</span>
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${project.reviewScore}%` }}
              />
            </div>
            <span className="text-sm font-medium">{project.reviewScore}/100</span>
          </div>
        </div>
      )}

      {project.technologies && project.technologies.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, index) => (
            <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
              {tech}
            </span>
          ))}
        </div>
      )}

      {project.revisionNumber > 0 && (
        <p className="text-xs text-gray-500 mb-2">Revision {project.revisionNumber}</p>
      )}

      <div className="flex gap-2">
        {project.chapterId && (
          <Link
            to={`/chapters/${project.chapterId}`}
            className="text-sm text-blue-600 hover:underline"
          >
            View Chapter
          </Link>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-600 hover:underline"
          >
            GitHub
          </a>
        )}
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-600 hover:underline"
          >
            Demo
          </a>
        )}
      </div>

      <div className="mt-4 flex gap-2">
        {project.status === 'approved' && onMarkReady && (
          <button
            onClick={() => onMarkReady(project.id, !project.isPortfolioReady)}
            className={`px-3 py-1 rounded text-sm ${
              project.isPortfolioReady
                ? 'bg-green-200 text-green-800'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {project.isPortfolioReady ? '✓ Portfolio Ready' : 'Mark Ready'}
          </button>
        )}
        {project.status !== 'not-submitted' && onViewReview && (
          <button
            onClick={() => onViewReview(project.id)}
            className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200"
          >
            View Review
          </button>
        )}
        {project.status === 'not-submitted' && (
          <Link
            to={`/projects/submit?chapterId=${project.chapterId}`}
            className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
          >
            Submit Project
          </Link>
        )}
      </div>
    </div>
  );
}

export default ProjectCard;