'use client';

// @project
import { SmallHero5 } from '@/blocks/small-hero';
import LazySection from '@/components/LazySection';

// @data
import { smallHero5, feature18, metrics2, feature10, team4, testimonial9, clientele2, contactUS4 } from './data';

/***************************  PAGE - ABOUT  ***************************/

export default function About() {
  return (
    <>
      <SmallHero5 {...smallHero5} />

      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/feature').then((module) => ({ default: module.Feature18 })), props: feature18 },
          { importFunc: () => import('@/blocks/metrics').then((module) => ({ default: module.Metrics2 })), props: metrics2 }
        ]}
        offset="200px"
      />

      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/feature').then((module) => ({ default: module.Feature10 })), props: feature10 },
          { importFunc: () => import('@/blocks/team').then((module) => ({ default: module.Team4 })), props: team4 }
        ]}
        offset="200px"
      />

      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/testimonial').then((module) => ({ default: module.Testimonial9 })), props: testimonial9 },
          { importFunc: () => import('@/blocks/clientele').then((module) => ({ default: module.Clientele2 })), props: clientele2 },
          { importFunc: () => import('@/blocks/contact-us').then((module) => ({ default: module.ContactUs4 })), props: contactUS4 }
        ]}
        offset="200px"
      />
    </>
  );
}
