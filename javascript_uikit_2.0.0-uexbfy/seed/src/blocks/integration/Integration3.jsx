'use client';
import PropTypes from 'prop-types';

// @mui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @third-party
import { motion } from 'framer-motion';

// @project
import ButtonAnimationWrapper from '@/components/ButtonAnimationWrapper';
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import GraphicsImage from '@/components/GraphicsImage';
import { withAlpha } from '@/utils/colorUtils';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  INTEGRATION - AVATAR  ***************************/

function IntegrationAvatar({ src }) {
  const avatarSize = { xs: 52, sm: 68, md: 100 };
  const iconSize = { xs: 24, sm: 30, md: 45 };

  return (
    <Avatar variant="rounded" sx={{ bgcolor: 'background.default', width: avatarSize, height: avatarSize, borderRadius: { xs: 4, md: 6 } }}>
      <GraphicsImage image={src} sx={{ width: iconSize, height: iconSize }} />
    </Avatar>
  );
}

/***************************  INTEGRATION - 3  ***************************/

/**
 *
 * Demos:
 * - [Integration3](https://www.saasable.io/blocks/integration/integration3)
 *
 * API:
 * - [Integration3 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/integration/integration3#props-details)
 */

export default function Integration3({ headLine, captionLine, primaryBtn }) {
  const theme = useTheme();
  const cardPadding = { xs: 3, sm: 4, md: 5 };
  const stackStyle = { height: 1, width: 1, alignItems: 'center', gap: { xs: 1, sm: 3 }, pt: { md: 1.5 } };
  const commonGrid = { xs: 2, sm: 1.5, md: 1.2 };

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.6,
          delay: 0.6
        }}
      >
        <GraphicsCard>
          <Stack sx={{ alignItems: 'center', px: cardPadding, pt: cardPadding }}>
            <Stack
              sx={{
                alignItems: 'center',
                gap: { xs: 1, sm: 1.5 },
                maxWidth: { xs: 420, sm: '58%' },
                width: { xs: 'calc(100% - 10px)', md: '58%' }
              }}
            >
              {headLine && (
                <Typography align="center" variant="h2">
                  {headLine}
                </Typography>
              )}
              {captionLine && (
                <Typography align="center" sx={{ color: 'text.secondary' }}>
                  {captionLine}
                </Typography>
              )}
            </Stack>
            {primaryBtn && (
              <ButtonAnimationWrapper>
                <Button variant="contained" size="large" {...primaryBtn} sx={{ mt: { xs: 4, sm: 5 }, ...primaryBtn.sx }} />
              </ButtonAnimationWrapper>
            )}
          </Stack>
          <Grid
            container
            spacing={{ xs: 0.5, sm: 1.5 }}
            sx={{
              justifyContent: { xs: 'center', md: 'space-evenly' },
              position: 'relative',
              width: { xs: `calc(100% + 12px)`, md: `calc(100% + 132px)` },
              ml: { xs: -1.5, md: -7.75 },
              mb: { xs: -2, sm: -4, md: -2.5 },
              mt: { md: -1.5 },
              height: { xs: 210, sm: 250, md: 324 },
              pt: 4.5,
              '&:after': {
                content: `' '`,
                position: 'absolute',
                width: 1,
                height: 1,
                left: 0,
                bottom: 0,
                background: `linear-gradient(180deg, ${withAlpha(theme.vars.palette.grey[100], 0)} 38.07%, ${theme.vars.palette.grey[100]} 143.54%)`
              }
            }}
          >
            <Grid size={commonGrid}>
              <Stack sx={{ ...stackStyle, justifyContent: 'flex-end' }}>
                <IntegrationAvatar src="/assets/images/integration/zoom.png" />
              </Stack>
            </Grid>
            <Grid size={commonGrid}>
              <Stack sx={{ ...stackStyle, justifyContent: 'center' }}>
                <IntegrationAvatar src="/assets/images/integration/asana.png" />
                <IntegrationAvatar src="/assets/images/integration/skype.png" />
              </Stack>
            </Grid>
            <Grid size={commonGrid}>
              <Stack sx={{ ...stackStyle, justifyContent: 'center' }}>
                <IntegrationAvatar src="/assets/images/integration/slack.png" />
              </Stack>
            </Grid>
            <Grid size={commonGrid}>
              <Stack sx={{ ...stackStyle, justifyContent: 'center' }}>
                <IntegrationAvatar src="/assets/images/integration/intercom.png" />
                <IntegrationAvatar src="/assets/images/integration/master-card.png" />
              </Stack>
            </Grid>
            <Grid size={commonGrid}>
              <Stack sx={{ ...stackStyle, justifyContent: 'center' }}>
                <IntegrationAvatar src="/assets/images/integration/trip-advicer.png" />
              </Stack>
            </Grid>
            <Grid size={commonGrid}>
              <Stack sx={{ ...stackStyle, justifyContent: 'center' }}>
                <IntegrationAvatar src="/assets/images/integration/paypal.png" />
                <IntegrationAvatar src="/assets/images/integration/messenger-facebook.png" />
              </Stack>
            </Grid>
            <Grid size={commonGrid}>
              <Stack sx={{ ...stackStyle, justifyContent: 'center' }}>
                <IntegrationAvatar src="/assets/images/integration/google-drive.png" />
              </Stack>
            </Grid>
            <Grid size={commonGrid}>
              <Stack sx={{ ...stackStyle, justifyContent: 'center' }}>
                <IntegrationAvatar src="/assets/images/integration/dropbox.png" />
                <IntegrationAvatar src="/assets/images/integration/loom.png" />
              </Stack>
            </Grid>
            <Grid size={commonGrid}>
              <Stack sx={{ ...stackStyle, justifyContent: 'flex-start', mt: { md: -4.5 } }}>
                <IntegrationAvatar src="/assets/images/integration/jira.png" />
                <IntegrationAvatar src="/assets/images/integration/mail-chimp.png" />
              </Stack>
            </Grid>
            <Grid size={{ xs: 2, sm: 4.5, md: 1.2 }}>
              <Stack sx={{ ...stackStyle, justifyContent: 'flex-end', mt: { md: -3 } }}>
                <IntegrationAvatar src="/assets/images/integration/notion.png" />
              </Stack>
            </Grid>
          </Grid>
        </GraphicsCard>
      </motion.div>
    </ContainerWrapper>
  );
}

IntegrationAvatar.propTypes = { src: PropTypes.any };

Integration3.propTypes = { headLine: PropTypes.string, captionLine: PropTypes.string, primaryBtn: PropTypes.any };
