'use client';

// @mui
import { useTheme } from '@mui/material/styles';

// project
import { Feature24 } from '@/blocks/feature';
import { SmallHero5 } from '@/blocks/small-hero';
import LazySection from '@/components/LazySection';

// @data
import {
  cta1,
  cta9,
  cta12,
  faq1,
  feature9,
  feature24,
  pricing3,
  process4,
  serviceTestimonial3,
  smallHero5,
  serviceFeature20
} from './data';

/***************************  PAGE - SERVICES  ***************************/

export default function Services() {
  const theme = useTheme();

  return (
    <>
      <SmallHero5 {...smallHero5} circleStopColor={theme.vars.palette.grey[300]} />
      <Feature24 {...feature24} />
      <LazySection
        sections={[
          {
            importFunc: () => import('@/blocks/testimonial').then((module) => ({ default: module.Testimonial3 })),
            props: serviceTestimonial3
          },
          { importFunc: () => import('@/blocks/cta').then((module) => ({ default: module.Cta9 })), props: cta9 },
          { importFunc: () => import('@/blocks/feature').then((module) => ({ default: module.Feature9 })), props: feature9 }
        ]}
        offset="200px"
      />

      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/process').then((module) => ({ default: module.Process4 })), props: process4 },
          { importFunc: () => import('@/blocks/pricing').then((module) => ({ default: module.Pricing3 })), props: pricing3 },
          { importFunc: () => import('@/blocks/cta').then((module) => ({ default: module.Cta12 })), props: cta12 }
        ]}
        offset="200px"
      />

      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/feature').then((module) => ({ default: module.Feature20 })), props: serviceFeature20 },
          { importFunc: () => import('@/blocks/cta').then((module) => ({ default: module.Cta1 })), props: cta1 },
          { importFunc: () => import('@/blocks/faq').then((module) => ({ default: module.Faq1 })), props: faq1 }
        ]}
        offset="200px"
      />
    </>
  );
}
