/**
 * Daily Summary Notification
 * Sends a daily summary of solicitudes to admin (9:00 AM)
 */

import { getAdminContext } from '@/utils/buro/server-auth';
import { sendEmail } from '@/utils/nodemailer';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { emailTemplates } from '@/utils/notifications/emailService';

export async function POST(request) {
  // Solo administradores o el cron (Authorization: Bearer CRON_SECRET)
  const cronSecret = process.env.CRON_SECRET;
  const isCron = Boolean(cronSecret) && request.headers.get('authorization') === `Bearer ${cronSecret}`;
  if (!isCron) {
    const context = await getAdminContext();
    if (context.error) {
      return new Response(JSON.stringify({ error: context.error }), {
        status: context.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  try {
    // Create Supabase admin client
    const cookieStore = await cookies();
    const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
          } catch (error) {
            console.error('Error setting cookies:', error);
          }
        }
      }
    });

    // Get today's date
    const today = new Date();
    const startOfDay = new Date(today);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);

    // Fetch today's solicitudes
    const { data: solicitudes, error: fetchError } = await supabase
      .from('solicitudes')
      .select('*')
      .gte('created_at', startOfDay.toISOString())
      .lte('created_at', endOfDay.toISOString());

    if (fetchError) throw fetchError;

    // Calculate metrics
    const pendientes = solicitudes?.filter((s) => s.status === 'pendiente').length || 0;
    const aprobadas = solicitudes?.filter((s) => s.status === 'aprobada').length || 0;
    const rechazadas = solicitudes?.filter((s) => s.status === 'rechazada').length || 0;
    const totalMonto = solicitudes?.reduce((sum, s) => sum + (s.monto_solicitado || 0), 0) || 0;

    // Get admin email from config
    const adminEmail = process.env.GOOGLE_EMAIL || 'contacto@capitalta.mx';

    // Create HTML content
    const htmlContent = emailTemplates.dailySummary({
      pendientes,
      aprobadas,
      rechazadas,
      totalMonto
    });

    // Send email
    const response = await sendEmail({
      to: adminEmail,
      subject: `📊 Resumen Diario de Solicitudes - ${today.toLocaleDateString('es-MX')}`,
      html: htmlContent
    });
    if (!response?.success) {
      throw new Error('Failed to send summary email');
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Daily summary sent successfully',
        timestamp: new Date().toISOString(),
        data: {
          pendientes,
          aprobadas,
          rechazadas,
          totalMonto,
          total: solicitudes?.length || 0
        }
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Error in daily-summary:', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
