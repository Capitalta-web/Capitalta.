// @project
import { BUY_NOW_URL } from '@/path';

const linkProps = { target: '_blank', rel: 'noopener noreferrer' };

export const pricing = {
  heading: 'The affordable unfair advantage',
  caption: 'Choose the plan that aligns with your SaaS product requirements.',
  features: [
    { id: 1, label: 'One end product' },
    { id: 2, label: 'UI kit & Admin interface' },
    { id: 3, label: '1 year free updates' },
    { id: 4, label: '6 months of support' },
    { id: 5, label: 'Lifetime license' },
    { id: 6, label: 'Next.js JavaScript' },
    { id: 7, label: 'Next.js TypeScript' },
    { id: 8, label: 'Figma design system' },
    { id: 9, label: 'Use for SaaS end product' }
  ],
  plans: [
    {
      title: 'Standard',
      price: 69,
      active: false,
      featureTitle: 'Includes',
      content: 'Learn more about the standard',
      contentLink: { children: 'license', href: 'https://mui.com/store/license/', ...linkProps },
      exploreLink: { children: 'Get Started', href: BUY_NOW_URL, ...linkProps },
      featuresID: [1, 2, 3, 4, 5, 6]
    },
    {
      title: 'Plus',
      active: true,
      price: 129,
      featureTitle: 'Recommended',
      content: 'Learn more about the standard',
      contentLink: { children: 'license', href: 'https://mui.com/store/license/', ...linkProps },
      exploreLink: { children: 'Get Started', href: BUY_NOW_URL, ...linkProps },
      featuresID: [1, 2, 3, 4, 5, 6, 7, 8]
    },
    {
      title: 'Extended',
      price: 599,
      active: false,
      featureTitle: 'Includes',
      content: 'Learn more about the standard',
      contentLink: { children: 'license', href: 'https://mui.com/store/license/', ...linkProps },
      link: { children: 'Contact us', href: '/contact', sx: { textTransform: 'none' } },
      exploreLink: { children: 'Get Started', href: BUY_NOW_URL, ...linkProps },
      featuresID: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
  ]
};
