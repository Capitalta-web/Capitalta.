import PropTypes from 'prop-types';
// @mui
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @project
import { GraphicsCard } from '@/components/cards';
import { NextLink } from '@/components/routes';
import SvgIcon from '@/components/SvgIcon';

/***************************  COOKIE - 2  ***************************/

/**
 *
 * Demos:
 * - [Cookie2](https://www.Capitalta.io/blocks/cookie/cookie2)
 *
 * API
 * - [Cookie2 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/cookie/cookie2#props-details)
 */

export default function Cookie2({ heading, primaryBtn, secondaryBtn, cookie }) {
  return (
    <GraphicsCard sx={{ width: { xs: 'calc(100% - 40px)', sm: 345, md: 600 }, position: 'fixed', bottom: 20, left: 20 }}>
      <Box sx={{ padding: { xs: 2, sm: 3, md: 5 } }}>
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <SvgIcon name="tabler-cookie" size={40} stroke={1} />
          <IconButton rel="noopener noreferrer" aria-label="cookie2-close">
            <SvgIcon name="tabler-x" />
          </IconButton>
        </Stack>
      </Box>
      <GraphicsCard sx={{ width: { xs: 1, sm: 345, md: 600 }, bgcolor: 'grey.200' }}>
        <Box sx={{ padding: { xs: 2, sm: 3, md: 5 } }}>
          <Stack sx={{ gap: { xs: 3, md: 4 } }}>
            <Stack sx={{ gap: 1 }}>
              <Typography variant="h4">{heading}</Typography>
              <Typography>
                {cookie.caption}
                {cookie.link && (
                  <>
                    &nbsp;
                    <Link component={NextLink} {...cookie.link} underline="always" />
                  </>
                )}
              </Typography>
            </Stack>
            {(primaryBtn || secondaryBtn) && (
              <Stack direction="row" sx={{ justifyContent: 'space-between', gap: 1.5 }}>
                {primaryBtn && <Button fullWidth variant="outlined" {...primaryBtn} />}
                {secondaryBtn && <Button fullWidth variant="contained" {...secondaryBtn} />}
              </Stack>
            )}
          </Stack>
        </Box>
      </GraphicsCard>
    </GraphicsCard>
  );
}

Cookie2.propTypes = { heading: PropTypes.string, primaryBtn: PropTypes.any, secondaryBtn: PropTypes.any, cookie: PropTypes.object };
