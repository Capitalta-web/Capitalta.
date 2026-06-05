const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

async function testEmail() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Error: Faltan variables de entorno NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_ANON_KEY');
    return;
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const testEmail = 'test-' + Date.now() + '@example.com'; // Correo único para evitar "User already registered"

  console.log(`Intentando registrar usuario de prueba: ${testEmail}`);

  const { data, error } = await supabase.auth.signUp({
    email: testEmail,
    password: 'Password123!',
  });

  if (error) {
    console.error('Error al enviar correo (signUp):', error.message);
    if (error.status === 429) {
      console.error('Causa probable: Límite de velocidad (Rate Limit) excedido. Supabase permite 3 emails por hora en el plan gratuito sin SMTP propio.');
    }
  } else {
    console.log('¡Éxito! Supabase aceptó la solicitud de registro.');
    console.log('Si no llega el correo a un buzón real, verifica:');
    console.log('1. Carpeta de Spam.');
    console.log('2. Logs de Auth en el panel de Supabase.');
    console.log('3. Configuración de SMTP (Settings > Auth > SMTP Settings).');
    
    // Limpieza (opcional, requiere service role key para borrar, así que lo dejamos)
  }
}

testEmail();
