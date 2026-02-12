-- Migración para agregar columna email a profiles y sincronizar con auth.users
-- Ejecutar en SQL Editor de Supabase

-- 1. Agregar columna email si no existe
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'email') THEN
        ALTER TABLE public.profiles ADD COLUMN email TEXT;
    END IF;
END $$;

-- 2. Sincronizar emails existentes desde auth.users
-- Esto actualiza los perfiles existentes con el email correcto
UPDATE public.profiles
SET email = auth.users.email
FROM auth.users
WHERE public.profiles.id = auth.users.id
AND public.profiles.email IS NULL;

-- 3. Actualizar la función del trigger para guardar el email en futuros registros
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, nombre_completo, role, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'nombre_completo', 'Usuario Nuevo'),
    COALESCE(NEW.raw_user_meta_data->>'role', 'cliente'),
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
