import powerAmplifierImage from '../../assets/product/Audio&Pro Professional Power Amplifier.webp';
import djAmplifierImage from '../../assets/product/Audio&Pro 5000W Professional Power Amplifier.webp';
import hiFiAmplifierImage from '../../assets/product/Audio&Pro PBT 701 Professional Power Amplifier.webp';
import audioMixerImage from '../../assets/product/Audio&Pro Professional Audio Mixer.webp';

export const siteData = {
  brand: {
    name: 'Audio&Pro',
    tagline: 'Power. Precision. Performance.',
    description:
      'Professional power amplifiers and audio mixers engineered for powerful, reliable and precise sound.',
    logoText: 'AUDIO&PRO',
  },

  contact: {
    phone: '+91 7065105643',
    phoneDisplay: '+91 70651 05643',
    phoneTel: 'tel:+917065105643',
    email: 'info@audioandpro.com',
    emailLink: 'mailto:info@audioandpro.com',
    whatsapp: '917065105643',
    address: '',
    mapEmbedUrl: '',
  },

  social: {
    facebook: '',
    instagram: '',
    youtube: '',
    linkedin: '',
    twitter: '',
  },

  stats: {
    enabled: false,
    items: [
      { label: 'Happy Clients', value: 5000, suffix: '+' },
      { label: 'Projects', value: 999, suffix: '' },
      { label: 'Awards', value: 10, suffix: '' },
      { label: 'Team Members', value: 50, suffix: '' },
    ],
  },

  warranty: {
    enabled: false,
    text: '',
  },

  categories: [
    {
      id: 'amplifiers',
      name: 'Power Amplifiers',
      shortName: 'Amplifiers',
      slug: 'amplifiers',
      description: 'High-performance amplifiers engineered for professional sound systems.',
      image: powerAmplifierImage,
      icon: 'Zap',
    },
    {
      id: 'dj-amplifiers',
      name: 'DJ Amplifiers',
      shortName: 'DJ Amps',
      slug: 'dj-amplifiers',
      description: 'High-output amplification for DJs, events and live performances.',
      image: djAmplifierImage,
      icon: 'Disc3',
    },
    {
      id: 'hi-fi-amplifiers',
      name: 'Hi-Fi Amplifiers',
      shortName: 'Hi-Fi',
      slug: 'hi-fi-amplifiers',
      description: 'Clean, detailed sound for high-fidelity applications.',
      image: hiFiAmplifierImage,
      icon: 'Speaker',
    },
    {
      id: 'mixers',
      name: 'Audio Mixers',
      shortName: 'Mixers',
      slug: 'mixers',
      description: 'Professional mixing solutions for live shows, studios and events.',
      image: audioMixerImage,
      icon: 'SlidersHorizontal',
    },
  ],

  applications: [
    { name: 'DJ & Entertainment', icon: 'Disc3' },
    { name: 'Live Events', icon: 'Radio' },
    { name: 'Stage Shows', icon: 'Mic2' },
    { name: 'Auditorium', icon: 'Building2' },
    { name: 'Conference Systems', icon: 'Users' },
    { name: 'Commercial Audio', icon: 'Briefcase' },
    { name: 'Studio', icon: 'Headphones' },
    { name: 'Public Address', icon: 'Volume2' },
    { name: 'Worship & Community', icon: 'Heart' },
  ],

  engineeringFeatures: [
    { title: 'High Power Output', icon: 'Zap', description: 'Massive wattage delivered with stability across demanding loads.' },
    { title: 'Clean Sound', icon: 'AudioWaveform', description: 'Ultra-low THD and high signal-to-noise ratios for pristine audio.' },
    { title: 'Stable Performance', icon: 'ShieldCheck', description: 'Engineered for continuous operation under heavy load conditions.' },
    { title: 'Professional Components', icon: 'Cpu', description: 'Premium internal components selected for long-term reliability.' },
    { title: 'Smart Cooling', icon: 'Wind', description: 'High-speed and dual-fan systems for thermal management.' },
    { title: 'Multi-Level Protection', icon: 'Shield', description: 'Short circuit, overload, thermal, DC and soft start protection.' },
  ],

  nav: [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'Amplifiers', path: '/products/amplifiers' },
    { label: 'Mixers', path: '/products/mixers' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ],
};

export type SiteData = typeof siteData;
