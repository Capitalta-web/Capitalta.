'use client';
import PropTypes from 'prop-types';

import { Suspense, useEffect, useState } from 'react';

// @mui
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// @project
import Loader from './Loader';
import RTLLayout from '@/components/RTLLayout';
import { DEFAULT_THEME_MODE, Themes } from '@/config';
import useConfig from '@/hooks/useConfig';

import defaultTheme from '@/views/landings/default/theme';

const modeStorageKey = 'theme-mode';

// Theme Map
const themeMap = {
  [Themes.THEME_DEFAULT]: defaultTheme,
  [Themes.THEME_CRM]: defaultTheme,
  [Themes.THEME_AI]: defaultTheme,
  [Themes.THEME_CRYPTO]: defaultTheme,
  [Themes.THEME_HOSTING]: defaultTheme,
  [Themes.THEME_PMS]: defaultTheme,
  [Themes.THEME_HRM]: defaultTheme,
  [Themes.THEME_PLUGIN]: defaultTheme,
  [Themes.THEME_LMS]: defaultTheme
};

/***************************  COMMON - THEME PROVIDER  ***************************/

export default function ThemeProviders({ children }) {
  const { state } = useConfig();

  const [loader, setLoader] = useState(true);

  const selectedTheme = themeMap[state.currentTheme]?.('data-color-scheme') || defaultTheme();

  useEffect(() => {
    setLoader(false);
  }, []);

  /**
   * A loader is needed here to initialize the configuration from localStorage and set the default theme.
   * Without a loader,
   * the theme palette and fontFamily don't match, resulting in an error like:
   * "Warning: Prop className did not match".
   */

  return (
    <>
      <InitColorSchemeScript modeStorageKey={modeStorageKey} attribute="data-color-scheme" defaultMode={DEFAULT_THEME_MODE} />
      <Suspense fallback={<Loader />}>
        {loader ? (
          <Loader />
        ) : (
          <ThemeProvider disableTransitionOnChange theme={selectedTheme} modeStorageKey={modeStorageKey} defaultMode={DEFAULT_THEME_MODE}>
            <CssBaseline enableColorScheme />
            <RTLLayout>{children}</RTLLayout>
          </ThemeProvider>
        )}
      </Suspense>
    </>
  );
}

ThemeProviders.propTypes = { children: PropTypes.any };
