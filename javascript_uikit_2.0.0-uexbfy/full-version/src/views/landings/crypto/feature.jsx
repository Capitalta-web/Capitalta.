'use client';

// @project
import { Clientele3 } from '@/blocks/clientele';
import { SmallHero2 } from '@/blocks/small-hero';
import LazySection from '@/components/LazySection';

// @data
import { clientele3, feature19, process4, integration4, smallHero, testimonial, cta } from './data';

/***************************  PAGE - FEATURE  ***************************/

export default function Feature() {
  return (
    <>
      <SmallHero2 {...smallHero} />
      <Clientele3 {...clientele3} />

      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/feature').then((module) => ({ default: module.Feature19 })), props: feature19 },
          { importFunc: () => import('@/blocks/process').then((module) => ({ default: module.Process4 })), props: process4 },
          { importFunc: () => import('@/blocks/integration').then((module) => ({ default: module.Integration4 })), props: integration4 }
        ]}
        offset="200px"
      />

      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/testimonial').then((module) => ({ default: module.Testimonial3 })), props: testimonial },
          { importFunc: () => import('@/blocks/cta').then((module) => ({ default: module.Cta1 })), props: cta }
        ]}
        offset="200px"
      />
    </>
  );
}
