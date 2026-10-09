# PROMPT PARA AGENTE IA (TRAE) - CONTINUACIÓN DESARROLLO CAPITALTA

## 1. OBJETIVO GENERAL

Continuar y completar el desarrollo del sitio web financiero para **Capitalta**, enfocándose en las funcionalidades pendientes de alta prioridad para alcanzar el **Milestone 1 (MVP Funcional)**. El proyecto se basa en el repositorio `ui-capitalta` y utiliza un stack de Next.js 16, React 19, Material-UI 7 y Supabase.

**Referencia Principal:** Debes basar todo tu trabajo en las especificaciones detalladas en el documento `PROMPT_TRAE_CAPITALTA.md` que se encuentra en la raíz del repositorio. Este nuevo prompt se enfoca en las tareas **pendientes** identificadas en el análisis del 3 de febrero de 2026.

---

## 2. CONTEXTO DEL PROYECTO

- **Repositorio:** `https://github.com/abalderas10/ui_capitalta`
- **URL Desplegada (actual):** `https://ui-capitalta.vercel.app/`
- **Estado Actual:** Desarrollo intermedio (60-70% completado). La landing page, páginas de productos, calculadoras y blog están mayormente implementados y funcionales. Las áreas críticas pendientes son el flujo de conversión de usuario y funcionalidades de post-autenticación.
- **Documentación Clave:**
  - `PROMPT_TRAE_CAPITALTA.md` (Especificaciones originales)
  - `analisis_capitalta_completo.md` (Análisis de estado actual y roadmap)
  - `Guía Completa de Configuración - Proyecto Capitalta.md` (Setup de Supabase)

---

## 3. TAREAS PRIORITARIAS (ROADMAP A MVP)

Tu misión es completar las siguientes tareas en el orden especificado para alcanzar el **Milestone 1: MVP Funcional**.

### 🔴 TAREA 1: IMPLEMENTAR WIZARD DE REGISTRO GUIADO (Prioridad CRÍTICA)

**Objetivo:** Reemplazar el formulario de registro simple actual (`/auth/registro`) por un flujo guiado de 5 pasos para mejorar la captura y calificación de leads.

**Especificaciones (Sección 9 de `PROMPT_TRAE_CAPITALTA.md`):**

1.  **Crear Componente Stepper:** Utiliza el componente `Stepper` de Material-UI para guiar el flujo.
2.  **Paso 1: Monto y Plazo:**
    -   Sliders para monto y plazo.
    -   Mostrar pago mensual estimado en tiempo real (reutilizar lógica de calculadoras).
3.  **Paso 2: Tipo de Cliente:**
    -   Radio buttons: "Persona Física" / "Persona Moral".
4.  **Paso 3: Datos Personales:**
    -   Inputs para Nombre, Apellido, Email, Teléfono.
    -   Inputs condicionales para Empresa y RFC si es "Persona Moral".
5.  **Paso 4: Verificación OTP:**
    -   Integrar con Supabase Auth para enviar un código OTP al email del usuario.
    -   Input para el código, contador de 60s y opción de reenvío.
6.  **Paso 5: Confirmación:**
    -   Mostrar un resumen de los datos ingresados.
    -   Botones para "Ir a Mi Cuenta" y "Descargar Cotización".

**Requisitos Técnicos:**
-   Validación de datos en cada paso.
-   Persistencia del estado del formulario entre pasos (usar `useState` o un context de React).
-   Al finalizar, crear el usuario en `auth.users` y simultáneamente crear un registro en la tabla `leads` con la información recopilada.
-   Redirigir al usuario a `/mi-cuenta` al completar el registro.

### 🔴 TAREA 2: COMPLETAR SISTEMA DE CITAS PRESENCIALES (Prioridad ALTA)

**Objetivo:** Permitir a los usuarios con crédito aprobado agendar una cita para la firma de contrato, un paso obligatorio del proceso operativo.

**Especificaciones (Sección 10 de `PROMPT_TRAE_CAPITALTA.md`):**

1.  **Completar API de Citas:**
    -   Revisa el archivo `src/utils/citas.js` y la migración `create_citas_table.sql`.
    -   Implementa los endpoints API (`/api/citas`) para realizar operaciones CRUD completas (Crear, Leer, Actualizar, Borrar citas) en la tabla `citas` de Supabase.
