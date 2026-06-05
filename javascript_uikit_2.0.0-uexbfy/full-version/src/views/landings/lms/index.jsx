'use client';

// @project
import { Clientele1 } from '@/blocks/clientele';
import { Hero7 } from '@/blocks/hero';
import LazySection from '@/components/LazySection';

// @data
import { hero, blog, blog5, clientele, feature, faq, team, testimonial, other3, clientele8, feature26 } from './data';

/***************************  LANDING - LMS  ***************************/

export default function LMS() {
  return (
    <>
      <Hero7 {...hero} />
      <Clientele1 {...clientele} />

      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/blog').then((module) => ({ default: module.Blog3 })), props: blog },
          { importFunc: () => import('@/blocks/other').then((module) => ({ default: module.Other3 })), props: other3 }
        ]}
        offset="200px"
      />

      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/feature').then((module) => ({ default: module.Feature9 })), props: feature },
          { importFunc: () => import('@/blocks/clientele').then((module) => ({ default: module.Clientele8 })), props: clientele8 },
          { importFunc: () => import('@/blocks/team').then((module) => ({ default: module.Team2 })), props: team }
        ]}
        offset="200px"
      />

      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/testimonial').then((module) => ({ default: module.Testimonial13 })), props: testimonial },
          { importFunc: () => import('@/blocks/feature').then((module) => ({ default: module.Feature26 })), props: feature26 },
          { importFunc: () => import('@/blocks/blog').then((module) => ({ default: module.Blog5 })), props: blog5 }
        ]}
        offset="200px"
      />

      <LazySection
        sections={[{ importFunc: () => import('@/blocks/faq').then((module) => ({ default: module.Faq1 })), props: faq }]}
        offset="200px"
      />
    </>
  );
}
