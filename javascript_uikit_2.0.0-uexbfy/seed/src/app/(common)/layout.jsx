'use client';
import PropTypes from 'prop-types';

// @types
import ThemeProviders from '@/components/ThemeProvider';

/***************************  LAYOUT - COMMON  ***************************/

export default function CommonLayout({ children }) {
  return <ThemeProviders>{children}</ThemeProviders>;
}

CommonLayout.propTypes = { children: PropTypes.any };
