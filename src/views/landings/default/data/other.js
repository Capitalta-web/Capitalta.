// @project
import { PAGE_PATH, SECTION_PATH } from '@/path';

// @assets
const imagePrefix = '/assets/images/presentation';

// @project
import branding from '@/branding.json';

export const other = {
  heading: `${branding.brandName} blocks `,
  description: 'Explore a wide range of ready-made blocks—from Hero to CTA, Features, and more to speed up your design process.',
  primaryBtn: { children: 'Explore all Blocks', href: SECTION_PATH },
  sections: [
    {
      animationDelay: 0.2,
      title: 'Hero',
      subTitle: '17 Different Variants',
      image: { light: `${imagePrefix}/hero-light.svg`, dark: `${imagePrefix}/hero-dark.svg` },
      link: PAGE_PATH.hero
    },
    {
      animationDelay: 0.3,
      title: 'Call to Action',
      subTitle: '12 Different Variants',
      image: { light: `${imagePrefix}/cta-light.svg`, dark: `${imagePrefix}/cta-dark.svg` },
      link: PAGE_PATH.cta
    },
    {
      animationDelay: 0.4,
      title: 'Features',
      subTitle: '23 Different Variants',
      image: { light: `${imagePrefix}/feature-light.svg`, dark: `${imagePrefix}/feature-dark.svg` },
      link: PAGE_PATH.feature
    },
    {
      animationDelay: 0.2,
      title: 'Metrics',
      subTitle: '9 Different Variants',
      image: { light: `${imagePrefix}/metrics-light.svg`, dark: `${imagePrefix}/metrics-dark.svg` },
      link: PAGE_PATH.metrics
    },
    {
      animationDelay: 0.3,
      title: 'Process',
      subTitle: '7 Different Variants',
      image: { light: `${imagePrefix}/process-light.svg`, dark: `${imagePrefix}/process-dark.svg` },
      link: PAGE_PATH.process
    },
    {
      animationDelay: 0.4,
      title: 'Integration',
      subTitle: '8 Different Variants',
      image: { light: `${imagePrefix}/integration-light.svg`, dark: `${imagePrefix}/integration-dark.svg` },
      link: PAGE_PATH.integration
    }
  ]
};
