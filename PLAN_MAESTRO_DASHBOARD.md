# PLAN MAESTRO DE IMPLEMENTACIÓN - DASHBOARD CAPITALTA

Este documento centraliza el plan de desarrollo, estado actual y hoja de ruta para la implementación del dashboard multi-rol de Capitalta. Se basa en los documentos de arquitectura y prompts previamente definidos.

## 1. RESUMEN DEL PROYECTO

*   **Objetivo:** Implementar un dashboard multi-rol (Cliente, Analista, Admin) integrado en el proyecto actual `ui_capitalta` para gestionar el ciclo de vida de créditos de 7 pasos.
*   **Stack:** Next.js 16 (App Router), React 19, Material-UI 7, Supabase (Auth, DB, Storage).
*   **Recursos:** UI Kit SaasAble (`javascript_uikit_2.0.0-uexbfy`) para componentes visuales.

---

## 2. ESTADO ACTUAL (al 31/01/2026)

### ✅ Completado
*   [x] **Autenticación Básica:** Páginas de Login (`/auth/login`) y Registro (`/auth/signup`) creadas y localizadas.
*   [x] **API de Registro:** Endpoint server-side (`/api/auth/signup`) implementado para creación segura de usuarios.
*   [x] **Estructura de Carpetas:** Directorios base `/dashboard/(roles)` creados.
*   [x] **Script de Migración:** SQL (`MIGRACIONES_SUPABASE.sql`) redactado y corregido para ser idempotente (DROP IF EXISTS).
*   [x] **Corrección de Errores:** Solucionados problemas de 404, localización y dependencias (MUI Icons).

### 🚧 En Progreso / Pendiente Inmediato
*   [ ] Ejecución del script de migración en Supabase.
*   [ ] Integración visual del UI Kit (Theme, Layouts).
*   [ ] Implementación de lógica de redirección por rol.

---

## 3. HOJA DE RUTA DETALLADA

### FASE 1: FUNDAMENTOS E INFRAESTRUCTURA (Prioridad Alta)

Esta fase establece los cimientos de datos y seguridad.

#### 1.1 Base de Datos y Seguridad
- [ ] **Ejecutar Migración SQL:** Correr `MIGRACIONES_SUPABASE.sql` en Supabase para crear tablas (`profiles`, `solicitudes_credito`, `documentos`, etc.), Triggers y Políticas RLS.
- [ ] **Verificar RLS:** Confirmar que los usuarios solo vean su propia data.
- [ ] **Configurar Storage:** Crear buckets en Supabase para `documentos` y `avaluos` con sus políticas de acceso.

#### 1.2 Integración del UI Kit
- [ ] **Dependencias:** Instalar paquetes faltantes del kit (`@tabler/icons-react`, `simplebar-react`, `notistack`, etc.).
- [ ] **Temas:** Migrar carpeta `src/themes` del kit al proyecto para unificar estilos (colores, tipografía, sombras).
- [ ] **Componentes Base:** Importar `MainCard`, `Breadcrumbs`, `Loaders` y `ScrollTop`.

#### 1.3 Arquitectura de Navegación
- [ ] **Layout Principal (`/dashboard/layout.jsx`):** Implementar Sidebar y Header adaptados del kit.
    - *Sidebar:* Menú dinámico basado en el rol del usuario.
    - *Header:* Avatar de usuario y botón de logout.
- [ ] **Middleware (`middleware.js`):** Asegurar protección de rutas `/dashboard/*` y redirección inteligente si el rol no coincide.
- [ ] **Redirección Raíz (`/dashboard/page.jsx`):** Lógica para enviar a `/dashboard/cliente`, `/dashboard/analista` o `/dashboard/admin` según el perfil.

---

### FASE 2: DASHBOARD CLIENTE (El Solicitante)

Enfocado en la experiencia del usuario final y la captura de datos.

#### 2.1 Dashboard Home (`/dashboard/cliente`)
- [ ] **Bienvenida:** Card con saludo y resumen de estado.
- [ ] **Estado de Solicitud:** Widget visual mostrando el paso actual (1 al 7).
- [ ] **Acciones Rápidas:** Botones para "Continuar Solicitud" o "Subir Documentos".

#### 2.2 Flujo de Solicitud (Pasos 1-2)
- [ ] **Wizard de Solicitud:** Formulario multi-paso (Datos personales, financieros, de la propiedad).
- [ ] **Carga de Documentos:** Componente Drag & Drop para subir INE, Comprobantes, etc. a Supabase Storage.
- [ ] **Validación:** Feedback visual del estado de cada documento (Pendiente/Subido).

#### 2.3 Seguimiento (Pasos 5-7)
- [ ] **Agendamiento:** Interfaz para seleccionar fecha de cita presencial (integrado con tabla `citas_presenciales`).
- [ ] **Visualización de Crédito:** Ver tabla de amortización y estado de pagos (para créditos activos).

---

### FASE 3: DASHBOARD ANALISTA (El Operador)

Herramientas para procesar solicitudes eficientemente.

#### 3.1 Gestión de Tareas
- [ ] **Bandeja de Entrada:** Tabla con solicitudes asignadas y pendientes.
- [ ] **Filtros:** Por estado (Nuevas, En Revisión, Completadas).

#### 3.2 Detalle de Expediente (`/dashboard/analista/solicitud/[id]`)
- [ ] **Visor de Documentos:** Panel para ver PDFs/Imágenes sin descargar.
- [ ] **Validación:** Botones Aprobar/Rechazar por documento con campo de comentarios.
- [ ] **Avalúo:** Formulario para ingresar datos del avalúo y subir dictamen.
- [ ] **Dictamen:** Área para redactar análisis y enviar a Comité.

---

### FASE 4: DASHBOARD ADMIN (El Decisor)

Control total y toma de decisiones.

#### 4.1 Comité de Crédito
- [ ] **Votación:** Interfaz para aprobar/rechazar solicitudes listas.
- [ ] **Condiciones Finales:** Edición de monto, tasa y plazo final antes de aprobar.

#### 4.2 Administración del Sistema
- [ ] **Gestión de Usuarios:** ABM de usuarios y asignación de roles.
- [ ] **Configuración:** Parámetros globales del sistema.
- [ ] **Reportes:** Dashboard con KPIs (Colocación, Mora, Tiempos de respuesta).

---

## 4. CONSIDERACIONES TÉCNICAS

*   **Idempotencia:** Los scripts SQL deben poder correrse múltiples veces sin romper nada (`DROP IF EXISTS`).
*   **Tipos:** Mantener definiciones de tipos (TypeScript o JSDoc) sincronizadas con la DB.
*   **Performance:** Usar `server components` donde sea posible para reducir JS en cliente.
*   **UX:** Feedback inmediato en todas las acciones (Toasts, Spinners).
