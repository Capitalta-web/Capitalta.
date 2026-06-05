// @project
import { Testimonial13 } from '@/blocks/testimonial';

/***************************  TESTIMONIAL 13 - DATA  ***************************/

const data = {
  heading: 'Customer success stories',
  primaryBtn: { children: 'Read all Reviews', sx: { textTransform: 'none' } },
  testimonials: [
    {
      review: `I've recommended this platform to colleagues, and they've all been impressed. It's versatile, efficient, and simply fantastic.`,
      profile: { avatar: '/assets/images/user/avatar6.png', name: 'Maria S', role: 'Marketing Specialist' }
    },
    {
      review: `As a tech enthusiast, I appreciate the innovation behind this platform. It's modern, sleek, and delivers on its promises.`,
      profile: { avatar: '/assets/images/user/avatar1.png', name: 'Emily P.', role: 'Software Developer' }
    },
    {
      review: 'The user interface is intuitive, making it easy for our team to adapt and maximize productivity.',
      profile: { avatar: '/assets/images/user/avatar2.png', name: 'Sydnie', role: 'Direct Optimization Executive' }
    },
    {
      review: 'Very easy to use. I am completely blown away. this is the real deal!',
      profile: { avatar: '/assets/images/user/avatar1.png', name: 'Maria', role: 'SEO' }
    },
    {
      review: 'The user interface is intuitive, making it easy for our team to adapt and maximize productivity.',
      profile: { avatar: '/assets/images/user/avatar2.png', name: 'Sydnie', role: 'Direct Optimization Executive' }
    },
    {
      review: 'Very easy to use. I am completely blown away. this is the real deal!',
      profile: { avatar: '/assets/images/user/avatar1.png', name: 'Maria', role: 'SEO' }
    }
  ]
};

/***************************  BLOCK - TESTIMONIAL 13  ***************************/

export default function BlockTestimonial13() {
  return <Testimonial13 {...data} />;
}
