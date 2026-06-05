// @project
import { Blog2 } from '@/blocks/blog';

/***************************  BLOG 2 - DATA  ***************************/

const data = {
  heading: 'Resource center',
  caption: 'Discover the features that will transform your customer relationships.',
  blogs: [
    {
      image: '/assets/images/blog/blog1.png',
      caption: 'The power of SaaS and how it can revolutionize.',
      link: { href: '#' }
    },
    {
      image: '/assets/images/blog/blog6.png',
      caption: 'Navigating the future of AI and machine learning.',
      link: { href: '#' }
    },
    {
      image: '/assets/images/blog/blog4.jpg',
      caption: 'Best practices for scaling your startup.',
      link: { href: '#' }
    },
    {
      image: '/assets/images/blog/blog2.jpg',
      caption: 'Crafting a customer-centric content strategy.',
      link: { href: '#' }
    },
    {
      image: '/assets/images/blog/blog5.png',
      caption: 'Optimizing sales processes with data-driven insights.',
      link: { href: '#' }
    },
    {
      image: '/assets/images/blog/blog3.jpg',
      caption: 'Designing user experiences that delight customers.',
      link: { href: '#' }
    }
  ]
};

/***************************  BLOCK - BLOG 2  ***************************/

export default function BlockBlog2() {
  return <Blog2 {...data} />;
}
