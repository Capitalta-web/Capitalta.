import { buildSecurityHeaders } from './src/utils/security/headers.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
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
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: buildSecurityHeaders()
      }
    ];
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
  // Se quitó el rewrite /tailwind/* hacia un servidor externo de la plantilla (cloudwaysapps.com).
};

export default nextConfig;
