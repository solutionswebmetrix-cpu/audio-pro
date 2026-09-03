import { Link } from 'react-router-dom';

export function Logo({ className = '', showTagline = false }: { className?: string; showTagline?: boolean }) {
  return (
    <Link
      to="/"
      className={`group flex items-center gap-3 ${className}`}
      aria-label="Audio&Pro home"
    >
      <div className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-[#E1E4E8] bg-white transition-colors group-hover:border-pro-red">
        <span className="font-display text-sm font-bold text-[#1A1A1A]">A<span className="text-[#E52B25]">&amp;</span>P</span>
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-display text-lg font-bold tracking-tight text-[#1A1A1A]">
          AUDIO<span className="text-[#E52B25]">&amp;</span>PRO
        </span>
        {showTagline && (
          <span className="mt-0.5 text-[9px] font-medium uppercase tracking-ultra text-[#7A7F85]">
            Power · Precision · Performance
          </span>
        )}
      </div>
    </Link>
  );
}
