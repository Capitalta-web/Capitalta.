import ProductosContent from './ProductosContent';

// @project
import { SEO_CONTENT } from '@/metadata';

export const metadata = { ...SEO_CONTENT.productos };

export default function ProductosPage() {
  return <ProductosContent />;
}
