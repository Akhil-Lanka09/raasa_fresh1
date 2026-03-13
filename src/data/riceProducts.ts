// src/data/riceProducts.ts
export interface RiceSize {
  label: string;
  sku: string;
  price: string;
  priceNum: number;
  cls: string;
}

export interface RiceProduct {
  id: string;
  name: string;
  variety: string;
  badge: { label: string; cls: string } | null;
  barCls: string;
  dotCls: string;
  origin: string;
  img: string;           // path for <img src> or Next Image
  imgCls: string;
  desc: string;
  sizes: RiceSize[];
}

export const riceProducts: RiceProduct[] = [
  {
    id: 'sona-masoori',
    name: 'Sona Masoori',
    variety: 'Everyday Staple · AP Origin',
    badge: { label: '⭐ Best Seller', cls: 'g' },
    barCls: 'g',
    dotCls: 'g',
    origin: 'Andhra Pradesh',
    img: '/images/sona-masoori.jpg',
    imgCls: '',
    desc: 'Lightweight, aromatic medium-grain rice. Perfect for everyday cooking, biryani & rice dishes. Available in bulk 26 kg family pack.',
    sizes: [
      { label: '26 kg (Bulk Pack)', sku: 'RICE-SM-26K', price: '₹1,430', priceNum: 1430, cls: 'g' },
    ],
  },
  {
    id: 'hmt-rice',
    name: 'HMT Quality Rice',
    variety: 'Everyday Staple · AP Origin',
    badge: null,
    barCls: 'g',
    dotCls: 'g',
    origin: 'Andhra Pradesh',
    img: '/images/hmt-rice.jpg',
    imgCls: '',
    desc: 'Medium grain, fluffy texture when cooked. A popular choice for daily meals and variety rice. Available in bulk 26 kg family pack.',
    sizes: [
      { label: '26 kg (Bulk Pack)', sku: 'RICE-HMT-26K', price: '₹1,378', priceNum: 1378, cls: 'g' },
    ],
  },
  {
    id: 'basmati',
    name: 'Basmati Rice',
    variety: 'Premium Long-Grain · Punjab Origin',
    badge: { label: '✨ Premium', cls: 'gold' },
    barCls: 'gold',
    dotCls: 'gold',
    origin: 'Punjab',
    img: '/images/basmati-rice.jpg',
    imgCls: 'pack',
    desc: 'Extra-long aged basmati with signature fragrance. Perfect for biryani, pulao & festive dishes. Multiple pack sizes available.',
    sizes: [
      { label: '1 kg',  sku: 'RICE-BAS-1K',  price: '₹95',   priceNum: 95,  cls: 'gold' },
      { label: '5 kg',  sku: 'RICE-BAS-5K',  price: '₹445',  priceNum: 445, cls: 'gold' },
      { label: '10 kg', sku: 'RICE-BAS-10K', price: '₹850',  priceNum: 850, cls: 'gold' },
    ],
  },
  {
    id: 'brown-rice',
    name: 'Brown Rice',
    variety: 'Health & Wellness · Whole Grain',
    badge: { label: '🌿 Healthy', cls: 'hlth' },
    barCls: 'brn',
    dotCls: 'brn',
    origin: 'Andhra Pradesh',
    img: '/images/brown-rice.jpg',
    imgCls: '',
    desc: 'Whole grain rice with bran layer intact. High in fibre, minerals and vitamins. Nutty flavour and chewy texture. Multiple pack sizes.',
    sizes: [
      { label: '1 kg',  sku: 'RICE-BR-1K',  price: '₹90',  priceNum: 90,  cls: 'brn' },
      { label: '5 kg',  sku: 'RICE-BR-5K',  price: '₹420', priceNum: 420, cls: 'brn' },
      { label: '10 kg', sku: 'RICE-BR-10K', price: '₹840', priceNum: 840, cls: 'brn' },
    ],
  },
  {
    id: 'black-rice',
    name: 'Black Rice',
    variety: 'Exotic & Rare · North-East India',
    badge: { label: '🖤 Rare', cls: 'rare' },
    barCls: 'blk',
    dotCls: 'blk',
    origin: 'Manipur / North-East',
    img: '/images/black-rice.jpg',
    imgCls: '',
    desc: 'Also known as Forbidden Rice. Rich in anthocyanins & antioxidants. Stunning deep purple colour when cooked. Exceptional nutritional profile.',
    sizes: [
      { label: '1 kg',  sku: 'RICE-BLK-1K',  price: '₹130',   priceNum: 130,  cls: 'blk' },
      { label: '5 kg',  sku: 'RICE-BLK-5K',  price: '₹600',   priceNum: 600,  cls: 'blk' },
      { label: '10 kg', sku: 'RICE-BLK-10K', price: '₹1,200', priceNum: 1200, cls: 'blk' },
    ],
  },
  {
    id: 'red-rice',
    name: 'Red Rice',
    variety: 'High Fibre · Kerala Origin',
    badge: { label: '❤️ High Fibre', cls: 'fibre' },
    barCls: 'red',
    dotCls: 'red',
    origin: 'Kerala / Tamil Nadu',
    img: '/images/red-rice.jpg',
    imgCls: '',
    desc: 'Kerala matta rice with rich earthy flavour. High in iron and fibre. Traditional South Indian staple, excellent with curries and kanji.',
    sizes: [
      { label: '1 kg',  sku: 'RICE-RED-1K',  price: '₹100', priceNum: 100, cls: 'red' },
      { label: '5 kg',  sku: 'RICE-RED-5K',  price: '₹460', priceNum: 460, cls: 'red' },
      { label: '10 kg', sku: 'RICE-RED-10K', price: '₹940', priceNum: 940, cls: 'red' },
    ],
  },
];
