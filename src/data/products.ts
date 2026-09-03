import img12BlackRed from '../../assets/product/12 Channel Audio Mixer — BlackRed.webp';
import img12Professional from '../../assets/product/12 Channel Professional Audio Mixer.webp';
import img12Channel from '../../assets/product/12-Channel-Audio-Mixer.webp';
import img120 from '../../assets/product/120W-Power-Amplifier.webp';
import img1600Gold from '../../assets/product/1600 Watt Power Amplifier — GoldBlack.webp';
import img1600 from '../../assets/product/1600 Watt Power Amplifier.webp';
import img1600Two from '../../assets/product/1600W-Power-Amplifier-2.webp';
import img1600W from '../../assets/product/1600W-Power-Amplifier.webp';
import img2000Dual from '../../assets/product/2000W-Dual-Channel-Amplifier.webp';
import img2000 from '../../assets/product/2000W-Power-Amplifier.webp';
import img316 from '../../assets/product/316W-Power-Amplifier.webp';
import img350 from '../../assets/product/350W-Power-Amplifier.webp';
import img4000 from '../../assets/product/4000W Power Amplifier.webp';
import img6Blue from '../../assets/product/6 Channel Audio Mixer — BlueBlack.webp';
import img601 from '../../assets/product/601-power-amplifier.webp';
import img7000W from '../../assets/product/7000 Watt Power Amplifier — AP-7000.webp';
import img8000W from '../../assets/product/8000 Watt Power Amplifier — AP-8000.webp';
import imgAp6000 from '../../assets/product/ap-6000-power-amplifie.webp';
import imgAp6000Alt from '../../assets/product/AP-6000-Power-Amplifier-2.webp';
import imgAp6000Front from '../../assets/product/AP-6000-Power-Amplifier.webp';
import imgAp7000 from '../../assets/product/AP-7000-Power-Amplifier.webp';
import imgAp8000 from '../../assets/product/AP-8000-Power-Amplifier.webp';
import imgAudioProAmp from '../../assets/product/Audio & Pro Power Amplifier.webp';
import imgSpeakerSeries from '../../assets/product/Audio & Pro Speaker Woofer — APS Series.webp';
import imgChatSpeaker from '../../assets/product/ChatGPT Image Sep 2, 2026, 05_02_47 PM.webp';
import imgDj5000 from '../../assets/product/DJ-5000W-Power-Amplifier.webp';
import imgEchoMix from '../../assets/product/Echo Mix Professional Audio Mixer.webp';
import imgEchoMixAlt from '../../assets/product/Echo-Mix-Audio-Mixer.webp';
import imgMt1201 from '../../assets/product/MT1201-Power-Amplifier.webp';
import imgPbt501 from '../../assets/product/PBT-501-Power-Amplifier-2.webp';
import imgPbt501Alt from '../../assets/product/PBT-501-Power-Amplifier.webp';
import imgPbt701 from '../../assets/product/PBT-701-Power-Amplifier-2.webp';
import imgPbt701Alt from '../../assets/product/PBT-701-Power-Amplifier-3.webp';
import imgPbt701Front from '../../assets/product/PBT-701-Power-Amplifier.webp';
import imgGoldFront from '../../assets/product/Power Amplifier — GoldBlack Front.webp';
import imgVerticalMixer from '../../assets/product/Professional Audio Mixer — VerticalCompact.webp';
import imgBlueSilver from '../../assets/product/Professional Power Amplifier — BlueSilver Front.webp';
import imgProfessionalWoofer from '../../assets/product/Professional Speaker  Woofer.webp';
import imgMixer2 from '../../assets/product/Professional-Audio-Mixer-2.webp';
import imgMixer3 from '../../assets/product/Professional-Audio-Mixer-3.webp';
import imgMixer from '../../assets/product/Professional-Audio-Mixer.webp';
import imgBlueAmp from '../../assets/product/Professional-Power-Amplifier-Blue.webp';
import imgXp1500 from '../../assets/product/XP-1500 Power Amplifier.webp';
import imgXp1500Alt from '../../assets/product/xp-1500-amplifier.webp';

export type ProductCategory = 'Amplifiers' | 'Mixers' | 'Speakers';
export type ProductType = 'Power Amplifier' | 'DJ Amplifier' | 'Hi-Fi Amplifier' | 'Audio Mixer' | 'Digital Echo Mixer' | 'Speaker Woofer';

