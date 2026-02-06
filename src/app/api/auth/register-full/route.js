import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/utils/supabaseClient';

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

    // 1. Crear usuario (Admin privileges, auto-confirm email)
    let userId;
    let authData;

    // Check if user already exists first
    const { data: existingUsers } = await supabase.auth.admin.listUsers();
    // Note: listUsers is paginated, but for now we assume email check works via createUser error or specific search
    // Better: use listUsers with filter if possible, but admin.listUsers doesn't support email filter directly in all versions.
    // However, we can just try createUser and handle the error.

    const { data: createdData, error: createError } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: userData,
      email_confirm: true 
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
    const { error: dbError } = await supabase
      .from('solicitudes_credito')
      .insert({
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
      return NextResponse.json({ 
        error: 'Usuario creado pero hubo un error al guardar la solicitud. Contacta a soporte.',
        details: dbError,
        userCreated: true 
      }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      user: authData.user 
    });

  } catch (err) {
    console.error('API Route Error:', err);
    return NextResponse.json({ error: 'Ocurrió un error inesperado' }, { status: 500 });
  }
}
