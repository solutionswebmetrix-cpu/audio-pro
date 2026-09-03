import { useEffect, useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, Phone, Mail, MessageCircle, FileText, Zap, Gauge,
} from 'lucide-react';
import { getProductBySlug } from '@/data/products';
import { siteData } from '@/data/siteData';
import { productWhatsAppUrl, generalWhatsAppUrl } from '@/utils/whatsapp';
import { ProductGallery } from '@/components/ProductGallery';
import { ProductSpecs } from '@/components/ProductSpecs';
import { ProductHighlights } from '@/components/ProductHighlights';
import { ProductFeatures } from '@/components/ProductFeatures';
import { RelatedProducts } from '@/components/RelatedProducts';
import { StickyActionBar } from '@/components/StickyActionBar';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SectionHeading } from '@/components/SectionHeading';
import { AudioWave } from '@/components/AudioWave';
import { Reveal } from '@/components/Reveal';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { setDocumentMeta, setCanonicalUrl, injectProductJsonLd, injectBreadcrumbJsonLd, clearJsonLd } from '@/utils/seo';
import { extractPowerValue } from '@/utils/filters';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface ProductDetailsProps {
  onQuoteOpen: (product?: string) => void;
}

export default function ProductDetails({ onQuoteOpen }: ProductDetailsProps) {
  const { slug } = useParams<{ slug: string }>();
  const reduced = usePrefersReducedMotion();
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

  const product = useMemo(() => (slug ? getProductBySlug(slug) : undefined), [slug]);

  useEffect(() => {
    if (!product) return;
    setDocumentMeta({
      title: `${product.name} ${product.subCategory} | Audio&Pro`,
      description: product.shortDescription,
      image: product.image,
      type: 'product',
    });
    setCanonicalUrl(`${baseUrl}/products/${product.slug}`);
    injectProductJsonLd(product, baseUrl);
    injectBreadcrumbJsonLd([
      { name: 'Home', url: baseUrl },
      { name: 'Products', url: `${baseUrl}/products` },
      { name: product.category, url: `${baseUrl}/products/${product.category.toLowerCase()}` },
      { name: product.name, url: `${baseUrl}/products/${product.slug}` },
    ]);

    return () => clearJsonLd();
  }, [product, baseUrl]);

  if (!product) {
    return <Navigate to="/products" replace />;
  }

  const powerValue = extractPowerValue(product);
  const crumbs = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: product.category, path: `/products/${product.category.toLowerCase()}` },
    { label: product.name },
  ];

  return (
    <div className="pt-24">
      {/* Breadcrumb */}
      <section className="border-b border-[#E1E4E8] bg-[#F5F6F7] py-6">
        <div className="container-px">
          <Breadcrumbs items={crumbs} />
        </div>
      </section>

      {/* Main product section */}
      <section className="section-py bg-white">
        <div className="container-px">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Left: Gallery */}
            <div>
              <ProductGallery images={product.gallery} alt={`${product.name} ${product.subCategory}`} />
            </div>

            {/* Right: Info */}
            <div>
              <Reveal>
                <span className="chip mb-4">{product.subCategory}</span>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="font-display text-3xl font-bold tracking-tight text-[#1A1A1A] sm:text-4xl lg:text-5xl">
                  {product.name}
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-3 text-sm text-[#7A7F85]">
                  Model: <span className="text-[#5F6368]">{product.model}</span>
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="mt-5 text-base leading-relaxed text-[#5F6368]">
                  {product.description}
                </p>
              </Reveal>

              {/* Power display */}
              {powerValue > 0 && (
                <Reveal delay={0.2}>
                  <div className="relative mt-8 overflow-hidden rounded-2xl border border-[#E1E4E8] bg-white p-6">
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-pro-red/20">
                      <AudioWave bars={24} height={50} />
                    </div>
                    <div className="relative">
                      <div className="flex items-end gap-3">
                        <AnimatedCounter
                          value={powerValue}
                          className="font-display text-5xl font-bold text-gradient-red sm:text-6xl"
                        />
                        <span className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#7A7F85]">W</span>
                      </div>
                      <div className="mt-2 flex items-center gap-2 text-xs uppercase tracking-ultra text-[#7A7F85]">
                        <Zap className="h-3.5 w-3.5 text-pro-red" />
                        {product.power.rms ? 'RMS Power' : 'Max Power'}
                      </div>
                    </div>
                  </div>
                </Reveal>
              )}

              {/* CTAs */}
              <Reveal delay={0.25}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button onClick={() => onQuoteOpen(product.name)} className="btn-primary">
                    <FileText className="h-4 w-4" />
                    Request Quote
                  </button>
                  <a
                    href={productWhatsAppUrl(product)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp Enquiry
                  </a>
                </div>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="mt-4 flex flex-wrap gap-4 text-sm text-[#7A7F85]">
                  <a href={siteData.contact.phoneTel} className="flex items-center gap-2 transition-colors hover:text-[#1A1A1A]">
                    <Phone className="h-4 w-4 text-pro-red" />
                    {siteData.contact.phoneDisplay}
                  </a>
                  <a href={siteData.contact.emailLink} className="flex items-center gap-2 transition-colors hover:text-[#1A1A1A]">
                    <Mail className="h-4 w-4 text-pro-red" />
                    {siteData.contact.email}
                  </a>
                </div>
              </Reveal>

              {/* Availability */}
              {product.availability && (
                <Reveal delay={0.35}>
                  <div className="mt-4 flex items-center gap-2 text-sm">
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-[#5F6368]">{product.availability}</span>
                  </div>
                </Reveal>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="border-y border-[#E1E4E8] bg-[#F5F6F7] py-12">
        <div className="container-px">
          <Reveal>
            <h2 className="mb-8 font-display text-xl font-bold text-[#1A1A1A] sm:text-2xl">Key Highlights</h2>
          </Reveal>
          <ProductHighlights product={product} />
        </div>
      </section>

      {/* Specifications */}
      <section className="section-py bg-white">
        <div className="container-px">
          <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
            <div>
              <SectionHeading
                overline="Technical"
                title="Specifications"
                subtitle="Complete technical details for the Audio&Pro professional catalogue."
              />
              <div className="mt-6 flex items-center gap-2 text-sm text-[#7A7F85]">
                <Gauge className="h-4 w-4 text-pro-red" />
                Professional grade engineering
              </div>
            </div>
            <div>
              <ProductSpecs product={product} />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      {product.features.length > 0 && (
        <section className="section-py bg-[#F5F6F7]">
          <div className="container-px">
            <SectionHeading
              overline="Capabilities"
              title="Engineered for Performance"
              subtitle="Every feature is designed to deliver reliable, professional-grade audio."
              align="center"
              className="mb-12"
            />
            <ProductFeatures product={product} />
          </div>
        </section>
      )}

      {/* Applications */}
      {product.applications.length > 0 && (
        <section className="section-py bg-white">
          <div className="container-px">
            <SectionHeading
              overline="Use Cases"
              title="Applications"
              subtitle="Where this product excels."
              className="mb-10"
            />
            <div className="flex flex-wrap gap-3">
              {product.applications.map((app, i) => (
                <Reveal key={app} delay={i * 0.04}>
                  <span className="rounded-full border border-[#E1E4E8] bg-[#F5F6F7] px-5 py-2.5 text-sm font-medium text-[#1A1A1A]">
                    {app}
                  </span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related products */}
      <RelatedProducts product={product} />

      {/* Sticky action bar */}
      <StickyActionBar product={product} onQuoteOpen={() => onQuoteOpen(product.name)} />

      {/* Bottom padding for sticky bar */}
      <div className="h-20" />
    </div>
  );
}
