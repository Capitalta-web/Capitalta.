-- ============================================
-- MIGRACIONES DE SUPABASE - DASHBOARD CAPITALTA
-- ============================================
-- Este archivo contiene todas las migraciones necesarias para crear
-- las tablas y políticas de seguridad del dashboard multi-rol.
--
-- INSTRUCCIONES:
-- 1. Ejecuta este script en el editor SQL de Supabase
-- 2. Verifica que todas las tablas se hayan creado correctamente
-- 3. Prueba las políticas de RLS creando usuarios de prueba
-- ============================================

-- ============================================
-- 1. TABLA: profiles
-- Extiende los datos del usuario de Supabase Auth
-- ============================================

CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('cliente', 'analista', 'admin', 'notario')) DEFAULT 'cliente',
  nombre_completo TEXT,
  telefono TEXT,
  rfc TEXT,
  curp TEXT,
  direccion TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);

-- Trigger para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 2. TABLA: solicitudes_credito
-- Almacena las solicitudes de crédito de los clientes
-- ============================================

CREATE TABLE IF NOT EXISTS solicitudes_credito (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  analista_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  tipo_credito TEXT NOT NULL CHECK (tipo_credito IN ('simple', 'empresarial', 'revolvente', 'venta_key')),
  monto_solicitado NUMERIC(15, 2) NOT NULL CHECK (monto_solicitado > 0),
  plazo_meses INTEGER NOT NULL CHECK (plazo_meses > 0),
  objetivo_financiamiento TEXT,
  estado TEXT NOT NULL CHECK (estado IN (
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
  )) DEFAULT 'borrador',
  fecha_solicitud TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  fecha_ultima_actualizacion TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  monto_aprobado NUMERIC(15, 2),
  plazo_aprobado INTEGER,
  tasa_aprobada NUMERIC(5, 2),
  motivo_rechazo TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_solicitudes_cliente_id ON solicitudes_credito(cliente_id);
CREATE INDEX IF NOT EXISTS idx_solicitudes_analista_id ON solicitudes_credito(analista_id);
CREATE INDEX IF NOT EXISTS idx_solicitudes_estado ON solicitudes_credito(estado);
CREATE INDEX IF NOT EXISTS idx_solicitudes_tipo_credito ON solicitudes_credito(tipo_credito);

-- Trigger para actualizar updated_at
DROP TRIGGER IF EXISTS update_solicitudes_credito_updated_at ON solicitudes_credito;
CREATE TRIGGER update_solicitudes_credito_updated_at
  BEFORE UPDATE ON solicitudes_credito
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 3. TABLA: documentos
-- Almacena los documentos subidos por clientes y staff
-- ============================================

CREATE TABLE IF NOT EXISTS documentos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  solicitud_id UUID NOT NULL REFERENCES solicitudes_credito(id) ON DELETE CASCADE,
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
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_documentos_solicitud_id ON documentos(solicitud_id);
CREATE INDEX IF NOT EXISTS idx_documentos_tipo ON documentos(tipo_documento);
CREATE INDEX IF NOT EXISTS idx_documentos_estado ON documentos(estado);

-- Trigger para actualizar updated_at
DROP TRIGGER IF EXISTS update_documentos_updated_at ON documentos;
CREATE TRIGGER update_documentos_updated_at
  BEFORE UPDATE ON documentos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 4. TABLA: avaluos
-- Almacena información de avalúos de garantías
-- ============================================

CREATE TABLE IF NOT EXISTS avaluos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  solicitud_id UUID NOT NULL REFERENCES solicitudes_credito(id) ON DELETE CASCADE,
  valor_inmueble NUMERIC(15, 2) NOT NULL CHECK (valor_inmueble > 0),
  situacion_legal TEXT,
  fecha_avaluo DATE NOT NULL,
  perito_nombre TEXT,
  documento_avaluo_id UUID REFERENCES documentos(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_avaluos_solicitud_id ON avaluos(solicitud_id);

-- Trigger para actualizar updated_at
DROP TRIGGER IF EXISTS update_avaluos_updated_at ON avaluos;
CREATE TRIGGER update_avaluos_updated_at
  BEFORE UPDATE ON avaluos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 5. TABLA: citas_presenciales
-- Almacena las citas para firma de contratos
-- ============================================

CREATE TABLE IF NOT EXISTS citas_presenciales (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  solicitud_id UUID NOT NULL REFERENCES solicitudes_credito(id) ON DELETE CASCADE,
  cliente_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  fecha_cita TIMESTAMP WITH TIME ZONE NOT NULL,
  ubicacion TEXT NOT NULL,
  estado TEXT NOT NULL CHECK (estado IN ('pendiente', 'confirmada', 'completada', 'cancelada')) DEFAULT 'pendiente',
  notas TEXT,
  completada_por UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_citas_solicitud_id ON citas_presenciales(solicitud_id);
CREATE INDEX IF NOT EXISTS idx_citas_cliente_id ON citas_presenciales(cliente_id);
CREATE INDEX IF NOT EXISTS idx_citas_fecha ON citas_presenciales(fecha_cita);
CREATE INDEX IF NOT EXISTS idx_citas_estado ON citas_presenciales(estado);

-- Trigger para actualizar updated_at
DROP TRIGGER IF EXISTS update_citas_presenciales_updated_at ON citas_presenciales;
CREATE TRIGGER update_citas_presenciales_updated_at
  BEFORE UPDATE ON citas_presenciales
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 6. TABLA: creditos_activos
-- Almacena los créditos que han sido fondeados
-- ============================================

CREATE TABLE IF NOT EXISTS creditos_activos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  solicitud_id UUID NOT NULL REFERENCES solicitudes_credito(id) ON DELETE CASCADE,
  cliente_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  monto_credito NUMERIC(15, 2) NOT NULL CHECK (monto_credito > 0),
  plazo_meses INTEGER NOT NULL CHECK (plazo_meses > 0),
  tasa_interes NUMERIC(5, 2) NOT NULL CHECK (tasa_interes >= 0),
  fecha_inicio DATE NOT NULL,
  fecha_vencimiento DATE NOT NULL,
  saldo_actual NUMERIC(15, 2) NOT NULL CHECK (saldo_actual >= 0),
  estado TEXT NOT NULL CHECK (estado IN ('activo', 'vencido', 'reestructurado', 'liquidado')) DEFAULT 'activo',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_creditos_solicitud_id ON creditos_activos(solicitud_id);
CREATE INDEX IF NOT EXISTS idx_creditos_cliente_id ON creditos_activos(cliente_id);
CREATE INDEX IF NOT EXISTS idx_creditos_estado ON creditos_activos(estado);

-- Trigger para actualizar updated_at
DROP TRIGGER IF EXISTS update_creditos_activos_updated_at ON creditos_activos;
CREATE TRIGGER update_creditos_activos_updated_at
  BEFORE UPDATE ON creditos_activos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 7. TABLA: pagos
-- Almacena la tabla de amortización y pagos realizados
-- ============================================

CREATE TABLE IF NOT EXISTS pagos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  credito_id UUID NOT NULL REFERENCES creditos_activos(id) ON DELETE CASCADE,
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
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(credito_id, numero_pago)
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_pagos_credito_id ON pagos(credito_id);
CREATE INDEX IF NOT EXISTS idx_pagos_estado ON pagos(estado);
CREATE INDEX IF NOT EXISTS idx_pagos_fecha_programada ON pagos(fecha_programada);

-- Trigger para actualizar updated_at
DROP TRIGGER IF EXISTS update_pagos_updated_at ON pagos;
CREATE TRIGGER update_pagos_updated_at
  BEFORE UPDATE ON pagos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 8. TABLA: comentarios_internos
-- Almacena comentarios del staff sobre las solicitudes
-- ============================================

CREATE TABLE IF NOT EXISTS comentarios_internos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  solicitud_id UUID NOT NULL REFERENCES solicitudes_credito(id) ON DELETE CASCADE,
  usuario_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  comentario TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_comentarios_solicitud_id ON comentarios_internos(solicitud_id);
CREATE INDEX IF NOT EXISTS idx_comentarios_usuario_id ON comentarios_internos(usuario_id);

-- ============================================
-- 9. TABLA: notificaciones
-- Almacena notificaciones para los usuarios
-- ============================================

CREATE TABLE IF NOT EXISTS notificaciones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tipo TEXT NOT NULL CHECK (tipo IN ('info', 'warning', 'success', 'error')) DEFAULT 'info',
  titulo TEXT NOT NULL,
  mensaje TEXT NOT NULL,
  leida BOOLEAN NOT NULL DEFAULT FALSE,
  url_accion TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_notificaciones_usuario_id ON notificaciones(usuario_id);
CREATE INDEX IF NOT EXISTS idx_notificaciones_leida ON notificaciones(leida);

-- ============================================
-- POLÍTICAS DE SEGURIDAD (ROW LEVEL SECURITY)
-- ============================================

-- Habilitar RLS en todas las tablas
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE solicitudes_credito ENABLE ROW LEVEL SECURITY;
ALTER TABLE documentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE avaluos ENABLE ROW LEVEL SECURITY;
ALTER TABLE citas_presenciales ENABLE ROW LEVEL SECURITY;
ALTER TABLE creditos_activos ENABLE ROW LEVEL SECURITY;
ALTER TABLE pagos ENABLE ROW LEVEL SECURITY;
ALTER TABLE comentarios_internos ENABLE ROW LEVEL SECURITY;
ALTER TABLE notificaciones ENABLE ROW LEVEL SECURITY;

-- ============================================
-- POLÍTICAS PARA: profiles
-- ============================================

-- Los usuarios pueden ver su propio perfil
DROP POLICY IF EXISTS "Usuarios ven su propio perfil" ON profiles;
CREATE POLICY "Usuarios ven su propio perfil"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Los usuarios pueden actualizar su propio perfil
DROP POLICY IF EXISTS "Usuarios actualizan su propio perfil" ON profiles;
CREATE POLICY "Usuarios actualizan su propio perfil"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- El staff (analistas, admins, notarios) puede ver todos los perfiles
DROP POLICY IF EXISTS "Staff ve todos los perfiles" ON profiles;
CREATE POLICY "Staff ve todos los perfiles"
  ON profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('analista', 'admin', 'notario')
    )
  );

-- ============================================
-- POLÍTICAS PARA: solicitudes_credito
-- ============================================

-- Los clientes solo ven sus propias solicitudes
DROP POLICY IF EXISTS "Clientes ven sus solicitudes" ON solicitudes_credito;
CREATE POLICY "Clientes ven sus solicitudes"
  ON solicitudes_credito FOR SELECT
  USING (cliente_id = auth.uid());

-- Los clientes pueden crear solicitudes
DROP POLICY IF EXISTS "Clientes crean solicitudes" ON solicitudes_credito;
CREATE POLICY "Clientes crean solicitudes"
  ON solicitudes_credito FOR INSERT
  WITH CHECK (cliente_id = auth.uid());

-- Los clientes pueden actualizar sus solicitudes en estado borrador
DROP POLICY IF EXISTS "Clientes actualizan solicitudes en borrador" ON solicitudes_credito;
CREATE POLICY "Clientes actualizan solicitudes en borrador"
  ON solicitudes_credito FOR UPDATE
  USING (cliente_id = auth.uid() AND estado = 'borrador');

-- Los analistas ven solicitudes asignadas o sin asignar
DROP POLICY IF EXISTS "Analistas ven solicitudes asignadas" ON solicitudes_credito;
CREATE POLICY "Analistas ven solicitudes asignadas"
  ON solicitudes_credito FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role = 'analista'
    )
    AND (analista_id = auth.uid() OR analista_id IS NULL)
  );

