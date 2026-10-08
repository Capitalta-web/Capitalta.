/**
 * Weekly Summary Notification
 * Sends a weekly summary of solicitudes to admin (Monday 8:00 AM)
 */

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { emailTemplates } from '@/utils/notifications/emailService';

export async function POST(request) {
  try {
    // Create Supabase admin client
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              );
            } catch (error) {
              console.error('Error setting cookies:', error);
            }
          },
        },
      }
    );

    // Get this week's dates (Monday to Sunday)
    const today = new Date();
    const dayOfWeek = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    // Fetch week's solicitudes
    const { data: solicitudes, error: fetchError } = await supabase
      .from('solicitudes')
      .select('*')
      .gte('created_at', startOfWeek.toISOString())
      .lte('created_at', endOfWeek.toISOString());

    if (fetchError) throw fetchError;

    // Fetch week's clientes
    const { data: profiles, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'cliente');

    if (profileError) throw profileError;

    // Calculate metrics
    const totalSolicitudes = solicitudes?.length || 0;
    const aprobadas = solicitudes?.filter(s => s.status === 'aprobada').length || 0;
    const tasaAprobacion = totalSolicitudes > 0 ? Math.round((aprobadas / totalSolicitudes) * 100) : 0;
    const totalClientes = profiles?.length || 0;

    // Get admin email from config
    const adminEmail = process.env.GOOGLE_EMAIL || 'contacto@capitalta.mx';

    // Create HTML content
    const htmlContent = emailTemplates.weeklySummary({
      totalSolicitudes,
      aprobadas,
      tasaAprobacion,
      totalClientes
    });

    // Send email
    const response = await fetch(new URL('/api/notifications/send-email', request.url), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: adminEmail,
        subject: `📈 Resumen Semanal de Solicitudes - Semana del ${startOfWeek.toLocaleDateString('es-MX')}`,
        htmlContent: htmlContent
      })
    });

    if (!response.ok) {
      throw new Error('Failed to send summary email');
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Weekly summary sent successfully',
        timestamp: new Date().toISOString(),
        data: {
          weekStart: startOfWeek.toLocaleDateString('es-MX'),
          weekEnd: endOfWeek.toLocaleDateString('es-MX'),
          totalSolicitudes,
          aprobadas,
          tasaAprobacion,
          totalClientes
        }
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Error in weekly-summary:', err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
