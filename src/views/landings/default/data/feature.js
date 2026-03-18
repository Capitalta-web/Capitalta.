// @project
import branding from '@/branding.json';
import { IconType } from '@/enum';

const linkProps = { target: '_blank', rel: 'noopener noreferrer' };

export const feature2 = {
  heading: 'Culture of inovation',
  caption:
    'Join a team that embraces forward-thinking ideas, fosters innovation, and cultivates an environment where your creativity can flourish.',
  features: [
    {
      icon: { name: 'tabler-users', type: IconType.STROKE, color: 'grey.900', stroke: 1 },
      title: 'Teamwork',
      content: 'We embrace varied perspectives and backgrounds, creating an inclusive environment.'
    },
    {
      icon: { name: 'tabler-star', type: IconType.STROKE, color: 'grey.900', stroke: 1 },
      title: 'Inclusivity',
      content: 'We embrace varied perspectives and backgrounds, creating an inclusive environment.'
    },
    {
      icon: { name: 'tabler-chart-histogram', type: IconType.STROKE, color: 'grey.900', stroke: 1 },
      title: 'Growth',
      content: 'Our culture prioritizes continuous learning, encouraging personal and professional development. '
    }
  ]
};

export const feature5 = {
  heading: 'Beyond the 9-to-5',
  caption: 'Our benefits go beyond the standard, ensuring your life outside of work is just as fulfilling.',
  image1: { light: '/assets/images/graphics/ai/graphics3-light.svg', dark: '/assets/images/graphics/ai/graphics3-dark.svg' },
  image2: { dark: '/assets/images/graphics/ai/graphics2-dark.svg', light: '/assets/images/graphics/ai/graphics2-light.svg' },
  features: [
    {
      icon: 'tabler-coin',
      title: 'Compensation',
      content: 'Enjoy a competitive salary that recognizes your skills and contributions.'
    },
    {
      icon: 'tabler-health-recognition',
      title: 'Healthcare',
      content: "Access to a comprehensive healthcare plan, ensuring you and your family's well-being."
    }
  ],
  features2: [
    {
      icon: 'tabler-briefcase',
      title: 'Automated scaling',
      content: 'Embrace a flexible work environment, allowing you to balance work.'
    },
    {
      icon: 'tabler-users',
      title: 'Real-time',
      content: 'Support your family commitments with family-friendly policies and benefits.'
    }
  ],
  profileGroups: {
    avatarGroups: [
      { avatar: '/assets/images/user/avatar1.png' },
      { avatar: '/assets/images/user/avatar2.png' },
      { avatar: '/assets/images/user/avatar3.png' },
      { avatar: '/assets/images/user/avatar4.png' },
      { avatar: '/assets/images/user/avatar5.png' }
    ],
    review: '10k+ Reviews (4.5 out of 5)'
  },
  content: 'Explore diverse career paths within the company through our internal mobility programs.',
  actionBtn: { children: 'Explore all Features', href: '#', sx: { textTransform: 'none' } }
};

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
      description: 'Crédito amortizable con un solo desembolso y tasa fija del 36% anual.',
      monto: '$30,000–$10,000,000',
      plazo: '3–60 meses',
      href: '/productos/credito-simple',
      visual: 'revolvente',
      recommended: false
    },
    {
      icon: 'tabler-building-bank',
      title: 'Crédito Empresarial',
      description: 'Financiamiento a medida para empresas.',
      monto: '$500,000–$50,000,000',
      plazo: '12–120 meses',
      href: '/productos/credito-empresarial',
      visual: 'empresarial'
    }
  ]
};

export const feature = {
  heading: `Beneficios de elegir ${branding.brandName}`,
  features: [
    {
      image: '/assets/images/shared/react.svg',
      title: 'Tecnología',
      content: 'Plataforma digital ágil y segura.'
    },
    {
      image: '/assets/images/shared/next-js.svg',
      title: 'Rapidez',
      content: 'Procesos optimizados para respuestas rápidas.'
    },
    {
      image: '/assets/images/shared/react.svg',
      title: 'Seguridad',
      content: 'Protección de datos con estándares bancarios.'
    },
    {
      image: '/assets/images/shared/next-js.svg',
      title: 'Flexibilidad',
      content: 'Productos adaptables a tu flujo de efectivo.'
    },
    {
      image: '/assets/images/shared/figma.svg',
      title: 'Claridad',
      content: 'Sin letras chiquitas ni costos ocultos.'
    },
    {
      title: 'Conoce nuestros planes',
      content: 'Encuentra el financiamiento ideal para ti.',
      actionBtn: { children: 'Ver Productos', href: '/productos', ...linkProps }
    }
  ]
};

export const feature7 = {
  heading: 'Real-time performance insights',
  caption: 'Gain a competitive edge with real-time performance monitoring.',
  testimonials: [
    {
      name: 'John Doe',
      designation: 'CEO',
      review: 'The team at SaasAble is incredibly talented and dedicated. They went above and beyond to ensure our project was a success.'
    },
    {
      name: 'Jane Smith',
      designation: 'CTO',
      review: 'I highly recommend SaasAble for any software development needs. Their expertise and professionalism are unmatched.'
    }
  ]
};