-- Los analistas pueden actualizar solicitudes asignadas
DROP POLICY IF EXISTS "Analistas actualizan solicitudes asignadas" ON solicitudes_credito;
CREATE POLICY "Analistas actualizan solicitudes asignadas"
  ON solicitudes_credito FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role = 'analista'
    )
    AND analista_id = auth.uid()
  );

-- Los admins ven todas las solicitudes
DROP POLICY IF EXISTS "Admins ven todas las solicitudes" ON solicitudes_credito;
CREATE POLICY "Admins ven todas las solicitudes"
  ON solicitudes_credito FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role = 'admin'
    )
  );

-- Los admins pueden actualizar todas las solicitudes
DROP POLICY IF EXISTS "Admins actualizan todas las solicitudes" ON solicitudes_credito;
CREATE POLICY "Admins actualizan todas las solicitudes"
  ON solicitudes_credito FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role = 'admin'
    )
  );

-- ============================================
-- POLÍTICAS PARA: documentos
-- ============================================

-- Los clientes ven documentos de sus solicitudes
DROP POLICY IF EXISTS "Clientes ven sus documentos" ON documentos;
CREATE POLICY "Clientes ven sus documentos"
  ON documentos FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM solicitudes_credito
      WHERE id = documentos.solicitud_id
      AND cliente_id = auth.uid()
    )
  );

