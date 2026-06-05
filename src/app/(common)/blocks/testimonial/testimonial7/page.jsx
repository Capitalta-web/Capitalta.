// @project
import branding from '@/branding.json';
import { Testimonial7 } from '@/blocks/testimonial';

/***************************  TESTIMONIAL 7 - DATA  ***************************/

const data = {
  heading: `What makes ${branding.brandName} stand out? Let users spill the beans in their testimonials!`,
  primaryBtn: { children: 'Get Started - It’s Free Now' },
  testimonials: [
    {
      review: 'The user interface is intuitive, making it easy for our team to adapt.',
      ratings: 4,
      profile: { avatar: '/assets/images/user/avatar2.png', name: 'Sydnie D.', role: 'Direct Optimization Executive' }
    },
    {
      review: 'The user interface is intuitive, making it easy for our team to adapt.',
      ratings: 3,
      profile: { avatar: '/assets/images/user/avatar1.png', name: 'Jeffrey Rath', role: 'Business Analyst' }
    },
    {
      review: `The user interface is intuitive, making it easy for our team to adapt.`,
      ratings: 2,
      profile: { avatar: '/assets/images/user/avatar3.png', name: 'Tech Savvy Pro', role: 'UI/UX Designer' }
    }
  ]
};

/***************************  BLOCK - TESTIMONIAL 7  ***************************/

export default function BlockTestimonial7() {
  return <Testimonial7 {...data} />;
}
