import { useTheme, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';

// @project
import { Feature15 } from '@/blocks/feature';
import { Cta5 } from '@/blocks/cta';
import SectionHero from '@/components/SectionHero';
import ContainerWrapper from '@/components/ContainerWrapper';
import SvgIcon from '@/components/SvgIcon';
import { IconType } from '@/enum';

// @data
import { aboutCapitalta, cta5 } from './data';

/***************************  PAGE - ABOUT  ***************************/

export default function About() {
  const theme = useTheme();
  
  return (
    <>
      <SectionHero heading="Más que una financiera, un aliado estratégico" search={false} />
      <Feature15 {...aboutCapitalta} />
      
      <ContainerWrapper>
        <Box
          sx={{
            mt: { xs: 4, sm: 6 },
            mb: { xs: 4, sm: 6 }
          }}
        >
          <Stack sx={{ gap: 3 }}>
            <Stack sx={{ textAlign: 'center', gap: 1 }}>
              <Typography variant="overline" sx={{ color: 'primary.main', letterSpacing: 1 }}>
                Nuestros valores
              </Typography>
              <Typography variant="h3">Fundamentos que guían cada crédito</Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 720, mx: 'auto' }}>
                En Capitalta ponemos por delante la transparencia, la responsabilidad y la cercanía para construir relaciones de largo
                plazo.
              </Typography>
            </Stack>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                gap: 4
              }}
            >
              {[
                {
                  title: 'Honestidad',
                  desc: 'Transparencia total en condiciones, costos y riesgos en cada operación.',
                  icon: 'tabler-shield-check'
                },
                {
                  title: 'Responsabilidad',
                  desc: 'Diseñamos créditos sostenibles, alineados a la capacidad de pago de cada cliente.',
                  icon: 'tabler-briefcase'
                },
                {
                  title: 'Lealtad',
                  desc: 'Construimos relaciones de confianza, acompañando a nuestros clientes en cada etapa.',
                  icon: 'tabler-star'
                },
                {
                  title: 'Respeto',
                  desc: 'Escuchamos cada historia y tratamos a todas las personas con empatía y equidad.',
                  icon: 'tabler-heart'
                },
                {
                  title: 'Trabajo en equipo',
                  desc: 'Colaboramos con clientes, aliados e inversionistas para lograr mejores resultados.',
                  icon: 'tabler-users'
                }
              ].map((item, index) => (
                <Box
                  key={index}
                  component={motion.div}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ translateY: -8 }}
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'grey.200',
                    boxShadow: theme.customShadows ? theme.customShadows.z1 : '0 2px 8px rgba(0,0,0,0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      borderColor: 'primary.main',
                      boxShadow: theme.customShadows ? theme.customShadows.z8 : '0 8px 24px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      bgcolor: alpha(theme.palette.primary.main, 0.08),
                      color: 'primary.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3
                    }}
                  >
                    <SvgIcon name={item.icon} type={IconType.STROKE} size={32} stroke={1.5} color={theme.palette.primary.main} />
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 1.5 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                    {item.desc}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Stack>
        </Box>
      </ContainerWrapper>
      
      <Cta5 {...cta5} />
    </>
  );
}
