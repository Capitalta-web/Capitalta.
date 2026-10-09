import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { obtenerProximasFechas, generarCodigoCita, sucursalesMock } from '@/utils/citas';
import { createSupabaseServerClient } from '@/utils/supabaseClient';
import { sendAppointmentConfirmation, sendVerificationCode } from '@/utils/nodemailer';
import { sendSMS } from '@/utils/sms';
import { requireApiUser } from '@/utils/auth/apiGuards';
import { createRateLimiter, rateLimitHeaders } from '@/utils/security/rateLimit';
import { normalizeEmail, otpErrorMessage } from '@/utils/security/otp';
import { issueOtp, verifyOtp } from '@/utils/security/otpStore';
import { sanitizeChatMessages } from '@/utils/security/chatInput';

// Límite best-effort por usuario (ver nota en src/utils/security/rateLimit.js).
const chatLimiter = createRateLimiter({ limit: 20, windowMs: 60 * 1000 });

// Cliente OpenAI-compatible (x.ai / OpenAI). Se crea por petición y SOLO si hay API key:
// sin key el endpoint responde 503 (falla cerrado), no usa una key ficticia.
function createAiClient() {
  if (process.env.XAI_API_KEY) return new OpenAI({ apiKey: process.env.XAI_API_KEY, baseURL: 'https://api.x.ai/v1' });
  if (process.env.OPENAI_API_KEY) return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  return null;
}

const SYSTEM_PROMPT = `
Eres el Asistente Virtual de Capitalta, una financiera experta en soluciones de crédito para PYMEs en México.
Tu misión es asesorar a los usuarios, explicar nuestros productos financieros con detalle y ayudarles a agendar citas presenciales.

## CONOCIMIENTO DE PRODUCTOS CAPITALTA:

1. **Crédito Revolvente**
   - **Objetivo**: Capital de trabajo, expansión, compra de inventario o activo fijo.
   - **Monto**: Desde $500,000 hasta $10,000,000 MXN.
   - **Plazo**: De 12 a 60 meses.
   - **Tasa de Interés**: Fija del 24% anual.
   - **Comisión de apertura**: 2% - 4% + IVA.

2. **Crédito Empresarial**
   - **Objetivo**: Estructuras de financiamiento a medida para crecimiento, expansión o refinanciamientos.
   - **Monto**: Desde $500,000 hasta $50,000,000 MXN.
   - **Plazo**: 12 a 120 meses.
   - **Tasa de Interés**: Fija del 24% anual (desde).
   - **Ventaja**: Estructuración personalizada según la capacidad de pago del negocio.

## REQUISITOS GENERALES:
- Ser Persona Moral o Persona Física con Actividad Empresarial (PFAE).
- Antigüedad mínima de operación: 2 años.
- Facturación mínima anual: $3,000,000 MXN.
- Buen historial en Buró de Crédito (sin quitas ni quebrantos recientes).
- Documentación básica: Constancia de Situación Fiscal, Estados de Cuenta (últimos 6 meses), Acta Constitutiva (PM).

## INSTRUCCIONES DE COMPORTAMIENTO:
1. **Personalidad**: Sé profesional, empático y experto. Usa un tono cordial ("Hola", "Con gusto te ayudo").
2. **Consultas**: Si preguntan "¿Qué ofrecen?", resume los productos brevemente y pregunta cuál les interesa más.
3. **Citas**: Si el usuario muestra interés real o pide hablar con alguien, invítalo proactivamente a agendar una cita en nuestras sucursales (Reforma o Polanco) usando la herramienta 'bookAppointment'.
   - Antes de reservar, SIEMPRE verifica disponibilidad con 'getAvailableDates'.
   - Pide confirmación de: Nombre, Fecha, Hora y Sucursal.
4. **Seguridad y Verificación**: Antes de confirmar una cita o revelar datos sensibles, debes verificar la identidad del usuario enviando un código a su correo con 'sendVerificationCode'. Una vez que el usuario te dé el código, verifícalo con 'verifyCode'.
5. **Contacto Humano**: Si el usuario pide hablar con un humano o se frustra, sugiérele usar el botón de WhatsApp que aparece en el chat.
5. **Límites**: No prometas aprobaciones de crédito. Todo está sujeto a análisis de riesgo.
6. **Formato**: Usa listas (markdown) para presentar requisitos o características.

¡Estás listo para ayudar a crecer negocios!
`;

