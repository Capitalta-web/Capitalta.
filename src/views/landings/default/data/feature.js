// @project
import { TASA_ANUAL_FIJA } from '@/data/datosNegocio';
import { rangoMonto, rangoPlazo } from '@/utils/formatoProductos';

export const aboutCapitalta = {
  heading: 'Quiénes somos',
  caption:
    'Capitalta es una firma financiera mexicana que diseña soluciones de crédito claras, transparentes y accesibles para personas y empresas.',
  blockData1: {
    image: '/assets/images/capitalta/office-meeting.jpeg',
    icon: 'tabler-building-bank',
    title: 'Capitalta en pocas palabras',
    description:
      'Conectamos capital con proyectos de alto potencial a través de productos de crédito flexibles, procesos claros y acompañamiento cercano.',
    list: [
      { primary: 'Equipo con experiencia en banca, crédito y capital privado' },
      { primary: 'Enfoque en soluciones a la medida para cada cliente' },
      { primary: 'Compromiso con la transparencia y la responsabilidad financiera' }
    ],
    actionBtn: { children: 'Conoce nuestra historia', href: '/sobre-nosotros' },
    imagePosition: 'left'
  },
  blockData2: {
    image: '/assets/images/capitalta/team-collaboration.jpeg',
    icon: 'tabler-target-arrow',
    title: 'Nuestra misión',
    description:
      'Impulsar el crecimiento de personas y empresas mediante soluciones financieras sencillas, responsables y diseñadas para el largo plazo.',
    description2: 'Creemos en el crédito como una herramienta estratégica, no solo táctica.'
  },
  blockData3: {
    image: '/assets/images/capitalta/mirada.jpeg',
    icon: 'tabler-eye',
    title: 'Nuestra visión',
    description: 'Ser el socio financiero preferido de emprendedores, inversionistas y empresas que buscan crecer con orden y claridad.',
    description2: 'Queremos construir relaciones duraderas basadas en confianza y resultados.',
    imageSx: {
      objectPosition: 'center'
    }
  },
  blockData4: {
    image: '/assets/images/capitalta/modern-workspace.jpeg',
    icon: 'tabler-shield-check',
    title: 'Fundamentos corporativos',
    description: 'Operamos bajo principios que guían cada decisión de crédito, desde el análisis hasta el seguimiento.',
    list: [
      { primary: 'Transparencia en condiciones, riesgos y costos' },
      { primary: 'Agilidad sin sacrificar profundidad en el análisis' },
      { primary: 'Cercanía y comunicación constante con nuestros clientes' }
    ],
    actionBtn: { children: 'Conoce nuestros principios', href: '/sobre-nosotros' },
    imagePosition: 'left'
  }
};

export const feature20 = {
  heading: 'Créditos diseñados para cada etapa de tu crecimiento',
  caption: 'Elige el producto Capitalta que mejor se adapta a tus necesidades.',
  actionBtn: { children: 'Ver todos los productos', href: '/productos' },
  secondaryBtn: { children: 'Hablar con un asesor', href: '/contacto' },
  features: [
    {
      icon: 'tabler-currency-dollar',
      title: 'Crédito Revolvente',
      // TODO(Alberto): confirmar descripción; el nombre "Revolvente" no cuadra con "un solo desembolso".
      description: `Crédito amortizable con un solo desembolso y tasa fija del ${TASA_ANUAL_FIJA}% anual.`,
      monto: rangoMonto('revolvente', '–'),
      plazo: rangoPlazo('revolvente'),
      href: '/productos/credito-simple',
      visual: 'revolvente',
      recommended: false
    },
    {
      icon: 'tabler-building-bank',
      title: 'Crédito Empresarial',
      description: `Financiamiento a medida para empresas, con tasa fija del ${TASA_ANUAL_FIJA}% anual.`,
      monto: rangoMonto('empresarial', '–'),
      plazo: rangoPlazo('empresarial'),
      href: '/productos/credito-empresarial',
      visual: 'empresarial'
    }
  ]
};
