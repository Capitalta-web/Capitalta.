'use client';

// @project
import { Clientele5 } from '@/blocks/clientele';
import { Hero19 } from '@/blocks/hero';
import LazySection from '@/components/LazySection';

// @data
import {
  blog5,
  clientele5,
  cta11,
  hero19,
  integration3,
  process8,
  solutionsCta1,
  testimonial10,
  testimonial3,
  pricing5,
  faq1
} from './data';

/***************************  PAGE - SOLUTIONS  ***************************/

export default function Solutions() {
  return (
    <>
      <Hero19 {...hero19} />
      <Clientele5 {...clientele5} />
      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/process').then((module) => ({ default: module.Process8 })), props: process8 },
          { importFunc: () => import('@/blocks/testimonial').then((module) => ({ default: module.Testimonial3 })), props: testimonial3 },
          { importFunc: () => import('@/blocks/pricing').then((module) => ({ default: module.Pricing5 })), props: pricing5 }
        ]}
        offset="200px"
      />

      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/cta').then((module) => ({ default: module.Cta1 })), props: solutionsCta1 },
          { importFunc: () => import('@/blocks/cta').then((module) => ({ default: module.Cta11 })), props: cta11 },
          { importFunc: () => import('@/blocks/testimonial').then((module) => ({ default: module.Testimonial10 })), props: testimonial10 }
        ]}
        offset="200px"
      />

      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/integration').then((module) => ({ default: module.Integration3 })), props: integration3 },
          { importFunc: () => import('@/blocks/blog').then((module) => ({ default: module.Blog5 })), props: blog5 },
          { importFunc: () => import('@/blocks/faq').then((module) => ({ default: module.Faq1 })), props: faq1 }
        ]}
        offset="200px"
      />
    </>
  );
}
