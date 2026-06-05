// @project
import { Pricing7 } from '@/blocks/pricing';

/***************************  PRICING 7 - DATA  ***************************/

const data = {
  heading: 'Flexible pricing plans',
  caption: 'Choose the plan that aligns with your cloud management requirements.',
  defaultUnit: '/mth',
  plans: {
    title: 'Heavy plan',
    description: 'Our everything included plan. includes 5 users to get you started.',
    active: true,
    price: { monthly: 109, yearly: 99 },
    features: [
      { id: 1, label: 'Includes 5 users' },
      { id: 2, label: 'Access to basic feature' },
      { id: 3, label: 'Additional user at ', badge: '$45/m per user' },
      { id: 4, label: 'Basic reporting & analytics' },
      { id: 5, label: 'Up to 10 individual users' },
      { id: 6, label: 'Up to 10 individual users' },
      { id: 7, label: '40 GB individual data users' },
      { id: 8, label: '10,000 Visitor' }
    ],
    exploreLink: { children: 'Book a Demo', sx: { textTransform: 'none' } }
  },
  benefitList: [
    {
      icon: 'tabler-mail',
      title: 'Share team inboxes',
      description: 'Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.'
    },
    {
      icon: 'tabler-sparkles',
      title: 'Deliver instant answers',
      description: 'An all-in-one customer service platform that helps you balance everything your customers need to be happy.'
    },
    {
      icon: 'tabler-notebook',
      title: 'Manage your team with reports',
      description:
        'Measure what matters with Untitled’s easy-to-use reports. You can filter, export, and drilldown on the data in a couple clicks.'
    }
  ]
};

/***************************  BLOCK - PRICING 7  ***************************/

export default function BlockPricing7() {
  return <Pricing7 {...data} />;
}
