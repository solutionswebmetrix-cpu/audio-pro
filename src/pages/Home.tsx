import { Link } from 'react-router-dom';
import {
  ArrowRight, Zap, Disc3, Speaker, SlidersHorizontal,
  AudioWaveform, ShieldCheck, Wind, Shield, Cpu, Gauge,
  Radio, Mic2, Building2, Users, Briefcase, Headphones, Volume2, Heart,
  MessageCircle, Phone,
} from 'lucide-react';
import { products } from '@/data/products';
import { siteData } from '@/data/siteData';
import { generalWhatsAppUrl } from '@/utils/whatsapp';
import { Reveal, Stagger, StaggerItem } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { ProductCard } from '@/components/ProductCard';
import { ProductImage } from '@/components/ProductImage';
import { CategoryCard } from '@/components/CategoryCard';
import { AudioWave } from '@/components/AudioWave';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { setDocumentMeta } from '@/utils/seo';
import bannerVideo from '../../assets/banner.mp4';

const iconMap: Record<string, typeof Zap> = {
  Zap, Disc3, Speaker, SlidersHorizontal,
  AudioWaveform, ShieldCheck, Wind, Shield, Cpu, Gauge,
  Radio, Mic2, Building2, Users, Briefcase, Headphones, Volume2, Heart,
};

interface HomeProps {
  onQuoteOpen: (product?: string) => void;
}

