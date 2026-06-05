'use client';
import PropTypes from 'prop-types';

// @mui
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';

// @project
import ElevationScroll from './ElevationScroll';
import ContainerWrapper from '@/components/ContainerWrapper';

export const navbar7Height = { xs: 64, sm: 90, md: 108 };

// override media queries injected by theme.mixins.toolbar
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  '@media all': {
    minHeight: navbar7Height.md,
    paddingLeft: 0,
    paddingRight: 0
  },
  width: '100%',
  justifyContent: 'center',
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    '@media all': { minHeight: navbar7Height.sm },
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5)
  },
  [theme.breakpoints.down('sm')]: {
    '@media all': { minHeight: navbar7Height.xs },
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  }
}));

/***************************  NAVBAR - 7  ***************************/

/**
 *
 * Demos:
 * - [Navbar7](https://www.saasable.io/blocks/navbar/navbar7)
 *
 * API:
 * - [Navbar7 API](https://phoenixcoded.gitbook.io/saasable/ui-kit/development/components/navbar/navbar7#props-details)
 */

export default function Navbar7({ children, isFixed = true, ...props }) {
  return (
    <>
      <ElevationScroll isFixed={isFixed} {...props}>
        <AppBar {...(!isFixed && { position: 'static', elevation: 0 })} component="nav" color="inherit" sx={{ background: 'transparent' }}>
          <StyledToolbar>
            <ContainerWrapper sx={{ px: { sm: 2 } }}>
              <Box
                sx={{
                  width: 1,
                  px: { xs: 1.5, sm: 2, md: 3 },
                  py: { xs: 0.5, sm: 1.5, md: 2 },
                  bgcolor: 'grey.100',
                  borderRadius: { xs: 3, sm: 4, md: 6 }
                }}
              >
                {children}
              </Box>
            </ContainerWrapper>
          </StyledToolbar>
        </AppBar>
      </ElevationScroll>
      {isFixed && <StyledToolbar />}
    </>
  );
}

Navbar7.propTypes = { children: PropTypes.any, isFixed: PropTypes.bool, props: PropTypes.any };
