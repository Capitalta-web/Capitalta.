'use client';
import PropTypes from 'prop-types';

import { Suspense, useEffect, useState } from 'react';

// @mui
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// @project
import lmsTheme, { colorSchemeSelector } from './theme';
import { Footer1 } from '@/blocks/footer';
import { Navbar1 } from '@/blocks/navbar';
import { NavbarContent1 } from '@/blocks/navbar/navbar-content';
import Loader from '@/components/Loader';
import RTLLayout from '@/components/RTLLayout';
import { DEFAULT_THEME_MODE, Themes } from '@/config';

// @data
import { navbar } from './data';

const modeStorageKey = 'lms-theme-mode';

/***************************  LAYOUT - LMS  ***************************/

export default function LMSLayout({ children }) {
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
          <ThemeProvider disableTransitionOnChange theme={lmsTheme()} modeStorageKey={modeStorageKey} defaultMode={DEFAULT_THEME_MODE}>
            <CssBaseline enableColorScheme />
            <RTLLayout>
              {/* header section */}
              <Navbar1>
                <NavbarContent1 {...{ ...navbar, selectedTheme: Themes.THEME_LMS }} />
              </Navbar1>

              <main>{children}</main>

              {/* footer section */}
              <Footer1 />
            </RTLLayout>
          </ThemeProvider>
        )}
      </Suspense>
    </>
  );
}

LMSLayout.propTypes = { children: PropTypes.any };
