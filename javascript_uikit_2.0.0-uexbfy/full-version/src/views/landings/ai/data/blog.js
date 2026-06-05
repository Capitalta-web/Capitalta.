// @project
import { LANDING_PATH } from '@/path';

export const blog = {
  heading: 'Resource center',
  caption: 'Discover the features that will transform your customer relationships.',
  blogs: [
    {
      animationDelay: 0.3,
      image: '/assets/images/ai/blog/blog1.png',
      caption: 'Crafting a customer-centric content strategy.',
      link: { href: `${LANDING_PATH.ai}/blog-details` },
      profile: { avatar: '/assets/images/user/avatar1.png', name: 'Tricia Wolf', role: 'Direct Optimization Executive' }
    },
    {
      animationDelay: 0.5,
      image: '/assets/images/ai/blog/blog3.png',
      caption: 'Optimizing sales processes with data-driven insights.',
      link: { href: `${LANDING_PATH.ai}/blog-details` },
      profile: { avatar: '/assets/images/user/avatar2.png', name: 'Bruno Mota', role: 'Sales Operations Manager' }
    }
  ]
};
