-- ============================================================
-- CAPITALTA - Campos para análisis de crédito / buró
-- Aditivo: agrega columnas necesarias para consultar buró
-- y para underwriting. No borra ni modifica datos.
-- ============================================================

-- IDENTIDAD (pertenece a la persona) -> profiles
alter table public.profiles
  add column if not exists apellido_paterno text,
  add column if not exists apellido_materno text,
  add column if not exists rfc text,
  add column if not exists curp text,
  add column if not exists fecha_nacimiento date,
  add column if not exists domicilio_calle text,
  add column if not exists domicilio_numero text,
  add column if not exists domicilio_colonia text,
  add column if not exists domicilio_cp text,
  add column if not exists domicilio_municipio text,
  add column if not exists domicilio_estado text;

-- FINANCIERO / LABORAL / AUTORIZACIÓN (por solicitud) -> solicitudes
alter table public.solicitudes
  add column if not exists ingreso_mensual numeric,
  add column if not exists situacion_laboral text,        -- empleado, independiente, empresario
  add column if not exists antiguedad_laboral text,       -- ej. "3 años"
  add column if not exists empresa text,
  add column if not exists gastos_mensuales numeric,
  add column if not exists referencia_nombre text,
  add column if not exists referencia_telefono text,
  add column if not exists referencia_relacion text,
  add column if not exists autoriza_buro boolean not null default false,
  add column if not exists autoriza_buro_fecha timestamptz;
