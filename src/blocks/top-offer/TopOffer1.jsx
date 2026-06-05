'use client';
import PropTypes from 'prop-types';

import { useState } from 'react';

// @mui
import { useTheme } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

// @project
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import SvgIcon from '@/components/SvgIcon';
import Typeset from '@/components/Typeset';
import { withAlpha } from '@/utils/colorUtils';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  TOP OFFER - 1  ***************************/

/**
 *
 * Demos:
 * - [TopOffer1](https://www.Capitalta.io/blocks/top-offer/top-offer1)
 *
 * API
 * - [TopOffer1 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/topoffer/topoffer1#props-details)
 */

export default function TopOffer1({ heading, caption, primaryBtn, secondaryBtn, icon, handleClick }) {
  const theme = useTheme();

  const [open, setOpen] = useState(true);
  const size = { xs: 40, sm: 60 };

  return (
    <Box sx={{ py: SECTION_COMMON_PY }}>
      <GraphicsCard sx={{ boxShadow: `2px 2px 10px 0px ${withAlpha(theme.vars.palette.grey[900], 0.09)}`, mx: 2 }}>
        <ContainerWrapper>
          <Collapse in={open}>
            <Box sx={{ py: { xs: 2, sm: 3 } }}>
              <Alert
                icon={
                  <Avatar sx={{ bgcolor: 'grey.300', width: size, height: size }}>
                    <SvgIcon {...(typeof icon === 'string' ? { name: icon } : { ...icon })} />
                  </Avatar>
                }
                sx={{
                  p: 0,
                  color: 'text.primary',
                  bgcolor: 'transparent',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: { xs: 'flex-start', md: 'center' },
                  width: 1
                }}
                slotProps={{
                  icon: { sx: { py: 0.25 } },
                  action: { sx: { pt: 0, ml: -0.5 } },
                  message: { sx: { py: 0, width: 1, mb: { sm: -2, md: 0 } } }
                }}
                action={
                  <IconButton
                    rel="noopener noreferrer"
                    aria-label="close"
                    size="small"
                    onClick={() => (handleClick ? handleClick : setOpen(false))}
                    sx={{ width: 28, height: 28, p: { xs: 1, sm: 2 }, borderRadius: '50%' }}
                  >
                    <SvgIcon name="tabler-x" />
                  </IconButton>
                }
              >
                <Stack
                  direction={{ xs: 'column', md: 'row' }}
                  sx={{ alignItems: { xs: 'flex-start', md: 'center' }, justifyContent: 'space-between', gap: 2.5, width: 1 }}
                >
                  <Typeset
                    {...{
                      heading,
                      caption,
                      stackProps: { sx: { gap: 1 } },
                      headingProps: { variant: 'h4' },
                      captionProps: { variant: 'body1' }
                    }}
                  />
                  {(primaryBtn || secondaryBtn) && (
                    <Stack
                      direction="row"
                      sx={{ alignItems: 'center', gap: 1.5, mb: { sm: 2, md: 0 }, display: { xs: 'none', sm: 'flex' } }}
                    >
                      {primaryBtn && <Button variant="outlined" size="small" {...primaryBtn} />}
                      {secondaryBtn && <Button variant="contained" size="small" sx={{ whiteSpace: 'nowrap', mr: 0.5 }} {...secondaryBtn} />}
                    </Stack>
                  )}
                </Stack>
              </Alert>
            </Box>
            {(primaryBtn || secondaryBtn) && (
              <Stack direction="row" sx={{ alignItems: 'center', gap: 1.5, mb: 2, display: { xs: 'flex', sm: 'none' } }}>
                {primaryBtn && <Button fullWidth variant="outlined" size="small" {...primaryBtn} />}
                {secondaryBtn && <Button fullWidth variant="contained" size="small" sx={{ whiteSpace: 'nowrap' }} {...secondaryBtn} />}
              </Stack>
            )}
          </Collapse>
        </ContainerWrapper>
      </GraphicsCard>
    </Box>
  );
}

TopOffer1.propTypes = {
  heading: PropTypes.any,
  caption: PropTypes.any,
  primaryBtn: PropTypes.any,
  secondaryBtn: PropTypes.any,
  icon: PropTypes.any,
  handleClick: PropTypes.any
};
