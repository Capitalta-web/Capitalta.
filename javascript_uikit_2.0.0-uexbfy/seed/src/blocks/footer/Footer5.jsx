'use client';

// @next
import Link from 'next/link';

// @mui
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';

// @third-party
import { motion } from 'framer-motion';

// @project
import ButtonAnimationWrapper from '@/components/ButtonAnimationWrapper';
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import { Copyright, FollowUS } from '@/components/footer';
import LogoSection from '@/components/logo';
import { Localization } from '@/components/navbar';
import Typeset from '@/components/Typeset';

import { CopyrightType } from '@/enum';
import { FREEBIES_URL } from '@/path';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  FOOTER - 5  ***************************/

/**
 *
 * Demos:
 * - [Footer5](https://www.saasable.io/blocks/footer/footer5)
 */

export default function Footer5() {
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
        <GraphicsCard id="footer-5" role="contentinfo" rel="noopener noreferrer" aria-label="Footer 5">
          <Stack sx={{ gap: { xs: 4, sm: 5 }, padding: { xs: 3, sm: 5, md: 8 } }}>
            <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <LogoSection isIcon={true} />
              <Localization />
            </Stack>
            <Stack sx={{ gap: { xs: 5, sm: 6, md: 7 }, alignItems: 'flex-start' }}>
              <Typeset
                {...{
                  heading: 'Upgrade to premium hosting today. Sign up now and enjoy faster speeds, better support, and more',
                  caption: "Let's bring this to fruition ✦",
                  stackProps: { sx: { gap: { xs: 2, sm: 3, md: 4 } } },
                  headingProps: { variant: 'body1', typography: 'h1', role: 'heading' },
                  captionProps: { variant: 'body2', typography: 'h2', role: 'heading' }
                }}
              />
              <ButtonAnimationWrapper>
                <Button
                  color="primary"
                  sx={{ minWidth: 215, width: { xs: 1, sm: 'auto' } }}
                  size="large"
                  variant="outlined"
                  component={Link}
                  href={FREEBIES_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Started - It’s Free Now
                </Button>
              </ButtonAnimationWrapper>
            </Stack>
            <Divider />
            <Stack direction={{ md: 'row' }} sx={{ gap: { xs: 3, sm: 4 }, justifyContent: 'space-between', alignItems: 'center' }}>
              <FollowUS heading={false} />
              <Copyright type={CopyrightType.TYPE2} />
            </Stack>
          </Stack>
        </GraphicsCard>
      </motion.div>
    </ContainerWrapper>
  );
}
