'use client';
import PropTypes from 'prop-types';

import { Suspense, useEffect, useState } from 'react';

// @mui
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// @project
import cryptoTheme, { colorSchemeSelector } from './theme';
import { Footer2 } from '@/blocks/footer';
import { Navbar2 } from '@/blocks/navbar';
import { NavbarContent2 } from '@/blocks/navbar/navbar-content';
import Loader from '@/components/Loader';
import RTLLayout from '@/components/RTLLayout';
import { DEFAULT_THEME_MODE, Themes } from '@/config';

// @data
import { navbar } from './data';

const modeStorageKey = 'crypto-theme-mode';

/***************************  LAYOUT - CRYPTO  ***************************/

export default function CryptoLayout({ children }) {
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
          <ThemeProvider disableTransitionOnChange theme={cryptoTheme()} modeStorageKey={modeStorageKey} defaultMode={DEFAULT_THEME_MODE}>
            <CssBaseline enableColorScheme />
            <RTLLayout>
              {/* header section */}
              <Navbar2>
                <NavbarContent2 {...{ ...navbar, selectedTheme: Themes.THEME_CRYPTO }} />
              </Navbar2>

              <main>{children}</main>

              {/* footer section */}
              <Footer2 />
            </RTLLayout>
          </ThemeProvider>
        )}
      </Suspense>
    </>
  );
}

CryptoLayout.propTypes = { children: PropTypes.any };
