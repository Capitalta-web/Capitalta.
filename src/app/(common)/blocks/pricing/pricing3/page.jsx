// @project
import { Pricing3 } from '@/blocks/pricing';

/***************************  PRICING 3 - DATA  ***************************/

const data = {
  heading: 'Our pricing that’s simple with no hidden fees',
  caption: 'Discover the features that will transform your customer relationships.',
  defaultUnit: '/month',
  plans: [
    {
      title: 'Basic plan',
      description: 'Ideal for individuals and small businesses with basic data needs.',
      active: false,
      price: 19,
      icon: 'tabler-award',
      features: [
        { id: 1, label: 'Access to basic feature' },
        { id: 2, label: 'Basic reporting & analytics' },
        { id: 3, label: 'Up to 10 individual users' },
        { id: 6, label: '5 GB individual data users' },
        { id: 9, label: '100 visitor' }
      ],
      about:
        '*Get started with our Basic Plan for essential data needs. Perfect for individuals and small businesses looking for reliable data solutions.',
      exploreLink: { children: 'Best for individuals', sx: { textTransform: 'none' } }
    },
    {
      title: 'Pro plan (Recommended)',
      description: 'Designed for growing businesses and teams with moderate data requirements.',
      active: true,
      price: 49,
      icon: 'tabler-briefcase',
      features: [
        { id: 1, label: 'Access to basic feature' },
        { id: 2, label: 'Basic reporting & analytics' },
        { id: 4, label: 'Up to 100 individual users' },
        { id: 7, label: '15 GB individual Data users' },
        { id: 10, label: '1,000 visitor' }
      ],
      about: '*Great for teams and growing businesses. Get more features, higher limits, and priority support to help you do more, faster.',
      exploreLink: { children: 'Designed for growing businesses', sx: { textTransform: 'none' } }
    },
    {
      title: 'Enterprise plan',
      description: 'Tailored for large enterprise with high-volume data needs and specialized requirements.',
      active: false,
      price: 99,
      icon: 'tabler-building-factory-2',
      features: [
        { id: 1, label: 'Access to basic feature' },
        { id: 2, label: 'Basic reporting & analytics' },
        { id: 5, label: 'Up to 1k individual users' },
        { id: 8, label: '40 GB individual data users' },
        { id: 11, label: '10,000 visitor' }
      ],
      about:
        '*For large enterprise with high-volume data needs and specialized requirements, our Enterprise Plan offers unlimited data usage and 24/7 dedicated support.',
      exploreLink: { children: 'Tailored for large enterprise', sx: { textTransform: 'none' } }
    }
  ]
};

/***************************  BLOCK - PRICING 3  ***************************/

export default function BlockPricing3() {
  return <Pricing3 {...data} />;
}
