import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, X, ArrowRight, GitCompare } from 'lucide-react';
import { products } from '@/data/products';
import type { Product } from '@/data/products';
import { extractPowerValue } from '@/utils/filters';
import { ProductImage } from '@/components/ProductImage';
import { SectionHeading } from '@/components/SectionHeading';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Reveal } from '@/components/Reveal';
import { setDocumentMeta } from '@/utils/seo';

const MAX_COMPARE = 3;

export default function Compare() {
  const [selected, setSelected] = useState<Product[]>([]);
  const [showPicker, setShowPicker] = useState(false);

  setDocumentMeta({
    title: 'Compare Products — Audio&Pro',
    description: 'Compare Audio&Pro professional amplifiers and audio mixers side by side.',
  });

  const addProduct = (product: Product) => {
    if (selected.length >= MAX_COMPARE || selected.some((p) => p.id === product.id)) return;
    setSelected([...selected, product]);
    setShowPicker(false);
  };

  const removeProduct = (id: string) => {
    setSelected(selected.filter((p) => p.id !== id));
  };

  const availableProducts = products.filter((p) => !selected.some((s) => s.id === p.id));

  const specRows: { label: string; getValue: (p: Product) => string }[] = [
    { label: 'Category', getValue: (p) => p.category },
    { label: 'Type', getValue: (p) => p.subCategory },
    { label: 'Model', getValue: (p) => p.model },
    { label: 'RMS Power', getValue: (p) => p.power.rms || '—' },
    { label: 'Max Power', getValue: (p) => p.power.max || '—' },
    { label: 'Output', getValue: (p) => p.power.output || '—' },
    { label: 'Frequency Response', getValue: (p) => p.specifications.frequencyResponse || '—' },
    { label: 'THD', getValue: (p) => p.specifications.thd || '—' },
    { label: 'Signal-to-Noise', getValue: (p) => p.specifications.signalToNoise || '—' },
    { label: 'Damping Factor', getValue: (p) => p.specifications.dampingFactor || '—' },
    { label: 'Input Sensitivity', getValue: (p) => p.specifications.inputSensitivity || '—' },
    { label: 'Cooling', getValue: (p) => p.specifications.coolingSystem || '—' },
    { label: 'Protection', getValue: (p) => p.specifications.protection || '—' },
    { label: 'Power Supply', getValue: (p) => p.specifications.powerSupply || '—' },
    { label: 'Dimensions', getValue: (p) => p.specifications.dimensions || '—' },
    { label: 'Weight', getValue: (p) => p.specifications.weight || '—' },
  ];

  return (
    <div className="pt-24">
      <section className="border-b border-[#E1E4E8] bg-[#F5F6F7] py-12">
        <div className="container-px">
          <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Compare' }]} />
          <div className="mt-6">
            <SectionHeading
              overline="Tools"
              title="Compare Products"
              subtitle="Select up to 3 products to compare specifications side by side."
            />
          </div>
        </div>
      </section>

      <section className="section-py bg-white">
        <div className="container-px">
          {selected.length === 0 ? (
            <div className="card-surface p-12 text-center">
              <GitCompare className="mx-auto h-12 w-12 text-steel-600" />
              <h3 className="mt-4 font-display text-xl font-bold text-[#1A1A1A]">No products selected</h3>
              <p className="mt-2 text-sm text-[#7A7F85]">Add products to start comparing specifications.</p>
              <button onClick={() => setShowPicker(true)} className="btn-primary mt-6">
                <Plus className="h-4 w-4" />
                Add Products
              </button>
            </div>
          ) : (
            <>
              {/* Product headers */}
              <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${selected.length}, 1fr)` }}>
                <div />
                {selected.map((product) => (
                  <div key={product.id} className="card-surface p-4">
                    <button
                      onClick={() => removeProduct(product.id)}
                      className="absolute right-3 top-3 rounded-lg p-1 text-steel-500 hover:text-pro-red"
                      aria-label="Remove from comparison"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <div className="relative aspect-square overflow-hidden rounded-lg border border-[#E1E4E8]">
                      <ProductImage src={product.image} alt={product.name} className="h-full w-full" />
                    </div>
                    <h3 className="mt-3 font-display text-sm font-bold text-[#1A1A1A]">{product.name}</h3>
                    <p className="text-xs text-[#7A7F85]">{product.subCategory}</p>
                    <Link
                      to={`/products/${product.slug}`}
                      className="mt-3 flex items-center gap-1 text-xs font-semibold text-pro-red-light hover:gap-2 transition-all"
                    >
                      View Product <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                ))}
                {selected.length < MAX_COMPARE && (
                  <button
                    onClick={() => setShowPicker(true)}
                    className="flex min-h-[200px] items-center justify-center rounded-2xl border-2 border-dashed border-[#E1E4E8] text-[#7A7F85] transition-colors hover:border-pro-red/40 hover:text-pro-red"
                  >
                    <div className="text-center">
                      <Plus className="mx-auto h-8 w-8" />
                      <span className="mt-2 block text-xs font-medium">Add Product</span>
                    </div>
                  </button>
                )}
              </div>

              {/* Spec table */}
              <div className="mt-8 overflow-x-auto">
                <div className="min-w-full" style={{ minWidth: 600 }}>
                  <div className="grid gap-px bg-[#E1E4E8] rounded-xl overflow-hidden" style={{ gridTemplateColumns: `200px repeat(${selected.length}, 1fr)` }}>
                    {specRows.map((row, ri) => (
                      <div key={row.label} className="contents">
                        <div className={`px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#5F6368] ${ri % 2 === 0 ? 'bg-[#F5F6F7]' : 'bg-white'}`}>
                          {row.label}
                        </div>
                        {selected.map((product) => (
                          <div key={product.id} className={`px-4 py-3 text-sm text-[#1A1A1A] ${ri % 2 === 0 ? 'bg-[#F5F6F7]' : 'bg-white'}`}>
                            {row.getValue(product)}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Product picker */}
          {showPicker && (
            <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-[#252525]/85 backdrop-blur-sm" onClick={() => setShowPicker(false)} />
              <div className="relative z-10 w-full max-w-lg max-h-[70vh] overflow-y-auto card-surface rounded-2xl p-6 border border-[#E1E4E8] bg-white">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-display text-lg font-bold text-[#1A1A1A]">Select a Product</h3>
                  <button onClick={() => setShowPicker(false)} className="rounded-lg p-2 text-steel-400 hover:bg-[#F5F6F7] hover:text-[#1A1A1A]" aria-label="Close">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="space-y-2">
                  {availableProducts.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => addProduct(product)}
                      className="flex w-full items-center gap-3 rounded-xl border border-[#E1E4E8] p-3 text-left transition-colors hover:border-steel-700 hover:bg-[#F5F6F7]"
                    >
                      <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg border border-[#E1E4E8]">
                        <ProductImage src={product.image} alt={product.name} className="h-full w-full" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-semibold text-[#1A1A1A]">{product.name}</div>
                        <div className="text-xs text-[#7A7F85]">{product.subCategory}</div>
                      </div>
                      <Plus className="h-4 w-4 text-[#7A7F85]" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
