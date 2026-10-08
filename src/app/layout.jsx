import PropTypes from 'prop-types';

// @style
import './globals.css';

// @mui
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';

// @project
import Metrics from './metrics';
import ProviderWrapper from './ProviderWrapper';
import ThemeProviders from '@/components/ThemeProvider';
import { mainMetadata } from '@/metadata';
import { DEFAULT_THEME_MODE } from '@/config';

/***************************  METADATA - MAIN  ***************************/

// export const viewport: Viewport = {
//   userScalable: false
// };

export const metadata = { ...mainMetadata };

/***************************  LAYOUT - MAIN  ***************************/

// Root layout component that wraps the entire application
export default function RootLayout({ children }) {
  const organizationLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Capitalta',
    url: 'https://capitalta.mx',
    logo: 'https://capitalta.mx/assets/images/capitalta/logo.png',
    email: 'contacto@capitalta.mx'
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Initialize Color Scheme Script - Must be in head */}
        <InitColorSchemeScript modeStorageKey="theme-mode" attribute="data-color-scheme" defaultMode={DEFAULT_THEME_MODE} />
        {/* Preconnect and DNS Prefetch */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }} />
      </head>
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ProviderWrapper>
            <ThemeProviders>{children}</ThemeProviders>
          </ProviderWrapper>
        </AppRouterCacheProvider>
        <Metrics />
      </body>
    </html>
  );
}

RootLayout.propTypes = { children: PropTypes.any };
