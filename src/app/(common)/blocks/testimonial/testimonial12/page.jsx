// @project
import { Testimonial12 } from '@/blocks/testimonial';

/***************************  TESTIMONIAL 12 - DATA  ***************************/

const data = {
  testimonials: [
    {
      avatar: '/assets/images/testimonial/avatar-bg1.svg',
      review: `This platform transformed the way we work. It's flexible, scalable, and adapts seamlessly to our evolving needs.`,
      profile: { name: 'Jone Tic', role: 'CEO' },
      link: { children: 'Read the full story', href: '' }
    },
    {
      avatar: '/assets/images/testimonial/avatar-bg2.svg',
      review: `The platform's intuitive design and powerful tools have significantly improved our development workflow.`,
      profile: { name: 'Tech Savvy Pro', role: 'Software Developer' },
      link: { children: 'Read the full story', href: '' }
    }
  ]
};

/***************************  BLOCK - TESTIMONIAL 12  ***************************/

export default function BlockTestimonial12() {
  return <Testimonial12 {...data} />;
}
