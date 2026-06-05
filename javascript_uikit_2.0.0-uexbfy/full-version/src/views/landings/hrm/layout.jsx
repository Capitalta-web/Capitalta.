'use client';
import PropTypes from 'prop-types';

import { Suspense, useEffect, useState } from 'react';

// @mui
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// @project
import hrmTheme, { colorSchemeSelector } from './theme';
import { Footer3 } from '@/blocks/footer';
import { Navbar10 } from '@/blocks/navbar';
import { NavbarContent10 } from '@/blocks/navbar/navbar-content';
import Loader from '@/components/Loader';
import RTLLayout from '@/components/RTLLayout';
import { DEFAULT_THEME_MODE, Themes } from '@/config';

// @data
import { navbar } from './data';

const modeStorageKey = 'hrm-theme-mode';

/***************************  LAYOUT - HRM  ***************************/

export default function HRMLayout({ children }) {
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setLoader(false);
  }, []);

  return (
    <>
      <InitColorSchemeScript modeStorageKey={modeStorageKey} attribute={colorSchemeSelector} defaultMode={DEFAULT_THEME_MODE} />
      <Suspense fallback={<Loader />}>
        {loader ? (
          <Loader />
        ) : (
          <ThemeProvider disableTransitionOnChange theme={hrmTheme()} modeStorageKey={modeStorageKey} defaultMode={DEFAULT_THEME_MODE}>
            <CssBaseline enableColorScheme />
            <RTLLayout>
              {/* header section */}
              <Navbar10 triggerSX={{ bgcolor: 'grey.100' }}>
                <NavbarContent10 {...{ ...navbar, selectedTheme: Themes.THEME_HRM }} />
              </Navbar10>

              <main>{children}</main>

              {/* footer section */}
              <Footer3 />
            </RTLLayout>
          </ThemeProvider>
        )}
      </Suspense>
    </>
  );
}

HRMLayout.propTypes = { children: PropTypes.any };
