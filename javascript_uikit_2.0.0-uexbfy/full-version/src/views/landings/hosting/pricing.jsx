'use client';

// @project
import { Hero19 } from '@/blocks/hero';
import LazySection from '@/components/LazySection';

// @data
import { contactUs1, pricing5, pricingFaq1, pricingHero19, solutionsCta1, testimonial3 } from './data';

/***************************  PAGE - PRICING  ***************************/

export default function Pricing() {
  return (
    <>
      <Hero19 {...pricingHero19} />
      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/pricing').then((module) => ({ default: module.Pricing5 })), props: pricing5 },
          { importFunc: () => import('@/blocks/cta').then((module) => ({ default: module.Cta1 })), props: solutionsCta1 }
        ]}
        offset="200px"
      />

      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/testimonial').then((module) => ({ default: module.Testimonial3 })), props: testimonial3 },
          { importFunc: () => import('@/blocks/faq').then((module) => ({ default: module.Faq1 })), props: pricingFaq1 },
          { importFunc: () => import('@/blocks/contact-us').then((module) => ({ default: module.ContactUs1 })), props: contactUs1 }
        ]}
        offset="200px"
      />
    </>
  );
}
