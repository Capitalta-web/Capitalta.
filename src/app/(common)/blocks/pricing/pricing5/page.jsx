// @project
import { Pricing5 } from '@/blocks/pricing';

/***************************  PRICING 5 - DATA  ***************************/

const data = {
  heading: 'The affordable unfair advantage',
  caption: 'Choose the plan that aligns with your cloud management requirements.',
  defaultUnit: 'per user/month',
  plans: [
    {
      title: 'Free',
      description: 'Free for everyone',
      active: false,
      plan: 'Free Plan',
      captionContent: {
        icon: 'tabler-users',
        primary: 'Best for 1-50 users'
      },
      exploreLink: { children: 'Get Started with Free', sx: { textTransform: 'none' } },
      features: [
        { id: 1, label: 'Limited members' },
        { id: 2, label: '50 issues (+unlimited archived)' },
        { id: 3, label: 'No Import and No export' },
        { id: 4, label: 'All intergation, API, Webhooks' }
      ]
    },
    {
      title: 'Standard',
      active: true,
      price: { monthly: 12, yearly: 8 },
      captionContent: {
        icon: 'tabler-users',
        primary: 'Best for 1-50 users'
      },
      exploreLink: { children: 'Get Started with Standard', sx: { textTransform: 'none' } },
      features: [
        { id: 1, label: 'Unlimited members' },
        { id: 2, label: '150 issues (+unlimited archived)' },
        { id: 3, label: 'Import and No export' },
        { id: 4, label: 'All intergation, API, Webhooks' }
      ]
    },
    {
      title: 'Plus',
      price: 6,
      active: false,
      plan: 'Annual Billing Only',
      link: { children: 'Contact us', href: '#' },
      captionContent: {
        icon: 'tabler-users',
        primary: 'Best for 1-50 users'
      },
      exploreLink: { children: 'Get Started with Plus', sx: { textTransform: 'none' } },
      features: [
        { id: 1, label: 'Unlimited members' },
        { id: 2, label: '250+ issues (+unlimited archived)' },
        { id: 3, label: 'Import and export' },
        { id: 4, label: 'All intergation, API, Webhooks' }
      ]
    }
  ]
};

/***************************  BLOCK - PRICING 5  ***************************/

export default function BlockPricing5() {
  return <Pricing5 {...data} />;
}
