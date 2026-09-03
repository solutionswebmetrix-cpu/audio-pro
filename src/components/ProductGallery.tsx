import { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { ProductImage } from './ProductImage';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

export function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const reduced = usePrefersReducedMotion();
  const touchStartX = useRef(0);

  const gallery = images.length > 0 ? images : [];
  const safeActive = Math.min(active, gallery.length - 1);

  const next = () => setActive((p) => (p + 1) % gallery.length);
  const prev = () => setActive((p) => (p - 1 + gallery.length) % gallery.length);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) prev();
      else next();
    }
  };

  if (gallery.length === 0) return null;

  return (
    <div>
      <div
        className="group relative aspect-square overflow-hidden rounded-2xl border border-[#E1E4E8] bg-white shadow-card"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <ProductImage
          src={gallery[safeActive]}
          alt={`${alt} — image ${safeActive + 1}`}
          className="h-full w-full"
          imgClassName="transition-transform duration-700"
        />
        <button
          onClick={() => setFullscreen(true)}
          className="absolute right-3 top-3 rounded-lg border border-[#E1E4E8] bg-white/95 p-2 text-[#5F6368] opacity-0 backdrop-blur-sm transition-opacity hover:text-[#1A1A1A] group-hover:opacity-100"
          aria-label="View fullscreen"
        >
          <Maximize2 className="h-4 w-4" />
        </button>
        {gallery.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-lg border border-[#E1E4E8] bg-white/95 p-2 text-[#5F6368] opacity-0 backdrop-blur-sm transition-opacity hover:text-[#1A1A1A] group-hover:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg border border-[#E1E4E8] bg-white/95 p-2 text-[#5F6368] opacity-0 backdrop-blur-sm transition-opacity hover:text-[#1A1A1A] group-hover:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}
      </div>

      {gallery.length > 1 && (
        <div className="mt-4 flex gap-3">
          {gallery.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                i === safeActive
                  ? 'border-pro-red shadow-card'
                  : 'border-[#E1E4E8] hover:border-[#D1D5DB]'
              }`}
              aria-label={`View image ${i + 1}`}
            >
              <ProductImage src={img} alt={`${alt} thumbnail ${i + 1}`} className="h-full w-full" />
            </button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {fullscreen && (
          <motion.div
            className="fixed inset-0 z-[110] flex items-center justify-center bg-[#1A1A1A]/95 p-4"
            initial={reduced ? undefined : { opacity: 0 }}
            animate={reduced ? undefined : { opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
          >
            <button
              onClick={() => setFullscreen(false)}
              className="absolute right-5 top-5 rounded-lg border border-[#E1E4E8]/30 p-2.5 text-[#E5E7EB] hover:text-white"
              aria-label="Close fullscreen"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              onClick={prev}
              className="absolute left-5 rounded-lg border border-[#E1E4E8]/30 p-3 text-[#E5E7EB] hover:text-white"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <div className="max-h-[85vh] max-w-4xl">
              <ProductImage
                src={gallery[safeActive]}
                alt={`${alt} — fullscreen ${safeActive + 1}`}
                className="max-h-[85vh] rounded-xl"
              />
            </div>
            <button
              onClick={next}
              className="absolute right-5 rounded-lg border border-[#E1E4E8]/30 p-3 text-[#E5E7EB] hover:text-white"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
