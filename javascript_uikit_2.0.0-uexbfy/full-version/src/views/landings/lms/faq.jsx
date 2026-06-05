'use client';

// @project
import { Faq1 } from '@/blocks/faq';
import LazySection from '@/components/LazySection';

// @data
import { faq, clientele, testimonial2, cta8 } from './data';

/***************************  PAGE - FAQ  ***************************/

export default function Faq() {
  return (
    <>
      <Faq1 {...faq} />

      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/clientele').then((module) => ({ default: module.Clientele1 })), props: clientele },
          { importFunc: () => import('@/blocks/testimonial').then((module) => ({ default: module.Testimonial2 })), props: testimonial2 },
          { importFunc: () => import('@/blocks/cta').then((module) => ({ default: module.Cta8 })), props: cta8 }
        ]}
        offset="200px"
      />
    </>
  );
}
