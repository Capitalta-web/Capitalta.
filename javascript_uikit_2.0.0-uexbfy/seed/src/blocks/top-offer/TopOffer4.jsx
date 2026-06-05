'use client';
import PropTypes from 'prop-types';

import { useState } from 'react';

// @next
import NextLink from 'next/link';

// @mui
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
import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  TOP OFFER - 4  ***************************/

/**
 *
 * Demos:
 * - [TopOffer4](https://www.saasable.io/blocks/top-offer/top-offer4)
 *
 * API
 * - [TopOffer4 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/topoffer/topoffer4#props-details)
 */

export default function TopOffer4({ offer, handleClick }) {
  const [open, setOpen] = useState(true);

  return (
    <Box sx={{ py: SECTION_COMMON_PY }}>
      <GraphicsCard sx={{ bgcolor: 'primary.lighter', mx: 2 }}>
        <ContainerWrapper>
          <Collapse in={open}>
            <Box sx={{ py: { xs: 1.5, sm: 2.5 }, pl: { xs: 2, sm: 0 } }}>
              <Alert
                icon={false}
                sx={{
                  p: 0,
                  color: 'primary.darker',
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
                    sx={{ width: { xs: 40, sm: 24 }, height: { xs: 40, sm: 24 }, p: { xs: 1, sm: 2 }, borderRadius: '50%' }}
                  >
                    <SvgIcon name="tabler-x" color="primary.darker" />
                  </IconButton>
                }
              >
                <AlertTitle sx={{ textAlign: 'center', my: 0 }}>
                  <Typography variant="h6" sx={{ py: 0.5 }}>
                    {offer.label}
                    {offer.link && (
                      <Typography component="span" variant="h6" sx={{ color: 'secondary.dark' }}>
                        &nbsp;
                        {offer.secondaryLabel}
                        &nbsp;
                        <Link
                          component={NextLink}
                          color="inherit"
                          {...offer.link}
                          underline="always"
                          sx={{ '&:hover': { color: 'primary.main' } }}
                        />
                      </Typography>
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

TopOffer4.propTypes = { offer: PropTypes.any, handleClick: PropTypes.any };
