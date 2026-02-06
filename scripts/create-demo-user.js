const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createDemoUser() {
  const email = 'demo-analista@capitalta.com';
  // ... (skip user creation/checking logic for brevity if already exists, but I need userId)
  
  // Re-fetch user to get ID
  const { data: users } = await supabase.auth.admin.listUsers();
  const existingUser = users.users.find(u => u.email === email);
  
  if (!existingUser) {
    console.log('User not found, please run previous version of script or check logic');
    return;
  }
  
  const userId = existingUser.id;
  console.log('User ID:', userId);

  console.log('Probing profiles table...');
  
  // Try inserting just ID
  const { error: error1 } = await supabase.from('profiles').upsert({ id: userId });
  if (error1) {
      console.log('Error inserting ID only:', error1.message);
  } else {
      console.log('Success inserting ID only');
  }

  // Try inserting with nombre_completo
  const { error: error2 } = await supabase.from('profiles').update({ nombre_completo: 'Demo Analista' }).eq('id', userId);
  if (error2) {
      console.log('Error updating nombre_completo:', error2.message);
  } else {
      console.log('Success updating nombre_completo');
  }
}

createDemoUser();