-- Los clientes pueden subir documentos a sus solicitudes
DROP POLICY IF EXISTS "Clientes suben documentos" ON documentos;
CREATE POLICY "Clientes suben documentos"
  ON documentos FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM solicitudes_credito
      WHERE id = documentos.solicitud_id
      AND cliente_id = auth.uid()
    )
    AND subido_por = auth.uid()
  );

-- El staff ve documentos de solicitudes asignadas o todas (admin)
DROP POLICY IF EXISTS "Staff ve documentos de solicitudes asignadas" ON documentos;
CREATE POLICY "Staff ve documentos de solicitudes asignadas"
  ON documentos FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM solicitudes_credito s
      JOIN profiles p ON p.id = auth.uid()
      WHERE s.id = documentos.solicitud_id
      AND (
        p.role = 'admin'
        OR p.role = 'notario'
        OR (p.role = 'analista' AND s.analista_id = auth.uid())
      )
    )
  );

-- El staff puede subir y actualizar documentos
DROP POLICY IF EXISTS "Staff gestiona documentos" ON documentos;
CREATE POLICY "Staff gestiona documentos"
  ON documentos FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('analista', 'admin', 'notario')
    )
  );

-- ============================================
-- POLÍTICAS PARA: avaluos
-- ============================================

-- Los clientes ven avalúos de sus solicitudes
DROP POLICY IF EXISTS "Clientes ven sus avalúos" ON avaluos;
CREATE POLICY "Clientes ven sus avalúos"
  ON avaluos FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM solicitudes_credito
      WHERE id = avaluos.solicitud_id
      AND cliente_id = auth.uid()
    )
  );

