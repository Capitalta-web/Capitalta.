'use client';
import PropTypes from 'prop-types';

import { alpha, useTheme } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import BrokerForm from '@/components/brokers/BrokerForm';
import ContainerWrapper from '@/components/ContainerWrapper';
import SvgIcon from '@/components/SvgIcon';
import { IconType } from '@/enum';
import { SECTION_COMMON_PY } from '@/utils/constant';

const WHATSAPP_URL = 'https://wa.me/525652016445';

const profile = [
  {
    title: 'Orientación comercial',
    desc: 'Prospección, seguimiento, negociación y cierre sin prácticas engañosas.',
    icon: 'tabler-target'
  },
  {
    title: 'Análisis financiero',
    desc: 'Entiende ingresos, flujo, capacidad de pago, endeudamiento, tasas, plazos y garantías.',
    icon: 'tabler-chart-line'
  },
  {
    title: 'Comunicación',
    desc: 'Explica productos, costos, riesgos y condiciones en lenguaje claro.',
    icon: 'tabler-message-circle'
  },
  {
    title: 'Negociación',
    desc: 'Relación con clientes, instituciones, ejecutivos y áreas de crédito.',
    icon: 'tabler-scale'
  }
];

const steps = [
  {
    title: 'Prospección de clientes aptos',
    desc: 'Identificas clientes con perfil adecuado para nuestros productos, siempre por canales autorizados.',
    icon: 'tabler-users'
  },
  {
    title: 'Calificación previa',
    desc: 'Calificas a cada prospecto antes de canalizarlo con nosotros.',
    icon: 'tabler-circle-check'
  },
  {
    title: 'Integración del expediente',
    desc: 'Preparas el expediente del cliente conforme a nuestra checklist.',
    icon: 'tabler-clipboard-check'
  },
  {
    title: 'Seguimiento hasta la resolución',
    desc: 'Das seguimiento al expediente hasta la resolución del crédito o, en su defecto, hasta el cierre del expediente.',
    icon: 'tabler-flag'
  }
];

const ethics = [
  'Confidencialidad y protección de datos personales del cliente.',
  'Asesoría sobre nuestros productos sin engaños ni letras pequeñas.',
  'Seguridad e integridad del cliente.'
];

function SectionTitle({ title, intro }) {
  return (
    <Stack sx={{ gap: 1.5, mb: { xs: 3, md: 4 } }}>
      <Typography variant="h3">{title}</Typography>
      {intro && (
        <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 680 }}>
          {intro}
        </Typography>
      )}
    </Stack>
  );
}

export default function Brokers() {
  const theme = useTheme();

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ gap: { xs: 8, md: 12 }, py: { xs: 2, md: 6 } }}>
        {/* Hero */}
        <Stack sx={{ gap: 3, maxWidth: 820 }}>
          <Typography component="h1" variant="h1">
            Súmate a nuestra red de brokers financieros
          </Typography>
          <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400, maxWidth: 680 }}>
            Buscamos profesionales que identifiquen necesidades de financiamiento o inversión, orienten al cliente con claridad y canalicen
            operaciones con transparencia y apego a la normativa aplicable.
          </Typography>
          <Box>
            <Button href="#registro" variant="contained" size="large">
              Postularme como broker
            </Button>
          </Box>
        </Stack>

        {/* ¿Qué hace un broker financiero? */}
        <Box component="section">
          <SectionTitle
            title="¿Qué hace un broker financiero?"
            intro="Conecta al cliente con las alternativas financieras que le convienen. Según el modelo de negocio y las autorizaciones correspondientes, intermedia o canaliza operaciones con instituciones financieras, siempre con confidencialidad y conocimiento del producto."
          />
        </Box>

        {/* Perfil */}
        <Box component="section">
          <SectionTitle title="El perfil que buscamos" />
          <Grid container spacing={2.5}>
            {profile.map((item) => (
              <Grid key={item.title} size={{ xs: 12, sm: 6, md: 3 }} sx={{ display: 'flex' }}>
                <Box
                  sx={{
                    p: 3,
                    width: 1,
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    bgcolor: 'background.paper'
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2.5,
                      bgcolor: 'primary.lighter',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2
                    }}
                  >
                    <SvgIcon name={item.icon} type={IconType.STROKE} size={24} stroke={1.8} />
                  </Box>
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 700 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                    {item.desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Cómo trabajamos */}
        <Box component="section">
          <SectionTitle
            title="Cómo trabajamos"
            intro="Esperamos que cumplas metas sin sacrificar calidad, transparencia ni cumplimiento."
          />
          <Grid container spacing={{ xs: 0, md: 4 }}>
            {steps.map((step) => (
              <Grid key={step.title} size={{ xs: 12, md: 6 }}>
                <Stack direction="row" sx={{ gap: 2, alignItems: 'flex-start', py: 2.5, borderTop: '1px solid', borderColor: 'divider' }}>
                  <Box
                    sx={{
                      flex: 'none',
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      bgcolor: 'primary.lighter',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <SvgIcon name={step.icon} type={IconType.STROKE} size={24} stroke={1.8} />
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
                      {step.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                      {step.desc}
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Ética y cumplimiento */}
        <Box
          component="section"
          sx={{
            p: { xs: 3, md: 4 },
            borderLeft: '5px solid',
            borderColor: 'info.main',
            borderRadius: '0 12px 12px 0',
            bgcolor: alpha(theme.palette.info.main, 0.08)
          }}
        >
          <Typography variant="h4" sx={{ color: 'info.main', mb: 1.5 }}>
            Nuestro compromiso de ética y cumplimiento
          </Typography>
          <Typography variant="body1">
            Nunca prometemos autorizaciones, tasas o condiciones sin confirmar, ni alteramos documentos, ocultamos costos o presentamos
            datos falsos para mejorar una aprobación.
          </Typography>
          <Box component="ul" sx={{ m: 0, mt: 2, pl: 2.5 }}>
            {ethics.map((item) => (
              <Typography key={item} component="li" variant="body1" sx={{ my: 0.75 }}>
                {item}
              </Typography>
            ))}
          </Box>
        </Box>

        {/* Postulación */}
        <Box component="section" id="registro" sx={{ scrollMarginTop: 96 }}>
          <Stack sx={{ alignItems: 'center', textAlign: 'center', gap: 1, mb: 4 }}>
            <Typography variant="h3">¿Cumples con el perfil?</Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Envíanos tu postulación y un asesor te contactará.
            </Typography>
          </Stack>

          <Box
            sx={{
              maxWidth: 760,
              mx: 'auto',
              p: { xs: 2.5, sm: 4 },
              borderRadius: 4,
              border: '1px solid',
              borderColor: alpha(theme.palette.primary.main, 0.2),
              bgcolor: 'background.paper'
            }}
          >
            <BrokerForm />
          </Box>

          <Stack sx={{ alignItems: 'center', textAlign: 'center', gap: 1.5, mt: 5 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 560 }}>
              Si aún tienes dudas sobre nuestra manera de trabajar, contáctanos vía WhatsApp para resolver dudas y comentarios.
            </Typography>
            <Link
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener"
              underline="hover"
              sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, fontWeight: 600, fontSize: '1.15rem', color: 'text.primary' }}
            >
              <SvgIcon name="tabler-brand-whatsapp" type={IconType.STROKE} size={28} stroke={1.8} color="#25D366" />
              56 5201 6445
            </Link>
          </Stack>
        </Box>
      </Stack>
    </ContainerWrapper>
  );
}

SectionTitle.propTypes = { title: PropTypes.string, intro: PropTypes.string };
