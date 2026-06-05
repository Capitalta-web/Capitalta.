export const pricing3 = {
  heading: 'Select your WordPress hosting plan',
  caption: 'Officially recommended by WordPress.org, our hosting services offer top-notch performance, AI tools, 24/7 support, and more.',
  defaultUnit: '/month',
  plans: [
    {
      title: 'Basic plan',
      description: 'Ideal for individuals and small businesses with basic data needs.',
      active: false,
      price: 19,
      features: [
        { id: 1, label: '15 GB NVMe Storage' },
        { id: 2, label: '2 GB RAM' },
        { id: 3, label: 'FREE SSL for all Websites' },
        { id: 6, label: 'Prepare for Launch Features' },
        { id: 9, label: '7 Daily Backups' }
      ],

      exploreLink: { children: 'Best for individuals', sx: { textTransform: 'none' } }
    },
    {
      title: 'Pro plan (Recommended)',
      description: 'Designed for growing businesses and teams with Modest data requirements.',
      active: true,
      price: 49,
      features: [
        { id: 1, label: '30 GB NVMe storage' },
        { id: 2, label: '4 GB RAM' },
        { id: 4, label: 'FREE SSL for all websites' },
        { id: 7, label: 'Prepare for launch features' },
        { id: 10, label: '14 Daily backups' }
      ],

      exploreLink: { children: 'Designed for growing businesses', sx: { textTransform: 'none' } }
    },
    {
      title: 'Enterprise plan',
      description: 'Tailored for large enterprise with high-volume data needs.',
      active: false,
      price: 99,
      features: [
        { id: 1, label: '40 GB NVMe storage' },
        { id: 2, label: '6 GB RAM' },
        { id: 5, label: 'FREE SSL for all websites' },
        { id: 8, label: 'Prepare for launch features' },
        { id: 11, label: '21 Daily backups' }
      ],

      exploreLink: { children: 'Tailored for large enterprise', sx: { textTransform: 'none' } }
    }
  ]
};

export const pricing8 = {
  heading: 'The Affordable Unfair Advantage',
  caption: 'Choose the plan that aligns with your cloud management requirements.',
  defaultUnit: 'per user/month',
  user: 'Best for 1-50 users',
  plans: [
    {
      animationDelay: 0.2,
      title: 'Free',
      description: 'Free for everyone',
      active: false,
      plan: 'Free Plan',
      exploreLink: { children: 'Get Started with free' },
      features: [
        { id: 1, label: 'Limited members' },
        { id: 2, label: '50 issues (+unlimited archived)' },
        { id: 3, label: 'No Import and No export' },
        { id: 4, label: 'All intergation, API, Webhooks' }
      ]
    },
    {
      animationDelay: 0.4,
      title: 'Standard',
      active: true,
      price: { monthly: 12, yearly: 8 },
      exploreLink: { children: 'Get Started with Standard' },
      features: [
        { id: 1, label: 'Unlimited members' },
        { id: 2, label: '150 issues (+unlimited archived)' },
        { id: 3, label: 'Import and No export' },
        { id: 4, label: 'All intergation, API, Webhooks' }
      ]
    },
    {
      animationDelay: 0.6,
      title: 'Plus',
      price: { monthly: 16, yearly: 12 },
      active: false,
      plan: 'Annual Billing Only',
      link: { children: 'Contact Us', href: '#' },
      exploreLink: { children: 'Get Started with Plus' },
      features: [
        { id: 1, label: 'Unlimited members' },
        { id: 2, label: '250+ issues (+unlimited archived)' },
        { id: 3, label: 'Import and export' },
        { id: 4, label: 'All intergation, API, Webhooks' }
      ]
    }
  ]
};

export const pricing5 = {
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
        { id: 1, label: 'Unlimited members' },
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
