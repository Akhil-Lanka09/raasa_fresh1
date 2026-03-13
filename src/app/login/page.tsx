'use client';
// src/app/login/page.tsx
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';

function PwdStrengthBar({ value }: { value: string }) {
  if (!value) return null;
  const cls = value.length < 4 ? 'pwd-weak' : value.length < 8 ? 'pwd-medium' : 'pwd-strong';
  return <div className={`pwd-strength ${cls}`} />;
}

export default function LoginPage() {
  const { login, signup, signInWithGoogle } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const redirectTo = params.get('redirectTo') ?? '/';   // ← redirect to home after login

  const [tab, setTab]   = useState<'login' | 'signup'>('login');
  const [alert, setAlert] = useState<{ type: 'error' | 'success'; msg: string } | null>(null);

  // Login fields
  const [liEmail, setLiEmail] = useState('');
  const [liPass,  setLiPass]  = useState('');
  const [liErrors, setLiErrors] = useState<Record<string, string>>({});

  // Signup fields
  const [suFirst, setSuFirst] = useState('');
  const [suLast,  setSuLast]  = useState('');
  const [suEmail, setSuEmail] = useState('');
  const [suPhone, setSuPhone] = useState('');
  const [suPass,  setSuPass]  = useState('');
  const [suErrors, setSuErrors] = useState<Record<string, string>>({});

  async function handleLogin() {
    const errs: Record<string, string> = {};
    if (!liEmail || !liEmail.includes('@')) errs.email = 'Enter a valid email.';
    if (!liPass) errs.pass = 'Password cannot be empty.';
    setLiErrors(errs);
    setAlert(null);
    if (Object.keys(errs).length) return;

    const err = await login({ email: liEmail.toLowerCase(), password: liPass });
    if (err) {
      setAlert({ type: 'error', msg: err });
    } else {
      setAlert({ type: 'success', msg: `Welcome back! 👋` });
      setTimeout(() => router.push(redirectTo), 800);
    }
  }

  async function handleSignup() {
    const errs: Record<string, string> = {};
    if (!suFirst.trim()) errs.first = 'First name is required.';
    if (!suEmail || !suEmail.includes('@')) errs.email = 'Enter a valid email.';
    if (suPass.length < 6) errs.pass = 'Password must be at least 6 characters.';
    setSuErrors(errs);
    setAlert(null);
    if (Object.keys(errs).length) return;

    const err = await signup({
      firstName: suFirst.trim(), lastName: suLast.trim(),
      email: suEmail.toLowerCase(), phone: suPhone.trim(), password: suPass,
    });
    if (err) {
      setAlert({ type: 'error', msg: err });
    } else {
      setAlert({ type: 'success', msg: `Account created! Welcome, ${suFirst} 🎉` });
      setTimeout(() => router.push(redirectTo), 900);
    }
  }

  async function handleGoogleSignIn() {
    setAlert(null);
    const err = await signInWithGoogle();
    if (err) {
      setAlert({ type: 'error', msg: err });
    } else {
      setAlert({ type: 'success', msg: 'Welcome! 🎉' });
      setTimeout(() => router.push(redirectTo), 800);
    }
  }

  return (
    <div className="page-content">
      <div className="auth-shell">
        {/* Decorative left panel */}
        <div className="auth-deco">
          <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
            <div className="auth-deco-title">
              Farm-fresh<br />to your <em>doorstep.</em>
            </div>
            <div className="auth-deco-sub">
              Create your Raasa Harvest account to save your details,
              track orders, and reorder with one tap.
            </div>
            <div className="auth-deco-badge">
              {[
                '🌾  Premium rice varieties, direct from farm',
                '📦  Curated fruit & veg boxes weekly',
                '🚚  Doorstep delivery across Hyderabad',
                '💬  Simple WhatsApp ordering',
              ].map(pill => (
                <div key={pill} className="auth-deco-pill">{pill}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Form panel */}
        <div className="auth-panel">
          <div className="auth-form-wrap">
            <div className="auth-logo-mini">Raasa <span>Harvest</span></div>

            <div className="auth-tabs">
              <button
                className={`auth-tab-btn${tab === 'login' ? ' active' : ''}`}
                onClick={() => { setTab('login'); setAlert(null); }}
              >Sign In</button>
              <button
                className={`auth-tab-btn${tab === 'signup' ? ' active' : ''}`}
                onClick={() => { setTab('signup'); setAlert(null); }}
              >Create Account</button>
            </div>

            {alert && (
              <div className={`auth-alert ${alert.type}`}>{alert.msg}</div>
            )}

            {/* ── LOGIN ── */}
            {tab === 'login' && (
              <>
                <div className="auth-title">Welcome back</div>
                <div className="auth-sub">
                  Don&apos;t have an account?{' '}
                  <a onClick={() => setTab('signup')}>Create one →</a>
                </div>

                <div className="field-group">
                  <label className="field-label">Email Address</label>
                  <input
                    className={`field-input${liErrors.email ? ' error' : ''}`}
                    type="email" placeholder="you@example.com"
                    value={liEmail} onChange={e => setLiEmail(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleLogin()}
                  />
                  {liErrors.email && <div className="field-error show">{liErrors.email}</div>}
                </div>
                <div className="field-group">
                  <label className="field-label">Password</label>
                  <input
                    className={`field-input${liErrors.pass ? ' error' : ''}`}
                    type="password" placeholder="Your password"
                    value={liPass} onChange={e => setLiPass(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleLogin()}
                  />
                  {liErrors.pass && <div className="field-error show">{liErrors.pass}</div>}
                </div>

                <button className="btn-google" onClick={handleGoogleSignIn}>
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </button>

                <div className="auth-divider"><span>or</span></div>

                <button className="btn-auth" onClick={handleLogin}>Sign In →</button>
              </>
            )}

            {/* ── SIGNUP ── */}
            {tab === 'signup' && (
              <>
                <div className="auth-title">Create account</div>
                <div className="auth-sub">
                  Already have one?{' '}
                  <a onClick={() => setTab('login')}>Sign in →</a>
                </div>

                <div className="field-row">
                  <div className="field-group">
                    <label className="field-label">First Name</label>
                    <input
                      className={`field-input${suErrors.first ? ' error' : ''}`}
                      type="text" placeholder="Priya"
                      value={suFirst} onChange={e => setSuFirst(e.target.value)}
                    />
                    {suErrors.first && <div className="field-error show">{suErrors.first}</div>}
                  </div>
                  <div className="field-group">
                    <label className="field-label">Last Name</label>
                    <input
                      className="field-input" type="text" placeholder="Sharma"
                      value={suLast} onChange={e => setSuLast(e.target.value)}
                    />
                  </div>
                </div>

                <div className="field-group">
                  <label className="field-label">Email Address</label>
                  <input
                    className={`field-input${suErrors.email ? ' error' : ''}`}
                    type="email" placeholder="you@example.com"
                    value={suEmail} onChange={e => setSuEmail(e.target.value)}
                  />
                  {suErrors.email && <div className="field-error show">{suErrors.email}</div>}
                </div>

                <div className="field-group">
                  <label className="field-label">Phone / WhatsApp</label>
                  <input
                    className="field-input" type="tel" placeholder="+91 98765 43210"
                    value={suPhone} onChange={e => setSuPhone(e.target.value)}
                  />
                  <div className="field-hint">We&apos;ll use this for order updates on WhatsApp.</div>
                </div>

                <div className="field-group">
                  <label className="field-label">Password</label>
                  <input
                    className={`field-input${suErrors.pass ? ' error' : ''}`}
                    type="password" placeholder="Min. 6 characters"
                    value={suPass} onChange={e => setSuPass(e.target.value)}
                  />
                  <PwdStrengthBar value={suPass} />
                  {suErrors.pass && <div className="field-error show">{suErrors.pass}</div>}
                </div>

                <button className="btn-auth" onClick={handleSignup}>Create Account →</button>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
