'use client';
import PropTypes from 'prop-types';

// @mui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @third-party
import { motion } from 'framer-motion';

// @project
import AvatarGalaxy from '@/components/AvatarGalaxy';
import { GraphicsCard, IconCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import GraphicsImage from '@/components/GraphicsImage';
import LogoWatermark from '@/components/logo/LogoWatermark';
import Typeset from '@/components/Typeset';
import { withAlpha } from '@/utils/colorUtils';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  FEATURE - MOTION WRAP  ***************************/

function MotionWrap({ delay, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      style={{ height: '100%' }}
    >
      {children}
    </motion.div>
  );
}

/***************************  FEATURE - 26  ***************************/

export default function Feature26({ headLine, captionLine, feature1, feature2, feature3, avatarList }) {
  const theme = useTheme();
  const imageOverlayStyle = {
    position: 'relative',
    '&:after': { content: '" "', position: 'absolute', inset: 0, bgcolor: withAlpha(theme.vars.palette.primary.main, 0.12) }
  };

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ gap: { xs: 3, sm: 4 } }}>
        <MotionWrap delay={0.4}>
          <Typeset heading={headLine} caption={captionLine} stackProps={{ sx: { textAlign: 'center' } }} />
        </MotionWrap>
        <Grid container spacing={1.5}>
          <Grid size={{ xs: 12, md: 3.5 }}>
            <MotionWrap delay={0.5}>
              <Stack direction={{ sm: 'row', md: 'column' }} sx={{ gap: 1.5, height: 1 }}>
                <IconCard icon={feature1.icon} title={feature1.title} content={feature1.content} iconAvatar cardPadding={{ xs: 3 }} />
                <GraphicsCard sx={{ minHeight: { xs: 266, sm: 'auto', md: 266 }, minWidth: { sm: 334, md: 1 } }}>
                  <GraphicsImage image={feature1.image} sx={{ height: 1, ...imageOverlayStyle }} />
                </GraphicsCard>
              </Stack>
            </MotionWrap>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <MotionWrap delay={0.6}>
              <GraphicsCard sx={{ height: 1 }}>
                <Stack sx={{ justifyContent: 'space-between' }}>
                  <Stack sx={{ alignItems: 'center' }}>
                    <AvatarGalaxy avatarList={avatarList} centerIcon={<LogoWatermark width={50} height={50} />} />
                  </Stack>
                  <Stack sx={{ gap: { xs: 1, sm: 1.5 }, px: 3, pb: 3, mt: -3, zIndex: 1 }}>
                    <Typography variant="h4">{feature3.title}</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{feature3.content}</Typography>
                  </Stack>
                </Stack>
              </GraphicsCard>
            </MotionWrap>
          </Grid>
          <Grid size={{ xs: 12, md: 3.5 }}>
            <MotionWrap delay={0.7}>
              <Stack direction={{ sm: 'row', md: 'column' }} sx={{ gap: 1.5, height: 1 }}>
                <GraphicsCard sx={{ minHeight: { xs: 266, sm: 'auto', md: 266 }, minWidth: { sm: 334, md: 1 } }}>
                  <GraphicsImage image={feature2.image} sx={{ height: 1, ...imageOverlayStyle }} />
                </GraphicsCard>
                <IconCard icon={feature2.icon} title={feature2.title} content={feature2.content} iconAvatar cardPadding={{ xs: 3 }} />
              </Stack>
            </MotionWrap>
          </Grid>
        </Grid>
      </Stack>
    </ContainerWrapper>
  );
}

MotionWrap.propTypes = { delay: PropTypes.number, children: PropTypes.node };

Feature26.propTypes = {
  headLine: PropTypes.string,
  captionLine: PropTypes.string,
  feature1: PropTypes.any,
  feature2: PropTypes.any,
  feature3: PropTypes.object,
  avatarList: PropTypes.array
};
