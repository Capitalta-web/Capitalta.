# PROMPT PARA TRAE - DESARROLLO SITIO WEB CAPITALTA

## OBJETIVO GENERAL

Desarrollar un **sitio web financiero completo para Capitalta** utilizando la plantilla SaasAble (Next.js 16 + React 19 + Material-UI 7), enfocado en **conversión, cotización y captación de leads**, con calculadoras de crédito avanzadas, landings por producto y flujo de registro guiado. El contenido y especificaciones técnicas se basan en el documento oficial de Capitalta y las capacidades de la plantilla.

---

## CONTEXTO TÉCNICO

### Stack Tecnológico Base

- **Frontend:** Next.js 16.1.1 + React 19.2.3 + Material-UI 7.3.6

- **Animaciones:** Framer Motion 12.23.26

- **Formularios:** React Hook Form 7.69.0 + validación

- **Backend:** Supabase (autenticación, base de datos, almacenamiento)

- **Mapas:** Leaflet + React Leaflet (opcional para ubicaciones)

- **Hosting:** Vercel (optimizado para Next.js)

### Plantilla SaasAble - Recursos Disponibles

- **231 componentes reutilizables** organizados en 25 categorías

- **9 temas pre-configurados** (DEFAULT, CRM, AI, CRYPTO, HOSTING, PMS, HRM, PLUGIN, LMS)

- **Componentes clave:** Hero (19 variantes), Features (27), Pricing (10), Testimonials (13), Blog (10), Navbar (11), Footer (7), Metrics (10), CTA (14), FAQ (8), Contact (6), Auth (4)

- **Sistema de temas:** Paleta de colores, tipografía, overrides de componentes MUI

---

## BRANDING Y DISEÑO

### Identidad Visual

**Color Primario Obligatorio:** `#1c7c77` (Teal/Verde azulado profesional)

**Paleta Complementaria:**

- Primario: `#1c7c77` (Verde teal)

- Secundario: `#000000` (Negro para contraste)

- Terciario: `#FFFFFF` (Blanco para fondos)

- Acentos: Grises neutros para texto y bordes

- Éxito: Verde para confirmaciones

- Alerta: Naranja/Rojo para advertencias

**Tipografía:**

- Headings: Syne o Heebo (de la plantilla)

- Body: Roboto o similar (profesional, legible)

- Monospace: Para números en calculadoras

**Logos Proporcionados:**

- Logo horizontal: Usar en navbar y footer

- Logo vertical: Usar en mobile y modales

- Favicon: Icono de Capitalta

- Watermark: Para documentos PDF

**Referencia Visual:** kapitalizar.mx (estilo, claridad y confianza - NO copiar)

---

## ARQUITECTURA DEL SITIO

### Estructura de Navegación Principal

```
capitalta.mx/
├── / (Inicio - Landing Principal)
├── /productos
│   ├── /credito-simple
│   ├── /credito-empresarial
│   ├── /credito-revolvente
│   └── /credito-venta-key
├── /calculadoras
│   ├── /calculadora-simple
│   ├── /calculadora-empresarial
│   ├── /calculadora-revolvente
│   └── /calculadora-venta-key
├── /sobre-nosotros
├── /blog
│   ├── /articulo/[slug]
├── /contacto
├── /auth
│   ├── /login
│   ├── /registro
│   ├── /recuperar-password
│   └── /verificar-otp
└── /admin (Panel de control - Opcional para futuro)
```

---

## PÁGINAS Y SECCIONES DETALLADAS

### 1. PÁGINA PRINCIPAL (/)

#### 1.1 Navbar/Header

- **Logo de Capitalta** (izquierda)

- **Menú principal:** Inicio, Productos, Calculadoras, Sobre Nosotros, Blog, Contacto

- **Botones de acción:**
  - "Iniciar Sesión" (link a /auth/login)
  - "Solicitar Crédito" (CTA principal, abre modal o redirige a /auth/registro)

- **Selector de idioma:** Español/Inglés (estructura preparada, implementar después)

- **Selector de tema:** Claro/Oscuro (usar sistema de temas de MUI)

- **Responsive:** Menú hamburguesa en mobile (breakpoint md)

- **Sticky:** Navbar permanece visible al scroll

#### 1.2 Hero Section

**Contenido:**

- Título principal: "Tu crecimiento no se detiene. Nuestro apoyo tampoco."

- Subtítulo: "Soluciones financieras ágiles y flexibles para personas y negocios"

- **Dos CTAs:**
    1. "Solicitar Crédito Ahora" (primario, redirige a /auth/registro)
    1. "Conocer Productos" (secundario, scroll a sección de productos)

- **Elemento visual:** Imagen o video de fondo profesional (finanzas, crecimiento, confianza)

- **Animaciones:** Parallax suave, fade-in de elementos

#### 1.3 Sección "¿Quiénes Somos?"

**Contenido:**

- Párrafo introductorio: "En Capitalta somos una SOFOM diferente..."

- Destacar: "Acompañamiento personalizado, procesos claros, accesibles y confiables"

- Diseño: 2 columnas (texto + imagen/gráfico)

- Animación: Fade-in al scroll

#### 1.4 Sección Fundamentos Corporativos

**Subsecciones en tabs o cards:**

**Visión:**

- "Ser la empresa mexicana líder en soluciones financieras, reconocida por su cercanía, solidez y compromiso."

**Misión:**

- "Empoderar e impulsar el crecimiento financiero de nuestros clientes a través de productos y servicios flexibles, que fortalezcan su bienestar integral y desarrollo económico."

**Valores (5 cards):**

1. **Honestidad:** Transparencia y coherencia

1. **Responsabilidad:** Cumplimiento y compromiso

1. **Lealtad:** Integridad y confianza

1. **Respeto:** Empatía y equidad

1. **Trabajo en Equipo:** Colaboración y sinergia

Diseño: Grid de 5 cards con iconos, animaciones al hover

#### 1.5 Sección Productos Destacados

**4 cards principales (uno por producto):**

Cada card incluye:

- Nombre del producto

- Descripción breve (máx. 2 líneas)

- Montos y plazos principales

- Icono representativo

- CTA: "Ver Detalles" (redirige a /productos/[producto])

**Productos:**

1. Crédito Simple

1. Crédito Empresarial

1. Crédito Revolvente

1. Crédito Venta Key

Diseño: Grid 4 columnas (responsive a 2 en tablet, 1 en mobile)Animación: Stagger fade-in al scroll

#### 1.6 Sección Calculadora Rápida (Home)

**Calculadora General (sin topes estrictos, solo para pruebas):**

Campos:

- Monto solicitado (input numérico, sin validación de rango)

- Plazo en meses (input numérico, sin validación de rango)

- Tipo de crédito (select: Simple, Empresarial, Revolvente, Venta Key)

Funcionalidad:

- Cálculo en tiempo real

- Mostrar: Pago mensual estimado, interés total, monto total a pagar

- Botón: "Ver Calculadora Completa" (redirige a /calculadoras/[tipo])

- Botón: "Solicitar Este Crédito" (abre modal de registro rápido)

