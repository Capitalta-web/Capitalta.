'use client';

// @project
import { SmallHero1 } from '@/blocks/small-hero';
import LazySection from '@/components/LazySection';

// @data
import { aboutSmallHero1, metrics10, feature4, feature24, feature2, testimonial2, blog5, faq } from './data';

/***************************  PAGE - ABOUT  ***************************/

export default function About() {
  return (
    <>
      <SmallHero1 {...aboutSmallHero1} />

      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/metrics').then((module) => ({ default: module.Metrics10 })), props: metrics10 },
          { importFunc: () => import('@/blocks/feature').then((module) => ({ default: module.Feature4 })), props: feature4 }
        ]}
        offset="200px"
      />

      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/feature').then((module) => ({ default: module.Feature24 })), props: feature24 },
          { importFunc: () => import('@/blocks/feature').then((module) => ({ default: module.Feature2 })), props: feature2 },
          { importFunc: () => import('@/blocks/testimonial').then((module) => ({ default: module.Testimonial2 })), props: testimonial2 }
        ]}
        offset="200px"
      />

      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/blog').then((module) => ({ default: module.Blog5 })), props: blog5 },
          { importFunc: () => import('@/blocks/faq').then((module) => ({ default: module.Faq1 })), props: faq }
        ]}
      />
    </>
  );
}
