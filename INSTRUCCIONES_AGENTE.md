# Instrucciones de Configuración y Ejecución del Agente de Voz (LiveKit)

Este documento detalla los pasos para poner en marcha el Agente de Voz "Grok-like" de Capitalta, utilizando LiveKit como infraestructura de tiempo real y Python para la orquestación de IA.

## 1. Requisitos Previos

Asegúrate de tener las siguientes cuentas y API Keys configuradas en tu archivo `.env` (en la raíz del proyecto):

```env
# LiveKit Cloud (https://cloud.livekit.io/)
LIVEKIT_URL=wss://tu-proyecto.livekit.cloud
LIVEKIT_API_KEY=API...
LIVEKIT_API_SECRET=Secret...

# Inteligencia Artificial
DEEPGRAM_API_KEY=...    # Para transcripción (STT) rápida
ELEVENLABS_API_KEY=...  # Para síntesis de voz (TTS) realista
OPENAI_API_KEY=...      # Para el cerebro (LLM)
```

## 2. Configuración del Backend (Next.js)

El endpoint de autenticación ya ha sido creado en `src/app/api/livekit/token/route.js`. Este endpoint genera tokens temporales para que el frontend pueda conectarse a la sala de LiveKit.

Verifica que las dependencias estén instaladas:
```bash
yarn install
```

## 3. Configuración del Agente (Python)

El "cerebro" del agente corre como un proceso independiente (Worker) que se conecta a la sala de LiveKit. Se recomienda usar Python por su robusto framework de agentes.

### 3.1. Preparar Entorno Python

Navega a la carpeta `agent/`:
```bash
cd agent
```

Crea un entorno virtual (recomendado):
```bash
# Windows
python -m venv venv
.\venv\Scripts\activate

# Mac/Linux
python3 -m venv venv
source venv/bin/activate
```

Instala las dependencias:
```bash
pip install -r requirements.txt
```

### 3.2. Ejecutar el Agente

Asegúrate de estar en la carpeta `agent/` y tener el entorno virtual activado.

**Modo Desarrollo (Dev)**:
Este modo conecta tu agente local a LiveKit Cloud para pruebas rápidas.
```bash
python main.py dev
```
*Si es la primera vez, el comando te pedirá autenticarte con LiveKit Cloud vía navegador.*

Una vez corriendo, verás logs indicando que el agente está esperando conexiones.

## 4. Prueba End-to-End

1.  Inicia tu servidor Next.js: `yarn dev`.
2.  (Pendiente de implementación en Frontend): Navega a la página donde integrarás el componente de LiveKit.
    *   *Nota: Por ahora puedes usar el [LiveKit Playground](https://agents-playground.livekit.io/) para probar tu agente conectándolo a tu proyecto Cloud.*
3.  Cuando un usuario entre a la sala, el agente (corriendo en tu terminal Python) se unirá automáticamente y saludará: "Hola, soy el asistente de Capitalta..."

## 5. Despliegue (Producción)

Para producción, el agente debe correr en un servidor siempre activo (VPS, Docker, Railway, Fly.io).

Ejemplo de `Dockerfile` para el agente:
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY main.py .
CMD ["python", "main.py", "start"]
```
