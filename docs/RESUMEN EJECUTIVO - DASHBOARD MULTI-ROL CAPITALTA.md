# RESUMEN EJECUTIVO - DASHBOARD MULTI-ROL CAPITALTA

## DECISIÓN CLAVE: TRABAJAR EN EL MISMO PROYECTO ✅

Después de analizar el proyecto actual de Capitalta y los componentes del dashboard adquiridos, la recomendación es **trabajar en el mismo proyecto** (`ui_capitalta`) en lugar de crear un proyecto separado.

### Ventajas de esta decisión

La integración del dashboard dentro del proyecto existente ofrece beneficios significativos tanto técnicos como de experiencia de usuario. Al mantener una arquitectura unificada, se aprovecha la configuración de Supabase ya establecida, lo que elimina la necesidad de duplicar credenciales, políticas de seguridad y lógica de autenticación. Los usuarios experimentan una transición fluida desde el sitio público hasta su dashboard personalizado sin necesidad de volver a autenticarse, mejorando considerablemente la usabilidad del sistema.

Desde el punto de vista operativo, esta decisión simplifica el despliegue mediante una única configuración de Vercel y un solo dominio, reduciendo la complejidad de mantenimiento. Los componentes, estilos y utilidades pueden reutilizarse entre el sitio público y el dashboard, acelerando el desarrollo y garantizando consistencia visual. Además, el código compartido facilita la colaboración del equipo y reduce el tiempo de onboarding de nuevos desarrolladores.

## ARQUITECTURA PROPUESTA

El dashboard se estructura en tres roles principales que reflejan el flujo operativo de Capitalta: **Cliente**, **Analista de Crédito** y **Administrador**. Cada rol tiene permisos específicos y acceso a diferentes funcionalidades del sistema.

### Roles y responsabilidades

El **Cliente** representa al solicitante de crédito, quien puede gestionar sus propias solicitudes, subir documentos requeridos, actualizar datos personales, ver el estado de su solicitud a través de los 7 pasos del proceso, agendar citas presenciales y realizar pagos. Sin embargo, no tiene acceso a información de otros clientes ni puede aprobar o rechazar créditos.

El **Analista de Crédito** es responsable de revisar y procesar las solicitudes asignadas. Puede ver expedientes completos, validar o rechazar documentos, solicitar información adicional, coordinar avalúos, agregar comentarios internos y enviar solicitudes al Comité de Crédito. No tiene permisos para aprobar créditos de forma independiente ni acceder a la configuración del sistema.

El **Administrador** o miembro del Comité de Crédito tiene acceso completo al sistema. Puede aprobar o rechazar créditos, asignar solicitudes a analistas, gestionar usuarios y roles, ver métricas globales, configurar parámetros del sistema, gestionar citas presenciales y acceder a logs de auditoría.

## FLUJO OPERATIVO DE 7 PASOS

El proceso operativo de Capitalta se implementa como un flujo secuencial que guía al cliente desde la solicitud inicial hasta el seguimiento del crédito activo.

### Paso 1: Solicitud Inicial

El cliente completa un formulario guiado donde selecciona el tipo de crédito (Simple, Empresarial, Revolvente o Venta Key), indica el monto y plazo deseado, y define el objetivo del financiamiento. El sistema crea un registro en la base de datos con estado `solicitud_iniciada` y notifica al equipo de analistas sobre la nueva solicitud.

### Paso 2: Integración de Expediente

El cliente sube los documentos requeridos según el tipo de crédito solicitado. Esto incluye documentación personal (INE, CURP, comprobante de domicilio), financiera (estados financieros, declaraciones fiscales) y legal (acta constitutiva, poderes). El analista asignado revisa cada documento, pudiendo validarlo, rechazarlo con comentarios o solicitar documentación adicional. Una vez que el expediente está completo y validado, el estado cambia a `avaluo_en_proceso`.

### Paso 3: Avalúo y Verificación de Garantía

El analista coordina un avalúo profesional del inmueble ofrecido como garantía. Un perito valuador evalúa el inmueble y emite un reporte que incluye el valor de mercado y la situación legal de la propiedad. El analista sube este reporte al sistema y verifica que el valor sea suficiente para respaldar el monto solicitado. Al completarse, el estado cambia a `en_comite`.

### Paso 4: Revisión y Aprobación por Comité de Crédito

