import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/utils/supabaseClient';

export async function GET(request, { params }) {
  const { slug } = await params;

  if (!slug) {
    return NextResponse.json({ error: 'Slug es requerido' }, { status: 400 });
  }

  if (slug === 'inversion-inmobiliaria-venta-key') {
    return NextResponse.json({ error: 'Artículo no encontrado' }, { status: 404 });
  }

  // MOCK DATA para el detalle (mientras Supabase responde)
  const mockDetails = {
    'guia-credito-pyme-mexico': {
      slug: 'guia-credito-pyme-mexico',
      title: 'Guía Definitiva: Cómo elegir el mejor crédito para tu PYME en México',
      category: 'estrategia_financiera',
      published_at: new Date().toISOString(),
      image_url: 'https://images.unsplash.com/photo-1454165833767-027ffea70288?auto=format&fit=crop&q=80',
      content: `<h2>Introducción al Crédito PYME</h2><p>En el panorama empresarial actual de México, el acceso a capital es fundamental para el crecimiento sostenible...</p><h3>Factores a considerar</h3><ul><li>Tasa de interés y comisiones</li><li>Plazo de amortización</li><li>Garantías requeridas</li></ul><p>En Capitalta entendemos que cada negocio es único, por lo que nuestras soluciones se adaptan a tus necesidades específicas.</p>`
    },
    'beneficios-credito-revolvente-capitalta': {
      slug: 'beneficios-credito-revolvente-capitalta',
      title: '5 Ventajas del Crédito Revolvente para el flujo de caja',
      category: 'productos',
      published_at: new Date().toISOString(),
      image_url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80',
      content: `<h2>¿Por qué elegir un Crédito Revolvente?</h2><p>La principal ventaja es la disponibilidad inmediata de recursos. En Capitalta, nuestra tasa del 24% fija anual garantiza claridad total...</p><p>Ideal para capital de trabajo, nóminas o inventarios.</p>`
    },
    'expansion-empresarial-financiamiento': {
      slug: 'expansion-empresarial-financiamiento',
      title: 'Estrategias de expansión: Cuándo buscar crédito empresarial',
      category: 'crecimiento',
      published_at: new Date().toISOString(),
      image_url: 'https://images.unsplash.com/photo-1526304640581-d334cdbef1f9?auto=format&fit=crop&q=80',
      content: `<h2>El momento de crecer</h2><p>Si tu demanda supera tu capacidad instalada, es momento de considerar un crédito empresarial a medida...</p><p>Financiamiento desde $500,000 hasta $50,000,000 MXN para llevar tu empresa al siguiente nivel.</p>`
    }
  };

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
    // Si hay error de conexión o Supabase falla, intentamos devolver el mock correspondiente
    if (mockDetails[slug]) {
      console.warn(`Supabase error for slug ${slug}, returning mock data.`);
      return NextResponse.json({ article: mockDetails[slug] });
    }

    // Si no se encuentra (código PGRST116 es 'The result contains 0 rows')
    if (error.code === 'PGRST116') {
      return NextResponse.json({ error: 'Artículo no encontrado' }, { status: 404 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Si Supabase devuelve null pero tenemos el mock, lo usamos como fallback
  if (!data && mockDetails[slug]) {
    return NextResponse.json({ article: mockDetails[slug] });
  }

  return NextResponse.json({ article: data });
}
