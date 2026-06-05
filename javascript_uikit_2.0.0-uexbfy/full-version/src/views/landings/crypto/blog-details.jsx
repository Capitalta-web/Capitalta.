'use client';

import LazySection from '@/components/LazySection';

// @data
import { blog, blogDetails } from './data';

/***************************  CRYPTO - BLOG DETAILS  ***************************/

export default function BlogDetails() {
  return (
    <LazySection
      sections={[
        { importFunc: () => import('@/blocks/BlogDetails').then((module) => ({ default: module.default })), props: blogDetails },
        { importFunc: () => import('@/blocks/blog').then((module) => ({ default: module.Blog3 })), props: blog }
      ]}
      offset="200px"
    />
  );
}
