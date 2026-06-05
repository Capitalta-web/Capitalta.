'use client';

// @project
import { SmallHero1 } from '@/blocks/small-hero';
import LazySection from '@/components/LazySection';

// @data
import { feature4, smallHero1, testimonial9 } from './data';

/***************************  PAGE - COLLABORATE  ***************************/

export default function Collaborate() {
  return (
    <>
      <SmallHero1 {...smallHero1} />

      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/feature').then((module) => ({ default: module.Feature4 })), props: feature4 },
          { importFunc: () => import('@/blocks/testimonial').then((module) => ({ default: module.Testimonial9 })), props: testimonial9 }
        ]}
        offset="200px"
      />
    </>
  );
}
