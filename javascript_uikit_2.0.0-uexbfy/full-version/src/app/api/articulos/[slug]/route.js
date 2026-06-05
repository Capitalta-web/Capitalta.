import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/utils/supabaseClient';

export async function GET(request, { params }) {
  const { slug } = await params;

  if (!slug) {
    return NextResponse.json({ error: 'Slug es requerido' }, { status: 400 });
  }

  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return NextResponse.json({ error: 'Supabase no está configurado' }, { status: 500 });
  }

  // Buscar el artículo por slug
  // Seleccionamos todos los campos, incluido 'content'
  const { data, error } = await supabase
    .from('articulos_blog')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true) // Solo mostrar si está publicado
    .single();

  if (error) {
    // Si no se encuentra (código PGRST116 es 'The result contains 0 rows')
    if (error.code === 'PGRST116') {
      return NextResponse.json({ error: 'Artículo no encontrado' }, { status: 404 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ article: data });
}
