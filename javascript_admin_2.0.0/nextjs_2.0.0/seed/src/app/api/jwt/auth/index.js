// @next
import { NextResponse } from 'next/server';

// @third-party
import axios from 'axios';

// @project
import { AuthRole } from '@/enum';
import { attempt } from '@/utils/attempt';
import { generateId } from '@/utils/common';

const mockBackendUrl = 'https://mock-data-api-nextjs.vercel.app';

/***************************  JWT - LOGIN  ***************************/

export async function login(request) {
  try {
    const body = await request.json();
    const payload = { email: body.email, password: body.password };

    // Add your API or login logic here
    const { data, error } = await attempt(axios.post(`${mockBackendUrl}/api/account/login`, payload));

    if (error) {
      return NextResponse.json({ error: error }, { status: 400 });
    }

    // Map response fields based on your backend structure.
    return NextResponse.json(
      {
        id: data.user?.id,
        email: data.user?.email || '',
        access_token: data.serviceToken
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

/***************************  JWT - GET USER  ***************************/

export async function getUser(token) {
  try {
    // Configure headers for the API request
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    // Add your API or get-user logic here
    const { data, error } = await attempt(axios.get(`${mockBackendUrl}/api/account/me`, config));

    if (error) {
      return NextResponse.json({ error: error }, { status: 400 });
    }

    return NextResponse.json(
      {
        id: data.user.id,
        email: data.user.email || '',
        role: AuthRole.USER,
        contact: '123456789',
        dialcode: '+1',
        firstname: 'John',
        lastname: 'Charly'
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

/***************************  JWT - SIGN UP  ***************************/

export async function signUp(request) {
  try {
    const body = await request.json();
    const payload = {
      id: generateId(),
      email: body.email,
      password: body.password,
      firstName: body.firstname,
      lastName: body.lastname
    };

    // Add your API or sign-up logic here
    const { error } = await attempt(axios.post(`${mockBackendUrl}/api/account/register`, payload));

    if (error) {
      return NextResponse.json({ error: error }, { status: 400 });
    }

    // Success
    return NextResponse.json({ status: 200 });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

/***************************  JWT - VERIFY OTP  ***************************/

export async function verifyOtp(request) {
  try {
    const body = await request.json();
    console.log(body);

    // Add your API or verify OTP logic here
    // Success
    return NextResponse.json({ status: 200 });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

/***************************  JWT - RESEND OTP  ***************************/

export async function resend(request) {
  try {
    const body = await request.json();
    console.log(body);

    // Add your API or resend OTP logic here
    // Success
    return NextResponse.json({ status: 200 });
  } catch {
    // Internal Server Error
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

/***************************  JWT - FORGOT PASSWORD  ***************************/

export async function forgotPassword(request) {
  try {
    const body = await request.json();
    console.log(body);

    // Add your API or forgot password logic here
    // Success
    return NextResponse.json({ status: 200 });
  } catch {
    // Internal Server Error
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

/***************************  JWT - RESET PASSWORD  ***************************/

export async function resetPassword(request) {
  try {
    const body = await request.json();
    console.log(body);

    // Add your API or reset password logic here
    // Success
    return NextResponse.json({ status: 200 });
  } catch {
    // Internal Server Error
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

/***************************  JWT - SIGN OUT  ***************************/

export async function signOut() {
  try {
    return NextResponse.json({ status: 200 });
  } catch {
    // Internal Server Error
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// Export as a single object for easy import
const jwtAuth = { login, getUser, signUp, verifyOtp, resend, forgotPassword, resetPassword, signOut };

export default jwtAuth;
