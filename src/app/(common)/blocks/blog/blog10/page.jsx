import Blog10 from '@/blocks/blog/Blog10';

/***************************  BLOG 10 - DATA  ***************************/

const data = {
  headLine: 'Resource center',
  captionLine: 'Discover the features that will transform your customer relationships.',
  blog: {
    profile: { avatar: '/assets/images/user/avatar2.png', name: 'James Wilson', role: 'Direct Optimization Executive' },
    chips: ['Business', 'Technologies'],
    caption: 'Top CRM solutions for real estate success in 2024',
    date: 'Published on May 04, 2025',
    link: { children: 'Read More', href: '#' },
    image: '/assets/images/blog/blog7.png',
    imagePosition: { backgroundPosition: 'right center' }
  },
  blogs: [
    {
      image: '/assets/images/blog/blog8.png',
      chips: ['Update'],
      caption: '11 Best CRM for Sales Teams and Startups in 2024',
      link: { href: '#' },
      date: 'Published on April 28, 2025',
      imagePosition: { backgroundPosition: 'bottom center', backgroundSize: '175%' }
    },
    {
      image: '/assets/images/blog/blog8.png',
      chips: ['Design', 'Productivity'],
      caption: 'Understanding the Power of Real-Time Analytics',
      link: { href: '#' },
      date: 'Published on April 16, 2025',
      imagePosition: { backgroundPosition: 'top center', backgroundSize: '175%' }
    },
    {
      image: '/assets/images/blog/blog7.png',
      chips: ['Business'],
      caption: 'The Benefits of Integrating Social Media Marketing',
      link: { href: '#' },
      date: 'Published on April 02, 2025',
      imagePosition: { backgroundPosition: 'left center', backgroundSize: '250%' }
    }
  ]
};

/***************************  BLOCK - BLOG 10  ***************************/

export default function BlockBlog10() {
  return <Blog10 {...data} />;
}
