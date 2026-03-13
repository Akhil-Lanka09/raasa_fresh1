// src/data/fruitBoxes.ts
export interface FruitItem {
  emoji: string;
  name: string;
  qty: string;
  qCls: string;
}

export interface FruitBox {
  id: string;
  name: string;
  eyebrow: string;
  sub: string;
  price: string;
  priceNum: number;
  headCls: string;
  footCls: string;
  badgeCls: string;
  badgeLabel: string;
  items: FruitItem[];
}

export const fruitBoxes: FruitBox[] = [
  {
    id: 'FRT-BOX-S',
    name: 'Box 1',
    eyebrow: 'Feb–Mar Season',
    sub: 'The Starter · 2 People · 11 fruits',
    price: '₹499',
    priceNum: 499,
    headCls: 'fs',
    footCls: 'fs',
    badgeCls: 'fs',
    badgeLabel: '🍓 Seasonal',
    items: [
      { emoji: '🍌', name: 'Banana',          qty: '10 pcs',  qCls: 'q-fs' },
      { emoji: '🍎', name: 'Apple (Simla)',    qty: '4 pcs',   qCls: 'q-fs' },
      { emoji: '🍇', name: 'Black Grapes',     qty: '500 gm',  qCls: 'q-fs' },
      { emoji: '🧡', name: 'Papaya',           qty: '1 kg',    qCls: 'q-fs' },
      { emoji: '🍈', name: 'Guava',            qty: '3 pcs',   qCls: 'q-fs' },
      { emoji: '❤️', name: 'Pomegranate',      qty: '3 pcs',   qCls: 'q-fs' },
      { emoji: '🍊', name: 'Mossambi',         qty: '4 pcs',   qCls: 'q-fs' },
      { emoji: '🍓', name: 'Strawberry',       qty: '150 gm',  qCls: 'q-fs' },
      { emoji: '🟤', name: 'Sapota (Chickoo)', qty: '4 pcs',   qCls: 'q-fs' },
      { emoji: '🍈', name: 'Muskmelon',        qty: '500 gm',  qCls: 'q-fs' },
      { emoji: '🟠', name: 'Orange',           qty: '3 pcs',   qCls: 'q-fs' },
    ],
  },
  {
    id: 'FRT-BOX-M',
    name: 'Box 2',
    eyebrow: 'Feb–Mar Season',
    sub: 'The Family · 3-4 People · 13 fruits',
    price: '₹749',
    priceNum: 749,
    headCls: 'fm',
    footCls: 'fm',
    badgeCls: 'fm',
    badgeLabel: '👨‍👩‍👧‍👦 Family',
    items: [
      { emoji: '🍌', name: 'Banana',          qty: '15 pcs',  qCls: 'q-fm' },
      { emoji: '🍎', name: 'Apple (Simla)',    qty: '6 pcs',   qCls: 'q-fm' },
      { emoji: '🍇', name: 'Black Grapes',     qty: '750 gm',  qCls: 'q-fm' },
      { emoji: '🧡', name: 'Papaya',           qty: '1.5 kg',  qCls: 'q-fm' },
      { emoji: '🍈', name: 'Guava',            qty: '5 pcs',   qCls: 'q-fm' },
      { emoji: '❤️', name: 'Pomegranate',      qty: '4 pcs',   qCls: 'q-fm' },
      { emoji: '🍊', name: 'Mossambi',         qty: '6 pcs',   qCls: 'q-fm' },
      { emoji: '🍓', name: 'Strawberry',       qty: '250 gm',  qCls: 'q-fm' },
      { emoji: '🟤', name: 'Sapota (Chickoo)', qty: '6 pcs',   qCls: 'q-fm' },
      { emoji: '🍈', name: 'Muskmelon',        qty: '750 gm',  qCls: 'q-fm' },
      { emoji: '🟠', name: 'Orange',           qty: '5 pcs',   qCls: 'q-fm' },
      { emoji: '🥭', name: 'Mango',            qty: '4 pcs',   qCls: 'q-fm' },
      { emoji: '🍍', name: 'Pineapple',        qty: '1 pc',    qCls: 'q-fm' },
    ],
  },
  {
    id: 'FRT-BOX-L',
    name: 'Box 3',
    eyebrow: 'Feb–Mar Season',
    sub: 'The Premium · 5-6 People · 13 fruits',
    price: '₹999',
    priceNum: 999,
    headCls: 'fl',
    footCls: 'fl',
    badgeCls: 'fl',
    badgeLabel: '👑 Premium',
    items: [
      { emoji: '🍌', name: 'Banana',          qty: '20 pcs',  qCls: 'q-fl' },
      { emoji: '🍎', name: 'Apple (Shimla)',   qty: '8 pcs',   qCls: 'q-fl' },
      { emoji: '🍇', name: 'Black Grapes',     qty: '1 kg',    qCls: 'q-fl' },
      { emoji: '🧡', name: 'Papaya',           qty: '2 kg',    qCls: 'q-fl' },
      { emoji: '🍈', name: 'Guava',            qty: '8 pcs',   qCls: 'q-fl' },
      { emoji: '❤️', name: 'Pomegranate',      qty: '6 pcs',   qCls: 'q-fl' },
      { emoji: '🍊', name: 'Mossambi',         qty: '8 pcs',   qCls: 'q-fl' },
      { emoji: '🍓', name: 'Strawberry',       qty: '400 gm',  qCls: 'q-fl' },
      { emoji: '🟤', name: 'Sapota (Chickoo)', qty: '8 pcs',   qCls: 'q-fl' },
      { emoji: '🍈', name: 'Muskmelon',        qty: '1 kg',    qCls: 'q-fl' },
      { emoji: '🟠', name: 'Orange',           qty: '8 pcs',   qCls: 'q-fl' },
      { emoji: '🥭', name: 'Mango (Alphonso)', qty: '6 pcs',   qCls: 'q-fl' },
      { emoji: '🍍', name: 'Pineapple',        qty: '2 pcs',   qCls: 'q-fl' },
    ],
  },
];
