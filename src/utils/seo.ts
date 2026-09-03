import type { Product } from '@/data/products';

const SITE_NAME = 'Audio&Pro';

export function setDocumentMeta({
  title,
  description,
  image,
  type = 'website',
}: {
  title: string;
  description?: string;
  image?: string;
  type?: string;
}) {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  document.title = fullTitle;

  setMetaTag('description', description);
  setMetaProperty('og:title', fullTitle);
  setMetaProperty('og:description', description);
  setMetaProperty('og:type', type);
  setMetaProperty('og:site_name', SITE_NAME);
  if (image) setMetaProperty('og:image', image);
  setMetaProperty('twitter:card', 'summary_large_image');
  setMetaProperty('twitter:title', fullTitle);
  if (description) setMetaProperty('twitter:description', description);
  if (image) setMetaProperty('twitter:image', image);
}

function setMetaTag(name: string, content?: string) {
  if (!content) return;
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setMetaProperty(property: string, content?: string) {
  if (!content) return;
  let el = document.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function setCanonicalUrl(url: string) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', url);
}

export function injectProductJsonLd(product: Product, baseUrl: string) {
  const existing = document.getElementById('product-jsonld');
  if (existing) existing.remove();

  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${product.name} ${product.subCategory}`,
    description: product.description,
    brand: { '@type': 'Brand', name: SITE_NAME },
    category: product.subCategory,
    url: `${baseUrl}/products/${product.slug}`,
  };
  if (product.image) data.image = product.image;

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = 'product-jsonld';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

export function injectBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  const existing = document.getElementById('breadcrumb-jsonld');
  if (existing) existing.remove();

  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = 'breadcrumb-jsonld';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

export function clearJsonLd() {
  document.getElementById('product-jsonld')?.remove();
  document.getElementById('breadcrumb-jsonld')?.remove();
}
