import { Link } from 'react-router-dom';
import {
  Cpu, ShieldCheck, Zap, AudioWaveform, ArrowRight, Wrench, FlaskConical, Award,
} from 'lucide-react';
import { siteData } from '@/data/siteData';
import { Reveal, Stagger, StaggerItem } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { WaveLine } from '@/components/AudioWave';
import { setDocumentMeta } from '@/utils/seo';

const philosophy = [
  { icon: Cpu, title: 'Precision Engineering', desc: 'Every product is designed with meticulous attention to detail and careful component selection.' },
  { icon: ShieldCheck, title: 'Reliability First', desc: 'Built for demanding audio environments with multi-level protection circuitry.' },
  { icon: Zap, title: 'Power Delivery', desc: 'High-output amplification stages engineered for clean, stable power under load.' },
  { icon: AudioWaveform, title: 'Audio Fidelity', desc: 'Ultra-low THD and high signal-to-noise ratios for accurate sound reproduction.' },
];

const story = [
  {
    title: 'Our Story',
    body: 'Audio&Pro was founded with a singular mission: to manufacture professional amplifiers and audio mixers that deliver powerful sound, clear audio, and reliable performance for demanding professional applications. From compact PA amplifiers to high-output DJ and touring-grade power amplifiers, every product is engineered to perform under pressure.',
  },
  {
    title: 'Engineering Philosophy',
    body: 'We believe that great sound equipment is the result of disciplined engineering. Every circuit, every component, and every chassis is selected and tested for long-term reliability. We do not chase gimmicks — we build equipment that works, night after night, in the most demanding audio environments.',
  },
  {
    title: 'Quality & Reliability',
    body: 'Our products feature comprehensive protection suites — short circuit, overload, thermal, and DC protection — combined with smart cooling systems that keep temperatures in check under heavy load. This is what makes Audio&Pro equipment dependable when it matters most.',
  },
  {
    title: 'Product Development',
    body: 'We continuously refine our product line based on real-world feedback from DJs, sound engineers, installers, and venues. Our development process focuses on practical performance: stable power delivery, clean sound, and rugged construction that withstands the rigors of professional use.',
  },
];

export default function About() {
  setDocumentMeta({
    title: 'About Us — Audio&Pro',
    description:
      'Audio&Pro manufactures professional amplifiers and audio mixers engineered for powerful sound, clear audio and reliable performance.',
  });

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="relative grain flex min-h-[60vh] items-center bg-white py-20">
        <div className="absolute inset-0 bg-grid-faint bg-grid opacity-30" />
        <div className="absolute inset-0 bg-radial-spot" />
        <div className="container-px relative">
          <Reveal>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-pro-red" />
              <span className="label-overline text-pro-red">About Audio&Pro</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="max-w-3xl font-display text-4xl font-bold leading-[1.1] tracking-tightest text-[#1A1A1A] sm:text-5xl lg:text-6xl">
              Engineering Sound.<br />
              Delivering <span className="text-gradient-red">Power.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xl text-lg text-[#5F6368]">
              Audio&Pro manufactures professional amplifiers and channel mixers designed for powerful sound, clear audio, and reliable long-term performance.
            </p>
          </Reveal>
          <div className="mt-10 text-pro-red/20">
            <WaveLine />
          </div>
        </div>
      </section>

      {/* Philosophy cards */}
      <section className="section-py bg-[#F5F6F7]">
        <div className="container-px">
          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" gap={0.08}>
            {philosophy.map((item) => (
              <StaggerItem key={item.title}>
                <div className="group h-full rounded-2xl border border-[#E1E4E8] bg-white p-6 shadow-card transition-all hover:border-steel-700">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-pro-red/20 bg-pro-red/5 transition-colors group-hover:border-pro-red/40">
                    <item.icon className="h-6 w-6 text-pro-red" />
                  </div>
                  <h3 className="font-display text-base font-bold text-[#1A1A1A]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5F6368]">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Story sections */}
      <section className="section-py bg-white">
        <div className="container-px">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {story.map((section, i) => (
              <Reveal key={section.title} delay={i * 0.1}>
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-pro-red/20 bg-pro-red/5">
                      {i === 0 && <Wrench className="h-4 w-4 text-pro-red" />}
                      {i === 1 && <Cpu className="h-4 w-4 text-pro-red" />}
                      {i === 2 && <ShieldCheck className="h-4 w-4 text-pro-red" />}
                      {i === 3 && <FlaskConical className="h-4 w-4 text-pro-red" />}
                    </span>
                    <h2 className="font-display text-2xl font-bold text-[#1A1A1A]">{section.title}</h2>
                  </div>
                  <p className="text-base leading-relaxed text-[#5F6368]">{section.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Audio&Pro */}
      <section className="section-py bg-[#F5F6F7]">
        <div className="container-px">
          <SectionHeading
            overline="Why Audio&Pro"
            title="Built for Professionals"
            subtitle="Professional-grade construction, comprehensive protection, and reliable performance — that is the Audio&Pro standard."
            align="center"
            className="mb-14"
          />
          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" gap={0.08}>
            {[
              { title: 'Skilled Engineers', desc: 'Precision engineering and careful product development by experienced audio professionals.' },
              { title: 'Reliable Products', desc: 'Built for demanding audio environments with rugged construction and quality components.' },
              { title: 'Comprehensive Support', desc: 'Product information, applications guidance, and direct access to our sales team.' },
            ].map((item) => (
              <StaggerItem key={item.title}>
                <div className="rounded-2xl border border-[#E1E4E8] bg-white p-6 shadow-card">
                  <h3 className="font-display text-lg font-bold text-[#1A1A1A]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5F6368]">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Stats */}
      {siteData.stats.enabled && (
        <section className="border-y border-[#E1E4E8] bg-white py-16">
          <div className="container-px">
            <Stagger className="grid grid-cols-2 gap-8 lg:grid-cols-4" gap={0.1}>
              {siteData.stats.items.map((stat) => (
                <StaggerItem key={stat.label}>
                  <div className="text-center">
                    <div className="font-display text-4xl font-bold text-[#1A1A1A] sm:text-5xl">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="mt-2 text-xs uppercase tracking-ultra text-[#7A7F85]">{stat.label}</div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-py bg-white">
        <div className="container-px text-center">
          <Reveal>
            <h2 className="mx-auto max-w-2xl font-display text-2xl font-bold text-[#1A1A1A] sm:text-3xl">
              Ready to power your sound system?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link to="/products" className="btn-primary">
                Explore Products
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/contact" className="btn-ghost">
                Contact Us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
