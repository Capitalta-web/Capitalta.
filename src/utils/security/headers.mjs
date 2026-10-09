/**
 * Content-Security-Policy y cabeceras de seguridad de capitalta.mx.
 * Se importa desde next.config.mjs (por eso es .mjs y sin alias '@/').
 *
 * Solo se permiten los orígenes que el sitio usa de verdad:
 *  - Supabase (API REST/Auth/Storage + Realtime por WebSocket), derivado de NEXT_PUBLIC_SUPABASE_URL.
 *  - Google Analytics / Tag Manager (solo si se configura NEXT_PUBLIC_ANALYTICS_ID).
 *  - Microsoft Clarity (solo si se configura NEXT_PUBLIC_CLARITY_ID).
 *  - Vercel Speed Insights (mismo origen, /_vercel/...) y la barra de Vercel en previews.
 *  - LiveKit (solo si se configura LIVEKIT_URL o NEXT_PUBLIC_LIVEKIT_URL).
 *  - Imágenes de flagcdn (selector de país) y Unsplash (imágenes de respaldo del blog).
 * VerificaMex, x.ai y SMTP se llaman solo desde el servidor: no necesitan CSP.
 * Fuentes: next/font las sirve desde el mismo origen.
 *
 * Se quitaron restos de la plantilla: fomo.codedthemes.com, *.azurewebsites.net,
 * raw.githubusercontent.com, *.cloudfront.net, OpenStreetMap y 'unsafe-eval' (solo en desarrollo).
 * 'unsafe-inline' sigue siendo necesario: Next.js inyecta scripts inline de hidratación y
 * MUI/Emotion estilos inline. Pasar a nonces obligaría a renderizar todo dinámicamente.
 */

function originOf(url) {
  try {
    return url ? new URL(url).origin : null;
  } catch {
    return null;
  }
}

function toWebSocket(origin) {
  return origin ? origin.replace(/^http/, 'ws') : null;
}

function unique(list) {
  return [...new Set(list.filter(Boolean))];
}

export function buildCsp(env = process.env) {
  const isDev = env.NODE_ENV === 'development';
  const supabase = originOf(env.NEXT_PUBLIC_SUPABASE_URL);
  const supabaseHttp = supabase ? [supabase] : ['https://*.supabase.co'];
  const supabaseWs = supabase ? [toWebSocket(supabase)] : ['wss://*.supabase.co'];

  const ga = Boolean(env.NEXT_PUBLIC_ANALYTICS_ID);
  const clarity = Boolean(env.NEXT_PUBLIC_CLARITY_ID);
  const livekit = originOf(env.NEXT_PUBLIC_LIVEKIT_URL || env.LIVEKIT_URL);
  const livekitHttp = livekit ? livekit.replace(/^ws/, 'http') : null;
  const livekitWs = livekit ? toWebSocket(livekitHttp) : null;

  const directives = {
    'default-src': ["'self'"],
    'script-src': unique([
      "'self'",
      "'unsafe-inline'",
      isDev && "'unsafe-eval'",
      'https://va.vercel-scripts.com',
      'https://vercel.live',
      ga && 'https://www.googletagmanager.com',
      clarity && 'https://*.clarity.ms'
    ]),
    'style-src': ["'self'", "'unsafe-inline'"],
    'img-src': unique([
      "'self'",
      'data:',
      'blob:',
      ...supabaseHttp,
      'https://flagcdn.com',
      'https://images.unsplash.com',
      'https://vercel.com',
      'https://vercel.live',
      ga && 'https://www.googletagmanager.com',
      ga && 'https://*.google-analytics.com',
      clarity && 'https://*.clarity.ms',
      clarity && 'https://c.bing.com'
    ]),
    'font-src': ["'self'", 'data:', 'https://vercel.live'],
    'media-src': ["'self'", 'blob:', ...supabaseHttp],
    'connect-src': unique([
      "'self'",
      ...supabaseHttp,
      ...supabaseWs,
      'https://vitals.vercel-insights.com',
      'https://vercel.live',
      'wss://ws-us3.pusher.com',
      ga && 'https://www.googletagmanager.com',
      ga && 'https://*.google-analytics.com',
      ga && 'https://*.analytics.google.com',
      clarity && 'https://*.clarity.ms',
      livekitHttp,
      livekitWs,
      isDev && 'ws://localhost:*'
    ]),
    'frame-src': ["'self'", 'https://vercel.live'],
    'worker-src': ["'self'", 'blob:'],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'frame-ancestors': ["'none'"],
    'manifest-src': ["'self'"]
  };

  const parts = Object.entries(directives).map(([name, values]) => `${name} ${values.join(' ')}`);
  if (!isDev) parts.push('upgrade-insecure-requests');
  return parts.join('; ');
}

export function buildSecurityHeaders(env = process.env) {
  return [
    { key: 'Content-Security-Policy', value: buildCsp(env) },
    { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'X-Frame-Options', value: 'DENY' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    {
      key: 'Permissions-Policy',
      // Micrófono solo para el propio sitio (agente de voz); el resto, desactivado.
      value: 'camera=(), microphone=(self), geolocation=(), payment=(), usb=(), interest-cohort=()'
    },
    { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
    { key: 'X-DNS-Prefetch-Control', value: 'on' }
  ];
}
