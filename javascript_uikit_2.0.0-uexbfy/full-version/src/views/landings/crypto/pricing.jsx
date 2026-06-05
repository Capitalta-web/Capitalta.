'use client';

// @project
import { Pricing7 } from '@/blocks/pricing';
import { SmallHero2 } from '@/blocks/small-hero';
import LazySection from '@/components/LazySection';

// @data
import { pricing7, faq1, smallHero2, cta } from './data';

/***************************  PAGE - PRICING  ***************************/

export default function Pricing() {
  return (
    <>
      <SmallHero2 {...smallHero2} />
      <Pricing7 {...pricing7} />

      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/faq').then((module) => ({ default: module.Faq1 })), props: faq1 },
          { importFunc: () => import('@/blocks/cta').then((module) => ({ default: module.Cta1 })), props: cta }
        ]}
        offset="200px"
      />
    </>
  );
}
