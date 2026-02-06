# ARQUITECTURA DASHBOARD MULTI-ROL - CAPITALTA

## CONTEXTO DEL PROYECTO

**Proyecto actual:** https://ui-capitalta.vercel.app/  
**Repositorio:** https://github.com/abalderas10/ui_capitalta.git  
**Stack tecnológico:**
- Next.js 16.1.1 + React 19.2.3
- Material-UI 7.3.6
- Supabase (autenticación, base de datos)
- Framer Motion (animaciones)
- React Hook Form (formularios)

**Componentes de dashboard disponibles:** SaasAble UI Kit (javascript_uikit_2.0.0-uexbfy)

---

## RESPUESTA A LA PREGUNTA: ¿MISMO PROYECTO O PROYECTO SEPARADO?

### **RECOMENDACIÓN: TRABAJAR EN EL MISMO PROYECTO**

**Razones:**

1. **Integración con Supabase:** Ya tienes la configuración de Supabase funcionando en el proyecto actual
2. **Autenticación unificada:** Los usuarios pueden navegar entre el sitio público y su dashboard sin re-autenticarse
3. **Componentes compartidos:** Puedes reutilizar componentes, estilos y utilidades
4. **Despliegue unificado:** Un solo dominio, una sola configuración de Vercel
5. **Experiencia de usuario fluida:** Transición natural desde "Solicitar Crédito" → Dashboard del cliente

**Estructura recomendada:**
```
ui_capitalta/
├── src/
│   ├── app/
│   │   ├── (landings)/          # Sitio público (ya existe)
│   │   ├── auth/                # Autenticación (ya existe)
│   │   ├── dashboard/           # 🆕 Dashboard multi-rol
│   │   │   ├── cliente/         # Dashboard del cliente
│   │   │   ├── admin/           # Dashboard del administrador
│   │   │   ├── analista/        # Dashboard del analista de crédito
│   │   │   ├── notario/         # Dashboard del notario (opcional)
│   │   │   └── layout.jsx       # Layout compartido del dashboard
│   │   ├── admin/               # Admin actual (migrar a dashboard/admin)
│   │   └── mi-cuenta/           # Cuenta del usuario (ya existe)
```

---

## ROLES Y PERMISOS

### 1. **CLIENTE (Solicitante de Crédito)**

**Permisos:**
- Ver su propio expediente y solicitudes
- Subir documentos requeridos
- Actualizar datos personales y empresariales
- Ver el estado de su solicitud (7 pasos)
- Agendar cita presencial (Paso 5)
- Recibir notificaciones
- Descargar documentos firmados

**No puede:**
- Ver solicitudes de otros clientes
- Aprobar o rechazar créditos
- Acceder a panel administrativo

---

### 2. **ANALISTA DE CRÉDITO**

**Permisos:**
- Ver todas las solicitudes asignadas
- Revisar expedientes completos
- Solicitar documentación adicional
- Actualizar el estado de las solicitudes (Pasos 1-4)
- Agregar comentarios y notas internas
- Generar reportes de análisis
- Enviar solicitudes al Comité de Crédito

**No puede:**
- Aprobar créditos (solo el Comité)
- Modificar datos de otros analistas
- Acceder a configuración del sistema

---

### 3. **ADMINISTRADOR / COMITÉ DE CRÉDITO**

**Permisos:**
- Ver todas las solicitudes del sistema
- Aprobar o rechazar créditos (Paso 4)
- Asignar solicitudes a analistas
- Gestionar usuarios y roles
- Ver métricas y reportes globales
- Configurar parámetros del sistema
- Gestionar citas presenciales
- Acceder a logs y auditoría

---

### 4. **NOTARIO (Opcional - Futuro)**

**Permisos:**
- Ver solicitudes aprobadas asignadas
- Actualizar estado de formalización (Paso 5)
- Subir documentos notariales
- Confirmar citas presenciales

---

## PROCESO OPERATIVO DE 7 PASOS - FLUJO DEL DASHBOARD

### **PASO 1: SOLICITUD INICIAL**

**Responsable:** Cliente  
**Estado:** `solicitud_iniciada`

