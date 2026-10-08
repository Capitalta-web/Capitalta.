const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createDemoUser() {
  const email = process.env.DEMO_EMAIL || 'admin@capitalta.mx';
  const password = process.env.DEMO_PASSWORD || '123456Capitalta';
  const role = process.env.DEMO_ROLE || 'admin';
  const nombreCompleto = process.env.DEMO_NAME || 'Capitalta Admin';

  if (!['cliente', 'analista', 'admin', 'notario'].includes(role)) {
    console.error('Invalid DEMO_ROLE. Use: cliente | analista | admin | notario');
    process.exit(1);
  }

  const { data: usersData, error: listError } = await supabase.auth.admin.listUsers({ perPage: 1000 });
  if (listError) {
    console.error('Error listing users:', listError.message);
    process.exit(1);
  }

  const existingUser = (usersData?.users || []).find((u) => u.email === email);

  let userId = existingUser?.id || null;

  if (!userId) {
    const { data: created, error: createError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        role,
        full_name: nombreCompleto,
        nombre_completo: nombreCompleto
      }
    });

    if (createError) {
      console.error('Error creating user:', createError.message);
      process.exit(1);
    }

    userId = created?.user?.id || null;
  } else {
    const { error: updateError } = await supabase.auth.admin.updateUserById(userId, {
      user_metadata: {
        ...(existingUser?.user_metadata || {}),
        role,
        full_name: nombreCompleto,
        nombre_completo: nombreCompleto
      }
    });

    if (updateError) {
      console.error('Error updating user metadata:', updateError.message);
      process.exit(1);
    }
  }

  if (!userId) {
    console.error('Could not resolve user ID');
    process.exit(1);
  }

  const profilePayload = {
    id: userId,
    role,
    nombre_completo: nombreCompleto,
    email
  };

  const upsertAttempts = [
    async () => supabase.from('profiles').upsert(profilePayload, { onConflict: 'id' }).select('id, role, email').single(),
    async () => supabase.from('profiles').upsert({ id: userId, role, nombre_completo: nombreCompleto }, { onConflict: 'id' }).select('id, role').single(),
    async () => supabase.from('profiles').upsert({ id: userId, role }, { onConflict: 'id' }).select('id, role').single(),
    async () => supabase.from('profiles').upsert({ id: userId }, { onConflict: 'id' }).select('id').single()
  ];

  let lastError = null;
  for (const attempt of upsertAttempts) {
    const { data, error } = await attempt();
    if (!error) {
      console.log('OK. Usuario listo:');
      console.log({ email, userId, role, profile: data });
      return;
    }
    lastError = error;
  }

  console.error('User created/updated, but failed to upsert profile:', lastError?.message || lastError);
  process.exit(1);
}

createDemoUser();
