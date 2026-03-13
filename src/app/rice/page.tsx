'use client';
// src/app/rice/page.tsx
import { useState, useEffect, useRef } from 'react';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { riceProducts, RiceProduct } from '@/data/riceProducts';

function RiceCard({ product }: { product: RiceProduct }) {
  const { addToCart, buyNow } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    cardRef.current.classList.remove('anim');
    void cardRef.current.offsetWidth;
    cardRef.current.classList.add('anim');
  }, []);

  const size = product.sizes[selectedSize];

  function handleAddToCart() {
    addToCart({
      id:           size.sku || product.id,
      name:         product.sizes.length > 1 ? `${product.name} (${size.label})` : product.name,
      sku:          size.sku,
      priceNum:     size.priceNum,
      priceDisplay: size.price,
    });
    setAddedId(size.sku);
    setTimeout(() => setAddedId(null), 1800);
  }

  function handleBuyNow() {
    buyNow({
      name:         product.sizes.length > 1 ? `${product.name} (${size.label})` : product.name,
      priceDisplay: size.price,
    });
  }

  return (
    <div className="rc" ref={cardRef}>
      <div className={`rc-bar ${product.barCls}`}></div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={product.img} alt={product.name} className={`rc-img ${product.imgCls}`} />

      <div className="rc-tagrow">
        <div className="rc-variety">{product.variety}</div>
        {product.badge
          ? <span className={`badge ${product.badge.cls}`}>{product.badge.label}</span>
          : <span className="badge hide">–</span>
        }
      </div>

      <div className="rc-body">
        <div className="rc-name">{product.name}</div>
        <div className="rc-desc">{product.desc}</div>
        <div className="rc-origin">
          <div className={`dot ${product.dotCls}`}></div>
          {product.origin}
        </div>

        <div className="rc-sizes">
          {product.sizes.map((s, i) => (
            <div
              key={s.sku}
              className={`sr ${s.cls}`}
              onClick={() => setSelectedSize(i)}
              style={{
                cursor: product.sizes.length > 1 ? 'pointer' : 'default',
                outline: selectedSize === i && product.sizes.length > 1 ? '2px solid var(--saffron)' : 'none',
                outlineOffset: 2,
              }}
            >
              <div>
                <div className="sr-lbl">{s.label}</div>
                <div className="sr-cod">{s.sku}</div>
              </div>
              <div className={`sr-price ${s.cls}`}>{s.price}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card-actions">
        <button
          className="btn-cart btn-atc"
          onClick={handleAddToCart}
          style={addedId ? { background: 'var(--mintbg)', color: 'var(--fern)', borderColor: 'var(--mint)' } : {}}
        >
          {addedId ? '✓ Added!' : '🛒 Add to Cart'}
        </button>
        <button className="btn-cart btn-buy" onClick={handleBuyNow}>
          ⚡ Buy Now
        </button>
      </div>
    </div>
  );
}

export default function RicePage() {
  const everyday = riceProducts.filter(p => ['sona-masoori', 'hmt-rice'].includes(p.id));
  const premium  = riceProducts.filter(p => !['sona-masoori', 'hmt-rice'].includes(p.id));

  return (
    <div className="page-content">
      <div className="hero rice">
        <div className="hero-deco">🌾</div>
        <div className="hero-rule"></div>
        <div className="hero-eyebrow">Our Grain Collection</div>
        <div className="hero-title">Rice, the <em>way</em><br />it should be.</div>
        <div className="hero-sub">
          Sourced directly from farms in Andhra Pradesh, Punjab & Kerala.
          Every grain hand-selected for quality and freshness.
        </div>
        <div className="hero-pill">
          <div className="hero-pill-line"></div>
          6 Varieties · Farm Direct · Bulk & Retail Packs
        </div>
      </div>

      <div className="sec-meta">
        <div className="sec-label">6 Varieties Available</div>
        <div className="sec-note">Prices valid this season · Bulk discounts on request</div>
      </div>

      <div className="grid-half">
        {everyday.map(p => <RiceCard key={p.id} product={p} />)}
      </div>

      <div style={{ padding: '0 5vw 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ flex: 1, height: 1, background: 'rgba(59,13,13,.08)' }}></div>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--tl)', whiteSpace: 'nowrap' }}>Premium &amp; Specialty</div>
        <div style={{ flex: 1, height: 1, background: 'rgba(59,13,13,.08)' }}></div>
      </div>

      <div className="grid-container">
        {premium.map(p => <RiceCard key={p.id} product={p} />)}
      </div>

      <Footer />
    </div>
  );
}
