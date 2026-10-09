# PROMPT MAESTRO PARA SUPABASE Y TRAE - PROYECTO CAPITALTA

---

## **VISIÓN GENERAL Y ESTRATEGIA**

**Objetivo:** Expandir la aplicación Next.js existente para implementar un dashboard multi-rol (Cliente, Analista, Admin) que gestione el proceso de crédito de Capitalta en 7 pasos.

**Estrategia Clave:** **NO EMPEZAR DE CERO.** El análisis del repositorio confirma que el proyecto ya cuenta con una base funcional sólida. La estrategia es **evolucionar y expandir** la implementación actual.

### **Estado Actual del Proyecto:**
- ✅ **Autenticación:** Sistema completo con Supabase (registro con OTP, gestión de sesión).
- ✅ **Base de Datos:** Tablas `solicitudes_credito` y `profiles` ya en uso.
- ✅ **Roles:** Sistema de roles (`cliente`, `analista`, `admin`) implementado con RLS.
- ✅ **Dashboard:** Estructura funcional por roles en `src/app/dashboard/(roles)/`.
- ✅ **UI:** Componentes del UI Kit (AdminLayout, Drawer, Header) ya integrados.

---

## **PARTE 1: CONFIGURACIÓN DE SUPABASE Y MIGRACIÓN DE BASE DE DATOS**

Esta es la primera y más crítica fase. Asegura que la base de datos tenga la estructura necesaria para soportar el flujo completo de 7 pasos.

### **Paso 1.1: Ejecutar el Script de Migración SQL**

