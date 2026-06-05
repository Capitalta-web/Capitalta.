// @project
import { Testimonial4 } from '@/blocks/testimonial';

/***************************  TESTIMONIAL 4 - DATA  ***************************/

const data = {
  heading: 'Success stories unveiled',
  caption: "Our CRM's positive impact on client experiences",
  testimonials: [
    {
      review:
        "This AI platform is a game-changer! Incredibly accurate and user-friendly. It's become my go-to tool for quick and precise information processing. Highly recommended!",
      profile: { avatar: '/assets/images/user/avatar2.png', name: 'Tech Savvy Pro', role: 'Direct Optimization Executive' },
      ratings: 4
    },
    {
      review: 'Implementing CRM has revolutionized our sales process. The intuitive interface and robust features make managing leads.',
      profile: { avatar: '/assets/images/user/avatar1.png', name: 'Alexa Johnson', role: 'Sales Manager' },
      ratings: 3
    },
    {
      review: 'The user interface is intuitive, making it easy for our team to adapt and maximize productivity.',
      profile: { avatar: '/assets/images/user/avatar6.png', name: 'Casey Brown', role: 'Business Analyst' },
      ratings: 5
    },
    {
      review: 'Our sales have increased by 30% since we started using this CRM. It’s an invaluable tool for our business.',
      profile: { avatar: '/assets/images/user/avatar10.png', name: 'Sydnie', role: 'SEO' },
      ratings: 2
    }
  ]
};

/***************************  BLOCK - TESTIMONIAL 4  ***************************/

export default function BlockTestimonial4() {
  return <Testimonial4 {...data} />;
}
