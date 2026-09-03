import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, FileText } from 'lucide-react';
import type { Product } from '@/data/products';
import { productWhatsAppUrl } from '@/utils/whatsapp';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface StickyActionBarProps {
  product: Product;
  onQuoteOpen: () => void;
}

export function StickyActionBar({ product, onQuoteOpen }: StickyActionBarProps) {
  const [visible, setVisible] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const handler = () => {
      const scrolled = window.scrollY;
      setVisible(scrolled > 600);
    };
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const transitionStyle = reduced
    ? { opacity: visible ? 1 : 0, pointerEvents: visible ? ('auto' as const) : ('none' as const) }
    : {};

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-[#E1E4E8] bg-white/95 backdrop-blur-xl shadow-premium transition-all duration-300"
      style={{
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        ...transitionStyle,
      }}
    >
      <div className="container-px py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-sm font-bold text-[#1A1A1A]">{product.name}</p>
            <p className="truncate text-xs text-[#7A7F85]">{product.subCategory}</p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={productWhatsAppUrl(product)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp px-4 py-2.5 text-xs sm:hidden"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
            <a
              href={productWhatsAppUrl(product)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp hidden px-5 py-2.5 text-xs sm:inline-flex"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
            <button onClick={onQuoteOpen} className="btn-primary px-4 py-2.5 text-xs sm:px-5">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Request Quote</span>
              <span className="sm:hidden">Quote</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
