// Firebase implementation not currently used - using Supabase instead

// const googleProvider = new GoogleAuthProvider();
// const facebookProvider = new FacebookAuthProvider();
// facebookProvider.addScope('public_profile');
// facebookProvider.addScope('email');

/***************************  SOCIAL AUTH FIREBASE - LOGIN WITH GOOGLE  ***************************/

export function loginWithGoogle() {
  return Promise.reject(new Error('Firebase login not implemented'));
}

/***************************  SOCIAL AUTH FIREBASE - LOGIN WITH FACEBOOK  ***************************/

export function loginWithFacebook() {
  return Promise.reject(new Error('Firebase login not implemented'));
}

/***************************  SOCIAL AUTH FIREBASE - GET USER  ***************************/

export function getUser() {
  return Promise.reject(new Error('Firebase login not implemented'));
}

/***************************  SOCIAL AUTH FIREBASE - SIGN OUT  ***************************/

export function signOut() {
  return Promise.resolve({ status: 200 });
}

// Export as a single object for easy import
const firebase = { loginWithGoogle, loginWithFacebook, getUser, signOut };

export default firebase;
