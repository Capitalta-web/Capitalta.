'use client';

// @project
import { ContactUs1 } from '@/blocks/contact-us';
import LazySection from '@/components/LazySection';

// @data
import { faq, cta8, contactUS1 } from './data';

/***************************  PAGE - CONTACT  ***************************/

export default function Contact() {
  return (
    <>
      <ContactUs1 {...contactUS1} />

      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/faq').then((module) => ({ default: module.Faq1 })), props: faq },
          { importFunc: () => import('@/blocks/cta').then((module) => ({ default: module.Cta8 })), props: cta8 }
        ]}
        offset="200px"
      />
    </>
  );
}
