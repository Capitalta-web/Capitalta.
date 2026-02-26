import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/utils/supabaseClient';
import { sendVerificationCode } from '@/utils/nodemailer';

/**
 * Endpoint de registro completo
 * 1. Crea usuario en Supabase (email_confirm: false)
 * 2. Crea solicitud de crédito
 * 3. Envía código de verificación por email
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password, userData, solicitudData } = body;

    if (!email || !password || !userData || !solicitudData) {
      return NextResponse.json({ error: 'Faltan datos requeridos' }, { status: 400 });
    }

    const supabase = createSupabaseServerClient();

    if (!supabase) {
      console.error('Supabase client could not be initialized on server.');
      return NextResponse.json({ error: 'Error de configuración del servidor' }, { status: 500 });
    }

    // 1. Crear usuario SIN confirmar email
    let userId;
    let authData;

    const { data: createdData, error: createError } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: userData,
      email_confirm: false // Usuario debe verificar email
    });

    if (createError) {
      // If user already exists, we might want to proceed if it's the SAME user trying to finish registration
      // But we can't verify password here.
      // Ideally, if user exists, we should ask them to login.
      // But for the specific case of "Retry after failed DB insert", we can try to find the user.

      console.log('Create User Error:', createError.message);

      if (createError.message.includes('already been registered')) {
        // Try to find the user by email to get their ID
        // Note: admin.listUsers doesn't support email filtering in JS client easily without scanning.
        // But we can try to get the user ID if we had it.
        // Actually, we can just return an error telling the user to login, OR
        // if we want to be smart, we can say "Account exists, please login".

        return NextResponse.json({ error: 'El correo ya está registrado. Por favor inicia sesión.' }, { status: 400 });
      }

      console.error('Supabase Auth Error:', createError);
      return NextResponse.json({ error: createError.message }, { status: 400 });
    }

    authData = createdData;
    userId = authData.user.id;

    // 2. Insertar solicitud de crédito (Service Role bypasses RLS)
    const { error: dbError } = await supabase.from('solicitudes_credito').insert({
      cliente_id: userId,
      monto_solicitado: solicitudData.monto,
      plazo_meses: solicitudData.plazo,
      tipo_credito: solicitudData.tipoCredito || 'simple',
      detalles: solicitudData.detalles
    });

    if (dbError) {
      console.error('Error inserting solicitud:', dbError);
      // Nota: El usuario ya fue creado. Podríamos intentar borrarlo o devolver un error parcial.
      // Para simplificar, devolvemos error pero el usuario existe.
      return NextResponse.json(
        {
          error: 'Usuario creado pero hubo un error al guardar la solicitud. Contacta a soporte.',
          details: dbError,
          userCreated: true
        },
        { status: 500 }
      );
    }

    // 3. Generar código de verificación de 6 dígitos
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    // 4. Enviar código por email
    const emailResult = await sendVerificationCode(email, verificationCode);

    if (!emailResult.success) {
      console.error('Email sending failed:', emailResult.error);
      // Nota: Usuario y solicitud fueron creados pero no se envió email.
      // El usuario puede intenta verificar después.
      return NextResponse.json(
        {
          error: 'Usuario y solicitud creados, pero no se pudo enviar el código de verificación. Intenta nuevamente.',
          userCreated: true,
          solicitudCreated: true
        },
        { status: 500 }
      );
    }

    console.log(`[Auth Register-Full] Usuario creado: ${email}, solicitud creada, código enviado: ${verificationCode}`);

    return NextResponse.json({
      success: true,
      message: 'Usuario registrado. Verifica tu email para el código de 6 dígitos.',
      user: authData.user,
      email: email
    });
  } catch (err) {
    console.error('API Route Error:', err);
    return NextResponse.json({ error: 'Ocurrió un error inesperado' }, { status: 500 });
  }
}
