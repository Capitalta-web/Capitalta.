'use client';
import PropTypes from 'prop-types';

import { Suspense, useEffect, useState } from 'react';

// @mui
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// @project
import hostingTheme, { colorSchemeSelector } from './theme';
import { Footer5 } from '@/blocks/footer';
import { Navbar3 } from '@/blocks/navbar';
import { NavbarContent3 } from '@/blocks/navbar/navbar-content';
import Loader from '@/components/Loader';
import RTLLayout from '@/components/RTLLayout';
import { ThemeMode, Themes } from '@/config';

// @data
import { navbar } from './data';

const modeStorageKey = 'hosting-theme-mode';

/***************************  LAYOUT - HOSTING  ***************************/

export default function HostingLayout({ children }) {
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
          <ThemeProvider disableTransitionOnChange theme={hostingTheme()} modeStorageKey={modeStorageKey} defaultMode={ThemeMode.DARK}>
            <CssBaseline enableColorScheme />
            <RTLLayout>
              {/* header section */}
              <Navbar3>
                <NavbarContent3 {...{ ...navbar, selectedTheme: Themes.THEME_HOSTING }} />
              </Navbar3>

              <main>{children}</main>

              {/* footer section */}
              <Footer5 />
            </RTLLayout>
          </ThemeProvider>
        )}
      </Suspense>
    </>
  );
}

HostingLayout.propTypes = { children: PropTypes.any };
