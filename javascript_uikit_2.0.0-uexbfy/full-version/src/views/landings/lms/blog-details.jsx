'use client';

import LazySection from '@/components/LazySection';

// @data
import { blog9, blogDetails } from './data';

/***************************  LMS - BLOG DETAILS  ***************************/

export default function BlogDetails() {
  return (
    <LazySection
      sections={[
        { importFunc: () => import('@/blocks/BlogDetails').then((module) => ({ default: module.default })), props: blogDetails },
        { importFunc: () => import('@/blocks/blog').then((module) => ({ default: module.Blog9 })), props: blog9 }
      ]}
    />
  );
}