**Acciones del cliente:**
1. Completar formulario de solicitud (datos básicos)
2. Seleccionar tipo de crédito (Simple, Empresarial, Revolvente, Venta Key)
3. Indicar monto y plazo deseado
4. Definir objetivo del financiamiento

**Vista del dashboard del cliente:**
- Formulario guiado paso a paso
- Indicador de progreso (1/7)
- Botón "Guardar borrador" y "Enviar solicitud"

**Vista del dashboard del analista:**
- Nueva solicitud aparece en "Solicitudes Pendientes"
- Notificación de nueva solicitud

---

### **PASO 2: INTEGRACIÓN DE EXPEDIENTE**

**Responsable:** Cliente (sube docs) + Analista (valida)  
**Estado:** `integracion_expediente`

**Acciones del cliente:**
1. Subir documentos requeridos:
   - **Personales:** INE, CURP, comprobante de domicilio, estado de cuenta
   - **Financieros:** Estados financieros, declaraciones fiscales, flujo de efectivo
   - **Legales:** Acta constitutiva (empresas), poderes, RFC

**Vista del dashboard del cliente:**
- Lista de documentos requeridos con status (pendiente/subido/validado/rechazado)
- Drag & drop para subir archivos
- Indicador de progreso del expediente (ej: 7/12 documentos)
- Notificaciones si el analista solicita documentos adicionales

**Acciones del analista:**
1. Revisar documentos subidos
2. Validar o rechazar documentos (con comentarios)
3. Solicitar documentación adicional si es necesario
4. Marcar expediente como "Completo y Validado"

**Vista del dashboard del analista:**
- Lista de expedientes en revisión
- Visor de documentos (PDF, imágenes)
- Botones: "Validar", "Rechazar", "Solicitar adicional"
- Checklist de documentos obligatorios

---

### **PASO 3: AVALÚO Y VERIFICACIÓN DE GARANTÍA**

**Responsable:** Analista + Tercero (Perito valuador)  
**Estado:** `avaluo_en_proceso`

**Acciones del analista:**
1. Coordinar avalúo profesional de la garantía
2. Verificar situación legal del inmueble
3. Subir reporte de avalúo al expediente
4. Validar que el valor de referencia sea suficiente

**Vista del dashboard del cliente:**
- Mensaje: "Tu garantía está siendo evaluada por un perito profesional"
- Fecha estimada de avalúo
- Indicador de progreso (3/7)

**Vista del dashboard del analista:**
- Formulario para registrar datos del avalúo:
  - Valor del inmueble
  - Situación legal (libre de gravamen, etc.)
  - Fecha de avalúo
  - Perito asignado
- Subir PDF del reporte de avalúo
- Botón "Marcar avalúo como completo"

---

### **PASO 4: REVISIÓN Y APROBACIÓN POR COMITÉ DE CRÉDITO**

**Responsable:** Comité de Crédito (Admin)  
**Estado:** `en_comite` → `aprobado` o `rechazado`

**Acciones del analista:**
1. Preparar resumen ejecutivo de la solicitud
2. Enviar solicitud al Comité de Crédito
3. Incluir análisis de capacidad de pago y riesgos

**Acciones del comité (Admin):**
1. Revisar expediente completo
2. Analizar capacidad de pago
3. Evaluar riesgos de la operación
4. Emitir resolución: **Aprobado** o **Rechazado**
5. Si es aprobado, definir condiciones finales (monto, plazo, tasa)

**Vista del dashboard del cliente:**
- Mensaje: "Tu solicitud está siendo evaluada por nuestro Comité de Crédito"
- Fecha estimada de resolución
- Indicador de progreso (4/7)
- **Si es aprobado:** Mostrar condiciones aprobadas y botón "Aceptar condiciones"
- **Si es rechazado:** Mostrar motivo y opciones (reestructurar, nueva solicitud)

**Vista del dashboard del admin:**
- Lista de solicitudes pendientes de aprobación
- Vista detallada del expediente:
  - Datos del cliente
  - Análisis del analista
  - Documentos
  - Reporte de avalúo
  - Score de riesgo (si aplica)
- Botones: "Aprobar", "Rechazar", "Solicitar más información"
- Formulario para definir condiciones finales

---

### **PASO 5: FORMALIZACIÓN NOTARIAL + CITA PRESENCIAL**

