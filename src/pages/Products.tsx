import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, Search, ArrowUpDown } from 'lucide-react';
import { products } from '@/data/products';
import {
  filterProducts,
  sortProducts,
  defaultFilters,
  allTypes,
  allFeatures,
  getPowerRanges,
  type SortOption,
  type FilterState,
} from '@/utils/filters';
import type { ProductCategory } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';
import { setDocumentMeta } from '@/utils/seo';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface ProductsProps {
  onQuoteOpen: (product?: string) => void;
}

export default function Products({ onQuoteOpen: _onQuoteOpen }: ProductsProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<FilterState>({
    ...defaultFilters,
    search: searchParams.get('q') || '',
  });
  const [sort, setSort] = useState<SortOption>('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const reduced = usePrefersReducedMotion();

  setDocumentMeta({
    title: 'All Products — Professional Audio Equipment',
    description:
      'Browse the complete range of Audio&Pro professional power amplifiers, DJ amplifiers, Hi-Fi amplifiers and audio mixers.',
  });

  const powerRanges = useMemo(() => getPowerRanges(), []);

  const filtered = useMemo(() => {
    const result = filterProducts(products, filters);
    return sortProducts(result, sort);
  }, [filters, sort]);

  const toggleCategory = (cat: ProductCategory) => {
    setFilters((f) => ({
      ...f,
      categories: f.categories.includes(cat)
        ? f.categories.filter((c) => c !== cat)
        : [...f.categories, cat],
    }));
  };

  const toggleType = (type: string) => {
    setFilters((f) => ({
      ...f,
      types: f.types.includes(type as never)
        ? f.types.filter((t) => t !== type)
        : [...f.types, type as never],
    }));
  };

  const toggleFeature = (feat: string) => {
    setFilters((f) => ({
      ...f,
      features: f.features.includes(feat)
        ? f.features.filter((ft) => ft !== feat)
        : [...f.features, feat],
    }));
  };

  const activeFilterCount =
    filters.categories.length +
    filters.types.length +
    filters.features.length +
    (filters.powerRange ? 1 : 0);

  const clearAll = () => {
    setFilters({ ...defaultFilters, search: '' });
    setSearchParams({});
  };

  const FilterPanel = () => (
    <div className="space-y-6">
      <FilterGroup title="Category">
        {(['Amplifiers', 'Mixers', 'Speakers'] as ProductCategory[]).map((cat) => (
          <FilterCheckbox
            key={cat}
            label={cat}
            checked={filters.categories.includes(cat)}
            onChange={() => toggleCategory(cat)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Type">
        {allTypes.map((type) => (
          <FilterCheckbox
            key={type}
            label={type}
            checked={filters.types.includes(type)}
            onChange={() => toggleType(type)}
          />
        ))}
      </FilterGroup>

      {powerRanges.length > 0 && (
        <FilterGroup title="Power">
          {powerRanges.map((range) => (
            <FilterCheckbox
              key={range.label}
              label={range.label}
              checked={filters.powerRange === range.label}
              onChange={() =>
                setFilters((f) => ({
                  ...f,
                  powerRange: f.powerRange === range.label ? null : range.label,
                }))
              }
            />
          ))}
        </FilterGroup>
      )}

      <FilterGroup title="Features">
        {allFeatures.map((feat) => (
          <FilterCheckbox
            key={feat}
            label={feat}
            checked={filters.features.includes(feat)}
            onChange={() => toggleFeature(feat)}
          />
        ))}
      </FilterGroup>

      {activeFilterCount > 0 && (
        <button
          onClick={clearAll}
          className="flex items-center gap-1.5 text-xs font-medium text-pro-red-light hover:text-pro-red"
        >
          <X className="h-3.5 w-3.5" />
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <div className="pt-24">
      {/* Header */}
      <section className="border-b border-[#E1E4E8] bg-[#F5F6F7] py-12">
        <div className="container-px">
          <SectionHeading
            overline="Catalogue"
            title="All Products"
            subtitle="Browse the complete range of Audio&Pro professional audio equipment."
          />
        </div>
      </section>

      <section className="section-py bg-white">
        <div className="container-px">
          {/* Search + Sort bar */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-steel-500" />
              <input
                type="text"
                value={filters.search}
                onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
                placeholder="Search products..."
                className="input-field pl-10"
                aria-label="Search products"
              />
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="flex items-center gap-2 rounded-full border border-[#E1E4E8] px-4 py-2.5 text-xs font-semibold text-[#1A1A1A] lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="rounded-full bg-pro-red px-1.5 text-[10px] text-white">{activeFilterCount}</span>
                )}
              </button>
              <div className="flex items-center gap-2">
                <ArrowUpDown className="h-4 w-4 text-steel-500" />
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortOption)}
                  className="rounded-full border border-[#E1E4E8] bg-white px-4 py-2.5 text-xs font-semibold text-[#1A1A1A] focus:border-pro-red/60 focus:outline-none"
                  aria-label="Sort products"
                >
                  <option value="featured">Featured</option>
                  <option value="power-desc">Power: High to Low</option>
                  <option value="power-asc">Power: Low to High</option>
                  <option value="name-az">Name A-Z</option>
                  <option value="name-desc">Name Z-A</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
            {/* Desktop sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <div className="mb-4 flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-[#5F6368]" />
                  <h3 className="text-xs font-semibold uppercase tracking-ultra text-[#5F6368]">Filters</h3>
                </div>
                <FilterPanel />
              </div>
            </aside>

            {/* Product grid */}
            <div>
              <div className="mb-4 text-sm text-[#7A7F85]">
                {filtered.length} product{filtered.length !== 1 ? 's' : ''}
                {filters.search && ` for "${filters.search}"`}
              </div>
              {filtered.length === 0 ? (
                <div className="card-surface p-12 text-center">
                  <p className="text-lg font-display font-bold text-[#1A1A1A]">No products found</p>
                  <p className="mt-2 text-sm text-steel-500">
                    Try adjusting your filters or search terms.
                  </p>
                  <button onClick={clearAll} className="btn-ghost mt-6">
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {filtered.map((p, i) => (
                    <ProductCard key={p.id} product={p} index={i} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile filter drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <div className="absolute inset-0 bg-ink-950/90 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)} />
          <div
            className="absolute right-0 top-0 h-full w-[80%] max-w-sm overflow-y-auto border-l border-[#E1E4E8] bg-white p-6"
            style={{
              transform: reduced ? undefined : 'translateX(0)',
            }}
          >
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-display text-lg font-bold text-[#1A1A1A]">Filters</h3>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="rounded-lg p-2 text-steel-400 hover:bg-[#F5F6F7] hover:text-[#1A1A1A]"
                aria-label="Close filters"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <FilterPanel />
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="btn-primary mt-8 w-full"
            >
              Show {filtered.length} Results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="mb-3 text-xs font-semibold uppercase tracking-ultra text-[#5F6368]">{title}</h4>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function FilterCheckbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-[#5F6368] transition-colors hover:text-[#1A1A1A]">
      <span
        className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border transition-colors ${
          checked ? 'border-pro-red bg-pro-red' : 'border-steel-600'
        }`}
      >
        {checked && (
          <svg viewBox="0 0 12 12" className="h-3 w-3 text-white" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 6l3 3 5-6" />
          </svg>
        )}
      </span>
      <span>{label}</span>
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
    </label>
  );
}
