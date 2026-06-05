'use client';

// @project
import { Pricing9 } from '@/blocks/pricing';
import LazySection from '@/components/LazySection';
import SectionHero from '@/components/SectionHero';

// @data
import { pricing, clientele, cta4, cta5, metrics, testimonial, feature, faq } from './data';

const removeKeyData = ({ heading, caption, ...rest }) => rest;

/***************************  PAGE - PRICING  ***************************/

export default function Pricing() {
  // removed heading and caption
  const newPricing = removeKeyData(pricing);

  return (
    <>
      <SectionHero heading="Discover our Pricing Plans" search={false} offer />
      <Pricing9 {...newPricing} />

      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/clientele').then((module) => ({ default: module.Clientele3 })), props: clientele },
          { importFunc: () => import('@/blocks/cta').then((module) => ({ default: module.Cta4 })), props: cta4 },
          { importFunc: () => import('@/blocks/metrics').then((module) => ({ default: module.Metrics5 })), props: metrics }
        ]}
        offset="200px"
      />

      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/feature').then((module) => ({ default: module.Feature22 })), props: feature },
          { importFunc: () => import('@/blocks/testimonial').then((module) => ({ default: module.Testimonial5 })), props: testimonial },
          { importFunc: () => import('@/blocks/cta').then((module) => ({ default: module.Cta5 })), props: cta5 },
          { importFunc: () => import('@/blocks/faq').then((module) => ({ default: module.Faq6 })), props: faq }
        ]}
        offset="200px"
      />
    </>
  );
}
