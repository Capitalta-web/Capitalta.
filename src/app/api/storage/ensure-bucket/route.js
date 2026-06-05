import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { createSupabaseServerClient } from '@/utils/supabaseClient';

export async function POST(request) {
  try {
    const body = await request.json();
    const bucket = String(body?.bucket || '').trim();
    const isPublic = Boolean(body?.public);

    if (!bucket) return NextResponse.json({ error: 'Bucket requerido' }, { status: 400 });

    if (!['avatars', 'documentos-credito'].includes(bucket)) {
      return NextResponse.json({ error: 'Bucket no permitido' }, { status: 400 });
    }

    const cookieStore = await cookies();
    const supabaseAuth = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        }
      }
    });

    const {
      data: { user }
    } = await supabaseAuth.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ error: 'SUPABASE_SERVICE_ROLE_KEY no configurada' }, { status: 500 });
    }

    const supabase = createSupabaseServerClient({ admin: true });
    if (!supabase) return NextResponse.json({ error: 'Supabase no configurado' }, { status: 500 });

    const { data: existing, error: getError } = await supabase.storage.getBucket(bucket);

    if (existing && !getError) {
      return NextResponse.json({ ok: true, bucket: existing.name });
    }

    const { data: created, error: createError } = await supabase.storage.createBucket(bucket, {
      public: bucket === 'avatars' ? true : isPublic
    });

    if (createError) return NextResponse.json({ error: createError.message }, { status: 500 });
    return NextResponse.json({ ok: true, bucket: created?.name || bucket });
  } catch (err) {
    return NextResponse.json({ error: err?.message || 'Error' }, { status: 500 });
  }
}
