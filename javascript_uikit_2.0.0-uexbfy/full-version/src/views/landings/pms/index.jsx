'use client';

// @project
import { Clientele4 } from '@/blocks/clientele';
import { Hero15 } from '@/blocks/hero';
import LazySection from '@/components/LazySection';

// @data
import {
  about,
  metrics,
  blog,
  clientele,
  contactUS,
  cta7,
  cta10,
  faq,
  feature6,
  feature12,
  hero,
  integration,
  pricing,
  process,
  testimonial
} from './data';

/***************************  LANDING - PMS  ***************************/

export default function PMS() {
  return (
    <>
      <Hero15 {...hero} imageBorder={true} />
      <Clientele4 {...clientele} />

      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/metrics').then((module) => ({ default: module.Metrics2 })), props: metrics },
          { importFunc: () => import('@/blocks/about').then((module) => ({ default: module.About1 })), props: about },
          { importFunc: () => import('@/blocks/feature').then((module) => ({ default: module.Feature12 })), props: feature12 }
        ]}
        offset="200px"
      />

      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/process').then((module) => ({ default: module.Process5 })), props: process },
          { importFunc: () => import('@/blocks/integration').then((module) => ({ default: module.Integration5 })), props: integration },
          { importFunc: () => import('@/blocks/testimonial').then((module) => ({ default: module.Testimonial9 })), props: testimonial }
        ]}
        offset="200px"
      />

      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/cta').then((module) => ({ default: module.Cta7 })), props: cta7 },
          { importFunc: () => import('@/blocks/feature').then((module) => ({ default: module.Feature6 })), props: feature6 },
          { importFunc: () => import('@/blocks/pricing').then((module) => ({ default: module.Pricing8 })), props: pricing }
        ]}
        offset="200px"
      />

      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/faq').then((module) => ({ default: module.Faq4 })), props: faq },
          { importFunc: () => import('@/blocks/cta').then((module) => ({ default: module.Cta10 })), props: cta10 },
          { importFunc: () => import('@/blocks/blog').then((module) => ({ default: module.Blog3 })), props: blog },
          { importFunc: () => import('@/blocks/contact-us').then((module) => ({ default: module.ContactUs4 })), props: contactUS }
        ]}
        offset="200px"
      />
    </>
  );
}
