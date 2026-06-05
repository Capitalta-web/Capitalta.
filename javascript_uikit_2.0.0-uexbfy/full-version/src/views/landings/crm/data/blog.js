// @project
import { LANDING_PATH } from '@/path';

export const blog = {
  heading: 'Knowledge center',
  caption: 'Uncover the features that will revolutionize your customer relationships',
  blogs: [
    {
      image: '/assets/images/crm/blog/blog1.png',
      caption: `Selecting the ideal CRM for precise estimates.`,
      link: { href: `${LANDING_PATH.crm}/blog-details` }
    },
    {
      image: '/assets/images/crm/blog/blog6.png',
      caption: 'Unlocking success: your essential CRM guide',
      link: { href: `${LANDING_PATH.crm}/blog-details` }
    },
    {
      image: '/assets/images/crm/blog/blog4.jpg',
      caption: 'The Role of AI in Modern CRM Systems',
      link: { href: `${LANDING_PATH.crm}/blog-details` }
    },
    {
      image: '/assets/images/crm/blog/blog2.jpg',
      caption: `Selecting the ideal CRM for precise estimates.`,
      link: { href: `${LANDING_PATH.crm}/blog-details` }
    },
    {
      image: '/assets/images/crm/blog/blog5.png',
      caption: 'Unlocking success: your essential CRM guide',
      link: { href: `${LANDING_PATH.crm}/blog-details` }
    },
    {
      image: '/assets/images/crm/blog/blog3.jpg',
      caption: 'The role of AI in modern CRM systems',
      link: { href: `${LANDING_PATH.crm}/blog-details` }
    }
  ]
};

export const blog3 = {
  heading: 'Resource center',
  caption: 'Discover the features that will transform your customer relationships.',
  blogs: [
    {
      animationDelay: 0.3,
      image: '/assets/images/blog/blog7.png',
      caption: 'Crafting a customer-centric content strategy.',
      link: { href: `${LANDING_PATH.crm}/blog-details`, scroll: false },
      profile: { avatar: '/assets/images/user/avatar1.png', name: 'Tricia Wolf', role: 'Direct Optimization Executive' }
    },
    {
      animationDelay: 0.5,
      image: '/assets/images/blog/blog8.png',
      caption: 'Optimizing sales processes with data-driven insights.',
      link: { href: `${LANDING_PATH.crm}/blog-details`, scroll: false },
      profile: { avatar: '/assets/images/user/avatar2.png', name: 'Bruno Mota', role: 'Sales Operations Manager' }
    }
  ]
};
