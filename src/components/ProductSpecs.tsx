import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import type { Product } from '@/data/products';
import { Reveal } from './Reveal';

interface ProductSpecsProps {
  product: Product;
}

interface SpecGroup {
  title: string;
  icon: string;
  specs: { label: string; value: string }[];
}

export function ProductSpecs({ product }: ProductSpecsProps) {
  const groups = buildSpecGroups(product);
  if (groups.length === 0) {
    return (
      <div className="card-surface p-8 text-center">
        <p className="text-sm text-[#7A7F85]">
          Detailed specifications for this model are being compiled.
        </p>
        <p className="mt-2 text-sm text-[#5F6368]">
          Please <Link to="/contact" className="text-pro-red-light hover:underline">contact us</Link> for complete technical details.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {groups.map((group, gi) => (
        <Reveal key={group.title} delay={gi * 0.05}>
          <SpecCard group={group} defaultOpen={gi === 0} />
        </Reveal>
      ))}
    </div>
  );
}

function SpecCard({ group, defaultOpen }: { group: SpecGroup; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="card-surface overflow-hidden bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
        aria-expanded={open}
      >
        <span className="font-display text-sm font-bold uppercase tracking-wider text-[#1A1A1A]">
          {group.title}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-[#7A7F85] transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="border-t border-[#E1E4E8]">
          <dl className="divide-y divide-[#E1E4E8]">
            {group.specs.map((spec) => (
              <div key={spec.label} className="flex items-start justify-between gap-4 px-5 py-3">
                <dt className="text-sm text-[#5F6368]">{spec.label}</dt>
                <dd className="text-right text-sm font-medium text-[#1A1A1A]">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  );
}

function buildSpecGroups(product: Product): SpecGroup[] {
  const groups: SpecGroup[] = [];
  const s = product.specifications;
  const m = product.mixerSpecs;

  // Power
  const powerSpecs: { label: string; value: string }[] = [];
  if (product.power.rms) powerSpecs.push({ label: 'RMS Power', value: product.power.rms });
  if (product.power.max) powerSpecs.push({ label: 'Maximum Power', value: product.power.max });
  if (product.power.output) powerSpecs.push({ label: 'Output Configuration', value: product.power.output });
  if (s.powerSupply) powerSpecs.push({ label: 'AC Voltage / Frequency', value: s.powerSupply });
  if (powerSpecs.length > 0) groups.push({ title: 'Power', icon: 'Zap', specs: powerSpecs });

  // Audio Performance
  const audioSpecs: { label: string; value: string }[] = [];
  if (s.frequencyResponse) audioSpecs.push({ label: 'Frequency Response', value: s.frequencyResponse });
  if (s.thd) audioSpecs.push({ label: 'THD', value: s.thd });
  if (s.signalToNoise) audioSpecs.push({ label: 'Signal-to-Noise Ratio', value: s.signalToNoise });
  if (s.dampingFactor) audioSpecs.push({ label: 'Damping Factor', value: s.dampingFactor });
  if (s.inputSensitivity) audioSpecs.push({ label: 'Input Sensitivity', value: s.inputSensitivity });
  if (s.inputImpedance) audioSpecs.push({ label: 'Input Impedance', value: s.inputImpedance });
  if (s.loadImpedance) audioSpecs.push({ label: 'Load Impedance', value: s.loadImpedance });
  if (audioSpecs.length > 0) groups.push({ title: 'Audio Performance', icon: 'AudioWaveform', specs: audioSpecs });

  // Connectivity / I/O
  const ioSpecs: { label: string; value: string }[] = [];
  product.inputs.forEach((inp) => ioSpecs.push({ label: inp, value: 'Yes' }));
  product.outputs.forEach((out) => ioSpecs.push({ label: out, value: 'Yes' }));
  if (m) {
    if (m.usb) ioSpecs.push({ label: 'USB', value: m.usb });
    if (m.bluetooth) ioSpecs.push({ label: 'Bluetooth', value: m.bluetooth });
    if (m.headphoneOutput) ioSpecs.push({ label: 'Headphone Output', value: m.headphoneOutput });
  }
  if (ioSpecs.length > 0) groups.push({ title: 'Connectivity / I/O', icon: 'Plug', specs: ioSpecs });

  // Controls
  if (product.controls.length > 0) {
    groups.push({
      title: 'Controls',
      icon: 'SlidersHorizontal',
      specs: product.controls.map((c) => ({ label: c, value: 'Yes' })),
    });
  }

  // Mixer specs
  if (m) {
    const mixerSpecs: { label: string; value: string }[] = [];
    if (m.channels) mixerSpecs.push({ label: 'Channels', value: m.channels });
    if (m.eqControl) mixerSpecs.push({ label: 'EQ Control', value: m.eqControl });
    if (m.echoControl) mixerSpecs.push({ label: 'Echo Control', value: m.echoControl });
    if (m.effects) mixerSpecs.push({ label: 'Effects', value: m.effects });
    if (mixerSpecs.length > 0) groups.push({ title: 'Mixer', icon: 'SlidersHorizontal', specs: mixerSpecs });
  }

  // Protection
  if (s.protection) {
    const protections = s.protection.split(',').map((p) => p.trim());
    groups.push({
      title: 'Protection',
      icon: 'Shield',
      specs: protections.map((p) => ({ label: p, value: 'Yes' })),
    });
  }

  // Cooling
  if (s.coolingSystem) {
    groups.push({
      title: 'Cooling',
      icon: 'Wind',
      specs: [{ label: 'Cooling System', value: s.coolingSystem }],
    });
  }

  // Physical
  const physicalSpecs: { label: string; value: string }[] = [];
  if (s.dimensions) physicalSpecs.push({ label: 'Dimensions', value: s.dimensions });
  if (s.weight) physicalSpecs.push({ label: 'Weight', value: s.weight });
  if (physicalSpecs.length > 0) groups.push({ title: 'Physical', icon: 'Ruler', specs: physicalSpecs });

  return groups;
}
