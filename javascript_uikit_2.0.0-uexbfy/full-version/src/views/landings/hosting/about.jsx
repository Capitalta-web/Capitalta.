'use client';

// @project
import { Hero19 } from '@/blocks/hero';
import LazySection from '@/components/LazySection';

// @data
import { aboutFeature24, aboutHero19, metrics5, blog5, clientele5, contactUs1, testimonial3 } from './data';

/***************************  PAGE - ABOUT  ***************************/

export default function About() {
  return (
    <>
      <Hero19 {...aboutHero19} />

      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/clientele').then((module) => ({ default: module.Clientele5 })), props: clientele5 },
          { importFunc: () => import('@/blocks/feature').then((module) => ({ default: module.Feature24 })), props: aboutFeature24 },
          { importFunc: () => import('@/blocks/metrics').then((module) => ({ default: module.Metrics5 })), props: metrics5 }
        ]}
        offset="200px"
      />
      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/testimonial').then((module) => ({ default: module.Testimonial3 })), props: testimonial3 },
          { importFunc: () => import('@/blocks/blog').then((module) => ({ default: module.Blog5 })), props: blog5 },
          { importFunc: () => import('@/blocks/contact-us').then((module) => ({ default: module.ContactUs1 })), props: contactUs1 }
        ]}
        offset="200px"
      />
    </>
  );
}
