'use client';
// src/app/fruit/page.tsx
import { useState } from 'react';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { fruitBoxes, FruitBox } from '@/data/fruitBoxes';

function FruitBoxCard({ box }: { box: FruitBox }) {
  const { addToCart, buyNow } = useCart();
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    addToCart({
      id:           box.id,
      name:         `Fruit ${box.name}`,
      sku:          box.id,
      priceNum:     box.priceNum,
      priceDisplay: box.price,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  function handleBuyNow() {
    buyNow({ name: `Fruit ${box.name}`, priceDisplay: `${box.price}/week` });
  }

  return (
    <div className="bc">
      <div className={`bc-head ${box.headCls}`}>
        <div className="bc-left">
          <div className="bc-eye">{box.eyebrow}</div>
          <div className="bc-name">{box.name}</div>
          <div className="bc-sub">{box.sub}</div>
        </div>
        <div className="bc-price">
          <span className="p">{box.price}</span>
          <span className="pw">per week</span>
        </div>
      </div>

      <div className="bc-body">
        <div className="bc-guarantee">
          🌟&nbsp;<span><strong>Always included:</strong> Banana + Apple every week</span>
        </div>
        <div className="items-lbl">What&apos;s Inside</div>
        {box.items.map((item) => (
          <div className="ir" key={item.name}>
            <span className="ir-n">{item.emoji} {item.name}</span>
            <span className={`ir-q ${item.qCls}`}>{item.qty}</span>
          </div>
        ))}
      </div>

      <div className="bc-actions">
        <button
          className="btn-atc-bc"
          onClick={handleAddToCart}
          style={added ? { background: 'var(--mintbg)', color: 'var(--fern)' } : {}}
        >
          {added ? '✓ Added!' : '🛒 Add to Cart'}
        </button>
        <button className="btn-buy-bc" onClick={handleBuyNow}>⚡ Buy Now</button>
      </div>

      <div className={`bc-foot ${box.footCls}`}>
        <div className="bc-code">{box.id}</div>
        <div className={`bc-badge ${box.badgeCls}`}>{box.badgeLabel}</div>
      </div>
    </div>
  );
}

export default function FruitBoxesPage() {
  return (
    <div className="page-content">
      <div className="hero fruit">
        <div className="hero-deco">🍎</div>
        <div className="hero-rule" style={{ background: 'var(--saff2)' }}></div>
        <div className="hero-eyebrow">Weekly Subscription — Seasonal Fruits</div>
        <div className="hero-title">Nature&apos;s <em>sweetest,</em><br />hand-picked for you.</div>
        <div className="hero-sub">
          Seasonal fruits curated weekly based on what&apos;s freshest at Hyderabad mandi.
          Banana & Apple guaranteed every week.
        </div>
      </div>

      <div className="sec-meta">
        <div className="sec-label">3 Box Sizes · Feb–Mar Season</div>
        <div className="sec-note">🍓 Strawberry & Grapes available Dec–Mar only</div>
      </div>

      <div className="grid-container">
        {fruitBoxes.map(box => <FruitBoxCard key={box.id} box={box} />)}
      </div>

      <Footer />
    </div>
  );
}
