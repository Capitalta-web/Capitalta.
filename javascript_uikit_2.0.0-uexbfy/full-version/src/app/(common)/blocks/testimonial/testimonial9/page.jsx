// @project
import { Testimonial9 } from '@/blocks/testimonial';

/***************************  TESTIMONIAL 9 - DATA  ***************************/

const data = {
  heading: 'User experiences unveiled',
  caption: 'Get insights into the features and aspects of our platform that users appreciate the most.',
  testimonials: [
    {
      review: `Outstanding customer support! They're responsive and go above and beyond to ensure a smooth experience.`,
      profile: { avatar: '/assets/images/user/avatar2.png', name: 'Maria S', role: 'Project Coordinator' }
    },
    {
      review: 'What I love most is the seamless integration with other tools. It streamlines our workflow and saves us time.',
      profile: { avatar: '/assets/images/user/avatar1.png', name: 'Emily P.', role: 'Project Manager' }
    },
    {
      review: `Our team's productivity soared after adopting this platform. It's a reliable solution that brings tangible re`,
      profile: { avatar: '/assets/images/user/avatar6.png', name: 'Brian C.', role: 'Operations Lead' }
    },
    {
      review: `This platform transformed the way we work. It's flexible, scalable, and adapts seamlessly to our evolving needs.`,
      profile: { avatar: '/assets/images/user/avatar7.png', name: 'Kevin R.', role: 'Business Analyst' }
    },
    {
      review: `I've recommended this platform to colleagues, and they've all been impressed. It's versatile, efficient.`,
      profile: { avatar: '/assets/images/user/avatar4.png', name: 'Eric H.', role: 'Customer Success Manager' }
    },
    {
      review: `As a tech enthusiast, I appreciate the innovation behind this platform. It's modern, sleek, and delivers on its promises.`,
      profile: { avatar: '/assets/images/user/avatar5.png', name: 'Maria S', role: 'Tech Specialist' }
    },
    {
      review: 'What I love most is the seamless integration with other tools. It streamlines our workflow.',
      profile: { avatar: '/assets/images/user/avatar8.png', name: 'Alex M.', role: 'IT Manager' }
    },
    {
      review:
        'What I appreciate most is the seamless integration with other tools. It’s streamlined our workflow and increased overall efficiency.',
      profile: { avatar: '/assets/images/user/avatar9.png', name: 'Emily P.', role: 'Software Developer' }
    }
  ]
};

/***************************  BLOCK - TESTIMONIAL 9  ***************************/

export default function BlockTestimonial9() {
  return <Testimonial9 {...data} />;
}
