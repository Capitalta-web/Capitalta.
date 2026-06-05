export const pricing5 = {
  heading: 'The affordable unfair advantage',
  caption: 'Choose the plan that aligns with your cloud management requirements.',
  defaultUnit: '/month',
  plans: [
    {
      title: 'Starter',
      description: 'Free for everyone',
      active: false,
      price: 47,
      plan: 'Free Plan',
      captionContent: {
        icon: 'tabler-sparkles',
        primary: 'Ideal for self-funded startups'
      },
      exploreLink: { children: 'Try for Free', sx: { textTransform: 'none' } },
      features: [
        { id: 1, label: 'Unlimited members' },
        { id: 2, label: '250 issues (+unlimited archived)' },
        { id: 3, label: 'Import and export' },
        { id: 4, label: 'All intergation, API, Webhooks' }
      ]
    },
    {
      title: 'Growth',
      active: true,
      price: { monthly: 20, yearly: 107 },
      captionContent: {
        icon: 'tabler-sparkles',
        primary: 'For fast-growing businesses'
      },
      exploreLink: { children: 'Try for Free', sx: { textTransform: 'none' } },
      features: [
        { id: 1, label: 'Unlimited members' },
        { id: 2, label: '250 issues (+unlimited archived)' },
        { id: 3, label: 'Import and export' },
        { id: 4, label: 'All intergation, API, Webhooks' }
      ]
    },
    {
      title: 'Elite',
      price: 217,
      active: false,
      plan: 'Annual Billing Only',
      link: { children: 'Contact us', href: '#', scroll: false },
      captionContent: {
        icon: 'tabler-sparkles',
        primary: 'Ideal for large enterprise'
      },
      exploreLink: { children: 'Try for Free', sx: { textTransform: 'none' } },
      features: [
        { id: 1, label: 'Unlimited members' },
        { id: 2, label: '250+ issues (+unlimited archived)' },
        { id: 3, label: 'Import and export' },
        { id: 4, label: 'All intergation, API, Webhooks' }
      ]
    }
  ]
};
