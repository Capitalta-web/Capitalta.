'use client';

// @project
import { Clientele3 } from '@/blocks/clientele';
import { Hero9 } from '@/blocks/hero';
import LazySection from '@/components/LazySection';

// @data
import { about, metrics, blog, clientele, cta, faq, feature5, feature13, hero, integration, process, testimonial } from './data';

/***************************  LANDING - HRM  ***************************/

export default function HRM() {
  return (
    <>
      <Hero9 {...hero} />
      <Clientele3 {...clientele} />

      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/metrics').then((module) => ({ default: module.Metrics8 })), props: metrics },
          { importFunc: () => import('@/blocks/feature').then((module) => ({ default: module.Feature13 })), props: feature13 },
          { importFunc: () => import('@/blocks/about').then((module) => ({ default: module.About2 })), props: about }
        ]}
        offset="200px"
      />

      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/process').then((module) => ({ default: module.Process1 })), props: process },
          { importFunc: () => import('@/blocks/integration').then((module) => ({ default: module.Integration8 })), props: integration },
          { importFunc: () => import('@/blocks/feature').then((module) => ({ default: module.Feature5 })), props: feature5 }
        ]}
        offset="200px"
      />

      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/testimonial').then((module) => ({ default: module.Testimonial5 })), props: testimonial },
          { importFunc: () => import('@/blocks/cta').then((module) => ({ default: module.Cta6 })), props: cta },
          { importFunc: () => import('@/blocks/faq').then((module) => ({ default: module.Faq2 })), props: faq },
          { importFunc: () => import('@/blocks/blog').then((module) => ({ default: module.Blog4 })), props: blog }
        ]}
        offset="200px"
      />
    </>
  );
}
