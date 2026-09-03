import { Link } from 'react-router-dom';
import type { Product } from '@/data/products';
import { getRelatedProducts } from '@/data/products';
import { ProductCard } from './ProductCard';
import { SectionHeading } from './SectionHeading';

export function RelatedProducts({ product }: { product: Product }) {
  const related = getRelatedProducts(product, 4);
  if (related.length === 0) return null;

  return (
    <section className="section-py border-t border-[#E1E4E8]">
      <div className="container-px">
        <SectionHeading
          overline="Continue exploring"
          title="You may also like"
          subtitle={`More ${product.category.toLowerCase()} from the Audio&Pro range.`}
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/products" className="btn-ghost">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
