'use client';

// @project
import { SmallHero5 } from '@/blocks/small-hero';
import LazySection from '@/components/LazySection';

// @data
import { contactSmallHero5, contactUS3, contactUS6 } from './data';

/***************************  PAGE - CONTACT  ***************************/

export default function Contact() {
  return (
    <>
      <SmallHero5 {...contactSmallHero5} />

      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/contact-us').then((module) => ({ default: module.ContactUs6 })), props: contactUS6 },
          { importFunc: () => import('@/blocks/contact-us').then((module) => ({ default: module.ContactUs3 })), props: contactUS3 }
        ]}
        offset="200px"
      />
    </>
  );
}
