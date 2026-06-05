# PROMPT PARA TRAE - IMPLEMENTACIÓN DASHBOARD MULTI-ROL CAPITALTA

## OBJETIVO GENERAL

Implementar un **dashboard multi-rol** dentro del proyecto existente de Capitalta (`ui_capitalta`), siguiendo la arquitectura definida en `ARQUITECTURA_DASHBOARD_CAPITALTA.md`. El dashboard debe gestionar el flujo operativo de 7 pasos para la originación de créditos, integrándose con Supabase y utilizando los componentes del UI Kit SaasAble ya presente en el proyecto.

---

## CONTEXTO Y RECURSOS

- **Proyecto Base:** El trabajo se realizará sobre el repositorio clonado en `/home/ubuntu/ui_capitalta`.
- **Documento de Arquitectura:** La guía principal es el archivo `ARQUITECTURA_DASHBOARD_CAPITALTA.md`. **Debes seguirla estrictamente.**
- **Prompt Original:** El archivo `PROMPT_TRAE_CAPITALTA.md` contiene el contexto del branding y la estructura inicial del sitio público.
- **UI Kit:** Los componentes del dashboard están en `/home/ubuntu/ui_capitalta/javascript_uikit_2.0.0-uexbfy/full-version/src`.
- **Stack Tecnológico:** Next.js 16, React 19, Material-UI 7, Supabase.

---

## FASE 1: FUNDAMENTOS Y ESTRUCTURA (PRIORIDAD ALTA)

### 1.1. **Estructura de Carpetas**

Crea la siguiente estructura de directorios dentro de `/home/ubuntu/ui_capitalta/src/app/`:

```
/src/app/
└── dashboard/
    ├── (roles)/              # Directorio para agrupar las vistas de cada rol
    │   ├── admin/            # Dashboard del Administrador
    │   ├── analista/         # Dashboard del Analista de Crédito
    │   └── cliente/          # Dashboard del Cliente
    ├── api/                  # APIs específicas del dashboard
    └── layout.jsx            # Layout principal del dashboard (con sidebar y header)
```

### 1.2. **Layout Principal del Dashboard (`/dashboard/layout.jsx`)**

- **Objetivo:** Crear un layout reutilizable que muestre una barra lateral (sidebar) y una barra superior (header) en todas las páginas del dashboard.
- **Componentes a usar:** Reutiliza los componentes de `Sidebar` y `Header` del UI Kit (`javascript_uikit_2.0.0-uexbfy`).
- **Lógica de Roles:** El layout debe ser dinámico. La navegación del sidebar cambiará según el rol del usuario autenticado. Debes obtener el rol del usuario desde la sesión de Supabase.
- **Contenido del Header:** Debe mostrar el nombre del usuario, su rol y un menú de perfil (Mi Perfil, Cerrar Sesión).

### 1.3. **Middleware de Autenticación y Autorización**

- **Objetivo:** Proteger todas las rutas bajo `/dashboard`.
- **Implementación:** Crea (o modifica el existente) `src/middleware.js`.
- **Lógica:**
  1. Verifica si el usuario está autenticado usando la sesión de Supabase.
  2. Si no está autenticado, redirige a `/auth/login`.
  3. Si está autenticado, obtiene su rol de la tabla `profiles`.
  4. Verifica si la ruta a la que intenta acceder corresponde con su rol (ej: un 'cliente' no puede acceder a `/dashboard/admin`).
  5. Si el rol no corresponde, redirige a una página de error de acceso denegado o al dashboard principal de su rol.

### 1.4. **Página de Redirección (`/dashboard/page.jsx`)**

- **Objetivo:** Crear una página raíz para el dashboard que redirija al usuario a la vista correcta según su rol.
- **Lógica:**
  1. Obtiene el rol del usuario desde la sesión.
  2. Utiliza `redirect()` de Next.js para enviar al usuario a la ruta correspondiente (ej: `/dashboard/cliente`, `/dashboard/admin`).

---

## FASE 2: DASHBOARD DEL CLIENTE (`/dashboard/cliente`)

### 2.1. **Página Principal del Cliente (`/dashboard/cliente/page.jsx`)**

- **Objetivo:** Mostrar un resumen de la actividad del cliente.
- **Componentes:**
  - **Card de Bienvenida:** "Hola, [Nombre del Cliente]".
  - **Card de Solicitud Activa:** Muestra el estado actual de la solicitud más reciente (ej: "Paso 3/7: Avalúo en Proceso"). Si no hay solicitud, muestra un botón "Iniciar Nueva Solicitud".
  - **Card de Próximo Pago/Cita:** Muestra la fecha y monto del próximo pago o la fecha de la próxima cita agendada.
  - **Acciones Rápidas:** Botones para "Nueva Solicitud", "Subir Documentos", "Ver Mis Créditos".

### 2.2. **Flujo de Nueva Solicitud (Paso 1 y 2)**

- **Ruta:** `/dashboard/cliente/solicitud/nueva`
- **Objetivo:** Implementar el formulario de solicitud y la carga de documentos.
- **Componentes:**
  - **Formulario Multi-paso (Stepper):** Utiliza el componente `Stepper` de Material-UI.
    - **Paso 1: Datos de la Solicitud:** Formulario con `react-hook-form` para capturar tipo de crédito, monto, plazo y objetivo. Al enviar, crea un registro en la tabla `solicitudes_credito` con estado `borrador` o `solicitud_iniciada`.
    - **Paso 2: Carga de Documentos:**
      - Muestra una lista de documentos requeridos dinámicamente según el tipo de crédito.
      - Utiliza un componente de carga de archivos (drag & drop) para subir los documentos a Supabase Storage.
      - Cada archivo subido crea un registro en la tabla `documentos`.
      - Muestra el estado de cada documento (Pendiente, Subido, En Revisión).

