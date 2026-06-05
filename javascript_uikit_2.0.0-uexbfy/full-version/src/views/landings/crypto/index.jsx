'use client';

// @project
import { Clientele3 } from '@/blocks/clientele';
import { Hero3 } from '@/blocks/hero';
import LazySection from '@/components/LazySection';

// @data
import { blog, clientele, cta1, cta12, faq, feature10, feature12, hero, integration2, pricing, process, testimonial } from './data';

/***************************  LANDING - CRYPTO  ***************************/

export default function Crypto() {
  return (
    <>
      <Hero3 {...hero} />
      <Clientele3 {...clientele} />

      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/cta').then((module) => ({ default: module.Cta12 })), props: cta12 },
          { importFunc: () => import('@/blocks/feature').then((module) => ({ default: module.Feature10 })), props: feature10 },
          { importFunc: () => import('@/blocks/feature').then((module) => ({ default: module.Feature12 })), props: feature12 }
        ]}
        offset="200px"
      />

      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/process').then((module) => ({ default: module.Process2 })), props: process },
          { importFunc: () => import('@/blocks/integration').then((module) => ({ default: module.Integration2 })), props: integration2 },
          { importFunc: () => import('@/blocks/testimonial').then((module) => ({ default: module.Testimonial3 })), props: testimonial }
        ]}
        offset="200px"
      />

      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/cta').then((module) => ({ default: module.Cta1 })), props: cta1 },
          { importFunc: () => import('@/blocks/blog').then((module) => ({ default: module.Blog3 })), props: blog },
          { importFunc: () => import('@/blocks/pricing').then((module) => ({ default: module.Pricing3 })), props: pricing },
          { importFunc: () => import('@/blocks/faq').then((module) => ({ default: module.Faq2 })), props: faq }
        ]}
        offset="200px"
      />
    </>
  );
}
