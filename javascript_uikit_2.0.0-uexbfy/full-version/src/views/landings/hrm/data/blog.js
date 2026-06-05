const blogImagePath = '/assets/images/blog';

export const blog = {
  heading: 'Resources for strategic growth',
  caption: 'Explore the latest trends, tips, and best practices in HR and workforce management.',
  blogs: [
    {
      image: `${blogImagePath}/blog1.png`,
      caption: 'Navigating the digital highway: Technology trends reshaping the trucking industry',
      chips: ['Technology'],
      link: { href: '#' },
      date: '24 Jan 2024'
    },
    {
      image: `${blogImagePath}/blog6.png`,
      caption: 'Sustainable practices: The future of eco-friendly supply chains',
      chips: ['Business', 'Productivity'],
      link: { href: '#' },
      date: '12 Feb 2024'
    },
    {
      image: `${blogImagePath}/blog4.jpg`,
      caption: 'Harnessing the power of AI: Innovations in the logistics sector',
      chips: ['Business', 'AI'],
      link: { href: '#' },
      date: '19 Feb 2024'
    },
    {
      image: `${blogImagePath}/blog2.jpg`,
      caption: 'Global trade dynamics: Exploring new markets and opportunities',
      chips: ['Trade', 'Market'],
      link: { href: '#' },
      date: '26 Feb 2024'
    }
  ],
  exploreMore: { children: 'Explore all Blog', sx: { textTransform: 'none' } }
};
