// src/lib/session.ts — SERVER ONLY
import 'server-only';
import { cookies } from 'next/headers';
import { adminAuth } from '@/lib/firebase-admin';

const COOKIE_NAME    = 'rh_session';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 5;

export async function createSession(idToken: string) {
  const expiresIn = COOKIE_MAX_AGE * 1000;
  const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
  (await cookies()).set(COOKIE_NAME, sessionCookie, {
    httpOnly: true,
    secure:   process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge:   COOKIE_MAX_AGE,
    path:     '/',
  });
}

export async function verifySession() {
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME)?.value;
  if (!session) return null;
  try {
    return await adminAuth.verifySessionCookie(session, true);
  } catch {
    return null;
  }
}

export async function deleteSession() {
  (await cookies()).delete(COOKIE_NAME);
}
