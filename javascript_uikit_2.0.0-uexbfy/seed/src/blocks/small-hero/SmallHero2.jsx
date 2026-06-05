import PropTypes from 'prop-types';
// @mui
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @project
import ContainerWrapper from '@/components/ContainerWrapper';
import { NextLink } from '@/components/routes';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  SMALL HERO - 2  ***************************/

/**
 *
 * Demos:
 * - [SmallHero2](https://www.saasable.io/blocks/small-hero/small-hero2)
 *
 * API
 * - [SmallHero2 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/smallhero/smallhero2#props-details)
 */

export default function SmallHero2({ chip, headLine, captionLine }) {
  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ alignItems: 'center', gap: { xs: 1.5, md: 3 } }}>
        {chip && (
          <Chip
            label={
              typeof chip.label === 'string' ? (
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {chip.label}
                  {chip.link && (
                    <Link
                      component={NextLink}
                      variant="caption"
                      color="primary.main"
                      {...chip.link}
                      underline="hover"
                      sx={{ '&:hover': { color: 'primary.dark' } }}
                    />
                  )}
                </Typography>
              ) : (
                chip.label
              )
            }
            sx={{ bgcolor: 'grey.100' }}
          />
        )}
        {headLine}
        {captionLine && (
          <Typography variant="h6" align="center" sx={{ color: 'text.secondary', width: { xs: 320, sm: 350, md: 500 } }}>
            {captionLine}
          </Typography>
        )}
      </Stack>
    </ContainerWrapper>
  );
}

SmallHero2.propTypes = { chip: PropTypes.any, headLine: PropTypes.any, captionLine: PropTypes.any };
