// @project
import Other1 from '@/blocks/other/Other1';
import { PAGE_PATH, SECTION_PATH } from '@/path';

// @assets
const imagePrefix = '/assets/images/presentation';

/***************************  OTHER 1 - DATA  ***************************/

const data = {
  heading: 'Customizable building blocks',
  description: 'Kickstart your SaaS landing page design with pre-designed templates featuring versatile components.',
  primaryBtn: { children: 'Explore all Blocks', href: SECTION_PATH, sx: { textTransform: 'none' } },
  sections: [
    {
      title: 'Hero',
      subTitle: '17 Different Variants',
      image: { light: `${imagePrefix}/hero-light.svg`, dark: `${imagePrefix}/hero-dark.svg` },
      link: PAGE_PATH.hero
    },
    {
      title: 'Call to Action',
      subTitle: '12 Different Variants',
      image: { light: `${imagePrefix}/cta-light.svg`, dark: `${imagePrefix}/cta-dark.svg` },
      link: PAGE_PATH.cta
    },
    {
      title: 'Features',
      subTitle: '23 Different Variants',
      image: { light: `${imagePrefix}/feature-light.svg`, dark: `${imagePrefix}/feature-dark.svg` },
      link: PAGE_PATH.feature
    },
    {
      title: 'Metrics',
      subTitle: '9 Different Variants',
      image: { light: `${imagePrefix}/metrics-light.svg`, dark: `${imagePrefix}/metrics-dark.svg` },
      link: PAGE_PATH.metrics
    },
    {
      title: 'Process',
      subTitle: '7 Different Variants',
      image: { light: `${imagePrefix}/process-light.svg`, dark: `${imagePrefix}/process-dark.svg` },
      link: PAGE_PATH.process
    },
    {
      title: 'Integration',
      subTitle: '8 Different Variants',
      image: { light: `${imagePrefix}/integration-light.svg`, dark: `${imagePrefix}/integration-dark.svg` },
      link: PAGE_PATH.integration
    }
  ]
};

/***************************  BLOCK - OTHER 1  ***************************/

export default function BlockOther1() {
  return <Other1 {...data} />;
}
