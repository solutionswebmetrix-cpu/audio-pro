import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface Crumb {
  label: string;
  path?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#7A7F85]">
      <Link to="/" className="flex items-center gap-1 transition-colors hover:text-pro-red">
        <Home className="h-3.5 w-3.5" />
        <span className="sr-only">Home</span>
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <ChevronRight className="h-3 w-3 text-[#C9CED6]" />
          {item.path ? (
            <Link to={item.path} className="transition-colors hover:text-pro-red">
              {item.label}
            </Link>
          ) : (
            <span className="text-[#5F6368]">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
