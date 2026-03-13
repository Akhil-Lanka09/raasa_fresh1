'use client';
// src/app/profile/page.tsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';

interface SectionProps {
  title: string;
  icon: string;
  sectionKey: string;
  onSave: () => string | null;
  children: React.ReactNode;
  editContent: (args: { setEditing: (v: boolean) => void }) => React.ReactNode;
}

function ProfileSection({ title, icon, sectionKey, onSave, children, editContent }: SectionProps) {
  const [editing, setEditing] = useState(false);
  const [flash, setFlash]     = useState(false);

  function handleSave() {
    const err = onSave();
    if (err) return;
    setEditing(false);
    setFlash(true);
    setTimeout(() => setFlash(false), 1200);
  }

  return (
    <div
      className={`profile-section${editing ? ' editing' : ''}`}
      style={flash ? { outline: '2px solid var(--mint)', outlineOffset: 0 } : {}}
    >
      <div className="profile-section-head">
        <div className="profile-section-title">{icon} &nbsp; {title}</div>
        {editing
          ? <button className="btn-save-section" onClick={handleSave}>Save</button>
          : <button className="btn-edit-section" onClick={() => setEditing(true)}>
              {sectionKey === 'password' ? 'Change' : 'Edit'}
            </button>
        }
      </div>
      <div className="profile-section-body">
        <div className="pf-view">{children}</div>
        <div className="pf-edit">{editContent({ setEditing })}</div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const { user, initials, updateSection, logout, deleteAccount } = useAuth();
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName,  setLastName]  = useState('');
  const [email,     setEmail]     = useState('');
  const [phone,     setPhone]     = useState('');
  const [whatsapp,  setWhatsapp]  = useState('');
  const [address1,  setAddress1]  = useState('');
  const [area,      setArea]      = useState('');
  const [pincode,   setPincode]   = useState('');
  const [note,      setNote]      = useState('');

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName  || '');
      setEmail(user.email        || '');
      setPhone(user.phone        || '');
      setWhatsapp(user.whatsapp  || '');
      setAddress1(user.address1  || '');
      setArea(user.area          || '');
      setPincode(user.pincode    || '');
      setNote(user.note          || '');
    }
  }, [user]);

  const [curPwd,   setCurPwd]   = useState('');
  const [newPwd,   setNewPwd]   = useState('');
  const [pwdError, setPwdError] = useState('');

  if (!user) {
    return (
      <div className="page-content" style={{ padding: '80px 5vw', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: 24 }}>👤</div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', color: 'var(--burg)', marginBottom: 12 }}>
          You&apos;re not signed in
        </div>
        <p style={{ color: 'var(--tl)', marginBottom: 28 }}>Please sign in to view your profile.</p>
        <button className="btn-primary" onClick={() => router.push('/login')}>Sign In →</button>
      </div>
    );
  }

  const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ') || 'Your Account';

  function val(v?: string) {
    return v || <em style={{ color: 'var(--tl)', fontSize: '0.85rem' }}>Not set</em>;
  }

  return (
    <div className="page-content">
      <div className="hero contact" style={{ minHeight: 200 }}>
        <div className="hero-deco">👤</div>
        <div className="hero-rule" style={{ background: 'var(--saffron)' }}></div>
        <div className="hero-eyebrow">Your Account</div>
        <div className="hero-title">My <em>Profile</em></div>
        <div className="hero-sub">Manage your delivery details and account preferences.</div>
      </div>

      <div className="profile-shell">
        {/* Header */}
        <div className="profile-header">
          <div className="profile-avatar">{initials}</div>
          <div className="profile-header-info">
            <h2>{fullName}</h2>
            <p>{user.email}</p>
          </div>
          {user.createdAt && (
            <div className="profile-member-since">
              Member since<br />{user.createdAt}
            </div>
          )}
        </div>

        {/* Personal Info */}
        <ProfileSection
          title="Personal Information" icon="👤" sectionKey="personal"
          onSave={() => { updateSection('personal', { firstName, lastName }); return null; }}
          editContent={() => (
            <div className="profile-field-row">
              <div>
                <div className="pf-label">First Name</div>
                <input className="field-input" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First name" />
              </div>
              <div>
                <div className="pf-label">Last Name</div>
                <input className="field-input" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last name" />
              </div>
            </div>
          )}
        >
          <div className="profile-field-row">
            <div><div className="pf-label">First Name</div><div className="pf-value">{val(user.firstName)}</div></div>
            <div><div className="pf-label">Last Name</div><div className="pf-value">{val(user.lastName)}</div></div>
          </div>
        </ProfileSection>

        {/* Contact Details */}
        <ProfileSection
          title="Contact Details" icon="📞" sectionKey="contact"
          onSave={() => { updateSection('contact', { email, phone, whatsapp }); return null; }}
          editContent={() => (
            <>
              <div className="profile-field-row">
                <div>
                  <div className="pf-label">Email Address</div>
                  <input className="field-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" />
                </div>
                <div>
                  <div className="pf-label">Phone Number</div>
                  <input className="field-input" type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 98765 43210" />
                </div>
              </div>
              <div style={{ marginTop: 18 }}>
                <div className="pf-label">WhatsApp Number</div>
                <input className="field-input" type="tel" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} placeholder="+91 98765 43210" style={{ maxWidth: 320 }} />
                <div className="field-hint">Leave blank if same as phone number above.</div>
              </div>
            </>
          )}
        >
          <div className="profile-field-row">
            <div><div className="pf-label">Email Address</div><div className="pf-value">{val(user.email)}</div></div>
            <div><div className="pf-label">Phone Number</div><div className="pf-value">{val(user.phone)}</div></div>
          </div>
          <div style={{ marginTop: 18 }}>
            <div className="pf-label">WhatsApp Number</div>
            <div className="pf-value">{val(user.whatsapp || user.phone)}</div>
          </div>
        </ProfileSection>

        {/* Delivery Address */}
        <ProfileSection
          title="Delivery Address" icon="📍" sectionKey="address"
          onSave={() => { updateSection('address', { address1, area, pincode, note }); return null; }}
          editContent={() => (
            <>
              <div>
                <div className="pf-label">Street Address / Flat No.</div>
                <input className="field-input" value={address1} onChange={e => setAddress1(e.target.value)} placeholder="Flat 4B, Sunrise Apartments, Banjara Hills" />
              </div>
              <div style={{ marginTop: 18 }}>
                <div className="profile-field-row">
                  <div>
                    <div className="pf-label">Area / Locality</div>
                    <input className="field-input" value={area} onChange={e => setArea(e.target.value)} placeholder="Jubilee Hills" />
                  </div>
                  <div>
                    <div className="pf-label">Pincode</div>
                    <input className="field-input" value={pincode} onChange={e => setPincode(e.target.value)} placeholder="500033" maxLength={6} />
                  </div>
                </div>
              </div>
              <div style={{ marginTop: 18 }}>
                <div className="pf-label">Delivery Instructions <span style={{ fontStyle: 'italic', letterSpacing: 0 }}>(optional)</span></div>
                <input className="field-input" value={note} onChange={e => setNote(e.target.value)} placeholder="Leave at door, call before delivery, etc." />
              </div>
            </>
          )}
        >
          <div><div className="pf-label">Street Address</div><div className="pf-value">{val(user.address1)}</div></div>
          <div style={{ marginTop: 16 }}>
            <div className="profile-field-row">
              <div><div className="pf-label">Area / Locality</div><div className="pf-value">{val(user.area)}</div></div>
              <div><div className="pf-label">Pincode</div><div className="pf-value">{val(user.pincode)}</div></div>
            </div>
          </div>
          <div style={{ marginTop: 16 }}>
            <div className="pf-label">Delivery Instructions</div>
            <div className="pf-value">{val(user.note)}</div>
          </div>
        </ProfileSection>

        {/* Security */}
        <ProfileSection
          title="Change Password" icon="🔒" sectionKey="password"
          onSave={() => {
            const err = updateSection('password', { currentPassword: curPwd, newPassword: newPwd });
            if (err) { setPwdError(err); return err; }
            setCurPwd(''); setNewPwd(''); setPwdError('');
            return null;
          }}
          editContent={() => (
            <div className="profile-field-row">
              <div className="field-group">
                <label className="field-label">Current Password</label>
                <input className={`field-input${pwdError && pwdError.includes('current') ? ' error' : ''}`} type="password" value={curPwd} onChange={e => setCurPwd(e.target.value)} placeholder="Current password" />
                {pwdError && pwdError.includes('current') && <div className="field-error show">{pwdError}</div>}
              </div>
              <div className="field-group">
                <label className="field-label">New Password</label>
                <input className={`field-input${pwdError && pwdError.includes('6') ? ' error' : ''}`} type="password" value={newPwd} onChange={e => setNewPwd(e.target.value)} placeholder="Min. 6 characters" />
                {pwdError && !pwdError.includes('current') && <div className="field-error show">{pwdError}</div>}
              </div>
            </div>
          )}
        >
          <div style={{ color: 'var(--tl)', fontSize: '0.85rem' }}>
            Password set. Click &quot;Change&quot; to update it.
          </div>
        </ProfileSection>

        {/* Danger zone */}
        <div className="profile-danger">
          <h4>⚠ Account Actions</h4>
          <p>Sign out of your account, or permanently delete all your saved details.</p>
          <button
            className="btn-logout"
            onClick={() => {
              if (window.confirm('Sign out of Raasa Harvest?')) {
                logout();
                router.push('/');
              }
            }}
          >
            Sign Out
          </button>
          <button
            className="btn-delete"
            onClick={() => {
              if (window.confirm('Permanently delete your account and all saved details? This cannot be undone.')) {
                deleteAccount();
                router.push('/');
              }
            }}
          >
            Delete Account
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
