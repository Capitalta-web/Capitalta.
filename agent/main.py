import logging
import os
from dotenv import load_dotenv

from livekit.agents import (
    AutoSubscribe,
    JobContext,
    JobProcess,
    WorkerOptions,
    cli,
    llm,
)
from livekit.agents.pipeline import VoicePipelineAgent
from livekit.plugins import deepgram, elevenlabs, openai, silero
from pathlib import Path

# Cargar .env desde el directorio raíz del proyecto
env_path = Path(__file__).parent.parent / '.env'
load_dotenv(dotenv_path=env_path)

logger = logging.getLogger("capitalta-voice-agent")

def prewarm(proc: JobProcess):
    proc.userdata["vad"] = silero.VAD.load()

async def entrypoint(ctx: JobContext):
    initial_ctx = llm.ChatContext().append(
        role="system",
        text=(
            "Eres el asistente virtual de Capitalta, una financiera líder. "
            "Tu tono es profesional pero amable y cercano. "
            "Tu objetivo es ayudar a los clientes con información sobre préstamos, agendamiento de citas y dudas generales. "
            "Si te preguntan por agendar una cita, responde que puedes ayudar con eso (aún en construcción). "
            "Mantén tus respuestas concisas y claras, ideales para una conversación de voz."
        ),
    )

    logger.info(f"connecting to room {ctx.room.name}")
    await ctx.connect(auto_subscribe=AutoSubscribe.AUDIO_ONLY)

    # Esperar a que el participante se una
    participant = await ctx.wait_for_participant()
    logger.info(f"starting voice agent for participant {participant.identity}")

    agent = VoicePipelineAgent(
        vad=ctx.proc.userdata["vad"],
        stt=deepgram.STT(model="nova-2-general", language="es"),
        llm=openai.LLM(
            model="grok-beta",
            base_url="https://api.x.ai/v1",
            api_key=os.getenv("XAI_API_KEY"),
        ),
        tts=elevenlabs.TTS(model="eleven_turbo_v2_5"),
        chat_ctx=initial_ctx,
    )

    agent.start(ctx.room, participant)

    await agent.say("Hola, soy el asistente de Capitalta. ¿En qué puedo ayudarte hoy?", allow_interruptions=True)

if __name__ == "__main__":
    cli.run_app(
        WorkerOptions(
            entrypoint_fnc=entrypoint,
            prewarm_fnc=prewarm,
        ),
    )
