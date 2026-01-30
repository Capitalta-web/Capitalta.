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
```

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
