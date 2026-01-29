// @mui
import Typography from '@mui/material/Typography';

export const hero = {
  headLine: (
    <Typography variant="h2" sx={{ maxWidth: { xs: 300, sm: 400, md: 500 } }}>
      Tu crecimiento no se detiene, Nuestro apoyo tampoco...
    </Typography>
  ),
  captionLine: 'Soluciones financieras ágiles y flexibles para personas y negocios en México.',
  primaryBtn: { children: 'Solicitar crédito ahora', href: '/auth/registro' },
  image1: true,
  image2: '/assets/images/capitalta/hero-main.jpeg',
  reviewData: {
    rating: '4.9/5',
    reviews: 'Excelente Servicio'
  }
};
