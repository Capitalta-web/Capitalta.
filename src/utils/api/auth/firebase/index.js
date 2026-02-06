// @third-party
// import { signInWithEmailAndPassword } from 'firebase/auth';

// @project
import { attempt } from '@/utils/attempt';
import { firebaseAuth } from '@/utils/auth-client/firebase-client';

/***************************  FIREBASE - LOGIN  ***************************/

export function login(formData) {
  return Promise.reject(new Error('Firebase login not implemented'));
}

/***************************  FIREBASE - SIGN OUT  ***************************/

export function signOut() {
  return Promise.resolve({ status: 200 });
}

// Export as a single object for easy import
const firebase = { login, signOut };

export default firebase;
