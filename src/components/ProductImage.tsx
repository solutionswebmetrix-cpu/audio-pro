import { useState } from 'react';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
}

export function ProductImage({ src, alt, className = '', imgClassName = '' }: ProductImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-gradient-to-b from-[#F8F9FA] to-white ${className}`}>
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 30%, rgba(16,24,40,0.04), transparent 70%)',
        }}
      />
      {!loaded && !error && (
        <div className="absolute inset-0 animate-pulse bg-[#F5F6F7]" />
      )}
      {error ? (
        <div className="flex h-full items-center justify-center p-8 text-center">
          <div>
            <div className="mb-2 text-3xl font-display font-bold text-[#B5BAC1]">A&P</div>
            <div className="text-xs text-[#9AA0A6]">Image unavailable</div>
          </div>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`relative h-full w-full object-contain object-center transition-opacity duration-500 ${
            loaded ? 'opacity-100' : 'opacity-0'
          } ${imgClassName}`}
        />
      )}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4"
        style={{ background: 'linear-gradient(to top, rgba(255,255,255,0.4), transparent)' }}
      />
    </div>
  );
}
