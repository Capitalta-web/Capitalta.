import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/utils/supabaseClient';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password, options } = body;

    const supabase = createSupabaseServerClient();

    if (!supabase) {
      console.error('Supabase client could not be initialized on server.');
      return NextResponse.json({ error: 'Error de configuración del servidor' }, { status: 500 });
    }

    // Usamos admin.createUser para crear el usuario.
    // email_confirm: true permite que el usuario inicie sesión inmediatamente sin verificar correo.
    // Esto es útil si el servicio de correo no está configurado o para cuentas admin rápidas.
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: options?.data,
      email_confirm: true
    });

    if (error) {
      console.error('Supabase Auth Error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ data });
  } catch (err) {
    console.error('API Route Error:', err);
    return NextResponse.json({ error: 'Ocurrió un error inesperado' }, { status: 500 });
  }
}
