import { DynamicComponentType } from '@/enum';

export const testimonial = {
  heading: 'Why our clients love us',
  caption: 'Hear directly from our clients about why they choose and recommend our HRM solutions.',
  testimonials: [
    {
      review: 'This AI platform has revolutionized my workflow. Fast, accurate, and indispensable!',
      profile: { avatar: '/assets/images/user/avatar2.png', name: 'Anne Thompson', role: 'Direct Optimization Executive' },
      image: { component: 'clientele/Techlify', type: DynamicComponentType.IMAGE }
    },
    {
      review: 'The user interface is intuitive, making it easy for our team to adapt and maximize productivity.',
      profile: { avatar: '/assets/images/user/avatar4.png', name: 'Maria', role: 'Business Analyst' },
      image: { component: 'clientele/Marketly', type: DynamicComponentType.IMAGE }
    },
    {
      review: 'Our sales have increased by 30% since we started using this HRM. It’s an invaluable tool for our business.',
      profile: { avatar: '/assets/images/user/avatar3.png', name: 'Jeffrey Rath', role: 'SEO' },
      image: { component: 'clientele/Realtor', type: DynamicComponentType.IMAGE }
    },
    {
      review: 'Implementing HRM has revolutionized our sales process. The intuitive interface and robust features make managing leads.',
      profile: { avatar: '/assets/images/user/avatar1.png', name: 'Tricia Wolf', role: 'Sales Manager' },
      image: { component: 'clientele/Financely', type: DynamicComponentType.IMAGE }
    }
  ]
};