-- Solo el staff puede crear y actualizar avalúos
DROP POLICY IF EXISTS "Staff gestiona avalúos" ON avaluos;
CREATE POLICY "Staff gestiona avalúos"
  ON avaluos FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('analista', 'admin')
    )
  );

-- ============================================
-- POLÍTICAS PARA: citas_presenciales
-- ============================================

-- Los clientes ven sus propias citas
DROP POLICY IF EXISTS "Clientes ven sus citas" ON citas_presenciales;
CREATE POLICY "Clientes ven sus citas"
  ON citas_presenciales FOR SELECT
  USING (cliente_id = auth.uid());

-- Los clientes pueden crear citas para sus solicitudes
DROP POLICY IF EXISTS "Clientes crean citas" ON citas_presenciales;
CREATE POLICY "Clientes crean citas"
  ON citas_presenciales FOR INSERT
  WITH CHECK (
    cliente_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM solicitudes_credito
      WHERE id = citas_presenciales.solicitud_id
      AND cliente_id = auth.uid()
    )
  );

-- El staff ve todas las citas
DROP POLICY IF EXISTS "Staff ve todas las citas" ON citas_presenciales;
CREATE POLICY "Staff ve todas las citas"
  ON citas_presenciales FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('analista', 'admin', 'notario')
    )
  );

