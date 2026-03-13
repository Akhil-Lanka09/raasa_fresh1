'use client';
// src/app/page.tsx
import Link from 'next/link';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="page-content">
      {/* Hero */}
      <div className="hero home">
        <div className="hero-deco">🌾</div>
        <div className="hero-rule"></div>
        <div className="hero-eyebrow">Hyderabad's Farm-Fresh Delivery</div>
        <div className="hero-title">
          From the farm,<br />to your <em>table.</em>
        </div>
        <div className="hero-sub">
          Premium rice, curated fruit boxes and seasonal vegetables — sourced directly
          from farms and delivered to your doorstep across Hyderabad.
        </div>
        <div className="hero-pill">
          <div className="hero-pill-line"></div>
          Farm Direct · No Middlemen · Weekly Delivery
        </div>
      </div>

      {/* Philosophy */}
      <div style={{ padding: '60px 5vw 10px', maxWidth: 720 }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--tl)', marginBottom: 16 }}>Our Philosophy</div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 600, color: 'var(--burg)', lineHeight: 1.2, marginBottom: 20 }}>
          We believe food tastes better<br /><em style={{ color: 'var(--saffron)', fontStyle: 'italic' }}>when you know where it came from.</em>
        </div>
        <div style={{ fontSize: '0.95rem', color: 'var(--tm)', fontWeight: 300, lineHeight: 1.85, maxWidth: 580 }}>
          Raasa Harvest was started with a simple idea — connect Hyderabad families
          directly with farmers. No cold storage, no artificial ripening, no extra
          handling. Just fresh produce, honest prices, and a WhatsApp message away.
        </div>
      </div>

      {/* Feature cards */}
      <div className="grid-container" style={{ paddingTop: 40 }}>
        {[
          { icon: '🌾', title: 'Premium Rice', desc: 'Six hand-selected varieties from AP, Punjab & Kerala. Sona Masoori, Basmati, Black Rice and more — direct from farms in bulk packs.', cta: 'Shop Rice →', href: '/rice', bar: 'var(--fern)' },
          { icon: '🍎', title: 'Seasonal Fruit Boxes', desc: 'Three curated box sizes with 11–13 seasonal fruits. Banana & Apple guaranteed every week, plus whatever is sweetest at the mandi.', cta: 'Shop Fruit Boxes →', href: '/fruit', bar: 'var(--saffron)' },
          { icon: '🥦', title: 'Veg Boxes', desc: 'Coming soon — weekly curated vegetable boxes with your everyday staples, farm-fresh and ready for your kitchen.', cta: 'Coming Soon', href: '/veg', bar: 'var(--sage)' },
        ].map((card) => (
          <div key={card.href} className="rc" style={{ cursor: 'pointer' }}>
            <div className="rc-bar" style={{ background: card.bar }}></div>
            <div className="rc-body" style={{ padding: '28px 24px 32px' }}>
              <div style={{ fontSize: '3rem', marginBottom: 16 }}>{card.icon}</div>
              <div className="rc-name">{card.title}</div>
              <div className="rc-desc">{card.desc}</div>
            </div>
            <div className="card-actions">
              <Link href={card.href} className="btn-cart btn-buy" style={{ flex: 1, textDecoration: 'none' }}>
                {card.cta}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* CTA strip */}
      <div style={{ background: 'var(--burg)', padding: '48px 5vw', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 24, justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.7rem', fontWeight: 600, color: 'var(--saff3)', marginBottom: 6 }}>
            Ready to taste the difference?
          </div>
          <div style={{ color: 'rgba(245,217,138,.5)', fontSize: '0.88rem', fontWeight: 300 }}>
            Order via WhatsApp or add items to your cart and check out.
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/rice"    className="btn-primary"   style={{ textDecoration: 'none' }}>Shop Rice →</Link>
          <Link href="/fruit"   className="btn-secondary" style={{ textDecoration: 'none' }}>Fruit Boxes →</Link>
          <Link href="/contact" className="btn-tertiary"  style={{ textDecoration: 'none' }}>Contact Us →</Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
