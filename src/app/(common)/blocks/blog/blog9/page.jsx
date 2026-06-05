// @project
import { Blog9 } from '@/blocks/blog';

/***************************  BLOG 9 - DATA  ***************************/

const data = {
  heading: 'Recent blog & articles',
  caption: 'Fresh ideas, insightful stories, and the latest updates—all in one place.',
  exploreMore: { children: 'Explore All Blog' },
  blogs: [
    {
      title: 'The Power of SaaS',
      image: '/assets/images/blog/blog9.jpg',
      caption: 'Qui sint consectetur consequatur repudiandae. Quae enim autem consectetur',
      date: '24 Jan 2024',
      link: { children: 'Read More', href: '#' }
    },
    {
      title: 'The green road ahead',
      image: '/assets/images/blog/blog10.jpg',
      caption: 'Vel dolor doloribus commodi dicta suscipit blanditiis. ',
      date: '24 Jan 2024',
      link: { children: 'Read More', href: '#' }
    },
    {
      title: 'Behind the wheel: Stories',
      image: '/assets/images/blog/blog3.jpg',
      caption: 'Qui sint consectetur consequatur repudiandae. Quae enim autem',
      date: '30 Jan 2024',
      link: { children: 'Read More', href: '#' }
    },
    {
      title: 'Maximize efficiency',
      image: '/assets/images/blog/blog1.png',
      caption: 'Vel dolor doloribus commodi dicta suscipit blanditiis.',
      date: '30 Jan 2024',
      link: { children: 'Read More', href: '#' }
    }
  ]
};

/***************************  BLOCK - BLOG 9  ***************************/

export default function BlockBlog9() {
  return <Blog9 {...data} />;
}
