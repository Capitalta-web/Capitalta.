'use client';

// @project
import { Hero19 } from '@/blocks/hero';
import LazySection from '@/components/LazySection';

// @data
import { contacthero19, contactUs1, feature6 } from './data';

/***************************  PAGE - CONTACT  ***************************/

export default function Contact() {
  return (
    <>
      <Hero19 {...contacthero19} />
      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/feature').then((module) => ({ default: module.Feature6 })), props: feature6 },
          { importFunc: () => import('@/blocks/contact-us').then((module) => ({ default: module.ContactUs1 })), props: contactUs1 }
        ]}
        offset="200px"
      />
    </>
  );
}
