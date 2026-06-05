// @project
import { Blog7 } from '@/blocks/blog';

/***************************  BLOG 7 - DATA  ***************************/

const data = {
  heading: 'Resource center',
  blogs: [
    {
      image: '/assets/images/blog/blog7.png',
      title: 'The power of SaaS and how it can revolutionize.',
      caption: 'Qui sint consectetur consequatur repudiandae. Quae enim autem',
      link: { children: 'Read More', href: '#' }
    },
    {
      image: '/assets/images/graphics/ai/background1.svg',
      title: 'Maximize efficiency and productivity company.',
      caption: 'Vel dolor doloribus commodi dicta suscipit blanditiis.',
      link: { children: 'Read More', href: '#' }
    },
    {
      image: '/assets/images/blog/blog8.png',
      title: 'The power of SaaS and how it can revolutionize.',
      caption: 'Qui sint consectetur consequatur repudiandae. Quae enim autem',
      link: { children: 'Read More', href: '#' }
    }
  ]
};

/***************************  BLOCK - BLOG 7  ***************************/

export default function BlockBlog7() {
  return <Blog7 {...data} />;
}
