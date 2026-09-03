import { useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { products } from '@/data/products';
import type { ProductCategory, ProductType } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { SectionHeading } from '@/components/SectionHeading';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { setDocumentMeta } from '@/utils/seo';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { Reveal } from '@/components/Reveal';

interface ProductCategoryPageProps {
  category?: ProductCategory;
  subCategory?: ProductType;
  onQuoteOpen: (product?: string) => void;
}

export default function ProductCategoryPage({ category, subCategory, onQuoteOpen: _onQuoteOpen }: ProductCategoryPageProps) {
  const params = useParams();
  const reduced = usePrefersReducedMotion();

  // For slug-based routes like /products/amplifiers, use the prop
  // For dynamic routes, we could use params but we're using static routes
  const effectiveCategory = category;
  const effectiveSubCategory = subCategory;

  const filtered = useMemo(() => {
    if (effectiveSubCategory) {
      return products.filter((p) => p.subCategory === effectiveSubCategory);
    }
    if (effectiveCategory) {
      return products.filter((p) => p.category === effectiveCategory);
    }
    return products;
  }, [effectiveCategory, effectiveSubCategory]);

  if (filtered.length === 0) {
    return <Navigate to="/products" replace />;
  }

  const title = effectiveSubCategory || (effectiveCategory === 'Amplifiers' ? 'Power Amplifiers' : effectiveCategory === 'Speakers' ? 'Speakers & Woofers' : 'Audio Mixers');
  const description = effectiveSubCategory
    ? `${effectiveSubCategory} products from Audio&Pro.`
    : effectiveCategory === 'Amplifiers'
      ? 'High-performance professional power amplifiers engineered for powerful, reliable sound.'
      : effectiveCategory === 'Speakers'
        ? 'Professional speakers and woofers for live sound and installations.'
        : 'Professional mixing solutions for live shows, studios and events.';

  setDocumentMeta({
    title: `${title} — Audio&Pro`,
    description,
  });

  const crumbs = [
    { label: 'Products', path: '/products' },
    ...(effectiveCategory ? [{ label: effectiveCategory, path: `/products/${effectiveCategory.toLowerCase()}` }] : []),
    { label: title },
  ];

  return (
    <div className="pt-24">
      <section className="border-b border-[#E1E4E8] bg-[#F5F6F7] py-12">
        <div className="container-px">
          <Breadcrumbs items={[{ label: 'Home', path: '/' }, ...crumbs]} />
          <div className="mt-6">
            <SectionHeading
              overline={effectiveCategory || 'Products'}
              title={title}
              subtitle={description}
            />
          </div>
        </div>
      </section>

      <section className="section-py bg-white">
        <div className="container-px">
          <div className="mb-6 text-sm text-[#7A7F85]">
            {filtered.length} product{filtered.length !== 1 ? 's' : ''}
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
