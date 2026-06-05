// @project
import { Pricing6 } from '@/blocks/pricing';

/***************************  PRICING 6 - DATA  ***************************/

const data = {
  heading: 'Our pricing that’s simple with no hidden fees',
  caption: 'Discover the features that will transform your customer relationships.',
  features: [
    { id: 1, label: 'Unlimited user accounts' },
    { id: 2, label: 'Customizable dashboards' },
    { id: 3, label: 'Advanced reporting' },
    { id: 4, label: 'Priority support' },
    { id: 5, label: 'API access' },
    { id: 6, label: 'Integration with CRM' },
    { id: 7, label: 'Mobile app support' },
    { id: 8, label: 'Real-time notifications' },
    { id: 9, label: 'Multi-language support' },
    { id: 10, label: 'Custom branding' },
    { id: 11, label: 'Single sign-on (SSO)' }
  ],
  plans: [
    {
      title: 'Basic',
      icon: 'tabler-award',
      description: 'Per active team member/month',
      defaultUnit: 'US$',
      price: 2.5,
      features: [1, 5, 6, 11],
      exploreLink: { children: 'Book a Demo', sx: { textTransform: 'none' } }
    },
    {
      title: 'Business',
      icon: 'tabler-briefcase',
      description: 'Per active team member/month',
      active: 'POPULAR',
      price: 3.5,
      defaultUnit: 'US$',
      features: [1, 5, 6, 7, 8, 9, 11],
      exploreLink: { children: 'Book a Demo', sx: { textTransform: 'none' } }
    },
    {
      title: 'Essential',
      icon: 'tabler-building-factory-2',
      description: 'Let’s discuss your requirements.',
      defaultUnit: "Let's talk",
      features: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      exploreLink: { children: 'Request Pricing' }
    }
  ]
};

/***************************  BLOCK - PRICING 6  ***************************/

export default function BlockPricing6() {
  return <Pricing6 {...data} />;
}
