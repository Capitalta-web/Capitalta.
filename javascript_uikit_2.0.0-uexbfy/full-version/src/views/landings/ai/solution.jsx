'use client';

// @project
import { SmallHero1 } from '@/blocks/small-hero';
import LazySection from '@/components/LazySection';

// @data
import { blog, feature25, smallHero3, testimonial9 } from './data';

/***************************  PAGE - SOLUTION  ***************************/

export default function Solution() {
  return (
    <>
      <SmallHero1 {...smallHero3} />

      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/feature').then((module) => ({ default: module.Feature25 })), props: feature25 },
          { importFunc: () => import('@/blocks/testimonial').then((module) => ({ default: module.Testimonial9 })), props: testimonial9 },
          { importFunc: () => import('@/blocks/blog').then((module) => ({ default: module.Blog3 })), props: blog }
        ]}
        offset="200px"
      />
    </>
  );
}
