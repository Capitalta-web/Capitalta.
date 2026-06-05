// @third-party

import { initializeApp, getApps, getApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

/***************************  AUTH ADMIN - FIREBASE  ***************************/

export function createFirebaseAdmin() {
  // If already created, return existing
  if (getApps().length > 0) {
    return getApp();
  }

  // Note: We are using env variables for cert; you can also use the JSON service account file downloaded from Firebase.
  const config = {
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n')
  };

  // Validate required values
  if (!config.projectId || !config.clientEmail || !config.privateKey) {
    console.error('[Firebase Admin] Missing required environment variables.');
    return {};
  }

  return initializeApp({
    credential: cert(config)
  });
}

export const adminApp = createFirebaseAdmin();
export const adminAuth = getAuth(adminApp);
