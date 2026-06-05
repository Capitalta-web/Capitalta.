// @project
import branding from '@/branding.json';

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
      answer:
        'Los montos dependen del tipo de crédito y de tu perfil, pero contamos con opciones desde $30,000 hasta varios millones de pesos.',
      category: 'Créditos y elegibilidad'
    },
    {
      question: '¿En cuánto tiempo obtendré una respuesta a mi solicitud?',
      answer: {
        content: 'En la mayoría de los casos damos una respuesta inicial en menos de 72 horas hábiles.',
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
  link: { children: 'Get in Touch', href: branding.company.socialLink.support, target: '_blank', rel: 'noopener noreferrer' },
  categories: ['Créditos y elegibilidad', 'Proceso y tiempos', 'Seguridad y confianza'],
  activeCategory: 'Créditos y elegibilidad'
};
