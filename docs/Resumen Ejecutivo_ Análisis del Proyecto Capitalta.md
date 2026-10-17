# Resumen Ejecutivo: Análisis del Proyecto Capitalta

**Fecha:** 3 de febrero de 2026  
**Proyecto:** Plataforma Web Capitalta (SOFOM)  
**Repositorio:** https://github.com/abalderas10/ui_capitalta  
**URL Actual:** https://ui-capitalta.vercel.app/

---

## Estado General del Proyecto

El proyecto Capitalta se encuentra en un **estado de desarrollo intermedio avanzado**, con aproximadamente un **65% de completitud**. La infraestructura base, las páginas principales y las funcionalidades core están implementadas y operativas. Sin embargo, existen componentes críticos para la conversión de usuarios que aún requieren desarrollo antes del lanzamiento al público.

### Evaluación por Componente

El análisis detallado del repositorio revela el siguiente estado de implementación:

| Componente | Estado | Completitud | Observaciones |
|-----------|--------|-------------|---------------|
| Infraestructura Base | ✅ Completo | 100% | Next.js 16, React 19, MUI 7, Supabase configurado |
| Landing Principal | ✅ Completo | 95% | Todas las secciones implementadas con mejoras visuales |
| Páginas de Productos | ✅ Completo | 90% | 4 productos con landings completas |
| Calculadoras de Crédito | ✅ Completo | 85% | 4 calculadoras funcionales con generación de PDF |
| Sistema de Blog | ✅ Completo | 90% | Integrado con Supabase, 10 artículos de ejemplo |
| Autenticación Básica | ⏳ Parcial | 70% | Login/registro funcionan, falta wizard guiado |
| Sistema de Citas | ⏳ Parcial | 40% | Estructura creada, falta interfaz de usuario |
| Panel de Usuario | ⏳ Parcial | 50% | Ruta creada, falta implementación de funcionalidades |
| Agente IA Conversacional | ⏳ Inicial | 30% | Arquitectura definida, no implementado |
| Panel de Administración | ❌ Pendiente | 0% | No iniciado |

---

## Funcionalidades Implementadas Destacadas

### Página Principal

La landing page de Capitalta presenta una estructura profesional y completa que incluye todas las secciones especificadas en el documento de requerimientos. La sección de **Proceso Operativo** ha sido mejorada con un componente personalizado de timeline que utiliza Material-UI Lab y animaciones secuenciales con Framer Motion, destacando visualmente el paso crítico de la formalización notarial que requiere cita presencial.

