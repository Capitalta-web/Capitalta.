import { buildSecurityHeaders } from './src/utils/security/headers.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  modularizeImports: {
    '@mui/material': {
      transform: '@mui/material/{{member}}'
    },
    '@mui/lab': {
      transform: '@mui/lab/{{member}}'
    }
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        pathname: '**'
      }
    ]
  },
  async headers() {
    // CSP y cabeceras de seguridad: ver src/utils/security/headers.mjs
    return [{ source: '/(.*)', headers: buildSecurityHeaders() }];
  },
  async redirects() {
    return [
      {
        source: '/calculadoras',
        destination: '/productos',
        permanent: true
      }
    ];
  }
  // Se quitó el rewrite /tailwind/* hacia cloudwaysapps.com (resto de la plantilla).
};

export default nextConfig;
