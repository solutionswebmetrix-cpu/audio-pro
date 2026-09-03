import { Zap, AudioWaveform, ShieldCheck, Wind, Shield, Cpu, Volume2, Gauge, Music, SlidersHorizontal } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Product } from '@/data/products';
import { Stagger, StaggerItem } from './Reveal';

const iconMap: Record<string, LucideIcon> = {
  'Powerful Output': Zap,
  'High Power Output': Zap,
  'Clean Sound': AudioWaveform,
  'Deep Bass': Volume2,
  'Stable Performance': Gauge,
  'Smart Cooling': Wind,
  'Overload Protection': ShieldCheck,
  'Short Circuit Protection': Shield,
  'Professional Construction': Cpu,
  'Premium Components': Cpu,
  'Rugged Construction': Cpu,
  'Rugged Metal Body': Cpu,
  'Echo Effect': Music,
  '3-Band EQ': SlidersHorizontal,
};

export function ProductFeatures({ product }: { product: Product }) {
  if (product.features.length === 0) return null;

  return (
    <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" gap={0.06}>
      {product.features.map((feature) => {
        const Icon = iconMap[feature] || Zap;
        return (
          <StaggerItem key={feature}>
            <div className="group flex h-full flex-col gap-3 rounded-xl border border-[#E1E4E8] bg-white p-5 transition-all hover:border-[#D1D5DB] hover:bg-[#F8F9FA] shadow-card hover:shadow-card-lg">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-pro-red/20 bg-pro-red/5 transition-colors group-hover:border-pro-red/40">
                <Icon className="h-5 w-5 text-pro-red" />
              </div>
              <span className="text-sm font-medium text-[#1A1A1A]">{feature}</span>
            </div>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}