Diseño: Card destacado con fondo degradado (color primario #1c7c77)

#### 1.7 Sección Métricas/Logros

**4 contadores animados:**

- Clientes activos (ej: ,000+)

- Créditos otorgados (ej: $500M+)

- Años de experiencia (ej: 15+)

- Tasa de satisfacción (ej: 98%)

Diseño: 4 columnas con números grandes, animación de contadorAnimación: Trigger al scroll, números se animan desde 0

#### 1.8 Sección Proceso Operativo

**Visualización del flujo de 7 pasos (del PDF):**

1. Solicitud Inicial
2. Integración de Expediente
3. Avalúo y verificación de garantía
4. Revisión y aprobación por comité de crédito
5. Formalización Notarial
6. Fondeo o disposición de crédito
7. Seguimiento y cobranza

**Nota importante:** Después del paso 5 (Formalización Notarial) y antes del paso 6 (Fondeo), se debe incluir la funcionalidad de **generación de cita presencial** para firma de contrato y entrega de garantía.

Diseño: Timeline vertical (mobile) o horizontal (desktop)
Iconos: Uno por paso
Descripción breve: Máx. 1 línea por paso

#### 1.9 Sección Testimonios

**5-6 testimonios de clientes:**

Cada testimonio incluye:

- Nombre del cliente

- Cargo/Empresa

- Foto (avatar o foto real)

- Calificación (5 estrellas)

- Texto del testimonio (máx. 3 líneas)

Diseño: Carrusel interactivo (Slick carousel de la plantilla)Animación: Fade-in suave

#### 1.10 Sección CTA Final

**Mensaje motivador:**

- Título: "¿Listo para hacer crecer tu negocio?"

- Subtítulo: "Solicita tu crédito hoy y recibe respuesta en menos de 72 horas"

- **Dos CTAs:**
    1. "Solicitar Crédito" (primario)
    1. "Contactar Asesor" (secundario)

Diseño: Hero secundario con fondo degradado

#### 1.11 Footer

- **Logo de Capitalta** (izquierda)

- **Columnas de enlaces:**
  - Productos (Crédito Simple, Empresarial, Revolvente, Venta Key)
  - Recursos (Blog, FAQ, Calculadoras)
  - Empresa (Sobre Nosotros, Contacto, Carreras)
  - Legal (Términos, Privacidad, Cookies)

- **Información de contacto:**
  - Teléfono
  - Email
  - Dirección

- **Newsletter signup:** Email + botón "Suscribirse"

- **Redes sociales:** LinkedIn, Facebook, Instagram, WhatsApp

- **Copyright:** "© 2026 Capitalta. Todos los derechos reservados."

---

### 2. PÁGINA DE PRODUCTOS (/productos)

#### 2.1 Hero Section

- Título: "Nuestros Productos"

- Subtítulo: "Soluciones financieras diseñadas para cada etapa de tu crecimiento"

#### 2.2 Listado de Productos (Grid 2x2)

Cada producto con:

- Nombre

- Descripción breve

- Montos y plazos

- Botón: "Explorar" (redirige a /productos/[producto])

---

### 3. LANDINGS POR PRODUCTO

#### 3.1 Landing - Crédito Simple (/productos/credito-simple)

**Secciones:**

**Hero:**

- Título: "Crédito Simple - Impulsa tus ideas con respaldo"

- Subtítulo: "Recursos inmediatos para nuevos inversionistas y consolidación financiera"

- CTA: "Solicitar Crédito Simple"

**Descripción del Producto:**

- Párrafo: "Impulsa tus ideas o capital de trabajo, con recursos inmediatos y un monto único."

- Ideal para: nuevos inversionistas, consolidación financiera, nuevos proyectos

**Requisitos Clave (3 cards):**

1. Actividad empresarial fija

1. Flujo comprobable

1. Garantía inmobiliaria o prendaria

**Condiciones Destacadas (4 cards):**

1. Montos: $30,000 - $10,000,000 (50% del valor del inmueble)

1. Plazos: 3 - 60 meses

1. Tasa fija competitiva

1. Sin penalización por prepago

**Beneficios (Feature blocks):**

- Respuesta en menos de 72 horas

- Proceso transparente y accesible

- Acompañamiento personalizado

- Flexibilidad en plazos

**Calculadora Específica:**

- Monto: $30,000 - $10,000,000

- Plazo: 3 - 60 meses

- Cálculo de pago mensual

- Tabla de amortización

- Descarga de PDF

**CTA Final:**

- "Solicitar Crédito Simple Ahora"

- "Contactar Asesor"

#### 3.2 Landing - Crédito Empresarial (/productos/credito-empresarial)

**Secciones similares a Crédito Simple, adaptadas:**

**Descripción:**

- "Impulsa tu operación con un crédito diseñado para crecer contigo."

- Ideal para: expansión, compra de activos, nuevos proyectos, consolidación financiera

**Requisitos Clave:**

1. Actividad formal con mínimo 1 año de operación

1. Flujo de ingresos constante y comprobable

1. Garantía inmobiliaria (libre de gravamen)

**Condiciones Destacadas:**

1. Montos: $20,000 - $50,000,000 (50% del valor del inmueble)

1. Plazos: 1 - 120 meses

1. Tasa fija competitiva

1. Sin penalización por prepago

**Calculadora Específica:**

- Monto: $20,000 - $50,000,000

- Plazo: 1 - 120 meses

#### 3.3 Landing - Crédito Revolvente (/productos/credito-revolvente)

**Descripción:**

- "Liquidez que se renueva contigo"

- "Liquidez para cubrir gastos operativos, enfrentar imprevistos o aprovechar oportunidades"

- Ideal para: necesidades recurrentes de liquidez, gastos operativos, inventarios, flujo de corto plazo

**Requisitos Clave:**

1. Negocio o empresa con al menos 1 año de operación

1. Flujo de ingresos constante y comprobable

1. Garantía inmobiliaria (libre de gravamen)

**Condiciones Destacadas:**

1. Montos: $10,000 - $50,000,000 (50% del valor del inmueble)

1. Plazos: 1 - 120 meses

1. Intereses solo sobre el monto utilizado

1. Revolvente automática (lo usas, lo pagas, lo usas otra vez)

1. Tasa fija competitiva

**Beneficio Clave:** Explicar diferencia entre revolvente y crédito simple

**Calculadora Específica:**

- Monto: $10,000 - $50,000,000

- Plazo: 1 - 120 meses

- Mostrar interés solo sobre monto utilizado

#### 3.4 Landing - Crédito Venta Key (/productos/credito-venta-key)

**Descripción:**

- "Crédito que mueve tu patrimonio"

- "Vende tu propiedad al valor correcto, con el respaldo de Venta Key"

- "Obtén liquidez inmediata para mejorar tu inmueble y maximizar su valor de venta"

**Requisitos Clave:**

1. Solicitud firmada

1. INE del solicitante y el aval

1. Carta de Buró de Crédito

1. Garantía inmobiliaria libre de gravámenes

1. Documentación completa del inmueble

**Condiciones Destacadas:**

1. Hasta $5,000,000 en valor de inmueble

1. Crédito del 30% al 40% del avalúo

1. Hasta 18 meses, liquidable desde el mes 6

1. Comisión por apertura: 4.5% + IVA

1. Interés: 3% + IVA

1. Liquidez en menos de 20 días

1. Acompañamiento durante la venta mediante alianzas inmobiliarias

**Calculadora Específica:**

- Valor del inmueble: $100,000 - $5,000,000

- Porcentaje de crédito: 30% - 40%

- Mostrar: Monto de crédito, comisión, interés, total a pagar

**CTA:** "Solicitar Venta Key Ahora"

---

### 4. PÁGINA SOBRE NOSOTROS (/sobre-nosotros)

#### 4.1 Hero

- Título: "Sobre Capitalta"

- Subtítulo: "Una SOFOM diferente, comprometida con tu crecimiento"

#### 4.2 Sección Historia

- Párrafo sobre la fundación y evolución de Capitalta

#### 4.3 Sección Visión, Misión y Valores

- Visión completa

- Misión completa

- 5 valores con descripción

#### 4.4 Sección Logros e Hitos

- Timeline o cards con hitos importantes

#### 4.5 Sección Certificaciones y Regulaciones

- Logos de reguladores (CNBV, etc.)

- Texto sobre cumplimiento normativo

- Información sobre protección de datos

---

### 5. PÁGINA DE BLOG (/blog)

#### 5.1 Hero

- Título: "Blog de Capitalta"

- Subtítulo: "Artículos sobre finanzas, créditos y crecimiento empresarial"

#### 5.2 Listado de Artículos

- Grid 3 columnas (responsive)

- Cada artículo con:
  - Imagen destacada
  - Categoría (tag)
  - Título
  - Resumen (máx. 2 líneas)
  - Fecha de publicación
  - Autor
  - Link: "Leer más"

#### 5.3 Filtros y Búsqueda

- Filtro por categoría

- Búsqueda por texto

- Paginación

#### 5.4 Artículos Destacados

- 3-4 artículos en sección especial al inicio

---

### 6. PÁGINA DE ARTÍCULO INDIVIDUAL (/blog/articulo/[slug])

#### 6.1 Contenido

- Imagen destacada (hero)

- Título

- Meta: Autor, fecha, categoría, tiempo de lectura

- Contenido en Markdown (convertir a HTML)

- Tabla de contenidos (si es largo)

#### 6.2 Sección Autor

- Foto, nombre, bio, redes sociales

#### 6.3 Artículos Relacionados

- 3 artículos similares al final

#### 6.4 Compartir en Redes

- Botones para compartir en LinkedIn, Facebook, Twitter, WhatsApp

---

### 7. PÁGINA DE CONTACTO (/contacto)

#### 7.1 Hero

- Título: "Contacto"

- Subtítulo: "¿Preguntas? Estamos aquí para ayudarte"

#### 7.2 Formulario de Contacto

**Campos:**

- Nombre (requerido)

- Email (requerido, validación)

- Teléfono (requerido)

- Asunto (select: Información de producto, Solicitud de crédito, Soporte, Otro)

- Mensaje (textarea, requerido)

- Checkbox: Acepto términos y privacidad

- Botón: "Enviar Mensaje"

**Validación:**

- Todos los campos requeridos

- Email válido

- Teléfono con formato

- Mensaje mínimo 10 caracteres

**Acción al enviar:**

- Guardar en Supabase (tabla `leads`)

- Enviar email de confirmación al usuario

- Mostrar mensaje de éxito

- Limpiar formulario

#### 7.3 Información de Contacto

- **Teléfono:** [Número de Capitalta]

- **Email:** [Email de Capitalta]

- **Dirección:** [Dirección de Capitalta]

- **Horarios:** Lunes-Viernes 9:00 AM - 6:00 PM

#### 7.4 Mapa Interactivo

- Mapa de Leaflet mostrando ubicación de Capitalta

- Marcador con información

#### 7.5 FAQ Rápido

- 5-6 preguntas frecuentes expandibles

---

### 8. PÁGINAS DE AUTENTICACIÓN

#### 8.1 Login (/auth/login)

**Campos:**

- Email (requerido, validación)

- Contraseña (requerido)

- Checkbox: "Recuérdame"

- Link: "¿Olvidaste tu contraseña?"

**Botones:**

- "Iniciar Sesión" (primario)

- "¿No tienes cuenta? Regístrate" (link a /auth/registro)

**Integración Supabase:**

- Usar `supabase.auth.signInWithPassword()`

#### 8.2 Registro (/auth/registro)

**Opción A: Registro Simple**

- Email

- Contraseña

- Confirmar contraseña

- Checkbox: Acepto términos

**Opción B: Registro Wizard (Recomendado)**

- Paso 1: Email y contraseña

- Paso 2: Datos personales (nombre, apellido, teléfono)

- Paso 3: Tipo de cliente (Persona Física, Persona Moral)

- Paso 4: Verificación OTP

- Paso 5: Confirmación

**Integración Supabase:**

- Crear usuario con `supabase.auth.signUp()`

- Guardar datos adicionales en tabla `users`

#### 8.3 Recuperar Contraseña (/auth/recuperar-password)

- Email (requerido)

- Botón: "Enviar enlace de recuperación"

- Mensaje: "Revisa tu email para instrucciones"

#### 8.4 Verificación OTP (/auth/verificar-otp)

- Campo para código OTP (6 dígitos)

- Botón: "Verificar"

- Link: "Reenviar código"

- Contador de tiempo (60 segundos)

---

## CALCULADORAS AVANZADAS

### Arquitectura General

Cada calculadora debe tener:

1. **Inputs de parámetros** (monto, plazo, tipo de crédito)

1. **Cálculo en tiempo real** (actualizar al cambiar valores)

1. **Resultados principales** (pago mensual, interés total, total a pagar)

1. **Tabla de amortización** (mes, pago, principal, interés, saldo)

1. **Descarga de PDF** (con logo y branding Capitalta)

1. **Guardado de leads** (nombre, email, teléfono, datos de la cotización)

1. **CTA de conversión** (Solicitar crédito, Contactar asesor)

### Cálculos Específicos

#### Fórmula de Pago Mensual (Crédito Simple, Empresarial, Revolvente)

```
Pago Mensual = Monto × [Tasa Mensual × (1 + Tasa Mensual)^Plazo] / [(1 + Tasa Mensual)^Plazo - 1]

Donde:
- Tasa Mensual = Tasa Anual / 12 / 100
- Plazo = número de meses
```

#### Fórmula para Crédito Venta Key

```
Monto de Crédito = Valor del Inmueble × Porcentaje (30% - 40%)
Comisión = Monto de Crédito × 4.5% + IVA
Interés Mensual = Monto de Crédito × 3% / 12 + IVA
Total a Pagar = Monto + Comisión + (Interés × Meses)
```

### Calculadora 1: Crédito Simple (/calculadoras/calculadora-simple)

**Parámetros:**

- Monto: $30,000 - $10,000,000 (slider + input)

- Plazo: 3 - 60 meses (slider + input)

- Tasa anual: 12% - 20% (mostrar rango, permitir entrada manual)

**Resultados:**

- Pago mensual

- Interés total

- Total a pagar

- Tabla de amortización (12 primeros meses + últimos 3)

**Formulario de Lead:**

- Nombre

- Email

- Teléfono

- Empresa (opcional)

**Descarga PDF:**

- Logo de Capitalta

- Datos del cliente

- Parámetros de la cotización

- Tabla de amortización completa

- Fecha de generación

- Nota: "Esta cotización es válida por 30 días"

### Calculadora 2: Crédito Empresarial (/calculadoras/calculadora-empresarial)

**Parámetros:**

- Monto: $20,000 - $50,000,000

- Plazo: 1 - 120 meses

- Tasa anual: 10% - 18%

**Resultados:** Similares a Crédito Simple

### Calculadora 3: Crédito Revolvente (/calculadoras/calculadora-revolvente)

**Parámetros:**

- Monto de línea: $10,000 - $50,000,000

- Plazo: 1 - 120 meses

- Monto utilizado: 0 - 100% de la línea

- Tasa anual: 10% - 18%

**Resultados:**

- Pago mensual (solo sobre monto utilizado)

- Interés total (solo sobre monto utilizado)

- Total a pagar

- Tabla de amortización

**Beneficio:** Mostrar comparativa: "Si usas 50% de la línea, pagas 50% de interés"

### Calculadora 4: Crédito Venta Key (/calculadoras/calculadora-venta-key)

**Parámetros:**

- Valor del inmueble: $100,000 - $5,000,000

- Porcentaje de crédito: 30% - 40% (slider)

- Plazo: 6 - 18 meses

**Resultados:**

- Monto de crédito

- Comisión por apertura (4.5% + IVA)

- Interés mensual (3% + IVA)

- Total a pagar

- Fecha de liquidación (desde mes 6)

**Tabla de Amortización:** Mostrar estructura de pagos

---

## FLUJO DE REGISTRO GUIADO (WIZARD)

### Objetivo

Convertir visitantes en leads de forma gradual y no invasiva, usando un flujo de 4-5 pasos.

**Nota:** Este wizard es el primer contacto. Después de la aprobación del crédito, se generará una cita presencial para firma de contrato y entrega de garantía.

### Pasos del Wizard

#### Paso 1: Monto y Plazo

- Slider para monto

- Slider para plazo

- Mostrar pago mensual estimado en tiempo real

- Botón: "Siguiente"

#### Paso 2: Tipo de Cliente

- Radio buttons: "Persona Física" / "Persona Moral"

- Descripción breve de cada opción

- Botón: "Siguiente"

#### Paso 3: Datos Personales

- Nombre (requerido)

- Apellido (requerido)

- Email (requerido, validación)

- Teléfono (requerido)

- Empresa (si es Persona Moral)

- RFC (si es Persona Moral)

- Botón: "Siguiente"

#### Paso 4: Verificación OTP

- Mostrar: "Hemos enviado un código a [email]"

- Input para código OTP (6 dígitos)

- Link: "Reenviar código"

- Botón: "Verificar"

######## Paso 5: Confirmación
- Resumen de datos
- Mensaje: "¡Bienvenido a Capitalta!"
- Botón: "Ir a Mi Cuenta"
- Botón: "Descargar Cotización"

---

## SISTEMA DE CITAS PRESENCIALES

### Objetivo

Permitir que clientes aprobados generen citas presenciales para **firma de contrato y entrega de garantía**, cumpliendo con el requisito de visita presencial obligatoria en el proceso de crédito.

### Flujo de Citas

#### Paso 1: Elegibilidad
- Solo clientes con crédito aprobado pueden generar cita
- Verificar estado en Supabase: `estado_credito = 'aprobado'`
- Mostrar mensaje si no es elegible

#### Paso 2: Seleccionar Fecha y Hora
**Interfaz de calendario:**
- Calendario interactivo mostrando fechas disponibles
- Excluir: Fines de semana, festivos, fechas pasadas
- Mostrar horarios disponibles (ej: 9:00 AM, 10:00 AM, 11:00 AM, 2:00 PM, 3:00 PM, 4:00 PM)
- Máximo 3 citas por día por sucursal
- Validar disponibilidad en tiempo real

#### Paso 3: Seleccionar Sucursal
**Opciones de ubicación:**
- Mostrar mapa con sucursales de Capitalta
- Listar sucursales con dirección y teléfono
- Permitir filtrar por zona/estado
- Mostrar distancia desde ubicación del cliente (si permite geolocalización)
- Cada sucursal tiene capacidad diaria

#### Paso 4: Confirmar Datos
**Resumen de la cita:**
- Fecha y hora seleccionadas
- Sucursal y dirección
- Datos del cliente (nombre, teléfono, email)
- Monto del crédito aprobado
- Tipo de crédito
- Checkbox: "Confirmo que asisto a esta cita"
- Botón: "Confirmar Cita"
- Botón: "Cambiar Fecha/Hora"

#### Paso 5: Confirmación y Recordatorio
**Después de confirmar:**
- Mostrar pantalla de éxito
- Generar código de cita (ej: CAP-2026-001234)
- Botón: "Descargar Comprobante de Cita" (PDF)
- Botón: "Volver al Inicio"

**Enviar emails:**
1. Email de confirmación inmediato con detalles de la cita
2. Email de recordatorio 24 horas antes
3. Email de recordatorio 1 hora antes (opcional)

### Página de Gestión de Citas (/mi-cuenta/citas)

**Funcionalidades:**
- Listar todas las citas del cliente (pasadas y futuras)
- Mostrar estado: Confirmada, Completada, Cancelada
- Botón: "Reprogramar Cita" (si es futura)
- Botón: "Cancelar Cita" (con confirmación)
- Botón: "Descargar Comprobante" (PDF)
- Mostrar mapa con ubicación de sucursal
- Mostrar instrucciones: "Qué traer a la cita"

**Instrucciones para la cita:**
- Documentación requerida:
  - Identificación oficial (INE, pasaporte)
  - Comprobante de domicilio
  - Documentación del inmueble (si aplica)
  - Avalúo inmobiliario
  - Otros documentos según producto
- Tiempo estimado: 30-45 minutos
- Traer: Copia de la cotización
- Nota: "Llegue 10 minutos antes de su cita"

### Tabla de Citas en Supabase

```javascript
// Tabla: citas
{
  id: UUID (PK),
  cliente_id: FK a users,
  credito_id: FK a creditos,
  sucursal_id: FK a sucursales,
  fecha: timestamp,
  hora: time,
  estado: enum ['confirmada', 'completada', 'cancelada', 'no_asistio'],
  codigo_cita: string (unique),
  notas_cliente: text,
  notas_interno: text,
  documentos_entregados: JSON,
  garantia_recibida: boolean,
  contrato_firmado: boolean,
  fecha_creacion: timestamp,
  fecha_actualizacion: timestamp,
  fecha_cancelacion: timestamp (nullable),
  razon_cancelacion: text (nullable)
}

// Tabla: sucursales
{
  id: UUID (PK),
  nombre: string,
  direccion: string,
  ciudad: string,
  estado: string,
  telefono: string,
  email: string,
  horario_atencion: JSON,
  capacidad_diaria: integer,
  latitud: float,
  longitud: float,
  activa: boolean
}

// Tabla: creditos
{
  id: UUID (PK),
  cliente_id: FK a users,
  tipo_credito: enum ['simple', 'empresarial', 'revolvente', 'venta_key'],
  monto_aprobado: number,
  plazo_meses: number,
  tasa_anual: number,
  estado: enum ['solicitado', 'en_revision', 'aprobado', 'rechazado', 'fondeo_completado', 'cancelado'],
  fecha_aprobacion: timestamp,
  fecha_fondeo: timestamp,
  cita_id: FK a citas (nullable),
  fecha_creacion: timestamp,
  fecha_actualizacion: timestamp
}
```

### Endpoints API para Citas

**GET /api/citas/disponibilidad**
- Parámetros: sucursal_id, fecha
- Retorna: Horarios disponibles para esa fecha y sucursal

**POST /api/citas**
- Body: { cliente_id, credito_id, sucursal_id, fecha, hora }
- Retorna: Datos de la cita creada
- Validar: Disponibilidad, elegibilidad del cliente

**GET /api/citas/:id**
- Retorna: Detalles de la cita

**PUT /api/citas/:id**
- Body: { fecha, hora, sucursal_id, estado }
- Retorna: Cita actualizada

**DELETE /api/citas/:id**
- Cancelar cita (soft delete, marcar como cancelada)
- Retorna: Confirmación

**GET /api/sucursales**
- Retorna: Lista de todas las sucursales activas

**GET /api/sucursales/:id**
- Retorna: Detalles de sucursal (ubicación, horarios, capacidad)

### Componentes Necesarios

**CalendarioDisponibilidad.jsx**
- Calendario interactivo
- Mostrar fechas disponibles en verde, no disponibles en gris
- Permitir seleccionar fecha
- Mostrar horarios para fecha seleccionada

**SelectorSucursal.jsx**
- Mapa con marcadores de sucursales
- Lista de sucursales con dirección y distancia
- Permitir filtrar por zona
- Mostrar horarios de atención

**ConfirmacionCita.jsx**
- Mostrar resumen de cita
- Mostrar instrucciones
- Botón de confirmación

**ComprobanteCita.jsx**
- Generar PDF con detalles de cita
- Incluir código de cita
- Incluir instrucciones
- Incluir mapa de ubicación

**GestorCitas.jsx**
- Listar citas del cliente
- Permitir reprogramar
- Permitir cancelar
- Mostrar estado

### Validaciones

✅ Solo clientes con crédito aprobado pueden agendar  
✅ No permitir fechas pasadas  
✅ No permitir fines de semana ni festivos  
✅ Validar capacidad diaria de sucursal  
✅ Validar que cliente no tenga otra cita en la misma fecha  
✅ Requerir confirmación antes de agendar  
✅ Enviar confirmación por email  
✅ Permitir reprogramación hasta 24 horas antes  
✅ Registrar asistencia en sistema  
✅ Generar reporte de citas no asistidas  

### Notificaciones

**Email de confirmación:**
- Asunto: "Tu cita en Capitalta - [Fecha] [Hora]"
- Incluir: Código de cita, fecha, hora, sucursal, dirección, teléfono
- Incluir: Instrucciones y documentos a traer
- Incluir: Mapa de ubicación
- Incluir: Link para reprogramar o cancelar

**Email de recordatorio (24 horas antes):**
- Asunto: "Recordatorio: Tu cita en Capitalta mañana a las [Hora]"
- Incluir: Detalles de cita
- Incluir: Link de confirmación de asistencia

**SMS (opcional):**
- Recordatorio 1 hora antes de la cita
- Mensaje: "Recordatorio: Tu cita en Capitalta en 1 hora. Código: [CODIGO]"

### Flujo Completo de Crédito con Cita

```
1. Cliente solicita crédito → Wizard de registro
2. Sistema captura datos → Guardado en Supabase
3. Equipo Capitalta revisa → Estado: "en_revision"
4. Crédito aprobado → Email de aprobación
5. Cliente accede a /mi-cuenta → Ve opción "Agendar Cita"
6. Cliente agrega cita → Sistema valida disponibilidad
7. Cita confirmada → Emails de confirmación y recordatorios
8. Cliente asiste a cita → Firma contrato y entrega garantía
9. Sistema registra asistencia → Estado: "completada"
10. Fondeo se procesa → Crédito activo
```

### Consideraciones Especiales

- **Zona horaria:** Usar zona horaria de México (CST/CDT)
- **Idioma:** Español por defecto, preparar para inglés
- **Accesibilidad:** Asegurar que calendario sea accesible por teclado
- **Mobile:** Optimizar interfaz de calendario para móvil
- **Seguridad:** Validar que cliente solo vea sus propias citas
- **Auditoría:** Registrar todos los cambios de citas (quién, cuándo, qué cambió)

### Integración con Supabase

**Tabla ****`leads`****:**

```
- id (UUID, PK)
- email (string, unique)
- nombre (string)
- apellido (string)
- telefono (string)
- tipo_cliente (enum: PF, PM)
- empresa (string, nullable)
- rfc (string, nullable)
- monto_solicitado (number)
- plazo_meses (number)
- tipo_credito (enum: simple, empresarial, revolvente, venta_key)
- estado (enum: lead, registrado, cotizado, convertido)
- fecha_creacion (timestamp)
- fecha_actualizacion (timestamp)
```

**Tabla ****`cotizaciones`****:**

```
- id (UUID, PK)
- lead_id (FK a leads)
- monto (number)
- plazo (number)
- tasa_anual (number)
- pago_mensual (number)
- interes_total (number)
- total_a_pagar (number)
- tabla_amortizacion (JSON)
- fecha_generacion (timestamp)
- fecha_expiracion (timestamp)
```

---

## INTEGRACIÓN SUPABASE

### Configuración Inicial

1. **Crear proyecto en Supabase**

1. **Habilitar autenticación:** Email/Contraseña + OTP

1. **Crear tablas:** users, leads, cotizaciones, articulos_blog

1. **Configurar políticas RLS** (Row Level Security)

1. **Crear funciones SQL** para cálculos complejos

### Endpoints Necesarios

**Autenticación:**

- `POST /auth/signup` - Registrar usuario

- `POST /auth/login` - Iniciar sesión

- `POST /auth/logout` - Cerrar sesión

- `POST /auth/reset-password` - Recuperar contraseña

- `POST /auth/verify-otp` - Verificar OTP

**Leads y Cotizaciones:**

- `POST /leads` - Crear lead

- `GET /leads/:id` - Obtener lead

- `POST /cotizaciones` - Crear cotización

- `GET /cotizaciones/:id` - Obtener cotización

**Blog:**

- `GET /articulos` - Listar artículos

- `GET /articulos/:slug` - Obtener artículo

- `POST /articulos` - Crear artículo (admin)

**Contacto:**

- `POST /contacto` - Enviar mensaje de contacto

### Seguridad

- Usar JWT tokens para autenticación

- Implementar RLS en todas las tablas

- Validar datos en backend

- Rate limiting en endpoints críticos

- CORS configurado correctamente

---

## FUNCIONALIDADES INTERACTIVAS

### 1. Calculadoras Dinámicas

- Cálculo en tiempo real al cambiar valores

- Sliders para entrada intuitiva

- Inputs numéricos para precisión

- Validación de rangos

- Tabla de amortización expandible

### 2. Formularios Avanzados

- Validación en tiempo real

- Mensajes de error claros

- Indicador de progreso (para wizard)

- Guardado automático (draft)

- Confirmación antes de enviar

### 3. Animaciones

- Fade-in de secciones al scroll

- Parallax en hero sections

- Hover effects en cards y botones

- Transiciones suaves entre pasos del wizard

- Contadores animados en métricas

### 4. Interactividad

- Selector de tema (claro/oscuro)

- Selector de idioma (estructura preparada)

- Filtros en blog

- Búsqueda en artículos

- Modales para CTAs

- Tooltips informativos

---

## AUTOMATIZACIÓN E IA

### 1. Agente IA Conversacional (Chatbot Integrado)

**Ubicación:** Widget flotante en esquina inferior derecha de toda la app

**Funcionalidades Principales:**

#### 1.1 Responder Preguntas sobre Productos
- Información completa de los 4 productos (Simple, Empresarial, Revolvente, Venta Key)
- Tasas de interés, plazos, montos mínimos y máximos
- Requisitos y documentación necesaria
- Diferencias entre productos
- Comparativas personalizadas

#### 1.2 Orientación Personalizada
- Preguntar sobre necesidad del usuario (monto, plazo, tipo de negocio)
- Recomendar producto más adecuado
- Explicar proceso completo
- Aclarar dudas sobre garantías
- Informar sobre tiempos de respuesta

#### 1.3 Captura de Leads
- Recopilar información básica durante conversación:
  - Nombre
  - Email
  - Teléfono
  - Tipo de cliente (PF o PM)
  - Monto aproximado requerido
  - Tipo de crédito de interés
- Guardar en Supabase tabla `leads_chat`
- No ser invasivo, recopilar gradualmente

#### 1.4 Registro de Solicitudes
- Permitir que usuario inicie solicitud directamente desde chat
- Opción: "Quiero solicitar un crédito"
- Redirigir a wizard de registro (/auth/registro)
- O completar registro dentro del chat (si es posible)
- Guardar datos capturados para pre-llenar formulario

#### 1.5 Generación de Citas
- Después de aprobación, ofrecer: "¿Deseas agendar tu cita presencial?"
- Permitir seleccionar fecha y sucursal desde chat
- Confirmar cita
- Enviar confirmación por email
- Guardar en tabla `citas`

#### 1.6 Información de Contacto
- Teléfono de Capitalta
- Email de soporte
- Horarios de atención
- Ubicaciones de sucursales
- Opción de contacto directo con ejecutivo

**Tecnología:**
- **LLM:** OpenAI GPT-4 (o similar)
- **Framework:** Vercel AI SDK o similar
- **Integración:** API de OpenAI
- **Base de conocimiento:** Documento de contexto con información de Capitalta
- **Almacenamiento:** Supabase para conversaciones y leads

**Prompt del Sistema (System Prompt):**

```
Eres un asistente de Capitalta, una SOFOM mexicana especializada en créditos flexibles.

Tu rol es:
1. Responder preguntas sobre nuestros productos: Crédito Simple, Empresarial, Revolvente y Venta Key
2. Orientar a usuarios hacia el producto más adecuado según sus necesidades
3. Capturar información de leads de forma natural y no invasiva
4. Facilitar el registro de solicitudes de crédito
5. Ayudar a agendar citas presenciales
6. Proporcionar información de contacto y ubicaciones

Información sobre Capitalta:
- Somos una SOFOM diferente, más que otorgar créditos, acompañamos a cada cliente
- Ofrecemos soluciones financieras ágiles y flexibles
- Respuesta en menos de 72 horas
- Tasa fija competitiva
- Sin penalización por prepago
- Procesos claros, accesibles y confiables

Productos:
1. Crédito Simple: $30,000 - $10,000,000 | 3-60 meses
2. Crédito Empresarial: $20,000 - $50,000,000 | 1-120 meses
3. Crédito Revolvente: $10,000 - $50,000,000 | 1-120 meses
4. Crédito Venta Key: Hasta $5,000,000 | 6-18 meses

Siempre sé amable, profesional y honesto.
Si no sabes algo, ofrece conectar con un ejecutivo.
No hagas promesas sobre tasas o aprobación, solo proporciona rangos generales.
Fomenta que el usuario complete el registro o solicite una cita.
```

**Flujo de Conversación Ejemplo:**

```
Usuario: "Hola, necesito un crédito"
Bot: "¡Hola! Bienvenido a Capitalta. Me alegra poder ayudarte. 
     ¿Cuál es el monto aproximado que necesitas y para qué?"

Usuario: "Necesito $500,000 para expandir mi negocio"
Bot: "Excelente. Para un negocio en expansión, te recomiendo nuestro Crédito Empresarial.
     Ofrece montos hasta $50,000,000 y plazos de 1 a 120 meses.
     ¿Cuánto tiempo llevas operando tu negocio?"

Usuario: "3 años"
Bot: "Perfecto, cumples con nuestros requisitos. 
     El proceso es simple:
     1. Solicitud inicial
     2. Revisión de documentos
     3. Aprobación en menos de 72 horas
     4. Cita presencial para firma
     5. Fondeo del crédito
     
     ¿Te gustaría conocer más detalles o iniciar una solicitud?"

Usuario: "Sí, quiero solicitar"
Bot: "Perfecto. Para procesar tu solicitud, necesito algunos datos:
     ¿Cuál es tu nombre?"

[Captura de datos gradualmente]

Bot: "Gracias por la información. He guardado tu solicitud.
     Puedes completar el registro aquí [LINK] o un ejecutivo te contactará pronto.
     ¿Hay algo más en lo que pueda ayudarte?"
```

**Tabla para Almacenar Conversaciones:**

```javascript
// Tabla: chat_conversaciones
{
  id: UUID (PK),
  usuario_id: FK a users (nullable, si no está registrado),
  session_id: string (para usuarios anónimos),
  mensajes: JSON array [
    { rol: 'user' | 'assistant', contenido: string, timestamp: timestamp }
  ],
  lead_id: FK a leads (nullable),
  estado: enum ['activa', 'cerrada', 'transferida_a_ejecutivo'],
  ejecutivo_asignado: string (nullable),
  fecha_inicio: timestamp,
  fecha_cierre: timestamp (nullable),
  notas: text
}
```

**Endpoints API para Chat:**

**POST /api/chat/mensaje**
- Body: { session_id, usuario_id?, mensaje }
- Retorna: { respuesta_bot, lead_capturado?, siguiente_accion? }
- Llamar a OpenAI API con contexto de Capitalta
- Guardar conversación en Supabase

**GET /api/chat/historial/:session_id**
- Retorna: Historial de conversación

**POST /api/chat/transferir**
- Body: { session_id, razon }
- Transferir a ejecutivo humano
- Crear ticket de soporte

**Componentes Necesarios:**

**ChatWidget.jsx**
- Widget flotante en esquina inferior derecha
- Botón para abrir/cerrar chat
- Historial de mensajes
- Input para escribir
- Indicador de "escribiendo..."
- Sugerencias rápidas (buttons)

**ChatMessage.jsx**
- Mensaje del usuario
- Mensaje del bot
- Estilos diferenciados
- Soporte para links y botones

**ChatSuggestions.jsx**
- Botones de acciones rápidas:
  - "Información de productos"
  - "Solicitar crédito"
  - "Agendar cita"
  - "Contactar ejecutivo"
  - "Ver calculadora"

**Validaciones y Seguridad:**

✅ Validar que usuario no abuse del chat (rate limiting)  
✅ No revelar información sensible de otros usuarios  
✅ Registrar todas las conversaciones para auditoría  
✅ Permitir transferencia a ejecutivo humano si es necesario  
✅ Validar datos capturados antes de guardar en BD  
✅ Usar HTTPS para todas las comunicaciones  
✅ Encriptar datos sensibles en tránsito  

### 2. Chatbot WhatsApp (Futuro)

**Funcionalidades:**
- Responder preguntas sobre productos
- Información de tasas y plazos
- Guiar a usuario a landing específica
- Capturar leads desde WhatsApp

**Integración:** Twilio + Supabase

### 3. FAQ Inteligente

**Preguntas Frecuentes:**

1. **¿Cuál es la diferencia entre Crédito Simple y Empresarial?**
  - Respuesta clara con tabla comparativa

1. **¿Cuál es el plazo mínimo y máximo?**
  - Respuesta con rangos por producto

1. **¿Cuál es la tasa de interés?**
  - Respuesta: "Las tasas varían entre 10% y 20% anual según el producto y perfil del cliente"

1. **¿Cuánto tiempo tarda el proceso?**
  - Respuesta: "Respuesta en menos de 72 horas"

1. **¿Qué garantías se requieren?**
  - Respuesta: "Garantía inmobiliaria o prendaria según el producto"

1. **¿Hay penalización por prepago?**
  - Respuesta: "No, puedes prepagar sin penalización"

1. **¿Cómo solicito un crédito?**
  - Respuesta con pasos y link a formulario

1. **¿Qué documentos necesito?**
  - Respuesta: "Identificación, comprobante de ingresos, documentación del inmueble"

### 3. Email Marketing

**Secuencias:**

1. **Bienvenida:** Después de registro

1. **Recordatorio:** 3 días después si no completa cotización

1. **Abandono de carrito:** Si inicia wizard pero no termina

1. **Confirmación de cotización:** Después de generar cotización

1. **Newsletter:** Artículos nuevos del blog

---

## OPTIMIZACIONES

### Rendimiento

- **Lazy loading:** Imágenes y componentes

- **Code splitting:** Automático de Next.js

- **Image optimization:** next/image para todas las imágenes

- **Caché:** Estrategia de caché en Vercel

- **Bundle size:** Monitoreo con Vercel Analytics

**Meta:** Lighthouse score > 90

### SEO

- **Meta tags:** Descriptivos y únicos por página

- **Open Graph:** Para compartir en redes

- **Sitemap:** Generado automáticamente

- **Robots.txt:** Configurado correctamente

- **Structured data:** JSON-LD para productos y FAQ

- **Canonical tags:** Para evitar duplicados

### Accesibilidad

- **ARIA labels:** En todos los inputs y botones

- **Navegación por teclado:** Funcional en toda la app

- **Contraste de colores:** WCAG AA mínimo

- **Alt text:** En todas las imágenes

- **Semantic HTML:** Estructura correcta

### Mobile-First

- **Responsive design:** Breakpoints: xs (0), sm (600), md (960), lg (1280), xl (1920)

- **Touch-friendly:** Botones mínimo 48x48px

- **Menú hamburguesa:** En mobile

- **Optimización de formularios:** Teclado numérico para números

---

## ESTRUCTURA DE CARPETAS RECOMENDADA

```
capitalta-web/
├── src/
│   ├── app/
│   │   ├── (landings)/
│   │   │   ├── (default)/
│   │   │   │   ├── page.jsx              # Página principal
│   │   │   │   ├── layout.jsx
│   │   │   │   └── data/
│   │   │   │       ├── hero.js
│   │   │   │       ├── valores.js
│   │   │   │       ├── productos.js
│   │   │   │       ├── proceso.js
│   │   │   │       ├── testimonios.js
│   │   │   │       └── metricas.js
│   │   │   ├── productos/
│   │   │   │   ├── page.jsx              # Listado de productos
│   │   │   │   ├── credito-simple/
│   │   │   │   │   ├── page.jsx
│   │   │   │   │   └── data.js
│   │   │   │   ├── credito-empresarial/
│   │   │   │   │   ├── page.jsx
│   │   │   │   │   └── data.js
│   │   │   │   ├── credito-revolvente/
│   │   │   │   │   ├── page.jsx
│   │   │   │   │   └── data.js
│   │   │   │   └── credito-venta-key/
│   │   │   │       ├── page.jsx
│   │   │   │       └── data.js
│   │   │   ├── calculadoras/
│   │   │   │   ├── calculadora-simple/
│   │   │   │   │   ├── page.jsx
│   │   │   │   │   └── components/
│   │   │   │   ├── calculadora-empresarial/
│   │   │   │   ├── calculadora-revolvente/
│   │   │   │   └── calculadora-venta-key/
│   │   │   ├── sobre-nosotros/
│   │   │   │   ├── page.jsx
│   │   │   │   └── data.js
│   │   │   ├── blog/
│   │   │   │   ├── page.jsx              # Listado
│   │   │   │   ├── [slug]/
│   │   │   │   │   └── page.jsx          # Artículo individual
│   │   │   │   └── data/
│   │   │   ├── contacto/
│   │   │   │   ├── page.jsx
│   │   │   │   └── components/
│   │   │   └── layout.jsx                # Layout compartido
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.jsx
│   │   │   ├── registro/
│   │   │   │   └── page.jsx
│   │   │   ├── recuperar-password/
│   │   │   │   └── page.jsx
│   │   │   ├── verificar-otp/
│   │   │   │   └── page.jsx
│   │   │   └── layout.jsx
│   │   ├── (common)/
│   │   │   └── layout.jsx                # Layout global
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── signup/route.js
│   │   │   │   ├── login/route.js
│   │   │   │   └── logout/route.js
│   │   │   ├── leads/route.js
│   │   │   ├── cotizaciones/route.js
│   │   │   ├── contacto/route.js
│   │   │   └── blog/route.js
│   │   ├── layout.jsx
│   │   ├── page.jsx
│   │   └── globals.css
│   ├── components/
│   │   ├── navbar/
│   │   │   ├── Navbar.jsx
│   │   │   ├── NavMenu.jsx
│   │   │   └── NavButtons.jsx
│   │   ├── footer/
│   │   │   ├── Footer.jsx
│   │   │   ├── FooterLinks.jsx
│   │   │   └── Newsletter.jsx
│   │   ├── calculadoras/
│   │   │   ├── CalculadoraBase.jsx
│   │   │   ├── TablAamortizacion.jsx
│   │   │   ├── FormularioLead.jsx
│   │   │   └── DescargaPDF.jsx
│   │   ├── auth/
│   │   │   ├── LoginForm.jsx
│   │   │   ├── RegistroWizard.jsx
│   │   │   └── OTPVerification.jsx
│   │   ├── blog/
│   │   │   ├── ArticuloCard.jsx
│   │   │   ├── ArticuloFiltros.jsx
│   │   │   └── ArticuloRelacionados.jsx
│   │   ├── productos/
│   │   │   ├── ProductoCard.jsx
│   │   │   └── ProductoComparativa.jsx
│   │   └── common/
│   │       ├── Hero.jsx
│   │       ├── CTA.jsx
│   │       ├── FeatureCard.jsx
│   │       └── Testimonial.jsx
│   ├── hooks/
│   │   ├── useCalculadora.js
│   │   ├── useAuth.js
│   │   ├── useLead.js
│   │   └── useSupabase.js
│   ├── lib/
│   │   ├── supabase.js
│   │   ├── calculadora.js
│   │   ├── pdf-generator.js
│   │   └── validaciones.js
│   ├── utils/
│   │   ├── formatters.js
│   │   ├── constants.js
│   │   └── helpers.js
│   ├── styles/
│   │   ├── theme.js
│   │   ├── colors.js
│   │   └── typography.js
│   ├── data/
│   │   ├── productos.js
│   │   ├── blog.js
│   │   ├── faq.js
│   │   └── contacto.js
│   └── config/
│       └── branding.json
├── public/
│   ├── assets/
│   │   ├── logos/
│   │   │   ├── capitalta-logo.svg
│   │   │   ├── capitalta-icon.svg
│   │   │   └── capitalta-watermark.svg
│   │   ├── images/
│   │   │   ├── hero/
│   │   │   ├── productos/
│   │   │   ├── testimonios/
│   │   │   └── blog/
│   │   └── icons/
│   ├── robots.txt
│   └── sitemap.xml
├── package.json
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── .env.local
```

---

## DATOS Y CONTENIDO

### Datos de Ejemplo (Placeholder)

**Contacto:**

- Teléfono: +52 (XX) XXXX-XXXX

- Email: [contacto@capitalta.mx](mailto:contacto@capitalta.mx)

- Dirección: [Dirección de Capitalta]

**Testimonios (5-6 ejemplos):**

```
1. "Con Capitalta obtuve el crédito que necesitaba en menos de 72 horas. El proceso fue transparente y sin sorpresas."
   - Juan Pérez, Emprendedor

2. "La flexibilidad de sus plazos me permitió ajustar el crédito a mi flujo de caja. Excelente servicio."
   - María García, Dueña de Negocio

3. "Como SOFOM diferente, realmente se nota el acompañamiento personalizado. Muy recomendado."
   - Carlos López, Empresario

4. "Prepagué mi crédito sin penalización. Capitalta cumple lo que promete."
   - Ana Martínez, Inversionista

5. "El equipo de Capitalta fue muy profesional y atento. Volvería a solicitar con ellos."
   - Roberto Sánchez, Empresario

6. "Excelente opción para consolidar deudas y obtener liquidez. Muy satisfecho."
   - Laura Rodríguez, Propietaria
```

**Artículos de Blog (Títulos sugeridos):**

1. "5 Razones para elegir un crédito revolvente en 2026"

1. "Guía completa: Cómo preparar tu solicitud de crédito empresarial"

1. "Tasa de interés fija vs variable: ¿Cuál es mejor para ti?"

1. "El proceso de avalúo inmobiliario explicado"

1. "Cómo maximizar el valor de tu propiedad antes de venderla"

1. "Crédito para emprendedores: Primeros pasos hacia el crecimiento"

---

## REQUISITOS FUNCIONALES

### Autenticación

- ✅ Registro con email y contraseña

- ✅ Verificación OTP

- ✅ Login seguro

- ✅ Recuperación de contraseña

- ✅ Sesiones persistentes

- ✅ Logout

### Calculadoras

- ✅ Cálculo en tiempo real

- ✅ Validación de rangos

- ✅ Tabla de amortización

- ✅ Descarga de PDF

- ✅ Guardado de leads

### Formularios

- ✅ Validación en tiempo real

- ✅ Mensajes de error claros

- ✅ Guardado en Supabase

- ✅ Confirmación por email

### Blog

- ✅ Listado de artículos

- ✅ Búsqueda y filtros

- ✅ Artículos relacionados

- ✅ Compartir en redes

### Contacto

- ✅ Formulario de contacto

- ✅ Mapa interactivo

- ✅ FAQ expandible

- ✅ Información de contacto

---

## REQUISITOS NO FUNCIONALES

| Requisito | Meta |
| --- | --- |
| **Rendimiento** | Lighthouse > 90 |
| **Disponibilidad** | 99.9% uptime |
| **Seguridad** | HTTPS, validación backend, RLS |
| **Accesibilidad** | WCAG 2.1 AA |
| **SEO** | Indexable, meta tags, structured data |
| **Mobile** | Responsive, touch-friendly |
| **Escalabilidad** | Preparado para 10k+ usuarios |
| **Mantenibilidad** | Código limpio, documentado |

---

## TIMELINE SUGERIDO

| Fase | Duración | Tareas |
| --- | --- | --- |
| **Fase 1** | 1-2 semanas | Setup, estructura base, navbar, footer |
| **Fase 2** | 2-3 semanas | Página principal, landings de productos |
| **Fase 3** | 2-3 semanas | Calculadoras, integración Supabase |
| **Fase 4** | 1-2 semanas | Autenticación, formularios, validación |
| **Fase 5** | 1-2 semanas | Blog, contacto, FAQ |
| **Fase 6** | 1 semana | Optimizaciones, SEO, testing |
| **Fase 7** | 1 semana | Despliegue, monitoreo |

**Total:** 9-14 semanas

---

## ENTREGABLES

1. **Código fuente completo** en repositorio Git

1. **Documentación técnica** (README, API docs, guía de componentes)

1. **Guía de instalación y despliegue**

1. **Manual de usuario** (cómo gestionar contenido, leads, artículos)

1. **Guía de personalización** (cambiar colores, textos, datos)

1. **Recomendaciones para próximas mejoras**

1. **Capacitación al equipo** de Capitalta

---

## NOTAS IMPORTANTES

1. **Priorizar conversión:** Cada sección debe tener un CTA claro

1. **Mantener consistencia:** Usar sistema de temas de MUI

1. **Reutilizar componentes:** Aprovechar los 231 bloques de SaasAble

1. **Documentar cambios:** Mantener registro de personalizaciones

1. **Optimizar imágenes:** Usar next/image para mejor rendimiento

1. **Preparar para i18n:** Estructura que permita traducción futura

1. **Implementar analytics:** Google Analytics para tracking de conversiones

1. **Configurar backups:** Supabase con backups automáticos

1. **Monitorear errores:** Sentry o similar para tracking de bugs

1. **Mantener seguridad:** Auditorías regulares, actualizaciones de dependencias

---

## REFERENCIAS Y RECURSOS

- **Documentación SaasAble:** [https://phoenixcoded.gitbook.io/saasable](https://phoenixcoded.gitbook.io/saasable)

- **Documentación Next.js:** [https://nextjs.org/docs](https://nextjs.org/docs)

- **Documentación Material-UI:** [https://mui.com/material-ui/getting-started/](https://mui.com/material-ui/getting-started/)

- **Documentación Supabase:** [https://supabase.com/docs](https://supabase.com/docs)

- **Referencia visual:** kapitalizar.mx

- **PDF de Capitalta:** Documento proporcionado como fuente principal

---

## CONTACTO Y SOPORTE

Para preguntas o aclaraciones durante el desarrollo:

- Revisar documentación de SaasAble

- Consultar guía técnica de Supabase

- Revisar este prompt para especificaciones

- Contactar con el equipo de Capitalta para validaciones

