'use client';

// @project
import { SmallHero2 } from '@/blocks/small-hero';
import LazySection from '@/components/LazySection';

// @data
import { smallHero5, cta2, faq1 } from './data';

/***************************  PAGE - FAQ  ***************************/

export default function Faq() {
  return (
    <>
      <SmallHero2 {...smallHero5} />

      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/faq').then((module) => ({ default: module.Faq1 })), props: faq1 },
          { importFunc: () => import('@/blocks/cta').then((module) => ({ default: module.Cta1 })), props: cta2 }
        ]}
        offset="200px"
      />
    </>
  );
}
