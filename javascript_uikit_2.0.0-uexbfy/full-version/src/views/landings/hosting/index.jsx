'use client';

// @project
import { Clientele5 } from '@/blocks/clientele';
import { Hero11 } from '@/blocks/hero';
import LazySection from '@/components/LazySection';

// @data
import { metrics, blog5, clientele5, cta, feature8, feature20, hero, integration, testimonial6, process7, pricing5, faq1 } from './data';

/***************************  LANDING - HOSTING  ***************************/

export default function Hosting() {
  return (
    <>
      <Hero11 {...hero} />
      <Clientele5 {...clientele5} />

      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/feature').then((module) => ({ default: module.Feature8 })), props: feature8 },
          { importFunc: () => import('@/blocks/feature').then((module) => ({ default: module.Feature20 })), props: feature20 },
          { importFunc: () => import('@/blocks/metrics').then((module) => ({ default: module.Metrics5 })), props: metrics }
        ]}
        offset="200px"
      />

      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/process').then((module) => ({ default: module.Process7 })), props: process7 },
          { importFunc: () => import('@/blocks/integration').then((module) => ({ default: module.Integration3 })), props: integration },
          { importFunc: () => import('@/blocks/testimonial').then((module) => ({ default: module.Testimonial6 })), props: testimonial6 }
        ]}
        offset="200px"
      />

      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/cta').then((module) => ({ default: module.Cta8 })), props: cta },
          { importFunc: () => import('@/blocks/pricing').then((module) => ({ default: module.Pricing5 })), props: pricing5 },
          { importFunc: () => import('@/blocks/blog').then((module) => ({ default: module.Blog5 })), props: blog5 },
          { importFunc: () => import('@/blocks/faq').then((module) => ({ default: module.Faq1 })), props: faq1 }
        ]}
        offset="200px"
      />
    </>
  );
}