export interface Product {
  id: string; slug: string; name: string; model: string; category: ProductCategory; subCategory: ProductType;
  image: string; gallery: string[]; shortDescription: string; description: string; tagline: string;
  power: { rms: string; max: string; output: string };
  specifications: { frequencyResponse?: string; thd?: string; signalToNoise?: string; inputSensitivity?: string; inputImpedance?: string; dampingFactor?: string; loadImpedance?: string; coolingSystem?: string; protection?: string; powerSupply?: string; dimensions?: string; weight?: string };
  features: string[]; inputs: string[]; outputs: string[]; controls: string[]; applications: string[]; warranty: string; availability: string; featured: boolean;
  mixerSpecs?: { channels: string; eqControl: string; echoControl: string; effects: string; headphoneOutput: string; usb: string; bluetooth: string; outputs: string[] };
}

type Seed = { id: string; name: string; model: string; image: string; gallery?: string[]; category: ProductCategory; subCategory: ProductType; power?: { rms?: string; max?: string; output?: string }; channels?: string; featured?: boolean; notes?: string };
const protection = 'Short Circuit Protection, Overload Protection, Thermal Protection, DC Protection';

function makeProduct(seed: Seed): Product {
  const mixer = seed.category === 'Mixers';
  const speaker = seed.category === 'Speakers';
  const power = { rms: seed.power?.rms || '', max: seed.power?.max || '', output: seed.power?.output || '' };
  const mixerSpecs = mixer ? { channels: seed.channels || 'Professional audio channels', eqControl: '3-band EQ', echoControl: seed.subCategory === 'Digital Echo Mixer' ? 'Digital echo with delay' : 'Echo and delay control', effects: 'Echo / delay', headphoneOutput: 'Not specified', usb: seed.notes?.toLowerCase().includes('usb') ? 'Yes' : 'Not specified', bluetooth: seed.notes?.toLowerCase().includes('bluetooth') ? 'Yes' : 'Not specified', outputs: ['Main audio output'] } : undefined;
  const specifications = mixer ? { powerSupply: 'Not specified', dimensions: 'Not specified' } : speaker ? { frequencyResponse: 'Not specified', powerSupply: 'Not specified' } : seed.power ? { powerSupply: 'Not specified' } : {};
  const kind = mixer ? `${seed.channels || 'Professional'} mixer` : speaker ? 'Professional speaker woofer' : `${seed.model} power amplifier`;
  return { id: seed.id, slug: `audio-pro-${seed.id}`, name: seed.name, model: seed.model, category: seed.category, subCategory: seed.subCategory, image: seed.image, gallery: [seed.image, ...(seed.gallery || [])], shortDescription: seed.notes || `${kind} for professional sound systems.`, description: `${seed.name} (${seed.model}) is part of the Audio&Pro professional audio range. ${seed.notes || 'Its product-specific capabilities are shown in the technical details below.'}`, tagline: seed.notes || `Professional ${mixer ? 'mixing' : speaker ? 'speaker' : 'amplification'} for demanding audio systems.`, power, specifications, features: [kind, ...(seed.power ? ['Frequency response 20Hz–20kHz', 'Fan cooling', 'Protection circuitry'] : []), ...(mixer ? ['3-band EQ', 'Echo / delay control'] : [])], inputs: mixer ? [`${seed.channels || 'Audio'} input channels`] : speaker ? [] : ['Line input'], outputs: mixer ? ['Main audio output'] : speaker ? ['Speaker terminal'] : ['Speaker output'], controls: mixer ? ['Channel level', '3-band EQ', 'Master volume'] : speaker ? [] : ['Level control'], applications: speaker ? ['PA Systems', 'Live Events', 'Commercial Audio'] : mixer ? ['Live Events', 'Stage Sound', 'Studio'] : ['PA Systems', 'Live Events', 'Stage Sound'], warranty: '', availability: 'In Stock', featured: seed.featured || false, mixerSpecs };
}

