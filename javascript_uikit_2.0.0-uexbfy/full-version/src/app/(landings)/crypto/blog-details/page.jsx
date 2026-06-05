import dynamic from 'next/dynamic';

// @project
import { SEO_CONTENT } from '@/metadata';

const BlogDetails = dynamic(() => import('@/views/landings/crypto/blog-details'));

/***************************  METADATA - BLOG DETAILS  ***************************/

export const metadata = { ...SEO_CONTENT.blogDetails };

/***************************  PAGE - BLOG DETAILS  ***************************/

export default function BlogDetailsPage() {
  return <BlogDetails />;
}
