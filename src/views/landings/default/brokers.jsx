'use client';

import { useMemo } from 'react';
import { alpha, useTheme } from '@mui/material/styles';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import ComingSoon from '@/blocks/ComingSoon';
import ContainerWrapper from '@/components/ContainerWrapper';
import SvgIcon from '@/components/SvgIcon';
import { IconType } from '@/enum';
import { SECTION_COMMON_PY } from '@/utils/constant';

export default function Brokers() {
  const theme = useTheme();

  const form = useMemo(
    () => ({
      submitUrl: '/api/leads',
      submitPayload: {
        nombre: 'Broker',
        apellido: '',
        telefono: null,
        tipo_cliente: null,
        empresa: null,
        rfc: null,
        origen: 'broker',
        notas: JSON.stringify({ interes: 'broker', source_path: '/quiero-ser-broker' })
      },
      placeholder: 'Tu correo electrónico',
      successMessage: 'Gracias. Te contactaremos para iniciar tu registro como bróker.'
    }),
    []
  );

  const benefits = [
    {
      title: 'Comisiones competitivas',
      desc: 'Esquema de comisiones claro y alineado al cierre de operaciones.',
      icon: 'tabler-currency-dollar'
    },
    {
      title: 'Respaldo legal y administrativo',
      desc: 'Acompañamiento en documentación, procesos y formalización.',
      icon: 'tabler-shield-check'
    },
    {
      title: 'Red de networking',
      desc: 'Conecta con inversionistas, aliados y oportunidades nuevas.',
      icon: 'tabler-users'
    }
  ];

  const steps = [
    { title: 'Conoce el inventario', desc: 'Accede a oportunidades disponibles y criterios de cada operación.' },
    { title: 'Firma acuerdo de confidencialidad', desc: 'Protegemos la información de expedientes y partes involucradas.' },
    { title: 'Analiza el expediente', desc: 'Revisa documentación, riesgos y ruta jurídica con soporte del equipo.' },
    { title: 'Envía tu propuesta', desc: 'Presenta tu oferta y comenzamos negociación.' },
    { title: 'Formalizamos', desc: 'Se firma ante notario y se da seguimiento al proceso.' }
  ];

  const requirements = [
    'Experiencia en cesión de derechos o recuperación (ideal 1+ año)',
    'Conocimiento básico de procesos jurídicos',
    'Cartera de clientes o capacidad de prospección',
    'Trabajo bajo objetivos y seguimiento',
    'Documentación actualizada'
  ];

  const faqs = [
    {
      q: '¿Qué es una cesión de derechos?',
      a: 'Es un acuerdo legal mediante el cual una persona transfiere a otra los derechos sobre un bien, un contrato o una deuda. En inversiones, suele usarse para obtener liquidez inmediata a cambio de derechos futuros de cobro.'
    },
    {
      q: '¿Cómo es el proceso de compra de cesiones de derechos?',
      a: 'Conoces el inventario, firmas un acuerdo de confidencialidad, analizas el expediente, presentas tu propuesta y se formaliza ante notario.'
    },
    {
      q: '¿Cuáles son los requisitos para ser bróker?',
      a: 'Idealmente contar con experiencia en venta/colocación, conocimiento de procesos jurídicos, cartera de clientes y capacidad de seguimiento por objetivos.'
    },
    {
      q: '¿Qué beneficios tiene invertir en cesiones de derechos?',
      a: 'Diversificación del portafolio, acceso a oportunidades por debajo del valor de mercado y un modelo flexible, con respaldo legal y seguimiento.'
    },
    {
      q: '¿Qué pasa después de dejar mi correo?',
      a: 'Nuestro equipo te contacta para conocer tu perfil, resolver dudas y darte acceso al proceso de integración.'
    }
  ];

  return (
    <>
      <ComingSoon
        chip={{ chipCaption: 'Programa de Brókers' }}
        heading="Únete a nuestra red de brókers"
        description="Déjanos tu correo y un asesor te contactará para explicarte el proceso, comisiones y requisitos."
        primaryBtn={{ children: 'Suscribirse', sx: { px: 2.5, fontSize: 12, whiteSpace: 'nowrap' } }}
        form={form}
      />

      <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
        <Stack sx={{ gap: { xs: 4, md: 6 } }}>
          <Stack sx={{ gap: 1, textAlign: 'center', maxWidth: 840, mx: 'auto' }}>
            <Typography variant="h3">Un proceso claro y acompañado</Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Creamos un camino simple para que puedas operar con confianza, respaldo documental y seguimiento puntual.
            </Typography>
          </Stack>

          <Grid container spacing={2.5} alignItems="stretch">
            {benefits.map((b) => (
              <Grid key={b.title} item xs={12} md={4} sx={{ display: 'flex' }}>
                <Box
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: alpha(theme.palette.primary.main, 0.12),
                    bgcolor: alpha(theme.palette.background.paper, 0.9),
                    backdropFilter: 'blur(10px)',
                    width: 1
                  }}
                >
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 2.5,
                      bgcolor: alpha(theme.palette.primary.main, 0.08),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2
                    }}
                  >
                    <SvgIcon name={b.icon} type={IconType.STROKE} size={28} stroke={1.6} color={theme.palette.primary.main} />
                  </Box>
                  <Typography variant="h5" sx={{ mb: 1, fontWeight: 700 }}>
                    {b.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                    {b.desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>

          <Divider />

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" sx={{ mb: 1.5 }}>
                ¿Cómo funciona?
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2.5 }}>
                Desde el primer contacto hasta la formalización, el equipo te acompaña para avanzar con seguridad.
              </Typography>
              <Stack sx={{ gap: 1.5 }}>
                {steps.map((s, idx) => (
                  <Box
                    key={s.title}
                    sx={{
                      p: 2.25,
                      borderRadius: 2.5,
                      border: '1px solid',
                      borderColor: 'grey.200',
                      bgcolor: 'background.paper'
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                      {idx + 1}. {s.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {s.desc}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h4" sx={{ mb: 1.5 }}>
                Requisitos
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2.5 }}>
                Buscamos perfiles con experiencia y capacidad de seguimiento. Si te interesa, te guiamos en el onboarding.
              </Typography>
              <Stack sx={{ gap: 1.5 }}>
                {requirements.map((r) => (
                  <Box
                    key={r}
                    sx={{
                      p: 2.25,
                      borderRadius: 2.5,
                      border: '1px solid',
                      borderColor: 'grey.200',
                      bgcolor: 'background.paper',
                      display: 'flex',
                      gap: 1.5,
                      alignItems: 'flex-start'
                    }}
                  >
                    <Box sx={{ mt: 0.25, color: 'primary.main' }}>
                      <SvgIcon name="tabler-check" type={IconType.STROKE} size={18} stroke={2} color={theme.palette.primary.main} />
                    </Box>
                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                      {r}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Grid>
          </Grid>

          <Divider />

          <Box sx={{ maxWidth: 920, mx: 'auto', width: 1 }}>
            <Stack sx={{ textAlign: 'center', gap: 1, mb: 3 }}>
              <Typography variant="h3">Preguntas frecuentes</Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Aclara dudas comunes antes de iniciar el proceso.
              </Typography>
            </Stack>

            <Stack sx={{ gap: 1 }}>
              {faqs.map((f) => (
                <Accordion key={f.q} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                      {f.q}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                      {f.a}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Stack>
          </Box>
        </Stack>
      </ContainerWrapper>
    </>
  );
}
