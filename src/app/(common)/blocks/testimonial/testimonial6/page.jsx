// @project
import { Testimonial6 } from '@/blocks/testimonial';
import { DynamicComponentType } from '@/enum';

/***************************  TESTIMONIAL 6 - DATA  ***************************/

const data = {
  heading: 'What our client say',
  caption: 'Our customers accomplish amazing things every day. They work to find cures to cancer, travel ',
  testimonials: [
    {
      title: 'Exceptional performance',
      image: { component: 'testimonial/Twitch', type: DynamicComponentType.IMAGE },
      review: `As a tech enthusiast, I'm blown away by this AI platform. It's not just a tool; it's a game-changer. Exceptional performance and ease of use`,
      profile: { avatar: '/assets/images/user/avatar2.png', name: 'John Carter', role: 'Designer' }
    },
    {
      title: 'Highly recommended!',
      image: { component: 'testimonial/GoogleImg', type: DynamicComponentType.IMAGE },
      review: `This AI platform is a game-changer! Incredibly accurate and user-friendly. It's become my go-to tool for quick and precise information processing. Highly recommended!`,
      profile: { avatar: '/assets/images/user/avatar1.png', name: 'Tricia Wolf', role: 'Digital Marketer' }
    }
  ]
};

/***************************  BLOCK - TESTIMONIAL 6  ***************************/

export default function BlockTestimonial6() {
  return <Testimonial6 {...data} />;
}