El analista prepara un resumen ejecutivo de la solicitud que incluye análisis de capacidad de pago y evaluación de riesgos. El Comité de Crédito (administradores) revisa el expediente completo y emite una resolución. Si se aprueba, se definen las condiciones finales (monto, plazo y tasa). Si se rechaza, se documenta el motivo. El cliente recibe una notificación con la decisión y, en caso de aprobación, debe aceptar las condiciones para continuar.

### Paso 5: Formalización Notarial y Cita Presencial

Este es un paso crítico que incluye la generación de contratos y escrituras, seguido de una **cita presencial obligatoria**. El sistema genera los documentos legales que el cliente puede revisar desde su dashboard. Posteriormente, el cliente agenda una cita presencial donde firmará el contrato y entregará la garantía (escrituras del inmueble). Esta cita es gestionada mediante un calendario integrado que muestra fechas y horarios disponibles. El notario o administrador marca la cita como completada una vez que se han firmado los documentos y recibido la garantía.

### Paso 6: Fondeo o Disposición de Crédito

El administrador verifica que todas las condiciones previas estén cumplidas: contrato firmado, garantía entregada y documentos notariales completos. Una vez verificado, autoriza la liberación de recursos mediante transferencia bancaria. El cliente recibe una notificación cuando los fondos son transferidos y debe confirmar la recepción. En este momento se crea un registro en la tabla `creditos_activos` y se genera la tabla de amortización.

### Paso 7: Seguimiento y Cobranza

El sistema genera automáticamente el calendario de pagos y envía recordatorios al cliente antes de cada fecha de vencimiento. El cliente puede ver su tabla de amortización, realizar pagos a través de la plataforma y descargar estados de cuenta. El área de cobranza monitorea los pagos, gestiona casos de mora y puede iniciar procesos de reestructura cuando sea necesario. El cliente también puede solicitar nuevos créditos una vez que demuestre un buen historial de pagos.

## ESTRUCTURA DE LA BASE DE DATOS

El diseño de la base de datos en Supabase sigue principios de normalización y seguridad mediante Row Level Security (RLS).

### Tablas principales

La tabla **profiles** extiende los datos del usuario de Supabase Auth, almacenando información adicional como rol, nombre completo, teléfono, RFC, CURP y dirección. Esta tabla es fundamental para el sistema de permisos.

La tabla **solicitudes_credito** almacena todas las solicitudes con información del cliente, analista asignado, tipo de crédito, montos, plazos y estado actual. Incluye campos para las condiciones aprobadas y motivos de rechazo.

La tabla **documentos** gestiona todos los archivos subidos al sistema, vinculándolos con solicitudes específicas. Cada documento tiene un tipo, estado (pendiente, subido, validado, rechazado) y comentarios del analista.

Las tablas **avaluos**, **citas_presenciales**, **creditos_activos** y **pagos** gestionan las etapas posteriores del proceso, manteniendo trazabilidad completa de cada operación.

Las tablas auxiliares **comentarios_internos** y **notificaciones** facilitan la comunicación interna del equipo y mantienen informados a los usuarios sobre el progreso de sus solicitudes.

### Seguridad mediante RLS

Todas las tablas implementan políticas de Row Level Security que garantizan que cada usuario solo pueda acceder a la información que le corresponde según su rol. Los clientes solo ven sus propias solicitudes y documentos, los analistas acceden únicamente a solicitudes asignadas, y los administradores tienen visibilidad completa del sistema.

## COMPONENTES DISPONIBLES DEL UI KIT

El proyecto ya incluye el UI Kit SaasAble con más de 230 componentes reutilizables organizados en 25 categorías. Los componentes clave para el dashboard incluyen layouts con sidebar y header, cards y widgets para métricas, tablas con filtros y búsqueda, formularios con validación, calendarios para citas, modales para confirmaciones y un sistema de notificaciones.

Estos componentes están construidos con Material-UI 7 y ya siguen el sistema de diseño de Capitalta, incluyendo el color primario `#1c7c77`. Esto acelera significativamente el desarrollo al proporcionar bloques de construcción pre-diseñados y probados.

## PLAN DE IMPLEMENTACIÓN

El desarrollo se divide en seis fases incrementales que permiten entregar valor de forma continua.

### Fase 1: Fundamentos (Semanas 1-2)

Se establece la estructura de carpetas bajo `/src/app/dashboard`, se implementa el layout compartido con sidebar y header, se crean las tablas en Supabase ejecutando el script SQL proporcionado, se configuran las políticas de RLS y se implementa el middleware de autenticación y autorización.

### Fase 2: Dashboard del Cliente (Semanas 3-4)

