'use client';

// @project
import { SmallHero1 } from '@/blocks/small-hero';
import LazySection from '@/components/LazySection';

// @data
import { contactUs, cta9, faq1, smallHero2 } from './data';

/***************************  PAGE - FAQ  ***************************/

export default function Faq() {
  return (
    <>
      <SmallHero1 {...smallHero2} />

      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/faq').then((module) => ({ default: module.Faq1 })), props: faq1 },
          { importFunc: () => import('@/blocks/contact-us').then((module) => ({ default: module.ContactUs4 })), props: contactUs },
          { importFunc: () => import('@/blocks/cta').then((module) => ({ default: module.Cta9 })), props: cta9 }
        ]}
        offset="200px"
      />
    </>
  );
}
