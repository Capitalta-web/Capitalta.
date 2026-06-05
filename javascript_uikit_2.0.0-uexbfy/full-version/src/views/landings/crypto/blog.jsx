'use client';

// @project
import { SmallHero2 } from '@/blocks/small-hero';
import LazySection from '@/components/LazySection';

// @data
import { smallHero3, cta, blog3 } from './data';

/***************************  PAGE - BLOG  ***************************/

export default function Blog() {
  return (
    <>
      <SmallHero2 {...smallHero3} />

      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/blog').then((module) => ({ default: module.Blog3 })), props: blog3 },
          { importFunc: () => import('@/blocks/cta').then((module) => ({ default: module.Cta1 })), props: cta }
        ]}
        offset="200px"
      />
    </>
  );
}
