'use client';

// @project
import { SmallHero5 } from '@/blocks/small-hero';
import LazySection from '@/components/LazySection';

// @data
import { faqsSmallHero5, cta7, faq6 } from './data';

/***************************  PAGE - FAQ  ***************************/

export default function Faq() {
  return (
    <>
      <SmallHero5 {...faqsSmallHero5} />

      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/faq').then((module) => ({ default: module.Faq6 })), props: faq6 },
          { importFunc: () => import('@/blocks/cta').then((module) => ({ default: module.Cta7 })), props: cta7 }
        ]}
        offset="200px"
      />
    </>
  );
}
