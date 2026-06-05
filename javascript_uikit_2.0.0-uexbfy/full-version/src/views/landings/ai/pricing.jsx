'use client';

// @project
import { Pricing5 } from '@/blocks/pricing';
import LazySection from '@/components/LazySection';

// @data
import { faq1, cta11, pricing5 } from './data';

/***************************  PAGE - PRICING  ***************************/

export default function Pricing() {
  return (
    <>
      <Pricing5 {...pricing5} />

      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/faq').then((module) => ({ default: module.Faq1 })), props: faq1 },
          { importFunc: () => import('@/blocks/cta').then((module) => ({ default: module.Cta11 })), props: cta11 }
        ]}
        offset="200px"
      />
    </>
  );
}
