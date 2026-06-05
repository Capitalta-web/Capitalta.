import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/utils/supabaseClient';

export async function GET(request) {
  // Intentamos usar el cliente de servidor para mayor seguridad/acceso,
  // pero para lectura pública de blog, el cliente anónimo (browser) también serviría si las políticas RLS están bien.
  // Sin embargo, en API Routes de Next.js es mejor usar createServerClient (o la versión que tengas configurada para server).
  // Aquí usaremos createSupabaseServerClient si tienes acceso a cookies/headers, o createSupabaseBrowserClient como fallback
  // dado que es una lectura pública.

  // Nota: createSupabaseServerClient suele requerir cookies() de next/headers.
  // Si tu utilidad 'createSupabaseServerClient' usa process.env.SUPABASE_SERVICE_ROLE_KEY directamente sin cookies,
  // entonces es un cliente admin.
  // Revisando tu memoria, createSupabaseServerClient usa SUPABASE_SERVICE_ROLE_KEY, por lo que tiene acceso total.
  // Esto está bien para una API, pero filtramos manualmente 'is_published' para seguridad extra.

  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return NextResponse.json({ error: 'Supabase no está configurado' }, { status: 500 });
  }

  // Obtener parámetros de búsqueda de la URL
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const limit = parseInt(searchParams.get('limit') || '10');
  const page = parseInt(searchParams.get('page') || '1');

  // Calcular rango para paginación
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from('articulos_blog')
    .select('id, slug, title, excerpt, image_url, category, published_at, author_id, tags', { count: 'exact' })
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .range(from, to);

  if (category) {
    query = query.eq('category', category);
  }

  const { data, error, count } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    data,
    meta: {
      total: count,
      page,
      limit,
      totalPages: Math.ceil(count / limit)
    }
  });
}
