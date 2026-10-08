-- Create admin user for contacto@capitalta.mx
-- This script creates the auth user and profile record

-- Note: You need to run this in Supabase SQL Editor with service role enabled
-- Or use the Supabase API to create the user

-- First, create the auth user (can be done via Supabase UI or API)
-- Then, insert the profile record:

INSERT INTO public.profiles (id, email, nombre, role, created_at, updated_at)
VALUES (
  auth.uid(), -- This will be filled after user is created
  'contacto@capitalta.mx',
  'Administrador Capitalta',
  'admin',
  now(),
  now()
)
ON CONFLICT (id) DO UPDATE SET
  role = 'admin',
  updated_at = now();
