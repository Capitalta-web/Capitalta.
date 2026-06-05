'use client';

// @project
import { Cta14 } from '@/blocks/cta';
import LazySection from '@/components/LazySection';

// @data
import { Faq1, feature21, process7, testimonial4, cta14 } from './data';

/***************************  PAGE - COURSES DETAILS  ***************************/

export default function CoursesDetails() {
  return (
    <>
      <Cta14 {...cta14} />
      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/faq').then((module) => ({ default: module.Faq1 })), props: Faq1 },
          { importFunc: () => import('@/blocks/feature').then((module) => ({ default: module.Feature21 })), props: feature21 }
        ]}
        offset="200px"
      />
      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/process').then((module) => ({ default: module.Process7 })), props: process7 },
          { importFunc: () => import('@/blocks/testimonial').then((module) => ({ default: module.Testimonial4 })), props: testimonial4 }
        ]}
        offset="200px"
      />
    </>
  );
}
