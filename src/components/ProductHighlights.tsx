import { Zap, Mic2, Headphones, Usb, Bluetooth, SlidersHorizontal, Shield, Wind, Volume2, Radio } from 'lucide-react';
import type { Product } from '@/data/products';
import { Stagger, StaggerItem } from './Reveal';

interface ProductHighlightsProps {
  product: Product;
}

export function ProductHighlights({ product }: ProductHighlightsProps) {
  const highlights = buildHighlights(product);
  if (highlights.length === 0) return null;

  return (
    <Stagger className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4" gap={0.06}>
      {highlights.map((hl) => (
        <StaggerItem key={hl.label}>
          <div className="group flex flex-col items-center gap-2 rounded-xl border border-[#E1E4E8] bg-[#F8F9FA] p-4 text-center transition-colors hover:border-[#D1D5DB] hover:bg-white shadow-card">
            <hl.icon className="h-5 w-5 text-pro-red transition-transform group-hover:scale-110" />
            <span className="text-[11px] font-semibold uppercase tracking-wide text-[#5F6368]">
              {hl.label}
            </span>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

function buildHighlights(product: Product): { label: string; icon: typeof Zap }[] {
  const items: { label: string; icon: typeof Zap }[] = [];
  const s = product.specifications;
  const m = product.mixerSpecs;

  if (product.power.rms) items.push({ label: `${product.power.rms} RMS`, icon: Zap });
  else if (product.power.max) items.push({ label: `${product.power.max} Max`, icon: Zap });
  else if (product.power.output) items.push({ label: product.power.output, icon: Zap });

  const micInputs = product.inputs.find((i) => i.toLowerCase().includes('mic'));
  if (micInputs) items.push({ label: micInputs, icon: Mic2 });

  if (product.inputs.some((i) => i.toLowerCase().includes('usb')) || m?.usb === 'Yes')
    items.push({ label: 'USB', icon: Usb });
  if (product.inputs.some((i) => i.toLowerCase().includes('bluetooth')) || m?.bluetooth === 'Yes')
    items.push({ label: 'Bluetooth', icon: Bluetooth });
  if (product.inputs.some((i) => i.toLowerCase().includes('fm')))
    items.push({ label: 'FM Radio', icon: Radio });
  if (product.inputs.some((i) => i.toLowerCase().includes('tf')))
    items.push({ label: 'TF Card', icon: Usb });

  if (product.controls.some((c) => c.toLowerCase().includes('bass')) || product.controls.some((c) => c.toLowerCase().includes('eq')))
    items.push({ label: 'Tone Control', icon: SlidersHorizontal });
  if (product.controls.some((c) => c.toLowerCase().includes('echo')))
    items.push({ label: 'Echo Control', icon: Volume2 });

  if (s.coolingSystem) items.push({ label: s.coolingSystem, icon: Wind });
  if (s.protection) items.push({ label: 'Protection', icon: Shield });
  if (m?.headphoneOutput === 'Yes' || product.outputs.some((o) => o.toLowerCase().includes('headphone')))
    items.push({ label: 'Headphone Out', icon: Headphones });

  if (s.powerSupply) items.push({ label: s.powerSupply, icon: Zap });

  return items.slice(0, 8);
}
