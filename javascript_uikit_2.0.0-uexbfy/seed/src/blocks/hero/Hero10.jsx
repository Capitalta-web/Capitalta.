'use client';
import PropTypes from 'prop-types';

// @mui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @third-party
import { motion } from 'framer-motion';

// @project
import ButtonAnimationWrapper from '@/components/ButtonAnimationWrapper';
import { GraphicsCard } from '@/components/cards';
import ProfileGroup from '@/components/cards/profile-card/ProfileGroup1';
import ContainerWrapper from '@/components/ContainerWrapper';
import GraphicsImage from '@/components/GraphicsImage';
import SvgIcon from '@/components/SvgIcon';
import { withAlpha } from '@/utils/colorUtils';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  HERO - 10  ***************************/

/**
 *
 * Demos:
 * - [Hero10](https://www.saasable.io/blocks/hero/hero10)
 *
 * API:
 * - [Hero10 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/hero/hero10#props-details)
 */

export default function Hero10({ chipTitle, headLine, captionLine, primaryBtn, secondaryBtn, image, reviewData }) {
  const theme = useTheme();

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.3,
          delay: 0.1
        }}
      >
        <GraphicsCard sx={{ p: { xs: 3, sm: 4, md: 8 }, position: 'relative' }}>
          <Stack>
            <GraphicsImage
              {...{ image }}
              sx={{
                height: { xs: 400, sm: 533, md: 742 },
                backgroundPosition: 'right',
                backgroundSize: 'contain',
                mt: { xs: '-15%', sm: '-10%', md: '-14%' },
                mr: { xs: '-10%', md: '-7%' },
                position: 'relative'
              }}
            >
              <Box sx={{ width: 1, height: 1, background: withAlpha(theme.vars.palette.grey[100], 0.4) }} />
            </GraphicsImage>
            <Stack direction="row" sx={{ justifyContent: 'end', mt: 6.5, display: { xs: 'none', sm: 'flex' } }}>
              <ProfileGroup avatarList={reviewData.avatarList} review={reviewData.review} position="center" />
            </Stack>
          </Stack>
          <Box sx={{ mb: { sm: 4, md: 8 }, mt: { xs: 2, sm: 0 }, position: { sm: 'absolute' }, bottom: 0 }}>
            <Stack direction="row" sx={{ alignItems: 'center', gap: 1, mb: { xs: 2, md: 3 } }}>
              <Chip
                label={chipTitle}
                variant="outlined"
                slotProps={{ label: { sx: { py: 0.75, px: 2, my: 0.2, typography: 'caption', color: 'secondary.main' } } }}
                sx={{ borderColor: theme.vars.palette.grey[600] }}
              />
              <Divider sx={{ width: 50, borderBottomWidth: 2, borderRadius: 1 }} />
            </Stack>

            <Stack sx={{ gap: { xs: 1.5, md: 2 } }}>
              {headLine}
              <Typography variant="h6" sx={{ color: 'text.secondary', maxWidth: { sm: 350, md: 500 } }}>
                {captionLine}
              </Typography>
            </Stack>

            <Stack direction={{ sm: 'row' }} sx={{ gap: { xs: 1, sm: 1.5, md: 2.5 }, mt: { xs: 4, sm: 6, md: 8 } }}>
              <ButtonAnimationWrapper>
                <Button
                  color="primary"
                  variant="contained"
                  endIcon={<SvgIcon name="tabler-sparkles" size={16} stroke={3} color="background.default" />}
                  {...primaryBtn}
                />
              </ButtonAnimationWrapper>
              <ButtonAnimationWrapper>
                <Button color="primary" variant="outlined" {...secondaryBtn} />
              </ButtonAnimationWrapper>
            </Stack>
            <Stack direction="row" sx={{ justifyContent: 'center', mt: 4, display: { xs: 'flex', sm: 'none' } }}>
              <ProfileGroup avatarList={reviewData.avatarList} review={reviewData.review} position="center" />
            </Stack>
          </Box>
        </GraphicsCard>
      </motion.div>
    </ContainerWrapper>
  );
}

Hero10.propTypes = {
  chipTitle: PropTypes.string,
  headLine: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  captionLine: PropTypes.string,
  primaryBtn: PropTypes.any,
  secondaryBtn: PropTypes.any,
  image: PropTypes.any,
  reviewData: PropTypes.object
};
