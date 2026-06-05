'use client';

// @project
import { SmallHero3 } from '@/blocks/small-hero';
import LazySection from '@/components/LazySection';

// @data
import { smallHero3, pricing2, feature14, faq5 } from './data';

/***************************  PAGE - PRICING  ***************************/

export default function Pricing() {
  return (
    <>
      <SmallHero3 {...smallHero3} />

      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/pricing').then((module) => ({ default: module.Pricing2 })), props: pricing2 },
          { importFunc: () => import('@/blocks/feature').then((module) => ({ default: module.Feature14 })), props: feature14 },
          { importFunc: () => import('@/blocks/faq').then((module) => ({ default: module.Faq5 })), props: faq5 }
        ]}
        offset="200px"
      />
    </>
  );
}
