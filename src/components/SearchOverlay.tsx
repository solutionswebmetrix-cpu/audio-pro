import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, X, ArrowRight } from 'lucide-react';
import { searchProducts } from '@/utils/filters';
import { ProductImage } from './ProductImage';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const reduced = usePrefersReducedMotion();

  const results = useMemo(() => searchProducts(query), [query]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  const goToProduct = (slug: string) => {
    onClose();
    navigate(`/products/${slug}`);
  };

  const animProps = reduced
    ? {}
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center"
          {...animProps}
        >
          <div
            className="absolute inset-0 bg-[#252525]/80 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            className="relative z-10 mt-[10vh] w-full max-w-2xl px-5"
            {...(reduced
              ? {}
              : {
                  initial: { opacity: 0, y: -20 },
                  animate: { opacity: 1, y: 0 },
                  exit: { opacity: 0, y: -20 },
                  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                })}
          >
            <div className="card-surface overflow-hidden rounded-2xl shadow-premium">
              <div className="flex items-center gap-3 border-b border-[#E1E4E8] px-5 py-4">
                <Search className="h-5 w-5 text-[#5F6368]" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products, models, power..."
                  className="flex-1 bg-transparent text-base text-[#1A1A1A] placeholder:text-[#9AA0A6] focus:outline-none"
                  aria-label="Search products"
                />
                <button
                  onClick={onClose}
                  className="rounded-lg p-1.5 text-[#7A7F85] transition-colors hover:bg-[#F5F6F7] hover:text-[#1A1A1A]"
                  aria-label="Close search"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="max-h-[55vh] overflow-y-auto">
                {query.trim() === '' ? (
                  <div className="px-5 py-12 text-center">
                    <p className="text-sm text-[#7A7F85]">
                      Search by product name, model, category, or power rating.
                    </p>
                  </div>
                ) : results.length === 0 ? (
                  <div className="px-5 py-12 text-center">
                    <p className="text-sm text-[#5F6368]">No results found for "{query}"</p>
                    <p className="mt-2 text-xs text-[#7A7F85]">Try a different keyword or model number.</p>
                  </div>
                ) : (
                  <ul className="divide-y divide-[#E1E4E8]">
                    {results.map((product) => (
                      <li key={product.id}>
                        <button
                          onClick={() => goToProduct(product.slug)}
                          className="flex w-full items-center gap-4 px-5 py-3 text-left transition-colors hover:bg-[#F5F6F7]"
                        >
                          <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg border border-[#E1E4E8]">
                            <ProductImage
                              src={product.image}
                              alt={product.name}
                              className="h-full w-full"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                                <span className="truncate font-display text-sm font-semibold text-[#1A1A1A]">
                                {product.name}
                              </span>
                              <span className="chip text-[10px]">{product.subCategory}</span>
                            </div>
                            <p className="mt-0.5 truncate text-xs text-[#7A7F85]">
                              {product.shortDescription}
                            </p>
                          </div>
                          <ArrowRight className="h-4 w-4 flex-shrink-0 text-[#7A7F85]" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
