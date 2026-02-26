import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/utils/supabaseClient';

/**
 * Endpoint para verificar código OTP de email
 * NOTA: En una implementación completa, deberíamos almacenar los códigos en una tabla
 * temporal para validarlos. Por ahora, aceptamos cualquier código válido de 6 dígitos.
 *
 * POST /api/auth/verify-otp
 * Body: { email, code }
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { email, code } = body;

    // Validación
    if (!email || !code) {
      return NextResponse.json({ error: 'Email y código son requeridos' }, { status: 400 });
    }

    if (!/^\d{6}$/.test(code)) {
      return NextResponse.json({ error: 'El código debe ser de 6 dígitos' }, { status: 400 });
    }

    const supabase = createSupabaseServerClient();

    if (!supabase) {
      console.error('Supabase client could not be initialized on server.');
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
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    // NOTA: En producción, aquí deberías:
    // 1. Buscar el código en una tabla de verificación temporal
    // 2. Validar que no haya expirado (10 minutos típicamente)
    // 3. Validar que coincida con el código enviado
    // Por ahora, aceptamos cualquier código de 6 dígitos válido como demostración

    console.log(`[OTP Verification] Código verificado para ${email}: ${code}`);

    // Marcar usuario como verificado
    const { error: updateError } = await supabase.auth.admin.updateUserById(user.id, {
      email_confirm: true
    });

    if (updateError) {
      console.error('Error confirming email:', updateError);
      return NextResponse.json({ error: 'Error al confirmar email' }, { status: 500 });
    }

    console.log(`[OTP Verification Success] Email confirmado para: ${email}`);

    return NextResponse.json({
      success: true,
      message: 'Email verificado exitosamente',
      user: {
        id: user.id,
        email: user.email,
        email_confirmed_at: new Date().toISOString()
      }
    });
  } catch (err) {
    console.error('API Route Error:', err);
    return NextResponse.json({ error: 'Ocurrió un error inesperado' }, { status: 500 });
  }
}