Se desarrolla la página de inicio del cliente con resumen de actividad, el formulario de solicitud del Paso 1, el módulo de carga de documentos del Paso 2, el indicador de progreso de los 7 pasos, el módulo de agendamiento de citas del Paso 5 y la vista de créditos activos del Paso 7.

### Fase 3: Dashboard del Analista (Semanas 5-6)

Se implementa la página de inicio del analista con métricas, la lista de solicitudes asignadas, la vista detallada de expedientes con pestañas, el módulo de validación de documentos, el módulo de registro de avalúos y la funcionalidad de envío a Comité de Crédito.

### Fase 4: Dashboard del Administrador (Semanas 7-8)

Se desarrolla la página de inicio del admin con métricas globales, la vista del Comité de Crédito para aprobar o rechazar solicitudes, la gestión de citas presenciales, el módulo de fondeo, el dashboard de reportes y métricas, y la gestión de usuarios y roles.

### Fase 5: Cobranza y Pagos (Semanas 9-10)

Se implementa la generación automática de tablas de amortización, el módulo de pagos con integración de pasarela (Stripe, Conekta o SPEI), el sistema de recordatorios automáticos, el dashboard de cobranza con filtros por estado y los reportes de cartera.

### Fase 6: Notificaciones y Optimizaciones (Semanas 11-12)

Se implementa el sistema de notificaciones en tiempo real usando Supabase Realtime, emails automáticos para eventos importantes, SMS opcionales, optimización de rendimiento mediante caching y lazy loading, y testing exhaustivo con corrección de bugs.

## ARCHIVOS ENTREGABLES

Se han generado tres documentos clave para guiar la implementación:

**ARQUITECTURA_DASHBOARD_CAPITALTA.md** contiene la arquitectura completa del sistema, incluyendo la estructura de roles, el flujo detallado de los 7 pasos, el diseño de la base de datos con todas las tablas y relaciones, las políticas de seguridad RLS, la navegación por rol y ejemplos de flujos de usuario completos.

**PROMPT_TRAE_DASHBOARD.md** es el documento específico para el IDE Trae, con instrucciones precisas para implementar cada fase del proyecto. Incluye la estructura de carpetas, componentes a crear, lógica de negocio y consideraciones técnicas.

**MIGRACIONES_SUPABASE.sql** es el script SQL completo para crear todas las tablas, índices, triggers y políticas de seguridad en Supabase. Este script está listo para ejecutarse en el editor SQL de Supabase.

## PRÓXIMOS PASOS INMEDIATOS

Para comenzar la implementación, se recomienda seguir estos pasos en orden:

Primero, revisar y aprobar la arquitectura propuesta en este documento y en `ARQUITECTURA_DASHBOARD_CAPITALTA.md`. Segundo, ejecutar el script `MIGRACIONES_SUPABASE.sql` en el editor SQL de Supabase para crear todas las tablas y políticas. Tercero, verificar que las tablas se hayan creado correctamente y que las políticas de RLS funcionen como se espera. Cuarto, abrir el proyecto en el IDE Trae y proporcionar el contenido de `PROMPT_TRAE_DASHBOARD.md` como contexto. Quinto, comenzar con la Fase 1 (Fundamentos) siguiendo las instrucciones del prompt.

## CONSIDERACIONES FINALES

El dashboard propuesto está diseñado para escalar con el crecimiento de Capitalta. La arquitectura modular permite agregar nuevos roles (como Notario o Área de Cobranza) sin afectar la funcionalidad existente. El uso de Supabase como backend proporciona escalabilidad automática, autenticación robusta y almacenamiento seguro de archivos.

La implementación del proceso de 7 pasos con visibilidad completa para el cliente mejora significativamente la experiencia de usuario y reduce la carga de consultas al equipo de soporte. El sistema de notificaciones automáticas mantiene informados a todos los actores sobre el progreso de cada solicitud.

La integración con el sitio público existente permite una experiencia unificada donde el cliente puede solicitar un crédito desde la landing page y ser redirigido automáticamente a su dashboard para completar el proceso. Esta continuidad es fundamental para maximizar la conversión y reducir la fricción en el embudo de ventas.

El diseño de la base de datos con RLS garantiza que la información sensible esté protegida y que cada usuario solo acceda a lo que le corresponde según su rol. Las políticas implementadas cumplen con las mejores prácticas de seguridad y protección de datos.

---

**Fecha de elaboración:** 30 de enero de 2026  
**Autor:** Manus AI  
**Proyecto:** Capitalta - Dashboard Multi-Rol  
**Versión:** 1.0
