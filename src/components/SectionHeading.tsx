import { type ReactNode } from 'react';
import { Reveal } from './Reveal';

interface SectionHeadingProps {
  overline?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  overline,
  title,
  subtitle,
  align = 'left',
  className = '',
}: SectionHeadingProps) {
  return (
    <div
      className={`${align === 'center' ? 'mx-auto text-center' : 'text-left'} max-w-2xl ${className}`}
    >
      {overline && (
        <Reveal>
          <div className={`mb-4 flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}>
            <span className="h-px w-8 bg-pro-red" />
            <span className="label-overline text-pro-red">{overline}</span>
          </div>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="section-heading text-balance">{title}</h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.1}>
          <p className="mt-5 text-base leading-relaxed text-[#5F6368] sm:text-lg">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}