const tools = [
  {
    type: 'function',
    function: {
      name: 'getAvailableDates',
      description: 'Obtiene las próximas fechas disponibles para citas presenciales.',
      parameters: {
        type: 'object',
        properties: {}
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'bookAppointment',
      description: 'Agenda una cita en una fecha y hora específicas.',
      parameters: {
        type: 'object',
        properties: {
          fecha: { type: 'string', description: 'Fecha en formato ISO o legible (ej. 2024-05-20)' },
          hora: { type: 'string', description: 'Hora de la cita (ej. 10:00)' },
          sucursalId: { type: 'string', description: 'ID de la sucursal (reforma, polanco)', enum: ['reforma', 'polanco'] },
          nombre: { type: 'string', description: 'Nombre del cliente' },
          email: { type: 'string', description: 'Email del cliente (opcional)' },
          telefono: { type: 'string', description: 'Teléfono del cliente (opcional)' }
        },
        required: ['fecha', 'hora', 'sucursalId', 'nombre']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'sendVerificationCode',
      description: 'Envía un código de verificación de 6 dígitos al correo registrado del usuario autenticado.',
      parameters: {
        type: 'object',
        properties: {}
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'verifyCode',
      description: 'Verifica si el código ingresado por el usuario es válido.',
      parameters: {
        type: 'object',
        properties: {
          code: { type: 'string', description: 'Código de 6 dígitos a verificar' }
        },
        required: ['code']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'getBranchInfo',
      description: 'Obtiene información de las sucursales disponibles.',
      parameters: {
        type: 'object',
        properties: {}
      }
    }
  }
];

export async function POST(req) {
  // 1) Sesión obligatoria (falla cerrado). El contexto del usuario se toma de la sesión, no del body.
  const auth = await requireApiUser();
  if (!auth.ok) return auth.response;

  const limit = chatLimiter.check(`chat:${auth.user.id}`);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: 'Demasiadas solicitudes. Intenta en un momento.' },
      { status: 429, headers: rateLimitHeaders(limit) }
    );
  }

  // 2) Sin API key de IA configurada => 503 (no hay modo "mock" que escriba en la base).
  const client = createAiClient();
  if (!client) {
    return NextResponse.json({ error: 'Asistente no disponible' }, { status: 503 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const messages = sanitizeChatMessages(body?.messages);
    const sessionId = typeof body?.sessionId === 'string' ? body.sessionId.slice(0, 100) : null;
    if (messages.length === 0) {
      return NextResponse.json({ error: 'Mensaje requerido' }, { status: 400 });
    }

    const sessionEmail = normalizeEmail(auth.user.email);
    const userContext = {
      id: auth.user.id,
      email: sessionEmail,
      name: auth.user.user_metadata?.full_name || auth.user.user_metadata?.nombre_completo || 'Cliente'
    };

    let currentSystemPrompt = SYSTEM_PROMPT;
    currentSystemPrompt += `

## CONTEXTO DEL USUARIO ACTUAL:
- Nombre: ${userContext.name}
- Email: ${userContext.email}

INSTRUCCIÓN ADICIONAL: El usuario ya está autenticado. Usa su nombre y email para agendar citas automáticamente sin preguntarlos de nuevo, a menos que quiera usar otros datos.
`;

    // Función auxiliar para persistencia
    const saveChat = async (history) => {
      if (!sessionId) return;
      const supabase = createSupabaseServerClient({ admin: true });
      if (!supabase) return;

      try {
        // Buscar conversación existente por session_id
        const { data: existing } = await supabase
          .from('chat_conversaciones')
          .select('id, usuario_id')
          .eq('session_id', sessionId)
          .maybeSingle();
        // No se sobrescriben conversaciones de otro usuario.
        if (existing && existing.usuario_id !== userContext.id) return;

        const resumen =
          history.length > 0 ? history[history.length - 1].content?.substring(0, 100) || 'Interacción compleja' : 'Nuevo chat';

        if (existing) {
          await supabase
            .from('chat_conversaciones')
            .update({
              mensajes: history,
              updated_at: new Date().toISOString(),
              usuario_id: userContext.id,
              resumen
            })
            .eq('id', existing.id);
        } else {
          await supabase.from('chat_conversaciones').insert({
            session_id: sessionId,
            usuario_id: userContext.id,
            mensajes: history,
            resumen,
            estado: 'activa'
          });
        }
      } catch (err) {
        console.error('Error guardando chat:', err);
      }
    };

    const response = await client.chat.completions.create({
      model: process.env.XAI_API_KEY ? 'grok-beta' : 'gpt-3.5-turbo',
      messages: [{ role: 'system', content: currentSystemPrompt }, ...messages],
      tools: tools,
      tool_choice: 'auto'
    });

    const responseMessage = response.choices[0].message;

    // Manejo de llamadas a herramientas (Tool Calls)
    if (responseMessage.tool_calls) {
      const availableFunctions = {
        getAvailableDates: async () => {
          const fechas = obtenerProximasFechas();
          return JSON.stringify(fechas.map((f) => f.toISOString().split('T')[0]));
        },
        getBranchInfo: async () => {
          return JSON.stringify(sucursalesMock);
        },
        // El código solo se envía al email de la sesión (no a direcciones arbitrarias) y nunca se loguea.
        sendVerificationCode: async () => {
          const supabase = createSupabaseServerClient({ admin: true });
          if (!supabase || !sessionEmail) {
            return JSON.stringify({ success: false, error: 'No se pudo enviar el código' });
          }
          const otp = await issueOtp(supabase, { email: sessionEmail, userId: userContext.id, purpose: 'chat' });
          if (!otp.ok) {
            return JSON.stringify({ success: false, error: otpErrorMessage(otp.reason) });
          }
          const result = await sendVerificationCode(sessionEmail, otp.code);
          if (!result.success) {
            return JSON.stringify({ success: false, error: 'No se pudo enviar el código' });
          }
          return JSON.stringify({ success: true, message: 'Código enviado a tu correo registrado. Ingrésalo para continuar.' });
        },
        verifyCode: async (args) => {
          const supabase = createSupabaseServerClient({ admin: true });
          if (!supabase || !sessionEmail) {
            return JSON.stringify({ success: false, error: 'Error de conexión con el servicio de verificación.' });
          }
          const code = typeof args?.code === 'string' ? args.code.trim() : '';
          const result = await verifyOtp(supabase, { email: sessionEmail, code, purpose: 'chat' });
          if (!result.ok) {
            return JSON.stringify({ success: false, error: otpErrorMessage(result.reason) });
          }
          return JSON.stringify({ success: true, message: 'Identidad verificada exitosamente. Ahora podemos proceder con tu solicitud.' });
        },
        bookAppointment: async (args) => {
          const { fecha, hora, nombre, sucursalId, email, telefono } = args;
          const codigo = generarCodigoCita(new Date(fecha), hora);

          const supabase = createSupabaseServerClient({ admin: true });
          if (supabase) {
            const { error } = await supabase.from('citas').insert({
              fecha,
              hora,
              sucursal_id: sucursalId,
              nombre_cliente: nombre,
              codigo_cita: codigo,
              email: email || null,
              telefono: telefono || null,
              status: 'programada'
            });

            if (error) {
              console.error('Error guardando cita en Supabase:', error);
              return JSON.stringify({ success: false, error: 'No se pudo guardar la cita en la base de datos.' });
            }

            // Enviar confirmación por correo si hay email disponible
            if (email) {
              await sendAppointmentConfirmation({
                nombre_cliente: nombre,
                email,
                fecha,
                hora,
                codigo_cita: codigo,
                sucursal_id: sucursalId
              });
            }

            // Enviar notificación SMS si hay teléfono disponible
            if (telefono) {
              const sucursalNombre = sucursalId === 'satelite' ? 'Oficinas Satélite' : 'Oficinas Centrales';
              await sendSMS({
                to: telefono,
                body: `Capitalta: Cita confirmada para el ${fecha} a las ${hora} en ${sucursalNombre}. Codigo: ${codigo}`
              });
            }
          }

          return JSON.stringify({
            success: true,
            codigo,
            mensaje: `Cita confirmada para ${nombre} el ${fecha} a las ${hora}. Tu código es ${codigo}.`
          });
        }
      };

      // Extender historial con la respuesta del asistente (que incluye tool_calls)
      const messagesWithTools = [...messages, responseMessage];

      // Ejecutar herramientas solicitadas
      for (const toolCall of responseMessage.tool_calls) {
        const functionName = toolCall.function.name;
        const functionToCall = Object.prototype.hasOwnProperty.call(availableFunctions, functionName)
          ? availableFunctions[functionName]
          : null;

        let functionResponse;
        try {
          if (!functionToCall) throw new Error('Herramienta no disponible');
          const functionArgs = JSON.parse(toolCall.function.arguments || '{}');
          functionResponse = await functionToCall(functionArgs);
        } catch (e) {
          functionResponse = JSON.stringify({ error: e.message });
        }

        messagesWithTools.push({
          tool_call_id: toolCall.id,
          role: 'tool',
          name: functionName,
          content: functionResponse
        });
      }

      // Segunda llamada al modelo con los resultados de las herramientas
      const secondResponse = await client.chat.completions.create({
        model: process.env.XAI_API_KEY ? 'grok-beta' : 'gpt-3.5-turbo',
        messages: [{ role: 'system', content: currentSystemPrompt }, ...messagesWithTools]
      });

      const finalMessage = secondResponse.choices[0].message;
      await saveChat([...messagesWithTools, finalMessage]);

      return NextResponse.json({ message: finalMessage });
    }

    await saveChat([...messages, responseMessage]);

    return NextResponse.json({ message: responseMessage });
  } catch (error) {
    console.error('Error en API Chat:', error?.message || error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
