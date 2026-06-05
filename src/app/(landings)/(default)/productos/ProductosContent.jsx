'use client';

// @project
import SectionHero from '@/components/SectionHero';
import { ProcessTimeline } from '@/blocks/process';
import FeatureProducts from '@/blocks/feature/FeatureProducts';
import { feature20 } from '@/views/landings/default/data/feature';

export default function ProductosContent() {
  const capitaltaProcess = {
    heading: 'Proceso operativo Capitalta en 7 pasos',
    caption:
      'Desde la solicitud inicial hasta el seguimiento posterior al desembolso, te acompañamos con un flujo claro, incluyendo la cita presencial para firma y entrega de garantía.',
    defaultExpanded: 'panel0',
    cards: [
      {
        title: '1. Solicitud inicial',
        description: 'Inicias tu proceso de crédito compartiendo datos básicos y el objetivo del financiamiento.',
        icon: 'tabler-file-plus',
        list: [
          { primary: 'Llenado de solicitud y definición del tipo de crédito' },
          { primary: 'Identificación del monto y plazo que estás buscando' }
        ]
      },
      {
        title: '2. Integración de expediente',
        description: 'Reunimos la documentación necesaria para analizar tu operación con detalle.',
        icon: 'tabler-folder',
        list: [
          { primary: 'Documentación personal, financiera y legal del solicitante' },
          { primary: 'Validación de que el expediente esté completo y actualizado' }
        ]
      },
      {
        title: '3. Avalúo y verificación de garantía',
        description: 'Evaluamos el inmueble o garantía ofrecida para respaldar el crédito.',
        icon: 'tabler-building-skyscraper',
        list: [
          { primary: 'Coordinación de avalúo profesional de la garantía' },
          { primary: 'Revisión de situación legal y valor de referencia del inmueble' }
        ]
      },
      {
        title: '4. Revisión y aprobación por comité de crédito',
        description: 'Nuestro comité analiza la operación para tomar una decisión informada.',
        icon: 'tabler-checkup-list',
        list: [
          { primary: 'Análisis de capacidad de pago y riesgos de la operación' },
          { primary: 'Emisión de resolución por parte del comité de crédito' }
        ]
      },
      {
        title: '5. Formalización notarial',
        description: 'Preparamos la documentación legal y coordinamos la firma del crédito.',
        icon: 'tabler-signature',
        list: [
          { primary: 'Elaboración y revisión de contratos y escrituras correspondientes' },
          { primary: 'Generación de cita presencial para firma y entrega de garantía' }
        ]
      },
      {
        title: '6. Fondeo o disposición de crédito',
        description: 'Liberamos los recursos conforme a lo acordado para que puedas ejecutar tu plan.',
        icon: 'tabler-credit-card',
        list: [
          { primary: 'Verificación de condiciones previas al fondeo' },
          { primary: 'Confirmación de la recepción de los recursos por parte del cliente' }
        ]
      },
      {
        title: '7. Seguimiento y cobranza',
        description: 'Te acompañamos durante la vida del crédito y damos seguimiento a tus pagos.',
        icon: 'tabler-chart-line',
        list: [
          { primary: 'Monitoreo de pagos y desempeño del crédito' },
          { primary: 'Posibilidad de reestructuras o nuevos créditos según tus necesidades' }
        ]
      }
    ]
  };

  return (
    <>
      <SectionHero heading="Nuestros Productos Financieros" caption="Soluciones diseñadas para impulsar el crecimiento de tu negocio." />
      <FeatureProducts features={feature20.features} />
      <ProcessTimeline {...capitaltaProcess} />
    </>
  );
}
