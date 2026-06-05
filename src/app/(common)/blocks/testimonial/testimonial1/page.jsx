// @project
import { Testimonial1 } from '@/blocks/testimonial';

/***************************  TESTIMONIAL 1 - DATA  ***************************/

const data = {
  heading: 'Success stories unveiled',
  caption: "Our CRM's positive impact on client experiences",
  testimonials: [
    {
      bgImage: '/assets/images/testimonial/avatar-bg2.svg',
      videoSrc: '/assets/videos/test.mp4',
      review: 'Our sales have increased by 30% since we started using this CRM. It’s an invaluable tool for our business.',
      ratings: 4,
      profile: { avatar: '/assets/images/user/avatar1.png', name: 'Maria', role: 'Direct Optimization Executive' }
    },
    {
      review: 'The user interface is intuitive, making it easy for our team to adapt.',
      ratings: 2,
      profile: { avatar: '/assets/images/user/avatar4.png', name: 'Sydnie', role: 'Designer' }
    },
    {
      review: 'Very easy to use. I am completely blown away. this is the real deal!',
      ratings: 3,
      profile: { avatar: '/assets/images/user/avatar3.png', name: 'Jone D', role: 'Digital Marketer' }
    }
  ],
  link: { children: 'View all', href: '#', sx: { textTransform: 'none' } }
};

/***************************  BLOCK - TESTIMONIAL 1  ***************************/

export default function BlockTestimonial1() {
  return <Testimonial1 {...data} />;
}