**Responsable:** Notario + Cliente  
**Estado:** `formalizacion_notarial` → `cita_agendada` → `cita_completada`

**Acciones del sistema:**
1. Generar contratos y escrituras preliminares
2. Enviar documentos al cliente para revisión
3. **Generar cita presencial para firma y entrega de garantía** ⚠️ **PASO CRÍTICO**

**Acciones del cliente:**
1. Revisar contratos y escrituras
2. **Agendar cita presencial** (seleccionar fecha y hora disponible)
3. Asistir a la cita para:
   - Firmar contrato
   - Entregar garantía (escrituras del inmueble)
   - Recibir copia de documentos firmados

**Vista del dashboard del cliente:**
- Visor de contratos y escrituras (PDF)
- Botón "Descargar contratos"
- **Módulo de agendamiento de cita:**
  - Calendario con fechas disponibles
  - Horarios disponibles
  - Ubicación de la oficina (mapa)
  - Botón "Confirmar cita"
- Recordatorios de la cita (email, SMS)
- Indicador de progreso (5/7)

**Vista del dashboard del admin/notario:**
- Lista de citas agendadas
- Calendario de citas
- Detalles de cada cita:
  - Cliente
  - Fecha y hora
  - Documentos a firmar
  - Status: Pendiente / Completada / Cancelada
- Botón "Marcar cita como completada"
- Subir documentos firmados

---

### **PASO 6: FONDEO O DISPOSICIÓN DE CRÉDITO**

**Responsable:** Admin + Área de Tesorería  
**Estado:** `fondeo_en_proceso` → `fondeado`

**Acciones del admin:**
1. Verificar condiciones previas al fondeo:
   - Contrato firmado
   - Garantía entregada
   - Documentos notariales completos
2. Autorizar liberación de recursos
3. Confirmar transferencia bancaria

**Acciones del cliente:**
1. Confirmar recepción de los recursos

**Vista del dashboard del cliente:**
- Mensaje: "Tu crédito está siendo procesado para liberación de recursos"
- Fecha estimada de fondeo
- **Notificación cuando se liberen los recursos:**
  - Monto transferido
  - Cuenta destino
  - Fecha de transferencia
- Botón "Confirmar recepción de recursos"
- Indicador de progreso (6/7)

**Vista del dashboard del admin:**
- Lista de créditos aprobados pendientes de fondeo
- Checklist de condiciones previas
- Formulario para registrar fondeo:
  - Monto transferido
  - Fecha de transferencia
  - Cuenta destino
  - Referencia bancaria
- Botón "Marcar como fondeado"

---

### **PASO 7: SEGUIMIENTO Y COBRANZA**

**Responsable:** Área de Cobranza + Cliente  
**Estado:** `credito_activo` → `credito_liquidado`

**Acciones del sistema:**
1. Generar tabla de amortización
2. Enviar recordatorios de pago
3. Registrar pagos realizados
4. Calcular saldos e intereses

**Acciones del cliente:**
1. Ver calendario de pagos
2. Realizar pagos (transferencia, SPEI, domiciliación)
3. Descargar estados de cuenta
4. Solicitar reestructuras (si aplica)

**Vista del dashboard del cliente:**
- **Resumen del crédito:**
  - Monto original
  - Saldo actual
  - Próximo pago (fecha y monto)
  - Pagos realizados / Pagos pendientes
- **Tabla de amortización** (descargable)
- **Historial de pagos**
- **Botón "Realizar pago"** (redirige a pasarela de pago)
- **Opciones:**
  - Solicitar reestructura
  - Solicitar nuevo crédito
  - Descargar estado de cuenta
- Indicador de progreso (7/7 - Crédito activo)

**Vista del dashboard del admin/cobranza:**
- Lista de créditos activos
- Filtros: Al corriente / Vencidos / Reestructurados
- Vista detallada de cada crédito:
  - Datos del cliente
  - Historial de pagos
  - Saldo actual
  - Días de mora (si aplica)
- Acciones:
  - Registrar pago manual
  - Enviar recordatorio de pago
  - Iniciar proceso de reestructura
  - Marcar como liquidado

---

## ESTRUCTURA DE LA BASE DE DATOS (SUPABASE)

