// @project
import { Pricing10 } from '@/blocks/pricing';

/***************************  PRICING 10 - DATA  ***************************/

const data = {
  heading: 'Your part to premium plans and pricing',
  caption: 'Discover tailored pricing designed for flexibility, quality, and enhanced features.',
  plans: [
    {
      title: 'Standard',
      icon: 'tabler-award',
      description:
        'Elevate your digital asset security and management with a comprehensive suite of essential features, all in one solution.',
      active: false,
      price: { month: 19, year: 299 },
      features: [
        { id: 2, label: 'Access to Basic Feature' },
        { id: 4, label: 'Basic Reporting & Analytics' },
        { id: 5, label: 'Up to 10 Individual Users' },
        { id: 6, label: '40 GB Individual Data Users' },
        { id: 7, label: '10,000 Visitor' }
      ],
      exploreLink: { children: 'Get Started' }
    },
    {
      title: 'Professional',
      icon: 'tabler-briefcase',
      description:
        'Elevate your digital asset security and management with a comprehensive suite of essential features, all in one solution.',
      active: true,
      price: { month: 49, year: 499 },
      features: [
        { id: 1, label: 'Access to Advanced Feature' },
        { id: 2, label: 'Advanced Reporting & Analytics' },
        { id: 3, label: 'Up to 15 Individual Users' },
        { id: 4, label: '80 GB Individual Data Users' },
        { id: 5, label: '30,000 Visitor' }
      ],
      exploreLink: { children: 'Get Started' }
    }
  ]
};

/***************************  BLOCK - PRICING 10  ***************************/

export default function BlockPricing10() {
  return <Pricing10 {...data} />;
}
