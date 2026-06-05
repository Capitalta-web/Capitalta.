'use client';
import PropTypes from 'prop-types';

// @mui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

// @third-party
import { motion } from 'framer-motion';

// @project
import ButtonAnimationWrapper from '@/components/ButtonAnimationWrapper';
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import GraphicsImage from '@/components/GraphicsImage';
import { withAlpha } from '@/utils/colorUtils';
import { SECTION_COMMON_PY } from '@/utils/constant';
import Typeset from '@/components/Typeset';

/***************************  INTEGRATION - AVATAR  ***************************/

function IntegrationAvatar({ src, reverse }) {
  const theme = useTheme();

  const avatarSize = { xs: 83, sm: 105, md: 140 };
  const iconSize = { xs: 24, sm: 30, md: 40 };

  return (
    <Box
      sx={{
        background: reverse
          ? `linear-gradient(180deg, ${theme.vars.palette.background.default} 0%, ${withAlpha(theme.vars.palette.background.default, 0)} 100%)`
          : `linear-gradient(180deg, ${withAlpha(theme.vars.palette.background.default, 0)} 0%, ${theme.vars.palette.background.default} 100%)`,
        p: 0.125,
        borderRadius: { xs: 12, sm: 15, md: 20 }
      }}
    >
      <Avatar sx={{ bgcolor: 'grey.100', width: avatarSize, height: avatarSize }}>
        <GraphicsImage image={src} sx={{ width: iconSize, height: iconSize }} />
      </Avatar>
    </Box>
  );
}

/***************************  INTEGRATION - 8  ***************************/

/**
 *
 * Demos:
 * - [Integration8](https://www.Capitalta.io/blocks/integration/integration8)
 *
 * API:
 * - [Integration8 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/integration/integration8#props-details)
 */

export default function Integration8({ headLine, captionLine, primaryBtn }) {
  const theme = useTheme();
  const grey100 = theme.vars.palette.grey[100];

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.5,
          delay: 0.5
        }}
      >
        <GraphicsCard>
          <GraphicsCard sx={{ position: 'relative' }}>
            <Stack direction="row" sx={{ justifyContent: 'center' }}>
              <IntegrationAvatar src="/assets/images/integration/asana.png" />
              <IntegrationAvatar src="/assets/images/integration/slack.png" />
              <IntegrationAvatar src="/assets/images/integration/intercom.png" />
              <IntegrationAvatar src="/assets/images/integration/paypal.png" />
              <IntegrationAvatar src="/assets/images/integration/dropbox.png" />
              <IntegrationAvatar src="/assets/images/integration/jira.png" />
              <IntegrationAvatar src="/assets/images/integration/zoom.png" />
            </Stack>
            <Stack direction="row" sx={{ justifyContent: 'center', mt: { xs: -1.5, sm: -1.75, md: -2.5 } }}>
              <IntegrationAvatar src="/assets/images/integration/skype.png" reverse />
              <IntegrationAvatar src="/assets/images/integration/master-card.png" reverse />
              <IntegrationAvatar src="/assets/images/integration/trip-advicer.png" reverse />
              <IntegrationAvatar src="/assets/images/integration/google-drive.png" reverse />
              <IntegrationAvatar src="/assets/images/integration/loom.png" reverse />
              <IntegrationAvatar src="/assets/images/integration/mail-chimp.png" reverse />
              <IntegrationAvatar src="/assets/images/integration/messenger-facebook.png" reverse />
              <IntegrationAvatar src="/assets/images/integration/notion.png" reverse />
            </Stack>
            <Box
              sx={{
                background: `radial-gradient(51.92% 57.91% at 50% 53.14%, ${withAlpha(grey100, 0)} 0%, ${grey100} 200%)`,
                position: 'absolute',
                width: 1,
                height: 1,
                top: 0,
                zIndex: 1
              }}
            />
          </GraphicsCard>
          <GraphicsCard sx={{ bgcolor: 'grey.200' }}>
            <Stack sx={{ alignItems: 'center', p: { xs: 3, sm: 4, md: 5 }, gap: 4 }}>
              <Typeset
                {...{
                  heading: headLine,
                  caption: captionLine,
                  captionProps: { variant: 'body1', sx: { color: 'text.secondary' } },
                  stackProps: { sx: { textAlign: 'center', gap: { xs: 1, sm: 1.5 }, maxWidth: 700 } }
                }}
              />
              {primaryBtn && (
                <ButtonAnimationWrapper>
                  <Button variant="contained" size="large" {...primaryBtn} />
                </ButtonAnimationWrapper>
              )}
            </Stack>
          </GraphicsCard>
        </GraphicsCard>
      </motion.div>
    </ContainerWrapper>
  );
}

IntegrationAvatar.propTypes = { src: PropTypes.any, reverse: PropTypes.bool };

Integration8.propTypes = { headLine: PropTypes.string, captionLine: PropTypes.string, primaryBtn: PropTypes.any };