### **Tablas principales:**

#### 1. **users** (ya existe en Supabase Auth)
- `id` (UUID, PK)
- `email`
- `created_at`
- `updated_at`

#### 2. **profiles** (extender datos del usuario)
- `id` (UUID, PK, FK a users.id)
- `role` (enum: 'cliente', 'analista', 'admin', 'notario')
- `nombre_completo`
- `telefono`
- `rfc`
- `curp`
- `direccion`
- `avatar_url`
- `created_at`
- `updated_at`

#### 3. **solicitudes_credito**
- `id` (UUID, PK)
- `cliente_id` (UUID, FK a users.id)
- `analista_id` (UUID, FK a users.id, nullable)
- `tipo_credito` (enum: 'simple', 'empresarial', 'revolvente', 'venta_key')
- `monto_solicitado` (numeric)
- `plazo_meses` (integer)
- `objetivo_financiamiento` (text)
- `estado` (enum: ver estados abajo)
- `fecha_solicitud` (timestamp)
- `fecha_ultima_actualizacion` (timestamp)
- `monto_aprobado` (numeric, nullable)
- `plazo_aprobado` (integer, nullable)
- `tasa_aprobada` (numeric, nullable)
- `motivo_rechazo` (text, nullable)
- `created_at`
- `updated_at`

**Estados posibles:**
- `borrador`
- `solicitud_iniciada`
- `integracion_expediente`
- `avaluo_en_proceso`
- `en_comite`
- `aprobado`
- `rechazado`
- `formalizacion_notarial`
- `cita_agendada`
- `cita_completada`
- `fondeo_en_proceso`
- `fondeado`
- `credito_activo`
- `credito_liquidado`

#### 4. **documentos**
- `id` (UUID, PK)
- `solicitud_id` (UUID, FK a solicitudes_credito.id)
- `tipo_documento` (enum: 'ine', 'curp', 'comprobante_domicilio', 'estado_cuenta', 'acta_constitutiva', 'estados_financieros', 'avaluo', 'contrato', 'escritura', etc.)
- `nombre_archivo`
- `url_archivo` (Supabase Storage)
- `estado` (enum: 'pendiente', 'subido', 'validado', 'rechazado')
- `comentarios` (text, nullable)
- `subido_por` (UUID, FK a users.id)
- `validado_por` (UUID, FK a users.id, nullable)
- `created_at`
- `updated_at`

#### 5. **avaluos**
- `id` (UUID, PK)
- `solicitud_id` (UUID, FK a solicitudes_credito.id)
- `valor_inmueble` (numeric)
- `situacion_legal` (text)
- `fecha_avaluo` (date)
- `perito_nombre` (text)
- `documento_avaluo_id` (UUID, FK a documentos.id)
- `created_at`
- `updated_at`

#### 6. **citas_presenciales**
- `id` (UUID, PK)
- `solicitud_id` (UUID, FK a solicitudes_credito.id)
- `cliente_id` (UUID, FK a users.id)
- `fecha_cita` (timestamp)
- `ubicacion` (text)
- `estado` (enum: 'pendiente', 'confirmada', 'completada', 'cancelada')
- `notas` (text, nullable)
- `completada_por` (UUID, FK a users.id, nullable)
- `created_at`
- `updated_at`

#### 7. **creditos_activos**
- `id` (UUID, PK)
- `solicitud_id` (UUID, FK a solicitudes_credito.id)
- `cliente_id` (UUID, FK a users.id)
- `monto_credito` (numeric)
- `plazo_meses` (integer)
- `tasa_interes` (numeric)
- `fecha_inicio` (date)
- `fecha_vencimiento` (date)
- `saldo_actual` (numeric)
- `estado` (enum: 'activo', 'vencido', 'reestructurado', 'liquidado')
- `created_at`
- `updated_at`

#### 8. **pagos**
- `id` (UUID, PK)
- `credito_id` (UUID, FK a creditos_activos.id)
- `numero_pago` (integer)
- `fecha_programada` (date)
- `fecha_pago_real` (date, nullable)
- `monto_programado` (numeric)
- `monto_pagado` (numeric, nullable)
- `capital` (numeric)
- `interes` (numeric)
- `saldo_restante` (numeric)
- `estado` (enum: 'pendiente', 'pagado', 'vencido')
- `referencia_bancaria` (text, nullable)
- `created_at`
- `updated_at`

