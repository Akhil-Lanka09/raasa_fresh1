'use client';
// src/components/FloatingCartBadge.tsx
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function FloatingCartBadge() {
  const { totalCount } = useCart();
  const pathname = usePathname();

  if (totalCount === 0 || pathname === '/cart') return null;

  return (
    <Link
      href="/cart"
      style={{
        position: 'fixed', bottom: 28, right: 28, zIndex: 999,
        background: 'var(--saffron)', color: 'var(--burg)',
        padding: '13px 20px', borderRadius: 40,
        fontFamily: "'Jost', sans-serif", fontWeight: 600,
        fontSize: '0.82rem', letterSpacing: '0.5px',
        boxShadow: '0 6px 24px rgba(59,13,13,.3)', cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: 10,
        animation: 'fadeUp .3s ease',
        textDecoration: 'none',
      }}
    >
      🛒 {totalCount} item{totalCount !== 1 ? 's' : ''} —{' '}
      <span style={{ textDecoration: 'underline' }}>View Cart</span>
    </Link>
  );
}
