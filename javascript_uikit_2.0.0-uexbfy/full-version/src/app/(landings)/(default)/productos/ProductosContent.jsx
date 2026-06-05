'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

// @third-party
import { motion } from 'framer-motion';

// @project
import ContainerWrapper from '@/components/ContainerWrapper';
import SectionHero from '@/components/SectionHero';
import SvgIcon from '@/components/SvgIcon';
import { IconType } from '@/enum';

const productos = [
  {
    key: 'simple',
    title: 'Crédito Simple',
    icon: 'tabler-currency-dollar',
    resumen: 'Un solo desembolso para impulsar proyectos específicos o capital de trabajo.',
    monto: '$30,000 - $10,000,000 MXN',
    plazo: '3 a 60 meses',
    href: '/calculadoras/calculadora-simple',
    productoHref: '/productos/credito-simple'
  },
  {
    key: 'empresarial',
    title: 'Crédito Empresarial',
    icon: 'tabler-building-skyscraper',
    resumen: 'Estructuras de financiamiento a medida para crecimiento, expansión o refinanciamientos.',
    monto: '$500,000 - $50,000,000 MXN',
    plazo: '12 a 120 meses',
    href: '/calculadoras/calculadora-empresarial',
    productoHref: '/productos/credito-empresarial'
  },
  {
    key: 'revolvente',
    title: 'Crédito Revolvente',
    icon: 'tabler-refresh',
    resumen: 'Línea de crédito renovable para acompañar el ciclo operativo de tu negocio.',
    monto: '$300,000 - $50,000,000 MXN',
    plazo: 'Línea renovable con revisiones periódicas',
    href: '/calculadoras/calculadora-revolvente',
    productoHref: '/productos/credito-revolvente'
  },
  {
    key: 'venta-key',
    title: 'Crédito Venta Key',
    icon: 'tabler-home-dollar',
    resumen: 'Liquidez a partir de tu inmueble, manteniendo claridad en condiciones y plazos.',
    monto: '30% - 40% del valor del inmueble',
    plazo: 'Plazos flexibles según el proyecto',
    href: '/calculadoras/calculadora-venta-key',
    productoHref: '/productos/credito-venta-key'
  }
];

export default function ProductosContent() {
  const theme = useTheme();

  return (
    <>
      <SectionHero heading="Productos de crédito Capitalta" search={false} offer />
      <ContainerWrapper>
        <Stack sx={{ gap: 4, py: { xs: 4, sm: 6 } }}>
          <Stack sx={{ gap: 1.5, maxWidth: 720, mx: 'auto', textAlign: 'center' }}>
            <Typography variant="h3">Elige el crédito que mejor se adapta a tu proyecto</Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Capitalta diseña estructuras de financiamiento claras y responsables para cada etapa de crecimiento. Revisa las
              características de cada producto y utiliza nuestras calculadoras para estimar pagos y plazos.
            </Typography>
          </Stack>

          <Grid container spacing={3}>
            {productos.map((producto, index) => (
              <Grid size={{ xs: 12, md: 6 }} key={producto.key}>
                <Box
                  component={motion.div}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ translateY: -8 }}
                  sx={{
                    height: '100%',
                    p: 3,
                    borderRadius: 4,
                    border: '1px solid',
                    borderColor: 'grey.200',
                    bgcolor: 'background.paper',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2.5,
                    transition: 'all 0.3s ease-in-out',
                    boxShadow: theme.customShadows ? theme.customShadows.z1 : '0 2px 8px rgba(0,0,0,0.05)',
                    '&:hover': {
                      borderColor: 'primary.main',
                      boxShadow: theme.customShadows ? theme.customShadows.z8 : '0 8px 24px rgba(0,0,0,0.1)',
                    }
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        bgcolor: 'primary.lighter',
                        color: 'primary.main',
                        display: 'flex'
                      }}
                    >
                      <SvgIcon name={producto.icon} type={IconType.STROKE} size={32} stroke={1.5} />
                    </Box>
                    <Stack sx={{ gap: 1 }}>
                      <Typography variant="h5" sx={{ fontWeight: 600 }}>{producto.title}</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                        {producto.resumen}
                      </Typography>
                    </Stack>
                  </Stack>

                  <Stack sx={{ gap: 1.5, mt: 1, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                    <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                        Monto
                      </Typography>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{producto.monto}</Typography>
                    </Stack>
                    <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                        Plazo
                      </Typography>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{producto.plazo}</Typography>
                    </Stack>
                  </Stack>

                  <Stack direction="row" sx={{ gap: 1.5, mt: 'auto' }}>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      href={producto.href}
                      fullWidth
                      startIcon={<SvgIcon name="tabler-calculator" size={18} />}
                    >
                      Calculadora
                    </Button>
                    <Button 
                      variant="outlined" 
                      color="primary" 
                      href={producto.productoHref}
                      fullWidth
                      endIcon={<SvgIcon name="tabler-arrow-right" size={18} />}
                    >
                      Detalles
                    </Button>
                  </Stack>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </ContainerWrapper>
    </>
  );
}
