import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { obtenerProximasFechas, generarCodigoCita, horasDisponibles, sucursalesMock } from '@/utils/citas';
import { createSupabaseServerClient } from '@/utils/supabaseClient';

// Configuración del cliente OpenAI para x.ai (Grok)
// Si no hay XAI_API_KEY, intentará usar OPENAI_API_KEY o fallará controladamente.
const client = new OpenAI({
  apiKey: process.env.XAI_API_KEY || process.env.OPENAI_API_KEY || 'dummy-key',
  baseURL: process.env.XAI_API_KEY ? 'https://api.x.ai/v1' : undefined // Default OpenAI URL if not using x.ai key
});

const SYSTEM_PROMPT = `
Eres el Asistente Virtual de Capitalta, una financiera experta en soluciones de crédito para PYMEs en México.
Tu misión es asesorar a los usuarios, explicar nuestros productos financieros con detalle y ayudarles a agendar citas presenciales.

## CONOCIMIENTO DE PRODUCTOS CAPITALTA:

1. **Crédito Simple (Amortizable)**
   - **Objetivo**: Capital de trabajo, expansión, compra de inventario o activo fijo.
   - **Monto**: Desde $500,000 hasta $10,000,000 MXN.
   - **Plazo**: De 12 a 60 meses.
   - **Tasa de Interés**: Desde 24% anual (fija o variable según perfil de riesgo).
   - **Comisión de apertura**: 2% - 4% + IVA.

2. **Crédito Revolvente (Línea de Crédito)**
   - **Objetivo**: Cubrir necesidades de flujo de efectivo a corto plazo (nómina, proveedores).
   - **Monto**: Línea autorizada hasta $5,000,000 MXN.
   - **Plazo**: Contrato anual renovable (disposiciones a 3, 6 o 12 meses).
   - **Ventaja**: Solo pagas intereses por lo que utilizas.

3. **Arrendamiento Puro (Leasing)**
   - **Objetivo**: Adquisición de maquinaria, equipo de transporte o tecnología sin descapitalizarse.
   - **Beneficio Fiscal**: Rentas 100% deducibles de impuestos.
   - **Plazo**: 12 a 48 meses.

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
4. **Contacto Humano**: Si el usuario pide hablar con un humano o se frustra, sugiérele usar el botón de WhatsApp que aparece en el chat.
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
        properties: {},
      },
    },
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
        required: ['fecha', 'hora', 'sucursalId', 'nombre'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'getBranchInfo',
      description: 'Obtiene información de las sucursales disponibles.',
      parameters: {
        type: 'object',
        properties: {},
      },
    },
  }
];

export async function POST(req) {
  try {
    const { messages, userContext, sessionId } = await req.json();

    let currentSystemPrompt = SYSTEM_PROMPT;
    if (userContext) {
      currentSystemPrompt += `
      
## CONTEXTO DEL USUARIO ACTUAL:
- Nombre: ${userContext.name}
- Email: ${userContext.email}
- ID: ${userContext.id}

INSTRUCCIÓN ADICIONAL: El usuario ya está autenticado. Usa su nombre y email para agendar citas automáticamente sin preguntarlos de nuevo, a menos que quiera usar otros datos.
`;
    }

    // Función auxiliar para persistencia
    const saveChat = async (history) => {
      if (!sessionId) return;
      const supabase = createSupabaseServerClient();
      if (!supabase) return;

      try {
        // Buscar conversación existente por session_id
        const { data: existing } = await supabase
          .from('chat_conversaciones')
          .select('id')
          .eq('session_id', sessionId)
          .single();

        const resumen = history.length > 0 
          ? history[history.length - 1].content?.substring(0, 100) || 'Interacción compleja'
          : 'Nuevo chat';

        if (existing) {
          await supabase
            .from('chat_conversaciones')
            .update({ 
              mensajes: history, 
              updated_at: new Date().toISOString(),
              usuario_id: userContext?.id || null,
              resumen
            })
            .eq('id', existing.id);
        } else {
          await supabase
            .from('chat_conversaciones')
            .insert({
              session_id: sessionId,
              usuario_id: userContext?.id || null,
              mensajes: history,
              resumen,
              estado: 'activa'
            });
        }
      } catch (err) {
        console.error('Error guardando chat:', err);
      }
    };

    if (!process.env.XAI_API_KEY && !process.env.OPENAI_API_KEY) {
      // Fallback Mock para demostración si no hay API Key configurada
      const lastMessage = messages[messages.length - 1].content.toLowerCase();
      let mockResponse = "Lo siento, no tengo configurada mi API Key de IA en este momento. Por favor configura XAI_API_KEY en el archivo .env.";
      
      if (lastMessage.includes('cita')) {
        mockResponse = "Para agendar una cita, por favor visita nuestra sección 'Mi Cuenta' o contáctanos por WhatsApp.";
      } else if (lastMessage.includes('hola')) {
        mockResponse = "¡Hola! Bienvenido a Capitalta. ¿En qué puedo ayudarte hoy?";
      }

      const mockMessage = { role: 'assistant', content: mockResponse };
      
      // Guardar en historial
      await saveChat([...messages, mockMessage]);

      return NextResponse.json({ 
        message: mockMessage 
      });
    }

    const response = await client.chat.completions.create({
      model: process.env.XAI_API_KEY ? 'grok-beta' : 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: currentSystemPrompt },
        ...messages
      ],
      tools: tools,
      tool_choice: 'auto',
    });

    const responseMessage = response.choices[0].message;

    // Manejo de llamadas a herramientas (Tool Calls)
    if (responseMessage.tool_calls) {
      const availableFunctions = {
        getAvailableDates: async () => {
          const fechas = obtenerProximasFechas();
          return JSON.stringify(fechas.map(f => f.toISOString().split('T')[0]));
        },
        getBranchInfo: async () => {
          return JSON.stringify(sucursalesMock);
        },
        bookAppointment: async (args) => {
          const { fecha, hora, nombre, sucursalId, email, telefono } = args;
          const codigo = generarCodigoCita(new Date(fecha), hora);
          
          const supabase = createSupabaseServerClient();
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
            
            // TODO: Integrar servicio de email real (ej. Resend, SendGrid)
            console.log(`[MOCK EMAIL] Enviando confirmación de cita a ${email} para el ${fecha} a las ${hora}`);
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
        const functionToCall = availableFunctions[functionName];
        const functionArgs = JSON.parse(toolCall.function.arguments);
        
        let functionResponse;
        try {
          functionResponse = await functionToCall(functionArgs);
        } catch (e) {
          functionResponse = JSON.stringify({ error: e.message });
        }

        messagesWithTools.push({
          tool_call_id: toolCall.id,
          role: 'tool',
          name: functionName,
          content: functionResponse,
        });
      }

      // Segunda llamada al modelo con los resultados de las herramientas
      const secondResponse = await client.chat.completions.create({
        model: process.env.XAI_API_KEY ? 'grok-4-fast-non-reasoning' : 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: currentSystemPrompt },
          ...messagesWithTools
        ],
      });

      const finalMessage = secondResponse.choices[0].message;
      await saveChat([...messagesWithTools, finalMessage]);

      return NextResponse.json({ message: finalMessage });
    }

    await saveChat([...messages, responseMessage]);

    return NextResponse.json({ message: responseMessage });

  } catch (error) {
    console.error('Error en API Chat:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor', details: error.message },
      { status: 500 }
    );
  }
}
