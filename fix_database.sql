
-- Ejecuta este script en el Editor SQL de Supabase para corregir la tabla
ALTER TABLE public.solicitudes_credito 
ADD COLUMN IF NOT EXISTS detalles jsonb;

-- Verificar que se creó correctamente
SELECT column_name 
FROM information_schema.columns 
WHERE table_name = 'solicitudes_credito' 
AND column_name = 'detalles';
