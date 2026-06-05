# Análisis y Comparativa de Arquitecturas para Agente de Voz "Capitalta"

Este documento presenta una evaluación exhaustiva de las opciones arquitectónicas para implementar un asistente de voz conversacional de baja latencia ("Grok-like"), reemplazando la implementación actual basada en la API nativa del navegador.

## 1. Criterios de Evaluación y Ponderación

Para una institución financiera como Capitalta, los factores se ponderan de la siguiente manera:

| Factor | Peso | Justificación |
| :--- | :---: | :--- |
| **Experiencia de Usuario (Latencia/Naturalidad)** | **35%** | Crítico. Una conversación con retraso (>1s) rompe la ilusión y frustra al usuario. |
| **Seguridad y Privacidad** | **25%** | Crítico. Manejo de datos financieros y personales. |
| **Confiabilidad y Escalabilidad** | **20%** | El servicio debe estar disponible 24/7 y soportar picos de usuarios. |
| **Mantenibilidad y Complejidad** | **10%** | Facilidad para actualizar el stack y corregir errores. |
| **Costo Operativo** | **10%** | Importante, pero secundario frente a la calidad y seguridad en esta etapa. |

---

## 2. Opciones de Arquitectura Analizadas

### Opción A: Stack Nativo (Estado Actual Optimizado)
*   **Componentes**: Web Speech API (Browser) + HTTP Requests + Next.js Serverless.
*   **Descripción**: El navegador maneja STT/TTS. El backend solo procesa texto.

### Opción B: Custom WebSocket Pipeline (DIY)
*   **Componentes**: Servidor Node.js con `ws` o `socket.io` + Deepgram (STT) + ElevenLabs (TTS) + LangChain/OpenAI.
*   **Descripción**: Construcción manual del pipeline de audio bidireccional. Control total del buffer de audio.

### Opción C: Voice Infrastructure as a Service (VIaaS) - **LiveKit** / Vapi
*   **Componentes**: LiveKit Cloud (Transporte WebRTC) + Plugins de Servidor (Agents Framework) + Modelos a elección.
*   **Descripción**: Infraestructura gestionada para el transporte de audio en tiempo real (WebRTC). Maneja edge cases de red, desconexiones y VAD.

### Opción D: OpenAI Realtime API (Unified)
*   **Componentes**: Conexión WebSocket directa a OpenAI (GPT-4o Audio).
*   **Descripción**: Modelo único multimodal que recibe audio y emite audio. Sin pasos intermedios de STT/TTS externos.

---

## 3. Análisis Comparativo Detallado

| Característica | Opción A (Nativo) | Opción B (Custom WS) | Opción C (LiveKit) | Opción D (OpenAI Realtime) |
| :--- | :--- | :--- | :--- | :--- |
| **Latencia (E2E)** | Alta (2-4s) | Media-Baja (500ms-1s) | **Ultra-Baja (<300ms)** | **Ultra-Baja (<350ms)** |
| **Calidad de Voz** | Baja (Robótica) | **Alta (ElevenLabs)** | **Alta (Flexible)** | Muy Alta (GPT-4o) |
| **Interrupciones** | No soportado | Difícil de implementar | **Nativo (WebRTC)** | Nativo |
| **Complejidad Dev** | Baja | Muy Alta (Infra) | Media (Integración) | Baja |
| **Costo** | Gratis* | Variable (Modelos) | Variable + Infra | Alto ($0.06/min) |
| **Seguridad** | Alta (Client-side) | Media (Depende impl.) | **Alta (E2EE)** | Alta (Enterprise) |

### Análisis de Ventajas y Desventajas

#### Opción A: Stack Nativo
*   **✅ Ventajas**: Costo cero, privacidad (STT local), sin servidor de sockets.
*   **❌ Desventajas**: Experiencia pobre, voces robóticas, dependiente del navegador (falla en algunos móviles), no permite interrumpir al bot.
*   **Veredicto**: Descartada para experiencia "Premium".

