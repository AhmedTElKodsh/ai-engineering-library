import { useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';

interface TOCEntry {
  id: string;
  text: string;
  level: number;
}

function TableOfContents() {
  const [headings, setHeadings] = useState<TOCEntry[]>([]);
  const [activeId, setActiveId] = useState('');
  const location = useLocation();
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Extract headings from the page
    const extractHeadings = () => {
      const contentEl = document.querySelector('.prose');
      if (!contentEl) return;

      const headingElements = contentEl.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const entries: TOCEntry[] = [];

      headingElements.forEach((el, index) => {
        const id = el.id || `heading-${index}`;
        if (!el.id) el.id = id;

        entries.push({
          id,
          text: el.textContent || '',
          level: parseInt(el.tagName[1]) || 1,
        });
      });

      setHeadings(entries);
    };

    // Small delay to ensure content is rendered
    const timer = setTimeout(extractHeadings, 100);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Set up intersection observer for active heading tracking
  useEffect(() => {
    if (headings.length === 0) return;

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    observerRef.current = new IntersectionObserver(callback, {
      rootMargin: '-20% 0px -80% 0px',
    });

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el && observerRef.current) {
        observerRef.current.observe(el);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="w-64 flex-shrink-0 hidden lg:block">
      <div className="sticky top-8">
        <h3 className="text-sm font-semibold text-gray-500 mb-3">On this page</h3>
        <ul className="space-y-1">
          {headings.map((heading) => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                className={`block py-1 text-sm hover:text-blue-600 transition ${
                  activeId === heading.id
                    ? 'text-blue-600 font-medium'
                    : 'text-gray-600'
                }`}
                style={{ paddingLeft: `${(heading.level - 1) * 12}px` }}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default TableOfContents;