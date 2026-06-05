import { Feature23 } from '@/blocks/feature';

/***************************  FEATURE 23 - DATA  ***************************/

const data = {
  heading: 'Culture of innovation',
  caption:
    'Join a team that embraces forward-thinking ideas, fosters innovation, and cultivates an environment where your creativity can flourish.',
  heading2: 'Growth',
  caption2: 'Our culture prioritizes continuous learning, encouraging personal and professional development. ',
  image: { light: '/assets/images/graphics/default/feature23-light.png', dark: '/assets/images/graphics/default/feature23-dark.png' },
  primaryBtn: { children: 'Join our Team', sx: { textTransform: 'none' } },
  features: [
    {
      icon: 'tabler-users',
      title: 'Teamwork',
      content: 'We embrace varied perspectives and backgrounds, creating an inclusive environment.'
    },
    {
      icon: 'tabler-star',
      title: 'Inclusivity',
      content: 'We embrace varied perspectives and backgrounds, creating an inclusive environment.'
    }
  ]
};

/***************************  BLOCK - FEATURE 23  ***************************/

export default function BlockFeature23() {
  return <Feature23 {...data} />;
}
