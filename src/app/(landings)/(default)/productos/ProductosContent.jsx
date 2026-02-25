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
import { ProcessTimeline } from '@/blocks/process';

const productos = [
  {
    key: 'simple',
    title: 'Crédito Revolvente',
    icon: 'tabler-currency-dollar',
    resumen: 'Crédito amortizable con un solo desembolso y tasa fija del 36% anual.',
    monto: '$500,000 - $10,000,000 MXN',
    plazo: '12 a 60 meses',
    href: '/calculadoras/calculadora-simple',
    productoHref: '/productos/credito-simple'
  },
  {
    key: 'empresarial',
    title: 'Crédito Empresarial',
    icon: 'tabler-building-bank',
    resumen: 'Estructuras de financiamiento a medida para crecimiento, expansión o refinanciamientos.',
    monto: '$500,000 - $50,000,000 MXN',
    plazo: '12 a 120 meses',
    href: '/calculadoras/calculadora-empresarial',
    productoHref: '/productos/credito-empresarial'
  }
];

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
        list: [{ primary: 'Llenado de solicitud y definición del tipo de crédito' }, { primary: 'Identificación del monto y plazo que estás buscando' }]
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
        list: [{ primary: 'Análisis de capacidad de pago y riesgos de la operación' }, { primary: 'Emisión de resolución por parte del comité de crédito' }]
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
        list: [{ primary: 'Verificación de condiciones previas al fondeo' }, { primary: 'Confirmación de la recepción de los recursos por parte del cliente' }]
      },
      {
        title: '7. Seguimiento y cobranza',
        description: 'Te acompañamos durante la vida del crédito y damos seguimiento a tus pagos.',
        icon: 'tabler-handshake',
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
      <ContainerWrapper>
        <Stack spacing={8} sx={{ py: { xs: 6, md: 10 } }}>
          <Grid container spacing={4}>
            {productos.map((producto) => (
              <Grid item xs={12} md={6} key={producto.key}>
                <Box
                  sx={{
                    p: 4,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    '&:hover': {
                      borderColor: 'primary.main',
                      boxShadow: (theme) => `0 0 20px ${theme.palette.primary.light}40`,
                      transform: 'translateY(-4px)'
                    }
                  }}
                >
                  <Stack spacing={3} sx={{ height: '100%' }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Box
                        sx={{
                          p: 1.5,
                          borderRadius: 2,
                          bgcolor: 'primary.lighter',
                          color: 'primary.main',
                          display: 'flex'
                        }}
                      >
                        <SvgIcon name={producto.icon} type={IconType.STROKE} size={32} />
                      </Box>
                      <Typography variant="h4" fontWeight={700}>
                        {producto.title}
                      </Typography>
                    </Stack>

                    <Typography variant="body1" color="text.secondary">
                      {producto.resumen}
                    </Typography>

                    <Stack spacing={1.5} sx={{ mt: 'auto', pt: 2 }}>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="subtitle2" color="text.secondary">
                          Monto:
                        </Typography>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {producto.monto}
                        </Typography>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="subtitle2" color="text.secondary">
                          Plazo:
                        </Typography>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {producto.plazo}
                        </Typography>
                      </Stack>
                    </Stack>

                    <Stack direction="row" spacing={2} sx={{ pt: 2 }}>
                      <Button variant="contained" fullWidth href={producto.href}>
                        Calcular
                      </Button>
                      <Button variant="outlined" fullWidth href={producto.productoHref}>
                        Detalles
                      </Button>
                    </Stack>
                  </Stack>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </ContainerWrapper>
      <ProcessTimeline {...capitaltaProcess} />
    </>
  );
}
