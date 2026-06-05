import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/utils/supabaseClient';

/**
 * Endpoint para verificar código OTP de email
 *
 * POST /api/auth/verify-otp
 * Body: { email, code }
 *
 * Proceso:
 * 1. Validar que el código sea de 6 dígitos
 * 2. Buscar el código en tabla otp_codes
 * 3. Validar que no haya expirado
 * 4. Obtener el user_id del usuario
 * 5. Confirmar el email en auth.users (email_confirm: true)
 * 6. Marcar código como usado
 * 7. Retornar success
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

    const supabase = createSupabaseServerClient({ admin: true });

    if (!supabase) {
      console.error('Supabase client could not be initialized');
      return NextResponse.json({ error: 'Error de configuración del servidor' }, { status: 500 });
    }

    // 1. Buscar el código OTP en tabla otp_codes
    const { data: otpRecord, error: otpError } = await supabase
      .from('otp_codes')
      .select('*')
      .eq('email', email)
      .eq('code', code)
      .gt('expires_at', new Date().toISOString())
      .eq('used', false)
      .single();

    if (otpError || !otpRecord) {
      console.error('OTP Code not found or expired:', otpError);
      return NextResponse.json({
        error: 'Código inválido o expirado. Solicita un nuevo código.'
      }, { status: 400 });
    }

    const userId = otpRecord.user_id || otpRecord.userId || otpRecord.usuario_id || null;
    let targetUserId = userId;

    if (!targetUserId) {
      const { data: listData, error: listError } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 });
      if (listError) {
        console.error('Error listing users:', listError);
        return NextResponse.json({ error: 'Error al confirmar email' }, { status: 500 });
      }
      const found = (listData?.users || []).find((u) => u.email === email);
      targetUserId = found?.id || null;
    }

    if (!targetUserId) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    const { error: confirmError } = await supabase.auth.admin.updateUserById(targetUserId, { email_confirm: true });
    if (confirmError) {
      console.error('Error confirming email:', confirmError);
      return NextResponse.json({ error: 'No se pudo confirmar el email' }, { status: 500 });
    }

    // 3. Marcar código como usado
    const { error: updateOtpError } = await supabase
      .from('otp_codes')
      .update({
        used: true,
        used_at: new Date().toISOString()
      })
      .eq('id', otpRecord.id);

    if (updateOtpError) {
      console.error('Error marking OTP as used:', updateOtpError);
      // No bloqueamos aquí, el usuario puede continuar
    }

    return NextResponse.json({
      success: true,
      message: 'Email verificado exitosamente. Ahora puedes iniciar sesión.',
      email: email,
      verified: true
    });
  } catch (err) {
    console.error('API Route Error:', err.message || err);
    return NextResponse.json({
      error: 'Ocurrió un error inesperado',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    }, { status: 500 });
  }
}
