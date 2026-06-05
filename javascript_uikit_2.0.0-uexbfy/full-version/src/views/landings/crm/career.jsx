'use client';

// @project
import { SmallHero4 } from '@/blocks/small-hero';
import LazySection from '@/components/LazySection';

// @data
import { careerFeature1, cta6, feature23, cta13, smallHero4 } from './data';

/***************************  PAGE - CAREER  ***************************/

export default function Career() {
  return (
    <>
      <SmallHero4 {...smallHero4} />

      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/feature').then((module) => ({ default: module.Feature1 })), props: careerFeature1 },
          { importFunc: () => import('@/blocks/feature').then((module) => ({ default: module.Feature23 })), props: feature23 }
        ]}
        offset="200px"
      />

      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/cta').then((module) => ({ default: module.Cta13 })), props: cta13 },
          { importFunc: () => import('@/blocks/cta').then((module) => ({ default: module.Cta6 })), props: cta6 }
        ]}
        offset="200px"
      />
    </>
  );
}
