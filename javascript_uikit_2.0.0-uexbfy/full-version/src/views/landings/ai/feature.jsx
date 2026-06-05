'use client';

// @project
import { Feature9 } from '@/blocks/feature';
import { SmallHero7 } from '@/blocks/small-hero';
import LazySection from '@/components/LazySection';

// @data
import { smallHero, feature, feature9, cta9, cta11 } from './data';

/***************************  PAGE - FEATURE  ***************************/

export default function Feature() {
  return (
    <>
      <SmallHero7 {...smallHero} />
      <Feature9 {...feature9} />

      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/feature').then((module) => ({ default: module.Feature9 })), props: feature },
          { importFunc: () => import('@/blocks/cta').then((module) => ({ default: module.Cta11 })), props: cta11 },
          { importFunc: () => import('@/blocks/cta').then((module) => ({ default: module.Cta9 })), props: cta9 }
        ]}
        offset="200px"
      />
    </>
  );
}
