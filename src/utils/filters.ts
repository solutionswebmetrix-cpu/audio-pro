import type { Product, ProductCategory, ProductType } from '@/data/products';
import { products } from '@/data/products';

export interface FilterState {
  categories: ProductCategory[];
  types: ProductType[];
  features: string[];
  powerRange: string | null;
  search: string;
}

export const defaultFilters: FilterState = {
  categories: [],
  types: [],
  features: [],
  powerRange: null,
  search: '',
};

export type SortOption = 'featured' | 'power-asc' | 'power-desc' | 'name-asc' | 'name-desc';

export const allFeatures = [
  'Bluetooth',
  'USB',
  'Echo',
  'Dual Channel',
  'Cooling',
  'Protection',
];

export const allTypes: ProductType[] = [
  'Power Amplifier',
  'DJ Amplifier',
  'Hi-Fi Amplifier',
  'Audio Mixer',
  'Digital Echo Mixer',
];

export function extractPowerValue(product: Product): number {
  const powerStr = product.power.rms || product.power.max || product.power.output || '';
  const match = powerStr.match(/(\d[\d,]*)/);
  if (!match) return 0;
  return parseInt(match[1].replace(/,/g, ''), 10);
}

export function getPowerRanges(): { label: string; min: number; max: number }[] {
  const values = products.map(extractPowerValue).filter((v) => v > 0);
  if (values.length === 0) return [];
  const max = Math.max(...values);
  return [
    { label: 'Up to 500W', min: 0, max: 500 },
    { label: '500W – 2000W', min: 500, max: 2000 },
    { label: '2000W – 5000W', min: 2000, max: 5000 },
    { label: '5000W+', min: 5000, max: max + 1 },
  ];
}

function hasFeature(product: Product, feature: string): boolean {
  const featureMap: Record<string, boolean> = {
    Bluetooth: product.mixerSpecs?.bluetooth === 'Yes' || product.inputs.some((i) => i.toLowerCase().includes('bluetooth')),
    USB: product.mixerSpecs?.usb === 'Yes' || product.inputs.some((i) => i.toLowerCase().includes('usb')),
    Echo: product.mixerSpecs?.echoControl !== undefined || product.controls.some((c) => c.toLowerCase().includes('echo')),
    'Dual Channel': product.features.some((f) => f.toLowerCase().includes('dual channel')) || product.power.output.includes('+'),
    Cooling: Boolean(product.specifications.coolingSystem),
    Protection: Boolean(product.specifications.protection),
  };
  return featureMap[feature] ?? false;
}

export function filterProducts(
  list: Product[],
  filters: FilterState
): Product[] {
  return list.filter((p) => {
    if (filters.categories.length > 0 && !filters.categories.includes(p.category)) return false;
    if (filters.types.length > 0 && !filters.types.includes(p.subCategory)) return false;
    if (filters.features.length > 0 && !filters.features.every((f) => hasFeature(p, f))) return false;
    if (filters.powerRange) {
      const ranges = getPowerRanges();
      const range = ranges.find((r) => r.label === filters.powerRange);
      if (range) {
        const pw = extractPowerValue(p);
        if (pw === 0 || pw < range.min || pw >= range.max) return false;
      }
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const haystack = [p.name, p.model, p.category, p.subCategory, p.shortDescription, ...p.features]
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

export function sortProducts(list: Product[], sort: SortOption): Product[] {
  const sorted = [...list];
  switch (sort) {
    case 'power-asc':
      return sorted.sort((a, b) => extractPowerValue(a) - extractPowerValue(b));
    case 'power-desc':
      return sorted.sort((a, b) => extractPowerValue(b) - extractPowerValue(a));
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case 'featured':
    default:
      return sorted.sort((a, b) => Number(b.featured) - Number(a.featured));
  }
}

export function searchProducts(query: string): Product[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  return products
    .filter((p) => {
      const haystack = [
        p.name,
        p.model,
        p.category,
        p.subCategory,
        p.shortDescription,
        p.tagline,
        p.power.rms,
        p.power.max,
        p.power.output,
        ...p.features,
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    })
    .slice(0, 8);
}
