// @project
import { Testimonial2 } from '@/blocks/testimonial';

/***************************  TESTIMONIAL 2 - DATA  ***************************/

const data = {
  heading: 'Success stories unveiled',
  caption: "Our CRM's positive impact on client experiences",
  testimonials: [
    {
      bgImage: '/assets/images/testimonial/avatar-bg2.svg',
      videoSrc: '/assets/videos/test.mp4',
      review: 'Very easy to use. I am completely blown away. this is the real deal!',
      ratings: 4,
      profile: { avatar: '/assets/images/user/avatar2.png', name: 'Sydnie', role: 'Direct Optimization Executive' }
    },
    {
      bgImage: '/assets/images/testimonial/avatar-bg1.svg',
      videoSrc: '/assets/videos/test.mp4',
      review: 'Implementing CRM has revolutionized our sales process. The intuitive interface and robust features make managing leads.',
      ratings: 3,
      profile: { avatar: '/assets/images/user/avatar1.png', name: 'Maria', role: 'UI/UX Designer' }
    }
  ]
};

/***************************  BLOCK - TESTIMONIAL 2  ***************************/

export default function BlockTestimonial2() {
  return <Testimonial2 {...data} />;
}
