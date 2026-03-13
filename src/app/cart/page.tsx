'use client';
// src/app/cart/page.tsx
import Link from 'next/link';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { cart, totalCount, totalPrice, changeQty, removeFromCart, clearCart, checkoutCart } = useCart();

  return (
    <div className="page-content">
      {/* Hero */}
      <div className="hero contact" style={{ minHeight: 200 }}>
        <div className="hero-deco">🛒</div>
        <div className="hero-rule" style={{ background: 'var(--saffron)' }}></div>
        <div className="hero-eyebrow">Your Order</div>
        <div className="hero-title">Your <em>cart</em></div>
        <div className="hero-sub">Review your items and checkout via WhatsApp.</div>
      </div>

      {totalCount === 0 ? (
        <div className="cart-empty">
          <div className="cart-empty-icon">🛒</div>
          <div className="cart-empty-title">Your cart is empty</div>
          <div className="cart-empty-sub">Add some items from Rice or Fruit Boxes to get started.</div>
          <Link href="/rice" className="btn-primary" style={{ textDecoration: 'none' }}>Shop Rice →</Link>
        </div>
      ) : (
        <div className="cart-shell">
          {/* Items list */}
          <div className="cart-main">
            <div className="cart-section-title">
              🛒 Items
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', color: 'var(--tl)', fontWeight: 400 }}>
                ({totalCount} item{totalCount !== 1 ? 's' : ''})
              </span>
            </div>

            {cart.map(item => (
              <div className="cart-item" key={item.id}>
                <div>
                  <div className="ci-name">{item.name}</div>
                  {item.sku && <div className="ci-sku">{item.sku}</div>}
                </div>
                <div className="ci-price">{item.priceDisplay}</div>
                <div className="ci-qty">
                  <button onClick={() => changeQty(item.id, -1)}>−</button>
                  <span>{item.qty}</span>
                  <button onClick={() => changeQty(item.id, +1)}>+</button>
                </div>
                <button className="ci-remove" onClick={() => removeFromCart(item.id)} title="Remove">✕</button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="cart-summary">
            <div className="cart-section-title">Order Summary</div>

            {cart.map(item => (
              <div className="summ-row" key={item.id}>
                <span>{item.name} × {item.qty}</span>
                <span>
                  {item.priceNum > 0
                    ? '₹' + (item.priceNum * item.qty).toLocaleString('en-IN')
                    : item.priceDisplay}
                </span>
              </div>
            ))}

            <div className="summ-row total">
              <span>Estimated Total</span>
              <span>
                {totalPrice > 0 ? '₹' + totalPrice.toLocaleString('en-IN') : 'As quoted'}
              </span>
            </div>

            <div className="summ-note">
              Final price may vary based on availability & delivery area.
              Confirmed on WhatsApp before dispatch.
            </div>

            <button className="btn-checkout" onClick={checkoutCart}>
              📱 Checkout via WhatsApp
            </button>

            <button className="summ-clear" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
