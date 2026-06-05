'use client';

// @project
import { SmallHero1 } from '@/blocks/small-hero';
import LazySection from '@/components/LazySection';

// @data
import { smallHero1, testimonial2, faq, cta8, coursesOther3 } from './data';

/***************************  PAGE - COURSES  ***************************/

export default function Courses() {
  return (
    <>
      <SmallHero1 {...smallHero1} />

      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/other').then((module) => ({ default: module.Other3 })), props: coursesOther3 },
          { importFunc: () => import('@/blocks/testimonial').then((module) => ({ default: module.Testimonial2 })), props: testimonial2 },
          { importFunc: () => import('@/blocks/faq').then((module) => ({ default: module.Faq1 })), props: faq },
          { importFunc: () => import('@/blocks/cta').then((module) => ({ default: module.Cta8 })), props: cta8 }
        ]}
        offset="200px"
      />
    </>
  );
}
