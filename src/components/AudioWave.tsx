import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface AudioWaveProps {
  bars?: number;
  className?: string;
  barClassName?: string;
  height?: number;
}

export function AudioWave({
  bars = 40,
  className = '',
  barClassName = '',
  height = 60,
}: AudioWaveProps) {
  const reduced = usePrefersReducedMotion();
  const barEls = Array.from({ length: bars }, (_, i) => i);
  return (
    <div
      className={`flex items-center gap-[2px] ${className}`}
      style={{ height }}
      aria-hidden="true"
    >
      {barEls.map((i) => (
        <div
          key={i}
          className={`w-[2px] flex-1 max-w-[3px] rounded-full bg-current ${barClassName}`}
          style={{
            height: reduced ? '40%' : undefined,
            transformOrigin: 'center',
            animation: reduced
              ? undefined
              : `wave-bar ${1.0 + (i % 7) * 0.15}s ease-in-out ${i * 0.04}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export function WaveLine({ className = '' }: { className?: string }) {
  const reduced = usePrefersReducedMotion();
  const points = Array.from({ length: 120 }, (_, i) => i);
  return (
    <svg
      className={`w-full ${className}`}
      viewBox="0 0 1200 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d={
          reduced
            ? 'M0,50 Q300,50 600,50 T1200,50'
            : points
                .map((i) => {
                  const x = (i / 119) * 1200;
                  const y = 50 + Math.sin(i * 0.25) * 18 + Math.cos(i * 0.12) * 8;
                  return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
                })
                .join(' ')
        }
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.3"
      />
    </svg>
  );
}

export function PulseRings({ className = '' }: { className?: string }) {
  const reduced = usePrefersReducedMotion();
  if (reduced) return null;
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-pro-red/40 animate-pulse-ring" />
      <div
        className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-pro-red/30 animate-pulse-ring"
        style={{ animationDelay: '0.8s' }}
      />
      <div
        className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-pro-red/20 animate-pulse-ring"
        style={{ animationDelay: '1.6s' }}
      />
    </div>
  );
}
