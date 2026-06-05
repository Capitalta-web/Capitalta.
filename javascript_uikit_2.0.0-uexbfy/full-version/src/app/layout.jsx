import PropTypes from 'prop-types';

// @style
import './globals.css';

// @mui
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

// @project
import Metrics from './metrics';
import ProviderWrapper from './ProviderWrapper';
import ThemeProviders from '@/components/ThemeProvider';
import ChatWidget from '@/components/ChatWidget';
import { mainMetadata } from '@/metadata';

/***************************  METADATA - MAIN  ***************************/

// export const viewport: Viewport = {
//   userScalable: false
// };

export const metadata = { ...mainMetadata };

/***************************  LAYOUT - MAIN  ***************************/

// Root layout component that wraps the entire application
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect and DNS Prefetch */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ProviderWrapper>
            <ThemeProviders>
              {children}
              <ChatWidget />
            </ThemeProviders>
          </ProviderWrapper>
        </AppRouterCacheProvider>
        <Metrics />
      </body>
    </html>
  );
}

RootLayout.propTypes = { children: PropTypes.any };
