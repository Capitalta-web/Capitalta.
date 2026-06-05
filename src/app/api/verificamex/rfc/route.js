import { NextResponse } from 'next/server';
import { validateRfc } from '@/utils/validators/rfc';

export async function POST(request) {
  const payload = await request.json().catch(() => ({}));
  const rfc = payload?.rfc;

  const local = validateRfc(rfc);
  if (!local.isValid) {
    return NextResponse.json(
      { isValid: false, isRegistered: null, rfc: local.normalized || null, type: local.type, validationErrors: local.errors },
      { status: 200 }
    );
  }

  const rapidKey = process.env.VERIFICAMEX_RAPIDAPI_KEY;
  const rapidHost = process.env.VERIFICAMEX_RAPIDAPI_HOST || 'verifier.p.rapidapi.com';
  const rapidBase = process.env.VERIFICAMEX_RAPIDAPI_BASE_URL || 'https://verifier.p.rapidapi.com';

  const apiKey = process.env.VERIFICAMEX_API_KEY;
  const apiBase = process.env.VERIFICAMEX_API_BASE_URL || 'https://api.verificamex.com/identity/v1';

  if (!rapidKey && !apiKey) {
    return NextResponse.json(
      { isValid: true, isRegistered: null, rfc: local.normalized, type: local.type, provider: null, warning: 'verificamex_not_configured' },
      { status: 200 }
    );
  }

  try {
    if (rapidKey) {
      const res = await fetch(`${rapidBase}/rfc/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': rapidKey,
          'X-RapidAPI-Host': rapidHost
        },
        body: JSON.stringify({ rfc: local.normalized })
      });

      const data = await res.json().catch(() => ({}));
      return NextResponse.json({ ...data, provider: 'rapidapi' }, { status: 200 });
    }

    const base = String(apiBase).replace(/\/$/, '');
    const res = await fetch(`${base}/miscellaneous/sat/rfc`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({ rfc: local.normalized })
    });

    const data = await res.json().catch(() => ({}));
    const status = data?.data?.status;
    return NextResponse.json(
      {
        isValid: true,
        isRegistered: typeof status === 'boolean' ? status : null,
        rfc: local.normalized,
        type: local.type,
        provider: 'verificamex',
        message: data?.data?.message || null
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ isValid: true, isRegistered: null, rfc: local.normalized, type: local.type, error: 'upstream_failed' }, { status: 200 });
  }
}
