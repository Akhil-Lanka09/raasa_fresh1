// src/lib/firebase-admin.ts  — SERVER ONLY
import 'server-only';
import admin from 'firebase-admin';

function getAdminApp() {
  if (admin.apps.length > 0) return admin.apps[0]!;
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!raw) throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY is not set');
  let serviceAccount: admin.ServiceAccount;
  try {
    const decoded = Buffer.from(raw, 'base64').toString('utf-8');
    serviceAccount = JSON.parse(decoded);
  } catch {
    serviceAccount = JSON.parse(raw);
  }
  return admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
}

const adminApp  = getAdminApp();
const adminAuth = admin.auth(adminApp);
const adminDb   = admin.firestore(adminApp);

export { adminApp, adminAuth, adminDb };
