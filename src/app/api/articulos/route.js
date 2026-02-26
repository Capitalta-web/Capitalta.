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

  // MOCK DATA para el blog (mientras Supabase responde)
  const mockArticles = [
    {
      id: '1',
      slug: 'guia-credito-pyme-mexico',
      title: 'Guía Definitiva: Cómo elegir el mejor crédito para tu PYME en México',
      excerpt: 'Descubre los factores clave para seleccionar el financiamiento que impulsará el crecimiento de tu negocio.',
      image_url: 'https://images.unsplash.com/photo-1454165833767-027ffea70288?auto=format&fit=crop&q=80',
      category: 'estrategia_financiera',
      published_at: new Date().toISOString()
    },
    {
      id: '2',
      slug: 'beneficios-credito-revolvente-capitalta',
      title: '5 Ventajas del Crédito Revolvente para el flujo de caja',
      excerpt: 'Aprende cómo una línea de crédito revolvente puede ser la herramienta estratégica que tu empresa necesita.',
      image_url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80',
      category: 'productos',
      published_at: new Date().toISOString()
    },
    {
      id: '3',
      slug: 'expansion-empresarial-financiamiento',
      title: 'Estrategias de expansión: Cuándo buscar crédito empresarial',
      excerpt: 'Identifica las señales que indican que tu negocio está listo para el siguiente nivel.',
      image_url: 'https://images.unsplash.com/photo-1526304640581-d334cdbef1f9?auto=format&fit=crop&q=80',
      category: 'crecimiento',
      published_at: new Date().toISOString()
    }
  ];

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
    .neq('slug', 'inversion-inmobiliaria-venta-key')
    .order('published_at', { ascending: false })
    .range(from, to);

  if (category) {
    query = query.eq('category', category);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error('Supabase error, returning mock data:', error.message);
    return NextResponse.json({
      data: mockArticles,
      meta: {
        total: mockArticles.length,
        page: 1,
        limit: 10,
        totalPages: 1
      }
    });
  }

  // Si no hay datos (base vacía), también mandamos los mocks
  const finalData = data && data.length > 0 ? data : mockArticles;

  return NextResponse.json({
    data: finalData,
    meta: {
      total: count || finalData.length,
      page,
      limit,
      totalPages: Math.ceil((count || finalData.length) / limit)
    }
  });
}
