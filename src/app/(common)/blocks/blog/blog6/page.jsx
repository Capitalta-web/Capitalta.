// @project
import { Blog6 } from '@/blocks/blog';

/***************************  BLOG 6 - DATA  ***************************/

const data = {
  heading: 'Resources for strategic growth',
  caption: 'Discover the features that will transform your customer relationships.',
  exploreMore: { children: 'Explore all Blog', sx: { textTransform: 'none' } },
  blogs: [
    {
      heading: 'Design',
      title: 'The power of SaaS',
      image: '/assets/images/blog/blog9.jpg',
      caption: 'Enhance teamwork with real-time sharing, updates, and communication features.',
      date: '24 Jan 2024',
      link: { href: '#' }
    },
    {
      heading: 'Business',
      title: 'Behind the wheel: Stories',
      image: '/assets/images/blog/blog3.jpg',
      caption: 'Tales of journeys, encounters, and life-changing moments on the road.',
      date: '30 Jan 2024',
      link: { href: '#' }
    },
    {
      heading: 'Updates',
      title: 'The green road ahead',
      image: '/assets/images/blog/blog10.jpg',
      caption: 'Paving the way to a sustainable and eco-friendly future.',
      date: '05 Feb 2024',
      link: { href: '#' }
    }
  ]
};

/***************************  BLOCK - BLOG 6  ***************************/

export default function BlockBlog6() {
  return <Blog6 {...data} />;
}
