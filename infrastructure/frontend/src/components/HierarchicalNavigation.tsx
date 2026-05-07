import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavItem {
  id: string;
  title: string;
  order: number;
  chapters?: Array<{
    id: string;
    title: string;
    order: number;
    completed?: boolean;
  }>;
}

interface HierarchicalNavigationProps {
  modules: NavItem[];
}

function HierarchicalNavigation({ modules }: HierarchicalNavigationProps) {
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const location = useLocation();

  const toggleModule = (moduleId: string) => {
    setExpandedModule(prev => prev === moduleId ? null : moduleId);
  };

  return (
    <nav className="w-64 bg-white h-screen overflow-y-auto border-r border-gray-200 flex-shrink-0 hidden lg:block">
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">Course Content</h2>
        <ul className="space-y-2">
          {modules.map((module) => {
            const isExpanded = expandedModule === module.id;
            const isActive = location.pathname.includes(`/modules/${module.id}`) ||
                           module.chapters?.some(ch => location.pathname.includes(`/chapters/${ch.id}`));
            
            return (
              <li key={module.id}>
                <button
                  onClick={() => toggleModule(module.id)}
                  className={`w-full text-left px-3 py-2 rounded flex items-center justify-between ${
                    isActive ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <span className="font-medium text-sm">
                    {module.order}. {module.title}
                  </span>
                  <span className="text-xs">
                    {isExpanded ? '▼' : '▶'}
                  </span>
                </button>

                {isExpanded && module.chapters && (
                  <ul className="ml-4 mt-1 space-y-1">
                    {module.chapters.map((chapter) => {
                      const isChapterActive = location.pathname === `/chapters/${chapter.id}`;
                      
                      return (
                        <li key={chapter.id}>
                          <Link
                            to={`/chapters/${chapter.id}`}
                            className={`flex items-center px-3 py-1 rounded text-sm ${
                              isChapterActive
                                ? 'bg-blue-50 text-blue-600 font-medium'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            <span className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center text-xs ${
                              chapter.completed ? 'bg-green-500 text-white' : 'bg-gray-200'
                            }`}>
                              {chapter.completed ? '✓' : chapter.order}
                            </span>
                            <span className="truncate">{chapter.title}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

export default HierarchicalNavigation;