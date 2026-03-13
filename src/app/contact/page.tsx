'use client';
// src/app/contact/page.tsx
import { useState } from 'react';
import Footer from '@/components/Footer';

const WA_NUMBER = '918217729818';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', interest: 'Rice', message: '' });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { name, interest, message } = form;
    let waText = `Hi Raasa Harvest! 👋\n\nMy name is *${name}*.\n\nI'm interested in: *${interest}*.`;
    if (message) waText += `\n\n*Additional Details:*\n${message}`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waText)}`, '_blank');
    setForm({ name: '', interest: 'Rice', message: '' });
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  }

  return (
    <div className="page-content">
      <div className="hero contact">
        <div className="hero-deco">📞</div>
        <div className="hero-rule" style={{ background: 'var(--saff3)' }}></div>
        <div className="hero-eyebrow">Get in Touch</div>
        <div className="hero-title">Order or <em>enquire</em><br />— we&apos;re on WhatsApp.</div>
        <div className="hero-sub">
          Tell us what you need and we&apos;ll get back to you promptly.
          Orders are confirmed via WhatsApp.
        </div>
        <div className="hero-pill">
          <div className="hero-pill-line" style={{ background: 'var(--saff3)' }}></div>
          Typically replies within 30 minutes
        </div>
      </div>

      <div style={{ padding: '48px 5vw 60px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40, alignItems: 'start' }}>
        {/* Form */}
        <div className="form-container">
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 600, color: 'var(--burg)', marginBottom: 24 }}>
            Send us a message
          </div>

          {sent && (
            <div style={{ padding: '11px 14px', background: '#eef7f2', border: '1px solid var(--mint)', color: 'var(--forest)', borderRadius: 4, marginBottom: 18, fontSize: '0.85rem' }}>
              ✅ Message opened in WhatsApp!
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Your Name</label>
              <input
                className="form-input"
                type="text"
                placeholder="Priya Sharma"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">I&apos;m Interested In</label>
              <select
                className="form-select"
                value={form.interest}
                onChange={e => setForm(f => ({ ...f, interest: e.target.value }))}
              >
                <option>Rice</option>
                <option>Fruit Boxes</option>
                <option>Veg Boxes (Coming Soon)</option>
                <option>All Products</option>
                <option>Bulk / Wholesale Enquiry</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Additional Details <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optional)</span></label>
              <textarea
                className="form-textarea"
                placeholder="Your delivery address, preferred quantities, any questions..."
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              />
            </div>
            <button type="submit" className="btn-primary btn-whatsapp">
              📱 Send via WhatsApp
            </button>
          </form>
        </div>

        {/* Info panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {[
            { icon: '📍', title: 'Delivery Area', desc: "We currently deliver across Hyderabad. Enter your area in the message and we'll confirm availability." },
            { icon: '🕐', title: 'Order Cutoff', desc: 'Orders placed by 8 PM are delivered the next morning. Weekend deliveries available.' },
            { icon: '💳', title: 'Payment', desc: 'We accept UPI (GPay, PhonePe, Paytm), bank transfer, and cash on delivery for regular customers.' },
            { icon: '📦', title: 'Packaging', desc: 'All produce is packed in eco-friendly bags and boxes. Rice comes in sealed bulk packs.' },
          ].map(item => (
            <div key={item.icon} style={{ display: 'flex', gap: 16, padding: '20px', background: 'var(--card)', border: '1px solid rgba(59,13,13,.08)', borderRadius: 4 }}>
              <div style={{ fontSize: '1.5rem', flexShrink: 0, marginTop: 2 }}>{item.icon}</div>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--burg)', marginBottom: 6, fontSize: '0.9rem' }}>{item.title}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--tm)', fontWeight: 300, lineHeight: 1.7 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
