'use client';
import PropTypes from 'prop-types';

// @next
import NextLink from 'next/link';

// @mui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @project
import { GraphicsCard } from '@/components/cards';
import SvgIcon from '@/components/SvgIcon';

import { generateFocusVisibleStyles } from '@/utils/CommonFocusStyle';

/***************************  COOKIE - 1  ***************************/

/**
 *
 * Demos:
 * - [Cookie1](https://www.Capitalta.io/blocks/cookie/cookie1)
 *
 * API
 * - [Cookie1 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/cookie/cookie1#props-details)
 */

export default function Cookie1({ heading, primaryBtn, secondaryBtn, cookie }) {
  const theme = useTheme();
  const size = { xs: 48, md: 60 };

  return (
    <GraphicsCard
      sx={{ width: { xs: 'calc(100% - 40px)', sm: 326, md: 460, position: 'fixed', bottom: 20, right: 20 }, bgcolor: 'primary.main' }}
    >
      <Box sx={{ padding: { xs: 1.5, sm: 2, md: 4 } }}>
        <Stack sx={{ gap: { xs: 2, sm: 3, md: 4 } }}>
          <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
            <Avatar sx={{ width: size, height: size, bgcolor: 'primary.lighter' }}>
              <SvgIcon name="tabler-cookie" color="primary.darker" />
            </Avatar>
            <IconButton
              size="small"
              rel="noopener noreferrer"
              aria-label="cookie-close"
              sx={{
                width: 32,
                height: 32,
                '&:hover': { bgcolor: 'primary.dark' },
                ':focus-visible': generateFocusVisibleStyles(theme.vars.palette.background.default)
              }}
            >
              <SvgIcon name="tabler-x" color="primary.lighter" />
            </IconButton>
          </Stack>
          <Stack sx={{ gap: { xs: 1.5, sm: 2, md: 3 } }}>
            <Stack sx={{ gap: { xs: 0.5, md: 1 } }}>
              <Typography variant="h4" sx={{ color: 'background.default' }}>
                {heading}
              </Typography>
              <Typography sx={{ color: 'primary.lighter' }}>
                {cookie.caption}
                {cookie.link && (
                  <>
                    &nbsp;
                    <Link
                      component={NextLink}
                      color="background.default"
                      {...cookie.link}
                      underline="always"
                      sx={{ ':focus-visible': generateFocusVisibleStyles(theme.vars.palette.background.default) }}
                    />
                  </>
                )}
              </Typography>
            </Stack>

            {(primaryBtn || secondaryBtn) && (
              <Stack direction="row" sx={{ justifyContent: 'space-between', gap: 1.5 }}>
                {primaryBtn && (
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ border: 0.25, ':focus-visible': generateFocusVisibleStyles(theme.vars.palette.background.default) }}
                    {...primaryBtn}
                  />
                )}
                {secondaryBtn && (
                  <Button
                    fullWidth
                    sx={{
                      bgcolor: 'background.default',
                      color: 'primary.main',
                      '&:hover': { bgcolor: 'primary.lighter' },
                      ':focus-visible': generateFocusVisibleStyles(theme.vars.palette.background.default)
                    }}
                    {...secondaryBtn}
                  />
                )}
              </Stack>
            )}
          </Stack>
        </Stack>
      </Box>
    </GraphicsCard>
  );
}

Cookie1.propTypes = { heading: PropTypes.string, primaryBtn: PropTypes.any, secondaryBtn: PropTypes.any, cookie: PropTypes.object };