#### Opción B: Custom WebSocket Pipeline
*   **✅ Ventajas**: Control absoluto, sin vendor lock-in de infraestructura, costos solo de APIs.
*   **❌ Desventajas**: "Reinventar la rueda". Requiere manejar buffers de audio, reconexión, jitter, y sincronización labial manualmente. Alto riesgo de deuda técnica.
*   **Veredicto**: Riesgoso para un equipo pequeño o plazos cortos.

#### Opción C: LiveKit (Recomendada)
*   **✅ Ventajas**: Usa **WebRTC** (mejor que WebSockets para audio), maneja VAD (detección de voz) y cancelaciones automáticamente. Framework de Agentes en Next.js. Agnóstico al modelo (puedes cambiar ElevenLabs por OpenAI TTS mañana).
*   **❌ Desventajas**: Costo adicional por ancho de banda/minutos de servidor (aunque tiene capa gratuita generosa).
*   **Veredicto**: Balance ideal entre control y facilidad.

#### Opción D: OpenAI Realtime API
*   **✅ Ventajas**: Implementación más rápida. La latencia es increíblemente baja porque no hay transcripción intermedia. Capacidad de entender entonación y emociones del usuario.
*   **❌ Desventajas**: **Costoso**. Vendor lock-in total. Menos control sobre la voz específica (solo voces de OpenAI).
*   **Veredicto**: Excelente para prototipos o si el presupuesto no es problema.

---

## 4. Recomendación Técnica: Opción C (LiveKit)

Se recomienda implementar **LiveKit** utilizando su **Agents Framework**.

### Justificación:
1.  **WebRTC vs WebSockets**: LiveKit usa WebRTC, diseñado específicamente para audio/video en tiempo real (UDP), manejando mejor la pérdida de paquetes que WebSockets (TCP) usado en la Opción B.
2.  **Manejo de Interrupciones**: La funcionalidad de "Barge-in" (interrumpir al bot) es compleja de programar desde cero. LiveKit ya lo tiene resuelto.
3.  **Flexibilidad Modular**: Permite usar **Deepgram** (el STT más rápido del mercado) y **ElevenLabs** (el mejor TTS), o cambiar a modelos más baratos sin reescribir la infraestructura.
4.  **Integración con Next.js**: Tienen componentes React (`<VoiceAssistant />`) listos para usar, reduciendo el tiempo de UI.

---

## 5. Plan de Implementación (LiveKit)

### Fase 1: Infraestructura (Semana 1)
1.  Configurar proyecto en LiveKit Cloud (Capa gratuita: 50GB/mes).
2.  Instalar `@livekit/components-react` y `livekit-client` en el frontend.
3.  Crear endpoint `/api/token` en Next.js para autenticación.

### Fase 2: Backend Agent (Semana 1-2)
1.  Crear un "Worker" (puede ser un proceso Node.js separado o usar LiveKit Playground para pruebas).
2.  Configurar pipeline:
    *   **VAD**: Silero VAD (incluido en LiveKit).
    *   **STT**: Deepgram Nova-2.
    *   **LLM**: x.ai (vía OpenAI SDK compatibility) o GPT-4o-mini.
    *   **TTS**: ElevenLabs Turbo v2.5.

### Fase 3: Frontend & Integración (Semana 2)
1.  Reemplazar la lógica de `ChatWidget.jsx` actual.
2.  Implementar componente `<RoomAudioRenderer />` y visualizadores.
3.  Conectar herramientas (Function Calling) para agendamiento y navegación.

## 6. Métricas de Éxito
*   **Latencia Voz-a-Voz**: < 800ms (Objetivo ideal: 500ms).
*   **Tasa de Interrupción Exitosa**: > 95% (El bot calla en <200ms al hablar el usuario).
*   **Retención de Usuarios**: Aumento del 30% en uso del asistente vs versión texto.
*   **Costo Promedio**: < $0.05 USD por conversación de 5 minutos.
