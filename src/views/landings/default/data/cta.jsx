// @mui
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

// @project
import { NextLink } from '@/components/routes';
import { PRUEBA_SOCIAL } from '@/data/datosNegocio';

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
  // TODO(Alberto): cifras sin verificar; se muestran solo si PRUEBA_SOCIAL.mostrar = true (src/data/datosNegocio.js).
  ...(PRUEBA_SOCIAL.mostrar && {
    saleData: PRUEBA_SOCIAL.clientes,
    profileGroups: {
      avatarGroups: [
        { avatar: '/assets/images/user/avatar1.png' },
        { avatar: '/assets/images/user/avatar2.png' },
        { avatar: '/assets/images/user/avatar3.png' },
        { avatar: '/assets/images/user/avatar4.png' },
        { avatar: '/assets/images/user/avatar5.png' }
      ],
      review: PRUEBA_SOCIAL.calificacion
    }
  })
};
