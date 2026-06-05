'use client';
import PropTypes from 'prop-types';

import { Suspense, useEffect, useState } from 'react';

// @mui
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// @project
import pmsTheme, { colorSchemeSelector } from './theme';
import { Footer7 } from '@/blocks/footer';
import { Navbar9 } from '@/blocks/navbar';
import { NavbarContent9 } from '@/blocks/navbar/navbar-content';
import Loader from '@/components/Loader';
import RTLLayout from '@/components/RTLLayout';
import { ThemeMode, Themes } from '@/config';

// @data
import { navbar } from './data';

const modeStorageKey = 'pms-theme-mode';

/***************************  LAYOUT - PMS  ***************************/

export default function PMSLayout({ children }) {
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setLoader(false);
  }, []);

  return (
    <>
      <InitColorSchemeScript modeStorageKey={modeStorageKey} attribute={colorSchemeSelector} defaultMode={ThemeMode.DARK} />
      <Suspense fallback={<Loader />}>
        {loader ? (
          <Loader />
        ) : (
          <ThemeProvider disableTransitionOnChange theme={pmsTheme()} modeStorageKey={modeStorageKey} defaultMode={ThemeMode.DARK}>
            <CssBaseline enableColorScheme />
            <RTLLayout>
              {/* header section */}
              <Navbar9>
                <NavbarContent9 {...{ ...navbar, selectedTheme: Themes.THEME_PMS }} />
              </Navbar9>

              <main>{children}</main>

              {/* footer section */}
              <Footer7 />
            </RTLLayout>
          </ThemeProvider>
        )}
      </Suspense>
    </>
  );
}

PMSLayout.propTypes = { children: PropTypes.any };
