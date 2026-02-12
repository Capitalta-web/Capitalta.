-- Create system_config table for global settings
CREATE TABLE IF NOT EXISTS public.system_config (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.system_config ENABLE ROW LEVEL SECURITY;

-- Policy: Everyone can read system config
DROP POLICY IF EXISTS "Everyone can read system config" ON public.system_config;
CREATE POLICY "Everyone can read system config" ON public.system_config
  FOR SELECT USING (true);

-- Policy: Only admins can update system config
DROP POLICY IF EXISTS "Admins can update system config" ON public.system_config;
CREATE POLICY "Admins can update system config" ON public.system_config
  FOR UPDATE USING (
    auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin')
  );

-- Policy: Only admins can insert system config (initial setup)
DROP POLICY IF EXISTS "Admins can insert system config" ON public.system_config;
CREATE POLICY "Admins can insert system config" ON public.system_config
  FOR INSERT WITH CHECK (
    auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin')
  );

-- Insert default values if not exist
INSERT INTO public.system_config (key, value, description)
VALUES 
  ('maintenance_mode', 'false'::jsonb, 'Modo de mantenimiento del sistema'),
  ('password_policy', '{"rotation_days": 90, "force_reset": false}'::jsonb, 'Política de contraseñas'),
  ('notification_settings', '{"email_enabled": true, "system_alerts": true}'::jsonb, 'Configuración global de notificaciones')
ON CONFLICT (key) DO NOTHING;

-- Add preferences column to profiles if not exists
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'preferences') THEN
        ALTER TABLE public.profiles ADD COLUMN preferences JSONB DEFAULT '{"email_notifications": true, "new_request_alerts": true, "weekly_summary": false, "two_factor_auth": false}'::jsonb;
    END IF;
END $$;