export default function Home({ onQuoteOpen }: HomeProps) {
  const mixerShowcase = products.find((p) => p.id === 'emm-6-usb') || products.find((p) => p.category === 'Mixers');
  const reduced = usePrefersReducedMotion();

  setDocumentMeta({
    title: 'Audio&Pro — Power. Precision. Performance.',
    description:
      'Professional power amplifiers, DJ amplifiers, Hi-Fi amplifiers and audio mixers engineered for powerful, reliable and precise sound.',
  });

  return (
    <div className="overflow-hidden">
      {/* HERO — Full-Screen Cinematic Video Banner */}
      <section className="relative grain overflow-hidden h-[85svh] min-h-[75vh] sm:h-[90svh] sm:min-h-[85vh] lg:h-screen lg:min-h-screen">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 z-0 h-full w-full object-cover object-center"
          onError={(e) => {
            console.error('Hero banner video failed to load:', e.currentTarget.src);
          }}
        >
          <source src={bannerVideo} type="video/mp4" />
        </video>

        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#252525]/60 via-[#252525]/30 to-[#252525]/10" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#252525]/55 via-transparent to-transparent" />

        <div className="relative z-20 h-full w-full">
          <div className="container-px flex h-full w-full items-center py-24 sm:py-28 lg:py-32">
            <div className="w-full max-w-xl sm:max-w-2xl lg:max-w-[45%]">
              <Reveal>
                <div className="mb-6 flex items-center gap-3">
                  <span className="h-px w-10 bg-pro-red" />
                  <span className="label-overline text-pro-red">Professional Audio Equipment</span>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tightest text-white sm:text-5xl lg:text-6xl xl:text-7xl">
                  Power That<br />You Can <span className="text-gradient-red">Feel.</span>
                </h1>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-steel-300 sm:text-xl">
                  Sound that defines performance. Professional power amplifiers and audio mixers engineered for powerful, reliable and precise sound.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link to="/products" className="btn-primary w-full sm:w-auto">
                    Explore Products
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <button onClick={() => onQuoteOpen()} className="btn-ghost w-full sm:w-auto border-steel-500/40 bg-ink-900/30 backdrop-blur-sm text-white hover:bg-ink-900/50">
                    Request a Quote
                  </button>
                </div>
              </Reveal>
              <Reveal delay={0.4}>
                <div className="mt-10 flex items-center gap-6">
                  <div>
                    <div className="font-display text-2xl font-bold text-white">{products.length}</div>
                    <div className="text-xs uppercase tracking-wider text-steel-400">Products</div>
                  </div>
                  <div className="h-8 w-px bg-steel-700/60" />
                  <div>
                    <div className="font-display text-2xl font-bold text-white">2</div>
                    <div className="text-xs uppercase tracking-wider text-steel-400">Categories</div>
                  </div>
                  <div className="h-8 w-px bg-steel-700/60 hidden sm:block" />
                  <div className="text-pro-red hidden sm:block">
                    <AudioWave bars={16} height={32} className="opacity-70" />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT CATEGORIES */}
      <section className="section-py bg-white">
        <div className="container-px">
          <SectionHeading
            overline="Product Range"
            title="Explore by Category"
            subtitle="Professional audio equipment engineered for every application."
            align="center"
            className="mb-14"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {siteData.categories.map((cat, i) => {
              const Icon = iconMap[cat.icon] || Zap;
              return (
                <CategoryCard
                  key={cat.id}
                  name={cat.name}
                  description={cat.description}
                  image={cat.image}
                  slug={cat.slug}
                  icon={Icon}
                  index={i}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED AMPLIFIERS */}
      <section className="section-py bg-[#F5F6F7]">
        <div className="container-px">
          <div className="flex items-end justify-between gap-6">
            <SectionHeading
              overline="Featured"
              title="Featured Products"
              subtitle="Professional products from the Audio&Pro range."
            />
            <Link to="/products/amplifiers" className="hidden btn-ghost shrink-0 sm:inline-flex">
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 20).map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* MIXER SHOWCASE */}
      {mixerShowcase && (
        <section className="relative section-py overflow-hidden bg-white">
          <div className="absolute inset-0 bg-radial-blue" />
          <div className="container-px relative">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <SectionHeading
                  overline="Audio Mixers"
                  title="Mixing Precision for Every Channel"
                  subtitle="Professional mixing solutions for live shows, studios and events — with echo control, EQ, Bluetooth and USB connectivity."
                />
                <Reveal delay={0.15}>
                  <ul className="mt-6 space-y-3">
                    {['Multi-channel mic/line inputs', '3-band EQ with echo and delay', 'USB, Bluetooth and FM connectivity', 'Rugged metal body construction'].map((feat) => (
                      <li key={feat} className="flex items-center gap-3 text-sm text-[#5F6368]">
                        <span className="h-1.5 w-1.5 rounded-full bg-pro-red" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </Reveal>
                <Reveal delay={0.25}>
                  <div className="mt-8">
                    <Link to={`/products/${mixerShowcase.slug}`} className="btn-primary">
                      View {mixerShowcase.name}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </Reveal>
              </div>
              <Reveal delay={0.1} y={40}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-[#E1E4E8] bg-white shadow-card">
                  <ProductImage
                    src={mixerShowcase.image}
                    alt={`${mixerShowcase.name} audio mixer`}
                    className="h-full w-full"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* ENGINEERING SECTION */}
      <section className="section-py bg-[#F5F6F7]">
        <div className="container-px">
          <SectionHeading
            overline="Engineering"
            title="Engineered for Performance"
            subtitle="Every Audio&Pro product is built with precision engineering, premium components and multi-level protection."
            align="center"
            className="mb-14"
          />
          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" gap={0.08}>
            {siteData.engineeringFeatures.map((feat) => {
              const Icon = iconMap[feat.icon] || Cpu;
              return (
                <StaggerItem key={feat.title}>
                  <div className="group h-full rounded-2xl border border-[#E1E4E8] bg-white p-6 shadow-card transition-all hover:border-[#E1E4E8] hover:bg-[#F5F6F7]">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-pro-red/20 bg-pro-red/5 transition-colors group-hover:border-pro-red/40">
                      <Icon className="h-6 w-6 text-pro-red" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-[#1A1A1A]">{feat.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#5F6368]">{feat.description}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* STATS / NUMBERS */}
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

      {/* APPLICATIONS */}
      <section className="section-py bg-[#F5F6F7]">
        <div className="container-px">
          <SectionHeading
            overline="Applications"
            title="Built for Every Sound Environment"
            subtitle="From DJ booths to auditoriums, Audio&Pro equipment powers professional audio worldwide."
            align="center"
            className="mb-14"
          />
          <Stagger className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3" gap={0.05}>
            {siteData.applications.map((app) => {
              const Icon = iconMap[app.icon] || Volume2;
              return (
                <StaggerItem key={app.name}>
                  <div className="group flex items-center gap-4 rounded-xl border border-[#E1E4E8] bg-white p-5 shadow-card transition-all hover:border-pro-red/30 hover:bg-[#F5F6F7]">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-[#E1E4E8] bg-white transition-colors group-hover:border-pro-red/40">
                      <Icon className="h-5 w-5 text-[#5F6368] group-hover:text-pro-red" />
                    </div>
                    <span className="text-sm font-medium text-[#1A1A1A]">{app.name}</span>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* PRODUCT RANGE / HORIZONTAL SCROLL */}
      <section className="section-py bg-white">
        <div className="container-px">
          <SectionHeading
            overline="Full Range"
            title="The Complete Audio&Pro Lineup"
            subtitle="Explore our full catalogue of professional amplifiers and audio mixers."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 20).map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="mt-10 text-center">
              <Link to="/products" className="btn-primary">
                View All Products
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="relative section-py overflow-hidden bg-[#F5F6F7]">
        <div className="absolute inset-0 bg-radial-spot opacity-50" />
        <div className="container-px relative text-center">
          <Reveal>
            <h2 className="mx-auto max-w-3xl font-display text-3xl font-bold tracking-tight text-[#1A1A1A] sm:text-4xl lg:text-5xl">
              Have a Sound Requirement?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-xl text-base text-[#5F6368]">
              Whether you need a single professional amplifier or equipment for a complete audio installation, contact Audio&Pro.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button onClick={() => onQuoteOpen()} className="btn-primary">
                Request a Quote
                <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href={generalWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                <MessageCircle className="h-4 w-4" />
                Talk to Sales
              </a>
              <a href={siteData.contact.phoneTel} className="btn-ghost">
                <Phone className="h-4 w-4" />
                {siteData.contact.phoneDisplay}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
