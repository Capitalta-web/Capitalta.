/**
 * @jest-environment node
 */
import { buildCsp, buildSecurityHeaders } from '@/utils/security/headers.mjs';

const directive = (csp, name) => (csp.split('; ').find((d) => d.startsWith(`${name} `)) || '').split(' ').slice(1);

describe('CSP y cabeceras de seguridad', () => {
  const prod = { NODE_ENV: 'production', NEXT_PUBLIC_SUPABASE_URL: 'https://abcd.supabase.co' };

  it('en producción no permite unsafe-eval ni dominios de la plantilla', () => {
    const csp = buildCsp(prod);
    expect(directive(csp, 'script-src')).not.toContain("'unsafe-eval'");
    expect(csp).not.toMatch(/codedthemes|azurewebsites|raw\.githubusercontent|cloudfront|cloudwaysapps|openstreetmap|bing\.com|supabase\.net/);
    expect(directive(csp, 'object-src')).toEqual(["'none'"]);
    expect(directive(csp, 'frame-ancestors')).toEqual(["'none'"]);
    expect(csp).toContain('upgrade-insecure-requests');
  });

  it('permite exactamente el proyecto de Supabase (HTTP y Realtime)', () => {
    const connect = directive(buildCsp(prod), 'connect-src');
    expect(connect).toContain('https://abcd.supabase.co');
    expect(connect).toContain('wss://abcd.supabase.co');
    expect(connect).not.toContain('https://*.supabase.co');
  });

  it('analytics solo si están configurados; sin LiveKit ni micrófono', () => {
    const base = buildCsp(prod);
    expect(base).not.toMatch(/googletagmanager|clarity|livekit/);
    const full = buildCsp({ ...prod, NEXT_PUBLIC_ANALYTICS_ID: 'G-1', NEXT_PUBLIC_CLARITY_ID: 'c', LIVEKIT_URL: 'wss://capitalta.livekit.cloud' });
    expect(directive(full, 'script-src')).toEqual(expect.arrayContaining(['https://www.googletagmanager.com', 'https://*.clarity.ms']));
    expect(full).not.toMatch(/livekit/);
    const permissions = buildSecurityHeaders(prod).find((h) => h.key === 'Permissions-Policy').value;
    expect(permissions).toContain('microphone=()');
  });

  it('en desarrollo permite unsafe-eval (React refresh) y HMR', () => {
    const csp = buildCsp({ NODE_ENV: 'development' });
    expect(directive(csp, 'script-src')).toContain("'unsafe-eval'");
    expect(directive(csp, 'connect-src')).toContain('ws://localhost:*');
  });

  it('incluye las cabeceras de endurecimiento', () => {
    const keys = buildSecurityHeaders(prod).map((h) => h.key);
    expect(keys).toEqual(
      expect.arrayContaining([
        'Content-Security-Policy',
        'Strict-Transport-Security',
        'X-Content-Type-Options',
        'X-Frame-Options',
        'Referrer-Policy',
        'Permissions-Policy'
      ])
    );
  });
});
