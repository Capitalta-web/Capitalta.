# Roadmap: Agente de Voz Avanzado para Capitalta (Arquitectura LiveKit)

Este documento detalla la hoja de ruta técnica para transformar el asistente actual en una experiencia conversacional fluida ("Grok-like") utilizando **LiveKit (WebRTC)** como infraestructura base, seleccionada tras el análisis de arquitecturas por su robustez, baja latencia y manejo nativo de interrupciones.

## 1. Infraestructura de Tiempo Real (LiveKit)
Migración de HTTP/REST a WebRTC gestionado.

- [ ] **Configuración LiveKit Cloud**: Crear proyecto y obtener API Keys.
- [ ] **Autenticación**: Implementar endpoint `/api/livekit/token` en Next.js para generar tokens de acceso seguros para los clientes.
- [ ] **Backend de Agente**: Configurar el entorno para ejecutar el agente de voz (Node.js/Python worker).

## 2. Stack de Voz de Nueva Generación (Plugins)
Integración modular a través del framework de agentes de LiveKit.

- [ ] **Speech-to-Text (STT)**:
  - Integrar **Deepgram Nova-2** vía plugin de LiveKit.
  - Configuración: Modelo `nova-2-general`, idioma `es`, `smart_format=true`.
- [ ] **Text-to-Speech (TTS)**:
  - Integrar **ElevenLabs** vía plugin.
  - Configuración: Modelo `eleven_turbo_v2_5`, voz personalizada (amable/profesional).
- [ ] **LLM (Cerebro)**:
  - Conectar **x.ai (Grok)** o **OpenAI GPT-4o-mini** como procesador de lógica.
  - Definir `system_prompt` con contexto de Capitalta y tono de marca.

## 3. Interactividad e Interrupciones (Barge-in)
- [ ] **Voice Activity Detection (VAD)**:
  - Ajustar sensibilidad del VAD (Silero) en el servidor para detectar voz humana vs ruido de fondo.
- [ ] **Manejo de Interrupciones**:
  - Verificar que el agente detenga la reproducción de audio inmediatamente (<200ms) cuando el usuario hable.

## 4. Integración Profunda de Datos (Capitalta)
- [ ] **Function Calling (Herramientas)**:
  - Exponer funciones del backend actual al agente:
    - `checkAvailability(date)`
    - `bookAppointment(details)`
    - `getLoanInfo(type)`
  - Habilitar al LLM para invocar estas funciones durante la conversación de voz.
- [ ] **Contexto de Usuario**:
  - Inyectar datos del usuario (Nombre, ID) en el contexto inicial de la sesión de WebRTC.

## 5. UI/UX Inmersiva (Frontend)
- [ ] **Refactorización de ChatWidget**:
  - Implementar componentes de `@livekit/components-react`.
  - Reemplazar lógica de `window.SpeechRecognition` por `<RoomAudioRenderer />` y `<VoiceAssistantControlBar />`.
- [ ] **Visualización**:
  - Integrar componente `<BarVisualizer />` conectado al track de audio en tiempo real.

## Plan de Ejecución Inmediata
1.  **Semana 1**: Configuración de LiveKit Cloud y endpoint de tokens. Prueba de concepto "Echo".
2.  **Semana 2**: Integración de Deepgram y ElevenLabs. Primer diálogo fluido.
3.  **Semana 3**: Conexión de herramientas (agendamiento) y refinamiento de UI.
