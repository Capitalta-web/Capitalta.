// @project
import { Feature21 } from '@/blocks/feature';

/***************************  FEATURE 21 - DATA  ***************************/

const data = {
  heading: 'Streamline your business with our CRM solution',
  caption: 'Discover the features that will transform your customer relationships.',
  image: { light: '/assets/images/graphics/ai/desktop1-light.svg', dark: '/assets/images/graphics/ai/desktop1-dark.svg' },
  primaryBtn: { children: 'Buy Now' },
  secondaryBtn: { children: 'Get free figma' },
  features: [
    {
      icon: 'tabler-app-window',
      title: 'Tested in multiple browsers'
    },
    {
      icon: 'tabler-box-model',
      title: 'Ready to use template'
    },
    {
      icon: 'tabler-folder-check',
      title: 'Always updated package'
    },
    {
      icon: 'tabler-code',
      title: 'Optimised code structure'
    },
    {
      icon: 'tabler-lock',
      title: 'Pre define authentication'
    },
    {
      icon: 'tabler-git-branch',
      title: 'Clean folder structure to adapt'
    },
    {
      icon: 'tabler-toggle-right',
      title: 'Easy to switch themes'
    },
    {
      icon: 'tabler-components',
      title: 'Pluggable components'
    }
  ]
};

/***************************  BLOCK - FEATURE 21  ***************************/

export default function BlockFeature21() {
  return <Feature21 {...data} />;
}