-- El staff puede actualizar citas
DROP POLICY IF EXISTS "Staff actualiza citas" ON citas_presenciales;
CREATE POLICY "Staff actualiza citas"
  ON citas_presenciales FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'notario')
    )
  );

-- ============================================
-- POLÍTICAS PARA: creditos_activos
-- ============================================

-- Los clientes ven sus propios créditos
DROP POLICY IF EXISTS "Clientes ven sus créditos" ON creditos_activos;
CREATE POLICY "Clientes ven sus créditos"
  ON creditos_activos FOR SELECT
  USING (cliente_id = auth.uid());

-- Solo el staff puede crear y actualizar créditos
DROP POLICY IF EXISTS "Staff gestiona créditos" ON creditos_activos;
CREATE POLICY "Staff gestiona créditos"
  ON creditos_activos FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('analista', 'admin')
    )
  );

-- ============================================
-- POLÍTICAS PARA: pagos
-- ============================================

-- Los clientes ven pagos de sus créditos
DROP POLICY IF EXISTS "Clientes ven sus pagos" ON pagos;
CREATE POLICY "Clientes ven sus pagos"
  ON pagos FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM creditos_activos
      WHERE id = pagos.credito_id
      AND cliente_id = auth.uid()
    )
  );

-- Solo el staff puede crear y actualizar pagos
DROP POLICY IF EXISTS "Staff gestiona pagos" ON pagos;
CREATE POLICY "Staff gestiona pagos"
  ON pagos FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('analista', 'admin')
    )
  );

-- ============================================
-- POLÍTICAS PARA: comentarios_internos
-- ============================================

-- Solo el staff puede ver y crear comentarios internos
DROP POLICY IF EXISTS "Staff gestiona comentarios internos" ON comentarios_internos;
CREATE POLICY "Staff gestiona comentarios internos"
  ON comentarios_internos FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('analista', 'admin', 'notario')
    )
  );

-- ============================================
-- POLÍTICAS PARA: notificaciones
-- ============================================

-- Los usuarios solo ven sus propias notificaciones
DROP POLICY IF EXISTS "Usuarios ven sus notificaciones" ON notificaciones;
CREATE POLICY "Usuarios ven sus notificaciones"
  ON notificaciones FOR SELECT
  USING (usuario_id = auth.uid());

-- Los usuarios pueden marcar sus notificaciones como leídas
DROP POLICY IF EXISTS "Usuarios actualizan sus notificaciones" ON notificaciones;
CREATE POLICY "Usuarios actualizan sus notificaciones"
  ON notificaciones FOR UPDATE
  USING (usuario_id = auth.uid());

-- El sistema (o staff) puede crear notificaciones
DROP POLICY IF EXISTS "Sistema crea notificaciones" ON notificaciones;
CREATE POLICY "Sistema crea notificaciones"
  ON notificaciones FOR INSERT
  WITH CHECK (TRUE);

-- ============================================
-- FUNCIÓN: Crear perfil automáticamente al registrarse
-- ============================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, role, nombre_completo)
  VALUES (NEW.id, 'cliente', NEW.raw_user_meta_data->>'nombre_completo');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para crear perfil automáticamente
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- FIN DE LAS MIGRACIONES
-- ============================================

-- Verificar que todas las tablas se hayan creado
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_type = 'BASE TABLE'
ORDER BY table_name;
