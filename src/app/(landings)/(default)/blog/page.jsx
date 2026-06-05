import BlogList from '@/views/landings/default/blog/BlogList';
import { SEO_CONTENT } from '@/metadata';

export const metadata = {
  title: 'Blog | Capitalta',
  description: 'Artículos y consejos sobre financiamiento empresarial, estrategias de inversión y crecimiento de negocios.',
  openGraph: {
    ...SEO_CONTENT.openGraph,
    title: 'Blog | Capitalta',
    description: 'Artículos y consejos sobre financiamiento empresarial, estrategias de inversión y crecimiento de negocios.'
  }
};

export default function BlogPage() {
  return <BlogList />;
}
