// @project
import { TIEMPO_RESPUESTA } from '@/data/datosNegocio';
import { rangoMonto } from '@/utils/formatoProductos';

export const faq = {
  heading: 'Preguntas frecuentes sobre Capitalta',
  caption: 'Resuelve las dudas más comunes sobre nuestros créditos y proceso.',
  defaultExpanded: 'Créditos y elegibilidad',
  faqList: [
    {
      question: '¿Qué tipo de clientes pueden solicitar un crédito en Capitalta?',
      answer:
        'Atendemos tanto a personas físicas con actividad empresarial como a empresas que buscan soluciones de financiamiento para crecer.',
      category: 'Créditos y elegibilidad'
    },
    {
      question: '¿Cuál es el monto mínimo y máximo que puedo solicitar?',
      answer: `Los montos dependen del tipo de crédito y de tu perfil. Crédito Revolvente: ${rangoMonto('revolvente')} MXN; Crédito Empresarial: ${rangoMonto('empresarial')} MXN.`,
      category: 'Créditos y elegibilidad'
    },
    {
      question: '¿En cuánto tiempo obtendré una respuesta a mi solicitud?',
      answer: {
        // TODO(Alberto): confirmar el tiempo de respuesta (TIEMPO_RESPUESTA en src/data/datosNegocio.js).
        content: TIEMPO_RESPUESTA
          ? `En la mayoría de los casos damos una respuesta inicial en ${TIEMPO_RESPUESTA}.`
          : 'El tiempo de respuesta depende del producto y de que tu expediente esté completo; un asesor te informará los tiempos de tu solicitud.',
        type: 'list',
        data: [{ primary: 'Revisión rápida de tu información.' }, { primary: 'Seguimiento personalizado durante el proceso.' }]
      },
      category: 'Proceso y tiempos'
    },
    {
      question: '¿Qué documentos necesito para iniciar mi solicitud?',
      answer:
        'Depende del producto, pero normalmente solicitamos identificación oficial, comprobantes de ingresos, estados financieros y documentación de la garantía cuando aplique.',
      category: 'Proceso y tiempos'
    },
    {
      question: '¿Capitalta está regulada?',
      answer:
        'Sí, operamos como SOFOM bajo la normatividad aplicable y contamos con procesos alineados a las mejores prácticas del sector financiero.',
      category: 'Seguridad y confianza'
    },
    {
      answer: {
        content:
          'Contamos con políticas de privacidad y medidas de seguridad para proteger tu información y cumplir con la regulación vigente.',
        type: 'list',
        data: [{ primary: 'Uso responsable de tu información.' }, { primary: 'Cumplimiento de normativas de protección de datos.' }]
      },
      question: '¿Cómo protege Capitalta mis datos personales?',
      category: 'Seguridad y confianza'
    }
  ],
  link: { children: 'Contáctanos', href: '/contacto' },
  categories: ['Créditos y elegibilidad', 'Proceso y tiempos', 'Seguridad y confianza'],
  activeCategory: 'Créditos y elegibilidad'
};