#### 9. **comentarios_internos**
- `id` (UUID, PK)
- `solicitud_id` (UUID, FK a solicitudes_credito.id)
- `usuario_id` (UUID, FK a users.id)
- `comentario` (text)
- `created_at`

#### 10. **notificaciones**
- `id` (UUID, PK)
- `usuario_id` (UUID, FK a users.id)
- `tipo` (enum: 'info', 'warning', 'success', 'error')
- `titulo` (text)
- `mensaje` (text)
- `leida` (boolean, default: false)
- `url_accion` (text, nullable)
- `created_at`

---

## POLÍTICAS DE SEGURIDAD (ROW LEVEL SECURITY - RLS)

### **profiles**
```sql
-- Los clientes solo pueden ver y editar su propio perfil
CREATE POLICY "Clientes ven su propio perfil"
ON profiles FOR SELECT
USING (auth.uid() = id);

-- Analistas y admins pueden ver todos los perfiles
CREATE POLICY "Staff ve todos los perfiles"
ON profiles FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role IN ('analista', 'admin')
  )
);
```

### **solicitudes_credito**
```sql
-- Los clientes solo ven sus propias solicitudes
CREATE POLICY "Clientes ven sus solicitudes"
ON solicitudes_credito FOR SELECT
USING (cliente_id = auth.uid());

-- Analistas ven solicitudes asignadas o sin asignar
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

-- Admins ven todas las solicitudes
CREATE POLICY "Admins ven todas las solicitudes"
ON solicitudes_credito FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role = 'admin'
  )
);
```

### **documentos**
```sql
-- Los clientes solo ven documentos de sus solicitudes
CREATE POLICY "Clientes ven sus documentos"
ON documentos FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM solicitudes_credito
    WHERE id = documentos.solicitud_id
    AND cliente_id = auth.uid()
  )
);

-- Staff ve todos los documentos de solicitudes asignadas
CREATE POLICY "Staff ve documentos de solicitudes asignadas"
ON documentos FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM solicitudes_credito s
    JOIN profiles p ON p.id = auth.uid()
    WHERE s.id = documentos.solicitud_id
    AND (
      p.role IN ('admin', 'notario')
      OR (p.role = 'analista' AND s.analista_id = auth.uid())
    )
  )
);
```

---

## COMPONENTES DEL DASHBOARD (REUTILIZAR DE SAASABLE)

### **Componentes disponibles en el UI Kit:**

1. **Layout del Dashboard:**
   - Sidebar con navegación
   - Header con perfil de usuario
   - Breadcrumbs
   - Notificaciones

2. **Cards y Widgets:**
   - Card de resumen (para métricas)
   - Card de progreso (para el flujo de 7 pasos)
   - Card de documentos
   - Card de timeline (para historial)

3. **Tablas:**
   - Tabla de solicitudes
   - Tabla de documentos
   - Tabla de pagos
   - Filtros y búsqueda

4. **Formularios:**
   - Formulario de solicitud
   - Upload de archivos (drag & drop)
   - Validación en tiempo real

5. **Calendario:**
   - Para agendamiento de citas

6. **Modales:**
   - Confirmación de acciones
   - Vista previa de documentos

7. **Notificaciones:**
   - Toast notifications
   - Badge de notificaciones pendientes

---

## NAVEGACIÓN DEL DASHBOARD POR ROL

### **DASHBOARD DEL CLIENTE** (`/dashboard/cliente`)

**Sidebar:**
- 🏠 Inicio (resumen general)
- 📋 Mis Solicitudes
- 📄 Mis Documentos
- 📅 Mis Citas
- 💳 Mis Créditos Activos
- 💰 Realizar Pago
- 👤 Mi Perfil
- 🔔 Notificaciones

**Página de Inicio:**
- Card de bienvenida
- Resumen de solicitudes activas
- Próximos pagos
- Próximas citas
- Acciones rápidas: "Nueva solicitud", "Subir documento"

---

### **DASHBOARD DEL ANALISTA** (`/dashboard/analista`)

