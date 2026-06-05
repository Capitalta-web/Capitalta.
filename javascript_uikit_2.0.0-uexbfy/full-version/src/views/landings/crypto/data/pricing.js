export const pricing = {
  heading: 'Flexible pricing plans',
  caption: 'Choose a plan that suits your needs and scale with flexibility.',
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
        { id: 7, label: '15 GB individual data users' },
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

export const pricing7 = {
  defaultUnit: '/mth',
  plans: {
    title: 'Popular',
    description: 'For serious learner',
    active: true,
    price: { monthly: 109, yearly: 99 },
    features: [
      { id: 1, label: 'Daily crypto market insights & updates' },
      { id: 2, label: 'Weekly crypto strategy webinars' },
      { id: 3, label: 'Exclusive access to real-time crypto signals ' },
      { id: 4, label: 'Advanced crypto learning modules' },
      { id: 5, label: 'Live crypto trading sessions with experts' },
      { id: 6, label: 'Exclusive crypto skill-building workshops' },
      { id: 7, label: '24/7 discord access for crypto discussions' },
      { id: 8, label: '1 on 1 crypto mentorship' }
    ],
    exploreLink: { children: 'Get Started Today' }
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
