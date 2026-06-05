// @project
import { Pricing4 } from '@/blocks/pricing';

/***************************  PRICING 4 - DATA  ***************************/

const data = {
  heading: 'Flexible pricing plans',
  caption: 'Choose the plan that aligns with your cloud management requirements.',
  defaultUnit: '/mth',
  plans: [
    {
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
        { id: 8, label: '10,000 visitor' }
      ],
      exploreLink: { children: 'Try for Free', sx: { textTransform: 'none' } }
    },
    {
      title: 'Customize plan',
      description: 'Our everything included plan. includes 5 users to get you started.',
      active: false,
      features: [
        { id: 1, label: 'Custom pricing' },
        { id: 2, label: 'Custom onboarding support' },
        { id: 3, label: 'Multi-location support' },
        { id: 4, label: 'Custom integration' }
      ],
      exploreLink: { children: 'Contact us', sx: { textTransform: 'none' } }
    }
  ]
};

/***************************  BLOCK - PRICING 4  ***************************/

export default function BlockPricing4() {
  return <Pricing4 {...data} />;
}
