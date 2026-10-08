/**
 * Email Sending API
 * Sends emails via Google Workspace SMTP
 */

import nodemailer from 'nodemailer';

// Create transporter with Google Workspace credentials
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // TLS (not SSL)
    auth: {
      user: process.env.GOOGLE_EMAIL,
      pass: process.env.GOOGLE_APP_PASSWORD,
    },
  });
};

export async function POST(request) {
  try {
    const { to, subject, htmlContent } = await request.json();

    if (!to || !subject || !htmlContent) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: to, subject, htmlContent' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate email credentials are configured
    if (!process.env.GOOGLE_EMAIL || !process.env.GOOGLE_APP_PASSWORD) {
      console.error('❌ Missing Google credentials in .env.local');
      return new Response(
        JSON.stringify({
          error: 'Email service not configured. Missing GOOGLE_EMAIL or GOOGLE_APP_PASSWORD in .env.local'
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create transporter
    const transporter = createTransporter();

    // Prepare mail options
    const mailOptions = {
      from: `Capitalta <${process.env.GOOGLE_EMAIL}>`,
      to: to,
      subject: subject,
      html: htmlContent,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log('✅ Email sent successfully:', {
      to,
      subject,
      messageId: info.messageId,
      timestamp: new Date().toISOString(),
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: `Email sent successfully to ${to}`,
        subject: subject,
        messageId: info.messageId,
        timestamp: new Date().toISOString()
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('❌ Error sending email:', {
      error: err.message,
      code: err.code,
      timestamp: new Date().toISOString(),
    });

    // More descriptive error messages
    let errorMessage = err.message;
    if (err.code === 'EAUTH') {
      errorMessage = 'Authentication failed. Check GOOGLE_EMAIL and GOOGLE_APP_PASSWORD in .env.local';
    } else if (err.code === 'ECONNREFUSED') {
      errorMessage = 'SMTP connection failed. Check SMTP_HOST and SMTP_PORT';
    }

    return new Response(
      JSON.stringify({
        error: errorMessage,
        code: err.code
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
