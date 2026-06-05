import dynamic from 'next/dynamic';

// @project
import { SEO_CONTENT } from '@/metadata';

const Blog = dynamic(() => import('@/views/landings/lms/blog'));

/***************************  METADATA - BLOG  ***************************/

export const metadata = { ...SEO_CONTENT.blogPage };

/***************************  PAGE - BLOG  ***************************/

export default function BlogPage() {
  return <Blog />;
}
