import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { Product } from '@/data/products';
import { ProductImage } from './ProductImage';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 30 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.4), ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <Link
        to={`/products/${product.slug}`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pro-red/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-2xl"
      >
        <div className="card-surface relative overflow-hidden transition-all duration-500 group-hover:border-[#D1D5DB] group-hover:shadow-card-lg">
          <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
            <ProductImage
              src={product.image}
              alt={`${product.name} ${product.subCategory}`}
              className="h-full w-full"
              imgClassName="transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          <div className="p-5">
            <h3 className="font-display text-lg font-bold text-[#1A1A1A] transition-colors group-hover:text-pro-red-light">
              {product.name}
            </h3>
            <p className="mt-1.5 line-clamp-2 text-sm text-[#5F6368]">{product.shortDescription}</p>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wider text-[#7A7F85]">
                {product.category}
              </span>
              <span className="flex items-center gap-1 text-xs font-semibold text-[#5F6368] transition-all group-hover:gap-2 group-hover:text-pro-red-light">
                View Product
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-pro-red to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>
      </Link>
    </motion.div>
  );
}
