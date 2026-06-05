// @mui
import branding from '@/branding.json';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

// @project
import { NextLink } from '@/components/routes';

export const cta4 = {
  headLine: '¿Listo para dar el siguiente paso con Capitalta?',
  primaryBtn: {
    children: 'Solicitar crédito',
    href: '/auth/registro'
  },
  profileGroups: {
    avatarGroups: [
      { avatar: '/assets/images/user/avatar1.png' },
      { avatar: '/assets/images/user/avatar2.png' },
      { avatar: '/assets/images/user/avatar3.png' },
      { avatar: '/assets/images/user/avatar4.png' },
      { avatar: '/assets/images/user/avatar5.png' }
    ],
    review: 'Más de 250 clientes satisfechos'
  },
  list: [
    { primary: 'Acompañamiento personalizado de inicio a fin' },
    { primary: 'Procesos claros, accesibles y confiables' },
    { primary: 'Créditos flexibles para personas y empresas' },
    { primary: 'Equipo especializado en soluciones financieras' }
  ],
  clientContent: 'Hablar con un asesor'
};

function DescriptionLine() {
  return (
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      ¿Tienes preguntas? Nuestro equipo está listo para ayudarte.{' '}
      <Link component={NextLink} variant="caption2" color="primary" href="/contacto" underline="hover">
        Contáctanos
      </Link>
    </Typography>
  );
}

export const cta5 = {
  label: '¿Necesitas asesoría personalizada?',
  heading: 'Conecta con el equipo de Capitalta',
  caption: 'Resolvemos tus dudas y te ayudamos a elegir el crédito ideal para ti.',
  primaryBtn: {
    children: 'Contactar a Capitalta',
    href: '/contacto',
    target: '_self'
  },
  description: <DescriptionLine />,
  saleData: { count: 10, defaultUnit: 'k+', caption: 'Clientes confían en nosotros' },
  profileGroups: {
    avatarGroups: [
      { avatar: '/assets/images/user/avatar1.png' },
      { avatar: '/assets/images/user/avatar2.png' },
      { avatar: '/assets/images/user/avatar3.png' },
      { avatar: '/assets/images/user/avatar4.png' },
      { avatar: '/assets/images/user/avatar5.png' }
    ],
    review: 'Excelencia en servicio (4.9 de 5)'
  }
};

export const cta10 = {
  heading: "Couldn't find the perfect role for you?",
  caption: 'No worries – we encourage you to apply anyway! Your unique skills and talents might be just what we need.',
  primaryBtn: { children: 'Send your Resume', href: '#', sx: { textTransform: 'none' } },
  secondaryBtn: { children: 'Contact us', href: '/contact', sx: { textTransform: 'none' } },
  image: { light: '/assets/images/graphics/ai/graphics15-light.svg', dark: '/assets/images/graphics/ai/graphics15-dark.svg' },
  profileGroups: {
    avatarGroups: [
      { avatar: '/assets/images/user/avatar1.png' },
      { avatar: '/assets/images/user/avatar2.png' },
      { avatar: '/assets/images/user/avatar3.png' },
      { avatar: '/assets/images/user/avatar4.png' },
      { avatar: '/assets/images/user/avatar5.png' }
    ],
    review: '10k+ Reviews (4.5 out of 5)'
  }
};

export const cta13 = {
  heading: 'Join a winning team',
  caption: 'Be a part of a winning culture that fosters collaboration, creativity, and success in every career path',
  listData: [
    {
      title: 'Product Design',
      description: 'We’re looking for a mid-level product designer to join our team.',
      chips: [
        {
          icon: 'tabler-map-pin',
          name: 'Remote'
        },
        {
          icon: 'tabler-history',
          name: 'Full-Time'
        }
      ],
      btn: { children: 'View Job', href: '#' }
    },
    {
      title: 'Front-End Developer',
      description: 'We’re looking for a mid-level product designer to join our team.',
      chips: [
        {
          icon: 'tabler-map-pin',
          name: 'Remote'
        },
        {
          icon: 'tabler-history',
          name: 'Full-Time'
        }
      ],
      btn: { children: 'View Job', href: '#' }
    },
    {
      title: 'Back-End Developer',
      description: 'We’re looking for a mid-level product designer to join our team.',
      chips: [
        {
          icon: 'tabler-map-pin',
          name: 'Remote'
        },
        {
          icon: 'tabler-history',
          name: 'Full-Time'
        }
      ],
      btn: { children: 'View Job', href: '#' }
    },
    {
      title: 'Scrum Master',
      description: 'We’re looking for a mid-level product designer to join our team.',
      chips: [
        {
          icon: 'tabler-map-pin',
          name: 'Remote'
        },
        {
          icon: 'tabler-history',
          name: 'Full-Time'
        }
      ],
      btn: { children: 'View Job', href: '#' }
    }
  ]
};
