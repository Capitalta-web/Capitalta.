// @third-party
import { signInWithEmailAndPassword } from 'firebase/auth';

// @project
import { attempt } from '@/utils/attempt';
import { firebaseAuth } from '@/utils/auth-client/firebase-client';

/***************************  FIREBASE - LOGIN  ***************************/

export function login(formData) {
  return new Promise((resolve, reject) => {
    async () => {
      try {
        const { data, error } = await attempt(signInWithEmailAndPassword(firebaseAuth, formData.email, formData.password));

        if (error || !data) {
          reject(new Error('Invalid credentials'));
          return;
        }

        const firebaseUser = data.user;

        if (!firebaseUser) {
          reject(new Error('Login failed'));
          return;
        }

        const token = await firebaseUser.getIdToken();

        resolve({
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          access_token: token
        });
      } catch {
        reject(new Error('Server error'));
      }
    };
  });
}

/***************************  FIREBASE - SIGN OUT  ***************************/

export function signOut() {
  return new Promise((resolve, reject) => {
    async () => {
      try {
        await firebaseAuth.signOut();
        resolve({ status: 200 });
      } catch {
        reject(new Error('Server error'));
      }
    };
  });
}

// Export as a single object for easy import
const firebase = { login, signOut };

export default firebase;
