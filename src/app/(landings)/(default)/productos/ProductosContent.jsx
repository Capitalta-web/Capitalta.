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
          <Grid container spacing={4} justifyContent="center">
            {productos.map((producto) => (
              <Grid item xs={12} md={6} key={producto.key} sx={{ display: 'flex' }}>
                <Box
                  sx={{
                    p: 4,
                    width: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: 'primary.main',
                    color: 'common.white',
                    borderRadius: 4,
                    transition: 'all 0.3s ease',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                    }
                  }}
                >
                  <Stack spacing={3} sx={{ height: '100%' }}>
                    <Box
                      sx={{
                        p: 1.5,
                        width: 'fit-content',
                        borderRadius: 2,
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                        color: 'common.white',
                        display: 'flex'
                      }}
                    >
                      <SvgIcon name={producto.icon} type={IconType.STROKE} size={32} />
                    </Box>

                    <Typography variant="h4" fontWeight={700} sx={{ color: 'common.white' }}>
                      {producto.title}
                    </Typography>

                    <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)', minHeight: 60 }}>
                      {producto.resumen}
                    </Typography>

                    <Stack spacing={1.5} sx={{ mt: 'auto', pt: 2 }}>
                      <Stack direction="row" spacing={1}>
                        <Typography variant="subtitle2" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontWeight: 700 }}>
                          Monto:
                        </Typography>
                        <Typography variant="subtitle2" sx={{ color: 'common.white', fontWeight: 700 }}>
                          {producto.monto}
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={1}>
                        <Typography variant="subtitle2" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontWeight: 700 }}>
                          Plazo:
                        </Typography>
                        <Typography variant="subtitle2" sx={{ color: 'common.white', fontWeight: 700 }}>
                          {producto.plazo}
                        </Typography>
                      </Stack>
                    </Stack>

                    <Button
                      variant="outlined"
                      fullWidth
                      href={producto.productoHref}
                      endIcon={<SvgIcon name="tabler-arrow-right" size={18} />}
                      sx={{
                        mt: 2,
                        color: 'common.white',
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                        borderRadius: 10,
                        py: 1.5,
                        textTransform: 'none',
                        fontSize: '1rem',
                        fontWeight: 600,
                        '&:hover': {
                          borderColor: 'common.white',
                          bgcolor: 'rgba(255, 255, 255, 0.1)'
                        }
                      }}
                    >
                      Ver Detalles
                    </Button>
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
