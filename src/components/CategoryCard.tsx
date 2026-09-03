import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Reveal } from './Reveal';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface CategoryCardProps {
  name: string;
  description: string;
  image: string;
  slug: string;
  icon: LucideIcon;
  index: number;
}

export function CategoryCard({ name, description, image, slug, icon: Icon, index }: CategoryCardProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <Reveal delay={index * 0.08}>
      <Link
        to={`/products/${slug}`}
        className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pro-red/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-2xl"
      >
        <div className="relative h-72 overflow-hidden rounded-2xl border border-[#E1E4E8]">
          <motion.img
            src={image}
            alt={name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-50 transition-all duration-700 group-hover:scale-110 group-hover:opacity-70"
            initial={reduced ? false : { scale: 1 }}
            whileInView={reduced ? undefined : { scale: 1 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#252525]/80 via-[#252525]/35 to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-end p-6">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-pro-red/30 bg-pro-red/10 transition-colors group-hover:border-pro-red/60">
              <Icon className="h-5 w-5 text-pro-red" />
            </div>
            <h3 className="font-display text-xl font-bold text-white">{name}</h3>
            <p className="mt-2 text-sm text-[#E5E7EB]">{description}</p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-pro-red-light transition-all group-hover:gap-3">
              Explore
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>

          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-pro-red/0 transition-all duration-500 group-hover:ring-inset group-hover:ring-pro-red/30" />
        </div>
      </Link>
    </Reveal>
  );
}
