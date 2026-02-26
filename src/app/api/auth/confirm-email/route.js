import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/utils/supabaseClient';

/**
 * Endpoint INTERNO para confirmar email del usuario
 * Usa SUPABASE_SERVICE_ROLE_KEY (admin privileges)
 *
 * Este endpoint es llamado INTERNAMENTE después de verificar OTP
 * NO debe ser expuesto al público sin autenticación
 *
 * POST /api/auth/confirm-email
 * Body: { email }
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validación
    if (!email) {
      return NextResponse.json({ error: 'Email es requerido' }, { status: 400 });
    }

    // Obtener cliente con Service Role Key
    const supabase = createSupabaseServerClient();

    if (!supabase) {
      console.error('Supabase server client could not be initialized.');
      return NextResponse.json({ error: 'Error de configuración del servidor' }, { status: 500 });
    }

    // Buscar usuario por email
    const { data: users, error: listError } = await supabase.auth.admin.listUsers();

    if (listError) {
      console.error('Error listing users:', listError);
      return NextResponse.json({ error: 'Error al buscar usuario' }, { status: 500 });
    }

    const user = users.find((u) => u.email === email);

    if (!user) {
      console.error(`User not found: ${email}`);
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    // Confirmar email del usuario
    const { data: updatedUser, error: updateError } = await supabase.auth.admin.updateUserById(
      user.id,
      {
        email_confirm: true
      }
    );

    if (updateError) {
      console.error('Error confirming email:', updateError);
      return NextResponse.json({ error: 'Error al confirmar email' }, { status: 500 });
    }

    console.log(`[Confirm Email] Email confirmado para: ${email} (user_id: ${user.id})`);

    return NextResponse.json({
      success: true,
      message: 'Email confirmado exitosamente',
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        email_confirmed_at: updatedUser.email_confirmed_at
      }
    });
  } catch (err) {
    console.error('API Route Error:', err.message || err);
    return NextResponse.json({
      error: 'Ocurrió un error inesperado',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    }, { status: 500 });
  }
}
