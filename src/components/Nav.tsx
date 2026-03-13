'use client';
// src/components/Nav.tsx
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

const TABS = [
  { href: '/',        label: '🏡\u00a0 Home' },
  { href: '/rice',    label: '🌾\u00a0 Rice' },
  { href: '/veg',     label: '🥦\u00a0 Veg Boxes' },
  { href: '/fruit',   label: '🍎\u00a0 Fruit Boxes' },
  { href: '/contact', label: '📞\u00a0 Order / Contact' },
];

export default function Nav() {
  const pathname = usePathname();
  const { totalCount } = useCart();
  const { user, initials, displayName } = useAuth();

  return (
    <nav className="nav">
      <div className="nav-logo">
        <div className="nav-logo-main">Raasa Harvest</div>
        <div className="nav-logo-sub">Farm · Fresh · Delivered</div>
      </div>

      <div className="nav-tabs">
        {TABS.map(tab => (
          <Link
            key={tab.href}
            href={tab.href}
            className={`nav-tab${pathname === tab.href ? ' active' : ''}`}
          >
            {tab.label}
          </Link>
        ))}

        <Link
          href="/cart"
          className={`nav-tab${pathname === '/cart' ? ' active' : ''}`}
        >
          🛒&nbsp; Cart
          {totalCount > 0 && (
            <span className="nav-cart-count">{totalCount}</span>
          )}
        </Link>

        {user ? (
          <Link
            href="/profile"
            className={`nav-tab${pathname === '/profile' ? ' active' : ''}`}
          >
            👤&nbsp; My Profile
          </Link>
        ) : (
          <Link
            href="/login"
            className={`nav-tab${pathname === '/login' ? ' active' : ''}`}
            style={{ border: '1px solid rgba(245,217,138,.2)' }}
          >
            👤&nbsp; Sign In
          </Link>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginLeft: 'auto', paddingLeft: 14 }}>
        <div className="nav-tagline">The taste of the harvest</div>
        {user && (
          <Link href="/profile" className="nav-user-pill">
            <div className="nav-user-avatar">{initials}</div>
            <span className="nav-user-name">{displayName}</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