export const products: Product[] = [
  makeProduct({ id: '12-channel-blackred-mixer', name: 'Audio&Pro 12 Channel BlackRed', model: '12 Channel', image: img12BlackRed, category: 'Mixers', subCategory: 'Audio Mixer', channels: '12 Mic/Line', featured: true }),
  makeProduct({ id: '12-channel-professional-mixer', name: 'Audio&Pro 12 Channel Professional Mixer', model: '12 Channel Professional', image: img12Professional, category: 'Mixers', subCategory: 'Audio Mixer', channels: '12 Mic/Line' }),
  makeProduct({ id: '12-channel-mixer', name: 'Audio&Pro 12-Channel Mixer', model: '12-Channel', image: img12Channel, category: 'Mixers', subCategory: 'Audio Mixer', channels: '12 Mic/Line' }),
  makeProduct({ id: '120w-amplifier', name: 'Audio&Pro 120W', model: '120W', image: img120, category: 'Amplifiers', subCategory: 'Power Amplifier', power: { rms: '120W', output: '120W RMS' } }),
  makeProduct({ id: '1600-goldblack-amplifier', name: 'Audio&Pro 1600 Watt GoldBlack', model: '1600W', image: img1600Gold, category: 'Amplifiers', subCategory: 'Power Amplifier', power: { max: '1600W', output: '1600W' }, featured: true }),
  makeProduct({ id: '1600-watt-amplifier', name: 'Audio&Pro 1600 Watt', model: '1600W', image: img1600, category: 'Amplifiers', subCategory: 'Power Amplifier', power: { max: '1600W', output: '1600W' } }),
  makeProduct({ id: '1600w-amplifier-2', name: 'Audio&Pro 1600W Professional', model: '1600W-2', image: img1600Two, category: 'Amplifiers', subCategory: 'Power Amplifier', power: { max: '1600W', output: '1600W' } }),
  makeProduct({ id: '1600w-amplifier', name: 'Audio&Pro 1600W', model: '1600W', image: img1600W, category: 'Amplifiers', subCategory: 'Power Amplifier', power: { max: '1600W', output: '1600W' } }),
  makeProduct({ id: '2000w-dual-channel', name: 'Audio&Pro 2000W Dual Channel', model: '2000W Dual Channel', image: img2000Dual, category: 'Amplifiers', subCategory: 'Power Amplifier', power: { rms: '2000W', output: '1000W + 1000W' }, featured: true }),
  makeProduct({ id: '2000w-amplifier', name: 'Audio&Pro 2000W', model: '2000W', image: img2000, category: 'Amplifiers', subCategory: 'Power Amplifier', power: { max: '2000W', output: '2000W' } }),
  makeProduct({ id: '316w-amplifier', name: 'Audio&Pro 316W', model: '316W', image: img316, category: 'Amplifiers', subCategory: 'Power Amplifier', power: { rms: '316W', output: '316W RMS' }, featured: true }),
  makeProduct({ id: '350w-amplifier', name: 'Audio&Pro 350W', model: '350W', image: img350, category: 'Amplifiers', subCategory: 'Power Amplifier', power: { rms: '350W', output: '350W RMS' } }),
  makeProduct({ id: '4000w-amplifier', name: 'Audio&Pro 4000W', model: '4000W', image: img4000, category: 'Amplifiers', subCategory: 'Power Amplifier', power: { max: '4000W', output: '4000W' }, featured: true }),
  makeProduct({ id: '6-channel-blueblack-mixer', name: 'Audio&Pro 6 Channel BlueBlack Mixer', model: '6 Channel', image: img6Blue, category: 'Mixers', subCategory: 'Audio Mixer', channels: '6 Mic/Line', notes: '6-channel mixer with USB media playback', featured: true }),
  makeProduct({ id: '601-amplifier', name: 'Audio&Pro 601', model: '601', image: img601, category: 'Amplifiers', subCategory: 'Power Amplifier', power: { rms: '600W', output: '600W RMS' }, featured: true }),
  makeProduct({ id: 'ap-7000-7000w', name: 'Audio&Pro 7000 Watt AP-7000', model: 'AP-7000', image: img7000W, category: 'Amplifiers', subCategory: 'Power Amplifier', power: { max: '7000W', output: '7000W' }, featured: true }),
  makeProduct({ id: 'ap-8000-8000w', name: 'Audio&Pro 8000 Watt AP-8000', model: 'AP-8000', image: img8000W, category: 'Amplifiers', subCategory: 'DJ Amplifier', power: { max: '8000W', output: '8000W' }, featured: true }),
  makeProduct({ id: 'ap-6000', name: 'Audio&Pro AP-6000', model: 'AP-6000', image: imgAp6000, gallery: [imgAp6000Alt, imgAp6000Front], category: 'Amplifiers', subCategory: 'Power Amplifier', power: { rms: '4000W', max: '8000W', output: '4000W RMS / 8000W Max' }, featured: true }),
  makeProduct({ id: 'ap-6000-front', name: 'Audio&Pro AP-6000 Front', model: 'AP-6000 Front', image: imgAp6000Front, category: 'Amplifiers', subCategory: 'Power Amplifier', power: { rms: '4000W', max: '8000W', output: '4000W RMS / 8000W Max' } }),
  makeProduct({ id: 'ap-7000', name: 'Audio&Pro AP-7000 Professional', model: 'AP-7000', image: imgAp7000, category: 'Amplifiers', subCategory: 'Power Amplifier', power: { rms: '7000W', output: '3500W + 3500W' }, featured: true }),
  makeProduct({ id: 'ap-8000', name: 'Audio&Pro AP-8000 DJ', model: 'AP-8000', image: imgAp8000, category: 'Amplifiers', subCategory: 'DJ Amplifier', power: { rms: '8000W', output: '4000W + 4000W' }, featured: true }),
  makeProduct({ id: 'audio-pro-power-amplifier', name: 'Audio&Pro Power Amplifier', model: 'Professional Power Amplifier', image: imgAudioProAmp, category: 'Amplifiers', subCategory: 'Power Amplifier' }),
  makeProduct({ id: 'aps-speaker-woofer', name: 'Audio&Pro APS Speaker Woofer', model: 'APS Series', image: imgSpeakerSeries, category: 'Speakers', subCategory: 'Speaker Woofer', notes: 'Audio&Pro APS Series speaker woofer', featured: true }),
  makeProduct({ id: 'speaker-woofer', name: 'Audio&Pro Speaker Woofer', model: 'Professional Woofer', image: imgChatSpeaker, category: 'Speakers', subCategory: 'Speaker Woofer', notes: 'Professional speaker woofer' }),
  makeProduct({ id: 'dj-5000w', name: 'Audio&Pro DJ 5000W', model: 'DJ-5000W', image: imgDj5000, category: 'Amplifiers', subCategory: 'DJ Amplifier', power: { max: '5000W', output: '5000W' }, featured: true }),
  makeProduct({ id: 'echo-mix', name: 'Audio&Pro Echo Mix', model: 'Echo Mix', image: imgEchoMix, gallery: [imgEchoMixAlt], category: 'Mixers', subCategory: 'Digital Echo Mixer', channels: '6 Mic/Line', notes: '6-channel mixer with echo and delay control', featured: true }),
  makeProduct({ id: 'echo-mix-audio', name: 'Audio&Pro Echo Mix Audio Mixer', model: 'Echo-Mix', image: imgEchoMixAlt, category: 'Mixers', subCategory: 'Audio Mixer', channels: '6 Mic/Line' }),
  makeProduct({ id: 'mt1201', name: 'Audio&Pro MT1201', model: 'MT1201', image: imgMt1201, category: 'Amplifiers', subCategory: 'Power Amplifier' }),
  makeProduct({ id: 'pbt-501', name: 'Audio&Pro PBT 501', model: 'PBT-501', image: imgPbt501, gallery: [imgPbt501Alt], category: 'Amplifiers', subCategory: 'Power Amplifier', power: { rms: '500W', output: '500W RMS' }, featured: true }),
  makeProduct({ id: 'pbt-501-front', name: 'Audio&Pro PBT 501 Front', model: 'PBT-501 Front', image: imgPbt501Alt, category: 'Amplifiers', subCategory: 'Power Amplifier', power: { rms: '500W', output: '500W RMS' } }),
  makeProduct({ id: 'pbt-701', name: 'Audio&Pro PBT 701', model: 'PBT-701', image: imgPbt701, gallery: [imgPbt701Alt, imgPbt701Front], category: 'Amplifiers', subCategory: 'Hi-Fi Amplifier', power: { rms: '700W', output: '700W RMS' }, featured: true }),
  makeProduct({ id: 'pbt-701-alt', name: 'Audio&Pro PBT 701 Hi-Fi', model: 'PBT-701 Hi-Fi', image: imgPbt701Alt, category: 'Amplifiers', subCategory: 'Hi-Fi Amplifier', power: { rms: '700W', output: '700W RMS' } }),
  makeProduct({ id: 'pbt-701-front', name: 'Audio&Pro PBT 701 Front', model: 'PBT-701 Front', image: imgPbt701Front, category: 'Amplifiers', subCategory: 'Hi-Fi Amplifier', power: { rms: '700W', output: '700W RMS' } }),
  makeProduct({ id: 'pbt-701-front-view', name: 'Audio&Pro PBT 701 Front View', model: 'PBT-701 Front View', image: imgPbt701Front, category: 'Amplifiers', subCategory: 'Hi-Fi Amplifier', power: { rms: '700W', output: '700W RMS' } }),
  makeProduct({ id: 'goldblack-amplifier', name: 'Audio&Pro GoldBlack Power Amplifier', model: 'GoldBlack', image: imgGoldFront, category: 'Amplifiers', subCategory: 'Power Amplifier' }),
  makeProduct({ id: 'vertical-mixer', name: 'Audio&Pro Professional Vertical Mixer', model: 'Professional Vertical', image: imgVerticalMixer, category: 'Mixers', subCategory: 'Audio Mixer', channels: 'Professional channels' }),
  makeProduct({ id: 'bluesilver-amplifier', name: 'Audio&Pro BlueSilver Power Amplifier', model: 'BlueSilver', image: imgBlueSilver, category: 'Amplifiers', subCategory: 'Power Amplifier' }),
  makeProduct({ id: 'professional-speaker-woofer', name: 'Audio&Pro Professional Speaker Woofer', model: 'Professional Woofer', image: imgProfessionalWoofer, category: 'Speakers', subCategory: 'Speaker Woofer', notes: 'Professional speaker woofer' }),
  makeProduct({ id: 'professional-mixer-2', name: 'Audio&Pro Professional Audio Mixer 2', model: 'Professional Mixer 2', image: imgMixer2, category: 'Mixers', subCategory: 'Audio Mixer', channels: 'Professional channels' }),
  makeProduct({ id: 'professional-mixer-3', name: 'Audio&Pro Professional Audio Mixer 3', model: 'Professional Mixer 3', image: imgMixer3, category: 'Mixers', subCategory: 'Audio Mixer', channels: 'Professional channels' }),
  makeProduct({ id: 'professional-mixer', name: 'Audio&Pro Professional Audio Mixer', model: 'Professional Mixer', image: imgMixer, category: 'Mixers', subCategory: 'Audio Mixer', channels: 'Professional channels', notes: 'Professional audio mixer with multiple input channels' }),
  makeProduct({ id: 'blue-amplifier', name: 'Audio&Pro Professional Power Amplifier Blue', model: 'Professional Blue', image: imgBlueAmp, category: 'Amplifiers', subCategory: 'Power Amplifier' }),
  makeProduct({ id: 'xp-1500', name: 'Audio&Pro XP-1500', model: 'XP-1500', image: imgXp1500, gallery: [imgXp1500Alt], category: 'Amplifiers', subCategory: 'Power Amplifier', power: { max: '1500W', output: '1500W' }, featured: true }),
  makeProduct({ id: 'xp-1500-booster', name: 'Audio&Pro XP-1500 Booster', model: 'XP-1500 Booster', image: imgXp1500Alt, category: 'Amplifiers', subCategory: 'Power Amplifier', power: { max: '1500W', output: '1500W' } }),
];

export const getProductBySlug = (slug: string): Product | undefined => products.find((p) => p.slug === slug);
export const getRelatedProducts = (product: Product, count = 4): Product[] => products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, count);
export const getFeaturedProducts = (): Product[] => products.filter((p) => p.featured);
export const getProductsByCategory = (category: ProductCategory): Product[] => products.filter((p) => p.category === category);
export const getProductsBySubCategory = (subCategory: ProductType): Product[] => products.filter((p) => p.subCategory === subCategory);
export type { ProductCategory as Category, ProductType as Type };