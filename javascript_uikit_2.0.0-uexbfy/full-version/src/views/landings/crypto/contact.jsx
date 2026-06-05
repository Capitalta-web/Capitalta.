'use client';

// @project
import { SmallHero2 } from '@/blocks/small-hero';
import LazySection from '@/components/LazySection';

// @data
import { smallHero4, cta, contactUS } from './data';

/***************************  PAGE - CONTACT  ***************************/

export default function Contact() {
  return (
    <>
      <SmallHero2 {...smallHero4} />

      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/contact-us').then((module) => ({ default: module.ContactUs4 })), props: contactUS },
          { importFunc: () => import('@/blocks/cta').then((module) => ({ default: module.Cta1 })), props: cta }
        ]}
        offset="200px"
      />
    </>
  );
}
