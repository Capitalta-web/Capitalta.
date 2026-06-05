'use client';

// @project
import { Hero10 } from '@/blocks/hero';
import { Process7 } from '@/blocks/process';
import LazySection from '@/components/LazySection';

// @data
import { metrics, cta4, cta5, faq, feature7, feature16, hero, pricing, process, testimonial } from './data';

/***************************  LANDING - PLUGIN  ***************************/

export default function Plugin() {
  return (
    <>
      <Hero10 {...hero} />
      <Process7 {...process} />

      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/feature').then((module) => ({ default: module.Feature16 })), props: feature16 },
          { importFunc: () => import('@/blocks/metrics').then((module) => ({ default: module.Metrics5 })), props: metrics },
          { importFunc: () => import('@/blocks/feature').then((module) => ({ default: module.Feature7 })), props: feature7 }
        ]}
        offset="200px"
      />

      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/testimonial').then((module) => ({ default: module.Testimonial10 })), props: testimonial },
          { importFunc: () => import('@/blocks/cta').then((module) => ({ default: module.Cta4 })), props: cta4 },
          { importFunc: () => import('@/blocks/pricing').then((module) => ({ default: module.Pricing4 })), props: pricing }
        ]}
        offset="200px"
      />

      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/faq').then((module) => ({ default: module.Faq6 })), props: faq },
          { importFunc: () => import('@/blocks/cta').then((module) => ({ default: module.Cta5 })), props: cta5 }
        ]}
        offset="200px"
      />
    </>
  );
}