**Sidebar:**
- 🏠 Inicio (resumen general)
- 📋 Solicitudes Asignadas
- 📥 Solicitudes Pendientes de Asignar
- 📊 Reportes
- 👤 Mi Perfil
- 🔔 Notificaciones

**Página de Inicio:**
- Métricas:
  - Solicitudes asignadas
  - Solicitudes en revisión
  - Solicitudes completadas este mes
- Lista de solicitudes prioritarias
- Actividad reciente

---

### **DASHBOARD DEL ADMIN** (`/dashboard/admin`)

**Sidebar:**
- 🏠 Inicio (resumen general)
- 📋 Todas las Solicitudes
- ✅ Comité de Crédito (solicitudes pendientes de aprobación)
- 📅 Citas Presenciales
- 💳 Créditos Activos
- 💰 Cobranza
- 👥 Gestión de Usuarios
- 📊 Reportes y Métricas
- ⚙️ Configuración
- 🔔 Notificaciones

**Página de Inicio:**
- Métricas globales:
  - Solicitudes activas
  - Créditos otorgados este mes
  - Monto total desembolsado
  - Tasa de aprobación
  - Cartera vencida
- Gráficas:
  - Solicitudes por estado
  - Créditos por tipo
  - Evolución de la cartera
- Alertas:
  - Solicitudes urgentes
  - Pagos vencidos
  - Citas próximas

---

## FLUJO DE USUARIO: EJEMPLO COMPLETO

### **Escenario: Juan solicita un Crédito Simple**

1. **Juan visita capitalta.mx** (sitio público)
2. **Hace clic en "Solicitar Crédito"** → Redirige a `/auth/registro`
3. **Se registra** (email, contraseña) → Supabase crea usuario
4. **Completa su perfil** (nombre, teléfono, RFC) → Se crea registro en `profiles` con `role = 'cliente'`
5. **Redirige a `/dashboard/cliente`** → Ve su dashboard vacío
6. **Hace clic en "Nueva Solicitud"** → Abre formulario de solicitud
7. **Completa el formulario:**
   - Tipo de crédito: Simple
   - Monto: $500,000
   - Plazo: 24 meses
   - Objetivo: Consolidación de deudas
8. **Envía la solicitud** → Se crea registro en `solicitudes_credito` con `estado = 'solicitud_iniciada'`
9. **El sistema le muestra la lista de documentos requeridos** → Estado cambia a `integracion_expediente`
10. **Juan sube sus documentos** (INE, comprobante de domicilio, etc.) → Se crean registros en `documentos`
11. **Un analista recibe notificación** → Revisa los documentos
12. **El analista valida los documentos** → Cambia `estado` de documentos a `validado`
13. **El analista coordina el avalúo** → Estado cambia a `avaluo_en_proceso`
14. **Se sube el reporte de avalúo** → Se crea registro en `avaluos`
15. **El analista envía la solicitud al Comité** → Estado cambia a `en_comite`
16. **El admin (Comité) revisa y aprueba** → Estado cambia a `aprobado`, se llenan `monto_aprobado`, `plazo_aprobado`, `tasa_aprobada`
17. **Juan recibe notificación de aprobación** → Ve las condiciones aprobadas
18. **Juan acepta las condiciones** → Estado cambia a `formalizacion_notarial`
19. **El sistema genera contratos** → Se crean documentos tipo `contrato` y `escritura`
20. **Juan agenda cita presencial** → Se crea registro en `citas_presenciales` con `estado = 'pendiente'`
21. **Juan asiste a la cita** → Firma contrato y entrega garantía
22. **El notario marca la cita como completada** → Estado cambia a `cita_completada`
23. **El admin autoriza el fondeo** → Estado cambia a `fondeo_en_proceso`
24. **Se transfieren los recursos** → Estado cambia a `fondeado`, se crea registro en `creditos_activos`
25. **Juan confirma recepción** → Estado cambia a `credito_activo`
26. **El sistema genera la tabla de amortización** → Se crean registros en `pagos`
27. **Juan ve su calendario de pagos** → Puede realizar pagos desde el dashboard
28. **Juan realiza sus pagos mensuales** → Se actualizan registros en `pagos`
29. **Cuando liquida el crédito** → Estado cambia a `credito_liquidado`

