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
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

// @project
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import SvgIcon from '@/components/SvgIcon';
import Typeset from '@/components/Typeset';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  TOP OFFER - 5  ***************************/

/**
 *
 * Demos:
 * - [TopOffer5](https://www.saasable.io/blocks/top-offer/top-offer5)
 *
 * API
 * - [TopOffer5 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/topoffer/topoffer5#props-details)
 */

export default function TopOffer5({ heading, caption, bgImage, primaryBtn, icon, handleClick }) {
  const theme = useTheme();

  const [open, setOpen] = useState(true);
  const size = { xs: 40, sm: 60 };

  const joinUS = (
    <OutlinedInput
      placeholder="example@gmail.com"
      endAdornment={<Button color="primary" size="small" variant="contained" sx={{ px: 4 }} {...primaryBtn} />}
      slotProps={{
        input: { 'aria-label': 'Email address', sx: { px: 2.5, py: 0.75 } },
        notchedOutline: { sx: { borderRadius: 25, borderColor: theme.vars.palette.grey[700] } }
      }}
      sx={{
        typography: 'caption2',
        color: 'secondary.main',
        maxWidth: { xs: 1, sm: 280 },
        width: 1,
        p: 0.5,
        my: { xs: 2, sm: 0 },
        whiteSpace: 'nowrap'
      }}
    />
  );

  return (
    <Box sx={{ py: SECTION_COMMON_PY }}>
      <GraphicsCard bgImage={bgImage} overLay sx={{ borderRadius: 'none', mx: 2 }}>
        <ContainerWrapper>
          <Collapse in={open}>
            <Box sx={{ py: { xs: 2, sm: 3, md: 5 } }}>
              <Alert
                icon={
                  <Avatar sx={{ bgcolor: 'primary.main', width: size, height: size }}>
                    <SvgIcon color={theme.vars.palette.primary.lighter} {...(typeof icon === 'string' ? { name: icon } : { ...icon })} />
                  </Avatar>
                }
                sx={{
                  p: 0,
                  color: 'text.primary',
                  bgcolor: 'transparent',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: { xs: 'flex-start', sm: 'center' },
                  width: 1
                }}
                slotProps={{ icon: { sx: { py: 0.25 } }, action: { sx: { pt: 0 } }, message: { sx: { py: 0, width: 1 } } }}
                action={
                  <IconButton
                    rel="noopener noreferrer"
                    aria-label="close"
                    size="small"
                    onClick={() => (handleClick ? handleClick : setOpen(false))}
                    sx={{ width: 24, height: 24, p: { xs: 1, sm: 2 }, borderRadius: '50%' }}
                  >
                    <SvgIcon name="tabler-x" />
                  </IconButton>
                }
              >
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  sx={{ alignItems: { xs: 'flex-start', sm: 'center' }, justifyContent: 'space-between', gap: 2.5, width: 1 }}
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
                  <Box sx={{ display: { xs: 'none', sm: 'contents' } }}>{joinUS}</Box>
                </Stack>
              </Alert>
            </Box>
            <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>{joinUS}</Box>
          </Collapse>
        </ContainerWrapper>
      </GraphicsCard>
    </Box>
  );
}

TopOffer5.propTypes = {
  heading: PropTypes.any,
  caption: PropTypes.any,
  bgImage: PropTypes.any,
  primaryBtn: PropTypes.any,
  icon: PropTypes.any,
  handleClick: PropTypes.any
};
