// @project
import { LANDING_PATH } from '@/path';

const blogImagePath = '/assets/images/hosting/blog';

export const blog5 = {
  heading: 'Resource center',
  caption: 'Discover the features that will transform your customer relationships.',
  viewMore: { children: 'View All' },
  blogs: [
    {
      image: `${blogImagePath}/blog1.jpg`,
      caption: 'The ultimate guide to website security: Best practices...',
      link: { href: `${LANDING_PATH.hosting}/blog-details` },
      date: '28 Jan 2024 · 5 Min Read'
    },
    {
      image: `${blogImagePath}/blog2.jpg`,
      caption: 'SEO strategies for boosting your website..',
      link: { href: `${LANDING_PATH.hosting}/blog-details` },
      date: '10 Feb 2024 · 8 Min Read'
    },
    {
      image: `${blogImagePath}/blog3.jpg`,
      caption: 'The importance of website speed and how..',
      link: { href: `${LANDING_PATH.hosting}/blog-details` },
      date: '25 Feb 2024 · 10 Min Read'
    }
  ]
};

export const blog2 = {
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
