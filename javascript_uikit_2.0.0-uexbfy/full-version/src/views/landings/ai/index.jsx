'use client';

// @mui
import Box from '@mui/material/Box';

// @project
import { Clientele2 } from '@/blocks/clientele';
import { Hero2 } from '@/blocks/hero';
import LazySection from '@/components/LazySection';

// @data
import { about, blog, clientele, cta, faq, feature6, feature11, hero, integration, testimonial } from './data';

/***************************  LANDING - DEFAULT / AI  ***************************/

export default function AI() {
  return (
    <>
      <Box sx={{ mt: -3 }}>
        <Hero2 {...hero} />
      </Box>
      <Clientele2 {...clientele} />

      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/feature').then((module) => ({ default: module.Feature6 })), props: feature6 },
          { importFunc: () => import('@/blocks/cta').then((module) => ({ default: module.Cta1 })), props: cta },
          { importFunc: () => import('@/blocks/about').then((module) => ({ default: module.About2 })), props: about }
        ]}
        offset="200px"
      />

      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/feature').then((module) => ({ default: module.Feature11 })), props: feature11 },
          { importFunc: () => import('@/blocks/integration').then((module) => ({ default: module.Integration1 })), props: integration },
          { importFunc: () => import('@/blocks/testimonial').then((module) => ({ default: module.Testimonial2 })), props: testimonial }
        ]}
        offset="200px"
      />

      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/blog').then((module) => ({ default: module.Blog3 })), props: blog },
          { importFunc: () => import('@/blocks/faq').then((module) => ({ default: module.Faq3 })), props: faq }
        ]}
        offset="200px"
      />
    </>
  );
}
