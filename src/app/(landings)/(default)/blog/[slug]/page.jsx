import { createSupabaseServerClient } from '@/utils/supabaseClient';
import BlogDetail from '@/views/landings/default/blog/BlogDetail';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return {
      title: 'Blog | Capitalta'
    };
  }

  if (slug === 'inversion-inmobiliaria-venta-key') {
    return {
      title: 'Artículo no encontrado | Capitalta'
    };
  }

  const { data: article } = await supabase.from('articulos_blog').select('title, excerpt, image_url').eq('slug', slug).single();

  if (!article) {
    return {
      title: 'Artículo no encontrado | Capitalta'
    };
  }

  return {
    title: `${article.title} | Capitalta`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.image_url],
      type: 'article'
    }
  };
}

export default function BlogDetailPage() {
  return <BlogDetail />;
}
