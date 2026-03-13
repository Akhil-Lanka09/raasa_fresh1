'use client';
// src/context/CartContext.tsx
import { createContext, useContext, useReducer, ReactNode } from 'react';

const WA_NUMBER = '918217729818';

export interface CartItem {
  id: string;
  name: string;
  sku?: string;
  priceNum: number;
  priceDisplay: string;
  qty: number;
}

type Action =
  | { type: 'ADD';    item: Omit<CartItem, 'qty'> }
  | { type: 'REMOVE'; id: string }
  | { type: 'CHANGE_QTY'; id: string; delta: number }
  | { type: 'CLEAR' };

function reducer(state: CartItem[], action: Action): CartItem[] {
  switch (action.type) {
    case 'ADD': {
      const existing = state.find(i => i.id === action.item.id);
      if (existing) return state.map(i => i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i);
      return [...state, { ...action.item, qty: 1 }];
    }
    case 'REMOVE':
      return state.filter(i => i.id !== action.id);
    case 'CHANGE_QTY':
      return state
        .map(i => i.id === action.id ? { ...i, qty: i.qty + action.delta } : i)
        .filter(i => i.qty > 0);
    case 'CLEAR':
      return [];
  }
}

interface CartContextValue {
  cart: CartItem[];
  totalCount: number;
  totalPrice: number;
  addToCart:    (item: Omit<CartItem, 'qty'>) => void;
  removeFromCart:(id: string) => void;
  changeQty:    (id: string, delta: number) => void;
  clearCart:    () => void;
  checkoutCart: () => void;
  buyNow:       (item: { name: string; priceDisplay: string }) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, dispatch] = useReducer(reducer, []);

  const totalCount = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce((s, i) => s + i.priceNum * i.qty, 0);

  function checkoutCart() {
    if (cart.length === 0) return;
    const lines = cart.map(i =>
      `• ${i.name}${i.sku ? ` [${i.sku}]` : ''} × ${i.qty} — ${i.priceDisplay}`
    ).join('\n');
    const total = totalPrice > 0
      ? `\n\n*Estimated Total: ₹${totalPrice.toLocaleString('en-IN')}*`
      : '';
    const msg = `Hi Raasa Harvest! 👋\n\nI'd like to order:\n${lines}${total}`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  }

  function buyNow(item: { name: string; priceDisplay: string }) {
    const msg = `Hi Raasa Harvest! 👋\n\nI'd like to order:\n• ${item.name} — ${item.priceDisplay}`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  }

  return (
    <CartContext.Provider value={{
      cart,
      totalCount,
      totalPrice,
      addToCart:     (item) => dispatch({ type: 'ADD', item }),
      removeFromCart:(id)   => dispatch({ type: 'REMOVE', id }),
      changeQty:     (id, delta) => dispatch({ type: 'CHANGE_QTY', id, delta }),
      clearCart:     ()    => dispatch({ type: 'CLEAR' }),
      checkoutCart,
      buyNow,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be inside CartProvider');
  return ctx;
}
