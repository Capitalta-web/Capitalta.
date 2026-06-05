'use client';

// @project
import { Clientele1 } from '@/blocks/clientele';
import { Hero1 } from '@/blocks/hero';
import LazySection from '@/components/LazySection';

// @data
import { metrics, blog, clientele, contactUS2, cta, faq, feature1, feature9, hero, integration, pricing, process } from './data';

/***************************  LANDING - CRM  ***************************/

export default function CRM() {
  return (
    <>
      <Hero1 {...hero} />
      <Clientele1 {...clientele} />

      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/metrics').then((module) => ({ default: module.Metrics1 })), props: metrics },
          { importFunc: () => import('@/blocks/feature').then((module) => ({ default: module.Feature1 })), props: feature1 },
          { importFunc: () => import('@/blocks/feature').then((module) => ({ default: module.Feature9 })), props: feature9 }
        ]}
        offset="200px"
      />

      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/process').then((module) => ({ default: module.Process1 })), props: process },
          { importFunc: () => import('@/blocks/integration').then((module) => ({ default: module.Integration1 })), props: integration },
          { importFunc: () => import('@/blocks/cta').then((module) => ({ default: module.Cta1 })), props: cta }
        ]}
        offset="200px"
      />

      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/pricing').then((module) => ({ default: module.Pricing1 })), props: pricing },
          { importFunc: () => import('@/blocks/blog').then((module) => ({ default: module.Blog1 })), props: blog },
          { importFunc: () => import('@/blocks/faq').then((module) => ({ default: module.Faq1 })), props: faq },
          { importFunc: () => import('@/blocks/contact-us').then((module) => ({ default: module.ContactUs2 })), props: contactUS2 }
        ]}
        offset="200px"
      />
    </>
  );
}
