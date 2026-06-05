'use client';
import PropTypes from 'prop-types';

// @next
import NextLink from 'next/link';

// @mui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @project
import { GraphicsCard } from '@/components/cards';
import SvgIcon from '@/components/SvgIcon';
import { withAlpha } from '@/utils/colorUtils';

/***************************  COOKIE - 3  ***************************/

/**
 *
 * Demos:
 * - [Cookie3](https://www.saasable.io/blocks/cookie/cookie3)
 *
 * API
 * - [Cookie3 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/cookie/cookie3#props-details)
 */

export default function TopOffer3({ heading, cookie, primaryBtn, secondaryBtn }) {
  const theme = useTheme();

  return (
    <GraphicsCard
      sx={{
        maxWidth: 1160,
        width: 'calc(100% - 20px)',
        position: 'fixed',
        bottom: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        boxShadow: `2px 2px 10px 0px ${withAlpha(theme.vars.palette.grey[600], 0.09)}`,
        bgcolor: 'primary.lighter'
      }}
    >
      <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
        <Stack
          direction={{ sm: 'row' }}
          sx={{ alignItems: { md: 'center' }, justifyContent: 'space-between', gap: { xs: 2.5, md: 7 }, width: 1 }}
        >
          <Stack direction="row" sx={{ gap: { xs: 1, md: 2 } }}>
            <Stack sx={{ justifyContent: { sm: 'center' } }}>
              <Avatar
                sx={{
                  width: { xs: 48, sm: 60, md: 72 },
                  height: { xs: 48, sm: 60, md: 72 },
                  bgcolor: 'primary.main',
                  '& svg.tabler-cookie': {
                    width: { xs: 24, sm: 32, md: 40 },
                    height: { xs: 24, sm: 32, md: 40 },
                    strokeWidth: { xs: 1.5, sm: 1 }
                  }
                }}
              >
                <SvgIcon name="tabler-cookie" color="background.default" />
              </Avatar>
            </Stack>
            <Stack sx={{ gap: { xs: 0.75, md: 1 }, maxWidth: { xs: 1, sm: 480, md: 760 } }}>
              <Typography variant="h4" sx={{ color: 'primary.darker' }}>
                {heading}
              </Typography>
              <Typography sx={{ color: 'secondary.dark' }}>
                {cookie.caption}
                {cookie.link && (
                  <>
                    &nbsp;
                    <Link component={NextLink} {...cookie.link} underline="always" />
                  </>
                )}
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row" sx={{ alignItems: 'center', gap: { xs: 1, md: 1.5 }, width: { xs: 1, sm: 182, md: 298 } }}>
            {primaryBtn && <Button fullWidth variant="outlined" size="small" {...primaryBtn} />}
            {secondaryBtn && <Button fullWidth variant="contained" size="small" sx={{ whiteSpace: 'nowrap' }} {...secondaryBtn} />}
          </Stack>
        </Stack>
      </Box>
    </GraphicsCard>
  );
}

TopOffer3.propTypes = { heading: PropTypes.string, cookie: PropTypes.object, primaryBtn: PropTypes.any, secondaryBtn: PropTypes.any };
