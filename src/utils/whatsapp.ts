import { siteData } from '@/data/siteData';
import type { Product } from '@/data/products';

export function buildWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${siteData.contact.whatsapp}?text=${encoded}`;
}

export function productWhatsAppMessage(product: Product): string {
  return `Hello Audio&Pro,

I am interested in the ${product.name} ${product.subCategory}.

Please share price, availability and complete product details.

Thank you.`;
}

export function productWhatsAppUrl(product: Product): string {
  return buildWhatsAppUrl(productWhatsAppMessage(product));
}

export function generalWhatsAppUrl(): string {
  return buildWhatsAppUrl(
    'Hello Audio&Pro, I would like to know more about your professional audio products. Please get in touch with me.'
  );
}
