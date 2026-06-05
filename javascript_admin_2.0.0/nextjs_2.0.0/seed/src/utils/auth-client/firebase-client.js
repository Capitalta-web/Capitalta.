// @third-party
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

/***************************  AUTH CLIENT - FIREBASE  ***************************/

export function createFirebaseClient() {
  // If already created, return existing instance
  if (getApps().length > 0) {
    return getApp();
  }

  const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
  };

  // Validate required config
  if (!config.apiKey || !config.authDomain || !config.projectId || !config.appId) {
    console.error('[Firebase Client] Missing required configuration variables.');
    return {};
  }

  return initializeApp(config);
}

export const firebaseApp = createFirebaseClient();
export const firebaseAuth = getAuth(firebaseApp);
