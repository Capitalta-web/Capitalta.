// @project
import { BUY_NOW_URL } from '@/path';

export const pricing = {
  heading: 'Clear and transparent pricing, no hidden fees',
  caption: 'Model is straightforward and transparent, ensuring no unexpected fees or charges.',
  defaultUnit: '/month',
  plans: [
    {
      animationDelay: 0.2,
      title: 'Basic plan',
      description: 'Ideal for individuals and small businesses with basic data needs.',
      active: false,
      icon: 'tabler-award',
      price: 19,
      features: [
        {
          id: 1,
          label: 'Email marketing '
        },
        {
          id: 2,
          label: 'Marketing, sales, workflow'
        },
        {
          id: 3,
          label: 'Up to 10 individual users'
        },
        {
          id: 4,
          label: 'Up to 3 seats'
        },
        {
          id: 5,
          label: 'Lead managements'
        }
      ],
      about:
        '*For smaller teams seeking to streamline sales, marketing, and basic business processes through automation, a user-friendly CRM solution is ideal.',
      exploreLink: {
        children: 'Best for individuals',
        href: BUY_NOW_URL,
        target: '_blank',
        rel: 'noopener noreferrer',
        sx: { textTransform: 'none' }
      }
    },
    {
      animationDelay: 0.4,
      title: 'Pro plan (Recommended)',
      description: 'Designed for growing businesses and teams with moderate data requirements.',
      active: true,
      icon: 'tabler-briefcase',
      price: 49,
      features: [
        {
          id: 1,
          label: 'Advanced lead optimization'
        },
        {
          id: 2,
          label: 'Enhanced landing pages & sales'
        },
        {
          id: 3,
          label: 'Ecommerce tools'
        },
        {
          id: 4,
          label: 'Advanced reporting'
        },
        {
          id: 5,
          label: 'No seat limits'
        }
      ],
      about:
        '*For teams aiming to expand rapidly and requiring sophisticated ecommerce and reporting functionalities, a CRM solution with advanced features is indispensable.',
      exploreLink: {
        children: 'Designed for growing businesses',
        href: BUY_NOW_URL,
        target: '_blank',
        rel: 'noopener noreferrer',
        sx: { textTransform: 'none' }
      }
    },
    {
      animationDelay: 0.6,
      title: 'Enterprise plan',
      description: 'Tailored for large enterprise with high-volume data needs and specialized requirements.',
      active: false,
      icon: 'tabler-building-factory-2',
      price: 99,
      features: [
        {
          id: 1,
          label: 'Premium CRM & sales manage'
        },
        {
          id: 2,
          label: 'Advanced marketing & sales tools'
        },
        {
          id: 5,
          label: 'Custom user access control'
        },
        {
          id: 8,
          label: 'Affiliate management & Collaboration'
        },
        {
          id: 11,
          label: 'Priority Support'
        }
      ],
      about:
        '*For large enterprise with high-volume data needs and specialized requirements, our Enterprise Plan offers unlimited data usage and 24/7 dedicated support.',
      exploreLink: {
        children: 'Tailored for large enterprise',
        href: BUY_NOW_URL,
        target: '_blank',
        rel: 'noopener noreferrer',
        sx: { textTransform: 'none' }
      }
    }
  ]
};

export const pricing2 = {
  features: [
    { id: 1, label: 'Unlimited members' },
    { id: 2, label: '250 issues (+unlimited archived)' },
    { id: 3, label: 'Import and export' },
    { id: 4, label: 'All intergation, API, Webhooks' },
    { id: 5, label: 'Enim nunc faucibus a ' },
    { id: 6, label: 'All intergation, API, Webhooks' },
    { id: 7, label: 'Import and export' },
    { id: 8, label: 'Unlimited members' },
    { id: 9, label: 'Enim nunc faucibus a ' },
    { id: 10, label: 'Import and export' },
    { id: 11, label: 'All intergation, API, Webhooks' }
  ],
  plans: [
    {
      title: 'Basic',
      description: 'Tailored for large enterprise with high-volume data needs.',
      active: false,
      price: { monthly: 'Free', yearly: 99 },
      features: [1, 3, 4, 7, 10],
      about:
        '*Get started with our Basic Plan for essential data needs. Perfect for individuals and small businesses looking for reliable data solutions.',
      exploreLink: { children: 'Best for individuals', sx: { textTransform: 'none' } }
    },
    {
      title: 'Standard',
      description: 'Tailored for large enterprise with high-volume data needs.',
      active: true,
      price: { monthly: 8, yearly: 299 },
      features: [1, 3, 4, 5, 6, 7, 10],
      about:
        '*Get started with our Basic Plan for essential data needs. Perfect for individuals and small businesses looking for reliable data solutions.',
      exploreLink: { children: 'Designed for growing businesses', sx: { textTransform: 'none' } }
    },
    {
      title: 'Plus',
      description: 'Tailored for large enterprise with high-volume data needs.',
      active: false,
      price: { monthly: 14, yearly: 599 },
      features: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      about:
        '*For large enterprise with high-volume data needs and specialized requirements, our Enterprise Plan offers unlimited data usage and 24/7 dedicated support.',
      exploreLink: { children: 'Tailored for large enterprise', sx: { textTransform: 'none' } }
    }
  ]
};
