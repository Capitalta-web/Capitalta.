// @project
import { Testimonial11 } from '@/blocks/testimonial';

/***************************  TESTIMONIAL 11 - DATA  ***************************/

const data = {
  heading: 'Customer success stories',
  testimonials: [
    {
      review: `I've recommended this platform to colleagues, and they've all been impressed. It's versatile, efficient, and simply fantastic.`,
      profile: { avatar: '/assets/images/user/avatar2.png', name: 'Maria S', role: 'UI/UX Designer' }
    },
    {
      review: `As a tech enthusiast, I appreciate the innovation behind this platform. It's modern, sleek, and delivers on its promises.`,
      profile: { avatar: '/assets/images/user/avatar6.png', name: 'Emily P.', role: 'Software Developer' }
    },
    {
      review: `This platform transformed the way we work. It's flexible, scalable, and adapts seamlessly to our evolving needs.`,
      profile: { avatar: '/assets/images/user/avatar10.png', name: 'Eric H.', role: 'Marketing Specialist' }
    },
    {
      review: `Our team's productivity soared after adopting this platform. It's a reliable solution that brings tangible results.`,
      profile: { avatar: '/assets/images/user/avatar8.png', name: 'Maria S', role: 'Business Owner' }
    },
    {
      review: `Outstanding customer support! They're responsive and go above and beyond to ensure a smooth experience. Highly satisfied.`,
      profile: { avatar: '/assets/images/user/avatar11.png', name: 'Brian C.', role: 'Freelancer' }
    },
    {
      review: 'What I love most is the seamless integration with other tools. It streamlines our workflow and saves us valuable time.',
      profile: { avatar: '/assets/images/user/avatar13.png', name: 'Alex M.', role: 'Content Writer' }
    }
  ]
};

/***************************  BLOCK - TESTIMONIAL 11  ***************************/

export default function BlockTestimonial11() {
  return <Testimonial11 {...data} />;
}