---

## PRIORIDADES DE IMPLEMENTACIÓN

### **FASE 1: FUNDAMENTOS (Semana 1-2)**
1. Crear estructura de carpetas `/dashboard`
2. Implementar layout del dashboard (sidebar, header)
3. Crear tablas de Supabase
4. Configurar RLS (Row Level Security)
5. Implementar sistema de roles

### **FASE 2: DASHBOARD DEL CLIENTE (Semana 3-4)**
1. Página de inicio del cliente
2. Formulario de solicitud (Paso 1)
3. Módulo de carga de documentos (Paso 2)
4. Vista de estado de solicitud (indicador de progreso)
5. Módulo de agendamiento de citas (Paso 5)
6. Vista de créditos activos (Paso 7)

### **FASE 3: DASHBOARD DEL ANALISTA (Semana 5-6)**
1. Página de inicio del analista
2. Lista de solicitudes asignadas
3. Vista detallada de expediente
4. Módulo de validación de documentos
5. Módulo de avalúos
6. Envío a Comité de Crédito

### **FASE 4: DASHBOARD DEL ADMIN (Semana 7-8)**
1. Página de inicio del admin
2. Vista de Comité de Crédito (aprobación/rechazo)
3. Gestión de citas presenciales
4. Módulo de fondeo
5. Dashboard de métricas y reportes
6. Gestión de usuarios y roles

### **FASE 5: COBRANZA Y PAGOS (Semana 9-10)**
1. Generación de tabla de amortización
2. Módulo de pagos (integración con pasarela)
3. Recordatorios automáticos
4. Dashboard de cobranza
5. Reportes de cartera

### **FASE 6: NOTIFICACIONES Y OPTIMIZACIONES (Semana 11-12)**
1. Sistema de notificaciones en tiempo real
2. Emails automáticos
3. SMS (opcional)
4. Optimización de rendimiento
5. Testing y corrección de bugs

---

## CONSIDERACIONES TÉCNICAS

### **Autenticación y Autorización:**
- Usar Supabase Auth para autenticación
- Middleware de Next.js para proteger rutas del dashboard
- Verificar rol del usuario en cada página

### **Subida de archivos:**
- Usar Supabase Storage
- Validar tipo y tamaño de archivos
- Generar nombres únicos (UUID)
- Implementar drag & drop con `react-dropzone`

### **Notificaciones:**
- Usar Supabase Realtime para notificaciones en tiempo real
- Implementar sistema de notificaciones push (opcional)
- Emails con Supabase Functions o servicio externo (SendGrid, Resend)

### **Reportes y Exportación:**
- Generar PDFs con `react-pdf` o `jspdf`
- Exportar tablas a Excel con `xlsx`
- Gráficas con `recharts` o `chart.js`

### **Calendario de Citas:**
- Usar `react-big-calendar` o `fullcalendar`
- Integración con Google Calendar (opcional)

### **Pasarela de Pagos:**
- Integrar Stripe, Conekta o SPEI
- Webhooks para confirmar pagos

---

## RESPUESTA FINAL A TU PREGUNTA

**¿Es mejor trabajar en la misma IDE Trae o hacer otro proyecto de dashboard?**

### **RECOMENDACIÓN: MISMO PROYECTO**

**Ventajas:**
- ✅ Integración total con Supabase
- ✅ Autenticación unificada
- ✅ Componentes compartidos
- ✅ Despliegue más simple
- ✅ Experiencia de usuario fluida
- ✅ Un solo repositorio, un solo dominio

**Cómo proceder:**
1. Crear carpeta `/src/app/dashboard` en el proyecto actual
2. Migrar componentes del UI Kit a `/src/components/dashboard`
3. Crear las tablas en Supabase
4. Implementar las rutas protegidas
5. Desarrollar cada rol de forma incremental

---

## PRÓXIMOS PASOS

1. **Revisar y aprobar esta arquitectura**
2. **Crear las migraciones de Supabase** (SQL para crear tablas)
3. **Generar el prompt detallado para Trae** con instrucciones específicas
4. **Comenzar con la Fase 1** (fundamentos)

¿Te parece bien esta arquitectura? ¿Algún ajuste o consideración adicional?
