'use server';

import { createClient } from '@supabase/supabase-js';

export async function resendOtpAction(email) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseAnonKey) {
    return { error: 'Error de configuración' };
  }
  
  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false }
    });
    const cleanEmail = email.trim().toLowerCase();
    
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: cleanEmail
    });
    
    if (error) {
      console.error('Supabase Resend Error:', error);
      // Handle rate limit specifically
      if (error.status === 429) {
        return { error: 'Por favor espera 60 segundos antes de solicitar otro código.' };
      }
      return { error: error.message };
    }
    
    return { success: true, message: 'Código reenviado con éxito.' };
  } catch (err) {
    console.error('Unexpected error in resendOtpAction:', err);
    return { error: 'Error inesperado al reenviar' };
  }
}

export async function sendOtpAction(email, password, metadata) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase URL or Key missing in Server Action');
    return { error: 'Error de configuración del servidor' };
  }
  
  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false }
    });
    const cleanEmail = email.trim().toLowerCase();
    
    // Check if user exists (optional, but good for UX)
    // Note: getUser is only for logged in users. Admin logic would require Service Key.
    // We'll rely on signUp handling it.
    
    // Switch to signUp to use "Confirm Email" template and set password immediately
    const { data, error } = await supabase.auth.signUp({
      email: cleanEmail,
      password: password,
      options: {
        data: metadata
      }
    });
    
    // If user already exists, signUp might return success with null session/user (if email confirmation needed)
    // OR it might throw an error "User already registered".
    // If "User already registered", we should try to resend confirmation or fallback to signInWithOtp if they want to login?
    // But this is "Registro", so erroring is arguably correct if they already exist.
    // However, for UX, if they are stuck in "unconfirmed" state, signUp resends the email.
    
    if (error) {
      console.error('Supabase signUp Error:', error);
      // If user exists, we might want to try resending the OTP (signup type)
      if (error.message.includes('already registered')) {
          // If already registered, we try to resend the signup OTP.
          // This handles cases where they registered but didn't verify.
          const { error: resendError } = await supabase.auth.resend({
            type: 'signup',
            email: cleanEmail
          });
          
          if (resendError) {
             console.error('Auto-resend failed:', resendError);
             if (resendError.status === 429) {
                 return { error: 'El usuario ya existe, pero excediste el límite de intentos. Espera 60s.' };
             }
             return { error: `El usuario ya está registrado. Error al reenviar: ${resendError.message}` };
          }
          return { success: true, message: 'Reenviado código de confirmación.' };
      }
      return { error: error.message };
    }
    
    return { success: true, data };
  } catch (err) {
    console.error('Unexpected error in sendOtpAction:', err);
    return { error: 'Error inesperado al enviar OTP' };
  }
}

export async function verifyOtpAction({ email, token, type }) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return { error: 'Error de configuración del servidor' };
  }

  try {
    // Usamos persistSession: false porque en una Server Action no necesitamos persistir la sesión en el servidor
    // Solo queremos verificar y obtener los tokens para devolverlos al cliente
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false }
    });
    
    const cleanEmail = email.trim().toLowerCase();
    // Eliminar cualquier espacio en blanco del token (ej. "123 456" -> "123456")
    const cleanToken = token.toString().replace(/\s+/g, '');
    
    console.log(`Verificando OTP para ${cleanEmail} con tipo inicial: ${type || 'signup'}`);

    // 1. Intentar primero como 'signup' (lo más probable en registro)
    let result = await supabase.auth.verifyOtp({ 
      email: cleanEmail, 
      token: cleanToken, 
      type: type || 'signup' 
    });

    // 2. Si falla y era 'signup', intentar como 'email' (magiclink/login)
    if (result.error && (type === 'signup' || !type)) {
      console.warn('Verificación como signup falló, intentando como magiclink...', result.error.message);
      const emailResult = await supabase.auth.verifyOtp({ 
        email: cleanEmail, 
        token: cleanToken, 
        type: 'email' 
      });

      if (!emailResult.error) {
        result = emailResult;
      } else {
        // 3. Si falla email, intentar recovery (por si acaso es un reset de password)
        console.warn('Verificación como signup falló, intentando como recovery...', emailResult.error.message);
        const recoveryResult = await supabase.auth.verifyOtp({ 
          email: cleanEmail, 
          token: cleanToken, 
          type: 'recovery' 
        });

        if (!recoveryResult.error) {
           result = recoveryResult;
        }
      }
    }

    if (result.error) {
      console.error('Supabase verifyOtp Error:', result.error);
      return { error: result.error.message || 'Código inválido o expirado' };
    }

    // Si la verificación es exitosa, devolvemos la sesión
    return { success: true, session: result.data.session, user: result.data.user };
  } catch (err) {
    console.error('Unexpected error in verifyOtpAction:', err);
    return { error: 'Error inesperado al verificar OTP' };
  }
}

export async function updateUserAndCreateRequestAction({ userId, userData, requestData }) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Usamos Service Role para bypass RLS si es necesario, o para asegurar escritura

  if (!supabaseUrl || !supabaseServiceKey) {
    return { error: 'Error de configuración del servidor (Service Role)' };
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // 1. Actualizar usuario (password y metadata)
    // Nota: update user password requiere ser el usuario autenticado o admin. 
    // Como estamos en servidor con service role, somos admin.
    const { error: updateError } = await supabase.auth.admin.updateUserById(userId, {
      password: userData.password,
      user_metadata: userData.metadata
    });

    if (updateError) {
      console.error('Error updating user:', updateError);
      return { error: 'Error al actualizar perfil: ' + updateError.message };
    }

    // 1.5. Asegurar que el perfil público existe y está actualizado
    // Esto es crucial porque el trigger puede no haber corrido o no tener todos los datos
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        nombre_completo: userData.metadata.full_name,
        telefono: userData.metadata.telefono,
        rfc: userData.metadata.rfc,
        role: userData.metadata.tipo_persona === 'moral' ? 'cliente' : 'cliente', // Default a cliente
        updated_at: new Date().toISOString()
      });

    if (profileError) {
      console.error('Error updating public profile:', profileError);
      // No bloqueamos el flujo si falla el perfil público, pero lo logueamos
      // Opcional: return { error: 'Error al actualizar datos del perfil' };
    }

    // 2. Crear solicitud de crédito
    // Insertamos directamente con service role para asegurar que se cree
    const { error: insertError } = await supabase
      .from('solicitudes_credito')
      .insert({
        cliente_id: userId,
        ...requestData
      });

    if (insertError) {
      console.error('Error creating request:', insertError);
      return { error: 'Error al crear solicitud: ' + insertError.message };
    }

    return { success: true };

  } catch (err) {
    console.error('Unexpected error in updateUserAndCreateRequestAction:', err);
    return { error: 'Error inesperado al procesar la solicitud' };
  }
}
