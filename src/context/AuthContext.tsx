'use client';
// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  onAuthStateChanged, signInWithEmailAndPassword,
  createUserWithEmailAndPassword, signOut,
  GoogleAuthProvider, signInWithPopup,
  updatePassword, EmailAuthProvider, reauthenticateWithCredential,
  User,
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase-client';

export interface UserProfile {
  uid: string;
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  whatsapp?: string;
  address1?: string;
  area?: string;
  pincode?: string;
  note?: string;
  createdAt?: string;
}

interface AuthContextValue {
  user: UserProfile | null;
  firebaseUser: User | null;
  loading: boolean;
  initials: string;
  displayName: string;
  login:           (args: { email: string; password: string }) => Promise<string | null>;
  signup:          (args: { firstName: string; lastName?: string; email: string; phone?: string; password: string }) => Promise<string | null>;
  signInWithGoogle:() => Promise<string | null>;
  logout:          () => void;
  deleteAccount:   () => void;
  updateSection:   (section: string, data: Record<string, string>) => string | null;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser]           = useState<UserProfile | null>(null);
  const [firebaseUser, setFbUser] = useState<User | null>(null);
  const [loading, setLoading]     = useState(true);

  async function loadProfile(fbUser: User) {
    const snap = await getDoc(doc(db, 'users', fbUser.uid));
    if (snap.exists()) {
      setUser(snap.data() as UserProfile);
    } else {
      // Google / first-time: create minimal profile
      const [firstName = '', ...rest] = (fbUser.displayName ?? '').split(' ');
      const profile: UserProfile = {
        uid: fbUser.uid,
        firstName,
        lastName: rest.join(' ') || '',
        email: fbUser.email ?? '',
        createdAt: new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
      };
      await setDoc(doc(db, 'users', fbUser.uid), profile);
      setUser(profile);
    }
  }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      setFbUser(fbUser);
      if (fbUser) await loadProfile(fbUser);
      else setUser(null);
      setLoading(false);
    });
    return unsub;
  }, []);

  async function createSessionCookie(fbUser: User) {
    const idToken = await fbUser.getIdToken();
    await fetch('/api/auth/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken }),
    });
  }

  async function login({ email, password }: { email: string; password: string }): Promise<string | null> {
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      await createSessionCookie(cred.user);
      return null;
    } catch (err: unknown) {
      return friendlyError(err);
    }
  }

  async function signup({ firstName, lastName = '', email, phone = '', password }: {
    firstName: string; lastName?: string; email: string; phone?: string; password: string;
  }): Promise<string | null> {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const profile: UserProfile = {
        uid: cred.user.uid, firstName, lastName, email, phone,
        createdAt: new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
      };
      await setDoc(doc(db, 'users', cred.user.uid), profile);
      setUser(profile);
      await createSessionCookie(cred.user);
      return null;
    } catch (err: unknown) {
      return friendlyError(err);
    }
  }

  async function signInWithGoogle(): Promise<string | null> {
    try {
      const provider = new GoogleAuthProvider();
      const cred = await signInWithPopup(auth, provider);
      await loadProfile(cred.user);
      await createSessionCookie(cred.user);
      return null;
    } catch (err: unknown) {
      return friendlyError(err);
    }
  }

  async function logout() {
    await signOut(auth);
    await fetch('/api/auth/session', { method: 'DELETE' });
    setUser(null);
    setFbUser(null);
  }

  async function deleteAccount() {
    if (!firebaseUser || !user) return;
    await deleteDoc(doc(db, 'users', user.uid));
    await firebaseUser.delete();
    await fetch('/api/auth/session', { method: 'DELETE' });
    setUser(null);
    setFbUser(null);
  }

  function updateSection(section: string, data: Record<string, string>): string | null {
    if (!user) return 'Not signed in';
    if (section === 'password') {
      const { currentPassword, newPassword } = data;
      if (!currentPassword) return 'Please enter your current password.';
      if (!newPassword || newPassword.length < 6) return 'New password must be at least 6 characters.';
      if (!firebaseUser || !user.email) return 'Unable to update password.';
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      reauthenticateWithCredential(firebaseUser, credential)
        .then(() => updatePassword(firebaseUser, newPassword))
        .catch(() => {});
      return null;
    }
    const updated = { ...user, ...data };
    setUser(updated as UserProfile);
    updateDoc(doc(db, 'users', user.uid), data).catch(() => {});
    return null;
  }

  const initials = user
    ? `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`.toUpperCase() || '?'
    : '';
  const displayName = user?.firstName ?? '';

  return (
    <AuthContext.Provider value={{ user, firebaseUser, loading, initials, displayName, login, signup, signInWithGoogle, logout, deleteAccount, updateSection }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}

function friendlyError(err: unknown): string {
  const code = (err as { code?: string })?.code ?? '';
  const map: Record<string, string> = {
    'auth/user-not-found':   'No account found with this email.',
    'auth/wrong-password':   'Incorrect password. Please try again.',
    'auth/email-already-in-use': 'An account with this email already exists.',
    'auth/weak-password':    'Password should be at least 6 characters.',
    'auth/invalid-email':    'Please enter a valid email address.',
    'auth/popup-closed-by-user': 'Sign-in was cancelled.',
    'auth/too-many-requests':'Too many attempts. Please try again later.',
  };
  return map[code] ?? (err instanceof Error ? err.message : 'Something went wrong.');
}