2.  **Crear Interfaz de Agendamiento:**
    -   Esta interfaz debe estar en una sección protegida del panel de usuario (`/mi-cuenta/citas`).
    -   Implementa un calendario interactivo (puedes usar `react-big-calendar` o una librería similar).
    -   El calendario debe mostrar las fechas y horarios disponibles (puedes simular la disponibilidad por ahora).
3.  **Implementar Flujo de Agendamiento:**
    -   El usuario selecciona una fecha y hora disponible.
    -   Un modal o formulario permite confirmar la cita y añadir notas.
    -   Al confirmar, se debe llamar a la API para guardar la cita en Supabase.
4.  **Visualización de Citas:**
    -   En el panel de usuario, mostrar una lista de las citas agendadas, su estado (confirmada, pendiente, cancelada) y la opción de cancelarla.

**Requisitos Técnicos:**
-   La página de agendamiento debe ser una ruta protegida, accesible solo para usuarios autenticados.
-   La API debe verificar que el usuario tenga un crédito en estado "aprobado" antes de permitir la creación de una cita (simular esta lógica si es necesario).
-   Implementar notificaciones básicas en el frontend (ej. "Cita agendada con éxito").

### 🟡 TAREA 3: CONSTRUIR PANEL DE USUARIO BÁSICO (`/mi-cuenta`)

**Objetivo:** Crear un dashboard funcional para que los usuarios autenticados puedan gestionar su información y solicitudes.

**Especificaciones:**

1.  **Crear Layout Protegido:**
    -   La ruta `/mi-cuenta` y todas sus sub-rutas deben requerir autenticación.
    -   Implementa un layout con un menú de navegación lateral (Dashboard, Mis Solicitudes, Mis Citas, Mi Perfil, Salir).
2.  **Dashboard Principal (`/mi-cuenta`):**
    -   Mostrar un resumen del estado de la solicitud de crédito más reciente (puedes usar datos de ejemplo).
    -   Mostrar un resumen de la próxima cita agendada.
    -   Accesos directos a las secciones principales.
3.  **Sección "Mis Cotizaciones":**
    -   Listar el historial de cotizaciones guardadas por el usuario desde las calculadoras.
    -   Permitir ver el detalle y descargar nuevamente el PDF de cada cotización.
4.  **Sección "Mi Perfil":**
    -   Mostrar los datos del usuario (Nombre, Email, Teléfono).
    -   Permitir la edición de Nombre y Teléfono.
    -   Implementar la funcionalidad para cambiar la contraseña.

### 🟢 TAREA 4: REVISIÓN FINAL Y REPORTE

**Objetivo:** Una vez completadas las tareas anteriores, realiza una revisión final y reporta el estado del proyecto.

**Pasos:**
1.  **Testing Funcional:** Navega por todo el sitio como un usuario nuevo. Completa el wizard de registro, genera una cotización, agenda una cita y revisa el panel de usuario. Asegúrate de que no haya errores en la consola.
2.  **Actualizar Documentación:** Si creaste nuevos componentes o modificaste flujos importantes, añade breves comentarios en el código o actualiza el archivo `README.md` si es necesario.
3.  **Generar Reporte de Entrega:** Crea un archivo `ENTREGA_MVP.md` resumiendo las funcionalidades completadas, el estado final del proyecto y cualquier recomendación para los próximos pasos (como el inicio del desarrollo del Agente IA o el Panel de Administración).

---

## 4. CONSIDERACIONES TÉCNICAS

-   **Estilo y Componentes:** Utiliza exclusivamente los componentes de **Material-UI 7** y sigue el sistema de diseño (`theme`) ya establecido en el proyecto para mantener la consistencia visual.
-   **Estado Global:** Para manejar el estado de autenticación y los datos del usuario, utiliza React Context. El archivo `src/contexts/ConfigContext.jsx` puede servir de ejemplo.
-   **Interacción con Backend:** Toda la comunicación con Supabase debe realizarse a través de los **API endpoints de Next.js** que crees en `src/app/api/`, no directamente desde los componentes del cliente, para proteger las credenciales y la lógica de negocio.
-   **Manejo de Errores:** Implementa un manejo de errores robusto para las llamadas a la API, mostrando mensajes claros al usuario en caso de fallo (ej. "No se pudo agendar la cita, intente más tarde").
-   **Código Limpio:** Escribe código claro, comentado y sigue las convenciones de estilo ya presentes en el proyecto (ESLint y Prettier están configurados).
