'use client';
// src/app/veg/page.tsx
import { useState } from 'react';
import Footer from '@/components/Footer';

const WA_NUMBER = '918217729818';

const vegTags = [
  '🍅 Tomatoes', '🧅 Onions', '🥔 Potatoes', '🌶️ Chillies', '🥬 Spinach',
  '🥦 Broccoli', '🍆 Brinjal', '🥕 Carrots', '🌿 Coriander', '🍋 Lemon',
  '🧄 Garlic', '🫚 Curry Leaves',
];

export default function VegBoxesPage() {
  const [email, setEmail]       = useState('');
  const [notified, setNotified] = useState(false);

  function handleNotify() {
    if (!email || !email.includes('@')) {
      const el = document.getElementById('csEmailInput') as HTMLInputElement | null;
      if (el) { el.style.borderColor = '#c01818'; setTimeout(() => { el.style.borderColor = ''; }, 2000); }
      return;
    }
    const msg = `Hi Raasa Harvest! 👋\n\nPlease notify me when your Veg Box subscription launches!\n\n📧 Email: ${email}`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
    setEmail('');
    setNotified(true);
    setTimeout(() => setNotified(false), 3000);
  }

  return (
    <div className="page-content">
      <div className="hero veg">
        <div className="hero-deco">🥦</div>
        <div className="hero-rule" style={{ background: 'var(--sage)' }}></div>
        <div className="hero-eyebrow">Weekly Subscription — Fresh Vegetables</div>
        <div className="hero-title">Garden-fresh,<br /><em>every week.</em></div>
        <div className="hero-sub">
          Curated vegetable boxes coming soon. Farm-fresh seasonal produce
          delivered weekly to your doorstep.
        </div>
      </div>

      <div className="coming-soon-wrap">
        <div className="cs-veg-icon">🥦</div>
        <div className="cs-badge"><span>●</span>Coming Soon</div>
        <h2 className="cs-title">Fresh Veg Boxes<br /><em>launching soon</em></h2>
        <p className="cs-sub">
          We&apos;re curating the perfect weekly vegetable subscription for Hyderabad homes.
          Farm-direct, seasonal, and fairly priced. Get notified when we launch.
        </p>
        <div className="cs-veglist">
          {vegTags.map(tag => (
            <span key={tag} className="cs-vegtag">{tag}</span>
          ))}
        </div>
        <div className="cs-notify">
          <input
            id="csEmailInput"
            type="email"
            placeholder={notified ? "✓ We'll notify you!" : 'Enter your email to get notified'}
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleNotify()}
          />
          <button onClick={handleNotify}>Notify Me</button>
        </div>
        <div className="cs-hint">We&apos;ll send you a WhatsApp message when we launch.</div>
      </div>

      <Footer />
    </div>
  );
}
