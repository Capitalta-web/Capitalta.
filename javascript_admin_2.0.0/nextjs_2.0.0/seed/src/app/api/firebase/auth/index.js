// @next
import { NextResponse } from 'next/server';

// @project
import { AuthRole } from '@/enum';
import { adminAuth } from '@/utils/auth-client/firebase-admin';
import { attempt } from '@/utils/attempt';

/***************************  FIREBASE - LOGIN  ***************************/

export async function login() {
  try {
    return NextResponse.json({ message: 'Firebase handles login via client SDK' }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

/***************************  FIREBASE - GET USER  ***************************/

export async function getUser(token) {
  try {
    const { data, error } = await attempt(adminAuth.verifyIdToken(token));

    if (error || !data) {
      return NextResponse.json({ error: error || 'Invalid token' }, { status: 400 });
    }

    const { data: userDetails, error: e } = await attempt(adminAuth.getUser(data.uid));

    if (e || !userDetails) {
      return NextResponse.json({ error: e || 'User not found' }, { status: 400 });
    }

    // avatar = userDetails.photoURL

    return NextResponse.json(
      {
        id: userDetails.uid,
        email: userDetails.email || '',
        role: AuthRole.USER,
        contact: '123456789',
        dialcode: '+1',
        firstname: userDetails.displayName || 'John',
        lastname: userDetails.displayName ? '' : 'Charly'
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

/***************************  FIREBASE - SIGN UP  ***************************/

export async function signUp(request) {
  try {
    const body = await request.json();

    const { error } = await attempt(
      adminAuth.createUser({
        email: body.email,
        password: body.password,
        displayName: body.firstname + ' ' + body.lastname,
        phoneNumber: `${body.dialcode}${body.contact}`
      })
    );

    if (error) {
      return NextResponse.json({ error: error }, { status: 400 });
    }

    // Success
    return NextResponse.json({ status: 200 });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

/***************************  FIREBASE - VERIFY OTP  ***************************/

export async function verifyOtp(request) {
  try {
    const body = await request.json();
    console.log(body);

    // TODO: Implement your actual firebase call to verify OTP

    // Success
    return NextResponse.json({ status: 200 });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

/***************************  FIREBASE - RESEND OTP  ***************************/

export async function resend(request) {
  try {
    const body = await request.json();
    console.log(body);

    // TODO: Implement your actual firebase call to resend OTP

    // Success
    return NextResponse.json({ status: 200 });
  } catch {
    // Internal Server Error
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

/***************************  FIREBASE - FORGOT PASSWORD  ***************************/

export async function forgotPassword(request) {
  try {
    const body = await request.json();

    // NOTE:
    // Firebase Admin SDK only generates the password reset link on the server.
    // It does NOT send the email automatically.
    // We manually send the reset link using our email service (Nodemailer/Resend/SMTP)
    // to complete the password recovery flow.
    const { error, data: resetLink } = await attempt(adminAuth.generatePasswordResetLink(body.email));
    console.log('Password reset link:', resetLink);

    if (error) {
      return NextResponse.json({ error: error }, { status: 400 });
    }

    // Success
    return NextResponse.json({ status: 200 });
  } catch {
    // Internal Server Error
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

/***************************  FIREBASE - RESET PASSWORD  ***************************/

export async function resetPassword(request) {
  try {
    const body = await request.json();
    console.log(body);

    // TODO: Implement your actual firebase call to reset password

    // Success
    return NextResponse.json({ status: 200 });
  } catch {
    // Internal Server Error
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

/***************************  FIREBASE - SIGN OUT  ***************************/

export async function signOut() {
  try {
    // Handle sign-out on the server; add any extra sign-out actions here and call this endpoint from the frontend.

    // Success
    return NextResponse.json({ status: 200 });
  } catch {
    // Internal Server Error
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// Export as a single object for easy import
const firebaseAuth = { login, getUser, signUp, verifyOtp, resend, forgotPassword, resetPassword, signOut };

export default firebaseAuth;