### 2.3. **Vista de Estado de la Solicitud**

- **Ruta:** `/dashboard/cliente/solicitud/[id]`
- **Objetivo:** Mostrar el progreso de una solicitud específica a través de los 7 pasos.
- **Componentes:**
  - **Timeline o Stepper Visual:** Un componente que muestre los 7 pasos y resalte el paso actual.
  - **Detalles del Paso Actual:** Un área que muestre información relevante del estado actual (ej: "Tus documentos están siendo revisados por un analista").
  - **Historial de la Solicitud:** Una lista de eventos importantes (ej: "Documento 'INE' validado", "Solicitud enviada a Comité").

### 2.4. **Agendamiento de Cita (Paso 5)**

- **Objetivo:** Permitir al cliente agendar la cita presencial cuando la solicitud llega al estado `formalizacion_notarial`.
- **Componentes:**
  - **Calendario Interactivo:** Utiliza un componente de calendario (`react-big-calendar` o similar) que muestre las fechas y horarios disponibles (estos deben ser gestionados por el admin).
  - **Formulario de Confirmación:** Al seleccionar una fecha/hora, muestra un resumen y un botón "Confirmar Cita".
  - **Lógica:** Al confirmar, crea un registro en la tabla `citas_presenciales`.

---

## FASE 3: DASHBOARD DEL ANALISTA (`/dashboard/analista`)

### 3.1. **Página Principal del Analista (`/dashboard/analista/page.jsx`)**

- **Objetivo:** Mostrar un resumen de las tareas del analista.
- **Componentes:**
  - **Cards de Métricas:** "Solicitudes Asignadas", "Expedientes en Revisión", "Pendientes de Avalúo".
  - **Tabla de Solicitudes:** Una tabla con las solicitudes asignadas, con columnas para Cliente, Tipo de Crédito, Estado y Fecha. Debe ser ordenable y filtrable.

### 3.2. **Vista de Detalle de la Solicitud**

- **Ruta:** `/dashboard/analista/solicitud/[id]`
- **Objetivo:** Proporcionar al analista todas las herramientas para procesar una solicitud.
- **Componentes:**
  - **Layout con Pestañas (Tabs):**
    - **Pestaña 1: Resumen:** Datos del cliente y de la solicitud.
    - **Pestaña 2: Documentos:**
      - Visor de documentos (PDF, imágenes).
      - Botones para "Validar" o "Rechazar" cada documento (con un campo para comentarios).
      - Botón para "Solicitar Documento Adicional" (envía una notificación al cliente).
    - **Pestaña 3: Avalúo:** Formulario para registrar los datos del avalúo y subir el reporte.
    - **Pestaña 4: Análisis y Comité:** Un área de texto para que el analista escriba su resumen y un botón "Enviar a Comité de Crédito".
    - **Pestaña 5: Comentarios Internos:** Un chat o lista de comentarios solo visible para el staff.

---

## FASE 4: DASHBOARD DEL ADMINISTRADOR (`/dashboard/admin`)

### 4.1. **Vista del Comité de Crédito**

- **Ruta:** `/dashboard/admin/comite`
- **Objetivo:** Permitir al comité aprobar o rechazar solicitudes.
- **Componentes:**
  - **Tabla de Solicitudes en Comité:** Lista de solicitudes con estado `en_comite`.
  - **Vista de Decisión:** Al seleccionar una solicitud, muestra un resumen completo (datos, análisis del analista, avalúo) y los botones **"Aprobar"** y **"Rechazar"**.
    - Si se aprueba, debe mostrar un formulario para definir las condiciones finales (monto, plazo, tasa).
    - Si se rechaza, debe solicitar un motivo.

### 4.2. **Gestión de Citas**

- **Ruta:** `/dashboard/admin/citas`
- **Objetivo:** Administrar las citas presenciales.
- **Componentes:**
  - **Calendario General:** Muestra todas las citas agendadas.
  - **Tabla de Citas:** Lista de citas con estado (Pendiente, Completada, Cancelada).
  - **Acciones:** Botón para "Marcar como Completada" y para subir los documentos firmados.

### 4.3. **Módulo de Fondeo (Paso 6)**

- **Ruta:** `/dashboard/admin/fondeo`
- **Objetivo:** Gestionar la liberación de los recursos.
- **Componentes:**
  - **Tabla de Créditos Aprobados:** Lista de créditos con estado `cita_completada`.
  - **Checklist de Verificación:** Muestra una lista de condiciones (Contrato firmado, Garantía entregada) que deben cumplirse antes de fondear.
  - **Botón "Autorizar Fondeo":** Al hacer clic, cambia el estado a `fondeo_en_proceso` y luego a `fondeado` (simulado por ahora).

---

## INSTRUCCIONES ADICIONALES

- **Estado Global:** Utiliza `React Context` o `Zustand` para gestionar el estado global de la sesión del usuario (datos del perfil, rol, etc.).
- **Notificaciones:** Implementa notificaciones tipo "toast" para confirmar acciones (ej: "Documento subido con éxito", "Solicitud enviada").
- **Supabase Client:** Utiliza el cliente de Supabase ya configurado en el proyecto para todas las interacciones con la base de datos.
- **Seguridad:** Asegúrate de que todas las consultas a Supabase respeten las políticas de RLS definidas en la arquitectura. No expongas datos sensibles en el lado del cliente.
- **Estilos:** Utiliza `Material-UI` y `Emotion` para estilizar los componentes, siguiendo el branding de Capitalta (`#1c7c77` como color primario).

**COMIENZA CON LA FASE 1. Una vez completada, solicita la siguiente fase.**
