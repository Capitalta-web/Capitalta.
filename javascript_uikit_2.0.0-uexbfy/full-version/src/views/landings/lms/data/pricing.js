export const pricing = {
  heading: 'Explore our Popular Courses?',
  caption: 'Choose the plan that aligns with your cloud management requirements.',
  defaultUnit: '/month',
  plans: [
    {
      title: 'Basic',
      description: 'Free for everyone',
      active: false,
      plan: 'Free Plan',
      price: 399,
      exploreLink: { children: 'Buy Now' },
      features: [
        { id: 1, label: '12+ Courses' },
        { id: 2, label: 'For One Person Uses Only' },
        { id: 3, label: '25+ Article Free' },
        { id: 4, label: 'No Social Media Activity' }
      ]
    },
    {
      title: 'Standard',
      active: true,
      plan: 'Monthly',
      price: 599,
      exploreLink: { children: 'Buy Now' },
      features: [
        { id: 1, label: 'All Courses' },
        { id: 2, label: 'For 10+ Person Uses Only' },
        { id: 3, label: '150+ Article Free' },
        { id: 4, label: 'Social Media Activity' }
      ]
    },
    {
      title: 'Plus',
      price: 799,
      active: false,
      plan: 'Annual Billing Only',
      link: { children: 'Contact Us', href: '#' },
      exploreLink: { children: 'Buy Now' },
      features: [
        { id: 1, label: 'All Courses' },
        { id: 2, label: 'For Unlimited Person Uses Only' },
        { id: 3, label: '250+ Article Free' },
        { id: 4, label: 'Social Media Activity' }
      ]
    }
  ]
};
