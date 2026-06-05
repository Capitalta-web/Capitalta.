// @project
import { Testimonial3 } from '@/blocks/testimonial';

/***************************  TESTIMONIAL 3 - DATA  ***************************/

const data = {
  heading: 'Success stories unveiled',
  caption: "Our CRM's positive impact on client experiences",
  testimonials: [
    {
      review: 'The user interface is intuitive, making it easy for our team to adapt and maximize productivity.',
      ratings: 4,
      profile: { avatar: '/assets/images/user/avatar2.png', name: 'Sydnie', role: 'Direct Optimization Executive' }
    },
    {
      review: 'Very easy to use. I am completely blown away. this is the real deal!',
      ratings: 3,
      profile: { avatar: '/assets/images/user/avatar1.png', name: 'Maria', role: 'SEO' }
    }
  ]
};

/***************************  BLOCK - TESTIMONIAL 3  ***************************/

export default function BlockTestimonial3() {
  return <Testimonial3 {...data} />;
}
