'use client';

// @next
import NextLink from 'next/link';

// @mui
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @third-party
import { motion } from 'framer-motion';

// @project
import branding from '@/branding.json';
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import { Copyright, FollowUS, Sitemap } from '@/components/footer';
import LogoSection from '@/components/logo';
import SvgIcon from '@/components/SvgIcon';

import { CopyrightType } from '@/enum';
import { DOCS_URL, FREEBIES_URL } from '@/path';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  FOOTER - 7 DATA  ***************************/

/**
 *
 * Demos:
 * - [Footer7](https://www.Capitalta.io/blocks/footer/footer7)
 */

const linkProps = { target: '_blank', rel: 'noopener noreferrer' };
const data = [
  {
    id: 'navegacion',
    grid: { size: { xs: 6, sm: 'auto' } },
    title: 'Navegación',
    menu: [
      {
        label: 'Inicio',
        link: { href: '/' }
      },
      {
        label: 'Productos',
        link: { href: '/productos' }
      },
      {
        label: 'Calculadoras',
        link: { href: '/calculadoras/calculadora-simple' }
      }
    ]
  },
  {
    id: 'capitalta',
    grid: { size: { xs: 6, sm: 'auto' } },
    title: 'Capitalta',
    menu: [
      {
        label: 'Sobre Nosotros',
        link: { href: '/sobre-nosotros' }
      },
      {
        label: 'Contacto',
        link: { href: '/contacto' }
      }
    ]
  },
  {
    id: 'legales',
    grid: { size: { xs: 6, sm: 'auto' } },
    title: 'Legales',
    menu: [
      {
        label: 'Aviso de Privacidad',
        link: { href: '/aviso-de-privacidad' }
      },
      {
        label: 'Términos y Condiciones',
        link: { href: '/terminos-y-condiciones' }
      }
    ]
  }
];

const iconProps = { color: 'text.secondary' };

/***************************  FOOTER - 7  ***************************/

export default function Footer7() {
  const logoFollowContent = (
    <Stack sx={{ alignItems: 'flex-start', gap: { xs: 1.5, sm: 3 } }}>
      <LogoSection />
      <Typography variant="body2" sx={{ maxWidth: { sm: 280 } }}>
        Soluciones financieras claras y transparentes para impulsar tu crecimiento.
      </Typography>
    </Stack>
  );

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.5,
          delay: 0.4
        }}
      >
        <Stack id="footer-7" role="contentinfo" rel="noopener noreferrer" aria-label="Footer 7" sx={{ gap: { xs: 3, sm: 4, md: 5 } }}>
          <Grid container spacing={{ xs: 4, md: 3 }}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Stack direction={{ sm: 'row', md: 'column' }} sx={{ gap: 3, justifyContent: 'space-between', height: 1 }}>
                {logoFollowContent}
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <Sitemap list={data} isMenuDesign />
            </Grid>
          </Grid>
          <GraphicsCard sx={{ borderRadius: { xs: 6, sm: 8 } }}>
            <Stack
              direction={{ sm: 'row' }}
              sx={{
                alignItems: 'center',
                justifyContent: { xs: 'center', sm: 'space-between' },
                gap: 1.5,
                py: { xs: 2, sm: 1.5 },
                px: { xs: 2, sm: 3 }
              }}
            >
              <Copyright type={CopyrightType.TYPE3} />
              <FollowUS heading={false} color="grey.100" />
            </Stack>
          </GraphicsCard>
        </Stack>
      </motion.div>
    </ContainerWrapper>
  );
}
