'use client';
import PropTypes from 'prop-types';

import { useEffect } from 'react';

// @mui
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

// @third-party
import rtlPlugin from 'stylis-plugin-rtl';

// @project
import { ThemeDirection } from '@/config';
import useConfig from '@/hooks/useConfig';

const rtlCache = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin]
});

const ltrCache = createCache({
  key: 'mui'
});

export default function RTLLayout({ children }) {
  const { state } = useConfig();

  useEffect(() => {
    document.dir = state.themeDirection;
  }, [state.themeDirection]);

  return <CacheProvider value={state.themeDirection === ThemeDirection.RTL ? rtlCache : ltrCache}>{children}</CacheProvider>;
}

RTLLayout.propTypes = { children: PropTypes.node };
