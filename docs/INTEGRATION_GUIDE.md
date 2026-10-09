# Guía de Integración del Asistente Virtual Capitalta

## Descripción General
El Asistente Virtual de Capitalta utiliza una arquitectura híbrida:
- **Frontend**: Componente `ChatWidget.jsx` en React/MUI con Web Speech API para voz.
- **Backend**: Endpoint `/api/chat` en Next.js App Router.
- **Inteligencia**: OpenAI (GPT-3.5/4) o x.ai (Grok), configurable vía variables de entorno.
- **Persistencia**: Supabase (PostgreSQL) para guardar historial y citas.
- **Herramientas**: Function calling para agendamiento de citas y consulta de sucursales.

## Configuración de Variables de Entorno
Para que el asistente funcione correctamente, asegúrate de tener las siguientes variables en tu archivo `.env`:

```env
# Base de Datos (Supabase)
NEXT_PUBLIC_SUPABASE_URL=tu_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_key_anonima
SUPABASE_SERVICE_ROLE_KEY=tu_key_service_role

# Inteligencia Artificial (Uno de los dos es requerido)
# Opción A: x.ai (Grok) - Recomendado si tienes la key "a.ai"
XAI_API_KEY=xai-tu-api-key

# Opción B: OpenAI
OPENAI_API_KEY=sk-tu-api-key

# LiveKit (Voz en tiempo real)
LIVEKIT_API_KEY=devkey
LIVEKIT_API_SECRET=secret
NEXT_PUBLIC_LIVEKIT_URL=wss://tu-proyecto.livekit.cloud
```

## Despliegue en Vercel y Variables de Producción

### 1. Gestión en Vercel
En el entorno de producción (Vercel), las variables no se leen desde el archivo `.env`, sino desde la configuración del proyecto:
1. Ve a tu Dashboard en Vercel > Proyecto Capitalta.
2. Navega a **Settings** > **Environment Variables**.
3. Agrega cada una de las variables listadas arriba.
   - **Clave**: Nombre de la variable (ej: `XAI_API_KEY`).
   - **Valor**: El valor real de producción.
   - **Entornos**: Selecciona "Production", "Preview" y "Development" según corresponda.

### 2. Acceso en el Código
El acceso a estas variables en el código sigue reglas estrictas de seguridad:

- **Variables de Servidor (`process.env.VARIABLE`)**:
  - Solo accesibles en API Routes (`src/app/api/...`) o Server Components.
  - Ejemplo: `XAI_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.
  - **NUNCA** se exponen al navegador.

- **Variables Públicas (`process.env.NEXT_PUBLIC_VARIABLE`)**:
  - Accesibles tanto en el servidor como en el cliente (navegador).
  - Deben llevar el prefijo `NEXT_PUBLIC_`.
  - Ejemplo: `NEXT_PUBLIC_SUPABASE_URL`.
  - Vercel las "inyecta" en el código JavaScript durante el proceso de construcción (Build).

### 3. Ciclo de Despliegue
- Al hacer un `git push` a la rama `main`, Vercel detecta los cambios.
- Inicia un nuevo **Deployment**.
- Durante el Build, Vercel toma las variables de entorno configuradas en el Dashboard.
- Si cambias una variable en el Dashboard, debes hacer un **Redeploy** manual (o un nuevo push) para que los cambios surtan efecto.

## Integración de Voz
La funcionalidad de voz se ha implementado utilizando las APIs nativas del navegador para garantizar compatibilidad y reducir costos:
- **Reconocimiento (STT)**: `window.SpeechRecognition` / `webkitSpeechRecognition`.
- **Síntesis (TTS)**: `window.speechSynthesis`.

No se requiere configuración adicional en el backend para la voz, ya que el procesamiento se realiza en el cliente y se envía como texto al servidor.

## Criterios de Aceptación

### 1. Conectividad y Procesamiento
- [ ] El asistente responde a "Hola" en menos de 3 segundos.
- [ ] Si no hay API Key configurada, el asistente responde con un mensaje de fallback amigable (mock).
- [ ] El historial del chat se guarda en la tabla `chat_conversaciones` de Supabase.

### 2. Agendamiento de Citas
- [ ] El usuario puede pedir una cita en lenguaje natural (ej: "Quiero una cita mañana a las 10am").
- [ ] El asistente detecta la intención y ejecuta la función `bookAppointment`.
- [ ] La cita se guarda correctamente en la tabla `citas` de Supabase.
- [ ] El asistente confirma la cita con el código generado.

### 3. Interfaz de Voz
- [ ] Al presionar el micrófono, el navegador solicita permisos.
- [ ] El asistente transcribe correctamente lo que dice el usuario.
- [ ] Al recibir la respuesta, el asistente la lee en voz alta automáticamente.
- [ ] La síntesis de voz se puede interrumpir o reiniciar.

### 4. Manejo de Errores
- [ ] Si falla la API de IA, se muestra un mensaje de error elegante.
- [ ] Si falla la conexión a Supabase, el chat continúa funcionando (aunque sin guardar historial).

## Pruebas
Ejecuta las pruebas unitarias y de integración con:
```bash
npm test
# o
yarn test
```
(Asegúrate de configurar el entorno de pruebas primero, ver `TESTING.md`).
