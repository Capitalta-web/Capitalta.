// @next
import { NextResponse } from 'next/server';

// @third-party
import axios from 'axios';

/***************************  API - MAILERLITE SUBSCRIBE  ***************************/

// POST handler for /api/subscribe
export async function POST(request) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }
    // Example: MailerLite API endpoint (replace with your actual MailerLite API URL)
    const mailerLiteUrl = `${process.env.MAILERLITE_API_ENDPOINT}/subscribers`;

    // Make the Axios POST request to MailerLite (replace 'YOUR_API_KEY' with your actual API key)
    await axios.post(
      mailerLiteUrl,
      { email, groups: process.env.MAILERLITE_GROUP?.trim().replaceAll(' ', '').split(',') },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.MAILERLITE_API_KEY}` // Authorization header with MailerLite API key
        }
      }
    );

    // Handle successful response
    return NextResponse.json({ message: 'Subscribed successfully!' }, { status: 200 });
  } catch (error) {
    // No devolver el error de axios: incluye la configuración de la petición (con el header Authorization).
    console.error('[api/subscribe]', error?.response?.status || error?.message);
    return NextResponse.json({ error: 'No se pudo completar la suscripción' }, { status: 500 });
  }
}