**Instrucciones:**
1.  Accede a tu proyecto en el [panel de Supabase](https://supabase.com/dashboard).
2.  En el menú de la izquierda, ve a **SQL Editor**.
3.  Haz clic en **+ New query**.
4.  Copia el contenido completo del siguiente script SQL y pégalo en el editor.
5.  Haz clic en el botón **RUN**.

**Script SQL de Migración:**

```sql
-- ============================================
-- MIGRACIÓN: ACTUALIZACIÓN DE BASE DE DATOS CAPITALTA
-- ============================================
-- Este script actualiza la base de datos existente para incorporar
-- el sistema completo de gestión de créditos con el flujo de 7 pasos.
-- ============================================

-- ============================================
-- 1. TABLA: profiles (Crear o actualizar)
-- ============================================

-- Crear tabla profiles si no existe
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN (
    'cliente',
    'analista',
    'admin',
    'notario'
  )) DEFAULT 'cliente',
  nombre_completo TEXT,
  email TEXT,
  telefono TEXT,
  rfc TEXT,
  curp TEXT,
  direccion TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Añadir columna role si no existe (para bases de datos existentes)
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_schema = 'public' 
                 AND table_name = 'profiles' 
                 AND column_name = 'role') THEN
    ALTER TABLE public.profiles ADD COLUMN role TEXT NOT NULL DEFAULT 'cliente' 
      CHECK (role IN ('cliente', 'analista', 'admin', 'notario'));
  END IF;
END $$;

-- Añadir otras columnas si no existen
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_schema = 'public' 
                 AND table_name = 'profiles' 
                 AND column_name = 'telefono') THEN
    ALTER TABLE public.profiles ADD COLUMN telefono TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_schema = 'public' 
                 AND table_name = 'profiles' 
                 AND column_name = 'rfc') THEN
    ALTER TABLE public.profiles ADD COLUMN rfc TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_schema = 'public' 
                 AND table_name = 'profiles' 
                 AND column_name = 'curp') THEN
    ALTER TABLE public.profiles ADD COLUMN curp TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_schema = 'public' 
                 AND table_name = 'profiles' 
                 AND column_name = 'direccion') THEN
    ALTER TABLE public.profiles ADD COLUMN direccion TEXT;
  END IF;
END $$;

-- Índice para mejorar búsquedas por rol
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

-- Habilitar RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Políticas para profiles
DROP POLICY IF EXISTS "Usuarios ven su propio perfil" ON public.profiles;
CREATE POLICY "Usuarios ven su propio perfil"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Usuarios actualizan su propio perfil" ON public.profiles;
CREATE POLICY "Usuarios actualizan su propio perfil"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Staff ve todos los perfiles" ON public.profiles;
CREATE POLICY "Staff ve todos los perfiles"
  ON public.profiles FOR SELECT
  USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') IN ('analista', 'admin', 'notario')
  );

-- ============================================
-- 2. ACTUALIZAR: solicitudes_credito
-- ============================================

-- Añadir columnas nuevas si no existen
DO $$ 
BEGIN
  -- analista_id
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_schema = 'public' 
                 AND table_name = 'solicitudes_credito' 
                 AND column_name = 'analista_id') THEN
    ALTER TABLE public.solicitudes_credito 
      ADD COLUMN analista_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;
  END IF;
  
  -- objetivo_financiamiento
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_schema = 'public' 
                 AND table_name = 'solicitudes_credito' 
                 AND column_name = 'objetivo_financiamiento') THEN
    ALTER TABLE public.solicitudes_credito ADD COLUMN objetivo_financiamiento TEXT;
  END IF;
  
  -- fecha_ultima_actualizacion
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_schema = 'public' 
                 AND table_name = 'solicitudes_credito' 
                 AND column_name = 'fecha_ultima_actualizacion') THEN
    ALTER TABLE public.solicitudes_credito 
      ADD COLUMN fecha_ultima_actualizacion TIMESTAMPTZ DEFAULT NOW();
  END IF;
  
  -- monto_aprobado
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_schema = 'public' 
                 AND table_name = 'solicitudes_credito' 
                 AND column_name = 'monto_aprobado') THEN
    ALTER TABLE public.solicitudes_credito ADD COLUMN monto_aprobado NUMERIC(15, 2);
  END IF;
  
  -- plazo_aprobado
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_schema = 'public' 
                 AND table_name = 'solicitudes_credito' 
                 AND column_name = 'plazo_aprobado') THEN
    ALTER TABLE public.solicitudes_credito ADD COLUMN plazo_aprobado INTEGER;
  END IF;
  
  -- tasa_aprobada
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_schema = 'public' 
                 AND table_name = 'solicitudes_credito' 
                 AND column_name = 'tasa_aprobada') THEN
    ALTER TABLE public.solicitudes_credito ADD COLUMN tasa_aprobada NUMERIC(5, 2);
  END IF;
  
  -- motivo_rechazo
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_schema = 'public' 
                 AND table_name = 'solicitudes_credito' 
                 AND column_name = 'motivo_rechazo') THEN
    ALTER TABLE public.solicitudes_credito ADD COLUMN motivo_rechazo TEXT;
  END IF;
END $$;

-- Actualizar el constraint del campo estado para incluir los 7 pasos
ALTER TABLE public.solicitudes_credito DROP CONSTRAINT IF EXISTS solicitudes_credito_estado_check;
ALTER TABLE public.solicitudes_credito 
  ADD CONSTRAINT solicitudes_credito_estado_check 
  CHECK (estado IN (
    'borrador',
    'solicitud_iniciada',
    'integracion_expediente',
    'avaluo_en_proceso',
    'en_comite',
    'aprobado',
    'rechazado',
    'formalizacion_notarial',
    'cita_agendada',
    'cita_completada',
    'fondeo_en_proceso',
    'fondeado',
    'credito_activo',
    'credito_liquidado'
  ));

-- Índices adicionales
CREATE INDEX IF NOT EXISTS idx_solicitudes_analista_id ON public.solicitudes_credito(analista_id);
CREATE INDEX IF NOT EXISTS idx_solicitudes_estado ON public.solicitudes_credito(estado);

-- Actualizar políticas RLS para analistas (permitir ver solicitudes asignadas o sin asignar)
DROP POLICY IF EXISTS "Analistas ven solicitudes asignadas" ON public.solicitudes_credito;
CREATE POLICY "Analistas ven solicitudes asignadas"
  ON public.solicitudes_credito FOR SELECT
  USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'analista'
    AND (analista_id = auth.uid() OR analista_id IS NULL)
  );

DROP POLICY IF EXISTS "Analistas actualizan solicitudes asignadas" ON public.solicitudes_credito;
CREATE POLICY "Analistas actualizan solicitudes asignadas"
  ON public.solicitudes_credito FOR UPDATE
  USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'analista'
    AND analista_id = auth.uid()
  );

-- ============================================
-- 3. TABLA: documentos
-- ============================================

CREATE TABLE IF NOT EXISTS public.documentos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  solicitud_id UUID NOT NULL REFERENCES public.solicitudes_credito(id) ON DELETE CASCADE,
  tipo_documento TEXT NOT NULL CHECK (tipo_documento IN (
    'ine',
    'curp',
    'comprobante_domicilio',
    'estado_cuenta',
    'acta_constitutiva',
    'estados_financieros',
    'declaraciones_fiscales',
    'flujo_efectivo',
    'rfc',
    'poderes',
    'avaluo',
    'contrato',
    'escritura',
    'otro'
  )),
  nombre_archivo TEXT NOT NULL,
  url_archivo TEXT NOT NULL,
  estado TEXT NOT NULL CHECK (estado IN ('pendiente', 'subido', 'validado', 'rechazado')) DEFAULT 'pendiente',
  comentarios TEXT,
  subido_por UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  validado_por UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_documentos_solicitud_id ON public.documentos(solicitud_id);
CREATE INDEX IF NOT EXISTS idx_documentos_tipo ON public.documentos(tipo_documento);
CREATE INDEX IF NOT EXISTS idx_documentos_estado ON public.documentos(estado);

-- RLS
ALTER TABLE public.documentos ENABLE ROW LEVEL SECURITY;

-- Clientes ven documentos de sus solicitudes
DROP POLICY IF EXISTS "Clientes ven sus documentos" ON public.documentos;
CREATE POLICY "Clientes ven sus documentos"
  ON public.documentos FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.solicitudes_credito
      WHERE id = documentos.solicitud_id
      AND cliente_id = auth.uid()
    )
  );

-- Clientes pueden subir documentos
DROP POLICY IF EXISTS "Clientes suben documentos" ON public.documentos;
CREATE POLICY "Clientes suben documentos"
  ON public.documentos FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.solicitudes_credito
      WHERE id = documentos.solicitud_id
      AND cliente_id = auth.uid()
    )
    AND subido_por = auth.uid()
  );

-- Staff ve y gestiona documentos
DROP POLICY IF EXISTS "Staff gestiona documentos" ON public.documentos;
CREATE POLICY "Staff gestiona documentos"
  ON public.documentos FOR ALL
  USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') IN ('analista', 'admin', 'notario')
  );

-- ============================================
-- 4. TABLA: avaluos
-- ============================================

CREATE TABLE IF NOT EXISTS public.avaluos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  solicitud_id UUID NOT NULL REFERENCES public.solicitudes_credito(id) ON DELETE CASCADE,
  valor_inmueble NUMERIC(15, 2) NOT NULL CHECK (valor_inmueble > 0),
  situacion_legal TEXT,
  fecha_avaluo DATE NOT NULL,
  perito_nombre TEXT,
  documento_avaluo_id UUID REFERENCES public.documentos(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_avaluos_solicitud_id ON public.avaluos(solicitud_id);

-- RLS
ALTER TABLE public.avaluos ENABLE ROW LEVEL SECURITY;

-- Clientes ven avalúos de sus solicitudes
DROP POLICY IF EXISTS "Clientes ven sus avalúos" ON public.avaluos;
CREATE POLICY "Clientes ven sus avalúos"
  ON public.avaluos FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.solicitudes_credito
      WHERE id = avaluos.solicitud_id
      AND cliente_id = auth.uid()
    )
  );

-- Staff gestiona avalúos
DROP POLICY IF EXISTS "Staff gestiona avalúos" ON public.avaluos;
CREATE POLICY "Staff gestiona avalúos"
  ON public.avaluos FOR ALL
  USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') IN ('analista', 'admin')
  );

-- ============================================
-- 5. TABLA: citas_presenciales
-- (Diferente de la tabla 'citas' existente)
-- ============================================

CREATE TABLE IF NOT EXISTS public.citas_presenciales (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  solicitud_id UUID NOT NULL REFERENCES public.solicitudes_credito(id) ON DELETE CASCADE,
  cliente_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  fecha_cita TIMESTAMPTZ NOT NULL,
  ubicacion TEXT NOT NULL,
  estado TEXT NOT NULL CHECK (estado IN ('pendiente', 'confirmada', 'completada', 'cancelada')) DEFAULT 'pendiente',
  notas TEXT,
  completada_por UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_citas_presenciales_solicitud_id ON public.citas_presenciales(solicitud_id);
CREATE INDEX IF NOT EXISTS idx_citas_presenciales_cliente_id ON public.citas_presenciales(cliente_id);
CREATE INDEX IF NOT EXISTS idx_citas_presenciales_fecha ON public.citas_presenciales(fecha_cita);
CREATE INDEX IF NOT EXISTS idx_citas_presenciales_estado ON public.citas_presenciales(estado);

-- RLS
ALTER TABLE public.citas_presenciales ENABLE ROW LEVEL SECURITY;

-- Clientes ven sus propias citas
DROP POLICY IF EXISTS "Clientes ven sus citas" ON public.citas_presenciales;
CREATE POLICY "Clientes ven sus citas"
  ON public.citas_presenciales FOR SELECT
  USING (cliente_id = auth.uid());

-- Clientes pueden crear citas
DROP POLICY IF EXISTS "Clientes crean citas" ON public.citas_presenciales;
CREATE POLICY "Clientes crean citas"
  ON public.citas_presenciales FOR INSERT
  WITH CHECK (
    cliente_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM public.solicitudes_credito
      WHERE id = citas_presenciales.solicitud_id
      AND cliente_id = auth.uid()
    )
  );

-- Staff ve y gestiona todas las citas
DROP POLICY IF EXISTS "Staff ve todas las citas" ON public.citas_presenciales;
CREATE POLICY "Staff ve todas las citas"
  ON public.citas_presenciales FOR SELECT
  USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') IN ('analista', 'admin', 'notario')
  );

DROP POLICY IF EXISTS "Staff actualiza citas" ON public.citas_presenciales;
CREATE POLICY "Staff actualiza citas"
  ON public.citas_presenciales FOR UPDATE
  USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') IN ('admin', 'notario')
  );

-- ============================================
-- 6. TABLA: creditos_activos
-- ============================================

CREATE TABLE IF NOT EXISTS public.creditos_activos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  solicitud_id UUID NOT NULL REFERENCES public.solicitudes_credito(id) ON DELETE CASCADE,
  cliente_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  monto_credito NUMERIC(15, 2) NOT NULL CHECK (monto_credito > 0),
  plazo_meses INTEGER NOT NULL CHECK (plazo_meses > 0),
  tasa_interes NUMERIC(5, 2) NOT NULL CHECK (tasa_interes >= 0),
  fecha_inicio DATE NOT NULL,
  fecha_vencimiento DATE NOT NULL,
  saldo_actual NUMERIC(15, 2) NOT NULL CHECK (saldo_actual >= 0),
  estado TEXT NOT NULL CHECK (estado IN ('activo', 'vencido', 'reestructurado', 'liquidado')) DEFAULT 'activo',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_creditos_solicitud_id ON public.creditos_activos(solicitud_id);
CREATE INDEX IF NOT EXISTS idx_creditos_cliente_id ON public.creditos_activos(cliente_id);
CREATE INDEX IF NOT EXISTS idx_creditos_estado ON public.creditos_activos(estado);

-- RLS
ALTER TABLE public.creditos_activos ENABLE ROW LEVEL SECURITY;

-- Clientes ven sus propios créditos
DROP POLICY IF EXISTS "Clientes ven sus créditos" ON public.creditos_activos;
CREATE POLICY "Clientes ven sus créditos"
  ON public.creditos_activos FOR SELECT
  USING (cliente_id = auth.uid());

-- Staff gestiona créditos
DROP POLICY IF EXISTS "Staff gestiona créditos" ON public.creditos_activos;
CREATE POLICY "Staff gestiona créditos"
  ON public.creditos_activos FOR ALL
  USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') IN ('analista', 'admin')
  );

-- ============================================
-- 7. TABLA: pagos
-- ============================================

CREATE TABLE IF NOT EXISTS public.pagos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  credito_id UUID NOT NULL REFERENCES public.creditos_activos(id) ON DELETE CASCADE,
  numero_pago INTEGER NOT NULL CHECK (numero_pago > 0),
  fecha_programada DATE NOT NULL,
  fecha_pago_real DATE,
  monto_programado NUMERIC(15, 2) NOT NULL CHECK (monto_programado > 0),
  monto_pagado NUMERIC(15, 2) CHECK (monto_pagado >= 0),
  capital NUMERIC(15, 2) NOT NULL CHECK (capital >= 0),
  interes NUMERIC(15, 2) NOT NULL CHECK (interes >= 0),
  saldo_restante NUMERIC(15, 2) NOT NULL CHECK (saldo_restante >= 0),
  estado TEXT NOT NULL CHECK (estado IN ('pendiente', 'pagado', 'vencido')) DEFAULT 'pendiente',
  referencia_bancaria TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(credito_id, numero_pago)
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_pagos_credito_id ON public.pagos(credito_id);
CREATE INDEX IF NOT EXISTS idx_pagos_estado ON public.pagos(estado);
CREATE INDEX IF NOT EXISTS idx_pagos_fecha_programada ON public.pagos(fecha_programada);

-- RLS
ALTER TABLE public.pagos ENABLE ROW LEVEL SECURITY;

-- Clientes ven pagos de sus créditos
DROP POLICY IF EXISTS "Clientes ven sus pagos" ON public.pagos;
CREATE POLICY "Clientes ven sus pagos"
  ON public.pagos FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.creditos_activos
      WHERE id = pagos.credito_id
      AND cliente_id = auth.uid()
    )
  );

-- Staff gestiona pagos
DROP POLICY IF EXISTS "Staff gestiona pagos" ON public.pagos;
CREATE POLICY "Staff gestiona pagos"
  ON public.pagos FOR ALL
  USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') IN ('analista', 'admin')
  );

-- ============================================
-- 8. TABLA: comentarios_internos
-- ============================================

CREATE TABLE IF NOT EXISTS public.comentarios_internos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  solicitud_id UUID NOT NULL REFERENCES public.solicitudes_credito(id) ON DELETE CASCADE,
  usuario_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  comentario TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_comentarios_solicitud_id ON public.comentarios_internos(solicitud_id);
CREATE INDEX IF NOT EXISTS idx_comentarios_usuario_id ON public.comentarios_internos(usuario_id);

-- RLS
ALTER TABLE public.comentarios_internos ENABLE ROW LEVEL SECURITY;

-- Solo staff puede ver y crear comentarios internos
DROP POLICY IF EXISTS "Staff gestiona comentarios internos" ON public.comentarios_internos;
CREATE POLICY "Staff gestiona comentarios internos"
  ON public.comentarios_internos FOR ALL
  USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') IN ('analista', 'admin', 'notario')
  );

-- ============================================
-- 9. TABLA: notificaciones
-- ============================================

CREATE TABLE IF NOT EXISTS public.notificaciones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tipo TEXT NOT NULL CHECK (tipo IN ('info', 'warning', 'success', 'error')) DEFAULT 'info',
  titulo TEXT NOT NULL,
  mensaje TEXT NOT NULL,
  leida BOOLEAN NOT NULL DEFAULT FALSE,
  url_accion TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_notificaciones_usuario_id ON public.notificaciones(usuario_id);
CREATE INDEX IF NOT EXISTS idx_notificaciones_leida ON public.notificaciones(leida);

-- RLS
ALTER TABLE public.notificaciones ENABLE ROW LEVEL SECURITY;

-- Usuarios ven sus propias notificaciones
DROP POLICY IF EXISTS "Usuarios ven sus notificaciones" ON public.notificaciones;
CREATE POLICY "Usuarios ven sus notificaciones"
  ON public.notificaciones FOR SELECT
  USING (usuario_id = auth.uid());

-- Usuarios actualizan sus notificaciones
DROP POLICY IF EXISTS "Usuarios actualizan sus notificaciones" ON public.notificaciones;
CREATE POLICY "Usuarios actualizan sus notificaciones"
  ON public.notificaciones FOR UPDATE
  USING (usuario_id = auth.uid());

-- Sistema crea notificaciones
DROP POLICY IF EXISTS "Sistema crea notificaciones" ON public.notificaciones;
CREATE POLICY "Sistema crea notificaciones"
  ON public.notificaciones FOR INSERT
  WITH CHECK (TRUE);

-- ============================================
-- 10. TRIGGERS PARA updated_at
-- ============================================

-- Función para actualizar updated_at (si no existe)
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar trigger a todas las tablas con updated_at

DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_solicitudes_credito_updated_at_new ON public.solicitudes_credito;
CREATE TRIGGER update_solicitudes_credito_updated_at_new
  BEFORE UPDATE ON public.solicitudes_credito
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_documentos_updated_at ON public.documentos;
CREATE TRIGGER update_documentos_updated_at
  BEFORE UPDATE ON public.documentos
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_avaluos_updated_at ON public.avaluos;
CREATE TRIGGER update_avaluos_updated_at
  BEFORE UPDATE ON public.avaluos
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_citas_presenciales_updated_at ON public.citas_presenciales;
CREATE TRIGGER update_citas_presenciales_updated_at
  BEFORE UPDATE ON public.citas_presenciales
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_creditos_activos_updated_at ON public.creditos_activos;
CREATE TRIGGER update_creditos_activos_updated_at
  BEFORE UPDATE ON public.creditos_activos
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_pagos_updated_at ON public.pagos;
CREATE TRIGGER update_pagos_updated_at
  BEFORE UPDATE ON public.pagos
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- 11. FUNCIÓN: Crear perfil automáticamente
-- ============================================

-- Actualizar la función para crear perfiles con rol desde user_metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, nombre_completo, role, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'nombre_completo'),
    COALESCE(NEW.raw_user_meta_data->>'role', 'cliente'),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recrear trigger (drop si existe)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- FIN DE LA MIGRACIÓN
-- ============================================
```

### **Paso 1.2: Crear el Bucket de Storage**

Para almacenar los documentos de los usuarios (INE, estados de cuenta, etc.), necesitas un bucket en Supabase Storage.

**Instrucciones:**
1.  En el panel de Supabase, ve a **Storage**.
2.  Haz clic en **Create a new bucket**.
3.  Nombra el bucket exactamente: `documentos-credito`.
4.  **IMPORTANTE:** Haz clic en el bucket recién creado, ve a la pestaña **Policies** y asegúrate de que las políticas permitan a los usuarios autenticados subir archivos. Puedes usar las plantillas de Supabase para esto.

---

## **PARTE 2: INSTRUCCIONES DE IMPLEMENTACIÓN PARA EL IDE TRAE**

Una vez que la base de datos esté lista, abre el proyecto en el IDE Trae y proporciónale las siguientes instrucciones fase por fase.

### **FASE 1: EXPANDIR EL DASHBOARD DEL CLIENTE**

#### **1.1. Mejorar el StatusWidget (Indicador de Progreso de 7 Pasos)**

**Archivo a modificar:** `src/components/dashboard/cliente/StatusWidget.jsx`

**Objetivo:** Transformar el widget simple actual en un componente visual que muestre el progreso a través de los 7 pasos.

**Diseño:**
- Utiliza el componente `Stepper` de Material-UI (orientación vertical en mobile, horizontal en desktop).
- Define los 7 pasos como un array:
  ```javascript
  const PASOS_CREDITO = [
    { id: 'solicitud_iniciada', label: 'Solicitud Inicial', icon: <RequestPageIcon /> },
    { id: 'integracion_expediente', label: 'Integración de Expediente', icon: <FolderIcon /> },
    { id: 'avaluo_en_proceso', label: 'Avalúo de Garantía', icon: <HomeIcon /> },
    { id: 'en_comite', label: 'Comité de Crédito', icon: <GroupsIcon /> },
    { id: 'formalizacion_notarial', label: 'Formalización Notarial', icon: <GavelIcon /> },
    { id: 'fondeo_en_proceso', label: 'Fondeo', icon: <AccountBalanceIcon /> },
    { id: 'credito_activo', label: 'Crédito Activo', icon: <CheckCircleIcon /> }
  ];
  ```
- Mapea el `estado` actual de la solicitud al índice del paso correspondiente.
- Muestra un mensaje descriptivo del paso actual.
- Añade botones de acción según el paso:
  - Paso 2: "Subir Documentos" → Redirige a `/dashboard/cliente/documentos`
  - Paso 5: "Agendar Cita" → Redirige a `/dashboard/cliente/citas`
  - Paso 7: "Ver Mi Crédito" → Redirige a `/dashboard/cliente/creditos`

#### **1.2. Implementar Módulo de Carga de Documentos**

**Archivo nuevo:** `src/app/dashboard/(roles)/cliente/documentos/page.jsx`

**Objetivo:** Permitir al cliente subir los documentos requeridos para su solicitud.

**Componentes:**
1.  **Lista de Documentos Requeridos:** Obtén la solicitud activa del cliente y determina qué documentos son necesarios según el `tipo_credito`.
2.  **Componente de Carga:** Utiliza `react-dropzone` o un componente de Material-UI para drag & drop.
3.  **Lógica de Subida:**
    - Al seleccionar un archivo, súbelo a Supabase Storage (bucket: `documentos-credito`).
    - Crea un registro en la tabla `documentos` con los detalles del archivo.
4.  **Vista de Documentos Subidos:** Muestra una tabla o lista con los documentos ya subidos, su estado (pendiente, validado, rechazado) y comentarios del analista si los hay.

#### **1.3. Implementar Módulo de Agendamiento de Citas**

**Archivo nuevo:** `src/app/dashboard/(roles)/cliente/citas/page.jsx`

**Objetivo:** Permitir al cliente agendar la cita presencial para firma de contrato (Paso 5).

**Componentes:**
1.  **Verificación de Elegibilidad:** Solo mostrar el calendario si la solicitud está en estado `formalizacion_notarial`.
2.  **Calendario Interactivo:** Utiliza `react-big-calendar` o `@mui/x-date-pickers`.
3.  **Selección de Fecha y Hora:** Muestra las fechas y horarios disponibles.
4.  **Formulario de Confirmación:**
    - Al confirmar, inserta un registro en la tabla `citas_presenciales`.
    - Actualiza el estado de la solicitud a `cita_agendada`.
    - Envía una notificación al cliente.

### **FASE 2: EXPANDIR EL DASHBOARD DEL ANALISTA**

#### **2.1. Transformar el Modal de Detalle en un Centro de Gestión**

**Archivo a modificar:** `src/components/dashboard/analista/SolicitudesList.jsx`

**Objetivo:** El diálogo modal actual solo muestra información. Debe convertirse en un centro de gestión completo.

**Cambios:**
1.  **Añadir Pestañas (Tabs) al Modal:**
    - **Pestaña 1: Resumen** (lo que ya existe)
    - **Pestaña 2: Documentos**
    - **Pestaña 3: Avalúo**
    - **Pestaña 4: Análisis y Comité**
    - **Pestaña 5: Comentarios Internos**

2.  **Pestaña 2: Documentos**
    - Muestra una tabla con los documentos de la solicitud.
    - Para cada documento, añade botones: "Ver", "Validar", "Rechazar".

3.  **Pestaña 3: Avalúo**
    - Formulario para registrar el avalúo (valor, situación legal, perito, etc.).
    - Botón "Guardar Avalúo" (inserta en tabla `avaluos`).

4.  **Pestaña 4: Análisis y Comité**
    - Área de texto para que el analista escriba su resumen ejecutivo.
    - Botón "Enviar a Comité de Crédito" (actualiza estado a `en_comite`).

5.  **Pestaña 5: Comentarios Internos**
    - Lista de comentarios previos y campo para añadir nuevos.

### **FASE 3: IMPLEMENTAR EL DASHBOARD DEL ADMINISTRADOR**

#### **3.1. Vista del Comité de Crédito**

**Archivo nuevo:** `src/app/dashboard/(roles)/admin/comite/page.jsx`

**Objetivo:** Permitir al Comité aprobar o rechazar solicitudes.

**Componentes:**
1.  **Tabla de Solicitudes en Comité:** Filtra solicitudes con `estado = 'en_comite'`.
2.  **Modal de Decisión:** Muestra resumen completo de la solicitud, análisis del analista y datos del avalúo.
3.  **Formulario de Aprobación:** Campos para `monto_aprobado`, `plazo_aprobado`, `tasa_aprobada`.
4.  **Formulario de Rechazo:** Campo para `motivo_rechazo`.

#### **3.2. Gestión de Citas Presenciales**

**Archivo nuevo:** `src/app/dashboard/(roles)/admin/citas/page.jsx`

**Objetivo:** Administrar las citas agendadas por los clientes.

**Componentes:**
1.  **Calendario General:** Muestra todas las citas en un calendario (`react-big-calendar`).
2.  **Tabla de Citas:** Lista de citas con acciones (Ver Detalle, Marcar como Completada, Cancelar).

#### **3.3. Módulo de Fondeo**

**Archivo nuevo:** `src/app/dashboard/(roles)/admin/fondeo/page.jsx`

**Objetivo:** Gestionar la liberación de recursos.

**Componentes:**
1.  **Tabla de Créditos Listos para Fondeo:** Filtra solicitudes con `estado = 'cita_completada'`.
2.  **Modal de Fondeo:** Checklist de verificación y formulario para datos de transferencia.
3.  **Lógica de Fondeo:**
    - Actualiza estado de solicitud a `fondeado`.
    - Inserta en `creditos_activos`.
    - Genera la tabla de amortización (inserta registros en `pagos`).

### **FASE 4: CRÉDITOS ACTIVOS, PAGOS Y NOTIFICACIONES**

#### **4.1. Vista de Créditos Activos del Cliente**

**Archivo nuevo:** `src/app/dashboard/(roles)/cliente/creditos/page.jsx`

**Objetivo:** Mostrar al cliente sus créditos activos y el calendario de pagos.

**Componentes:**
1.  **Card de Resumen del Crédito:** Monto, saldo, tasa, próximo pago.
2.  **Tabla de Amortización:** Lista de todos los pagos (programados, pagados, vencidos).

#### **4.2. Sistema de Notificaciones**

**Archivo a modificar:** `src/layouts/AdminLayout/Header/HeaderContent/Notification.jsx`

**Objetivo:** Mostrar notificaciones en tiempo real.

**Implementación:**
1.  Obtén las notificaciones no leídas del usuario desde la tabla `notificaciones`.
2.  Muestra un badge con el contador.
3.  Al hacer clic, abre un popover con la lista de notificaciones.
4.  Al hacer clic en una notificación, márcala como leída y redirige a la `url_accion`.

### **FASE 5: AJUSTES FINALES Y UX**

#### **5.1. Menú Dinámico por Rol**

**Archivo nuevo:** `src/menu-items/index.js`

**Objetivo:** Mostrar diferentes opciones en el menú lateral según el rol del usuario.

**Implementación:**
- Crea una función `getMenuItemsByRole(role)` que devuelva un array de objetos de menú.
- Modifica el componente del Drawer para que llame a esta función y renderice el menú dinámicamente.

#### **5.2. Dependencias a Instalar**

Ejecuta los siguientes comandos en tu terminal:

```bash
pnpm add react-dropzone
pnpm add @mui/x-date-pickers
pnpm add react-big-calendar
pnpm add date-fns
```

---

## **PARTE 3: FUNCIONES AUXILIARES Y GUÍAS DE REFERENCIA**

### **Función: Generar Tabla de Amortización**

Crea un archivo `src/utils/amortizacion.js` y añade esta función. Úsala en el módulo de fondeo.

```javascript
export function generarTablaAmortizacion(monto, plazoMeses, tasaAnual, fechaInicio) {
  const tasaMensual = tasaAnual / 12 / 100;
  const pagoMensual = (monto * tasaMensual * Math.pow(1 + tasaMensual, plazoMeses)) / 
                      (Math.pow(1 + tasaMensual, plazoMeses) - 1);
  
  let saldo = monto;
  const pagos = [];
  const inicio = new Date(fechaInicio);
  
  for (let i = 1; i <= plazoMeses; i++) {
    const interes = saldo * tasaMensual;
    const capital = pagoMensual - interes;
    saldo -= capital;
    
    const fechaPago = new Date(inicio);
    fechaPago.setMonth(fechaPago.getMonth() + i);
    
    pagos.push({
      numero_pago: i,
      fecha_programada: fechaPago.toISOString().split('T')[0],
      monto_programado: Math.round(pagoMensual * 100) / 100,
      capital: Math.round(capital * 100) / 100,
      interes: Math.round(interes * 100) / 100,
      saldo_restante: Math.max(0, Math.round(saldo * 100) / 100),
      estado: 'pendiente'
    });
  }
  
  return pagos;
}
```

### **Función: Subir Archivo a Storage**

Crea un archivo `src/utils/storage.js` y añade esta función. Úsala en el módulo de carga de documentos.

```javascript
import { createSupabaseBrowserClient } from '@/utils/supabaseClient';

export async function subirDocumento(file, solicitudId, tipoDocumento, userId) {
  const supabase = createSupabaseBrowserClient();
  
  const extension = file.name.split('.').pop();
  const fileName = `${solicitudId}/${tipoDocumento}_${Date.now()}.${extension}`;
  
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('documentos-credito')
    .upload(fileName, file);
  
  if (uploadError) {
    throw new Error('Error al subir archivo: ' + uploadError.message);
  }
  
  const { data: { publicUrl } } = supabase.storage
    .from('documentos-credito')
    .getPublicUrl(fileName);
  
  const { data: docData, error: docError } = await supabase
    .from('documentos')
    .insert({
      solicitud_id: solicitudId,
      tipo_documento: tipoDocumento,
      nombre_archivo: file.name,
      url_archivo: publicUrl,
      estado: 'subido',
      subido_por: userId
    })
    .select()
    .single();
  
  if (docError) {
    throw new Error('Error al registrar documento: ' + docError.message);
  }
  
  return docData;
}
```

### **Mapeo de Estados del Flujo de 7 Pasos**

| Paso | Estado en DB | Descripción |
| :--- | :--- | :--- |
| 1 | `solicitud_iniciada` | Solicitud inicial creada |
| 2 | `integracion_expediente` | Subiendo y validando documentos |
| 3 | `avaluo_en_proceso` | Coordinando y registrando avalúo |
| 4 | `en_comite` | En revisión del comité de crédito |
| 4 | `aprobado` / `rechazado` | Decisión del comité |
| 5 | `formalizacion_notarial` | Preparando documentos para firma |
| 5 | `cita_agendada` / `cita_completada` | Cita presencial para firma |
| 6 | `fondeo_en_proceso` / `fondeado` | Liberación de recursos |
| 7 | `credito_activo` / `credito_liquidado` | Seguimiento y cobranza |

---

## **CONCLUSIÓN**

Este documento contiene todas las instrucciones necesarias para culminar el proyecto. Siguiendo estas fases en orden, podrás expandir la aplicación existente de manera estructurada y eficiente, aprovechando todo el trabajo ya realizado. ¡Éxito en la implementación!
