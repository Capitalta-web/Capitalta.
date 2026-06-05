// @project
import { Blog3 } from '@/blocks/blog';

/***************************  BLOG 3 - DATA  ***************************/

const data = {
  heading: 'Resource center',
  caption: 'Discover the features that will transform your customer relationships',
  blogs: [
    {
      image: '/assets/images/blog/blog7.png',
      caption: 'Crafting a customer-centric content strategy.',
      link: { href: '#' },
      profile: { avatar: '/assets/images/user/avatar1.png', name: 'Emily Davis', role: 'Content Strategy Lead' }
    },
    {
      image: '/assets/images/blog/blog8.png',
      caption: 'Optimizing sales processes with data-driven insights.',
      link: { href: '#' },
      profile: { avatar: '/assets/images/user/avatar2.png', name: 'James Wilson', role: 'Sales Operations Manager' }
    }
  ]
};

/***************************  BLOCK - BLOG 3  ***************************/

export default function BlockBlog3() {
  return <Blog3 {...data} />;
}