La **Calculadora Rápida** integrada en la página principal ha sido significativamente mejorada respecto a la versión inicial. Ahora incorpora sliders interactivos para monto y plazo, cálculo en tiempo real de pagos mensuales, y un diseño visual atractivo con gradientes del color primario de la marca (#1c7c77). Los usuarios pueden obtener una estimación inmediata antes de profundizar en las calculadoras especializadas.

### Sistema de Calculadoras

Las cuatro calculadoras de crédito (Simple, Empresarial, Revolvente y Venta Key) están completamente funcionales y representan uno de los puntos fuertes del proyecto. Cada calculadora implementa correctamente la fórmula de amortización francesa, genera tablas de amortización completas y permite la descarga de cotizaciones en formato PDF con el branding de Capitalta.

Un aspecto particularmente valioso es la integración con Supabase para la captura de leads. Cuando un usuario completa una simulación, el sistema guarda automáticamente la información del prospecto en la tabla `leads` y los detalles de la cotización en la tabla `cotizaciones`, incluyendo la tabla de amortización completa en formato JSON. Esta funcionalidad establece la base para el seguimiento posterior de clientes potenciales.

### Sistema de Blog

El blog está completamente integrado con Supabase y cuenta con un sistema robusto de gestión de contenido. La página de listado incluye filtros por categoría, búsqueda por texto y paginación. Las páginas de detalle de artículo implementan SEO dinámico, lo que es fundamental para la visibilidad en motores de búsqueda. El proyecto incluye seeds con 10 artículos de ejemplo en las categorías de Finanzas e Inversión.

---

## Áreas Críticas Pendientes

### Wizard de Registro Guiado

El **Wizard de Registro Guiado** representa la funcionalidad pendiente de mayor prioridad para el proyecto. Actualmente, el sistema utiliza un formulario de registro simple que no captura información suficiente sobre las necesidades del cliente ni califica adecuadamente los leads. El wizard propuesto en la documentación original contempla un flujo de 5 pasos que incluye la captura de monto y plazo deseados, tipo de cliente, datos personales, verificación OTP y confirmación.

La implementación de este wizard es crítica porque representa el principal embudo de conversión del sitio. Un usuario que completa los 5 pasos demuestra un interés genuino y proporciona información valiosa para el equipo de ventas. Sin este componente, el sitio pierde una oportunidad significativa de calificar y convertir visitantes en clientes potenciales.

### Sistema de Citas Presenciales

El **Sistema de Citas Presenciales** es un requisito obligatorio del proceso operativo de Capitalta. Según la documentación del proceso, después de la aprobación del crédito y antes del fondeo, el cliente debe acudir a una cita presencial para la formalización notarial y entrega de garantía. Actualmente, la tabla `citas` existe en la base de datos y hay utilidades helper creadas, pero falta completar la API y desarrollar la interfaz de usuario.

La implementación debe incluir un calendario interactivo donde los usuarios autenticados puedan seleccionar fecha y hora disponibles, confirmar la cita y recibir notificaciones. Esta funcionalidad debe estar integrada en el panel de usuario y ser accesible solo para clientes con crédito aprobado.

### Panel de Usuario

El **Panel de Usuario** es fundamental para la experiencia post-autenticación. Aunque la ruta `/mi-cuenta` existe, falta implementar las funcionalidades esenciales como el dashboard con resumen de solicitudes, historial de cotizaciones, gestión de citas agendadas, perfil editable y visualización del estado de la solicitud de crédito. Este panel es el punto central de interacción del cliente con la plataforma una vez que ha iniciado el proceso de solicitud.

---

## Roadmap Recomendado para Lanzamiento

### Milestone 1: MVP Funcional (3-4 semanas)

El **Milestone 1** debe enfocarse en completar las funcionalidades críticas para el lanzamiento inicial. Este milestone incluye la implementación del wizard de registro guiado, la finalización del sistema de citas presenciales, la construcción del panel de usuario básico y la integración completa del sistema de autenticación con verificación de email.

Adicionalmente, este milestone debe incluir la sustitución de todo el contenido de ejemplo por contenido real proporcionado por el cliente, la implementación de SEO básico en todas las páginas, y un ciclo completo de testing y corrección de bugs. El criterio de aceptación principal es que un usuario pueda completar el flujo completo desde el registro hasta la generación de una cita presencial.

**Estimación de esfuerzo:** 15-21 días de desarrollo

**Entregables clave:**
- Wizard de registro guiado funcional
- Sistema de citas operativo con calendario interactivo
- Panel de usuario con funcionalidades básicas
- Contenido real en todas las secciones
- SEO básico implementado
- Testing completo realizado

### Milestone 2: Optimización y Mejoras (2-3 semanas)

El **Milestone 2** se enfoca en optimizaciones y funcionalidades complementarias. Incluye el desarrollo de un panel de administración básico para que el equipo de Capitalta pueda gestionar leads y citas, la configuración de storage en Supabase para manejo de documentos, optimizaciones de performance y mejoras de UX basadas en feedback inicial.

Este milestone también debe incluir la configuración de analytics para monitoreo de conversiones, implementación de error tracking con herramientas como Sentry, y la creación de documentación técnica para el equipo de Capitalta.

### Milestone 3: Agente IA Conversacional (3-4 semanas)

El **Milestone 3** es opcional para el lanzamiento inicial pero representa un diferenciador competitivo importante. La implementación del agente de voz conversacional basado en LiveKit requiere configuración de múltiples servicios externos (LiveKit Cloud, Deepgram, ElevenLabs), desarrollo de un worker de Python para el agente, y creación de la interfaz de usuario para interacción de voz.

La documentación del proyecto incluye un roadmap detallado de 3 semanas para esta funcionalidad, con especificaciones técnicas completas de la arquitectura seleccionada. Esta implementación puede posponerse para una fase posterior sin afectar la funcionalidad core del sitio.

---

## Consideraciones Técnicas

### Arquitectura y Stack

El proyecto está construido sobre una base tecnológica sólida y moderna. Utiliza Next.js 16 con App Router, React 19 y Material-UI 7, lo que garantiza un rendimiento óptimo y una experiencia de usuario fluida. La integración con Supabase proporciona un backend robusto sin necesidad de gestionar infraestructura propia.

La plantilla SaasAble sobre la cual está construido el proyecto ofrece 231 componentes reutilizables organizados en 25 categorías, lo que acelera significativamente el desarrollo de nuevas funcionalidades. El sistema de theming está correctamente configurado con el color primario de Capitalta (#1c7c77) y mantiene consistencia visual en todo el sitio.

### Base de Datos y Backend

La estructura de base de datos en Supabase está bien diseñada con cuatro tablas principales: `users` (perfiles extendidos), `leads` (gestión de prospectos), `cotizaciones` (cotizaciones de crédito) y `articulos_blog` (sistema de blog). Todas las tablas tienen políticas de Row Level Security (RLS) correctamente configuradas para proteger los datos.

Los endpoints de API implementados (`/api/leads`, `/api/cotizaciones`) funcionan correctamente y siguen las mejores prácticas de Next.js. Sin embargo, falta completar la API de citas y crear endpoints adicionales para el panel de administración.

### Deuda Técnica

El proyecto presenta una deuda técnica relativamente baja para su estado de desarrollo. Los aspectos más críticos a abordar antes del lanzamiento son la falta de tests automatizados, la necesidad de estandarizar el manejo de errores en toda la aplicación, y la implementación de un sistema de logging y monitoreo para producción.

Es recomendable implementar al menos tests básicos para los flujos críticos (registro, calculadoras, citas) antes del lanzamiento, y configurar herramientas de monitoreo como Sentry para error tracking y UptimeRobot para monitoreo de disponibilidad.

---

## Estimación de Costos Operacionales

### Costos Actuales

El proyecto actualmente opera con servicios gratuitos que son suficientes para la fase de desarrollo y lanzamiento inicial. Vercel en su plan Hobby proporciona hosting gratuito con 100 GB de bandwidth mensual, mientras que Supabase en su plan Free ofrece 500 MB de base de datos, 1 GB de almacenamiento de archivos y soporte para hasta 50,000 usuarios activos mensuales.

Estos límites son adecuados para los primeros meses de operación. Sin embargo, es importante monitorear el uso para planificar upgrades oportunos. El plan Pro de Supabase cuesta $25/mes y ofrece límites significativamente mayores que serán necesarios cuando el tráfico crezca.

### Costos Proyectados con Agente IA

Si se decide implementar el agente de voz conversacional, los costos operacionales aumentarán significativamente. LiveKit Cloud cobra aproximadamente $0.009 por minuto de uso, Deepgram cobra $0.0043 por minuto de transcripción, y ElevenLabs tiene planes desde $5/mes para uso básico hasta $22/mes para uso moderado.

Considerando un uso moderado del agente IA, se estima un costo operacional mensual entre $205 y $850. Esta inversión debe evaluarse contra el valor que el agente aporta en términos de conversión y experiencia de usuario. Es recomendable implementar primero el MVP sin agente IA y añadir esta funcionalidad en una fase posterior una vez validado el modelo de negocio.

---

## Recomendaciones Estratégicas

### Priorización de Funcionalidades

La recomendación principal es enfocarse en completar el **Milestone 1** antes de considerar funcionalidades adicionales. El wizard de registro guiado y el sistema de citas son componentes críticos que impactan directamente la capacidad del sitio para convertir visitantes en clientes. Sin estas funcionalidades, el sitio es principalmente informativo pero no operativo.

El agente IA conversacional, aunque atractivo como diferenciador, puede posponerse para una fase posterior. Es más importante tener un flujo de conversión completo y funcional que una característica innovadora pero no esencial.

### Lanzamiento por Fases

Se recomienda un lanzamiento por fases que permita validar el producto con usuarios reales antes de invertir en funcionalidades avanzadas. La **Fase 1** debe incluir el MVP funcional con todas las funcionalidades core. La **Fase 2** puede incluir el panel de administración y optimizaciones basadas en feedback de usuarios. La **Fase 3** puede incorporar el agente IA una vez validado el modelo de negocio.

Este enfoque reduce el riesgo y permite iterar basándose en datos reales de uso en lugar de suposiciones.

### Monitoreo y Análisis

Desde el primer día de lanzamiento, es crítico tener configurado Google Analytics o una herramienta similar para monitorear el comportamiento de los usuarios. Métricas clave a seguir incluyen la tasa de conversión de visitante a lead, la tasa de abandono en el wizard de registro, el tiempo promedio para completar una cotización, y la tasa de conversión de lead a cita agendada.

Herramientas como Hotjar pueden proporcionar insights valiosos mediante heatmaps y grabaciones de sesiones, permitiendo identificar puntos de fricción en la experiencia de usuario.

---

## Próximos Pasos Inmediatos

### Para el Equipo de Desarrollo

El equipo de desarrollo debe enfocarse en tres tareas inmediatas: implementar el wizard de registro guiado, completar el sistema de citas presenciales, y construir el panel de usuario básico. Estas tres tareas son interdependientes y forman el núcleo del flujo de conversión.

Se recomienda comenzar con el wizard de registro ya que es el punto de entrada al flujo de usuario autenticado. Una vez completado el wizard, el desarrollo del panel de usuario y el sistema de citas puede realizarse en paralelo.

### Para el Cliente (Capitalta)

El cliente debe preparar el contenido real que reemplazará los ejemplos actuales. Esto incluye testimonios verificables de clientes reales, fotografías profesionales del equipo, información de contacto definitiva, y textos legales revisados por un abogado (términos y condiciones, política de privacidad).

Adicionalmente, el cliente debe tomar decisiones sobre la prioridad del agente IA y si se requiere un panel de administración custom o si se puede utilizar directamente el dashboard de Supabase para gestión inicial de leads.

### Configuración Externa Requerida

Antes del lanzamiento, se requiere configurar el dominio `capitalta.mx`, establecer cuentas de email corporativo, configurar Google Analytics, y proporcionar credenciales de redes sociales para integración. También es necesario configurar las plantillas de email transaccional en Supabase con el branding de Capitalta.

---

## Conclusión

El proyecto Capitalta está en un estado avanzado de desarrollo con una base sólida y bien estructurada. Las funcionalidades core están implementadas y funcionan correctamente. El enfoque debe estar en completar los componentes críticos de conversión (wizard de registro, sistema de citas, panel de usuario) antes de considerar funcionalidades adicionales.

Con un esfuerzo enfocado de 3-4 semanas, el proyecto puede alcanzar el estado de MVP funcional listo para lanzamiento. La arquitectura técnica es sólida y escalable, permitiendo crecimiento futuro sin necesidad de refactorizaciones mayores.

El éxito del lanzamiento dependerá de la correcta implementación de los flujos de conversión y de la calidad del contenido proporcionado por el cliente. El monitoreo continuo de métricas desde el día uno permitirá optimizar la experiencia de usuario basándose en datos reales.
