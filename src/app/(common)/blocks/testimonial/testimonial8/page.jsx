// @project
import branding from '@/branding.json';
import { Testimonial8 } from '@/blocks/testimonial';
import { DynamicComponentType } from '@/enum';

/***************************  TESTIMONIAL 8 - DATA  ***************************/

const data = {
  heading: 'Real people, Real results',
  caption: 'Our customers accomplish amazing things every day.',
  testimonials: [
    {
      title: `${branding.brandName} - my go-to for quick and precise information processing!`,
      image: { component: 'testimonial/Twitch', type: DynamicComponentType.IMAGE },
      review: `This platform transformed the way we work. It's flexible, scalable, and adapts seamlessly to our evolving needs.`,
      profile: { avatar: '/assets/images/user/avatar2.png', name: 'Jone Tic', role: 'CEO' }
    },
    {
      title: `${branding.brandName} - Boosted Our Development Efficiency`,
      image: { component: 'testimonial/GoogleImg', type: DynamicComponentType.IMAGE },
      review: `The platform's intuitive design and powerful tools have significantly improved our development workflow.`,
      profile: { avatar: '/assets/images/user/avatar1.png', name: 'Tech Savvy Pro', role: 'Software Developer' }
    }
  ]
};

/***************************  BLOCK - TESTIMONIAL 8  ***************************/

export default function BlockTestimonial8() {
  return <Testimonial8 {...data} />;
}
