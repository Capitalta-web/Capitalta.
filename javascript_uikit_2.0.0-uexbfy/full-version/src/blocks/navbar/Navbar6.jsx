'use client';
import PropTypes from 'prop-types';

// @mui
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

// @project
import ElevationScroll from './ElevationScroll';
import ContainerWrapper from '@/components/ContainerWrapper';

export const navbar6Height = { xs: 64, sm: 72, md: 92 };

// override media queries injected by theme.mixins.toolbar
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  '@media all': {
    minHeight: navbar6Height.md,
    paddingLeft: 0,
    paddingRight: 0
  },
  width: '100%',
  justifyContent: 'center',
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  [theme.breakpoints.down('md')]: {
    '@media all': { minHeight: navbar6Height.sm },
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  [theme.breakpoints.down('sm')]: {
    '@media all': { minHeight: navbar6Height.xs },
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5)
  }
}));

/***************************  NAVBAR - 6  ***************************/

/**
 *
 * Demos:
 * - [Navbar6](https://www.Capitalta.io/blocks/navbar/navbar6)
 *
 * API:
 * - [Navbar6 API](https://capitalta.gitbook.io/Capitalta/ui-kit/development/components/navbar/navbar6#props-details)
 */

export default function Navbar6({ children, isFixed = true, ...props }) {
  return (
    <>
      <ElevationScroll isFixed={isFixed} {...props}>
        <AppBar {...(!isFixed && { position: 'static', elevation: 0 })} component="nav" color="inherit" sx={{ background: 'transparent' }}>
          <StyledToolbar>
            <ContainerWrapper sx={{ px: { sm: 2 } }}>{children}</ContainerWrapper>
          </StyledToolbar>
        </AppBar>
      </ElevationScroll>
      {isFixed && <StyledToolbar />}
    </>
  );
}

Navbar6.propTypes = { children: PropTypes.any, isFixed: PropTypes.bool, props: PropTypes.any };
