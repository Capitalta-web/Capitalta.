'use client';
import PropTypes from 'prop-types';

import { useState } from 'react';

// @next
import NextLink from 'next/link';

// @mui
import { useTheme } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @project
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import SvgIcon from '@/components/SvgIcon';

import { generateFocusVisibleStyles } from '@/utils/CommonFocusStyle';
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  TOP OFFER - 3  ***************************/

/**
 *
 * Demos:
 * - [TopOffer3](https://www.saasable.io/blocks/top-offer/top-offer3)
 *
 * API
 * - [TopOffer3 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/topoffer/topoffer3#props-details)
 */

export default function TopOffer3({ offer, handleClick }) {
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  return (
    <Box sx={{ py: SECTION_COMMON_PY }}>
      <GraphicsCard sx={{ bgcolor: 'primary.main', mx: 2 }}>
        <ContainerWrapper>
          <Collapse in={open}>
            <Box sx={{ py: { xs: 1.5, sm: 2.5 }, pl: { xs: 2, sm: 0 } }}>
              <Alert
                icon={false}
                sx={{
                  p: 0,
                  color: 'background.default',
                  bgcolor: 'transparent',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                slotProps={{ action: { sx: { pt: 0 } }, message: { sx: { py: 0, width: 1 } } }}
                action={
                  <IconButton
                    rel="noopener noreferrer"
                    aria-label="close"
                    size="small"
                    onClick={() => (handleClick ? handleClick : setOpen(false))}
                    sx={{
                      width: { xs: 40, sm: 24 },
                      height: { xs: 40, sm: 24 },
                      p: { xs: 1, sm: 2 },
                      borderRadius: '50%',
                      '&:focus-visible': generateFocusVisibleStyles(theme.vars.palette.background.default),
                      '&:hover': { bgcolor: 'primary.dark' }
                    }}
                  >
                    <SvgIcon name="tabler-x" color="background.default" />
                  </IconButton>
                }
              >
                <AlertTitle sx={{ textAlign: 'center', my: 0 }}>
                  <Typography variant="h6" sx={{ py: 0.5 }}>
                    {offer.label}
                    {offer.link && (
                      <>
                        &nbsp;
                        <Link
                          component={NextLink}
                          color="inherit"
                          {...offer.link}
                          underline="always"
                          sx={{
                            '&:focus-visible': generateFocusVisibleStyles(theme.vars.palette.background.default),
                            '&:hover': { color: 'primary.light' }
                          }}
                        />
                      </>
                    )}
                  </Typography>
                </AlertTitle>
              </Alert>
            </Box>
          </Collapse>
        </ContainerWrapper>
      </GraphicsCard>
    </Box>
  );
}

TopOffer3.propTypes = { offer: PropTypes.any, handleClick: PropTypes.any };
